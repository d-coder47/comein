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
import { useEffect, useState } from "react";
import usePosts from "../hooks/usePosts";
import ProfileCustomCard from "./ProfileCustomCard";
import { useNavigate } from "react-router-dom";

import { useTranslation } from "react-i18next";
import { imgApiPath } from "../api/apiPath";

const ListPublications = ({ userID, type, isVisitor, query = "" }) => {
  const { getEventPostByUser, getProjectPostByUser, getFavoritsPostByUser } =
    usePosts();
  const [events, setEvents] = useState([]);
  const [projects, setProjects] = useState([]);
  const [favs, setFavs] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  const [refreshCount, setRefreshCount] = useState(0);

  const { t } = useTranslation();

  const navigate = useNavigate();

  const handleRefresh = () => {
    setRefreshCount((prevCount) => prevCount + 1);
    fetchEventsData();
    fetchProjectsData();
    fetchFavsData();
  };

  async function fetchEventsData() {
    const res = await getEventPostByUser(userID);

    if (res?.dados !== "null") {
      setEvents(res?.dados);
      localStorage.setItem("eventsNum", res?.dados.length);
    } else {
      setEvents([]);
      localStorage.setItem("eventsNum", 0);
    }
  }

  async function fetchProjectsData() {
    const res = await getProjectPostByUser(userID);
    if (res.dados !== "null") {
      setProjects(res.dados);
      localStorage.setItem("projectsNum", res?.dados.length);
    } else {
      localStorage.setItem("projectsNum", 0);
    }
  }

  async function fetchFavsData() {
    const res = await getFavoritsPostByUser(userID);
    if (res.dados !== "null") {
      setFavs(res.dados);
      localStorage.setItem("favsNum", res?.dados.length);
    } else {
      localStorage.setItem("favsNum", 0);
    }
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

  const displayImage = (fullImage, minimizedImage, postType) => {
    const type = postType === "E" ? "eventos" : "projetos";
    return minimizedImage?.length > 0
      ? `${imgApiPath}/${type}Img/${type}ImgRecortada/${minimizedImage}`
      : `${imgApiPath}/${type}Img/${fullImage}`;
  };

  if (type === "event") {
    if (localStorage.getItem("eventsNum") === "0") {
      return !isVisitor ? (
        <Box
          mt="1rem"
          sx={{
            marginLeft: "0",
            marginRigth: "2rem",
          }}
          flexGrow={1}
        >
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
                onClick={() => {
                  navigate("/eventos/adicionar");
                }}
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
        </Box>
      ) : (
        <Typography>{displayNoPostByType()}</Typography>
      );
    } else {
      return (
        <Box
          mt="1rem"
          sx={{
            // marginLeft: "0",
            // marginRigth: "2rem",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            transformOrigin: "top left",
            transform: "scale(0.88)",
            minWidth: {
              xs: "0",
              sm: "0",
              md: "72rem",
              lg: "72rem",
              xl: "72rem",
            },
          }}
          flexGrow={1}
        >
          <Grid container spacing={3.8}>
            {events.length > 0 &&
              events.map((card, index) => (
                <Grid item key={index} lg={3.8} xs={12} md={3.8}>
                  <ProfileCustomCard
                    isVisitor={isVisitor}
                    key={index}
                    id={card.id}
                    name={card.nome}
                    likes={card.gostos}
                    visits={card.visitasPost}
                    picture={displayImage(
                      card?.imagem,
                      card?.imagem_recortada,
                      card.distincao
                    )}
                    publisherId={card.id_utilizador}
                    publisherName={card.nome_user}
                    publisherPhoto={
                      card.login_from === "google"
                        ? card.imgPerfil
                        : `${imgApiPath}/perfilImg/${card.imgPerfil}`
                    }
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
    if (localStorage.getItem("projectsNum") === "0") {
      return !isVisitor ? (
        <Box
          mt="1rem"
          sx={{
            marginLeft: "0",
            marginRigth: "2rem",
          }}
          flexGrow={1}
        >
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
                onClick={() => {
                  navigate("/projetos/adicionar");
                }}
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
        </Box>
      ) : (
        <Typography> {displayNoPostByType()}</Typography>
      );
    } else {
      return (
        <Box
          mt="1rem"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            transformOrigin: "top left",
            transform: "scale(0.88)",
            minWidth: {
              xs: "0",
              sm: "0",
              md: "72rem",
              lg: "72rem",
              xl: "72rem",
            },
          }}
          flexGrow={1}
        >
          <Grid container spacing={3.8}>
            {projects.length > 0 &&
              projects?.map((card, index) => (
                <Grid item key={index} lg={3.8} xs={12} md={3.8}>
                  <ProfileCustomCard
                    isVisitor={isVisitor}
                    key={index}
                    id={card.id}
                    name={card.nome}
                    likes={card.gostos}
                    visits={card.visitasPost}
                    picture={displayImage(
                      card?.imagem,
                      card?.imagem_recortada,
                      card.distincao
                    )}
                    publisherId={card.id_utilizador}
                    publisherName={card.nome_user}
                    publisherPhoto={
                      card.login_from === "google"
                        ? card.imgPerfil
                        : `${imgApiPath}/perfilImg/${card.imgPerfil}`
                    }
                    type={card.distincao}
                    onRefresh={handleRefresh}
                  />
                </Grid>
              ))}
          </Grid>
        </Box>
      );
    }
  } else if (type === "favs") {
    if (localStorage.getItem("favsNum") === "0") {
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
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          transformOrigin: "top left",
          transform: "scale(0.88)",
          minWidth: {
            xs: "0",
            sm: "0",
            md: "72rem",
            lg: "72rem",
            xl: "72rem",
          },
        }}
        flexGrow={1}
      >
        <Grid container spacing={3.8}>
          {favs.length > 0 &&
            favs?.map((card, index) => (
              <Grid item key={index} lg={3.8} xs={12} md={3}>
                <ProfileCustomCard
                  isVisitor={isVisitor}
                  key={index}
                  id={card.id}
                  name={card.nome}
                  likes={card.gostos}
                  visits={card.visitas}
                  picture={displayImage(
                    card?.imagem,
                    card?.imagem_recortada,
                    card.distincao
                  )}
                  publisherId={card.id_utilizador}
                  publisherName={card.nome_user}
                  publisherPhoto={
                    card.login_from === "google"
                      ? card.imgPerfil
                      : `${imgApiPath}/perfilImg/${card.imgPerfil}`
                  }
                  type={card.distincao}
                  onRefresh={handleRefresh}
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
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          transformOrigin: "top left",
          transform: "scale(0.88)",
          minWidth: {
            xs: "0",
            sm: "0",
            md: "72rem",
            lg: "72rem",
            xl: "72rem",
          },
        }}
        flexGrow={1}
      >
        <Grid container spacing={3.8}>
          {searchResults.length > 0 &&
            searchResults?.map((card, index) => (
              <Grid item key={index} lg={3.8} xs={12} md={3}>
                <ProfileCustomCard
                  isVisitor={isVisitor}
                  key={index}
                  id={card.id}
                  name={card.nome}
                  likes={card.gostos}
                  visits={card.visitas}
                  picture={displayImage(
                    card?.imagem,
                    card?.imagem_recortada,
                    card.distincao
                  )}
                  publisherId={card.id_utilizador}
                  publisherName={card.nome_user}
                  publisherPhoto={
                    card.login_from === "google"
                      ? card.imgPerfil
                      : `${imgApiPath}/perfilImg/${card.imgPerfil}`
                  }
                  type={card.distincao}
                  onRefresh={handleRefresh}
                />
              </Grid>
            ))}
        </Grid>
      </Box>
    );
  }
};

export default ListPublications;
