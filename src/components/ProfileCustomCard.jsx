import React, { useEffect, useState } from "react";
import { styled, alpha } from "@mui/material/styles";
import {
  Avatar,
  Box,
  Typography,
  IconButton,
  Skeleton,
  Stack,
  Menu,
  MenuItem,
  Button,
  Alert,
  Collapse,
  AlertTitle,
  Grid,
  Modal,
} from "@mui/material";
import {
  ThumbUp,
  Share,
  Close,
  Link,
  Settings,
  KeyboardArrowDown,
  Edit,
  Delete,
} from "@mui/icons-material";

import {
  FacebookShareButton,
  FacebookIcon,
  PinterestShareButton,
  PinterestIcon,
  FacebookMessengerShareButton,
  FacebookMessengerIcon,
  LinkedinIcon,
  LinkedinShareButton,
  WhatsappShareButton,
  WhatsappIcon,
  ViberShareButton,
  ViberIcon,
  TwitterShareButton,
  TwitterIcon,
  EmailShareButton,
  EmailIcon,
} from "react-share";

import { Visibility } from "@mui/icons-material";

import CardDetailed from "./CardDetailed";

import useEvents from "../hooks/useEvents";
import axiosInstance from "../api/axiosInstance";
import usePosts from "../hooks/usePosts";
import useProjects from "../hooks/useProjects";
import { useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === "light"
        ? "rgb(55, 65, 81)"
        : theme.palette.grey[300],
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      "&:active": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
  },
}));

