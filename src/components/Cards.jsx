import { Box, Grid } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import CustomCard from "./CustomCard";
import useEvents from "../hooks/useEvents";
import usePosts from "../hooks/usePosts";

const Cards = ({ culturalAreaId }) => {
  const { posts } = usePosts();
  // const [posts, setPosts] = useState(allPosts);

  // useEffect(() => {
  //   console.log(allPosts);
  //   setPosts(posts);
  // }, [allPosts]);

  // useEffect(() => {
  //   console.log(culturalAreaId);
  //   if (culturalAreaId === undefined || culturalAreaId === "")
  //     setPosts(allPosts);
  //   console.log(culturalAreaId);
  //   const getPostsByArea = async (culturalAreaId) => {
  //     try {
  //       const response = await axiosInstance.get(
  //         `/publicacoes/listar/${culturalAreaId}`,
  //         {
  //           headers: {
  //             "Content-Type": "application/x-www-form-urlencoded",
  //             // Authorization:
  //             //   "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MiwibmFtZSI6Imh1bWJlcnRvIG5hc2NpbWVudG8iLCJleHBpcmVzX2luIjoxNjc3OTMxODIzfQ.vJnAshie-1hUo_VVKK0QInFI4NpBmx5obuWzOauK4B8",
  //           },
  //         }
  //       );
  //       setPosts(response.data.dados);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };
  // }, [culturalAreaId]);

  return (
    <Box sx={{ margin: "2rem", flexGrow: 1 }}>
      <Grid container gap={2}>
        {posts?.map((card, index) => (
          <Grid item key={index} xs={2.25}>
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
        ))}
      </Grid>
    </Box>
  );
};

export default Cards;
