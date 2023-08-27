import { Box, Grid } from "@mui/material";
import React, { useState } from "react";

import ProfileCustomCard from "./ProfileCustomCard";

const ListSearchedPublications = ({ isVisitor, posts }) => {
  const [refreshCount, setRefreshCount] = useState(0);
  const handleRefresh = () => {
    setRefreshCount((prevCount) => prevCount + 1);
  };

  console.log("posts =>", posts);

  return (
    <Box mt="1rem" mx="2rem" flexGrow={1}>
      <Grid container spacing={3.8}>
        {posts.length > 0 &&
          posts?.map((card, index) => (
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
};

export default ListSearchedPublications;
