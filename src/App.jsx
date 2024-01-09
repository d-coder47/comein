import { ThemeProvider } from "@mui/material/styles";
import { Box } from "@mui/material";
import "./App.css";
import AppRoutes from "./routes";
import { theme } from "./utils/muiTheme";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HelmetMetaData from "./components/HelmetMetaData";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          // width: "99vw",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <HelmetMetaData />
        <AppRoutes />
        <ToastContainer />
      </Box>
    </ThemeProvider>
  );
}

export default App;
