import React, { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import {
  Avatar,
  Box,
  Button,
  MenuItem,
  Select,
  Tooltip,
  IconButton,
  Menu,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import NotificationsIcon from "@mui/icons-material/Notifications";

import siteLogo from "../assets/img/logo_cicv3.png";
import { useTranslation } from "react-i18next";

const NavBar = () => {
  const navigate = useNavigate();

  const { t, i18n } = useTranslation();

  const settings = ["Profile", "Account", "Dashboard", "Logout"];

  const handleCadastrarClick = () => {
    navigate("/user-registration");
  };

  const handleLoginClick = () => {
    navigate("/user-login");
  };

  const handleTranslationChange = (e) => {
    i18n.changeLanguage(e.target.value);
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const [userData, setUserData] = useState(
    JSON.parse(localStorage.getItem("userInfo"))
  );

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const authenticated = localStorage.getItem("authenticated");

  useEffect(() => {
    if (authenticated) {
      const data = JSON.parse(localStorage.getItem("userInfo"));
      setUserData(data);
    }
  }, [authenticated]);
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
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
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton
                  color="primary"
                  onClick={handleOpenUserMenu}
                  sx={{ p: 0 }}
                >
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
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
