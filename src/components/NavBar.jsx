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
import LanguageIcon from "@mui/icons-material/Language";

import siteLogo from "../assets/img/logo_cicv3.png";
import { useTranslation } from "react-i18next";

import englandFlag from "../assets/img/inglaterra.png";
import franceFlag from "../assets/img/franca.png";
import portugalFlag from "../assets/img/portugal.png";

import { useLocation } from "react-router-dom";

const NavBar = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const [userData, setUserData] = useState(
    JSON.parse(localStorage.getItem("userInfo"))
  );

  const location = useLocation();

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

  const handleConfiguration = () => {
    handleClose();
    navigate("/user-profile-configuration");
  };

  const handleProfileClick = () => {
    handleClose();
    navigate(`/user-profile/${userData.id}/${userData.nome}`);
    if (location.pathname.includes("user-profile")) {
      window.location.reload(false);
    }
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
        sx={{
          marginLeft: "1rem",
          width: "8rem",
          height: "auto",
          objectFit: "cover",
          cursor: "pointer",
          "&:hover": {
            opacity: 0.8, // Adjust the opacity or add more styles as desired
          },
        }}
      />
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          gap: "0.75rem",
          marginLeft: "auto",
          "&:hover": {
            cursor: "pointer",
          },
        }}
      >
        <Box display="flex">
          <NotificationsIcon color="primary" sx={{ fontSize: "1.25rem" }} />
        </Box>
        <Select
          labelId="internationalization-label"
          id="internationalization"
          variant="standard"
          disableUnderline
          defaultValue={i18n.language}
          onChange={handleTranslationChange}
          sx={{
            height: "2rem",
            color: (theme) => theme.palette.primary.main,
            ".MuiOutlinedInput-input": {
              display: "flex",
              alignItems: "center",
              gap: ".5rem",
            },
          }}
        >
          <MenuItem
            value={"en"}
            sx={{
              display: "flex",
              gap: ".5rem",
            }}
          >
            {" "}
            {/* <Avatar
              src={englandFlag}
              alt="Bandeira Inglaterra"
              sx={{ width: "1.6rem", height: "auto" }}
            />{" "} */}
            <Typography fontWeight="bold">EN</Typography>
          </MenuItem>
          <MenuItem
            value={"pt"}
            sx={{
              display: "flex",
              gap: ".5rem",
            }}
          >
            {" "}
            {/* <Avatar
              src={portugalFlag}
              alt="Bandeira Portugal"
              sx={{ width: "1.6rem", height: "auto" }}
            />{" "} */}
            <Typography fontWeight="bold">PT</Typography>
          </MenuItem>
          <MenuItem
            value={"fr"}
            sx={{
              display: "flex",
              gap: ".5rem",
            }}
          >
            {" "}
            {/* <Avatar
              src={franceFlag}
              alt="Bandeira França"
              sx={{ width: "1.6rem", height: "auto" }}
            />{" "} */}
            <Typography fontWeight="bold">FR</Typography>
          </MenuItem>
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
              <Tooltip title={t("homepage.definicoesConta")}>
                <IconButton
                  onClick={handleClick}
                  size="small"
                  aria-controls={open ? "account-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                >
                  <Avatar
                    sx={{ width: 32, height: 32 }}
                    src={`https://comein.cv/comeincv_api_test/img/perfilImg/${userData.img_perfil}`}
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
                  src={`https://comein.cv/comeincv_api_test/img/perfilImg/${userData.img_perfil}`}
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
                <Avatar
                  src={`https://comein.cv/comeincv_api_test/img/perfilImg/${userData.img_perfil}`}
                />{" "}
                {t("navBar.perfil")}
              </MenuItem>
              <Divider />
              <MenuItem onClick={handleRegistration}>
                <ListItemIcon>
                  <PersonAdd fontSize="small" />
                </ListItemIcon>
                {t("navBar.adicionarConta")}
              </MenuItem>
              <MenuItem onClick={handleConfiguration}>
                <ListItemIcon>
                  <Settings fontSize="small" />
                </ListItemIcon>
                {t("navBar.definicoes")}
              </MenuItem>
              <MenuItem
                onClick={() => {
                  handleClose();
                  localStorage.clear();
                  navigate("/");
                }}
              >
                <ListItemIcon>
                  <Logout fontSize="small" />
                </ListItemIcon>
                {t("navBar.terminarSessao")}
              </MenuItem>
            </Menu>
          </div>
        )}

        {!authenticated && (
          <>
            <Button
              sx={{
                marginRight: "0.5rem",
                height: "2rem",
                textTransform: "capitalize",
                // fontWeight: "bold",
                color: (theme) => theme.palette.primary.contrastText,
              }}
              variant="contained"
              color="primary"
              onClick={handleLoginClick}
            >
              {t("homepage.login")}
            </Button>
            <Button
              sx={{
                marginRight: "1rem",
                height: "2rem",
                textTransform: "capitalize",
              }}
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
