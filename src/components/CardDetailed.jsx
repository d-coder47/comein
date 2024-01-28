import React, { useEffect, useRef, useState } from "react";
import {
  Avatar,
  Badge,
  Box,
  Button,
  Grid,
  IconButton,
  Modal,
  Skeleton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import {
  FiberManualRecord as Dot,
  Star,
  ThumbUp,
  Close,
  Add,
  Edit,
  Delete,
  Bookmark,
} from "@mui/icons-material";
import axiosInstance from "../api/axiosInstance";
import Publisher from "./Publisher";
import usePosts from "../hooks/usePosts";
import useUserProfile from "../hooks/useUserProfile";
import { useNavigate, useParams } from "react-router-dom";
import useEvents from "../hooks/useEvents";
import useProjects from "../hooks/useProjects";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "react-quill/dist/quill.bubble.css";
import { useTranslation } from "react-i18next";
import { imgApiPath } from "../api/apiPath";
import { toast } from "react-toastify";
import { redirectToProfilePage } from "../utils/generateUrl";
import {
  defaultDateToCVDateFormat,
  defaultDatetimeToCVDateFormat,
} from "../utils/dates";
import parse from "html-react-parser";

const CardDetailed = () => {
  const params = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const { type, id } = params;

  const [details, setDetails] = useState(null);
  const [isFollowing, setIsFollowing] = useState(null);
  const [likes, setLikes] = useState(details?.dados?.gostos || 0);
  const [isLiked, setIsLiked] = useState(null);
  const [isFavorite, setIsFavorite] = useState(null);
  const [isHighlighted, setIsHighlighted] = useState(null);

  const userCardParentRef = useRef(null);

  const { followUser } = useUserProfile();
  const { likePost, favoritePost, getHighlightPosts, HighlightPost } =
    usePosts();
  const { removeFavoriteFromEvent, addEventVisit } = useEvents();
  const { removeFavoriteFromProject, addProjetVisit } = useProjects();

  const [isOwner, setIsOwner] = useState();

  const [areaMaxWidth, setAreaMaxWidth] = useState();

  const [showRemoveProgramModal, setShowRemoveProgramModal] = useState(false);
  const [programIdToRemove, setProgramIdToRemove] = useState(0);

  const [isAdmin, setIsAdmin] = useState();

  async function countEventVisit() {
    if (type === "eventos") {
      const add_event_visit_res = await addEventVisit(id);
    } else {
      const add_project_visit_res = await addProjetVisit(id);
    }
  }

  useEffect(() => {
    const handleResize = () => {
      // setIsSmallScreen(window.innerWidth <= 1400);

      const value = parseInt((83 / 100) * window.innerWidth);
      setAreaMaxWidth(value);
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Initial check

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!id) return;
    const url = `/${type}/listar/${id}`;
    const getDetails = async () => {
      try {
        const response = await axiosInstance.get(url, {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            // Authorization:
            //   "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MiwibmFtZSI6Imh1bWJlcnRvIG5hc2NpbWVudG8iLCJleHBpcmVzX2luIjoxNjc3OTMxODIzfQ.vJnAshie-1hUo_VVKK0QInFI4NpBmx5obuWzOauK4B8",
          },
        });
        const user = JSON.parse(localStorage.getItem("userInfo"));
        if (!response.data) return navigate("/");
        setDetails(response.data);
        setLikes(response?.data?.dados?.gostos);

        if (user.perfil === "2") {
          setIsAdmin(true);
        } else {
          setIsAdmin(false);
        }
        if (user.id === response.data.dados.id_utilizador) {
          setIsOwner(true);
        } else {
          countEventVisit();
          setIsOwner(false);
        }
        // user?.id == details?.dados?.id_utilizador;
      } catch (error) {
        console.error(error);
      }
    };

    getDetails();
  }, [id]);

  useEffect(() => {
    const isFollowingUser = async (followedId, followerId) => {
      try {
        const response = await axiosInstance.get(
          `/utilizadores/seguidor/${followedId},${followerId}`,
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
              // Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response?.data?.dados === "Não está a seguir")
          setIsFollowing(false);
        if (response?.data?.dados === "Está a seguir") setIsFollowing(true);
      } catch (error) {
        console.error(error);
      }
    };

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
          `/favoritos/getFavoritos/${userId}`,
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
              // Authorization:
              //   "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MiwibmFtZSI6Imh1bWJlcnRvIG5hc2NpbWVudG8iLCJleHBpcmVzX2luIjoxNjc3OTMxODIzfQ.vJnAshie-1hUo_VVKK0QInFI4NpBmx5obuWzOauK4B8",
            },
          }
        );
        if (response?.data?.dados == "null") return setIsFavorite(false);
        const ids = response?.data?.dados?.map((post) => post.id);
        setIsFavorite(ids.includes(postId));
      } catch (error) {
        console.error(error);
        return 0;
      }
    };

    const hasHighlightedPost = async (userId, postId) => {
      try {
        const response = await getHighlightPosts();

        const exist = response.dados.find((post) => post.id === postId);

        if (exist) {
          setIsHighlighted(exist);
        }
      } catch (error) {
        console.error(error);
        return 0;
      }
    };

    if (!details) return;

    const publisherId = details?.utilizador[0]?.id;

    if (isFollowing !== null) return;
    const user = JSON.parse(localStorage.getItem("userInfo"));

    if (!user) return;

    if (type === "eventos") {
      hasLikedEvent(user.id, id);
    } else {
      hasLikedProject(user.id, id);
    }

    hasFavoritePost(user.id, id);

    hasHighlightedPost(user.id, id);

    isFollowingUser(publisherId, parseInt(user.id));
  }, [details]);

  const handleFollowUser = async () => {
    const user = JSON.parse(localStorage.getItem("userInfo"));

    if (!user) {
      return toast.info(t("cardDetailed.publisherInteractionNotAllowed"));
    }
    const result = await followUser(user.id, id);
    if (result !== null) setIsFollowing(result);
  };

  const handleLike = async () => {
    const user = JSON.parse(localStorage.getItem("userInfo"));
    if (!user) {
      return toast.info(t("cardDetailed.postInteractionNotAllowed"));
    }

    const userId = user?.id;
    const simplifiedType =
      type === "eventos" ? "E" : type === "projetos" ? "P" : "";

    const result = await likePost(userId, id, simplifiedType);
    if (result === null) return null;

    const previousLikes = parseInt(likes);
    if (result) {
      setIsLiked(true);
      setLikes(previousLikes + 1);
    } else {
      setIsLiked(false);
      setLikes(previousLikes - 1);
    }
  };

  const handleFavorite = async (favorite) => {
    const user = JSON.parse(localStorage.getItem("userInfo"));
    if (!user) {
      return toast.info(t("cardDetailed.postInteractionNotAllowed"));
    }

    const userId = user?.id;

    if (!favorite) {
      const postType = type === "eventos" ? "E" : "P";
      const result = await favoritePost(userId, id, postType);
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

  const handleHighlight = async (highlighted) => {
    const user = JSON.parse(localStorage.getItem("userInfo"));
    const postType = type === "eventos" ? "E" : "P";
    if (!user) {
      return toast.info(t("cardDetailed.postInteractionNotAllowed"));
    }

    if (!highlighted) {
      const addedToHighlight = await HighlightPost(id, postType, "S");
      if (!addedToHighlight) return;
      return setIsHighlighted(true);
    }

    const removedFromHighlight = await HighlightPost(id, postType, "N");

    if (!removedFromHighlight) return;
    return setIsHighlighted(false);
  };

  const handleAddProgram = () => {
    navigate(`/eventos/adicionar-programa/${id}`);
  };

  const handleRemoveProgram = async () => {
    setShowRemoveProgramModal(false);
    if (programIdToRemove === 0) return;
    const body = new FormData();
    body.append("_method", "DELETE");
    const response = await axiosInstance.post(
      `/programaEvento/eliminar/${programIdToRemove}`,
      body,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          // Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response?.data?.dados !== "Dados foram excluidos com sucesso.") {
      return toast.error("Ocorreu um erro ao remover programa.");
    }
    const newDetails = { ...details };
    setDetails({
      ...newDetails,
      programa: newDetails.programa.filter(
        (program) => program.id !== programIdToRemove
      ),
    });
  };

  const handleShowRemoveProgramModal = (programId) => {
    setShowRemoveProgramModal(true);
    setProgramIdToRemove(programId);
  };

  const handleCloseRemoveProgramModal = () => {
    setShowRemoveProgramModal(false);
  };

  const onCloseModal = () => {
    if (localStorage.getItem("previousLocation") !== null) {
      return navigate(localStorage.getItem("previousLocation"));
    }
    return navigate("/");
  };

  if (!details) {
    return (
      <Box
        sx={{
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0,0,0,.9)",
        }}
      >
        <Box
          sx={{
            margin: "0 0 0 12rem",
            outline: "none",
            height: "100vh",
            overflowY: "auto",
            display: "flex",
            justifyContent: "flex-start",
            gap: "1.5rem",
          }}
        >
          <Box
            id="content"
            display="flex"
            flexDirection="column"
            gap="0.5rem"
            width="80%"
          >
            <Box
              id="header"
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "1rem",
                // height: "14%",
                color: "white",
                marginTop: ".75rem",
              }}
            >
              <Skeleton
                variant="circular"
                animation="wave"
                width="3rem"
                height="3rem"
              />
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Skeleton
                  variant="text"
                  animation="wave"
                  width="25.5rem"
                  height="2rem"
                />
                <Box
                  sx={{ display: "flex", gap: ".5rem", alignItems: "center" }}
                >
                  <Skeleton
                    variant="text"
                    animation="wave"
                    width="12rem"
                    height="2rem"
                  />

                  <Dot sx={{ fontSize: ".5rem" }} />
                  <Skeleton
                    variant="text"
                    animation="wave"
                    width="12rem"
                    height="2rem"
                  />
                </Box>
              </Box>
              <Box onClick={onCloseModal}>
                <Close
                  sx={{
                    color: "white",
                    position: "absolute",
                    right: "1rem",
                    top: ".5rem",
                    cursor: "pointer",
                    "&:hover": {
                      color: "#EAEAEA",
                    },
                  }}
                />
              </Box>
            </Box>
            <Box id="image">
              <Skeleton
                variant="rectangular"
                animation="wave"
                width="100%"
                height="80vh"
              />
            </Box>
          </Box>
          <Box
            id="interactions"
            display="flex"
            flexDirection="column"
            gap="1.5rem"
            marginTop="14%"
            mr={".5rem"}
          >
            <Box
              id="user"
              sx={{
                borderRadius: "50%",
                height: "3rem",
                width: "3rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
              }}
            >
              <Skeleton
                variant="circular"
                animation="wave"
                width="3rem"
                height="3rem"
              />
            </Box>
            <Box
              id="favorite"
              sx={{
                borderRadius: "50%",
                height: "3rem",
                width: "3rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
              }}
            >
              <Skeleton
                variant="circular"
                animation="wave"
                width="3rem"
                height="3rem"
              />
            </Box>
            <Box
              id="likes"
              sx={{
                borderRadius: "50%",
                height: "3rem",
                width: "3rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
              }}
            >
              <Skeleton
                variant="circular"
                animation="wave"
                width="3rem"
                height="3rem"
              />
            </Box>
          </Box>
        </Box>
      </Box>
    );
  }

  return (
    <Box sx={{ width: "100%", height: "100%", backgroundColor: "#f8f8f8" }}>
      <Box
        sx={{
          margin: "0 0 0 4rem",
          backgroundColor: "transparent",
          outline: "none",
          height: "100vh",
          overflowY: "auto",
          display: "flex",
          justifyContent: "center",
          gap: "1.5rem",
        }}
      >
        <Box id="content" display="flex" flexDirection="column" gap="0.5rem">
          <DetailedHeader
            onFollowUser={handleFollowUser}
            isFollowingUser={isFollowing}
            publisherPhoto={
              details?.utilizador[0].login_from === "google"
                ? details?.utilizador[0].img_perfil
                : `${imgApiPath}/perfilImg/${details?.utilizador[0].img_perfil}`
            }
            publishers={details?.utilizador}
            title={details?.dados?.nome}
            onCloseModal={onCloseModal}
            type={type}
            isOwner={isOwner}
          />
          <Box
            sx={{
              backgroundColor: "white",
              maxWidth: areaMaxWidth,
              boxShadow: "4px 4px 8px rgba(0, 0, 0, 0.2)",
            }}
          >
            <Avatar
              src={`${imgApiPath}/${type}Img/${details?.dados?.imagem}`}
              alt={`Foto de ${details?.dados?.nome}`}
              variant="square"
              sx={{ width: "100%", height: "auto" }}
            />

            <DetailedInfo
              isEvent={type === "eventos"}
              city={details?.dados?.local}
              location={details?.coordenadas?.nome}
              description={details?.dados?.descricao}
              dateStart={details?.dados?.data_inicio}
              dateEnd={details?.dados?.data_fim}
            />
            <DetailedProgram
              programs={details?.programa}
              handleRemoveProgram={handleShowRemoveProgramModal}
              isOwner={isOwner}
            />
            <DetailedOther others={details?.outros} />
            <DetailedImages images={details?.imagens} type={type} />
            <DetailedRelated
              related={
                type === "projetos"
                  ? details?.eventos_assoc
                    ? details?.eventos_assoc
                    : null
                  : details?.projeto_assoc
                  ? details?.projeto_assoc
                  : null
              }
              type={type}
            />
          </Box>
        </Box>
        <Box
          id="interactions"
          display="flex"
          flexDirection="column"
          gap="1.5rem"
          marginTop="14%"
          mr={".5rem"}
        >
          <IconButton
            id="follow"
            sx={{ padding: "0" }}
            ref={userCardParentRef}
            onClick={() => handleFollowUser()}
          >
            {isOwner ? (
              <Avatar
                src={
                  details?.utilizador[0].login_from === "google"
                    ? details?.utilizador[0].img_perfil
                    : `${imgApiPath}/perfilImg/${details?.utilizador[0].img_perfil}`
                }
                alt="Foto do Publicador"
                sx={{
                  width: "3rem",
                  height: "3rem",
                  "&:hover": {
                    opacity: 0.8,
                    cursor: "pointer",
                  },
                }}
                onClick={() =>
                  navigate(
                    redirectToProfilePage(
                      details?.utilizador[0]?.id,
                      details?.utilizador[0]?.nome
                    )
                  )
                }
              />
            ) : (
              <Badge
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                badgeContent={isFollowing ? "✓" : "+"}
                overlap="circular"
                sx={{
                  "& .MuiBadge-badge": {
                    color: isFollowing ? "black" : "white",
                    backgroundColor: (theme) =>
                      isFollowing ? "white" : theme.palette.primary.main,
                    fontWeight: "bold",
                  },
                }}
              >
                <Avatar
                  src={
                    details?.utilizador[0].login_from === "google"
                      ? details?.utilizador[0].img_perfil
                      : `${imgApiPath}/perfilImg/${details?.utilizador[0].img_perfil}`
                  }
                  alt="Foto do Publicador"
                  sx={{ width: "3rem", height: "3rem" }}
                />
              </Badge>
            )}
          </IconButton>

          {isOwner && type === "eventos" ? (
            <Tooltip
              title={t("cardDetailed.addSchedule")}
              placement="left"
              arrow
            >
              <Box
                id="program"
                sx={{
                  borderRadius: "50%",
                  height: "3rem",
                  width: "3rem",
                  backgroundColor: (theme) => theme.palette.primary.main,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  "&:hover": {
                    opacity: 0.8,
                  },
                }}
                onClick={handleAddProgram}
              >
                <Add
                  color="white"
                  sx={{
                    width: "1.5rem",
                    height: "1.5rem",
                    color: "white",
                  }}
                />
              </Box>
            </Tooltip>
          ) : null}

          <Tooltip
            title={
              isFavorite
                ? t("cardDetailed.removeFromFavorites")
                : t("cardDetailed.addToFavorites")
            }
            placement="left"
            arrow
          >
            <Box
              id="favorite"
              sx={{
                borderRadius: "50%",
                height: "3rem",
                width: "3rem",
                backgroundColor: (theme) =>
                  isFavorite ? "#3c3c3c" : theme.palette.primary.main,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                "&:hover": {
                  opacity: 0.8,
                },
              }}
              onClick={() => handleFavorite(isFavorite)}
            >
              <Star
                color="white"
                sx={{
                  width: "1.25rem",
                  height: "1.25rem",
                  color: "white",
                }}
              />
            </Box>
          </Tooltip>

          <Tooltip
            title={
              isLiked ? t("cardDetailed.removeLike") : t("cardDetailed.addLike")
            }
            placement="left"
            arrow
          >
            <Box
              id="like"
              sx={{
                borderRadius: "50%",
                height: "3rem",
                width: "3rem",
                backgroundColor: (theme) =>
                  isLiked ? "#3c3c3c" : theme.palette.primary.main,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                "&:hover": {
                  opacity: 0.8,
                },
              }}
              onClick={handleLike}
            >
              <ThumbUp sx={{ color: "white", width: "1rem", height: "1rem" }} />
              {isLiked ? (
                <Typography color="white" fontSize=".8rem">
                  {parseInt(likes)}
                </Typography>
              ) : null}
            </Box>
          </Tooltip>

          {isAdmin && (
            <Tooltip
              title={
                isHighlighted
                  ? t("cardDetailed.removeFromHighlights")
                  : t("cardDetailed.addToHighlights")
              }
              placement="left"
              arrow
            >
              <Box
                id="highlight"
                sx={{
                  borderRadius: "50%",
                  height: "3rem",
                  width: "3rem",
                  backgroundColor: (theme) =>
                    isHighlighted ? "#3c3c3c" : theme.palette.primary.main,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  "&:hover": {
                    opacity: 0.8,
                  },
                }}
                onClick={() => handleHighlight(isHighlighted)}
              >
                <Bookmark
                  color="white"
                  sx={{
                    width: "1.25rem",
                    height: "1.25rem",
                    color: "white",
                  }}
                />
              </Box>
            </Tooltip>
          )}
        </Box>
      </Box>
      <Modal
        open={showRemoveProgramModal}
        onClose={handleCloseRemoveProgramModal}
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
            // border: "2px solid #000",
            borderRadius: ".5rem",
            outline: "none",
            boxShadow: 24,
            p: 4,
            display: "flex",
            flexDirection: "column",
            justifyItems: "center",
          }}
        >
          <IconButton
            aria-label="close"
            color="inherit"
            size="small"
            onClick={handleCloseRemoveProgramModal}
            sx={{
              position: "absolute",
              top: 8,
              right: 8,
            }}
          >
            <Close />
          </IconButton>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {t("removeProgram.modalText")}
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
                onClick={handleCloseRemoveProgramModal}
              >
                {t("userProfile.configPage.nao")}
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
                onClick={handleRemoveProgram}
              >
                {t("userProfile.configPage.sim")}
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </Box>
  );
};

