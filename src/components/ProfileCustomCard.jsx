import React, { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Typography,
  Modal,
  Skeleton,
  Stack,
  Button,
} from "@mui/material";
import { ThumbUp, Share, Close, Link } from "@mui/icons-material";

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
import { useNavigate } from "react-router-dom";

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
}) => {
  const [isLiked, setIsLiked] = useState(null);
  const [isFavorite, setIsFavorite] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [openShareModal, setOpenShareModal] = useState(false);

  const navigate = useNavigate();

  const getPostPath = () => {
    const postType = type === "E" ? "eventos" : "projetos";
    const postName = name.toLowerCase().trim().replaceAll(" ", "_");
    return `${postType}/${id}/${postName}`;
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleOpen = () => {
    navigate(getPostPath());
    // setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const handleOpenShareModal = () => setOpenShareModal(true);
  const handleCloseShareModal = () => setOpenShareModal(false);

  const { removeFavoriteFromEvent } = useEvents();

  const { likePost, favoritePost } = usePosts();

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
    console.log("result", result);
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
    if (type === "E") {
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

  return (
    <>
      <Box
        sx={{
          height: "20rem",
        }}
      >
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
            <Box sx={{ display: "flex", alignItems: "center", gap: ".125rem" }}>
              <ThumbUp
                // onClick={() => handleLike(false)}
                sx={{ width: 15, height: 15, color: "black" }}
              />
              <Typography
                sx={{ fontWeight: "bold", color: "black", fontSize: ".8rem" }}
                variant="p"
              >
                {likes}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: ".125rem" }}>
              <Visibility
                // onClick={() => handleFavorite(false)}
                sx={{ width: 15, height: 15, color: "black" }}
              />
              <Typography
                sx={{ fontWeight: "bold", color: "black", fontSize: ".8rem" }}
                variant="p"
              >
                {visits}
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
        <Box
          width="fit-content"
          alignItems="center"
          gap=".25rem"
          onMouseEnter={handleClick}
        >
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
                  Partilhe nas suas redes sociais
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
                  Copiar Ligação
                </Button>
              </Box>
            </Box>
          </Box>
        </Modal>
      </Box>
    </>
  );
};

export default ProfileCustomCard;
