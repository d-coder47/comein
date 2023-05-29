import { ThemeProvider } from "@mui/material/styles";
import "./App.css";
import AppRoutes from "./routes";
import { theme } from "./utils/muiTheme";
import { Box } from "@mui/material";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          width: "99vw",
          minHeight: "100vh",
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