const ProfileCustomCard = ({
  id = null,
  name,
  likes,
  visits,
  picture,
  publisherId,
  publisherName,
  publisherPhoto,
  type,
  isVisitor,
}) => {
  const [isLiked, setIsLiked] = useState(null);
  const [isFavorite, setIsFavorite] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [openShareModal, setOpenShareModal] = useState(false);
  const [displayInteractions, setDisplayInteraction] = useState("none");

  const [openRemoveEventModal, setOpenRemoveEventModal] = React.useState(false);

  const { removeFavoriteFromProject } = useProjects();

  const { removeFavoriteFromEvent, removeEvent } = useEvents();

  const { likePost, favoritePost } = usePosts();

  const { t } = useTranslation();

  const navigate = useNavigate();

  const location = useLocation();

  const [postActionsMenuAnchorEl, setPostActionsMenuAnchorEl] =
    React.useState(null);
  const postActionsMenuOpen = Boolean(postActionsMenuAnchorEl);

  const [openRemoveEventError, setOpenRemoveEventError] = useState(false);
  const [openRemoveEventSuccess, setOpenRemoveEventSuccess] = useState(false);
  React.useState(false);

  const handleOpenRemoveEventModal = () => setOpenRemoveEventModal(true);
  const handleCloseRemoveEventModal = () => setOpenRemoveEventModal(false);

  const getPostPath = () => {
    const postType = type === "E" ? "eventos" : "projetos";
    const postName = name.toLowerCase().trim().replaceAll(" ", "_");
    return `/${postType}/${id}/${postName}`;
  };

  const handleOpen = () => {
    localStorage.setItem("previousLocation", location.pathname);
    navigate(getPostPath());

    // setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const handleOpenShareModal = () => setOpenShareModal(true);
  const handleCloseShareModal = () => setOpenShareModal(false);

  const handlePostActionsMenuClick = (event) => {
    setPostActionsMenuAnchorEl(event.currentTarget);
  };
  const handlePostActionsMenuClose = () => {
    setPostActionsMenuAnchorEl(null);
  };

  const handleEditEventClick = () => {
    handlePostActionsMenuClose();
  };

  const handleRemoveEventClick = () => {
    handlePostActionsMenuClose();
    handleOpenRemoveEventModal();
  };

  const handleRemoveEvent = async () => {
    const res = await removeEvent(id);
    console.log(res);
    if (!res) {
      handleCloseRemoveEventModal();
      setOpenRemoveEventError(true);
    } else {
      handleCloseRemoveEventModal();
      setOpenRemoveEventSuccess(true);
    }
  };

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 1500);
  }, []);

  useEffect(() => {
    if (!id && isLiked !== null && isFavorite !== null) return;
    const user = JSON.parse(localStorage.getItem("userInfo"));

    if (!user) return;

    const hasLikedEvent = async (userId, eventId) => {
      try {
        const response = await axiosInstance.get(
          `/gostosEventos/gostos/${userId},${eventId}`,
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
              // Authorization:
              //   "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MiwibmFtZSI6Imh1bWJlcnRvIG5hc2NpbWVudG8iLCJleHBpcmVzX2luIjoxNjc3OTMxODIzfQ.vJnAshie-1hUo_VVKK0QInFI4NpBmx5obuWzOauK4B8",
            },
          }
        );
        const liked = response?.data?.dados || 0;
        setIsLiked(liked);
      } catch (error) {
        console.error(error);
        return 0;
      }
    };

    const hasLikedProject = async (userId, projectId) => {
      try {
        const response = await axiosInstance.get(
          `/gostosProjetos/gostos/${userId},${projectId}`,
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
              // Authorization:
              //   "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MiwibmFtZSI6Imh1bWJlcnRvIG5hc2NpbWVudG8iLCJleHBpcmVzX2luIjoxNjc3OTMxODIzfQ.vJnAshie-1hUo_VVKK0QInFI4NpBmx5obuWzOauK4B8",
            },
          }
        );
        const liked = response?.data?.dados || 0;
        setIsLiked(liked);
      } catch (error) {
        console.error(error);
      }
    };

    const hasFavoritePost = async (userId, postId) => {
      try {
        const response = await axiosInstance.get(
          `/favoritos/getFavoritos/${userId},${postId}`,
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
              // Authorization:
              //   "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MiwibmFtZSI6Imh1bWJlcnRvIG5hc2NpbWVudG8iLCJleHBpcmVzX2luIjoxNjc3OTMxODIzfQ.vJnAshie-1hUo_VVKK0QInFI4NpBmx5obuWzOauK4B8",
            },
          }
        );
        const ids = response?.data?.dados?.map((post) => post.id);
        setIsFavorite(ids.includes(postId));
      } catch (error) {
        console.error(error);
        return 0;
      }
    };

    if (type === "E") {
      hasLikedEvent(user.id, id);
    } else {
      hasLikedProject(user.id, id);
    }

    hasFavoritePost(user.id, id);
  }, [id]);

  useEffect(() => {
    if (!publisherId || publisherId === undefined) return;
    const getPublisherInfo = async () => {
      try {
        const response = await axiosInstance.get(
          `/utilizadores/obterUtilizador/${publisherId}`,
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
              // Authorization:
              //   "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MiwibmFtZSI6Imh1bWJlcnRvIG5hc2NpbWVudG8iLCJleHBpcmVzX2luIjoxNjc3OTMxODIzfQ.vJnAshie-1hUo_VVKK0QInFI4NpBmx5obuWzOauK4B8",
            },
          }
        );
        const publisherData = response?.data?.dados || 0;
        setPublisherInfo(publisherData);
      } catch (error) {
        console.error(error);
      }
    };

    getPublisherInfo();
  }, [publisherId]);

  const handleLike = async () => {
    const user = JSON.parse(localStorage.getItem("userInfo"));
    if (!user)
      return (window.location.href = `http://${window.location.host}/user-registration`);

    const userId = user?.id;

    const result = await likePost(userId, id, type);
    if (result === null) return null;

    if (result) setIsLiked(true);
    else setIsLiked(false);
  };

  const handleFavorite = async (favorite) => {
    const user = JSON.parse(localStorage.getItem("userInfo"));
    if (!user)
      return (window.location.href = `http://${window.location.host}/user-registration`);

    const userId = user?.id;

    if (!favorite) {
      const result = await favoritePost(userId, id, type);
      if (!result) return;
      return setIsFavorite(true);
    }

    let result;
    if (type === "eventos") {
      result = await removeFavoriteFromEvent(id, userId);
    } else {
      result = await removeFavoriteFromProject(id, userId);
    }

    if (!result) return;
    return setIsFavorite(false);
  };

  if (isLoading) {
    return (
      <Stack spacing={1}>
        <Skeleton variant="rectangular" width="100%" height="17rem" />
        <Box display="flex">
          <Skeleton variant="circular" width={25} height={25} />
          <Box
            display="flex"
            alignItems="center"
            gap=".5rem"
            sx={{ marginLeft: "auto" }}
          >
            <Skeleton variant="rounded" width={12} height={12} />
            <Skeleton variant="rounded" width={12} height={12} />
            <Skeleton variant="rounded" width={12} height={12} />
          </Box>
        </Box>
      </Stack>
    );
  }

  // antes de cagada
  return (
    <>
      <Box
        sx={{
          height: "20rem",
        }}
        onMouseEnter={() => setDisplayInteraction("flex")}
        onMouseLeave={() => setDisplayInteraction("none")}
      >
        {isVisitor ? null : (
          <Box
            sx={{
              display: `${displayInteractions}`,
              position: "absolute",
              marginTop: "0.5rem",
              marginLeft: "0.5rem",
              zIndex: "99999999",
              background: "#808080", //(theme) => theme.palette.secondary.main,
              borderRadius: "30px",
              width: "60px",
              justifyContent: "center",
              alignContent: "center",
            }}
          >
            <IconButton
              color="primary"
              size="small"
              onClick={handlePostActionsMenuClick}
            >
              <Settings fontSize="small" />
              <KeyboardArrowDown fontSize="small" />
            </IconButton>
            <StyledMenu
              id="demo-customized-menu"
              MenuListProps={{
                "aria-labelledby": "demo-customized-button",
              }}
              anchorEl={postActionsMenuAnchorEl}
              open={postActionsMenuOpen}
              onClose={handlePostActionsMenuClose}
            >
              <MenuItem onClick={handleEditEventClick} disableRipple>
                <Edit />
                {t("userProfile.editar")}
              </MenuItem>
              <MenuItem onClick={handleRemoveEventClick} disableRipple>
                <Delete />
                {t("userProfile.remover")}
              </MenuItem>
            </StyledMenu>
          </Box>
        )}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            marginBottom: ".25rem",
            position: "relative",
          }}
        >
          {/* <Tooltip title={name}> */}
          <Avatar
            variant="square"
            src={picture || null}
            alt={`Foto de ${name}`}
            onClick={handleOpen}
            sx={{
              width: "100%",
              height: "17rem",
              objectFit: "cover",
              "&:hover": {
                cursor: "pointer",
                borderRadius: "0.25rem",
              },
            }}
          />
        </Box>

        <Box
          sx={
            {
              // display: `${displayInteractions}`,
            }
          }
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "0.25rem",
              top: "-25rem",
            }}
          >
            <Typography
              fontWeight="bold"
              fontSize="0.8rem"
              sx={{
                "&:hover": {
                  textDecoration: "underline",
                  cursor: "pointer",
                },
              }}
            >
              {name}
            </Typography>

            <Box
              sx={{
                display: "flex",
                gap: ".5rem",
                marginLeft: "auto",
                fontSize: ".9rem",
              }}
            >
              <Box
                sx={{ display: "flex", alignItems: "center", gap: ".125rem" }}
              >
                <ThumbUp
                  // onClick={() => handleLike(false)}
                  sx={{ width: 15, height: 15, color: "black" }}
                />
                <Typography
                  sx={{
                    fontWeight: "bold",
                    color: "black",
                    fontSize: ".8rem",
                  }}
                  variant="p"
                >
                  {likes}
                </Typography>
              </Box>
              <Box
                sx={{ display: "flex", alignItems: "center", gap: ".125rem" }}
              >
                <Visibility
                  // onClick={() => handleFavorite(false)}
                  sx={{ width: 15, height: 15, color: "black" }}
                />
                <Typography
                  sx={{
                    fontWeight: "bold",
                    color: "black",
                    fontSize: ".8rem",
                  }}
                  variant="p"
                >
                  {visits !== null ? visits : "0"}
                </Typography>
              </Box>
              <Share
                sx={{
                  width: 14,
                  height: 14,
                  cursor: "pointer",
                }}
                onClick={handleOpenShareModal}
              />
            </Box>
          </Box>
          <Box width="fit-content" alignItems="center" gap=".25rem">
            <Typography
              fontWeight="bold"
              fontSize="0.7rem"
              sx={{
                color: "gray",
                "&:hover": {
                  textDecoration: "underline",
                  cursor: "pointer",
                },
              }}
            >
              {publisherName}
            </Typography>
          </Box>
        </Box>

        <Modal
          id="card-details-modal"
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          sx={{
            ".MuiModal-backdrop": {
              backgroundColor: "rgba(0,0,0,.9)",
            },
          }}
        >
          <CardDetailed
            id={id}
            publisherPhoto={publisherPhoto}
            publishers={[publisherName]}
            title={name}
            type={type}
            isLiked={isLiked}
            isFavorite={isFavorite}
            onLikePost={handleLike}
            onFavoritePost={handleFavorite}
            onCloseModal={handleClose}
            picture={picture}
          />
        </Modal>
        <Modal
          id="share-modal"
          open={openShareModal}
          onClose={handleCloseShareModal}
          aria-labelledby="share-modal-title"
          aria-describedby="share-modal-description"
          sx={{
            ".MuiModal-backdrop": {
              backgroundColor: "rgba(0,0,0,.5)",
            },
          }}
        >
          <Box
            id="wrapper"
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "100vh",
            }}
          >
            <Box
              display="flex"
              flexDirection="column"
              sx={{
                width: "25rem",
                height: "14rem",
                backgroundColor: "white",
                borderRadius: ".25rem",
              }}
            >
              <Box id="header" display="flex" justifyContent="flex-end">
                <Close
                  sx={{
                    color: "black",
                    cursor: "pointer",
                    margin: ".25rem",
                    "&:hover": {
                      opacity: ".9",
                    },
                  }}
                  onClick={handleCloseShareModal}
                />
              </Box>
              <Box
                id="body"
                display="flex"
                flexDirection="column"
                alignItems="center"
                mt="1rem"
              >
                <Typography fontWeight="bold">
                  {t("postCard.partilhePostRedeSociais")}
                </Typography>
                <Box id="media-shares" mt="1rem" display="flex" gap=".25rem">
                  <FacebookShareButton
                    url={"https://comein-cv.vercel.app/" + getPostPath()}
                    quote={"Post it with your friends"}
                    hashtag="comeincv"
                    media="https://img.freepik.com/vetores-gratis/paisagem-noturna-do-oceano-lua-cheia-e-estrelas-brilham_107791-7397.jpg?size=626&ext=jpg"
                  >
                    <FacebookIcon size={40} round />
                  </FacebookShareButton>
                  <FacebookMessengerShareButton
                    appId="976472220466365"
                    url={"https://comein-cv.vercel.app/"}
                  >
                    <FacebookMessengerIcon size={40} round />
                  </FacebookMessengerShareButton>
                  <PinterestShareButton
                    url={"https://comein-cv.vercel.app/" + getPostPath()}
                    description={"Testing description"}
                    media={picture}
                  >
                    <PinterestIcon size={40} round />
                  </PinterestShareButton>
                  <LinkedinShareButton
                    url={"https://comein-cv.vercel.app/" + getPostPath()}
                    title={name}
                    summary={"minha descricao"}
                    source={"Comein CV"}
                  >
                    <LinkedinIcon size={40} round />
                  </LinkedinShareButton>
                  <WhatsappShareButton
                    url={"https://comein-cv.vercel.app/" + getPostPath()}
                    title={name}
                  >
                    <WhatsappIcon size={40} round />
                  </WhatsappShareButton>
                  <ViberShareButton
                    url={"https://comein-cv.vercel.app/" + getPostPath()}
                    title={name}
                  >
                    <ViberIcon size={40} round />
                  </ViberShareButton>
                  <TwitterShareButton
                    url={"https://comein-cv.vercel.app/" + getPostPath()}
                    title={name}
                    via="Comein-CV"
                  >
                    <TwitterIcon size={40} round />
                  </TwitterShareButton>
                  <EmailShareButton
                    url={"https://comein-cv.vercel.app/" + getPostPath()}
                    subject={`${name}: de Comein CV`}
                    body={`Venha ver o post de ${publisherName}`}
                  >
                    <EmailIcon size={40} round />
                  </EmailShareButton>
                </Box>
                <Button
                  sx={{ marginTop: "1rem" }}
                  variant="contained"
                  endIcon={<Link />}
                >
                  {"postCard.copiarLigacao"}
                </Button>
              </Box>
            </Box>
          </Box>
        </Modal>
        <Grid
          sx={{
            position: "fixed",
            top: "20px", // Adjust the top position as needed
            left: "20px", // Adjust the left position as needed
            zIndex: 9999, // Ensure the alert is above other elements
          }}
        >
          <Collapse in={openRemoveEventError}>
            <Alert
              severity="error"
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => {
                    setOpenRemoveEventError(false);
                  }}
                >
                  <Close fontSize="inherit" />
                </IconButton>
              }
              sx={{ mb: 2 }}
            >
              <AlertTitle>
                <strong>{t("userProfile.removerEventoErro")}</strong>
              </AlertTitle>
            </Alert>
          </Collapse>
        </Grid>
        <Grid
          sx={{
            position: "fixed",
            top: "20px", // Adjust the top position as needed
            left: "20px", // Adjust the left position as needed
            zIndex: 9999, // Ensure the alert is above other elements
          }}
        >
          <Collapse in={openRemoveEventSuccess}>
            <Alert
              severity="success"
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => {
                    setOpenRemoveEventSuccess(false);
                  }}
                >
                  <Close fontSize="inherit" />
                </IconButton>
              }
              sx={{ mb: 2 }}
            >
              <AlertTitle>
                <strong>{t("userProfile.removerEventoSucesso")}</strong>
              </AlertTitle>
            </Alert>
          </Collapse>
        </Grid>
        <Modal
          open={openRemoveEventModal}
          onClose={handleCloseRemoveEventModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 400,
              bgcolor: "background.paper",
              border: "2px solid #000",
              boxShadow: 24,
              p: 4,
            }}
          >
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={handleCloseRemoveEventModal}
              sx={{
                position: "absolute",
                top: 8,
                right: 8,
              }}
            >
              <Close />
            </IconButton>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              {t("userProfile.removerEventoModal")}
            </Typography>
            <Grid
              container
              spacing={2}
              sx={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Grid item xs={6} md={4}>
                <Button
                  variant="contained"
                  className="remove-account-button"
                  sx={{
                    marginTop: "15px",
                    borderRadius: "20px",
                    textTransform: "none",
                  }}
                  onClick={handleRemoveEvent}
                >
                  {t("userProfile.configPage.sim")}
                </Button>
              </Grid>
              <Grid item xs={6} md={4}>
                <Button
                  variant="contained"
                  className="remove-account-button"
                  sx={{
                    marginTop: "15px",
                    borderRadius: "20px",
                    textTransform: "none",
                  }}
                  onClick={handleCloseRemoveEventModal}
                >
                  {t("userProfile.configPage.nao")}
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Modal>
      </Box>
    </>
  );
};

export default ProfileCustomCard;
