import { ThemeProvider } from "@mui/material/styles";
import { Box } from "@mui/material";
import "./App.css";
import AppRoutes from "./routes";
import { theme } from "./utils/muiTheme";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          width: "98vw",
          minHeight: "98vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <AppRoutes />
      </Box>
    </ThemeProvider>
  );
}

export default App;
