import React from "react";
import "./profile.css";
import NavBar from "../../components/NavBar";
import Cards from "../../components/Cards";
import useUserProfile from "../../hooks/useUserProfile";
import AddEvent from "../../components/AddEvent";
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
  Modal,
} from "@mui/material";
import {
  Edit,
  Settings,
  LocationOn,
  PhotoCamera,
  Add,
  Close,
} from "@mui/icons-material";
import { useNavigate, useParams } from "react-router-dom";
import useRegisterUser from "../../hooks/useRegisterUser";
import { useTranslation } from "react-i18next";

const UserProfile = () => {
  const params = useParams();
  const { userName, userId } = params;
  const loggedUserInfo = JSON.parse(localStorage.getItem("userInfo"));
  const [pageUserInfo, setPageUserInfo] = React.useState();
  const authenticated = localStorage.getItem("authenticated");

  const [followers, setFollowers] = React.useState();
  const [visits, setVisits] = React.useState();
  const [following, setFollowing] = React.useState();

  const navigate = useNavigate();
  const { t } = useTranslation();

  const [selectedTab, setSelectedTab] = React.useState(0);

  const [profilePhoto, setProfilePhoto] = React.useState();
  const [profileBannerPhoto, setProfileBannerPhoto] = React.useState();

  const [openAddEventsModal, setOpenAddEventsModal] = React.useState(false);
  const handleOpenAddEventsModal = () => setOpenAddEventsModal(true);
  const handleCloseAddEventsModal = () => setOpenAddEventsModal(false);

  const {
    updateUserProfileBanner,
    updateUserProfilePhoto,
    getUserProfileFollowers,
    getUserProfileVisits,
    getUserProfileFollowing,
  } = useUserProfile();

  const { getUser } = useRegisterUser();

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const handlePhotoUpload = async (event) => {
    const file = event.target.files[0];

    var reader = new FileReader();
    reader.onload = async function (e) {
      const update_res = await updateUserProfilePhoto(loggedUserInfo.id, file);
      const user = await getUser(loggedUserInfo.id);
      setProfilePhoto(user.dados.img_perfil);

      localStorage.setItem("userInfo", JSON.stringify(user.dados));
    };
    reader.readAsDataURL(event.target.files[0]);
  };

  const handleBannerPhotoUpload = async (event) => {
    const file = event.target.files[0];

    var reader = new FileReader();
    reader.onload = async function (e) {
      const update_res = await updateUserProfileBanner(loggedUserInfo.id, file);
      const user = await getUser(loggedUserInfo.id);
      setProfileBannerPhoto(user.dados.img_capa);

      localStorage.setItem("userInfo", JSON.stringify(user.dados));
    };
    reader.readAsDataURL(event.target.files[0]);
  };

  React.useEffect(() => {
    async function fetchData() {
      const pageOwner = await getUser(userId);
      setPageUserInfo(pageOwner.dados);
      setProfilePhoto(pageOwner.dados.img_perfil);
      setProfileBannerPhoto(pageOwner.dados.img_capa);
      const loggedUser = await getUser(loggedUserInfo.id);
      localStorage.setItem("userInfo", JSON.stringify(loggedUser.dados));
      const followers_res = await getUserProfileFollowers(loggedUser.dados.id);
      const visits_res = await getUserProfileVisits(loggedUser.dados.id);
      const following_res = await getUserProfileFollowing(loggedUser.dados.id);
      setFollowers(followers_res.dados);
      setVisits(visits_res.dados);
      setFollowing(following_res.dados.seguidores);
    }
    if (!authenticated) {
      navigate("/");
    } else {
      fetchData();
    }
  }, []);

  return (
    <>
      <NavBar />
      <div className="profile_container">
        <div className="banner_container">
          {profileBannerPhoto && (
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
                    src={`https://comein.cv/comeincv_api_test/img/capaImg/${profileBannerPhoto}`}
                  >
                    <PhotoCamera />
                  </Avatar>
                </IconButton>
              </label>
            </div>
          )}
        </div>
        {pageUserInfo && (
          <Box
            sx={{
              padding: "2rem",
              height: "100vh",
              background: "#f8f8f8",
            }}
          >
            <Grid className="profile_main_grid" container spacing={2}>
              <Grid
                item
                xs={12}
                md={4}
                className="profile_second_grid"
                sx={{ position: "absolute", top: "20%", left: "3%" }}
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
                  {profilePhoto && (
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
                            src={`https://comein.cv/comeincv_api_test/img/perfilImg/${profilePhoto}`}
                          >
                            <PhotoCamera />
                          </Avatar>
                        </IconButton>
                      </label>
                    </div>
                  )}
                  <Typography variant="h5" sx={{ marginTop: "1rem" }}>
                    {pageUserInfo.nome}
                  </Typography>
                  <Typography variant="body1" color="textSecondary">
                    {pageUserInfo.email}
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      marginTop: "1rem",
                    }}
                  >
                    <LocationOn
                      fontSize="small"
                      sx={{ marginRight: "0.5rem" }}
                    />
                    <Typography variant="body2">
                      {pageUserInfo.residencia}
                    </Typography>
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
                        textTransform: "none",
                      }}
                    >
                      <IconButton
                        sx={{
                          color: "#ffffff",
                          fontSize: "16px",
                        }}
                      >
                        <Edit /> {t("userProfile.editarPerfil")}
                      </IconButton>
                    </Button>
                  </Box>
                  <Tooltip title={t("userProfile.configuracoes")}>
                    <IconButton
                      color="primary"
                      onClick={() => navigate("/user-profile-configuration")}
                    >
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
                        fontSize: "16px",
                      }}
                    >
                      {t("userProfile.seguidores")}
                    </Typography>

                    <Typography
                      variant="h6"
                      sx={{
                        marginTop: "1rem",
                        fontSize: "16px",
                        fontWeight: "bold",
                      }}
                    >
                      {followers}
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
                        fontSize: "16px",
                      }}
                    >
                      {t("userProfile.seguindo")}
                    </Typography>

                    <Typography
                      variant="h6"
                      sx={{
                        fontSize: "16px",
                        fontWeight: "bold",
                      }}
                    >
                      {following}
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
                        fontSize: "16px",
                      }}
                    >
                      {t("userProfile.visitantes")}
                    </Typography>

                    <Typography
                      variant="h6"
                      sx={{
                        // marginTop: "1rem",
                        marginBottom: "2rem",
                        fontSize: "16px",
                        fontWeight: "bold",
                      }}
                    >
                      {visits}
                    </Typography>
                  </Box>
                  <TextField
                    label={
                      <Typography
                        variant="h6"
                        sx={{
                          fontSize: "16px",
                          fontWeight: "bold",
                          color: "#000",
                        }}
                      >
                        {t("userProfile.sobre")}
                      </Typography>
                    }
                    value={pageUserInfo.bio}
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
                    justifyContent: "left",
                    alignItems: "center",
                  }}
                >
                  <Tabs value={selectedTab} onChange={handleTabChange}>
                    <Tab
                      label={t("userProfile.eventos")}
                      sx={{ textTransform: "none" }}
                    />
                    <Tab
                      label={t("userProfile.projetos")}
                      sx={{ textTransform: "none" }}
                    />
                    <Tab
                      label={t("userProfile.favoritos")}
                      sx={{ textTransform: "none" }}
                    />
                  </Tabs>
                </Box>

                {selectedTab === 0 && (
                  <Typography variant="h6">
                    <>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          flexDirection: "column",
                        }}
                      >
                        <Tooltip title="Adicionar evento">
                          <IconButton
                            color="primary"
                            onClick={handleOpenAddEventsModal}
                          >
                            <Add />
                          </IconButton>
                        </Tooltip>
                        <Cards culturalAreaId={""} />
                      </Box>
                      <Modal
                        open={openAddEventsModal}
                        onClose={handleCloseAddEventsModal}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                      >
                        <Box>
                          <IconButton
                            aria-label="close"
                            color="inherit"
                            size="small"
                            onClick={handleCloseAddEventsModal}
                            sx={{
                              position: "absolute",
                              top: 8,
                              right: 8,
                            }}
                          >
                            <Close />
                          </IconButton>
                          <AddEvent />
                        </Box>
                      </Modal>
                    </>
                  </Typography>
                )}
                {selectedTab === 1 && (
                  <Typography variant="h6">
                    <>
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
                      {t("userProfile.projetos")}
                    </>
                  </Typography>
                )}
                {selectedTab === 2 && (
                  <Typography variant="h6">
                    {t("userProfile.favoritos")}
                  </Typography>
                )}
              </Grid>
            </Grid>
          </Box>
        )}
      </div>
    </>
  );
};

export default UserProfile;
