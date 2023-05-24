import React, { useState } from "react";
import { Box } from "@mui/material";
import Category from "./Category";
import { useTranslation } from "react-i18next";

import urbanArtSVG from "../assets/svg/arte_urbana.svg";
import visualArtsSVG from "../assets/svg/artes_plastica.svg";
import craftsmanshipSVG from "../assets/svg/artesanato.svg";
import carnavalSVG from "../assets/svg/carnaval.svg";
import movieTheaterSVG from "../assets/svg/cinema.svg";
import danceSVG from "../assets/svg/danca.svg";
import designSVG from "../assets/svg/design.svg";
import sculptureSVG from "../assets/svg/escultura.svg";
import photographySVG from "../assets/svg/fotografia.svg";
import traditionalPartiesSVG from "../assets/svg/festas_tradicionais.svg";
import gastronomySVG from "../assets/svg/gastronomia.svg";
import literatureSVG from "../assets/svg/literatura.svg";
import fashionSVG from "../assets/svg/moda.svg";
import musicSVG from "../assets/svg/musica.svg";
import standUpSVG from "../assets/svg/stand_up.svg";
import theaterSVG from "../assets/svg/teatro.svg";

const Categories = () => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const { t } = useTranslation();

  const categories = [
    { name: t("categories.music"), icon: musicSVG },
    { name: t("categories.theater"), icon: theaterSVG },
    { name: t("categories.dance"), icon: danceSVG },
    { name: t("categories.movieTheater"), icon: movieTheaterSVG },
    { name: t("categories.standUp"), icon: standUpSVG },
    { name: t("categories.visualArts"), icon: visualArtsSVG },
    { name: t("categories.sculpture"), icon: sculptureSVG },
    { name: t("categories.craftsmanship"), icon: craftsmanshipSVG },
    { name: t("categories.design"), icon: designSVG },
    { name: t("categories.photography"), icon: photographySVG },
    { name: t("categories.urbanArt"), icon: urbanArtSVG },
    { name: t("categories.literature"), icon: literatureSVG },
    { name: t("categories.gastronomy"), icon: gastronomySVG },
    { name: t("categories.fashion"), icon: fashionSVG },
    { name: t("categories.traditionalParties"), icon: traditionalPartiesSVG },
    { name: t("categories.carnaval"), icon: carnavalSVG },
  ];

  const handleCategoryClick = (categoryName) => {
    setSelectedCategory(categoryName);
  };

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
          <Category
            key={index}
            name={category.name}
            icon={category.icon}
            onCategoryClick={handleCategoryClick}
            isSelected={category.name === selectedCategory}
          />
        );
      })}
    </Box>
  );
};

export default Categories;
