import "./App.css";
import { useEffect, useState } from "react";
import { shortList } from "./shortList";
import useOnScreen from "./hook/useOnScreen";
import { useRef } from "react";
import {
  Avatar,
  Box,
  Container,
  IconButton,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import ReactPlayer from "react-player";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";
import useAutoScrollNextVideo from "./hook/useAutoScrollNextVideo";
import { useCallback } from "react";
import { Suspense } from "react";
import { Icon } from "@iconify/react";

//A bit different
import CommentIcon from "@mui/icons-material/Comment";
import ReplyIcon from "@mui/icons-material/Reply";

const videoHeight = 783;
const videoWeight = 440;

const buttonList = [
  {
    icon: <ThumbUpIcon />,
    label: "262萬",
  },
  {
    icon: <ThumbDownIcon />,
    label: "不喜歡",
  },
  {
    // icon: <CommentIcon />,
    icon: (
      <Icon
        icon="bxs:comment-detail"
        style={{
          color: "black",
          transform: "scaleX(-1)",
          height: 20,
          width: 20,
        }}
      />
    ),
    label: "3935",
  },
  {
    // icon: <ReplyIcon sx={{ transform: "scaleX(-1)" }} />,
    icon: <Icon icon="gridicons:reader-share" style={{ color: "black" }} />,
    label: "分享",
  },
  {
    icon: <MoreHorizIcon />,
    label: "",
  },
  { icon: <Avatar variant="rounded"></Avatar>, label: "", clickable: false },
];

function App() {
  const videoListRef = useRef(null);
  const { preIndex, nextIndex } = useAutoScrollNextVideo(
    videoListRef,
    ".video",
  );

  const playing = useCallback(
    (index) => {
      // console.log(index, 'pre', preIndex, 'next', nextIndex)
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
      <Container
        // ref={videoListRef}
        maxWidth="sm"
        /*sx={{ overflowY: "auto", height: "calc(100vh - 64px)" }}*/
      >
        <Stack spacing={3}>
          {shortList.map((url, i) => {
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

const TextIconButton = (props) => {
  const { item } = props;
  const { clickable = true } = item;

  return (
    <Box sx={{ marginTop: 2 }}>
      {clickable ? (
        <IconButton size="large">{item.icon}</IconButton>
      ) : (
        <Box sx={{ pl: "6px" }}>{item.icon}</Box>
      )}

      <Typography variant="subtitle2" fontWeight={550} fontFamily="Segoe UI">
        {item.label}
      </Typography>
    </Box>
  );
};

const ControlIconButton = (props) => {
  const { onClick, sx = {}, isOn, IconTrigger, IconUntrigger } = props;

  return (
    <>
      <IconButton
        onClick={onClick}
        sx={{
          position: "absolute",
          top: 16,
          zIndex: 10000,
          "&": {
            backgroundColor: "transparent",
          },
          ...sx,
        }}
      >
        {isOn ? (
          <IconTrigger sx={{ color: "#FFFFFF" }} />
        ) : (
          <IconUntrigger sx={{ color: "#FFFFFF" }} />
        )}
      </IconButton>
    </>
  );
};

const Video = (props) => {
  const { playing, index } = props;

  const [isPlaying, setIsPlaying] = useState(playing);
  const [isMute, setIsMute] = useState(false);

  const ref = useRef();
  const isOnScreen = useOnScreen(ref);

  useEffect(() => {
    if (isOnScreen) {
      setIsPlaying(playing);
      return;
    }

    setIsPlaying(false);
  }, [isOnScreen]);

  return (
    <Suspense fallback={"loading"}>
      <Box
        ref={ref}
        sx={{ display: "flex", height: videoHeight }}
        className="video"
      >
        <Box sx={{ position: "relative" }}>
          <ControlIconButton
            onClick={() => setIsPlaying(!isPlaying)}
            sx={{
              left: 16,
            }}
            isOn={isPlaying}
            IconTrigger={PlayArrowIcon}
            IconUntrigger={PauseIcon}
          />

          <ControlIconButton
            onClick={() => setIsMute(!isMute)}
            sx={{
              right: 16,
            }}
            isOn={isMute}
            IconTrigger={VolumeUpIcon}
            IconUntrigger={VolumeOffIcon}
          />

          <ReactPlayer
            height={videoHeight}
            width={videoWeight}
            playing={isPlaying}
            volume={1}
            muted={isMute}
            url={props.url}
            controls={true}
            config={{
              youtube: {
                playerVars: {
                  autoplay: 1,
                  autoPlay: 1,
                },
              },
            }}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "end",
            px: 1,
            minWidth: 50,
          }}
        >
          {buttonList.map((item, i) => {
            return <TextIconButton key={`text-button=${i}`} item={item} />;
          })}
        </Box>
      </Box>
    </Suspense>
  );
};
