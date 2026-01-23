import { createTheme } from "@mui/material/styles";

const getMuiTheme = (mode) =>
  createTheme({
    palette: {
      mode,
      primary: {
        main: "#1db954",
      },
      background: {
        default: mode === "dark" ? "#0f0f0f" : "#f5f5f5",
        paper: mode === "dark" ? "#181818" : "#ffffff",
      },
      text: {
        primary: mode === "dark" ? "#ffffff" : "#000000",
        secondary: mode === "dark" ? "#b3b3b3" : "#444444",
      },
    },
  });

export default getMuiTheme;