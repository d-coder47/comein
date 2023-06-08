import React from "react";
import "./profile.css";
import NavBar from "../../components/NavBar";
import ProfileCards from "../../components/ProfileCards";
import {
  Typography,
  Avatar,
  Grid,
  Paper,
  Box,
  IconButton,
  Button,
  Input,
  Tabs,
  Tooltip,
  Tab,
  TextField,
} from "@mui/material";
import {
  Edit,
  Settings,
  LocationOn,
  PhotoCamera,
  Add,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import useUserProfile from "../../hooks/useUserProfile";
import useRegisterUser from "../../hooks/useRegisterUser";

const UserProfile = () => {
  const user = {
    name: "John Doe",
    email: "johndoe@example.com",
    location: "New York",
    bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed fermentum hendrerit justo, et efficitur ligula tincidunt eu.",
    avatar: "/static/images/avatar.jpg",
    coverPhoto: "/static/images/cover-photo.jpg",
  };

  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  const navigate = useNavigate();

  const [selectedTab, setSelectedTab] = React.useState(0);

  const [profilePhoto, setProfilePhoto] = React.useState(
    userInfo.img_perfil ? userInfo.img_perfil : null
  );
  const [profileBannerPhoto, setProfileBannerPhoto] = React.useState(null);

  const { updateUserProfileBanner, updateUserProfilePhoto } = useUserProfile();

  const { getUser } = useRegisterUser();

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const handlePhotoUpload = async (event) => {
    const file = event.target.files[0];
    var reader = new FileReader();
    reader.onload = async function (e) {
      const update_res = await updateUserProfilePhoto(userInfo.id, {
        uri: e.target.result,
        name: file.name,
        type: file.type,
      });
      const user = await getUser(userInfo.id);
      setProfilePhoto(e.target.result);

      localStorage.setItem("userInfo", JSON.stringify(user.dados));
    };
    reader.readAsDataURL(event.target.files[0]);
  };

  const handleBannerPhotoUpload = async (event) => {
    const file = event.target.files[0];

    const res = await updateUserProfilePhotos(
      userInfo.id,
      "PUT",
      null,
      URL.createObjectURL(file)
    );

    const user = await getUser(userInfo.id);

    localStorage.setItem("userInfo", JSON.stringify(user.dados));
    setProfileBannerPhoto(URL.createObjectURL(file));
  };

  return (
    <>
      <NavBar />
      <div className="profile_container">
        <div className="banner_container">
          <div>
            <label htmlFor="upload-banner-photo">
              <Input
                style={{ display: "none" }}
                id="upload-banner-photo"
                name="upload-photo"
                type="file"
                accept="image/*"
                onChange={handleBannerPhotoUpload}
              />

              <IconButton
                color="primary"
                sx={{ width: "100%", height: "100%", padding: 0 }}
                component="span"
              >
                <Avatar
                  alt="User Profile Banner Photo"
                  sx={{ width: "100%", height: 310, borderRadius: 0 }}
                  src={profileBannerPhoto}
                >
                  <PhotoCamera />
                </Avatar>
              </IconButton>
            </label>
          </div>
        </div>
        <Box
          sx={{
            padding: "2rem",
            height: "100%",
          }}
        >
          <Grid className="profile_main_grid" container spacing={2}>
            <Grid
              item
              xs={12}
              md={4}
              className="profile_second_grid"
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
                <div>
                  <label htmlFor="upload-photo">
                    <Input
                      style={{ display: "none" }}
                      id="upload-photo"
                      name="upload-photo"
                      type="file"
                      accept="image/*"
                      onChange={handlePhotoUpload}
                    />

                    <IconButton color="primary" component="span">
                      <Avatar
                        alt="User Profile Photo"
                        sx={{ width: 150, height: 150 }}
                        src={profilePhoto}
                      >
                        <PhotoCamera />
                      </Avatar>
                    </IconButton>
                  </label>
                </div>
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
                    onClick={() => navigate("/edit-profile")}
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
                <Tooltip title="Configurações">
                  <IconButton color="primary">
                    <Settings />
                  </IconButton>
                </Tooltip>
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
                <TextField
                  label={
                    <Typography
                      variant="h6"
                      sx={{
                        fontSize: 18,
                        fontWeight: "bold",
                        color: "#000",
                      }}
                    >
                      Sobre
                    </Typography>
                  }
                  value="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi. Sed gravida feugiat neque, nec viverra ante volutpat id."
                  disabled
                  multiline
                  rows={4}
                  fullWidth
                  variant="standard"
                  InputProps={{
                    disableUnderline: true,
                  }}
                />
              </Paper>
            </Grid>
            <Grid item xs={5} md={8} className="cards_grid_container">
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Tabs value={selectedTab} onChange={handleTabChange}>
                  <Tab label="Eventos" />
                  <Tab label="Projetos" />
                  <Tab label="Favoritos" />
                </Tabs>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Tooltip title="Adicionar evento">
                  <IconButton color="primary">
                    <Add />
                  </IconButton>
                </Tooltip>
              </Box>

              {selectedTab === 0 && <ProfileCards />}
              {selectedTab === 1 && (
                <Typography variant="h6">Projetos</Typography>
              )}
              {selectedTab === 2 && (
                <Typography variant="h6">Favoritos</Typography>
              )}
            </Grid>
          </Grid>
        </Box>
      </div>
    </>
  );
};

export default UserProfile;
