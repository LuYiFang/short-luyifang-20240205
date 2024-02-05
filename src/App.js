import "./App.css";
import { Box, Container, IconButton, Toolbar, Typography } from "@mui/material";
import ReactPlayer from "react-player";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ReplyIcon from "@mui/icons-material/Reply";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

//A bit different
import CommentIcon from "@mui/icons-material/Comment";

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
    icon: <CommentIcon />,
    label: "3935",
  },
  {
    icon: <ReplyIcon sx={{ transform: "scaleX(-1)" }} />,
    label: "分享",
  },
  {
    icon: <MoreHorizIcon />,
    label: "",
  },
];

function App() {
  return (
    <div className="App">
      <Toolbar />
      <Container sx={{ display: "flex", height: 640 }} maxWidth="sm">
        <Box sx={{ backgroundColor: "gray" }}>
          <ReactPlayer />
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
      </Container>
    </div>
  );
}

export default App;

const TextIconButton = (props) => {
  const { item } = props;
  return (
    <Box sx={{ marginTop: 2 }}>
      <IconButton size="large">{item.icon}</IconButton>
      <Typography variant="subtitle2" fontWeight={550} fontFamily="Segoe UI">
        {item.label}
      </Typography>
    </Box>
  );
};
