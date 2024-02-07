import { ReactNode } from "react";
import { IconType } from "react-icons";

export type TextButtonType = {
  icon: ReactNode;
  label: string;
  clickable?: boolean;
};

export type ControlIconButtonType = {
  onClick: () => void;
  sx?: object;
  isOn: boolean;
  IconTrigger: IconType;
  IconUntrigger: IconType;
};

export type VideoType = {
  playing: boolean;
  index: number;
  url: string;
};
