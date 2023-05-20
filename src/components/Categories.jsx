import React from "react";
import { Box } from "@mui/material";
import Category from "./Category";

const CATEGORIES = [
  "Música",
  "Teatro",
  "Dança",
  "Stand Up",
  "Artes Plásticas",
  "Escultura",
  "Artesanato",
  "Design",
  "Fotografia",
  "Arte Urbana",
  "Literatura",
  "Gastronomia",
  "Moda",
  "Festas de Romaria",
  "Carnaval",
  "Carnaval",
  "Carnaval",
  "Carnaval",
  "Carnaval",
  "Carnaval",
  "Carnaval",
  "Carnaval",
  "Carnaval",
  "Carnaval",
  "Carnaval",
  "Carnaval",
  "Carnaval",
  "Carnaval",
  "Carnaval",
];

const Categories = () => {
  return (
    <Box
      sx={{
        margin: "1rem 2rem",
        overflowX: "auto",
        scrollbarWidth: "none",
        paddingBottom: "1rem",
        display: "flex",
        alignItems: "center",
        gap: "3rem",
      }}
    >
      {CATEGORIES.map((category, index) => {
        return <Category key={index} name={category} />;
      })}
    </Box>
  );
};

export default Categories;