const DetailedHeader = ({
  publisherPhoto,
  publishers,
  title = "",
  onCloseModal,
  onFollowUser,
  isFollowingUser,
  isOwner,
}) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: "1rem",
        height: "14%",
        color: "white",
      }}
    >
      <Avatar
        src={publisherPhoto}
        alt="Foto de Perfil"
        sx={{
          marginTop: ".75rem",
          "&:hover": {
            opacity: 0.8,
            cursor: "pointer",
          },
        }}
        onClick={() =>
          navigate(
            redirectToProfilePage(publishers[0]?.id, publishers[0]?.nome)
          )
        }
      />
      <Box
        sx={{ display: "flex", flexDirection: "column", marginTop: ".75rem" }}
      >
        <Typography fontWeight="bold" color="black">
          {title}
        </Typography>
        <Box sx={{ display: "flex", gap: ".25rem", alignItems: "center" }}>
          <Publisher
            publishers={publishers}
            isFollowing={isFollowingUser}
            onFollowUser={onFollowUser}
            isOwner={isOwner}
          />
          {isOwner ? null : (
            <>
              <Dot sx={{ fontSize: ".5rem", color: "black" }} />
              <Typography
                color="black"
                sx={{
                  "&:hover": {
                    cursor: "pointer",
                    textDecoration: "underline",
                  },
                }}
                onClick={onFollowUser}
              >
                {isFollowingUser
                  ? t("cardDetailed.userCard.following")
                  : t("cardDetailed.userCard.follow")}
              </Typography>
            </>
          )}
        </Box>
      </Box>
      <Box onClick={onCloseModal}>
        <Close
          sx={{
            color: "black",
            position: "absolute",
            right: "1rem",
            top: ".5rem",
            cursor: "pointer",
            "&:hover": {
              color: "#EAEAEA",
            },
          }}
        />
      </Box>
    </Box>
  );
};

