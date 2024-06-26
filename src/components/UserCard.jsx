import { LocationOn } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Divider,
  List,
  ListItem,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { imgApiPath } from "../api/apiPath";
import { redirectToProfilePage } from "../utils/generateUrl";

const UserCard = ({
  publisher = null,
  isFollowing,
  onFollowUser,
  isOwner = false,
}) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const getResidencia = (residencia) => {
    return residencia === "MUNDO" || residencia === null
      ? ""
      : `${residencia}, `;
  };

  if (!publisher || publisher === undefined) {
    return (
      <Stack
        spacing={1}
        direction="column"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "22rem",
          height: "100%",
        }}
      >
        <Skeleton variant="rectangular" width="100%" height="7rem" />
        <Skeleton
          variant="circular"
          sx={{
            width: "4.25rem",
            height: "4.25rem",
            transform: "translateY(-50%)",
            border: "2px solid white",
          }}
        />
        <Skeleton variant="rectangular" width="30%" />
        <Skeleton variant="rectangular" width="50%" />
        <Skeleton variant="rectangular" width="70%" />
        <Skeleton variant="rectangular" width="80%" height="2rem" />
      </Stack>
    );
  }

  const handleAccessPage = () => {
    navigate(redirectToProfilePage(publisher?.id, publisher?.nome));
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "22rem",
      }}
    >
      <Avatar
        variant="square"
        src={`${imgApiPath}/capaImg/${publisher?.img_capa}`}
        alt={`Foto de capa de ${publisher?.nome}`}
        sx={{
          width: "100%",
          height: "7rem",
          objectFit: "fill",
        }}
      />
      <Avatar
        src={
          publisher?.login_from === "google"
            ? publisher?.img_perfil
            : `${imgApiPath}/perfilImg/${publisher?.img_perfil}`
        }
        alt={`Foto de perfil de ${publisher?.nome}`}
        sx={{
          width: "4.25rem",
          height: "4.25rem",
          transform: "translateY(-50%)",
          border: "2px solid white",
          "&:hover": {
            opacity: 0.8,
            cursor: "pointer",
          },
        }}
        onClick={handleAccessPage}
      />
      <Typography
        onClick={handleAccessPage}
        sx={{
          color: "black",
          fontWeight: "bold",
          fontSize: "1rem",
          cursor: "pointer",
          "&:hover": {
            opacity: 0.8,
          },
        }}
      >
        {publisher?.nome}
      </Typography>
      <Typography
        sx={{
          color: "gray",
          fontWeight: "bold",
          fontSize: ".8rem",
          display: "flex",
          alignItems: "center",
          gap: ".125rem",
        }}
      >
        {" "}
        <LocationOn sx={{ color: "gray" }} fontSize="1.25rem" />
        {/* {`${publisher?.residencia}, ${publisher?.pais}`} */}
        {`${getResidencia(publisher?.residencia)}`} {publisher?.pais}
      </Typography>
      <List id="info-group" sx={{ display: "flex", alignItems: "center" }}>
        <ListItem
          id="likes"
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{
              color: "black",
              fontWeight: "bold",
              fontSize: "1rem",
            }}
          >
            {publisher?.gostos || 0}
          </Typography>
          <Typography
            sx={{
              color: "gray",
              fontWeight: "bold",
              fontSize: ".8rem",
            }}
          >
            {t("cardDetailed.userCard.likes")}
          </Typography>
        </ListItem>
        <Divider orientation="vertical" />
        <ListItem
          id="followers"
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{
              color: "black",
              fontWeight: "bold",
              fontSize: "1rem",
            }}
          >
            {publisher?.seguidores || 0}
          </Typography>
          <Typography
            sx={{
              color: "gray",
              fontWeight: "bold",
              fontSize: ".8rem",
            }}
          >
            {t("cardDetailed.userCard.followers")}
          </Typography>
        </ListItem>
        <Divider orientation="vertical" />
        <ListItem
          id="visits"
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{
              color: "black",
              fontWeight: "bold",
              fontSize: "1rem",
            }}
          >
            {publisher?.visitas || 0}
          </Typography>
          <Typography
            sx={{
              color: "gray",
              fontWeight: "bold",
              fontSize: ".8rem",
            }}
          >
            {t("cardDetailed.userCard.visits")}
          </Typography>
        </ListItem>
      </List>
      <Button
        variant="contained"
        color="primary"
        size="small"
        sx={{ width: "80%", textTransform: "unset", fontWeight: "bold" }}
        onClick={handleAccessPage}
      >
        {/* {isOwner
          ? t("cardDetailed.userCard.accessYourPage")
          : isFollowing
          ? t("cardDetailed.userCard.following")
          : t("cardDetailed.userCard.follow")} */}
        {t("cardDetailed.userCard.accessPage")}
      </Button>
    </Box>
  );
};

export default UserCard;
