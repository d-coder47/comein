import {
  Alert,
  AlertTitle,
  Box,
  Collapse,
  Grid,
  IconButton,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import CustomCard from "./CustomCard";
import usePosts from "../hooks/usePosts";
import axiosInstance from "../api/axiosInstance";
import CloseIcon from "@mui/icons-material/Close";

const Cards = ({
  searchQuery,
  culturalAreaId,
  localDateValues,
  displayHighlights,
}) => {
  const { posts: allPosts } = usePosts();
  const [posts, setPosts] = useState([]);
  const [emptyResult, setEmptyResult] = useState(false);

  useEffect(() => {
    setPosts(posts);
  }, [allPosts]);

  useEffect(() => {
    if (
      (culturalAreaId === undefined || culturalAreaId === "") &&
      !displayHighlights &&
      !searchQuery &&
      !localDateValues
    )
      return setPosts(allPosts);
    const getPostsByArea = async () => {
      try {
        const response = await axiosInstance.get(
          `/publicacoes/listar/${culturalAreaId}`,
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
              // Authorization:
              //   "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MiwibmFtZSI6Imh1bWJlcnRvIG5hc2NpbWVudG8iLCJleHBpcmVzX2luIjoxNjc3OTMxODIzfQ.vJnAshie-1hUo_VVKK0QInFI4NpBmx5obuWzOauK4B8",
            },
          }
        );
        if (response.data.dados === "null") return setPosts(allPosts);
        setPosts(response.data.dados);
      } catch (error) {
        console.error(error);
      }
    };
    getPostsByArea();
  }, [culturalAreaId]);

  useEffect(() => {
    if (
      (culturalAreaId === undefined || culturalAreaId === "") &&
      !displayHighlights &&
      !searchQuery &&
      !localDateValues
    )
      return setPosts(allPosts);

    const getHighlightPosts = async () => {
      try {
        const response = await axiosInstance.get(`/publicacoes/destaques`, {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            // Authorization:
            //   "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MiwibmFtZSI6Imh1bWJlcnRvIG5hc2NpbWVudG8iLCJleHBpcmVzX2luIjoxNjc3OTMxODIzfQ.vJnAshie-1hUo_VVKK0QInFI4NpBmx5obuWzOauK4B8",
          },
        });
        setPosts(response.data.dados);
      } catch (error) {
        console.error(error);
      }
    };
    getHighlightPosts();
  }, [displayHighlights]);

  useEffect(() => {
    if (
      (culturalAreaId === undefined || culturalAreaId === "") &&
      !displayHighlights &&
      !searchQuery &&
      !localDateValues
    )
      return setPosts(allPosts);

    const searchByLocalAndDate = async () => {
      try {
        const response = await axiosInstance.get(
          `/publicacoes/pesquisaDataLocal/${localDateValues}`,
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
              // Authorization:
              //   "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MiwibmFtZSI6Imh1bWJlcnRvIG5hc2NpbWVudG8iLCJleHBpcmVzX2luIjoxNjc3OTMxODIzfQ.vJnAshie-1hUo_VVKK0QInFI4NpBmx5obuWzOauK4B8",
            },
          }
        );
        if (response.data.length === 0) {
          setEmptyResult(true);
          return setPosts([]);
        }
        console.log("here");
        return setPosts(response.data.dados);
      } catch (error) {
        console.error(error);
      }
    };
    searchByLocalAndDate();
  }, [localDateValues]);

  useEffect(() => {
    if (
      (culturalAreaId === undefined || culturalAreaId === "") &&
      !displayHighlights &&
      !searchQuery &&
      !localDateValues
    )
      return setPosts(allPosts);
    const searchPosts = async (search) => {
      try {
        const response = await axiosInstance.get(
          `/publicacoes/pesquisaInput/${search}`,
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
              // Authorization:
              //   "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MiwibmFtZSI6Imh1bWJlcnRvIG5hc2NpbWVudG8iLCJleHBpcmVzX2luIjoxNjc3OTMxODIzfQ.vJnAshie-1hUo_VVKK0QInFI4NpBmx5obuWzOauK4B8",
            },
          }
        );
        if (response.data.dados === "Não existem dados para retornar") {
          return setPosts([]);
        }
        setPosts(response.data.dados);
      } catch (error) {
        console.error(error);
      }
    };
    searchPosts(searchQuery);
  }, [searchQuery]);
  console.log({ searchQuery });
  return (
    <Box mt="1rem" mx="2rem" flexGrow={1}>
      <Grid container gap={3.8}>
        {posts.length > 0
          ? posts?.map((card, index) => (
              <Grid item key={index} xs={3.8}>
                <CustomCard
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
            ))
          : allPosts?.map((card, index) => (
              <Grid item key={index} xs={3.8}>
                <CustomCard
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
        <Grid
          sx={{
            position: "fixed",
            top: "20px", // Adjust the top position as needed
            left: "20px", // Adjust the left position as needed
            zIndex: 9999, // Ensure the alert is above other elements
          }}
        >
          <Collapse in={emptyResult}>
            <Alert
              severity="error"
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => {
                    setEmptyResult(false);
                  }}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
              sx={{ mb: 2 }}
            >
              <AlertTitle>
                <strong>
                  {"Não foram encontrados resultados pela pesquisa."}
                </strong>
              </AlertTitle>
            </Alert>
          </Collapse>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Cards;
