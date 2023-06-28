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

const CardDetailed = ({
  id,
  publisherPhoto,
  title,
  publisher,
  isLiked,
  isFavorite,
  onLikePost,
  onFavoritePost,
  type,
  onCloseModal,
  picture,
}) => {
  const [details, setDetails] = useState(null);
  const [isFollowing, setIsFollowing] = useState(null);
  const [showUserCard, setShowUserCard] = useState(false);

  const userCardRef = useRef(null);
  const userCardParentRef = useRef(null);

  const { followUser } = useUserProfile();

  useEffect(() => {
    if (!id) return;
    const url = `/${type === "E" ? "eventos" : "projetos"}/listar/${id}`;
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

    const publisherId = details?.utilizador[0]?.id;

    if (!publisherId && publisherId !== undefined && isFollowing !== null)
      return;
    const user = JSON.parse(localStorage.getItem("userInfo"));

    if (!user) return;
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

  return (
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
          publisherPhoto={publisherPhoto}
          publishers={details?.utilizador}
          title={details?.dados?.nome}
          onCloseModal={onCloseModal}
          type={type}
        />
        <Box sx={{ backgroundColor: "white" }}>
          {picture ? (
            <Avatar
              src={picture}
              alt={`Foto de ${title}`}
              variant="square"
              sx={{ width: "100%", height: "auto" }}
            />
          ) : null}
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
              src={publisherPhoto}
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
            onClick={() => onFavoritePost(isFavorite)}
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
            onClick={() => onLikePost()}
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
          src={publisherPhoto}
          alt="Foto do Publicador"
          sx={{ width: "3rem", height: "3rem" }}
        /> */}
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
