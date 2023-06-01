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
  return (
    <>
      <NavBar />
      <div className="profile_container">
        <div className="banner_container"></div>
        <Box
          sx={{
            backgroundColor: "#f8f8f8",
            padding: "2rem",
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
              <Paper elevation={3} sx={{ padding: "2rem" }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography variant="h4">{user.name}</Typography>
                  <Box>
                    <IconButton color="primary">
                      <Edit />
                    </IconButton>
                    <IconButton color="primary">
                      <Settings />
                    </IconButton>
                  </Box>
                </Box>
                <Typography
                  variant="body1"
                  color="textSecondary"
                  sx={{ mt: 2 }}
                >
                  <Email fontSize="small" sx={{ marginRight: "0.5rem" }} />
                  {user.email}
                </Typography>
                <Typography variant="body1" color="textSecondary">
                  <LocationOn fontSize="small" sx={{ marginRight: "0.5rem" }} />
                  {user.location}
                </Typography>
                <Box sx={{ mt: 2 }}>
                  <Typography variant="body2">{user.bio}</Typography>
                </Box>
                <Box sx={{ mt: 2, display: "flex", alignItems: "center" }}>
                  <Description
                    fontSize="small"
                    sx={{ marginRight: "0.5rem" }}
                  />
                  <Typography variant="body2">Portfolio</Typography>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </Box>
      </div>
    </>
  );
};

export default UserProfile;
