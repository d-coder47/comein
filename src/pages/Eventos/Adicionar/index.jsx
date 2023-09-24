import React, { useEffect, useState } from "react";
import NavBar from "../../../components/NavBar";
import {
  Autocomplete,
  Avatar,
  Box,
  Checkbox,
  Input,
  Popover,
  TextField,
  Tooltip,
  Typography,
  Button,
  LinearProgress,
} from "@mui/material";
import img from "../../../assets/img/upload.png";
import {
  CalendarMonth,
  LocationOn,
  FiberManualRecord as Dot,
  Save,
  CheckBoxOutlineBlank,
  CheckBox,
  Handshake,
  MoreHoriz,
  Crop,
  Close,
} from "@mui/icons-material";

import ReactQuill from "react-quill";

import "react-quill/dist/quill.snow.css";
import "react-quill/dist/quill.bubble.css";

import CustomizedAutoComplete from "../../../components/CustomizedAutoComplete";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../../api/axiosInstance";
import useRegisterUser from "../../../hooks/useRegisterUser";
import useNotifications from "../../../hooks/useNotifications";
import { useTranslation } from "react-i18next";
import {
  cleanPost,
  filterAssociatedOwners,
  filterAssociatedProjects,
  filterCulturalAreas,
  filterEndDate,
  filterStartDate,
  objectToFormData,
} from "../../../utils/filterPostAttributes";
import { validatePost } from "../../../utils/postValidation";
import Cropper from "react-easy-crop";
import axios from "axios";
import getCroppedImg from "../../../utils/cropImage";
import { toast } from "react-toastify";