const DetailedInfo = ({
  isEvent,
  city,
  location = "",
  description,
  dateStart = "",
  dateEnd = "",
}) => {
  const { t } = useTranslation();

  const generateLocation = () => {
    const cityStr = !city || !city?.length > 0 ? "" : city;
    const locationStr =
      !location || !location?.length > 0 || location == "null" ? "" : location;
    const separator =
      !city || !location?.length > 0 || location == "null" ? "" : ", ";
    return `${locationStr}${separator}${cityStr}`;
  };

  return (
    <Box display="flex" flexDirection="column" gap=".5rem" m="2rem">
      {description.length > 0 ? (
        <ReactQuill theme="bubble" value={description} readOnly />
      ) : null}
      {isEvent ? (
        <>
          <Box mt="1rem">
            <Typography display="flex" gap=".5rem" fontWeight="bold">
              {t("cardDetailed.local")}{" "}
              {
                <Typography fontWeight="normal">
                  {generateLocation()}
                </Typography>
              }
            </Typography>
          </Box>
          <Box>
            <Typography display="flex" gap=".5rem" fontWeight="bold">
              {t("cardDetailed.startDate")}{" "}
              {
                <Typography fontWeight="normal">
                  {defaultDatetimeToCVDateFormat(dateStart)}
                </Typography>
              }
            </Typography>
          </Box>
          {!dateEnd.startsWith("1900") ? (
            <Box>
              <Typography display="flex" gap=".5rem" fontWeight="bold">
                {t("cardDetailed.endDate")}{" "}
                {
                  <Typography fontWeight="normal">
                    {defaultDatetimeToCVDateFormat(dateEnd)}
                  </Typography>
                }
              </Typography>
            </Box>
          ) : null}
        </>
      ) : null}
    </Box>
  );
};

