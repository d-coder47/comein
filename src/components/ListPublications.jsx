import {
  Alert,
  AlertTitle,
  Box,
  Collapse,
  Grid,
  IconButton,
  CardActionArea,
  CardMedia,
  CardContent,
  Card,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import usePosts from "../hooks/usePosts";
import ProfileCustomCard from "./ProfileCustomCard";

import { useNavigate } from "react-router-dom";

const ListPublications = ({ userID, type, isVisitor }) => {
  const { getEventPostByUser, getProjectPostByUser, getFavoritsPostByUser } =
    usePosts();
  const [events, setEvents] = useState([]);
  const [projects, setProjects] = useState([]);
  const [favs, setFavs] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchEventsData() {
      const res = await getEventPostByUser(userID);
      if (typeof res.dados !== "string") {
        setEvents(res.dados);
      }
    }

    async function fetchProjectsData() {
      const res = await getProjectPostByUser(userID);
      if (typeof res.dados !== "string") {
        setProjects(res.dados);
      }
    }

    async function fetchFavsData() {
      const res = await getFavoritsPostByUser(userID);
      if (typeof res.dados !== "string") {
        setFavs(res.dados);
      }
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
                  picture={`https://comein.cv/comeincv_api_test/img/${
                    card.distincao === "E" ? "eventos" : "projetos"
                  }Img/${card.imagem}`}
                  publisherName={card.nome_user}
                  publisherPhoto={`https://comein.cv/comeincv_api_test/img/perfilImg/${card.imgPerfil}`}
                  type={card.distincao}
                />
              </Grid>
            ))}
        </Grid>
      </Box>
    );
  } else if (type === "project") {
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
                  picture={`https://comein.cv/comeincv_api_test/img/${
                    card.distincao === "E" ? "eventos" : "projetos"
                  }Img/${card.imagem}`}
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
      <Box mt="1rem" mx="2rem" flexGrow={1}>
        <Grid container spacing={3.8}>
          {favs.length > 0 &&
            favs?.map((card, index) => (
              <Grid item key={index} xs={3.8}>
                <ProfileCustomCard
                  key={index}
                  id={card.id}
                  name={card.nome}
                  picture={`https://comein.cv/comeincv_api_test/img/${
                    card.distincao === "E" ? "eventos" : "projetos"
                  }Img/${card.imagem}`}
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
