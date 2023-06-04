import React from "react";
import {
  Avatar,
  Badge,
  Box,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import {
  Bookmark,
  FiberManualRecord as Dot,
  Star,
  RecommendRounded,
  ThumbUp,
} from "@mui/icons-material";
import CustomBadge from "./CustomBadge";

const DetailedHeader = ({ publisherPhoto, publishers, title, type }) => {
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
          <Typography>{publishers[0]}</Typography>
          <Dot sx={{ fontSize: ".5rem" }} />
          <Typography>Seguir</Typography>
        </Box>
      </Box>
      <Box sx={{ marginLeft: "auto" }}>
        <CustomBadge />
      </Box>
    </Box>
  );
};

const CardDetailed = ({
  publisherPhoto,
  publishers,
  title,
  type,
  pictures,
}) => {
  return (
    <Box
      sx={{
        margin: "0 4rem 0 6rem",
        backgroundColor: "transparent",
        outline: "none",
        height: "100vh",
        overflowY: "auto",
        display: "flex",
        gap: "1.5rem",
      }}
    >
      <Box id="content" display="flex" flexDirection="column" gap="0.5rem">
        <DetailedHeader
          publisherPhoto={publisherPhoto}
          publishers={publishers}
          title={title}
          type={type}
        />
        <Box sx={{ backgroundColor: "white" }}>
          {pictures.map((picture) => (
            <Avatar
              src={picture}
              alt={`Foto de ${title}`}
              variant="square"
              sx={{ width: "100%", height: "auto" }}
            />
          ))}
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
          onClick={() => console.log("Seguir")}
        >
          <Badge
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            badgeContent="+"
            overlap="circular"
            color="info"
          >
            <Avatar
              src={publisherPhoto}
              alt="Foto do Publicador"
              sx={{ width: "3rem", height: "3rem" }}
            />
          </Badge>
        </IconButton>
        {/* <Avatar
          src={publisherPhoto}
          alt="Foto do Publicador"
          sx={{ width: "3rem", height: "3rem" }}
        /> */}
        <Tooltip title="Adicionar aos favoritos" placement="left" arrow>
          <Box
            id="favorite"
            sx={{
              borderRadius: "50%",
              height: "3rem",
              width: "3rem",
              backgroundColor: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
            }}
            onClick={() => console.log("Favorito")}
          >
            <Star color="black" sx={{ width: "1.25rem", height: "1.25rem" }} />
          </Box>
        </Tooltip>

        <Tooltip title="Curtir" placement="left" arrow>
          <Box
            id="like"
            sx={{
              borderRadius: "50%",
              height: "3rem",
              width: "3rem",
              backgroundColor: (theme) => theme.palette.primary.main,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
            }}
            onClick={() => console.log("Gosto")}
          >
            <ThumbUp sx={{ color: "white", width: "1rem", height: "1rem" }} />
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

export default CardDetailed;
