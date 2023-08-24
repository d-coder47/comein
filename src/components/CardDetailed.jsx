import React, { useEffect, useRef, useState } from "react";
import {
  Avatar,
  Badge,
  Box,
  IconButton,
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
} from "@mui/icons-material";
import axiosInstance from "../api/axiosInstance";
import Publisher from "./Publisher";
import usePosts from "../hooks/usePosts";
import useUserProfile from "../hooks/useUserProfile";
import { useNavigate, useParams } from "react-router-dom";
import useEvents from "../hooks/useEvents";
import useProjects from "../hooks/useProjects";
import { Helmet } from "react-helmet";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "react-quill/dist/quill.bubble.css";
import { useTranslation } from "react-i18next";

const CardDetailed = () => {
  const params = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const { type, id } = params;

  const [user, setUser] = useState(null);
  const [details, setDetails] = useState(null);
  const [isFollowing, setIsFollowing] = useState(null);
  const [isLiked, setIsLiked] = useState(null);
  const [isFavorite, setIsFavorite] = useState(null);

  const userCardParentRef = useRef(null);

  const { followUser } = useUserProfile();
  const { likePost, favoritePost } = usePosts();
  const { removeFavoriteFromEvent, addEventVisit } = useEvents();
  const { removeFavoriteFromProject, addProjetVisit } = useProjects();

  const [isOwner, setIsOwner] = useState();

  async function countEventVisit() {
    if (type === "eventos") {
      const add_event_visit_res = await addEventVisit(id);
    } else {
      const add_project_visit_res = await addProjetVisit(id);
    }
  }

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
        if (!response.data || !user) return navigate("/login");
        setDetails(response.data);
        setUser(user);
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

    const publisherId = details?.utilizador[0]?.id;

    if (!publisherId && publisherId !== undefined && isFollowing !== null)
      return;
    const user = JSON.parse(localStorage.getItem("userInfo"));

    if (!user) return;

    if (type === "eventos") {
      hasLikedEvent(user.id, id);
    } else {
      hasLikedProject(user.id, id);
    }

    hasFavoritePost(user.id, id);

    isFollowingUser(publisherId, parseInt(user.id));
  }, [details]);

  const handleFollowUser = async () => {
    const user = JSON.parse(localStorage.getItem("userInfo"));

    if (!user) return;
    const result = await followUser(user.id, id);
    if (result !== null) setIsFollowing(result);
  };

  const handleLike = async () => {
    const user = JSON.parse(localStorage.getItem("userInfo"));
    if (!user)
      return (window.location.href = `http://${window.location.host}/user-registration`);

    const userId = user?.id;

    const result = await likePost(userId, id, details?.dados?.tipo);
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

  const onCloseModal = () => {
    navigate(localStorage.getItem("previousLocation"));
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
    <Box
      sx={{ width: "100%", height: "100%", backgroundColor: "rgba(0,0,0,.9)" }}
    >
      <Helmet>
        <meta property="og:title" content={details?.dados?.nome} />
        <meta
          property="og:image"
          content={`https://comein.cv/comeincv_api_test/img/${type}Img/${details?.dados?.imagem}`}
        />
      </Helmet>
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
            publisherPhoto={`https://comein.cv/comeincv_api_test/img/perfilImg/${details?.utilizador[0].img_perfil}`}
            publishers={details?.utilizador}
            title={details?.dados?.nome}
            onCloseModal={onCloseModal}
            type={type}
            isOwner={isOwner}
          />
          <Box sx={{ backgroundColor: "white" }}>
            <Avatar
              src={`https://comein.cv/comeincv_api_test/img/${type}Img/${details?.dados?.imagem}`}
              alt={`Foto de ${details?.dados?.nome}`}
              variant="square"
              sx={{ width: "100%", height: "auto" }}
            />

            <DetailedInfo
              isEvent={type === "eventos"}
              location={details?.dados?.local}
              description={details?.dados?.descricao}
              dateStart={details?.dados?.data_inicio}
              dateEnd={details?.dados?.data_fim}
            />
            <DetailedProgram programs={details?.programa} />
            <DetailedOther others={details?.outros} />
            <DetailedImages images={details?.imagens} type={type} />
            <DetailedRelated
              related={
                type === "projetos"
                  ? details?.eventos_assoc
                    ? details?.eventos_assoc
                    : null
                  : details?.projeto_assoc
                  ? [details?.projeto_assoc]
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
                src={`https://comein.cv/comeincv_api_test/img/perfilImg/${details?.utilizador[0].img_perfil}`}
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
                    `/user-profile/${details?.utilizador[0]?.id}/${details?.utilizador[0]?.nome}`
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
                  src={`https://comein.cv/comeincv_api_test/img/perfilImg/${details?.utilizador[0].img_perfil}`}
                  alt="Foto do Publicador"
                  sx={{ width: "3rem", height: "3rem" }}
                />
              </Badge>
            )}
          </IconButton>
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
                backgroundColor: isFavorite ? "#3c3c3c" : "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
              }}
              onClick={() => handleFavorite(isFavorite)}
            >
              <Star
                color="white"
                sx={{
                  width: "1.25rem",
                  height: "1.25rem",
                  color: isFavorite ? "white" : "#3c3c3c",
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
                  {parseInt(details?.dados?.gostos) + 1}
                </Typography>
              ) : null}
            </Box>
          </Tooltip>
        </Box>
      </Box>
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
          navigate(`/user-profile/${publishers[0]?.id}/${publishers[0]?.nome}`)
        }
      />
      <Box
        sx={{ display: "flex", flexDirection: "column", marginTop: ".75rem" }}
      >
        <Typography fontWeight="bold">{title}</Typography>
        <Box sx={{ display: "flex", gap: ".25rem", alignItems: "center" }}>
          <Publisher
            publishers={publishers}
            isFollowing={isFollowingUser}
            onFollowUser={onFollowUser}
            isOwner={isOwner}
          />
          {isOwner ? null : (
            <>
              <Dot sx={{ fontSize: ".5rem" }} />
              <Typography
                sx={{
                  "&:hover": { cursor: "pointer", textDecoration: "underline" },
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
  );
};

const DetailedInfo = ({
  isEvent,
  location,
  description,
  dateStart,
  dateEnd,
}) => {
  const { t } = useTranslation();
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
              {<Typography fontWeight="normal">{location}</Typography>}
            </Typography>
          </Box>
          <Box>
            <Typography display="flex" gap=".5rem" fontWeight="bold">
              {t("cardDetailed.startDate")}{" "}
              {<Typography fontWeight="normal">{dateStart}</Typography>}
            </Typography>
          </Box>
          <Box>
            <Typography display="flex" gap=".5rem" fontWeight="bold">
              {t("cardDetailed.endDate")}{" "}
              {<Typography fontWeight="normal">{dateEnd}</Typography>}
            </Typography>
          </Box>
        </>
      ) : null}
    </Box>
  );
};

