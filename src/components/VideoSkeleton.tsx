import Skeleton from "@mui/material/Skeleton";
import { videoHeight, videoWidth } from "../constants";
import { FC } from "react";

const VideoSkeleton = () => {
  return (
    <>
      <Skeleton
        className={`video`}
        variant="rectangular"
        width={videoWidth}
        height={videoHeight}
      />
    </>
  );
};

export default VideoSkeleton;
