import React, { useState } from "react";
import {
  Avatar,
  Box,
  Menu,
  MenuItem,
  Typography,
  Stack,
  Button,
  Divider,
  ListItem,
  List,
} from "@mui/material";
import {
  ArrowDropDown,
  FormatListNumbered,
  LocationOn,
} from "@mui/icons-material";

import wallpaper from "../assets/img/event3.jpg";

const PublisherCard = ({ publisher }) => {
  const getResidencia = (residencia) => {
    return residencia === "MUNDO" || residencia === null
      ? ""
      : `${residencia}, `;
  };
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
            {`${getResidencia(publisher.residencia)}`} {publisher.pais}
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
  const [showUserCard, setShowUserCard] = useState(FormatListNumbered);

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
        <>
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
            {publishers?.nome}
          </Typography>
          {showUserCard ? (
            <Box
              sx={{
                position: "absolute",
                zIndex: "9",
                width: "22rem",
                paddingBottom: "1.25rem",
                backgroundColor: "white",
                borderRadius: "0.25rem",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              {/* <Avatar src={`https://comein.cv/comeincv_api_test/capaImg/${publisher.capa}`} alt={""} sx={{}} /> */}
              <Avatar
                variant="square"
                src={wallpaper}
                alt={`Foto de capa de ${publishers?.nome}`}
                sx={{
                  width: "100%",
                  height: "7rem",
                  objectFit: "fill",
                }}
              />
              <Avatar
                src={`https://comein.cv/comeincv_api_test/img/perfilImg/${publishers.img_perfil}`}
                alt={`Foto de perfil de ${publishers?.nome}`}
                sx={{
                  width: "4.25rem",
                  height: "4.25rem",
                  transform: "translateY(-50%)",
                  border: "2px solid white",
                }}
              />
              <Typography
                sx={{
                  color: "black",
                  fontWeight: "bold",
                  fontSize: "1rem",
                }}
              >
                {publishers?.nome}
              </Typography>
              <Typography
                sx={{
                  color: "gray",
                  fontWeight: "bold",
                  fontSize: ".8rem",
                  display: "flex",
                  alignItems: "center",
                  gap: ".125rem",
                }}
              >
                {" "}
                <LocationOn sx={{ color: "gray" }} fontSize="1.25rem" />
                {`Barcelona, Espanha`}
              </Typography>
              <List
                id="info-group"
                sx={{ display: "flex", alignItems: "center" }}
              >
                <ListItem
                  id="likes"
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    sx={{
                      color: "black",
                      fontWeight: "bold",
                      fontSize: "1rem",
                    }}
                  >
                    47
                  </Typography>
                  <Typography
                    sx={{
                      color: "gray",
                      fontWeight: "bold",
                      fontSize: ".8rem",
                    }}
                  >
                    Gostos
                  </Typography>
                </ListItem>
                <Divider orientation="vertical" />
                <ListItem
                  id="followers"
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    sx={{
                      color: "black",
                      fontWeight: "bold",
                      fontSize: "1rem",
                    }}
                  >
                    147
                  </Typography>
                  <Typography
                    sx={{
                      color: "gray",
                      fontWeight: "bold",
                      fontSize: ".8rem",
                    }}
                  >
                    Seguidores
                  </Typography>
                </ListItem>
                <Divider orientation="vertical" />
                <ListItem
                  id="visits"
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    sx={{
                      color: "black",
                      fontWeight: "bold",
                      fontSize: "1rem",
                    }}
                  >
                    4.7K
                  </Typography>
                  <Typography
                    sx={{
                      color: "gray",
                      fontWeight: "bold",
                      fontSize: ".8rem",
                    }}
                  >
                    Visitas
                  </Typography>
                </ListItem>
              </List>
              <Button
                variant="contained"
                color="primary"
                size="small"
                width="80%"
              >
                Seguir
              </Button>
            </Box>
          ) : null}
        </>
      )}
    </Box>
  );
};

export default Publisher;
