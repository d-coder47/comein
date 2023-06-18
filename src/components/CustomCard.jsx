import React, { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Typography,
  Icon,
  Badge,
  Modal,
  Tooltip,
  Skeleton,
  Stack,
} from "@mui/material";
import {
  ThumbUpOffAlt,
  ThumbUp,
  Star,
  StarOutline,
  Reply,
} from "@mui/icons-material";

import { Visibility } from "@mui/icons-material";

import CardDetailed from "./CardDetailed";
import CustomBadge from "./CustomBadge";

import LazyLoad from "react-lazy-load";
import useEvents from "../hooks/useEvents";
import useProjects from "../hooks/useProjects";
import axiosInstance from "../api/axiosInstance";

const CustomCard = ({
  id = null,
  name,
  likes,
  visits,
  picture,
  publisherName,
  publisherPhoto,
  type,
}) => {
  const [isLiked, setIsLiked] = useState(null);
  const [isFavorite, setIsFavorite] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const {
    likeEvent,
    removeLikeFromEvent,
    favoriteEvent,
    removeFavoriteFromEvent,
  } = useEvents();
  const { likeProject, removeLikeFromProject } = useProjects();

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
          `/favoritos/getFavoritos/${userId},${eventId}`,
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

  const handleLike = (like) => {
    const user = JSON.parse(localStorage.getItem("userInfo"));
    if (!user)
      return (window.location.href = `http://${window.location.host}/user-registration`);

    const userId = user?.id;

    if (type === "E") {
      if (like) {
        return likeEvent(id, userId);
      }
      return removeLikeFromEvent(id);
    }

    if (like) {
      return likeProject(id, userId);
    }
    return removeLikeFromProject(id);
  };

  const handleFavorite = (favorite) => {
    const user = JSON.parse(localStorage.getItem("userInfo"));
    if (!user)
      return (window.location.href = `http://${window.location.host}/user-registration`);

    const userId = user?.id;

    if (type === "E") {
      if (favorite) {
        return favoriteEvent(id, userId);
      }
      return removeFavoriteFromEvent(id);
    }

    if (favorite) {
      return likeProject(id, userId);
    }
    return removeLikeFromProject(id);
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
          {/* </Tooltip> */}
          {/* <Typography
            sx={{
              color: showTitle ? "#fff" : "transparent",
              marginLeft: "1rem",
              marginTop: "-2rem",
              fontWeight: "bold",
              // width: "fit-content",
              zIndex: 99,
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              overflow: "hidden",
              width: "65%",
              "&:hover": {
                textDecoration: "underline",
                cursor: "pointer",
              },
            }}
            onClick={handleOpen}
          >
            {name}
          </Typography> */}
          {/* {showTitle ? (
            <Box
              sx={{ position: "absolute", top: "-0.25rem", right: "-0.125rem" }}
            >
              <CustomBadge isEvent={type === "E"} />
            </Box>
          ) : null} */}
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
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
                onClick={() => handleLike(false)}
                sx={{ width: 15, height: 15, color: "gray" }}
              />
              <Typography
                sx={{ fontWeight: "bold", color: "gray", fontSize: ".8rem" }}
                variant="p"
              >
                {likes}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: ".125rem" }}>
              <Visibility
                onClick={() => handleFavorite(false)}
                sx={{ width: 15, height: 15, color: "gray" }}
              />
              <Typography
                sx={{ fontWeight: "bold", color: "gray", fontSize: ".8rem" }}
                variant="p"
              >
                {visits}
              </Typography>
            </Box>
            <Reply
              sx={{
                width: 14,
                height: 14,
                cursor: "pointer",
                transform: "scaleX(-1)",
              }}
            />
          </Box>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
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
          {/* {open ? ( */}
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
          {/* ) : (
            <div></div>
          )} */}
        </Modal>
      </Box>
    </>
  );
};

export default CustomCard;
