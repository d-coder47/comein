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

import { Navigation, A11y } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";

const Categories = ({ onCategoryChange }) => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const { t } = useTranslation();

  const categories = [
    { id: 1, name: t("categories.music"), icon: musicSVG },
    { id: 2, name: t("categories.theater"), icon: theaterSVG },
    { id: 3, name: t("categories.dance"), icon: danceSVG },
    { id: 4, name: t("categories.movieTheater"), icon: movieTheaterSVG },
    { id: 5, name: t("categories.standUp"), icon: standUpSVG },
    { id: 6, name: t("categories.visualArts"), icon: visualArtsSVG },
    { id: 7, name: t("categories.sculpture"), icon: sculptureSVG },
    { id: 8, name: t("categories.craftsmanship"), icon: craftsmanshipSVG },
    { id: 9, name: t("categories.design"), icon: designSVG },
    { id: 10, name: t("categories.photography"), icon: photographySVG },
    { id: 11, name: t("categories.urbanArt"), icon: urbanArtSVG },
    { id: 12, name: t("categories.literature"), icon: literatureSVG },
    { id: 13, name: t("categories.gastronomy"), icon: gastronomySVG },
    { id: 14, name: t("categories.fashion"), icon: fashionSVG },
    {
      id: 15,
      name: t("categories.traditionalParties"),
      icon: traditionalPartiesSVG,
    },
    { id: 16, name: t("categories.carnaval"), icon: carnavalSVG },
  ];

  const handleCategoryClick = (categoryId, categoryName) => {
    if (selectedCategory === categoryName) {
      onCategoryChange("");
      return setSelectedCategory("");
    }
    setSelectedCategory(categoryName);
    onCategoryChange(categoryId);
  };

  return (
    <Box gap="3rem" mt="1rem" mx="2rem">
      <Swiper
        modules={[Navigation, A11y]}
        spaceBetween={0}
        slidesPerView={13}
        navigation
        scrollbar={{ draggable: false }}
      >
        {categories.map((category, index) => {
          return (
            <SwiperSlide key={index}>
              <Category
                id={category.id}
                name={category.name}
                icon={category.icon}
                onCategoryClick={handleCategoryClick}
                isSelected={category.name === selectedCategory}
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </Box>
  );
};

export default Categories;
