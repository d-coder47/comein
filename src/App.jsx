import { Box } from "@mui/material";
import "./App.css";
import AppRoutes from "./routes";

function App() {
  return (
    <Box
      sx={{
        width: "100vw",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <AppRoutes />
    </Box>
  );
}

export default App;
