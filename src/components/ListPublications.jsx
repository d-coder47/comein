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

const ListPublications = ({ userID, type, isVisitor, query = "" }) => {
  const { getEventPostByUser, getProjectPostByUser, getFavoritsPostByUser } =
    usePosts();
  const [events, setEvents] = useState([]);
  const [projects, setProjects] = useState([]);
  const [favs, setFavs] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  const navigate = useNavigate();

  const [refreshCount, setRefreshCount] = useState(0);

  const { t } = useTranslation();

  const handleRefresh = () => {
    setRefreshCount((prevCount) => prevCount + 1);
    fetchEventsData();
  };

  async function fetchEventsData() {
    const res = await getEventPostByUser(userID);
    if (typeof res?.dados !== "string") {
      setEvents(res?.dados);
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
  useEffect(() => {
    if (type === "event") {
      fetchEventsData();
    } else if (type === "project") {
      fetchProjectsData();
    } else if (type === "favs") {
      fetchFavsData();
    } else {
      fetchEventsData();
      fetchProjectsData();
      fetchFavsData();
    }
  }, []);

  useEffect(() => {
    if (!query) return;
    const eventsResult = events.filter((event) =>
      event?.nome?.toLowerCase().includes(query)
    );
    const projectsResult = events.filter((project) =>
      project?.nome?.toLowerCase().includes(query)
    );
    const favoritesResult = favs.filter((favorite) =>
      favorite?.nome?.toLowerCase().includes(query)
    );
    setSearchResults(
      eventsResult.concat(projectsResult.concat(favoritesResult.concat))
    );
  }, [query]);

  const displayNoPostByType = () => {
    if (type == "project") return t("userProfile.visitorNoProjects");
    if (type == "event") return t("userProfile.visitorNoEvents");
  };

  if (type === "event") {
    if (events?.length === 0) {
      return !isVisitor ? (
        <>
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
        </>
      ) : (
        <Typography>{displayNoPostByType()}</Typography>
      );
    } else {
      return (
        <Box
          mt="1rem"
          style={{
            marginLeft: "0",
            marginRigth: "2rem",
          }}
          flexGrow={1}
        >
          <Grid container spacing={3.8}>
            {events.length > 0 &&
              events?.map((card, index) => (
                <Grid item key={index} xs={3.8}>
                  <ProfileCustomCard
                    isVisitor={isVisitor}
                    key={index}
                    id={card.id}
                    name={card.nome}
                    likes={card.gostos}
                    visits={card.visitasPost}
                    picture={`https://comein.cv/comeincv_api_test/img/${
                      card.distincao === "E" ? "eventos" : "projetos"
                    }Img/${card.imagem}`}
                    publisherId={card.id_utilizador}
                    publisherName={card.nome_user}
                    publisherPhoto={`https://comein.cv/comeincv_api_test/img/perfilImg/${card.imgPerfil}`}
                    type={card.distincao}
                    onRefresh={handleRefresh}
                  />
                </Grid>
              ))}
          </Grid>
        </Box>
      );
    }
  } else if (type === "project") {
    if (projects.length === 0) {
      return !isVisitor ? (
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
      ) : (
        <Typography> {displayNoPostByType()}</Typography>
      );
    } else {
      return (
        <Box
          mt="1rem"
          style={{
            marginLeft: "0",
            marginRigth: "2rem",
          }}
          flexGrow={1}
        >
          <Grid container spacing={3.8}>
            {projects.length > 0 &&
              projects?.map((card, index) => (
                <Grid item key={index} xs={3.8}>
                  <ProfileCustomCard
                    isVisitor={isVisitor}
                    key={index}
                    id={card.id}
                    name={card.nome}
                    likes={card.gostos}
                    visits={card.visitasPost}
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
  } else if (type === "favs") {
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
      <Box
        mt="1rem"
        tyle={{
          marginLeft: "0",
          marginRigth: "2rem",
        }}
        flexGrow={1}
      >
        <Grid container spacing={3.8}>
          {favs.length > 0 &&
            favs?.map((card, index) => (
              <Grid item key={index} xs={3.8}>
                <ProfileCustomCard
                  isVisitor={isVisitor}
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
  } else {
    return (
      <Box
        mt="1rem"
        tyle={{
          marginLeft: "0",
          marginRigth: "2rem",
        }}
        flexGrow={1}
      >
        <Grid container spacing={3.8}>
          {searchResults.length > 0 &&
            searchResults?.map((card, index) => (
              <Grid item key={index} xs={3.8}>
                <ProfileCustomCard
                  isVisitor={isVisitor}
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
