import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

import { Navigation, A11y } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";

import ProfileCustomCard from "./ProfileCustomCard";

const Highlights = () => {
  const { t } = useTranslation();
  const [refreshCount, setRefreshCount] = useState(0);

  const posts = [
    {
      id: 115,
      nome: "Ruby teste",
      tipo: "P",
      data_inicio: "2023-09-14 20:41:00",
      data_fim: "2023-09-14 20:41:00",
      descricao: "<p>Ruby teste</p>",
      id_utilizador: "370",
      nome_user: "Ruben Teste",
      data_criacao: "2023-09-01 18:42:10",
      id_geografia: "0",
      localEvento: "MUNDO",
      imagem: "EbGvANpUEAAi0g_-64f25ab2b3994.jpg",
      distincao: "E",
      imgPerfil: "4a061471b589a4b6fd9bd70f19a6349e-648f96556dff7.jpg",
      visitas: "10",
      gostos: "0",
      visitasPost: "0",
    },
    {
      id: "106",
      nome: "ruby test",
      tipo: "P",
      data_inicio: "2023-07-17 20:00:00",
      data_fim: "1900-01-01 23:59:59",
      descricao: "<p>ruby test</p>",
      id_utilizador: "370",
      nome_user: "Ruben Teste",
      data_criacao: "2023-07-26 19:28:06",
      id_geografia: "0",
      localEvento: "MUNDO",
      imagem: "",
      distincao: "E",
      imgPerfil: "4a061471b589a4b6fd9bd70f19a6349e-648f96556dff7.jpg",
      visitas: "10",
      gostos: "0",
      visitasPost: "6",
    },
    {
      id: "89",
      nome: "Ruben Test",
      tipo: "P",
      data_inicio: "2023-07-11 17:00:00",
      data_fim: "2023-07-11 18:00:00",
      descricao: "",
      id_utilizador: "370",
      nome_user: "Ruben Teste",
      data_criacao: "2023-07-11 17:18:41",
      id_geografia: "0",
      localEvento: "MUNDO",
      imagem: "",
      distincao: "E",
      imgPerfil: "4a061471b589a4b6fd9bd70f19a6349e-648f96556dff7.jpg",
      visitas: "10",
      gostos: "0",
      visitasPost: "2",
    },
    {
      id: "17",
      nome: "Stand up comedy",
      tipo: "P",
      data_inicio: "2023-01-27 18:00:00",
      data_fim: "2023-01-27 20:00:00",
      descricao: " Um show pa primero vez na UNICV",
      id_utilizador: "370",
      nome_user: "Ruben Teste",
      data_criacao: "2023-01-21 14:22:36",
      id_geografia: "238103001016008",
      localEvento: "PRAIA",
      imagem: "FB_IMG_1673446259214-63cbf52cba978.jpg",
      distincao: "E",
      imgPerfil: "4a061471b589a4b6fd9bd70f19a6349e-648f96556dff7.jpg",
      visitas: "10",
      gostos: "2",
      visitasPost: "21",
    },
    {
      id: "15",
      nome: "Interlunium",
      tipo: "P",
      data_inicio: "2023-01-19 23:59:59",
      data_fim: "1900-01-01 23:59:59",
      descricao:
        "Este interlunium que a intuição tem guiado, aparentemente uma sincope na ausência do caleidoscópio urbano. \r\nOs impulsos redesenham em sismos de uma memória que vislumbrada distante -  atropela correntezas do espelho temporal em golpes.\r\n\r\nExperimentos, combinações sem horizontes estáveis, por vezes quase deambulante. \r\nRevisitar práticas longínquas, vestuários de narrativas e materialidades visualizadas nos meandros dos anos 90, onde realmente deu a aurora deste possível presente.\r\n\r\n\r\n\r\nPessoalmente gosto dos estágios voluptuosos que a prática criativa proporciona, quando o pensamento desencarna, desativa da constância latente objetual.\r\n\r\nDevo dizer que esses desenhos são combinações adversativas de sinuosos e noturnos dias, quando o íntimo revela em  lampejos.\r\n",
      id_utilizador: "370",
      nome_user: "Ruben Teste",
      data_criacao: "2023-01-20 20:16:02",
      id_geografia: "238201001001",
      localEvento: "CIDADE DO MINDELO",
      imagem: "FB_IMG_1674246026568-63caf682b3986.jpg",
      distincao: "E",
      imgPerfil: "4a061471b589a4b6fd9bd70f19a6349e-648f96556dff7.jpg",
      visitas: "10",
      gostos: "1",
      visitasPost: "1",
    },
    {
      id: "14",
      nome: "Ocean Race ",
      tipo: "P",
      data_inicio: "2023-01-20 23:59:59",
      data_fim: "2023-01-25 23:59:59",
      descricao: " ",
      id_utilizador: "370",
      nome_user: "Ruben Teste",
      data_criacao: "2023-01-20 17:24:04",
      id_geografia: "238201001001",
      localEvento: "CIDADE DO MINDELO",
      imagem:
        "272173416_100725119188206_1203735904826957777_n-63cace3463ccb.jpg",
      distincao: "E",
      imgPerfil: "4a061471b589a4b6fd9bd70f19a6349e-648f96556dff7.jpg",
      visitas: "10",
      gostos: "5",
      visitasPost: "1",
    },
    {
      id: "13",
      nome: "Desfile de Mandinga R. Bote",
      tipo: "P",
      data_inicio: "2023-01-15 23:59:59",
      data_fim: "2023-02-26 23:59:59",
      descricao: " Todos os domingos ",
      id_utilizador: "370",
      nome_user: "Ruben Teste",
      data_criacao: "2023-01-18 20:51:49",
      id_geografia: "238201001001",
      localEvento: "CIDADE DO MINDELO",
      imagem: "_DSC0925-63d3f72d0cfb4.jpg",
      distincao: "E",
      imgPerfil: "4a061471b589a4b6fd9bd70f19a6349e-648f96556dff7.jpg",
      visitas: "10",
      gostos: "2",
      visitasPost: "1",
    },
  ];

  const handleRefresh = () => {
    setRefreshCount((prevCount) => prevCount + 1);
  };

  return (
    <Box
      sx={{
        background: "#f5f8ff",
        padding: "2rem 0 2rem 0",
        zIndex: "0",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",

          paddingLeft: "2rem",
          paddingRight: "2rem",
        }}
      >
        <Box
          sx={{
            width: "100%",
            marginRight: "2.5rem",
          }}
        >
          <Typography
            variant="subtitle1"
            gutterBottom
            fontWeight="bold"
            color="black"
          >
            Eventos e projetos em destaque
          </Typography>

          <Typography variant="body2" gutterBottom align="justify">
            Explore uma riqueza de criatividade e expressão cultural nesta
            seção. De eventos empolgantes a projetos inspiradores, e histórias
            cativantes, mergulhe na vibrante cena cultural que nossos
            utilizadores têm a oferecer.
          </Typography>
        </Box>
        <Box
          gap="3rem"
          sx={{
            maxWidth: "70%",
            height: "100%",
          }}
        >
          <Swiper
            modules={[Navigation, A11y]}
            spaceBetween={26}
            slidesPerView={3}
            navigation
            loop
            scrollbar={{ draggable: false }}
          >
            {posts.map((post, index) => {
              return (
                <SwiperSlide key={index}>
                  <ProfileCustomCard
                    isVisitor={false}
                    key={index}
                    id={post.id}
                    name={post.nome}
                    likes={post.gostos}
                    visits={post.visitasPost}
                    picture={`https://comein.cv/comeincv_api_test/img/${
                      post.distincao === "E" ? "eventos" : "projetos"
                    }Img/${post.imagem}`}
                    publisherId={post.id_utilizador}
                    publisherName={post.nome_user}
                    publisherPhoto={`https://comein.cv/comeincv_api_test/img/perfilImg/${post.imgPerfil}`}
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
};

export default Highlights;
