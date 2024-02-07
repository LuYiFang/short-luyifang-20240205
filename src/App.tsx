import "./App.css";
import React, { useRef, useCallback, lazy, useState } from "react";
import { shortList } from "./shortList";
import { Container, Stack, Toolbar } from "@mui/material";
import useAutoScrollNextVideo from "./hook/useAutoScrollNextVideo";
import VideoSkeleton from "./components/VideoSkeleton";
import { LoadedVideoType } from "./types/commonTypes";

const VideoComponent = lazy(() => import("./components/Video"));

function App() {
  const [loadedVideo, setLoadedVideo] = useState<LoadedVideoType>({});
  const videoListRef = useRef(null);
  const { preIndex, nextIndex } = useAutoScrollNextVideo(
    videoListRef,
    ".video",
  );

  const playing = useCallback(
    (index: number) => {
      if (nextIndex <= -1) {
        return preIndex === index;
      }

      return nextIndex === index;
    },
    [preIndex, nextIndex],
  );

  const updateLoadedVideo = (key: number) => {
    setLoadedVideo((pre) => ({ ...pre, [key]: true }));
  };

  return (
    <div className="App" ref={videoListRef}>
      <Toolbar />
      <Container maxWidth="sm">
        <Stack spacing={3}>
          {shortList.map((url: string, i: number) => {
            if (
              !loadedVideo[i] &&
              [preIndex - 1, preIndex, preIndex + 1, preIndex + 2].indexOf(i) <=
                -1
            ) {
              return <VideoSkeleton key={`video-skeleton-${i}`} />;
            }

            return (
              <VideoComponent
                url={url}
                index={i}
                key={`video-${i}`}
                playing={playing(i)}
                updateLoadedVideo={updateLoadedVideo}
              />
            );
          })}
        </Stack>
      </Container>
    </div>
  );
}

export default App;
