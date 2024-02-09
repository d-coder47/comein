import { Box, Grid } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import CustomCard from "./CustomCard";
import usePosts from "../hooks/usePosts";
import axiosInstance from "../api/axiosInstance";

import defaultImg from "../assets/img/event3.jpg";
import { useTranslation } from "react-i18next";
import { useIntersection } from "@mantine/hooks";
import { toast } from "react-toastify";
import { imgApiPath } from "../api/apiPath";

import useEvents from "../hooks/useEvents";
const Cards = ({
  searchQuery,
  culturalAreaId,
  localDateValues,
  displayHighlights,
  setIsLoading,
}) => {
  const { posts: allPosts, getPostsByPage, getHighlightPosts } = usePosts();
  const [posts, setPosts] = useState([]);

  const [refreshCount, setRefreshCount] = useState(0);

  const { t } = useTranslation();

  const { postScheduledEvents, getScheduledEvents } = useEvents();

  useEffect(() => {
    setPosts(posts);
  }, [allPosts]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getScheduledEvents();
        const scheduleds = res.dados;
        const currentDate = new Date();
        const ids = [];

        if (scheduleds && scheduleds.length > 0) {
          scheduleds.forEach((schedule) => {
            if (new Date(schedule.agendar) <= currentDate) {
              ids.push(schedule.id);
            }
          });

          if (ids.length > 0) {
            await postScheduledEvents(ids.join(","));
            setRefreshCount((prevCount) => prevCount + 1);
            getPostsByPage();
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const intervalId = setInterval(fetchData, 10000);

    fetchData();

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (
      (culturalAreaId === undefined || culturalAreaId === "") &&
      !displayHighlights &&
      !searchQuery &&
      !localDateValues
    )
      return setPosts(allPosts);
    const getPostsByArea = async () => {
      setIsLoading(true);
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
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
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

    const getHighlighs = async () => {
      setIsLoading(true);
      try {
        const res = await getHighlightPosts();

        setPosts(res.dados);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };
    getHighlighs();
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
      setIsLoading(true);
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
        setIsLoading(false);
        if (response.data.length === 0) {
          toast.error(t("userProfile.naoForamEncontradosResultados"));
          return setPosts([]);
        }
        setPosts(response.data.dados);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
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
      setIsLoading(true);
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
        setIsLoading(false);
        if (response.data.dados === "Não existem dados para retornar") {
          return setPosts([]);
        }
        setPosts(response.data.dados);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };
    searchPosts(searchQuery);
  }, [searchQuery]);

  const lastPostRef = useRef(null);

  const { ref, entry } = useIntersection({
    root: lastPostRef.current,
    threshold: 1,
  });

  useEffect(() => {
    if (!entry) return;
    if (entry?.isIntersecting) {
      getPostsByPage();
    }
  }, [entry]);

  const displayImage = (fullImage, minimizedImage, postType) => {
    const type = postType === "E" ? "eventos" : "projetos";
    return minimizedImage?.length > 0
      ? `${imgApiPath}/${type}Img/${type}ImgRecortada/${minimizedImage}`
      : fullImage?.length > 0
      ? `${imgApiPath}/${type}Img/${fullImage}`
      : defaultImg;
  };

  const postsToDisplay = posts?.map((card, index) => {
    return index === posts?.length - 1 ? (
      <Grid item key={index} lg={3.8} xs={12} md={3} ref={ref}>
        <CustomCard
          key={index}
          id={card.id}
          name={card.nome}
          likes={card.gostos}
          visits={card.visitasPost}
          picture={displayImage(
            card?.imagem,
            card?.imagem_recortada,
            card.distincao
          )}
          publisherId={card.id_utilizador}
          publisherName={card.nome_user}
          publisherPhoto={
            card.login_from === "google"
              ? card.imgPerfil
              : `${imgApiPath}/perfilImg/${card.imgPerfil}`
          }
          type={card.distincao}
        />
      </Grid>
    ) : (
      <Grid item key={index} lg={3.8} xs={12} md={3}>
        <CustomCard
          key={index}
          id={card.id}
          name={card.nome}
          likes={card.gostos}
          visits={card.visitasPost}
          picture={displayImage(
            card?.imagem,
            card?.imagem_recortada,
            card.distincao
          )}
          publisherId={card.id_utilizador}
          publisherName={card.nome_user}
          publisherPhoto={
            card.login_from === "google"
              ? card.imgPerfil
              : `${imgApiPath}/perfilImg/${card.imgPerfil}`
          }
          type={card.distincao}
        />
      </Grid>
    );
  });

  const allPostsToDisplay = allPosts?.map((card, index) => {
    return index === allPosts?.length - 1 ? (
      <Grid item key={index} lg={3.8} xs={12} md={3} ref={ref}>
        <CustomCard
          key={index}
          id={card.id}
          name={card.nome}
          likes={card.gostos}
          visits={card.visitasPost}
          picture={displayImage(
            card?.imagem,
            card?.imagem_recortada,
            card.distincao
          )}
          publisherId={card.id_utilizador}
          publisherName={card.nome_user}
          publisherPhoto={
            card.login_from === "google"
              ? card.imgPerfil
              : `${imgApiPath}/perfilImg/${card.imgPerfil}`
          }
          type={card.distincao}
        />
      </Grid>
    ) : (
      <Grid item key={index} lg={3.8} md={3} sm={12} xs={12}>
        <CustomCard
          key={index}
          id={card.id}
          name={card.nome}
          likes={card.gostos}
          visits={card.visitasPost}
          picture={displayImage(
            card?.imagem,
            card?.imagem_recortada,
            card.distincao
          )}
          publisherId={card.id_utilizador}
          publisherName={card.nome_user}
          publisherPhoto={
            card.login_from === "google"
              ? card.imgPerfil
              : `${imgApiPath}/perfilImg/${card.imgPerfil}`
          }
          type={card.distincao}
        />
      </Grid>
    );
  });

  return (
    <Box mt="1rem" mx="2rem" flexGrow={1}>
      <Grid
        container
        className="gridCardsContainer"
        gap={3.6}
        mb="2rem"
        sx={{
          display: "flex",
          alignItems: "center",

          justifyContent: "center",
        }}
      >
        {posts.length > 0 ? postsToDisplay : allPostsToDisplay}
      </Grid>
    </Box>
  );
};

export default Cards;
