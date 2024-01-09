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
import getCroppedImg from "../../../utils/cropImage";
import { toast } from "react-toastify";
import { imgApiPath } from "../../../api/apiPath";
import ImageCropper from "../../../components/ImageCropper";
import LocationModal from "../../../components/LocationModal";
import CircularProgress from "@mui/material/CircularProgress";
import CustomizedAutoComplete from "../../../components/CustomizedAutoComplete";

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
    hora_inicio: "",
    hora_fim: "",
    imagem: null,
    imgEventoRecortada: null,
    descricao: ``,
    local: { id: null, nome: "", local: null, lat: null, lng: null },
    proprietarios: { id: 0, nome: "" },
    areasCulturais: [],
    assoc_projeto: [],
  });
  const [owners, setOwners] = useState([]);
  const [projects, setProjects] = useState([]);
  const [openCroppedImage, setOpenCroppedImage] = useState(false);
  const [showLocationModal, setShowLocationModal] = useState(false);

  const [loading, setLoading] = React.useState(false);

  const { addNotifications } = useNotifications();

  const navigate = useNavigate();

  const { searchUsers } = useRegisterUser();

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

  // Translated strings
  const validatePostTranslatedStrings = [
    t("postValidationsErrors.nomeObrigatorio"),
    t("postValidationsErrors.imagemObrigatorio"),
    t("postValidationsErrors.localObrigatorio"),
    t("postValidationsErrors.dataInicioObrigatorio"),
    t("postValidationsErrors.horaInicioObrigatorio"),
    t("postValidationsErrors.areaCulturalObrigatorio"),
    t("postValidationsErrors.dataFimMaiorInicio"),
    t("postValidationsErrors.datasNaoPodemSerIguais"),
    t("postValidationsErrors.imagemRecortadaObrigatorio"),
  ];

  const handleLocationClick = (event) => {
    setShowLocationModal(true);
  };

  const handleDateClick = (event) => {
    setAnchorDateEl(event.currentTarget);
  };

  const handleCulturalAreaClick = (event) => {
    setAnchorCulturalAreaEl(event.currentTarget);
  };

  const handleAssociateProjectClick = (event) => {
    if (projects.length > 0) {
      return setAnchorAssociateProjectEl(event.currentTarget);
    }
    toast.warning(t("eventPage.common.noProjects"));
  };

  const handleChangeFieldValues = (key, value) => {
    setFieldValues((prev) => {
      return { ...prev, [key]: value };
    });
  };

  const getProjects = async () => {
    try {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      if (!userInfo) return navigate("/");
      setUser(userInfo);
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

      if (response.data.dados === "null") {
        setProjects([]);
      } else {
        setProjects(response.data.dados);
      }
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getProjects();
  }, []);

  useEffect(() => {
    if (fieldValues.imagem && !openCroppedImage) {
      toast.info(t("eventPage.common.recorteInfo"));
    }
  }, [fieldValues.imagem]);

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

  function itemIsDuplicate(item, array) {
    for (const arrayItem of array) {
      if (arrayItem.id === item.id) {
        return true;
      }
    }
    return false;
  }

  const handleCulturalAreaChange = (selectedOptions) => {
    const selectedOptionsLength = selectedOptions.length;
    if (selectedOptionsLength === 0 || selectedOptionsLength === 1) {
      return handleChangeFieldValues("areasCulturais", selectedOptions);
    }

    const lastSelectedOption = selectedOptions[selectedOptions.length - 1];
    const selectedOptionsCopy = [...selectedOptions];
    selectedOptionsCopy.pop();

    const isDuplicate = itemIsDuplicate(
      lastSelectedOption,
      selectedOptionsCopy
    );
    if (isDuplicate) {
      const noDuplicateSelectedOptions = selectedOptionsCopy.filter(
        (item) => item.id !== lastSelectedOption.id
      );
      return handleChangeFieldValues(
        "areasCulturais",
        noDuplicateSelectedOptions
      );
    }
    handleChangeFieldValues("areasCulturais", selectedOptions);
  };

  const handleSaveMinimizedImage = async (croppedAreaPixels) => {
    const value = await getCroppedImg(
      fieldValues.imagem,
      croppedAreaPixels,
      0,
      fieldValues?.imgEvento?.type
    );

    setFieldValues((prev) => {
      return { ...prev, ["imgEventoRecortada"]: value };
    });

    setOpenCroppedImage(false);
  };

  const handleSave = () => {
    let dataInicio;
    let dataFim;

    if (fieldValues?.hora_inicio === "") {
      dataInicio = fieldValues?.data_inicio;
    } else {
      dataInicio = `${fieldValues?.data_inicio}T${fieldValues?.hora_inicio}`;
    }

    if (fieldValues?.hora_fim === "") {
      dataFim = fieldValues?.data_fim;
    } else if (fieldValues?.data_fim === "" && fieldValues?.hora_fim !== "") {
      dataFim = `${fieldValues?.data_inicio}T${fieldValues?.hora_fim}`;
    } else {
      dataFim = `${fieldValues?.data_fim}T${fieldValues?.hora_fim}`;
    }

    const newEvent = {
      id_utilizador: user.id,
      nome: fieldValues?.nome,
      imgEvento: fieldValues?.imgEvento,
      imgEventoRecortada: fieldValues?.imgEventoRecortada,
      descricao: fieldValues?.descricao,
      id_geografia: fieldValues?.local?.id,
      data_inicio: filterStartDate(dataInicio),
      data_fim: filterEndDate(dataFim),
      areasCulturais: filterCulturalAreas(fieldValues?.areasCulturais),
      assoc_projeto: filterAssociatedProjects(fieldValues?.assoc_projeto),
      idsProprietarios: filterAssociatedOwners(fieldValues?.proprietarios),
    };

    const values = cleanPost(newEvent, true);
    const body = objectToFormData(values, user.id, true);

    const isValid = validatePost(
      { ...newEvent, location: fieldValues?.local },
      true,
      validatePostTranslatedStrings
    );
    if (isValid) {
      createEvent(body);
    }
  };

  const createEvent = async (newEvent) => {
    setLoading(true);
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
      if (response?.data?.dados !== "erro") {
        const addedToMap = await addCoordinates(
          fieldValues?.local,
          response?.data?.dados
        );

        if (!addedToMap) {
          toast.error("Erro ao adicionar coordenadas do evento!");
        }
        let nome = fieldValues.nome.replaceAll("/", "_");
        nome = nome.replaceAll(" ", "_");
        navigate(`/eventos/${+response?.data?.dados}/${nome}`);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const addCoordinates = async (location, postId) => {
    const locationData = objectToFormData(
      {
        id_coordenada: 0,
        name: location?.local,
        latitude: location?.lat,
        longitude: location?.lng,
        id_publicacao: postId,
        tipo_publicacao: "E",
      },
      "",
      true
    );

    try {
      const response = await axiosInstance.post(
        `/localizacao/adicionarLocalizacao`,
        locationData,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            // Authorization:
            //   "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MiwibmFtZSI6Imh1bWJlcnRvIG5hc2NpbWVudG8iLCJleHBpcmVzX2luIjoxNjc3OTMxODIzfQ.vJnAshie-1hUo_VVKK0QInFI4NpBmx5obuWzOauK4B8",
          },
        }
      );
      setLoading(false);
      if (response.status === 200) return true;
      return false;
    } catch (error) {
      console.log(error);
      setLoading(false);
      return false;
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
                    : `${imgApiPath}/perfilImg/${user?.img_perfil}`
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
                    marginTop: ".25rem"
                  }}
                >
                  <Typography fontWeight="bold" fontSize="0.9rem">
                    {t("eventPage.common.associatedOwners")}
                  </Typography>
                  <Dot sx={{ fontSize: ".5rem" }} />
                  <CustomizedAutoComplete
                    data={owners}
                    currentValue={fieldValues.proprietarios}
                    onChange={(_, value) => {
                      handleChangeFieldValues("proprietarios", value);
                    }}
                    onInputChange={async (event, value) => {
                      console.log(value)
                      if (value.length >= 2) {
                        const res = await searchUsers(value);
                        setOwners(res.dados);
                      } else {
                        setOwners([]);
                      }
                    }}
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
                <ImageCropper
                  isOpened={openCroppedImage}
                  handleClose={() => setOpenCroppedImage(false)}
                  image={fieldValues?.imagem}
                  handleSaveMinimizedImage={handleSaveMinimizedImage}
                />
              ) : (
                <Avatar
                  src={fieldValues.imagem || img}
                  alt={`Adicionar imagem`}
                  variant="square"
                  sx={{
                    width: {
                      xs: "20rem",
                      sm: "20rem",
                      md: "45rem",
                      lg: "45rem",
                      xl: "45rem",
                    },
                    height: "auto",
                  }}
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
              placeholder={t("eventPage.common.defaultDescription")}
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
            <LocationModal
              show={showLocationModal}
              handleClose={() => setShowLocationModal(false)}
              location={fieldValues?.local}
              setLocation={(value) => handleChangeFieldValues("local", value)}
            />

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
                gap="2rem"
                justifyContent="space-between"
                flexDirection="column"
                p=".8rem"
              >
                <Box display="flex" gap="1rem" justifyContent="space-between">
                  <TextField
                    id="date-start"
                    label={t("eventPage.common.startDate")}
                    type="date"
                    value={fieldValues.data_inicio}
                    InputLabelProps={{ shrink: true }}
                    sx={{
                      height: "2rem",
                      ".MuiInputBase-root": {
                        height: "2rem",
                        borderRadius: ".25rem",
                      },
                    }}
                    onChange={(e) => {
                      handleChangeFieldValues("data_inicio", e.target.value);
                    }}
                  />
                  <TextField
                    id="time-start"
                    label="Hora Inicio"
                    type="time"
                    value={fieldValues.hora_inicio}
                    InputLabelProps={{ shrink: true }}
                    sx={{
                      height: "2rem",
                      ".MuiInputBase-root": {
                        height: "2rem",
                        borderRadius: ".25rem",
                      },
                    }}
                    onChange={(e) => {
                      handleChangeFieldValues("hora_inicio", e.target.value);
                    }}
                  />
                </Box>

                <Box display="flex" gap="1rem" justifyContent="space-between">
                  <TextField
                    id="date-end"
                    label={t("eventPage.common.endDate")}
                    type="date"
                    value={fieldValues.data_fim}
                    InputLabelProps={{ shrink: true }}
                    sx={{
                      height: "2rem",
                      ".MuiInputBase-root": {
                        height: "2rem",
                        borderRadius: ".25rem",
                      },
                    }}
                    onChange={(e) => {
                      handleChangeFieldValues("data_fim", e.target.value);
                    }}
                  />
                  <TextField
                    id="time-end"
                    label="Hora Fim"
                    type="time"
                    value={fieldValues.hora_fim}
                    InputLabelProps={{ shrink: true }}
                    sx={{
                      height: "2rem",
                      ".MuiInputBase-root": {
                        height: "2rem",
                        borderRadius: ".25rem",
                      },
                    }}
                    onChange={(e) => {
                      handleChangeFieldValues("hora_fim", e.target.value);
                    }}
                  />
                </Box>
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
                  onChange={
                    (_, value) => {
                      handleCulturalAreaChange(value);
                    }
                    // handleChangeFieldValues("areasCulturais", value)
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
            {!loading && (
              <Tooltip
                title={t("eventPage.common.save")}
                placement="left"
                arrow
              >
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
                  <Save
                    sx={{ color: "white", width: "1rem", height: "1rem" }}
                  />
                </Box>
              </Tooltip>
            )}
            {loading && <CircularProgress />}
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
