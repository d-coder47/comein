import React, { useState, useEffect } from "react";
import { Box, Typography, useMediaQuery } from "@mui/material";
import { useTranslation } from "react-i18next";

import { Navigation, A11y } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";

import "./highlights.css";

import HighlightsCustomCard from "./HighlightsCustomCard";
import { imgApiPath } from "../api/apiPath";

import usePosts from "../hooks/usePosts";

const Highlights = () => {
  const { t } = useTranslation();
  const [refreshCount, setRefreshCount] = useState(0);

  const { getHighlightPosts } = usePosts();

  const isMobileScreen = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  const getNumberOfSlidesPerView = () => {
    if (isMobileScreen) {
      return 1;
    } else if (highlights.length < 5) {
      return highlights.length;
    } else {
      return 5;
    }
  };

  const [highlights, setHighlights] = useState();

  useEffect(() => {
    const fechData = async () => {
      const res = await getHighlightPosts();

      if (res.dados.includes("Não existem dados para retornar")) {
        return setHighlights([]);
      }
      setHighlights(res.dados);
    };

    fechData();
  }, []);

  const handleRefresh = () => {
    setRefreshCount((prevCount) => prevCount + 1);
  };

  if (highlights.length > 0) {
    return (
      <Box
        sx={{
          background: "#f5f8ff",
          padding: "2rem 0 2rem 0",
          zIndex: "0",
          maxHeight: "270px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: isMobileScreen ? "column" : "row",
            justifyContent: "space-between",
            paddingLeft: "2rem",
            paddingRight: "2rem",
          }}
        >
          <Box
            sx={{
              maxWidth: isMobileScreen ? "100%" : "15%",
              minWidth: isMobileScreen ? "100%" : "15%",
              marginRight: "2.5rem",
            }}
          >
            <Typography
              variant="subtitle1"
              gutterBottom
              fontWeight="bold"
              color="black"
            >
              {t("homepage.highlightsPosts")}
            </Typography>

            {!isMobileScreen && (
              <Typography variant="body2" gutterBottom align="justify">
                {t("homepage.highlightsAreaDescription")}
              </Typography>
            )}
          </Box>
          <Box
            gap="3rem"
            mt="1rem"
            mx="2rem"
            sx={{
              minWidth: "70%",
              height: "100%",
            }}
          >
            <Swiper
              className="swipper-container"
              modules={[Navigation, A11y]}
              spaceBetween={26}
              slidesPerView={getNumberOfSlidesPerView()}
              navigation
              loop
              scrollbar={{ draggable: false }}
            >
              {highlights?.map((post, index) => {
                return (
                  <SwiperSlide
                    key={index}
                    style={{
                      maxWidth: "20rem",
                    }}
                  >
                    <HighlightsCustomCard
                      key={index}
                      id={post.id}
                      name={post.nome}
                      likes={post.gostos}
                      visits={post.visitasPost}
                      picture={`${imgApiPath}/${
                        post.distincao === "E" ? "eventos" : "projetos"
                      }Img/${post.imagem}`}
                      publisherId={post.id_utilizador}
                      publisherName={post.nome_user}
                      publisherPhoto={
                        post.login_from === "google"
                          ? post.imgPerfil
                          : `${imgApiPath}/perfilImg/${post.imgPerfil}`
                      }
                      type={post.distincao}
                      onRefresh={handleRefresh}
                    />
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </Box>
        </Box>
      </Box>
    );
  } else {
    return null;
  }
};

export default Highlights;