const DetailedProgram = ({ programs = [], handleRemoveProgram, isOwner }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleEditProgram = (programId) => {
    navigate(`/eventos/editar-programa/${programId}`);
  };

  const getEndHour = (program) => {
    if (program?.hora_fim === "23:59:59") {
      return "";
    }
    return ` - ${program?.hora_fim}`;
  };

  const generateLocation = (city, location) => {
    const cityStr = !city || !city?.length > 0 || city === "MUNDO" ? "" : city;
    const locationStr =
      !location || !location?.length > 0 || location == "null" ? "" : location;
    const separator =
      cityStr.length === 0 || !location?.length > 0 || location == "null"
        ? ""
        : ", ";
    return `${locationStr}${separator}${cityStr}`;
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      {programs.length > 0 ? (
        <>
          {" "}
          <Typography fontWeight="bold" textTransform="uppercase">
            {t("cardDetailed.program")}
          </Typography>
          {programs?.map((program) => (
            <Box
              key={program?.id}
              display="flex"
              flexDirection="column"
              gap=".5rem"
              width="100%"
            >
              {program?.data !== "1900-01-01" ? (
                <Typography mx="auto">
                  {defaultDateToCVDateFormat(program?.data)}
                </Typography>
              ) : null}
              <Avatar
                src={`${imgApiPath}/programa_eventosImg/${program?.imagem}`}
                alt={`Foto de ${program?.titulo}`}
                variant="square"
                sx={{ width: "100%", height: "auto" }}
              />
              <Box display="flex" flexDirection="column" gap=".5rem" m="2rem">
                <Box display="flex" gap=".5rem">
                  <Typography fontWeight="bold">{program?.titulo}</Typography>
                  {isOwner ? (
                    <>
                      <Tooltip
                        title={t("cardDetailed.editSchedule")}
                        placement="top"
                        arrow
                      >
                        <Box
                          id="edit-program"
                          sx={{
                            marginLeft: "auto",
                            borderRadius: "50%",
                            height: "1.5rem",
                            width: "1.5rem",
                            backgroundColor: (theme) =>
                              theme.palette.primary.main,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            cursor: "pointer",
                            "&:hover": {
                              opacity: 0.8,
                            },
                          }}
                          onClick={() => handleEditProgram(program?.id)}
                        >
                          <Edit
                            color="white"
                            sx={{
                              width: "1rem",
                              height: "1rem",
                              color: "white",
                            }}
                          />
                        </Box>
                      </Tooltip>
                      <Tooltip
                        title={t("cardDetailed.removeSchedule")}
                        placement="top"
                        arrow
                      >
                        <Box
                          id="remove-program"
                          sx={{
                            borderRadius: "50%",
                            height: "1.5rem",
                            width: "1.5rem",
                            backgroundColor: "#743600",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            cursor: "pointer",
                            "&:hover": {
                              opacity: 0.8,
                            },
                          }}
                          onClick={() => handleRemoveProgram(program?.id)}
                        >
                          <Delete
                            color="white"
                            sx={{
                              width: "1rem",
                              height: "1rem",
                              color: "white",
                            }}
                          />
                        </Box>
                      </Tooltip>{" "}
                    </>
                  ) : null}
                </Box>
                {program?.local?.length > 0 ||
                program?.cidadePrograma?.length > 0 ? (
                  <Box>
                    <Typography display="flex" gap=".5rem" fontWeight="bold">
                      {t("cardDetailed.local")}{" "}
                      {
                        <Typography fontWeight="normal">
                          {generateLocation(
                            program?.cidadePrograma,
                            program?.local
                          )}
                        </Typography>
                      }
                    </Typography>
                  </Box>
                ) : null}
                {program?.hora !== "23:59:59" ? (
                  <Box>
                    <Typography display="flex" gap=".5rem" fontWeight="bold">
                      {t("cardDetailed.hour")}{" "}
                      {
                        <Typography fontWeight="normal">
                          {program?.hora} {getEndHour(program)}
                        </Typography>
                      }
                    </Typography>
                  </Box>
                ) : null}
                <Box>
                  <Typography display="flex" gap=".5rem">
                    {program?.tipoBilhete ? t("cardDetailed.freeEntry") : ""}
                  </Typography>
                </Box>
              </Box>
              <ReactQuill
                style={{ margin: "0 1rem" }}
                theme="bubble"
                value={program?.descricao}
                readOnly
              />
            </Box>
          ))}{" "}
        </>
      ) : null}
    </Box>
  );
};

