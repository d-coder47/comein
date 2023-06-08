import React, { useState } from "react";
import {
  Avatar,
  Box,
  Menu,
  MenuItem,
  Typography,
  Stack,
  Button,
} from "@mui/material";
import { ArrowDropDown, LocationOn } from "@mui/icons-material";

const PublisherCard = ({ publisher }) => {
  return (
    <Box display="flex" alignItems="center" gap=".5rem">
      <Avatar
        src={`https://comein.cv/comeincv_api_test/img/perfilImg/${publisher.img_perfil}`}
        alt={`Foto de ${publisher?.nome}`}
      >
        {publisher?.nome ? publisher?.nome[0] : "A"}
      </Avatar>
      <Stack>
        <Typography ml=".25rem">{publisher?.nome}</Typography>
        <Stack direction="row" alignItems="center" spacing={0.25}>
          <LocationOn sx={{ color: "gray" }} fontSize="1.25rem" />
          <Typography>
            {publisher.residencia}, {publisher.pais}
          </Typography>
        </Stack>
      </Stack>
      <Box
        sx={{
          backgroundColor: (theme) => theme.palette.primary.main,
          padding: ".25rem .5rem",
          borderRadius: ".25rem",
          marginLeft: "1rem",
          color: "white",
          "&:hover": {
            backgroundColor: (theme) => theme.palette.primary.dark,
          },
        }}
      >
        Seguir
      </Box>
    </Box>
  );
};

const Publisher = ({ publishers = [{ nome: "" }] }) => {
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <Box>
      {publishers?.length > 0 ? (
        <Box>
          <Box
            display="flex"
            gap=".25rem"
            sx={{
              cursor: "pointer",
            }}
            // onMouseEnter={handleOpenUserMenu}
            // onMouseLeave={handleCloseUserMenu}
          >
            <Typography
              onMouseEnter={handleOpenUserMenu}
              sx={{
                cursor: "pointer",
              }}
            >
              Vários proprietários
            </Typography>
            <ArrowDropDown
              onMouseEnter={handleOpenUserMenu}
              sx={{
                cursor: "pointer",
              }}
            />
          </Box>
          <Menu
            sx={{ mt: "45px", ".MuiPaper-root": { padding: ".25rem .5rem" } }}
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
            {publishers.map((publisher, index) => (
              <MenuItem
                key={publisher.nome + index}
                onClick={handleCloseUserMenu}
              >
                <PublisherCard publisher={publisher} />
              </MenuItem>
            ))}
          </Menu>
        </Box>
      ) : (
        <Typography
          fontWeight="bold"
          fontSize="0.9rem"
          sx={{
            "&:hover": {
              textDecoration: "underline",
              cursor: "pointer",
            },
          }}
        >
          {publishers[0]?.nome}
        </Typography>
      )}
    </Box>
  );
};

export default Publisher;
