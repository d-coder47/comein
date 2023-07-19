import React, { useEffect, useState } from "react";
import NavBar from "../../../components/NavBar";
import {
  Autocomplete,
  Avatar,
  Box,
  Checkbox,
  Input,
  Modal,
  Popover,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import img from "../../../assets/img/upload.png";
import {
  CalendarMonth,
  LocationOn,
  FiberManualRecord as Dot,
  Save,
  Add,
  CheckBoxOutlineBlank,
  CheckBox,
  MoreHoriz,
  Handshake,
} from "@mui/icons-material";
import Publisher from "../../../components/Publisher";

import ReactQuill from "react-quill";
import Parser from "html-react-parser";

import "react-quill/dist/quill.snow.css";
import "react-quill/dist/quill.bubble.css";
import CustomizedAutoComplete from "../../../components/CustomizedAutoComplete";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../../api/axiosInstance";
import useRegisterUser from "../../../hooks/useRegisterUser";
import { useTranslation } from "react-i18next";

const Editar = () => {
  const [user, setUser] = useState(null);
  const [anchorLocationEl, setAnchorLocationEl] = useState(null);
  const [anchorDateEl, setAnchorDateEl] = useState(null);
  const [anchorCulturalAreaEl, setAnchorCulturalAreaEl] = useState(null);
  const [anchorAssociateEventEl, setAnchorAssociateEventEl] = useState(null);
  const [fieldValues, setFieldValues] = useState({
    nome: "",
    data_inicio: "",
    data_fim: "",
    imagem: null,
    descricao:
      '<p><span class="ql-size-large">Adicione tudo sobre o seu projeto</span></p><p><span class="ql-size-large">Faça duplo clique para personalizar</span></p>',
    local: { id: 0, nome: "" },
    proprietarios: [],
    areasCulturais: [],
    assoc_evento: [],
  });
  const [users, setUsers] = useState([]);
  const [events, setEvents] = useState([]);
  const [addresses, setAddresses] = useState([]);

  const params = useParams();
  const { id } = params;

  const navigate = useNavigate();

  const { getAddresses } = useRegisterUser();

  const { t } = useTranslation();

  const categories = [
    { id: 1, name: t("categories.music") },
    { id: 2, name: t("categories.theater") },
    { id: 3, name: t("categories.dance") },
    { id: 4, name: t("categories.movieTheater") },
    { id: 5, name: t("categories.standUp") },
    { id: 6, name: t("categories.visualArts") },
    { id: 7, name: t("categories.sculpture") },
    { id: 8, name: t("categories.craftsmanship") },
    { id: 9, name: t("categories.design") },
    { id: 10, name: t("categories.photography") },
    { id: 11, name: t("categories.urbanArt") },
    { id: 12, name: t("categories.literature") },
    { id: 13, name: t("categories.gastronomy") },
    { id: 14, name: t("categories.fashion") },
    {
      id: 15,
      name: t("categories.traditionalParties"),
    },
    { id: 16, name: t("categories.carnaval") },
  ];

  const handleLocationClick = (event) => {
    setAnchorLocationEl(event.currentTarget);
  };

  const handleDateClick = (event) => {
    setAnchorDateEl(event.currentTarget);
  };

  const handleCulturalAreaClick = (event) => {
    setAnchorCulturalAreaEl(event.currentTarget);
  };

  const handleAssociateEventClick = (event) => {
    setAnchorAssociateEventEl(event.currentTarget);
  };

  const handleChangeFieldValues = (key, value) => {
    setFieldValues((prev) => {
      return { ...prev, [key]: value };
    });
  };

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (!userInfo) return navigate("/");
    setUser(userInfo);

    const getUsers = async () => {
      try {
        const response = await axiosInstance.get(
          `/utilizadores/obterUtilizadores`,
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
              // Authorization: `Bearer ${token}`,
            },
          }
        );

        setUsers(response.data.dados || []);
      } catch (error) {
        console.error(error);
        setUsers([]);
      }
    };

    const getEvents = async () => {
      try {
        const response = await axiosInstance.get(`/eventos/listar`, {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            // Authorization:
            //   "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MiwibmFtZSI6Imh1bWJlcnRvIG5hc2NpbWVudG8iLCJleHBpcmVzX2luIjoxNjc3OTMxODIzfQ.vJnAshie-1hUo_VVKK0QInFI4NpBmx5obuWzOauK4B8",
          },
        });
        setEvents(response.data.dados);
      } catch (error) {
        console.error(error);
      }
    };

    getUsers();
    getEvents();
  }, []);

  useEffect(() => {
    if (!id) return;
    const getProjectDetails = async () => {
      try {
        const response = await axiosInstance.get(`/projetos/listar/${id}`, {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            // Authorization:
            //   "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MiwibmFtZSI6Imh1bWJlcnRvIG5hc2NpbWVudG8iLCJleHBpcmVzX2luIjoxNjc3OTMxODIzfQ.vJnAshie-1hUo_VVKK0QInFI4NpBmx5obuWzOauK4B8",
          },
        });
        console.log(response.data.dados);
        if (!response.data.dados) return;
        const data = response.data.dados;
        const proprietarios = response.data.utilizador;
        proprietarios.shift();
        const assoc_evento = response.data.evento_assoc;

        setFieldValues({
          id,
          nome: data.nome,
          data_inicio: data.data_inicio,
          data_fim: data.data_fim,
          imagem: `https://comein.cv/comeincv_api_test/img/projetosImg/${data.imagem}`,
          descricao: data.descricao,
          local: {
            id: "238103001008004",
            nome: "CHÃ DE MINDELO",
            nacionalidade: "CABOVERDIANA",
          },
          id_utilizador: data.id_utilizador,
          proprietarios,
          areasCulturais: [
            { id: 4, name: t("categories.movieTheater") },
            { id: 5, name: t("categories.standUp") },
          ],
          assoc_evento,
        });
      } catch (error) {
        console.log(error);
      }
    };
    getProjectDetails();
  }, [id]);

  const openLocationPopover = Boolean(anchorLocationEl);
  const locationPopoverId = open ? "location-popover" : undefined;

  const openDatePopover = Boolean(anchorDateEl);
  const datePopoverId = open ? "date-popover" : undefined;

  const openCulturalAreaPopover = Boolean(anchorCulturalAreaEl);
  const culturalAreaPopoverId = open ? "culturalArea-popover" : undefined;

  const openAssociateEventPopover = Boolean(anchorAssociateEventEl);
  const associateEventPopoverId = open ? "associateEvent-popover" : undefined;

  const icon = <CheckBoxOutlineBlank fontSize="small" />;
  const checkedIcon = <CheckBox fontSize="small" />;

  const handlePhotoUpload = async (event) => {
    const file = event.target.files[0];

    var reader = new FileReader();
    reader.onload = async function () {
      console.log("Uploaded");
      handleChangeFieldValues("imagem", URL.createObjectURL(file));
      handleChangeFieldValues("imgProjeto", file);
    };
    reader.readAsDataURL(event.target.files[0]);
  };

  const handleChangeImgClick = () => {
    document.getElementById("upload-photo").click();
  };

  const arrayToString = (array) => {
    return array.reduce((total, current, index, arr) => {
      if (index === 1) return `${total},${current},`;
      if (index === arr.length - 1) return total + current;
      return total + current + ",";
    });
  };

  const handleSave = () => {
    console.log(fieldValues);
    let newProject = new FormData();
    newProject.append("id_utilizador", user.id);
    newProject.append("nome", fieldValues?.nome);
    // newProject.append("data_inicio", fieldValues.data_inicio + ":00");
    newProject.append("data_inicio", "07-17-2023 20:00:00");
    newProject.append("imgProjeto", fieldValues?.imgProjeto);
    newProject.append("descricao", fieldValues?.descricao);
    newProject.append("data_fim", "07-21-2023 08:00:00");
    // newProject.append(
    //   "data_fim",
    //   fieldValues.data_fim.length > 0 ? fieldValues.data_fim + ":00" : null
    // );
    newProject.append(
      "areasCulturais",
      fieldValues?.areasCulturais.length > 0
        ? arrayToString(
            fieldValues?.areasCulturais.map((item) => item.id)
          ).slice(0, -1)
        : fieldValues?.areasCulturais[0].id
    );
    newProject.append(
      "assoc_evento",
      fieldValues?.assoc_evento?.length > 0
        ? arrayToString(
            fieldValues?.assoc_evento?.map((item) => item.id)
          ).slice(0, -1)
        : 0
    );
    newProject.append("idGeografia", fieldValues?.local.id);
    newProject.append(
      "idsProprietarios",
      fieldValues?.proprietarios.length > 0
        ? arrayToString(
            fieldValues?.proprietarios.map((item) => item.id)
          ).slice(0, -1)
        : 0
    );

    console.log(newProject);

    editProject(newProject);
  };

  const editProject = async (newProject) => {
    try {
      const response = await axiosInstance.post(
        `/projetos/atualizar/${id}`,
        newProject,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            // Authorization:
            //   "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MiwibmFtZSI6Imh1bWJlcnRvIG5hc2NpbWVudG8iLCJleHBpcmVzX2luIjoxNjc3OTMxODIzfQ.vJnAshie-1hUo_VVKK0QInFI4NpBmx5obuWzOauK4B8",
          },
        }
      );
      console.log(response.data.dados);
    } catch (error) {
      console.error(error);
    }
  };

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
                display="flex"
                flexDirection="column"
                flexGrow={1}
                mt=".75rem"
              >
                <TextField
                  required
                  id="event-name"
                  name="name"
                  placeholder="Insira o nome do seu projeto aqui"
                  variant="standard"
                  value={fieldValues?.nome}
                  onChange={(e) =>
                    handleChangeFieldValues("nome", e.target.value)
                  }
                />
                <Box
                  sx={{
                    display: "flex",
                    gap: ".25rem",
                    alignItems: "center",
                    flexGrow: 1,
                  }}
                >
                  <Typography fontWeight="bold" fontSize="0.9rem">
                    Proprietários Associados
                  </Typography>
                  <Dot sx={{ fontSize: ".5rem" }} />

                  <CustomizedAutoComplete
                    data={users}
                    currentValue={fieldValues.proprietarios}
                    onAutoCompleteChange={(value) =>
                      handleChangeFieldValues("proprietarios", value)
                    }
                  />
                </Box>
              </Box>
            </Box>
            <Box sx={{ backgroundColor: "white" }}>
              <Input
                style={{ display: "none" }}
                id="upload-photo"
                name="upload-photo"
                type="file"
                accept="image/*"
                onChange={handlePhotoUpload}
              />
              <Avatar
                src={fieldValues.imagem || img}
                alt={`Adicionar imagem`}
                variant="square"
                sx={{ width: "45rem", height: "auto" }}
                onClick={handleChangeImgClick}
              />
            </Box>
            <ReactQuill
              theme="snow"
              modules={editorModules}
              formats={editorFormats}
              value={fieldValues.descricao}
              onChange={(value) => handleChangeFieldValues("descricao", value)}
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
                aria-describedby={locationPopoverId}
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
                onClick={handleLocationClick}
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
            <Popover
              id={locationPopoverId}
              open={openLocationPopover}
              anchorEl={anchorLocationEl}
              onClose={() => setAnchorLocationEl(null)}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
            >
              <Box display="flex" gap="1rem" justifyContent="space-between">
                <Autocomplete
                  id="location-auto-complete"
                  options={addresses}
                  sx={{ width: 300 }}
                  disableCloseOnSelect
                  renderInput={(params) => (
                    <TextField {...params} size="small" />
                  )}
                  getOptionLabel={(option) => option?.nome}
                  value={fieldValues.local}
                  onChange={(_, value) =>
                    handleChangeFieldValues("local", value)
                  }
                  onInputChange={async (event, value) => {
                    if (value.length >= 2 && value.length <= 4) {
                      const res = await getAddresses(value);
                      setAddresses(res.dados);
                    }
                  }}
                />
              </Box>
            </Popover>
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
                onClick={handleDateClick}
              >
                <CalendarMonth
                  sx={{ color: "white", width: "1rem", height: "1rem" }}
                />
              </Box>
            </Tooltip>
            <Popover
              id={datePopoverId}
              open={openDatePopover}
              anchorEl={anchorDateEl}
              onClose={() => setAnchorDateEl(null)}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
            >
              <Box display="flex" gap="1rem" justifyContent="space-between">
                <TextField
                  id="date-start"
                  name="startDate"
                  type="datetime-local"
                  label="Data Início"
                  value={fieldValues.data_inicio}
                  sx={{
                    height: "2rem",
                    ".MuiInputBase-root": {
                      height: "2rem",
                      borderRadius: ".25rem",
                    },
                  }}
                  InputLabelProps={{ shrink: true }}
                  onChange={
                    (e) =>
                      handleChangeFieldValues("data_inicio", e.target.value)
                    // handleDateLocalChange(e.target.name, e.target.value)
                  }
                />
                <TextField
                  id="date-end"
                  name="endDate"
                  type="datetime-local"
                  label="Data Fim"
                  value={fieldValues.data_fim}
                  sx={{
                    height: "2rem",
                    ".MuiInputBase-root": {
                      height: "2rem",
                      borderRadius: ".25rem",
                    },
                  }}
                  InputLabelProps={{ shrink: true }}
                  onChange={
                    (e) => handleChangeFieldValues("data_fim", e.target.value)
                    // handleDateLocalChange(e.target.name, e.target.value)
                  }
                />
              </Box>
            </Popover>
            <Tooltip title={"Adicionar área cultural"} placement="left" arrow>
              <Box
                id="cultural-area"
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
                onClick={handleCulturalAreaClick}
              >
                <MoreHoriz
                  sx={{ color: "white", width: "1rem", height: "1rem" }}
                />
              </Box>
            </Tooltip>
            <Popover
              id={culturalAreaPopoverId}
              open={openCulturalAreaPopover}
              anchorEl={anchorCulturalAreaEl}
              onClose={() => setAnchorCulturalAreaEl(null)}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
            >
              <Box display="flex" gap="1rem" justifyContent="space-between">
                <Autocomplete
                  multiple
                  id="checkboxes-tags-demo"
                  options={categories}
                  disableCloseOnSelect
                  getOptionLabel={(option) => option.name}
                  value={fieldValues.areasCulturais}
                  renderOption={(props, option, { selected }) => (
                    <li {...props}>
                      <Checkbox
                        icon={icon}
                        checkedIcon={checkedIcon}
                        style={{ marginRight: 8 }}
                        checked={fieldValues.areasCulturais
                          .map((area) => area.id)
                          .includes(option.id)}
                      />
                      {option.name}
                    </li>
                  )}
                  onChange={(_, value) =>
                    handleChangeFieldValues("areasCulturais", value)
                  }
                  sx={{ width: 300 }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      placeholder="Áreas Culturais"
                      size="small"
                    />
                  )}
                />
              </Box>
            </Popover>
            <Tooltip
              title={"Adicionar Evento Associado"}
              placement="left"
              arrow
            >
              <Box
                id="associated-event"
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
                onClick={handleAssociateEventClick}
              >
                <Handshake
                  sx={{ color: "white", width: "1rem", height: "1rem" }}
                />{" "}
              </Box>
            </Tooltip>
            <Popover
              id={associateEventPopoverId}
              open={openAssociateEventPopover}
              anchorEl={anchorAssociateEventEl}
              onClose={() => setAnchorAssociateEventEl(null)}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
            >
              <Box display="flex" gap="1rem" justifyContent="space-between">
                <Autocomplete
                  multiple
                  id="checkboxes-tags-demo"
                  options={events}
                  disableCloseOnSelect
                  getOptionLabel={(option) => option.nome}
                  value={fieldValues.assoc_evento}
                  renderOption={(props, option, { selected }) => (
                    <li {...props}>
                      <Checkbox
                        icon={icon}
                        checkedIcon={checkedIcon}
                        style={{ marginRight: 8 }}
                        checked={fieldValues.assoc_evento
                          .map((proj) => +proj.id)
                          .includes(+option.id)}
                      />
                      {option.nome}
                    </li>
                  )}
                  onChange={(_, value) =>
                    handleChangeFieldValues("assoc_evento", value)
                  }
                  sx={{ width: 300 }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      placeholder="Eventos Associado"
                      size="small"
                    />
                  )}
                />
              </Box>
            </Popover>
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
                onClick={handleSave}
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

export default Editar;

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
