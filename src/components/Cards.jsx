import { Box, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import CustomCard from "./CustomCard";
import usePosts from "../hooks/usePosts";
import axiosInstance from "../api/axiosInstance";

const Cards = ({ culturalAreaId }) => {
  const { posts: allPosts } = usePosts();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    setPosts(posts);
  }, [allPosts]);

  useEffect(() => {
    if (culturalAreaId === undefined || culturalAreaId === "")
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

  return (
    <Box sx={{ margin: "2rem", flexGrow: 1 }}>
      <Grid container gap={3.8}>
        {posts.length > 0
          ? posts?.map((card, index) => (
              <Grid item key={index} xs={3.8}>
                <CustomCard
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
                  publisherName={card.nome_user}
                  publisherPhoto={`https://comein.cv/comeincv_api_test/img/perfilImg/${card.imgPerfil}`}
                  type={card.distincao}
                />
              </Grid>
            ))}
      </Grid>
    </Box>
  );
};

export default Cards;
