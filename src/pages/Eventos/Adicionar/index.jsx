import React, { useEffect, useState } from "react";
import NavBar from "../../../components/NavBar";
import { Avatar, Box, Tooltip, Typography } from "@mui/material";
import img from "../../../assets/img/event3.jpg";
import {
  CalendarMonth,
  LocationOn,
  FiberManualRecord as Dot,
  Save,
} from "@mui/icons-material";
import Publisher from "../../../components/Publisher";

import ReactQuill from "react-quill";
import Parser from "html-react-parser";

import "react-quill/dist/quill.snow.css";
import "react-quill/dist/quill.bubble.css";

const Adicionar = () => {
  const [user, setUser] = useState(null);
  const [value, setValue] = useState(
    '<p><span class="ql-size-large">Adicione tudo sobre o seu evento</span></p><p><span class="ql-size-large">Faça duplo clique para personalizar</span></p>'
  );

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (!userInfo) return;
    setUser(userInfo);
  }, []);

  if (!user) return <div>Loading</div>;

  return (
    <>
      <NavBar />
      <Box
        id="wrapper"
        sx={{
          width: "100%",
          height: "100%",
          // backgroundColor: "rgba(0,0,0,.3)",
        }}
      >
        <Box
          id="add-content"
          sx={{
            margin: "0 0 0 4rem",
            backgroundColor: "transparent",
            outline: "none",
            height: "100vh",
            overflowY: "auto",
            display: "flex",
            justifyContent: "center",
            gap: "1.5rem",
          }}
        >
          <Box
            id="sections-wrapper"
            display="flex"
            flexDirection="column"
            gap="0.5rem"
          >
            <Box
              id="detailed-header"
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "1rem",
                height: "14%",
              }}
            >
              <Avatar
                src={`https://comein.cv/comeincv_api_test/img/perfilImg/${user?.img_perfil}`}
                alt="Foto de Perfil"
                sx={{ marginTop: ".75rem" }}
              />
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  marginTop: ".75rem",
                }}
              >
                <Typography fontWeight="bold">NOME</Typography>
                <Box
                  sx={{ display: "flex", gap: ".25rem", alignItems: "center" }}
                >
                  <Publisher publishers={[user]} />
                  <Dot sx={{ fontSize: ".5rem" }} />
                  <Typography
                    sx={{
                      "&:hover": {
                        cursor: "pointer",
                        textDecoration: "underline",
                      },
                    }}
                  >
                    Adicionar proprietário
                  </Typography>
                </Box>
              </Box>
            </Box>
            <Box sx={{ backgroundColor: "white" }}>
              <Avatar
                src={img}
                alt={`Adicionar imagem`}
                variant="square"
                sx={{ width: "100%", height: "auto" }}
              />
            </Box>
            <ReactQuill
              theme="bubble"
              modules={editorModules}
              formats={editorFormats}
              value={value}
              onChange={setValue}
            />
          </Box>
          <Box
            id="interactions"
            display="flex"
            flexDirection="column"
            gap="1.5rem"
            marginTop="14%"
            mr={".5rem"}
          >
            <Tooltip title={"Adicionar local"} placement="left" arrow>
              <Box
                id="location"
                sx={{
                  borderRadius: "50%",
                  height: "3rem",
                  width: "3rem",
                  backgroundColor: "#3c3c3c",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                }}
              >
                <LocationOn
                  color="white"
                  sx={{
                    width: "1.25rem",
                    height: "1.25rem",
                    color: "white",
                  }}
                />
              </Box>
            </Tooltip>

            <Tooltip title={"Adicionar data"} placement="left" arrow>
              <Box
                id="date"
                sx={{
                  borderRadius: "50%",
                  height: "3rem",
                  width: "3rem",
                  backgroundColor: () => "#3c3c3c",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  "&:hover": {
                    opacity: 0.8,
                  },
                }}
              >
                <CalendarMonth
                  sx={{ color: "white", width: "1rem", height: "1rem" }}
                />
              </Box>
            </Tooltip>
            <Tooltip title={"Guardar evento"} placement="left" arrow>
              <Box
                id="save"
                sx={{
                  borderRadius: "50%",
                  height: "3rem",
                  width: "3rem",
                  backgroundColor: () => "#3c3c3c",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  "&:hover": {
                    opacity: 0.8,
                  },
                }}
              >
                <Save sx={{ color: "white", width: "1rem", height: "1rem" }} />
              </Box>
            </Tooltip>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Adicionar;

const editorModules = {
  toolbar: [
    [{ size: [] }],
    [{ align: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image", "video"],
  ],
  clipboard: {
    matchVisual: false,
  },
};

const editorFormats = [
  "font",
  "size",
  "align",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "video",
];
