import {
  Box,
  Grid,
  CardActions,
  CardContent,
  Card,
  Typography,
  Button,
  Tooltip,
} from "@mui/material";
import { Info } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import usePosts from "../hooks/usePosts";
import ProfileCustomCard from "./ProfileCustomCard";

import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const ListPublications = ({ userID, type, isVisitor }) => {
  const { getEventPostByUser, getProjectPostByUser, getFavoritsPostByUser } =
    usePosts();
  const [events, setEvents] = useState([]);
  const [projects, setProjects] = useState([]);
  const [favs, setFavs] = useState([]);

  const navigate = useNavigate();

  const { t } = useTranslation();

  useEffect(() => {
    async function fetchEventsData() {
      const res = await getEventPostByUser(userID);
      if (typeof res.dados !== "string") {
        setEvents(res.dados);
        localStorage.setItem("eventsNum", events.length);
      }
      localStorage.setItem("eventsNum", events.length);
    }

    async function fetchProjectsData() {
      const res = await getProjectPostByUser(userID);
      if (typeof res.dados !== "string") {
        setProjects(res.dados);
        localStorage.setItem("favsNum", favs.length);
        localStorage.setItem("projectsNum", projects.length);
      }

      localStorage.setItem("projectsNum", projects.length);
    }

    async function fetchFavsData() {
      const res = await getFavoritsPostByUser(userID);
      if (typeof res.dados !== "string") {
        setFavs(res.dados);
        localStorage.setItem("favsNum", favs.length);
      }
      localStorage.setItem("favsNum", favs.length);
    }
    if (type === "event") {
      fetchEventsData();
    } else if (type === "project") {
      fetchProjectsData();
    } else {
      fetchFavsData();
    }
  }, []);

  if (type === "event") {
    if (events.length === 0) {
      return (
        <Card
          sx={{
            minWidth: 275,
            minHeight: 275,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "3rem",
          }}
        >
          <CardContent>
            <Box
              sx={{
                width: "60px",
                height: "60px",
                backgroundColor: "#33B3CC",

                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: "50%",
                cursor: "pointer",
                "&:hover": {
                  backgroundColor: "#743600",
                },
              }}
            >
              <Tooltip title="Adicionar Evento">
                <Button>
                  <Info
                    sx={{
                      color: "#fff",
                      fontSize: "3.25rem",
                    }}
                  />
                </Button>
              </Tooltip>
            </Box>
          </CardContent>
          <CardActions>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{
                m: 3,
                color: "#ffffff",
                borderRadius: "16px",
                textTransform: "none",
              }}
            >
              {t("userProfile.adicionarPrimeiroEvento")}
            </Button>
          </CardActions>
        </Card>
      );
    } else {
      return (
        <Box mt="1rem" mx="2rem" flexGrow={1}>
          <Grid container spacing={3.8}>
            {events.length > 0 &&
              events?.map((card, index) => (
                <Grid item key={index} xs={3.8}>
                  <ProfileCustomCard
                    key={index}
                    id={card.id}
                    name={card.nome}
                    likes={card.gostos}
                    visits={card.visitas}
                    picture={`https://comein.cv/comeincv_api_test/img/${
                      card.distincao === "E" ? "eventos" : "projetos"
                    }Img/${card.imagem}`}
                    publisherId={card.id_utilizador}
                    publisherName={card.nome_user}
                    publisherPhoto={`https://comein.cv/comeincv_api_test/img/perfilImg/${card.imgPerfil}`}
                    type={card.distincao}
                  />
                </Grid>
              ))}
          </Grid>
        </Box>
      );
    }
  } else if (type === "project") {
    if (projects.length === 0) {
      return (
        <Card
          sx={{
            minWidth: 275,
            minHeight: 275,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "3rem",
          }}
        >
          <CardContent>
            <Box
              sx={{
                width: "60px",
                height: "60px",
                backgroundColor: "#33B3CC",

                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: "50%",
                cursor: "pointer",
                "&:hover": {
                  backgroundColor: "#743600",
                },
              }}
            >
              <Tooltip title="Adicionar Projeto">
                <Button>
                  <Info
                    sx={{
                      color: "#fff",
                      fontSize: "3.25rem",
                    }}
                  />
                </Button>
              </Tooltip>
            </Box>
          </CardContent>
          <CardActions>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{
                m: 3,
                color: "#ffffff",
                borderRadius: "16px",
                textTransform: "none",
              }}
            >
              {t("userProfile.adicionePrimeiroProj")}
            </Button>
          </CardActions>
        </Card>
      );
    } else {
      return (
        <Box mt="1rem" mx="2rem" flexGrow={1}>
          <Grid container spacing={3.8}>
            {projects.length > 0 &&
              projects?.map((card, index) => (
                <Grid item key={index} xs={3.8}>
                  <ProfileCustomCard
                    key={index}
                    id={card.id}
                    name={card.nome}
                    likes={card.gostos}
                    visits={card.visitas}
                    picture={`https://comein.cv/comeincv_api_test/img/${
                      card.distincao === "E" ? "eventos" : "projetos"
                    }Img/${card.imagem}`}
                    publisherId={card.id_utilizador}
                    publisherName={card.nome_user}
                    publisherPhoto={`https://comein.cv/comeincv_api_test/img/perfilImg/${card.imgPerfil}`}
                    type={card.distincao}
                  />
                </Grid>
              ))}
          </Grid>
        </Box>
      );
    }
  } else {
    if (favs.length === 0) {
      return (
        <Card
          sx={{
            minWidth: 275,
            minHeight: 275,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "3rem",
          }}
        >
          <CardContent>
            <Typography
              sx={{ fontSize: 14, color: "#878787" }}
              color="text.secondary"
              gutterBottom
            >
              {t("userProfile.nenhumFavorito")}
            </Typography>
          </CardContent>
        </Card>
      );
    }
    return (
      <Box mt="1rem" mx="2rem" flexGrow={1}>
        <Grid container spacing={3.8}>
          {favs.length > 0 &&
            favs?.map((card, index) => (
              <Grid item key={index} xs={3.8}>
                <ProfileCustomCard
                  key={index}
                  id={card.id}
                  name={card.nome}
                  likes={card.gostos}
                  visits={card.visitas}
                  picture={`https://comein.cv/comeincv_api_test/img/${
                    card.distincao === "E" ? "eventos" : "projetos"
                  }Img/${card.imagem}`}
                  publisherId={card.id_utilizador}
                  publisherName={card.nome_user}
                  publisherPhoto={`https://comein.cv/comeincv_api_test/img/perfilImg/${card.imgPerfil}`}
                  type={card.distincao}
                />
              </Grid>
            ))}
        </Grid>
      </Box>
    );
  }
};

export default ListPublications;
