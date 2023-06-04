import React, { useState, useEffect } from "react";
import "./navBar.css";
import Typography from "@mui/material/Typography";
import {
  Avatar,
  Box,
  Button,
  MenuItem,
  Select,
  IconButton,
  Tooltip,
  Menu,
  Divider,
  ListItemIcon,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import NotificationsIcon from "@mui/icons-material/Notifications";
import PersonAdd from "@mui/icons-material/PersonAdd";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";

import siteLogo from "../assets/img/logo_cicv3.png";
import { useTranslation } from "react-i18next";

const NavBar = () => {
  const navigate = useNavigate();

  const { t, i18n } = useTranslation();

  const [userData, setUserData] = useState(
    JSON.parse(localStorage.getItem("userInfo"))
  );

  const authenticated = localStorage.getItem("authenticated");

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleCadastrarClick = () => {
    navigate("/user-registration");
  };

  const handleLoginClick = () => {
    navigate("/user-login");
  };

  const handleTranslationChange = (e) => {
    i18n.changeLanguage(e.target.value);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleRegistration = () => {
    handleClose();
    navigate("/user-registration");
  };

  const handleProfileClick = () => {
    handleClose();
    navigate("/user-profile");
  };

  useEffect(() => {
    if (authenticated) {
      const data = JSON.parse(localStorage.getItem("userInfo"));
      setUserData(data);
    }
  }, [authenticated]);
  return (
    <Box
      padding="0.5rem"
      sx={{
        borderBottom: "2px solid rgb(229 231 235)",
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
      }}
    >
      <Avatar
        variant="square"
        src={siteLogo}
        alt="Come In"
        onClick={() => navigate("/")}
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
          <NotificationsIcon color="primary" sx={{ fontSize: 34 }} />
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

        {authenticated && (
          <div>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                textAlign: "center",
              }}
            >
              <Tooltip title="Account settings">
                <IconButton
                  onClick={handleClick}
                  size="small"
                  sx={{ ml: 2 }}
                  aria-controls={open ? "account-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                >
                  <Avatar
                    sx={{ width: 32, height: 32 }}
                    src={userData.img_perfil ? userData.img_perfil : ""}
                  />
                </IconButton>
              </Tooltip>
            </Box>
            <Menu
              anchorEl={anchorEl}
              id="account-menu"
              open={open}
              onClose={handleClose}
              onClick={handleClose}
              PaperProps={{
                elevation: 0,
                sx: {
                  overflow: "visible",
                  filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                  mt: 1.5,
                  "& .MuiAvatar-root": {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                  },
                  "&:before": {
                    content: '""',
                    display: "block",
                    position: "absolute",
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: "background.paper",
                    transform: "translateY(-50%) rotate(45deg)",
                    zIndex: 0,
                  },
                },
              }}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
              <MenuItem className="userInfo" onClick={handleProfileClick}>
                <Avatar
                  src={userData.img_perfil ? userData.img_perfil : ""}
                  sx={{
                    width: "80px !important",
                    height: "80px !important",
                  }}
                />
                <Typography
                  variant="h6"
                  sx={{
                    marginTop: "0.5rem",
                    marginBottom: "0.5rem",
                    fontWeight: "bold",
                  }}
                >
                  {userData.nome}
                </Typography>

                <Typography
                  variant="h6"
                  fontSize={12}
                  sx={{
                    marginBottom: "1rem",
                  }}
                >
                  {userData.email}
                </Typography>
              </MenuItem>
              <Divider />
              <MenuItem onClick={handleProfileClick}>
                <Avatar src={userData.img_perfil ? userData.img_perfil : ""} />{" "}
                {t("navBar.perfil")}
              </MenuItem>
              <Divider />
              <MenuItem onClick={handleRegistration}>
                <ListItemIcon>
                  <PersonAdd fontSize="small" />
                </ListItemIcon>
                {t("navBar.adicionarConta")}
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <ListItemIcon>
                  <Settings fontSize="small" />
                </ListItemIcon>
                {t("navBar.definicoes")}
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <ListItemIcon>
                  <Logout fontSize="small" />
                </ListItemIcon>
                {t("navBar.terminarSessao")}
              </MenuItem>
            </Menu>
          </div>
        )}

        {!localStorage.getItem("authenticated") && (
          <>
            <Button
              sx={{
                marginRight: "0.5rem",
                height: "2rem",
                color: (theme) => theme.palette.primary.contrastText,
              }}
              variant="contained"
              color="primary"
              onClick={handleLoginClick}
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
          </>
        )}
      </Box>
    </Box>
  );
};

export default NavBar;