const DetailedOther = ({ others }) => {
  return (
    <Box>
      {others?.map((program) => (
        <Box display="flex" flexDirection="column" gap=".5rem" width="100%">
          <Avatar
            src={`${imgApiPath}/carnavalImg/${program?.imagem}`}
            alt={`Foto de ${program?.titulo}`}
            variant="square"
            sx={{ width: "100%", height: "auto" }}
          />
          <Typography fontWeight="bold" mx="auto">
            {program?.titulo}
          </Typography>
          <Box display="flex" flexDirection="column" gap=".5rem" m="2rem">
            <Typography>{parse(program?.descricao1)}</Typography>
            <Typography>{parse(program?.descricao2)}</Typography>
          </Box>
        </Box>
      ))}
    </Box>
  );
};

const DetailedImages = ({ images, type }) => {
  return (
    <Stack>
      {images?.map((img, index) => (
        <Avatar
          key={img.id}
          src={`${imgApiPath}/${type === "E" ? "eventosImg" : "projetosImg"}/${
            img.imagem
          }`}
          alt={`Imagem _${index}`}
          variant="square"
          sx={{ width: "100%", height: "auto" }}
        />
      ))}
    </Stack>
  );
};

const DetailedRelated = ({ related, type }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const getPostPath = (id, name) => {
    const postType = type === "eventos" ? "projetos" : "eventos";
    const postName = name
      .toLowerCase()
      .trim()
      .replaceAll(" ", "_")
      .replaceAll("/", "_")
      .replaceAll(".", "");
    return `/${postType}/${id}/${postName}`;
  };

  const associated =
    type === "eventos"
      ? "cardDetailed.associatedProjects"
      : "cardDetailed.associatedEvents";

  let _related = related;

  if (related?.id) {
    _related = [related];
  }

  return (
    <Box m="2rem">
      {_related != null && _related?.length > 0 ? (
        <Typography fontWeight="bold" textTransform="uppercase">
          {t(associated)}
        </Typography>
      ) : null}
      <Box
        display="flex"
        gap="2rem"
        justifyContent="space-around"
        alignItems="center"
        flexWrap="wrap"
      >
        {_related?.map((post, index) => (
          <Box
            display="flex"
            gap="1rem"
            flexDirection="column"
            alignItems="center"
            key={index}
            sx={{ width: "35%" }}
          >
            <Avatar
              src={`${imgApiPath}/${
                type === "eventos" ? "projetos" : "eventos"
              }Img/${post.imagem}`}
              variant="square"
              sx={{
                width: "100%",
                height: "auto",
                "&:hover": {
                  cursor: "pointer",
                  textDecoration: "underline",
                  opacity: 0.8,
                },
              }}
              onClick={() => navigate(getPostPath(post.id, post.nome))}
            />
            <Typography
              fontWeight="bold"
              sx={{
                "&:hover": {
                  cursor: "pointer",
                  textDecoration: "underline",
                  opacity: 0.8,
                },
              }}
              onClick={() => navigate(getPostPath(post.id, post.nome))}
            >
              {post?.nome}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default CardDetailed;
