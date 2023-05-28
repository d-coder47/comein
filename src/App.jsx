import { ThemeProvider } from "@mui/material/styles";
import "./App.css";
import AppRoutes from "./routes";
import { theme } from "./utils/muiTheme";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <AppRoutes />
    </ThemeProvider>
  );
}

export default App;
