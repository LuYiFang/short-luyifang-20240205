import "./App.css";
import React, { useRef, useCallback } from "react";
import { shortList } from "./shortList";
import { Container, Stack, Toolbar } from "@mui/material";
import useAutoScrollNextVideo from "./hook/useAutoScrollNextVideo";
import Video from "./components/Video";

function App() {
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

  return (
    <div className="App" ref={videoListRef}>
      <Toolbar />
      <Container maxWidth="sm">
        <Stack spacing={3}>
          {shortList.map((url: string, i: number) => {
            return (
              <Video
                url={url}
                index={i}
                key={`video-${i}`}
                playing={playing(i)}
              />
            );
          })}
        </Stack>
      </Container>
    </div>
  );
}

export default App;