const Adicionar = () => {
  const { t } = useTranslation();

  const [user, setUser] = useState(null);
  const [anchorLocationEl, setAnchorLocationEl] = useState(null);
  const [anchorDateEl, setAnchorDateEl] = useState(null);
  const [anchorCulturalAreaEl, setAnchorCulturalAreaEl] = useState(null);
  const [anchorAssociateProjectEl, setAnchorAssociateProjectEl] =
    useState(null);
  const [fieldValues, setFieldValues] = useState({
    nome: "",
    data_inicio: "",
    data_fim: "",
    imagem: null,
    imgEventoRecortada: null,
    descricao: `<p><span class="ql-size-large">${t(
      "eventPage.common.defaultDescription"
    )}</span></p><p><span class="ql-size-large">${t(
      "eventPage.common.tutorial"
    )}</span></p>`,
    local: { id: 0, nome: "" },
    proprietarios: [],
    areasCulturais: [],
    assoc_projeto: [],
  });
  const [users, setUsers] = useState([]);
  const [projects, setProjects] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [openCroppedImage, setOpenCroppedImage] = useState(false);
  const [openImageSizeError, setOpenImageSizeError] = React.useState(false);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const [loading, setLoading] = React.useState(false);

  const { addNotifications } = useNotifications();

  const navigate = useNavigate();

  const { getAddresses } = useRegisterUser();

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

  const handleAssociateProjectClick = (event) => {
    setAnchorAssociateProjectEl(event.currentTarget);
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

    const getProjects = async () => {
      try {
        const response = await axiosInstance.get(
          `/projetos/listarPorUtilizador/${+userInfo.id}`,
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
              // Authorization:
              //   "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MiwibmFtZSI6Imh1bWJlcnRvIG5hc2NpbWVudG8iLCJleHBpcmVzX2luIjoxNjc3OTMxODIzfQ.vJnAshie-1hUo_VVKK0QInFI4NpBmx5obuWzOauK4B8",
            },
          }
        );
        console.log(typeof response.data.dados);
        if (response.data.dados === "null") {
          setProjects([]);
        } else {
          setProjects(response.data.dados);
        }
      } catch (error) {
        console.error(error);
      }
    };

    getUsers();
    getProjects();
  }, []);

  const openLocationPopover = Boolean(anchorLocationEl);
  const locationPopoverId = open ? "location-popover" : undefined;

  const openDatePopover = Boolean(anchorDateEl);
  const datePopoverId = open ? "date-popover" : undefined;

  const openCulturalAreaPopover = Boolean(anchorCulturalAreaEl);
  const culturalAreaPopoverId = open ? "culturalArea-popover" : undefined;

  const openAssociateProjectPopover = Boolean(anchorAssociateProjectEl);
  const associateProjectPopoverId = open
    ? "associateProject-popover"
    : undefined;

  const icon = <CheckBoxOutlineBlank fontSize="small" />;
  const checkedIcon = <CheckBox fontSize="small" />;

  const handlePhotoUpload = async (event) => {
    const file = event.target.files[0];

    const fileSizeInMB = file.size / (1024 * 1024); // 1 MB = 1024 KB, 1 KB = 1024 bytes

    if (fileSizeInMB.toFixed(2) >= 5) {
      toast.success(t("projectPage.common.imageSizeError"));
    } else {
      var reader = new FileReader();
      reader.onload = async function () {
        handleChangeFieldValues("imagem", URL.createObjectURL(file));
        handleChangeFieldValues("imgEvento", file);
        handleChangeFieldValues("imgEventoRecortada", null);
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  const handleChangeImgClick = () => {
    document.getElementById("upload-photo").click();
  };

  const onCropComplete = (croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const handleSaveMinimizedImage = async () => {
    const value = await getCroppedImg(
      fieldValues.imagem,
      croppedAreaPixels,
      0,
      fieldValues?.imgEvento?.type
    );
    console.log("value", value);

    setFieldValues((prev) => {
      return { ...prev, ["imgEventoRecortada"]: value };
    });

    setOpenCroppedImage(false);
  };

  const handleSave = () => {
    console.log({ fieldValues });
    setLoading(true);
    const newEvent = {
      id_utilizador: user.id,
      nome: fieldValues?.nome,
      imgEvento: fieldValues?.imgEvento,
      imgEventoRecortada: fieldValues?.imgEventoRecortada,
      descricao: fieldValues?.descricao,
      id_geografia: fieldValues?.local?.id,
      data_inicio: filterStartDate(fieldValues?.data_inicio),
      data_fim: filterEndDate(fieldValues?.data_fim),
      areasCulturais: filterCulturalAreas(fieldValues?.areasCulturais),
      assoc_projeto: filterAssociatedProjects(fieldValues?.assoc_projeto),
      idsProprietarios: filterAssociatedOwners(fieldValues?.proprietarios),
    };

    const values = cleanPost(newEvent, true);
    const body = objectToFormData(values, user.id, true);

    const isValid = validatePost(newEvent, true);

    if (isValid) {
      createEvent(body);
    }
  };

  const createEvent = async (newEvent) => {
    try {
      const response = await axiosInstance.post(`/eventos/criar`, newEvent, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          // Authorization:
          //   "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MiwibmFtZSI6Imh1bWJlcnRvIG5hc2NpbWVudG8iLCJleHBpcmVzX2luIjoxNjc3OTMxODIzfQ.vJnAshie-1hUo_VVKK0QInFI4NpBmx5obuWzOauK4B8",
        },
      });
      if (response.status === 200) {
        setLoading(false);
        await addNotifications(
          user.id,
          response.data.dados,
          "E",
          `${user.nome} adicionou um evento novo`
        );
      }
      if (!response?.data?.dados !== "erro") {
        navigate(`/eventos/${+response?.data?.dados}/${newEvent.nome}`);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const onGoBack = () => {
    navigate(-1);
  };

  if (!user) return <div>Loading</div>;

  return (
    <>
      <div>{loading && <LinearProgress />}</div>
      <NavBar />
      <Box
        id="wrapper"
        sx={{
          width: "100%",
          height: "100%",
          // backgroundColor: "rgba(0,0,0,.3)",
        }}
      >
        <Box onClick={onGoBack} mr=".5rem" sx={{ float: "right" }}>
          <Close
            sx={{
              color: "rgba(0,0,0,.9)",
              // position: "absolute",
              // right: "1rem",
              // top: ".5rem",
              cursor: "pointer",
              "&:hover": {
                color: "rgba(0,0,0,.7)",
              },
            }}
          />
        </Box>
        <Box
          id="add-content"
          sx={{
            margin: "0 0 0 4rem",
            backgroundColor: "transparent",
            outline: "none",
            minHeight: "100vh",
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
            mb="2rem"
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
                src={
                  user?.login_from === "google"
                    ? user?.img_perfil
                    : `https://comein.cv/comeincv_api_test/img/perfilImg/${user?.img_perfil}`
                }
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
                  placeholder={t("eventPage.common.namePlaceholder")}
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
                    {t("eventPage.common.associatedOwners")}
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
            <Box
              id="image-container"
              sx={{
                backgroundColor: "white",
                margin: "0 0 0 1rem",
              }}
            >
              <Input
                style={{ display: "none" }}
                id="upload-photo"
                name="upload-photo"
                type="file"
                accept="image/*"
                onChange={handlePhotoUpload}
              />
              {openCroppedImage ? (
                <Box
                  display="flex"
                  flexDirection="column"
                  justifyContent="center"
                  sx={{
                    backgroundColor: "#f8f8f8",
                  }}
                >
                  <Cropper
                    image={fieldValues?.imagem}
                    crop={crop}
                    zoom={zoom}
                    aspect={16 / 9}
                    onCropChange={setCrop}
                    onCropComplete={onCropComplete}
                    onZoomChange={setZoom}
                    style={{
                      containerStyle: {
                        position: "unset",
                        maxWidth: "600px",
                        maxHeight: "385px",
                        height: "385px",
                      },
                      mediaStyle: {
                        position: "unset",
                      },
                      cropAreaStyle: {
                        marginTop: "-4.5rem",
                      },
                    }}
                  />
                  <Box
                    p="1rem"
                    display="flex"
                    justifyContent="space-evenly"
                    sx={{
                      zIndex: "999",
                      backgroundColor: "#fff",
                      borderRadius: "0 0 .25rem .25rem",
                    }}
                  >
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={() => setOpenCroppedImage(false)}
                      sx={{ textTransform: "unset" }}
                    >
                      Cancelar
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleSaveMinimizedImage()}
                      sx={{
                        textTransform: "unset",
                      }}
                    >
                      Guardar Recorte
                    </Button>
                  </Box>
                </Box>
              ) : (
                <Avatar
                  src={fieldValues.imagem || img}
                  alt={`Adicionar imagem`}
                  variant="square"
                  sx={{ width: "45rem", height: "auto" }}
                  onClick={handleChangeImgClick}
                />
              )}
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
            <Tooltip
              title={t("eventPage.common.location")}
              placement="left"
              arrow
            >
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
                  onChange={(_, value) => {
                    handleChangeFieldValues("local", value);
                    setAnchorLocationEl(null);
                  }}
                  onInputChange={async (event, value) => {
                    if (value.length >= 2 && value.length <= 4) {
                      const res = await getAddresses(value);
                      setAddresses(res.dados);
                    }
                  }}
                />
              </Box>
            </Popover>
            <Tooltip title={t("eventPage.common.date")} placement="left" arrow>
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
              style={{ padding: ".8rem" }}
            >
              <Box
                display="flex"
                gap="1rem"
                justifyContent="space-between"
                p=".8rem"
              >
                <TextField
                  id="date-start"
                  name="startDate"
                  type="datetime-local"
                  label={t("eventPage.common.startDate")}
                  value={fieldValues.data_inicio}
                  sx={{
                    height: "2rem",
                    ".MuiInputBase-root": {
                      height: "2rem",
                      borderRadius: ".25rem",
                    },
                  }}
                  InputLabelProps={{ shrink: true }}
                  InputProps={{ format: "YYYYYY-MM-DDTHH:mm:ss" }}
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
                  label={t("eventPage.common.endDate")}
                  value={fieldValues.data_fim}
                  sx={{
                    height: "2rem",
                    ".MuiInputBase-root": {
                      height: "2rem",
                      borderRadius: ".25rem",
                    },
                  }}
                  InputLabelProps={{ shrink: true }}
                  InputProps={{ format: "YYYYYY-MM-DDTHH:mm:ss" }}
                  onChange={(e) => {
                    handleChangeFieldValues("data_fim", e.target.value);
                    setAnchorDateEl(null);
                  }}
                />
              </Box>
            </Popover>
            <Tooltip
              title={t("eventPage.common.culturalArea")}
              placement="left"
              arrow
            >
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
                      placeholder={t("eventPage.common.culturalArea")}
                      size="small"
                    />
                  )}
                />
              </Box>
            </Popover>
            <Tooltip
              title={t("eventPage.common.associatedProject")}
              placement="left"
              arrow
            >
              <Box
                id="associated-project"
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
                onClick={handleAssociateProjectClick}
              >
                <Handshake
                  sx={{ color: "white", width: "1rem", height: "1rem" }}
                />
              </Box>
            </Tooltip>
            <Popover
              id={associateProjectPopoverId}
              open={openAssociateProjectPopover}
              anchorEl={anchorAssociateProjectEl}
              onClose={() => setAnchorAssociateProjectEl(null)}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
            >
              <Box display="flex" gap="1rem" justifyContent="space-between">
                <Autocomplete
                  multiple
                  id="checkboxes-tags-demo"
                  options={projects}
                  disableCloseOnSelect
                  getOptionLabel={(option) => option.nome}
                  value={fieldValues.assoc_projeto}
                  renderOption={(props, option, { selected }) => (
                    <li {...props}>
                      <Checkbox
                        icon={icon}
                        checkedIcon={checkedIcon}
                        style={{ marginRight: 8 }}
                        checked={fieldValues.assoc_projeto
                          .map((proj) => +proj.id)
                          .includes(+option.id)}
                      />
                      {option.nome}
                    </li>
                  )}
                  onChange={(_, value) =>
                    handleChangeFieldValues("assoc_projeto", value)
                  }
                  sx={{ width: 300 }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      placeholder={t("eventPage.common.associatedProject")}
                      size="small"
                    />
                  )}
                />
              </Box>
            </Popover>
            <Tooltip
              title={t("eventPage.common.croppedImage")}
              placement="left"
              arrow
            >
              <Box
                id="cropped-image"
                sx={{
                  borderRadius: "50%",
                  height: "3rem",
                  width: "3rem",
                  backgroundColor: () =>
                    fieldValues?.imagem ? "#3c3c3c" : "#808080",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: fieldValues?.imagem ? "pointer" : "not-allowed",
                  "&:hover": {
                    opacity: 0.8,
                  },
                }}
                onClick={() =>
                  fieldValues?.imagem ? setOpenCroppedImage(true) : null
                }
              >
                <Crop sx={{ color: "white", width: "1rem", height: "1rem" }} />
              </Box>
            </Tooltip>
            {/* <Modal
              id="cropped-image-modal"
              open={openCroppedImage}
              onClose={() => setOpenCroppedImage(false)}
              aria-labelledby="cropped-image-title"
              aria-describedby="cropped-image-description"
              sx={{
                ".MuiModal-backdrop": {
                  backgroundColor: "rgba(0,0,0,.5)",
                },
              }}
            >
              <CropImage image={fieldValues?.imagem} />
            </Modal> */}
            <Tooltip title={t("eventPage.common.save")} placement="left" arrow>
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
