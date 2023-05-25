import React from "react";
import Typography from "@mui/material/Typography";
import { Avatar, Box, Button, MenuItem, Select } from "@mui/material";
import { useNavigate } from "react-router-dom";
import NotificationsIcon from "@mui/icons-material/Notifications";
import siteLogo from "../assets/img/logo_cicv3.png";
import { useTranslation } from "react-i18next";

const NavBar = () => {
  const navigate = useNavigate();

  const { t, i18n } = useTranslation();

  const handleCadastrarClick = () => {
    navigate("/user-registration");
  };

  const handleTranslationChange = (e) => {
    i18n.changeLanguage(e.target.value);
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
        <Select
          labelId="internationalization-label"
          id="internationalization"
          defaultValue={i18n.language}
          onChange={handleTranslationChange}
          sx={{
            height: "2rem",
            marginRight: "0.5rem",
            color: (theme) => theme.palette.primary.main,
            ".MuiOutlinedInput-notchedOutline": {
              borderColor: (theme) => theme.palette.primary.main,
            },
            ".MuiSvgIcon-root-MuiSelect-icon": {
              color: (theme) => theme.palette.primary.main,
            },
          }}
        >
          <MenuItem value={"en"}>EN</MenuItem>
          <MenuItem value={"pt"}>PT</MenuItem>
          <MenuItem value={"fr"}>FR</MenuItem>
        </Select>
        <Button
          sx={{
            marginRight: "0.5rem",
            height: "2rem",
            color: (theme) => theme.palette.primary.contrastText,
          }}
          variant="contained"
          color="primary"
        >
          {t("homepage.login")}
        </Button>
        <Button
          sx={{ marginRight: "2.5rem", height: "2rem" }}
          onClick={handleCadastrarClick}
          variant="outlined"
          color="primary"
        >
          {t("homepage.signUp")}
        </Button>
      </Box>
    </Box>
  );
};

export default NavBar;
