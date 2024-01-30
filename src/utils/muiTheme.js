import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#33B3CC",
      contrastText: "#FAFAFA",
    },
    secondary: {
      main: "#743600",
    },
  },

  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
      custom: 1370, // Custom breakpoint with pixel value
    },
  },
});
