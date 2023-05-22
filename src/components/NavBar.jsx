import React from "react";
import Typography from "@mui/material/Typography";
import { Avatar, Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import NotificationsIcon from "@mui/icons-material/Notifications";
import siteLogo from "../assets/img/logo_cicv3.png";

const NavBar = () => {
  const navigate = useNavigate();

  const handleCadastrarClick = () => {
    navigate("/user-registration");
  };

  return (
    <Box
      padding="0.5rem"
      sx={{
        borderBottom: "2px solid rgb(229 231 235)",
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
        width: "100%",
      }}
    >
      <Avatar
        variant="square"
        src={siteLogo}
        alt="Come In"
        sx={{ width: "8rem", height: "auto", objectFit: "cover" }}
      />
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          gap: "0.125rem",
          marginLeft: "auto",
          "&:hover": {
            cursor: "pointer",
          },
        }}
      >
        <Box>
          <NotificationsIcon color="primary" />
        </Box>
        <Button
          sx={{
            marginRight: "0.5rem",
            color: (theme) => theme.palette.primary.contrastText,
          }}
          variant="contained"
          color="primary"
        >
          Entrar
        </Button>
        <Button
          sx={{ marginRight: "2.5rem" }}
          onClick={handleCadastrarClick}
          variant="outlined"
          color="primary"
        >
          Cadastrar
        </Button>
      </Box>
    </Box>
  );
};

export default NavBar;
