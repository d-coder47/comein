import React from "react";
import "./profile.css";
import NavBar from "../../components/NavBar";
import {
  Typography,
  Avatar,
  Grid,
  Paper,
  Box,
  IconButton,
  Button,
} from "@mui/material";
import {
  Edit,
  Settings,
  Email,
  LocationOn,
  Description,
} from "@mui/icons-material";

const UserProfile = () => {
  const user = {
    name: "John Doe",
    email: "johndoe@example.com",
    location: "New York",
    bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed fermentum hendrerit justo, et efficitur ligula tincidunt eu.",
    avatar: "/static/images/avatar.jpg", // Replace with your avatar image URL
    coverPhoto: "/static/images/cover-photo.jpg", // Replace with your cover photo image URL
  };

  const [displayEventos, setDisplayEventos] = React.useState(true);
  const [displayProjetos, setDisplayProjetos] = React.useState(false);
  const [displayFavoritos, setDisplayFavoritos] = React.useState(false);

  const handleTabClick = (tab) => () => {
    if (tab === "eventos") {
      setDisplayEventos(true);
      setDisplayFavoritos(false);
      setDisplayProjetos(false);
    } else if (tab === "projetos") {
      setDisplayEventos(false);
      setDisplayFavoritos(false);
      setDisplayProjetos(true);
    } else {
      setDisplayEventos(false);
      setDisplayFavoritos(true);
      setDisplayProjetos(false);
    }
  };
  return (
    <>
      <NavBar />
      <div className="profile_container">
        <div className="banner_container"></div>
        <Box
          sx={{
            backgroundColor: "#f8f8f8",

            padding: "2rem",
            height: "100%",
          }}
        >
          <Grid className="profile_main_grid" container spacing={2}>
            <Grid
              item
              xs={12}
              md={4}
              sx={{ position: "absolute", top: "15%", left: "2%" }}
            >
              <Paper
                elevation={3}
                className="user_photo_container"
                sx={{
                  padding: "1rem",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Avatar
                  alt="User Avatar"
                  src={user.avatar}
                  sx={{ width: 150, height: 150 }}
                />
                <Typography variant="h5" sx={{ marginTop: "1rem" }}>
                  {user.name}
                </Typography>
                <Typography variant="body1" color="textSecondary">
                  {user.email}
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    marginTop: "1rem",
                  }}
                >
                  <LocationOn fontSize="small" sx={{ marginRight: "0.5rem" }} />
                  <Typography variant="body2">{user.location}</Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    marginTop: "2rem",
                    textAlign: "center",
                  }}
                >
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{
                      m: 3,
                      color: "#ffffff",
                      width: "40ch",
                      borderRadius: "20px",
                    }}
                  >
                    <IconButton
                      sx={{
                        color: "#ffffff",
                        fontSize: "16px",
                      }}
                    >
                      <Edit /> Editar perfil
                    </IconButton>
                  </Button>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    marginTop: "2rem",
                    textAlign: "center",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    width: "80%",
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      marginTop: "1rem",
                      fontSize: 18,
                    }}
                  >
                    Seguidores
                  </Typography>

                  <Typography
                    variant="h6"
                    sx={{
                      marginTop: "1rem",
                      fontSize: 18,
                      fontWeight: "bold",
                    }}
                  >
                    44545{" "}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    marginTop: "0.2rem",
                    textAlign: "center",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    width: "80%",
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      fontSize: 18,
                    }}
                  >
                    Seguindo
                  </Typography>

                  <Typography
                    variant="h6"
                    sx={{
                      fontSize: 18,
                      fontWeight: "bold",
                    }}
                  >
                    44545{" "}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    marginTop: "0.2rem",
                    textAlign: "center",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    width: "80%",
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      // marginTop: "1rem",
                      marginBottom: "2rem",
                      fontSize: 18,
                    }}
                  >
                    Visitantes
                  </Typography>

                  <Typography
                    variant="h6"
                    sx={{
                      // marginTop: "1rem",
                      marginBottom: "2rem",
                      fontSize: 18,
                      fontWeight: "bold",
                    }}
                  >
                    44545{" "}
                  </Typography>
                </Box>
                <IconButton color="primary">
                  <Settings />
                </IconButton>
              </Paper>
            </Grid>
            <Grid item xs={5} md={8}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleTabClick("eventos")}
                  sx={{
                    m: 3,
                    color: "#ffffff",
                    width: "40ch",
                    borderRadius: "20px",
                  }}
                >
                  Eventos
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleTabClick("projetos")}
                  sx={{
                    m: 3,
                    color: "#ffffff",
                    width: "40ch",
                    borderRadius: "20px",
                  }}
                >
                  Projetos
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleTabClick("favoritos")}
                  sx={{
                    m: 3,
                    color: "#ffffff",
                    width: "40ch",
                    borderRadius: "20px",
                  }}
                >
                  Favoritos
                </Button>
              </Box>
              {displayEventos && <div>eventos</div>}

              {displayProjetos && <div>Projecto</div>}
              {displayFavoritos && <div>Favoritos</div>}
            </Grid>
          </Grid>
        </Box>
      </div>
    </>
  );
};

export default UserProfile;
