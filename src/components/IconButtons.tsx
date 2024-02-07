import React, { FC } from "react";
import { Box, IconButton, Typography } from "@mui/material";
import { TextButtonType, ControlIconButtonType } from "../types/commonTypes";
import { iconSize } from "../constants";

export const TextIconButton: FC<{ item: TextButtonType }> = ({ item }) => {
  const { clickable = true } = item;

  return (
    <Box sx={{ marginTop: 2 }}>
      <IconButton sx={{ height: iconSize, width: iconSize }}>
        {item.icon}
      </IconButton>

      <Typography variant="subtitle2" fontWeight={550} fontFamily="Segoe UI">
        {item.label}
      </Typography>
    </Box>
  );
};

export const ControlIconButton: FC<ControlIconButtonType> = ({
  onClick,
  sx = {},
  isOn,
  IconTrigger,
  IconUntrigger,
}) => {
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
          <IconUntrigger style={{ color: "#FFFFFF" }} />
        ) : (
          <IconTrigger style={{ color: "#FFFFFF" }} />
        )}
      </IconButton>
    </>
  );
};
