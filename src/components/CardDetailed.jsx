import React, { useEffect, useRef, useState } from "react";
import {
  Avatar,
  Badge,
  Box,
  IconButton,
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
import UserCard from "./UserCard";
import { useNavigate, useParams } from "react-router-dom";
import useEvents from "../hooks/useEvents";
import useProjects from "../hooks/useProjects";
import { Helmet } from "react-helmet";

const CardDetailed = () => {
  const params = useParams();
  const navigate = useNavigate();

  const { type, id } = params;

  const [details, setDetails] = useState(null);
  const [isFollowing, setIsFollowing] = useState(null);
  const [isLiked, setIsLiked] = useState(null);
  const [isFavorite, setIsFavorite] = useState(null);

  const [showUserCard, setShowUserCard] = useState(false);

  const userCardRef = useRef(null);
  const userCardParentRef = useRef(null);

  const { followUser } = useUserProfile();
  const { likePost, favoritePost } = usePosts();
  const { removeFavoriteFromEvent } = useEvents();
  const { removeFavoriteFromProject } = useProjects();

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
        setDetails(response.data);
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

  // useEffect(() => {
  //   if (!userCardRef.current) return;
  //   const mouseMoveHandler = (e) => {
  //     const mousePosition = {
  //       x: e.clientX,
  //       y: e.clientY,
  //     };

  //     // Check if the mouse position is within the div's boundaries.
  //     const userCardBounds = userCardRef.current.getBoundingClientRect();
  //     const isInsideUserCard =
  //       mousePosition.x >= userCardBounds.left &&
  //       mousePosition.x <= userCardBounds.right &&
  //       mousePosition.y >= userCardBounds.top &&
  //       mousePosition.y <= userCardBounds.bottom;

  //     const userCardParentBounds =
  //       userCardParentRef.current.getBoundingClientRect();
  //     const isInsideUserCardParent =
  //       mousePosition.x >= userCardParentBounds.left &&
  //       mousePosition.x <= userCardParentBounds.right &&
  //       mousePosition.y >= userCardParentBounds.top &&
  //       mousePosition.y <= userCardParentBounds.bottom;

  //     if (isInsideUserCard || isInsideUserCardParent) {
  //       setShowUserCard(true);
  //       console.log("mouse over", true);
  //     } else {
  //       setShowUserCard(false);
  //       console.log("mouse over", false);
  //     }
  //   };

  //   window.addEventListener("mousemove", mouseMoveHandler);

  //   return () => {
  //     window.removeEventListener("mousemove", mouseMoveHandler);
  //   };
  // }, []);

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
      const result = await favoritePost(userId, id, details?.dados?.tipo);
      if (!result) return;
      return setIsFavorite(true);
    }

    let result;
    if (type === "E") {
      result = await removeFavoriteFromEvent(id, userId);
    } else {
      result = await removeFavoriteFromProject(id, userId);
    }

    if (!result) return;
    return setIsFavorite(false);
  };

  const onCloseModal = () => {
    navigate("/");
  };

  if (!details) {
    <div>Loading</div>;
  }

  return (
    <Box
      sx={{ width: "100%", height: "100%", backgroundColor: "rgba(0,0,0,.9)" }}
    >
      <Helmet>
        <meta
          property="og:image"
          content={`https://comein.cv/comeincv_api_test/img/${type}Img/${details?.dados?.imagem}`}
        />
        {/* Other meta tags */}
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
          />
          <Box sx={{ backgroundColor: "white" }}>
            <Avatar
              src={`https://comein.cv/comeincv_api_test/img/${type}Img/${details?.dados?.imagem}`}
              alt={`Foto de ${details?.dados?.nome}`}
              variant="square"
              sx={{ width: "100%", height: "auto" }}
            />

            <DetailedInfo
              location={details?.dados?.local}
              description={details?.dados?.descricao}
              dateStart={details?.dados?.data_inicio}
              dateEnd={details?.dados?.data_fim}
            />
            <DetailedProgram programs={details?.programa} />
            <DetailedOther others={details?.outros} />
            <DetailedImages images={details?.imagens} type={type} />
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
          </IconButton>
          {/* <Box
          ref={userCardRef}
          sx={{
            position: "absolute",
            zIndex: "9",
            width: "22rem",
            paddingBottom: "1.25rem",
            backgroundColor: "white",
            borderRadius: "0.25rem",
            display: showUserCard ? "flex" : "none",
          }}
        >
          <UserCard publisher={details?.utilizador[0]} />
        </Box> */}
          <Tooltip
            title={
              isFavorite ? "Retirar dos favoritos" : "Adicionar aos favoritos"
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
            title={isLiked ? "Retirar gosto" : "Gosto"}
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
          {/* <Avatar
          src={`https://comein.cv/comeincv_api_test/img/perfilImg/${details?.utilizador[0]}`}
          alt="Foto do Publicador"
          sx={{ width: "3rem", height: "3rem" }}
        /> */}
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
}) => {
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
        sx={{ marginTop: ".75rem" }}
      />
      <Box
        sx={{ display: "flex", flexDirection: "column", marginTop: ".75rem" }}
      >
        <Typography fontWeight="bold">{title}</Typography>
        <Box sx={{ display: "flex", gap: ".25rem", alignItems: "center" }}>
          <Publisher publishers={publishers} />
          <Dot sx={{ fontSize: ".5rem" }} />
          <Typography
            sx={{
              "&:hover": { cursor: "pointer", textDecoration: "underline" },
            }}
            onClick={onFollowUser}
          >
            {isFollowingUser ? "Seguindo" : "Seguir"}
          </Typography>
        </Box>
      </Box>
      {/* <Box sx={{ marginLeft: "auto" }}>
        <CustomBadge isEvent={type === "E"} />
      </Box> */}
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

const DetailedInfo = ({ location, description, dateStart, dateEnd }) => {
  return (
    <Box display="flex" flexDirection="column" gap=".5rem" m="2rem">
      <Typography sx={{ textAlign: "justify" }}>{description}</Typography>
      <Box mt="1rem">
        <Typography display="flex" gap=".5rem" fontWeight="bold">
          Local: {<Typography fontWeight="normal">{location}</Typography>}
        </Typography>
      </Box>
      <Box>
        <Typography display="flex" gap=".5rem" fontWeight="bold">
          Data Início:{" "}
          {<Typography fontWeight="normal">{dateStart}</Typography>}
        </Typography>
      </Box>
      <Box>
        <Typography display="flex" gap=".5rem" fontWeight="bold">
          Data Fim: {<Typography fontWeight="normal">{dateEnd}</Typography>}
        </Typography>
      </Box>
    </Box>
  );
};

const DetailedProgram = ({ programs = [] }) => {
  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      {programs.length > 0 ? (
        <>
          {" "}
          <Typography fontWeight="bold" textTransform="uppercase">
            Programa
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
                    Local:{" "}
                    {
                      <Typography fontWeight="normal">
                        {program?.local}
                      </Typography>
                    }
                  </Typography>
                </Box>
                <Box>
                  <Typography display="flex" gap=".5rem" fontWeight="bold">
                    Hora:{" "}
                    {
                      <Typography fontWeight="normal">
                        {program?.hora}
                      </Typography>
                    }
                  </Typography>
                </Box>
                <Box>
                  <Typography display="flex" gap=".5rem">
                    {program?.tipoBilhete ? "Entrada Livre" : ""}
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
  const calculateSpace = () => {
    // if(related.length % 2 === 0)
  };
  return (
    <Box display="flex" alignItems="center">
      {related?.map((post) => (
        <Box sm={6}>
          <Avatar
            src={`https://comein.cv/comeincv_api_test/img/${
              type === "E" ? "eventos" : "projetos"
            }Img/${post.imagem}`}
          />
        </Box>
      ))}
    </Box>
  );
};

export default CardDetailed;
