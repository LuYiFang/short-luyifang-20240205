import { useState, useEffect, RefObject } from "react";

const useAutoScrollNextVideo = (
  ref: RefObject<HTMLElement>,
  videoSelector: string,
) => {
  const [videos, setVideos] = useState<NodeListOf<HTMLElement>>();
  const [preIndex, setPreIndex] = useState(0);
  const [nextIndex, setNextIndex] = useState(-1);

  const handleWeel = (event: WheelEvent) => {
    if (!ref.current) return;

    const windowHeight = window.innerHeight;
    const windowCenter = windowHeight / 2;

    if (!videos) return;

    const videoList = Array.from(videos);
    let currentIndex = -1;

    const direction = event.deltaY > 0 ? 1 : -1;

    let minDistance = Infinity;
    videoList.forEach((video, i) => {
      const rect = video.getBoundingClientRect();
      const distance = Math.min(
        Math.abs(rect.top - windowCenter),
        Math.abs(rect.bottom - windowCenter),
      );
      if (distance < minDistance) {
        currentIndex = i;
        minDistance = distance;
      }
    });

    if (currentIndex <= -1) return;

    let nextIndex = currentIndex + direction;

    if (nextIndex <= -1) nextIndex = 0;
    if (nextIndex >= videoList.length) nextIndex = videoList.length - 1;

    event.preventDefault();

    videoList[nextIndex].scrollIntoView({
      behavior: "smooth",
      block: "center",
    });

    setPreIndex(currentIndex);
    setNextIndex(nextIndex);
  };

  useEffect(() => {
    if (!ref.current) return;

    setVideos(ref.current.querySelectorAll(videoSelector));

    ref.current.addEventListener("wheel", handleWeel);
    return () => {
      if (!ref.current) return;
      ref.current.removeEventListener("wheel", handleWeel);
    };
  }, [ref.current]);

  return { preIndex, nextIndex };
};

export default useAutoScrollNextVideo;
