import React from "react";
import Typography from "@mui/material/Typography";
import { Box, Button } from "@mui/material";

const NavBar = () => {
  return (
    <Box
      padding="0.5rem"
      sx={{
        borderColor: "rgb(229 231 235)",
        borderBottom: "1px",
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
        width: "100%",
      }}
    >
      <Typography variant="h5">Come In</Typography>
      <Button
        sx={{ marginLeft: "auto", marginRight: "0.5rem" }}
        variant="contained"
      >
        Entrar
      </Button>
      <Button variant="outlined">Cadastrar</Button>
    </Box>
  );
};

export default NavBar;
