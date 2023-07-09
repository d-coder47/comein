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
  Button,
  Menu,
  MenuItem,
  Tooltip,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import usePosts from "../hooks/usePosts";
import ProfileCustomCard from "./ProfileCustomCard";

import AddIcon from "@mui/icons-material/Add";

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
        setProjects(res.dados);
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

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  if (type === "event") {
    return (
      <Box mt="1rem" mx="2rem" flexGrow={1}>
        <Box
          sx={{
            width: "60px",
            height: "60px",
            backgroundColor: "#33B3CC",
            position: "fixed",
            bottom: "25px",
            right: "20px",
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
          <Tooltip title="Adicionar">
            <Button onClick={handleClick}>
              <AddIcon
                sx={{
                  color: "#fff",
                  fontSize: "3.25rem",
                }}
              />
            </Button>
          </Tooltip>
        </Box>
        <Menu
          anchorEl={anchorEl}
          id="account-menu"
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          PaperProps={{
            elevation: 0,
            sx: {
              overflow: "visible",
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
              mt: 1.5,
              "& .MuiAvatar-root": {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              "&:before": {
                content: '""',
                display: "block",
                position: "absolute",
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: "background.paper",
                transform: "translateY(-50%) rotate(45deg)",
                zIndex: 0,
              },
            },
          }}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        >
          <MenuItem onClick={handleClose}>Adicionar Evento</MenuItem>
          <MenuItem onClick={handleClose}>Adicionar Projeto</MenuItem>
        </Menu>
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
