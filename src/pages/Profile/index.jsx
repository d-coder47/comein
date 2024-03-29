import React from "react";
import "./profile.css";
import NavBar from "../../components/NavBar";
import ListPublications from "../../components/ListPublications";
import ListSearchedPublications from "../../components/ListSearchedPublications";
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
  Menu,
  MenuItem,
  TextField,
  InputAdornment,
  LinearProgress,
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
import usePosts from "../../hooks/usePosts";

import ReactQuill from "react-quill";

import "react-quill/dist/quill.bubble.css";

import { toast } from "react-toastify";
import { imgApiPath } from "../../api/apiPath";
import { redirectToProfileConfigPage } from "../../utils/generateUrl";

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

  const { getEventPostByUser, getProjectPostByUser } = usePosts();
  const [allPosts, setAllPosts] = React.useState();
  const [searchOptions, setSearchOptions] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  const navigate = useNavigate();
  const { t } = useTranslation();

  const [selectedTab, setSelectedTab] = React.useState("event");

  const [profilePhoto, setProfilePhoto] = React.useState();
  const [profileBannerPhoto, setProfileBannerPhoto] = React.useState();

  const [isSmallScreen, setIsSmallScreen] = React.useState(false);

  const [searchQuery, setSearchQuery] = React.useState("");

  const [scrolled, setScrolled] = React.useState(0);

  const {
    updateUserProfileBanner,
    updateUserProfilePhoto,
    getUserProfileFollowers,
    getUserProfileVisits,
    getUserProfileFollowing,
    followUser,
    isFollowing,
    setUserProfileVisit,
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

  const handleTabChange = (_, newValue) => {
    setSelectedTab(newValue);
  };

  const handleSearchTabClick = () => {
    setSelectedTab("search");
  };

  const handleSearch = () => {
    const filteredArray = allPosts.filter((item) => {
      return item.nome.toLowerCase().includes(searchQuery.toLowerCase());
    });

    setSearchOptions(filteredArray);
  };

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
    handleSearch();
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  const handlePhotoUpload = async (event) => {
    setLoading(true);
    const file = event.target.files[0];

    const fileSizeInMB = file.size / (1024 * 1024); // 1 MB = 1024 KB, 1 KB = 1024 bytes

    if (fileSizeInMB.toFixed(2) >= 5) {
      toast.error(t("projectPage.common.imageSizeError"));
    } else {
      var reader = new FileReader();
      reader.onload = async function () {
        await updateUserProfilePhoto(loggedUserInfo.id, file);
        setLoading(false);
        const user = await getUser(loggedUserInfo.id);
        setProfilePhoto(user.dados.img_perfil);

        localStorage.setItem("userInfo", JSON.stringify(user.dados));
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  const handleBannerPhotoUpload = async (event) => {
    setLoading(true);
    const file = event.target.files[0];

    const fileSizeInMB = file.size / (1024 * 1024); // 1 MB = 1024 KB, 1 KB = 1024 bytes

    if (fileSizeInMB.toFixed(2) >= 5) {
      toast.error(t("projectPage.common.imageSizeError"));
    } else {
      var reader = new FileReader();
      reader.onload = async function () {
        await updateUserProfileBanner(loggedUserInfo.id, file);

        const user = await getUser(loggedUserInfo.id);
        setProfileBannerPhoto(user.dados.img_capa);

        localStorage.setItem("userInfo", JSON.stringify(user.dados));
        setLoading(false);
      };
      reader.readAsDataURL(event.target.files[0]);
    }
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
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 1400);
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Initial check

    return () => window.removeEventListener("resize", handleResize);
  }, []);

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

    const allEvents = await getEventPostByUser(userId, loggedUserInfo?.id);
    const allProjects = await getProjectPostByUser(userId);

    if (allEvents.dados !== "null" && allProjects.dados !== "null") {
      setAllPosts(allEvents.dados.concat(allProjects.dados));
    } else if (allEvents.dados && allProjects.dados === "null") {
      setAllPosts(allEvents.dados);
    } else {
      setAllPosts(allProjects.dados);
    }

    setFollowers(followers_res?.dados);

    if (visits_res.dados === null) {
      setVisits(0);
    } else {
      setVisits(visits_res?.dados);
    }
    setFollowing(following_res?.dados.seguidores);
  }
  async function checkIsFollowing() {
    const isFollowingUser = await isFollowing(loggedUserInfo.id, userId);
    if (isFollowingUser) {
      setIsVisitorFollowing(true);
    } else {
      setIsVisitorFollowing(false);
    }
  }

  async function countVisit() {
    const count_res = await setUserProfileVisit(userId, loggedUserInfo.id);
    if (count_res === "ok") {
      fetchData();
    }
  }

  React.useEffect(() => {
    fetchData();

    if (!authenticated) {
      setVisitor(true);
      countVisit();
      localStorage.setItem("isVisitor", true);
    } else {
      if (userId !== loggedUserInfo.id) {
        checkIsFollowing();
        setVisitor(true);
        countVisit();
        localStorage.setItem("isVisitor", true);
      } else {
        localStorage.setItem("isVisitor", false);
      }
    }
  }, []);

  React.useEffect(() => {
    if (allPosts) {
      setSearchOptions(allPosts);
    }
  }, [allPosts]);

  React.useEffect(() => {
    const handleScroll = () => {
      // Handle scroll event here

      setScrolled(window.scrollY);
    };

    // Attach the scroll event listener when the component mounts
    window.addEventListener("scroll", handleScroll);

    // Detach the scroll event listener when the component unmounts
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Box>
      <NavBar />
      <div>{loading && <LinearProgress />}</div>
      <Box
        className="profile_container"
        sx={{
          height: "100%",
          width: "100%",
        }}
      >
        <Box
          className="banner_container"
          sx={{
            minWidth: "100%",
            maxHeight: "30%",
            minHeight: "30%",
            background: "#000",
          }}
        >
          <Box>
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
                  src={`${imgApiPath}/capaImg/${profileBannerPhoto}`}
                >
                  <PhotoCamera />
                </Avatar>
              </IconButton>
            </label>
          </Box>
        </Box>
        {pageUserInfo && (
          <Box
            sx={{
              padding: {
                xs: "0",
                sm: "0",
                md: "2rem",
                lg: "2rem",
                xl: "2rem",
              },
              minHeight: "100vh",
              background: "#f8f8f8",
              display: "block",
            }}
          >
            <Grid
              className="profile_main_grid"
              container
              spacing={2}
              sx={{
                display: "flex",
                justifyContent: {
                  xs: "center",
                  sm: "center",
                  md: "flex-end",
                  lg: "flex-end",
                  xl: "flex-end",
                },
                alignItems: {
                  xs: "center",
                  sm: "center",
                  md: "none",
                  lg: "none",
                  xl: "none",
                },
                flexDirection: "row",
                minWidth: "100%",
                maxWidth: "100%",
                marginLeft: {
                  xs: "0",
                  sm: "0",
                  md: "-16px",
                  lg: "-16px",
                  xl: "-16px",
                },
              }}
            >
              <Grid
                item
                xs={12}
                md={4}
                className="profile_second_grid"
                sx={{
                  // Styles for larger displays
                  ...(isSmallScreen
                    ? {}
                    : {
                        position: {
                          xs: "unset",
                          sm: "unset",
                          md: "fixed",
                          lg: "fixed",
                          xl: "fixed",
                        },
                        top: {
                          xs: "25%",
                          sm: "25%",
                          md: scrolled > 0 ? "0%" : "20%",
                          lg: scrolled > 0 ? "0%" : "20%",
                          xl: scrolled > 0 ? "0%" : "20%",
                        },
                        left: {
                          md: "3%",
                          lg: "3%",
                          xl: "3%",
                        },
                        paddingLeft: {
                          xs: "0 !important",
                          sm: "0 !important",
                          md: "16px",
                          lg: "16px",
                          xl: "16px",
                        },
                        transformOrigin: {
                          md: "top left",
                          lg: "top left",
                          xl: "top left",
                        },

                        transform: {
                          md: "scale(0.88)",
                          lg: "scale(0.88)",
                          xl: "scale(0.88)",
                        },
                      }),
                  // Styles for small displays
                  ...(isSmallScreen
                    ? {
                        position: {
                          xs: "unset",
                          sm: "unset",
                          md: "fixed",
                          lg: "fixed",
                          xl: "fixed",
                        },
                        top: {
                          xs: "25%",
                          sm: "25%",
                          md: scrolled > 0 ? "0%" : "20%",
                          lg: scrolled > 0 ? "0%" : "20%",
                          xl: scrolled > 0 ? "0%" : "20%",
                        },
                        left: {
                          md: "3%",
                          lg: "3%",
                          xl: "3%",
                        },
                        paddingLeft: {
                          xs: "0 !important",
                          sm: "0 !important",
                          md: "16px",
                          lg: "16px",
                          xl: "16px",
                        },
                        transformOrigin: {
                          md: "top left",
                          lg: "top left",
                          xl: "top left",
                        },
                        transform: {
                          md: "scale(0.74)",
                          lg: "scale(0.74)",
                          xl: "scale(0.74)",
                        },
                      }
                    : {}),
                }}
              >
                <Paper
                  elevation={3}
                  className="user_photo_container"
                  sx={{
                    padding: "1rem",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    minWidth: "350px !important",
                    minHeight: "600px",
                    // marginBottom: "20px",
                    background: {
                      xs: "none",
                      sm: "none",
                      md: "#fff",
                      lg: "#fff",
                      xl: "#fff",
                    },

                    boxShadow: {
                      xs: "none",
                      sm: "none",
                      md: "0px 1px 8px 0px rgba(0,0,0,0.12)",
                      lg: "0px 1px 8px 0px rgba(0,0,0,0.12)",
                      xl: "0px 1px 8px 0px rgba(0,0,0,0.12)",
                    },

                    marginTop: {
                      xs: "-24%",
                      sm: "-24%",
                      md: "0%",
                      lg: "0%",
                      xl: "0%",
                    },
                  }}
                >
                  <Box>
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
                          src={
                            pageUserInfo.login_from === "google"
                              ? profilePhoto
                              : `${imgApiPath}/perfilImg/${profilePhoto}`
                          }
                        >
                          <PhotoCamera />
                        </Avatar>
                      </IconButton>
                    </label>
                  </Box>

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
                      {pageUserInfo.residencia === "MUNDO"
                        ? ""
                        : pageUserInfo.residencia}
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
                                  `/editar-perfil/${loggedUserInfo.id}/${loggedUserInfo.nome}`
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
                            redirectToProfileConfigPage(
                              loggedUserInfo?.id,
                              loggedUserInfo?.nome
                            )
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
              <Grid
                item
                xs={12}
                md={8}
                className="cards_grid_container"
                sx={{
                  height: "100%",
                  // minWidth: "70%",
                  paddingLeft: "0",
                  marginTop: "0 !important",
                  paddingTop: "0 !important",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexWrap: {
                      xs: "wrap-reverse",
                      sm: "wrap-reverse",
                      md: "unset",
                      lg: "unset",
                      xl: "unset",
                    },
                    justifyContent: {
                      xs: "center",
                      sm: "center",
                      md: "left",
                      lg: "left",
                      xl: "left",
                    },
                    alignItems: "center",
                    width: {
                      xs: "360px",
                      sm: "400px",
                      md: "100%",
                      lg: "100%",
                      xl: "100%",
                    },
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
                  </Tabs>

                  {searchOptions && (
                    <Box
                      onClick={handleSearchTabClick}
                      sx={{
                        marginLeft: "15px",
                        height: "48px",
                        display: "flex",
                        alignItems: "flex-end",
                      }}
                    >
                      <TextField
                        variant="standard"
                        value={searchQuery}
                        onChange={handleInputChange}
                        onKeyPress={handleKeyPress}
                        sx={{
                          width: {
                            xs: "300px",
                            sm: "300px",
                            md: "100%",
                            lg: "100%",
                            xl: "100%",
                          },
                          marginRight: 2,
                        }}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment
                              position="end"
                              sx={{ marginBottom: "15px" }}
                            >
                              <Search
                                onClick={handleSearch}
                                sx={{ fontSize: "1.5rem" }}
                              />
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Box>
                  )}
                </Box>
                {selectedTab === "event" && (
                  <Box
                    sx={{
                      // Styles for larger displays
                      ...(isSmallScreen
                        ? {}
                        : {
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            flexDirection: "column",
                            transformOrigin: {
                              xs: "top center",
                              sm: "top center",
                              md: "top left",
                              lg: "top left",
                              xl: "top left",
                            },
                            transform: "scale(0.88)",
                            minWidth: {
                              xs: "0",
                              sm: "0",
                              md: "57rem",
                              lg: "72rem",
                              xl: "72rem",
                            },
                          }),
                      // Styles for small displays
                      ...(isSmallScreen
                        ? {
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            flexDirection: "column",
                            transformOrigin: {
                              xs: "top center",
                              sm: "top center",
                              md: "top left",
                              lg: "top left",
                              xl: "top left",
                            },
                            transform: "scale(0.74)",
                            minWidth: {
                              xs: "0",
                              sm: "0",
                              md: "57rem",
                              lg: "72rem",
                              xl: "72rem",
                            },
                          }
                        : {}),
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
                      // Styles for larger displays
                      ...(isSmallScreen
                        ? {}
                        : {
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            flexDirection: "column",
                            transformOrigin: {
                              xs: "top center",
                              sm: "top center",
                              md: "top left",
                              lg: "top left",
                              xl: "top left",
                            },
                            transform: "scale(0.88)",
                            minWidth: {
                              xs: "0",
                              sm: "0",
                              md: "57rem",
                              lg: "72rem",
                              xl: "72rem",
                            },
                          }),
                      // Styles for small displays
                      ...(isSmallScreen
                        ? {
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            flexDirection: "column",
                            transformOrigin: {
                              xs: "top center",
                              sm: "top center",
                              md: "top left",
                              lg: "top left",
                              xl: "top left",
                            },
                            transform: "scale(0.74)",
                            minWidth: {
                              xs: "0",
                              sm: "0",
                              md: "57rem",
                              lg: "72rem",
                              xl: "72rem",
                            },
                          }
                        : {}),
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
                      // Styles for larger displays
                      ...(isSmallScreen
                        ? {}
                        : {
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "flex-start",
                            transformOrigin: {
                              xs: "top center",
                              sm: "top center",
                              md: "top left",
                              lg: "top left",
                              xl: "top left",
                            },
                            transform: "scale(0.88)",
                            minWidth: {
                              xs: "0",
                              sm: "0",
                              md: "57rem",
                              lg: "72rem",
                              xl: "72rem",
                            },
                          }),
                      // Styles for small displays
                      ...(isSmallScreen
                        ? {
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "flex-start",
                            transformOrigin: {
                              xs: "top center",
                              sm: "top center",
                              md: "top left",
                              lg: "top left",
                              xl: "top left",
                            },
                            transform: "scale(0.74)",
                            minWidth: {
                              xs: "0",
                              sm: "0",
                              md: "57rem",
                              lg: "72rem",
                              xl: "72rem",
                            },
                          }
                        : {}),
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
                  <Box
                    sx={{
                      // Styles for larger displays
                      ...(isSmallScreen
                        ? {}
                        : {
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "flex-start",
                            transformOrigin: {
                              xs: "top center",
                              sm: "top center",
                              md: "top left",
                              lg: "top left",
                              xl: "top left",
                            },
                            transform: "scale(0.88)",
                            minHeight: "100vh",
                          }),
                      // Styles for small displays
                      ...(isSmallScreen
                        ? {
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "flex-start",
                            transformOrigin: {
                              xs: "top center",
                              sm: "top center",
                              md: "top left",
                              lg: "top left",
                              xl: "top left",
                            },
                            transform: "scale(0.74)",
                            minHeight: "100vh",
                          }
                        : {}),
                    }}
                  >
                    <ReactQuill
                      theme="bubble"
                      readOnly
                      value={pageUserInfo.bio}
                    />
                  </Box>
                )}

                {selectedTab === "search" && (
                  <Box
                    sx={{
                      // Styles for larger displays
                      ...(isSmallScreen
                        ? {}
                        : {
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            transformOrigin: {
                              xs: "top center",
                              sm: "top center",
                              md: "top left",
                              lg: "top left",
                              xl: "top left",
                            },
                            transform: "scale(0.88)",
                            minWidth: {
                              xs: "0",
                              sm: "0",
                              md: "57rem",
                              lg: "72rem",
                              xl: "72rem",
                            },
                          }),
                      // Styles for small displays
                      ...(isSmallScreen
                        ? {
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            transformOrigin: {
                              xs: "top center",
                              sm: "top center",
                              md: "top left",
                              lg: "top left",
                              xl: "top left",
                            },
                            transform: "scale(0.74)",
                            minHeight: "100vh",
                            minWidth: {
                              xs: "0",
                              sm: "0",
                              md: "57rem",
                              lg: "72rem",
                              xl: "72rem",
                            },
                          }
                        : {}),
                    }}
                  >
                    {searchOptions && (
                      <ListSearchedPublications
                        isVisitor={visitor}
                        posts={searchOptions}
                      />
                    )}
                  </Box>
                )}
              </Grid>
            </Grid>
          </Box>
        )}
      </Box>
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
            <Tooltip title={t("userProfile.adicionar")}>
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
              {t("userProfile.adicionarEvento")}
            </MenuItem>
            <MenuItem
              onClick={() => {
                handleClose();
                navigate("/projetos/adicionar");
              }}
            >
              {t("userProfile.adicionarProjeto")}
            </MenuItem>
          </Menu>
        </>
      ) : null}
    </Box>
  );
};

export default UserProfile;
