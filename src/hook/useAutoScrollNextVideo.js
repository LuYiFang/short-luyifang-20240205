import { useState, useEffect } from "react";

const useAutoScrollNextVideo = (ref, videoSelector) => {
  const [videos, setVideos] = useState([]);

  const handleWeel = (event) => {
    if (!ref.current) return;

    const windowHeight = window.innerHeight;

    const videoList = Array.from(videos);
    let currentIndex = -1;

    const direction = event.deltaY > 0 ? 1 : -1;

    const visibleVideo = videoList.find((video, i) => {
      const rect = video.getBoundingClientRect();

      const isVisible =
        (rect.top >= 0 && rect.top < windowHeight) ||
        (rect.bottom > 0 && rect.bottom <= windowHeight);

      if (isVisible) currentIndex = i;
      return isVisible;
    });

    if (!visibleVideo) return;
    if (currentIndex <= -1) return;

    let nextIndex = currentIndex + direction;
    if (nextIndex <= -1) nextIndex = 0;
    if (nextIndex > videoList.length) nextIndex = videoList.length - 1;

    event.preventDefault();
    videoList[nextIndex].scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  };

  useEffect(() => {
    if (!ref.current) return;

    setVideos(ref.current.querySelectorAll(videoSelector));

    ref.current.addEventListener("wheel", handleWeel);
    return () => ref.current.removeEventListener("wheel", handleWeel);
  }, [ref.current]);
};

export default useAutoScrollNextVideo;
