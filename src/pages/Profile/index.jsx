import React from "react";
import "./profile.css";
import NavBar from "../../components/NavBar";
import ListPublications from "../../components/ListPublications";
import useUserProfile from "../../hooks/useUserProfile";
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
  InputBase,
  Menu,
  MenuItem,
} from "@mui/material";
import {
  Edit,
  Settings,
  LocationOn,
  PhotoCamera,
  Add,
  Search,
} from "@mui/icons-material";
import { useNavigate, useParams } from "react-router-dom";
import useRegisterUser from "../../hooks/useRegisterUser";
import { useTranslation } from "react-i18next";
import { styled, alpha } from "@mui/material/styles";

import ReactQuill from "react-quill";

import "react-quill/dist/quill.bubble.css";

const UserProfile = () => {
  const params = useParams();
  const { userId } = params;
  const loggedUserInfo = JSON.parse(localStorage.getItem("userInfo"));
  const [pageUserInfo, setPageUserInfo] = React.useState();
  const authenticated = localStorage.getItem("authenticated");

  const [followers, setFollowers] = React.useState();
  const [visits, setVisits] = React.useState();
  const [following, setFollowing] = React.useState();

  const [visitor, setVisitor] = React.useState(false);
  const [isVisitorFollowing, setIsVisitorFollowing] = React.useState(false);

  const navigate = useNavigate();
  const { t } = useTranslation();

  const [selectedTab, setSelectedTab] = React.useState("event");

  const [profilePhoto, setProfilePhoto] = React.useState();
  const [profileBannerPhoto, setProfileBannerPhoto] = React.useState();

  const {
    updateUserProfileBanner,
    updateUserProfilePhoto,
    getUserProfileFollowers,
    getUserProfileVisits,
    getUserProfileFollowing,
    followUser,
    isFollowing,
  } = useUserProfile();

  const { getUser } = useRegisterUser();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const handlePhotoUpload = async (event) => {
    const file = event.target.files[0];

    var reader = new FileReader();
    reader.onload = async function () {
      await updateUserProfilePhoto(loggedUserInfo.id, file);
      const user = await getUser(loggedUserInfo.id);
      setProfilePhoto(user.dados.img_perfil);

      localStorage.setItem("userInfo", JSON.stringify(user.dados));
    };
    reader.readAsDataURL(event.target.files[0]);
  };

  const handleBannerPhotoUpload = async (event) => {
    const file = event.target.files[0];

    var reader = new FileReader();
    reader.onload = async function () {
      await updateUserProfileBanner(loggedUserInfo.id, file);
      const user = await getUser(loggedUserInfo.id);
      setProfileBannerPhoto(user.dados.img_capa);

      localStorage.setItem("userInfo", JSON.stringify(user.dados));
    };
    reader.readAsDataURL(event.target.files[0]);
  };

  const handleFollowingUser = async () => {
    const follow_res = await followUser(loggedUserInfo.id, userId);
    const followers_res = await getUserProfileFollowers(userId);
    setFollowers(followers_res.dados);

    if (follow_res) {
      setIsVisitorFollowing(true);
    } else {
      setIsVisitorFollowing(false);
    }
  };

  React.useEffect(() => {
    async function fetchData() {
      const pageOwner = await getUser(userId);
      setPageUserInfo(pageOwner.dados);
      setProfilePhoto(pageOwner.dados.img_perfil);
      if (!pageOwner.dados.img_capa) {
        setProfileBannerPhoto("");
      } else {
        setProfileBannerPhoto(pageOwner.dados.img_capa);
      }
      const loggedUser = await getUser(loggedUserInfo.id);
      localStorage.setItem("userInfo", JSON.stringify(loggedUser.dados));
      const followers_res = await getUserProfileFollowers(userId);
      const visits_res = await getUserProfileVisits(userId);
      const following_res = await getUserProfileFollowing(userId);
      setFollowers(followers_res.dados);
      setVisits(visits_res.dados);
      setFollowing(following_res.dados.seguidores);
    }
    async function checkIsFollowing() {
      const isFollowingUser = await isFollowing(loggedUserInfo.id, userId);
      if (isFollowingUser) {
        setIsVisitorFollowing(true);
      } else {
        setIsVisitorFollowing(false);
      }
    }
    if (!authenticated) {
      navigate("/");
    } else {
      fetchData();
      checkIsFollowing();
      if (userId !== loggedUserInfo.id) {
        setVisitor(true);
      }
    }
  }, []);

  const SearchElement = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    // backgroundColor: alpha(theme.palette.common.white, 0.15),
    // "&:hover": {
    //   backgroundColor: alpha(theme.palette.common.white, 0.25),
    // },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  }));

  const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }));

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    "& .MuiInputBase-input": {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        width: "12ch",
        "&:focus": {
          width: "20ch",
        },
      },
    },
  }));

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
                disabled={visitor}
              />

              <IconButton
                color="primary"
                sx={{ width: "100%", height: "100%", padding: 0 }}
                component="span"
              >
                <Avatar
                  alt="User Profile Banner Photo"
                  sx={{
                    width: "100%",
                    height: 310,
                    borderRadius: 0,
                    "&:hover": {
                      position: "relative",
                      "&::after": {
                        content: "' '",
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: "rgba(0, 0, 0, 0.6)",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      },
                    },
                  }}
                  src={`https://comein.cv/comeincv_api_test/img/capaImg/${profileBannerPhoto}`}
                >
                  <PhotoCamera />
                </Avatar>
              </IconButton>
            </label>
          </div>
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
                          disabled={visitor}
                        />

                        <IconButton color="primary" component="span">
                          <Avatar
                            alt="User Profile Photo"
                            sx={{
                              width: 150,
                              height: 150,
                              "&:hover": {
                                position: "relative",
                                "&::after": {
                                  content: "' '",
                                  position: "absolute",
                                  top: 0,
                                  left: 0,
                                  right: 0,
                                  bottom: 0,
                                  backgroundColor: "rgba(0, 0, 0, 0.6)",
                                  display: "flex",
                                  justifyContent: "center",
                                  alignItems: "center",
                                },
                              },
                            }}
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
                    <Tooltip
                      title={
                        visitor && isVisitorFollowing
                          ? t("userProfile.deixarSeguir")
                          : ""
                      }
                    >
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={
                          visitor
                            ? handleFollowingUser
                            : () =>
                                navigate(
                                  `/edit-profile/${loggedUserInfo.id}/${loggedUserInfo.nome}`
                                )
                        }
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
                          {visitor && isVisitorFollowing ? (
                            t("userProfile.seguindo")
                          ) : visitor && !isVisitorFollowing ? (
                            t("userProfile.seguir")
                          ) : (
                            <>
                              <Edit sx={{ marginRight: "5px" }} />
                              {t("userProfile.editarPerfil")}
                            </>
                          )}
                        </IconButton>
                      </Button>
                    </Tooltip>
                  </Box>
                  {!visitor && (
                    <Tooltip title={t("userProfile.configuracoes")}>
                      <IconButton
                        color="primary"
                        onClick={() =>
                          navigate(
                            `/user-profile-configuration/${loggedUserInfo.id}/${loggedUserInfo.nome}`
                          )
                        }
                      >
                        <Settings />
                      </IconButton>
                    </Tooltip>
                  )}
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
                </Paper>
              </Grid>
              <Grid item xs={5} md={8} className="cards_grid_container">
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "left",
                    alignItems: "center",
                    marginLeft: { md: "3rem", lg: "3rem" },
                  }}
                >
                  <Tabs value={selectedTab} onChange={handleTabChange}>
                    <Tab
                      value="event"
                      label={t("userProfile.eventos")}
                      sx={{ textTransform: "none" }}
                    />
                    <Tab
                      value="project"
                      label={t("userProfile.projetos")}
                      sx={{ textTransform: "none" }}
                    />
                    {!visitor && (
                      <Tab
                        value="favs"
                        label={t("userProfile.favoritos")}
                        sx={{ textTransform: "none" }}
                      />
                    )}
                    <Tab
                      value="about"
                      label={t("userProfile.sobre")}
                      sx={{ textTransform: "none" }}
                    />
                    <Tab
                      label={
                        <SearchElement>
                          <SearchIconWrapper>
                            <Search />
                          </SearchIconWrapper>
                          <StyledInputBase
                            placeholder="Search…"
                            inputProps={{ "aria-label": "search" }}
                          />
                        </SearchElement>
                      }
                      sx={{ textTransform: "none" }}
                    />
                  </Tabs>
                </Box>

                {selectedTab === "event" && (
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      flexDirection: "column",
                    }}
                  >
                    <ListPublications
                      userID={userId}
                      type={"event"}
                      isVisitor={visitor}
                    />
                  </Box>
                )}
                {selectedTab === "project" && (
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <ListPublications
                      userID={userId}
                      type={"project"}
                      isVisitor={visitor}
                    />
                  </Box>
                )}
                {selectedTab === "favs" && (
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <ListPublications
                      userID={userId}
                      type={"favs"}
                      isVisitor={visitor}
                    />
                  </Box>
                )}

                {selectedTab === "about" && (
                  <>
                    <ReactQuill
                      theme="bubble"
                      readOnly
                      value={pageUserInfo.bio}
                    />
                  </>
                )}
                {selectedTab === 4 && (
                  <Typography variant="h6">Resultados do search</Typography>
                )}
              </Grid>
            </Grid>
          </Box>
        )}
      </div>
      {!visitor ? (
        <>
          <Box
            sx={{
              width: "2.5rem",
              height: "2.5rem",
              backgroundColor: "#33B3CC",
              position: "fixed",
              bottom: "25px",
              right: "20px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: "50%",
              cursor: "pointer",
              "&:hover": {
                backgroundColor: "#743600",
              },
            }}
          >
            <Tooltip title="Adicionar">
              <Button onClick={handleClick}>
                <Add
                  sx={{
                    color: "#fff",
                    fontSize: "2rem",
                  }}
                />
              </Button>
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
            transformOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
          >
            <MenuItem
              onClick={() => {
                handleClose();
                navigate("/eventos/adicionar");
              }}
            >
              Adicionar Evento
            </MenuItem>
            <MenuItem
              onClick={() => {
                handleClose();
                navigate("/projetos/adicionar");
              }}
            >
              Adicionar Projeto
            </MenuItem>
          </Menu>
        </>
      ) : null}
    </>
  );
};

export default UserProfile;
