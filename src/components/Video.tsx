import { FC, useEffect, useState } from "react";
import { Avatar, Box } from "@mui/material";
import ReactPlayer from "react-player/lazy";

import { videoHeight, videoWidth } from "../constants";
import { ControlIconButton, TextIconButton } from "./IconButtons";

import { BiSolidCommentDetail, BiSolidShare } from "react-icons/bi";
import { HiThumbUp, HiThumbDown } from "react-icons/hi";
import {
  IoIosMore,
  IoIosPlay,
  IoMdVolumeHigh,
  IoMdVolumeOff,
} from "react-icons/io";
import { IoPauseSharp } from "react-icons/io5";
import { VideoType } from "../types/commonTypes";

const buttonList = [
  {
    icon: <HiThumbUp style={{ color: "#0F0F0F" }} />,
    label: "262萬",
  },
  {
    icon: <HiThumbDown style={{ color: "#0F0F0F" }} />,
    label: "不喜歡",
  },
  {
    icon: (
      <BiSolidCommentDetail
        style={{ transform: "scaleX(-1)", color: "#0F0F0F" }}
      />
    ),
    label: "3935",
  },
  {
    icon: (
      <BiSolidShare style={{ transform: "scaleX(-1)", color: "#0F0F0F" }} />
    ),
    label: "分享",
  },
  {
    icon: <IoIosMore style={{ color: "#0F0F0F" }} />,
    label: "",
  },
  { icon: <Avatar variant="rounded"></Avatar>, label: "", clickable: false },
];

const Video: FC<VideoType> = ({ playing, index, url }) => {
  const [isPlaying, setIsPlaying] = useState(playing);
  const [isMute, setIsMute] = useState(true);

  useEffect(() => {
    setIsPlaying(playing);
  }, [playing]);

  console.log("load me", index, isPlaying);

  return (
    <Box sx={{ display: "flex", height: videoHeight }} className="video">
      <Box sx={{ position: "relative" }}>
        <ControlIconButton
          onClick={() => setIsPlaying(!isPlaying)}
          sx={{
            left: 16,
          }}
          isOn={isPlaying}
          IconTrigger={IoIosPlay}
          IconUntrigger={IoPauseSharp}
        />
        <ControlIconButton
          onClick={() => setIsMute(!isMute)}
          sx={{
            right: 16,
          }}
          isOn={isMute}
          IconTrigger={IoMdVolumeHigh}
          IconUntrigger={IoMdVolumeOff}
        />

        <ReactPlayer
          height={videoHeight}
          width={videoWidth}
          playing={isPlaying}
          volume={1}
          muted={isMute}
          url={url}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onEnded={() => setIsPlaying(false)}
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
  );
};
export default Video;
