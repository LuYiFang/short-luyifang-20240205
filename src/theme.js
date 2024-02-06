import { createTheme } from "@mui/material";

export const theme = createTheme({
  components: {
    MuiSvgIcon: {
      styleOverrides: {
        root: {
          color: "#0F0F0F",
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          backgroundColor: "#F4F4F4",
        },
      },
    },
  },
});
