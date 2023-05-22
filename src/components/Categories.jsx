import React from "react";
import { Box } from "@mui/material";
import Category from "./Category";
import { categories } from "../data/Categories";

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
      {categories.map((category, index) => {
        return (
          <Category key={index} name={category.name} icon={category.icon} />
        );
      })}
    </Box>
  );
};

export default Categories;
