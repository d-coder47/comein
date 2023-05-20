import { Box } from "@mui/material";
import "./App.css";
import AppRoutes from "./routes";

function App() {
  return (
    <Box
      sx={{
        width: "95vw",
        minHeight: "100vh",
        margin: "0 2rem",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <AppRoutes />
    </Box>
  );
}

export default App;