const DetailedProgram = ({ programs = [] }) => {
  const { t } = useTranslation();
  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      {programs.length > 0 ? (
        <>
          {" "}
          <Typography fontWeight="bold" textTransform="uppercase">
            {t("cardDetailed.program")}
          </Typography>
          {programs?.map((program) => (
            <Box display="flex" flexDirection="column" gap=".5rem" width="100%">
              <Typography mx="auto">{program?.data}</Typography>
              <Avatar
                src={`https://comein.cv/comeincv_api_test/programa_eventosImg/${program?.imagem}`}
                alt={`Foto de ${program?.titulo}`}
                variant="square"
                sx={{ width: "100%", height: "auto" }}
              />
              <Box display="flex" flexDirection="column" gap=".5rem" m="2rem">
                <Typography fontWeight="bold">{program?.titulo}</Typography>
                <Box>
                  <Typography display="flex" gap=".5rem" fontWeight="bold">
                    {t("cardDetailed.local")}{" "}
                    {
                      <Typography fontWeight="normal">
                        {program?.local}
                      </Typography>
                    }
                  </Typography>
                </Box>
                <Box>
                  <Typography display="flex" gap=".5rem" fontWeight="bold">
                    {t("cardDetailed.hour")}{" "}
                    {
                      <Typography fontWeight="normal">
                        {program?.hora}
                      </Typography>
                    }
                  </Typography>
                </Box>
                <Box>
                  <Typography display="flex" gap=".5rem">
                    {program?.tipoBilhete ? t("cardDetailed.freeEntry") : ""}
                  </Typography>
                </Box>
              </Box>
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
            src={`https://comein.cv/comeincv_api_test/carnavalImg/${program?.imagem}`}
            alt={`Foto de ${program?.titulo}`}
            variant="square"
            sx={{ width: "100%", height: "auto" }}
          />
          <Typography fontWeight="bold" mx="auto">
            {program?.titulo}
          </Typography>
          <Box display="flex" flexDirection="column" gap=".5rem" m="2rem">
            <Typography>{program?.descricao1}</Typography>
            <Typography>{program?.descricao2}</Typography>
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
          src={`https://comein.cv/comeincv_api_test/${
            type === "E" ? "eventosImg" : "projetosImg"
          }/${img.imagem}`}
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
    const postName = name.toLowerCase().trim().replaceAll(" ", "_");
    return `/${postType}/${id}/${postName}`;
  };

  const associated =
    type === "eventos"
      ? "cardDetailed.associatedProjects"
      : "cardDetailed.associatedEvents";

  return (
    <Box m="2rem">
      {related != null && related?.length > 0 ? (
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
        {related?.map((post, index) => (
          <Box
            display="flex"
            gap="1rem"
            flexDirection="column"
            alignItems="center"
            key={index}
            sx={{ width: "35%" }}
          >
            <Avatar
              src={`https://comein.cv/comeincv_api_test/img/${
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
