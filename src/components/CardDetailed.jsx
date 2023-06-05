import React, { useEffect, useState } from "react";
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
import axiosInstance from "../api/axiosInstance";

const DetailedHeader = ({
  publisherPhoto,
  publishers,
  title = "denny",
  type,
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
          <Typography>{publishers?.nome}</Typography>
          <Dot sx={{ fontSize: ".5rem" }} />
          <Typography>Seguir</Typography>
        </Box>
      </Box>
      <Box sx={{ marginLeft: "auto" }}>
        <CustomBadge isEvent={type === "E"} />
      </Box>
    </Box>
  );
};

const DetailedInfo = ({ location, dateStart, dateEnd }) => {
  return (
    <Box display="flex" flexDirection="column" gap=".5rem" m="2rem">
      <Box>
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
            src={`https://comein.cv/comeincv_api_test/programa_eventosImg/${program?.imagem}`}
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

const CardDetailed = ({
  id,
  publisherPhoto,
  publishers,
  title,
  type,
  picture,
}) => {
  const [details, setDetails] = useState(null);

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
          publishers={details?.utilizador}
          title={details?.dados?.nome}
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
            dateStart={details?.dados?.data_inicio}
            dateEnd={details?.dados?.data_fim}
          />
          <DetailedProgram programs={details?.programa} />
          <DetailedOther others={details?.outros} />
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
