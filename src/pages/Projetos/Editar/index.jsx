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
  LocationOn,
  FiberManualRecord as Dot,
  Save,
  CheckBoxOutlineBlank,
  CheckBox,
  MoreHoriz,
  Crop,
  Close,
} from "@mui/icons-material";

import ReactQuill from "react-quill";

import "react-quill/dist/quill.snow.css";
import "react-quill/dist/quill.bubble.css";
import CustomizedAutoComplete from "../../../components/CustomizedAutoComplete";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../../api/axiosInstance";
import useRegisterUser from "../../../hooks/useRegisterUser";
import { useTranslation } from "react-i18next";
import {
  cleanPost,
  filterAssociatedOwners,
  filterCulturalAreas,
  objectToFormData,
} from "../../../utils/filterPostAttributes";
import getCroppedImg from "../../../utils/cropImage";
import { imgApiPath } from "../../../api/apiPath";
import ImageCropper from "../../../components/ImageCropper";
import LocationModal from "../../../components/LocationModal";
import { toast } from "react-toastify";
import { validateEditedPost } from "../../../utils/editedPostValidation";
import CircularProgress from "@mui/material/CircularProgress";

const Editar = () => {
  const { t } = useTranslation();

  const [user, setUser] = useState(null);
  const [anchorLocationEl, setAnchorLocationEl] = useState(null);
  const [anchorCulturalAreaEl, setAnchorCulturalAreaEl] = useState(null);
  const [fieldValues, setFieldValues] = useState({
    nome: "",
    imagem: null,
    descricao: ``,
    local: { id: null, nome: "", local: null, lat: null, lng: null },
    proprietarios: { id: 0, nome: "" },
    areasCulturais: [],
  });
  const [editedFieldValues, setEditedFieldValues] = useState(null);
  const [owners, setOwners] = useState([]);
  const [users, setUsers] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [openCroppedImage, setOpenCroppedImage] = useState(false);
  const [showLocationModal, setShowLocationModal] = useState(false);

  const [loading, setLoading] = React.useState(false);

  const params = useParams();
  const { id } = params;

  const navigate = useNavigate();

  const { getAddresses, searchUsers } = useRegisterUser();

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
    setShowLocationModal(true);
    // setAnchorLocationEl(event.currentTarget);
  };

  const handleCulturalAreaClick = (event) => {
    setAnchorCulturalAreaEl(event.currentTarget);
  };

  const handleChangeFieldValues = (key, value) => {
    setFieldValues((prev) => {
      return { ...prev, [key]: value };
    });
    setEditedFieldValues((prev) => {
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

    getUsers();
  }, []);

  useEffect(() => {
    if (!id) return navigate("/");
    const getProjectDetails = async () => {
      try {
        const response = await axiosInstance.get(`/projetos/listar/${id}`, {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            // Authorization:
            //   "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MiwibmFtZSI6Imh1bWJlcnRvIG5hc2NpbWVudG8iLCJleHBpcmVzX2luIjoxNjc3OTMxODIzfQ.vJnAshie-1hUo_VVKK0QInFI4NpBmx5obuWzOauK4B8",
          },
        });
        if (!response.data.dados) return navigate("/");
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        if (+userInfo?.id !== +response.data.dados?.id_utilizador)
          return navigate("/");
        const data = response.data.dados;
        const coordinates = response?.data?.coordenadas;
        const proprietarios = response.data.utilizador;
        proprietarios.shift();

        const areas_culturais = response.data.areas_culturais;
        const areasCulturaisIds = areas_culturais?.map(
          (area) => +area.id_acultural
        );

        const areasCulturais = categories.filter((area) =>
          areasCulturaisIds.includes(area.id)
        );

        setFieldValues({
          id,
          nome: data.nome,
          imagem: `${imgApiPath}/projetosImg/${data.imagem}`,
          descricao: data.descricao,
          local: {
            id: data?.id_geografia === 0 ? null : data.id_geografia,
            nome:
              data?.localProjeto === null || data?.localProjeto === "MUNDO"
                ? ""
                : data?.localProjeto,
            lat: coordinates ? coordinates?.latitude : null,
            lng: coordinates ? coordinates?.longitude : null,
            local: coordinates ? coordinates?.nome : null,
            coordinateId: coordinates ? coordinates?.id : null,
          },
          id_utilizador: data.id_utilizador,
          proprietarios:
            proprietarios.length === 0 ? { id: 0, nome: "" } : proprietarios[0],
          areasCulturais,
        });
      } catch (error) {
        console.log(error);
      }
    };
    getProjectDetails();
  }, [id]);

  const openLocationPopover = Boolean(anchorLocationEl);
  const locationPopoverId = open ? "location-popover" : undefined;

  const openCulturalAreaPopover = Boolean(anchorCulturalAreaEl);
  const culturalAreaPopoverId = open ? "culturalArea-popover" : undefined;

  const icon = <CheckBoxOutlineBlank fontSize="small" />;
  const checkedIcon = <CheckBox fontSize="small" />;

  const handlePhotoUpload = async (event) => {
    const file = event.target.files[0];

    var reader = new FileReader();
    reader.onload = async function () {
      handleChangeFieldValues("imagem", URL.createObjectURL(file));
      handleChangeFieldValues("imgProjeto", file);
      handleChangeFieldValues("imgProjetoRecortada", null);
      toast.info(t("eventPage.common.recorteInfo"));
    };
    reader.readAsDataURL(event.target.files[0]);
  };

  const handleChangeImgClick = () => {
    document.getElementById("upload-photo").click();
  };

  const handleSaveMinimizedImage = async (croppedAreaPixels) => {
    const value = await getCroppedImg(
      fieldValues.imagem,
      croppedAreaPixels,
      0,
      fieldValues?.imgProjeto?.type
    );

    setEditedFieldValues((prev) => {
      return { ...prev, ["imgProjetoRecortada"]: value };
    });

    setOpenCroppedImage(false);
  };

  const handleSave = () => {
    setLoading(true);
    const filteredFieldValues = {
      ...editedFieldValues,
      imagem: fieldValues?.imgProjeto,
      areasCulturais: filterCulturalAreas(editedFieldValues?.areasCulturais),
      idsProprietarios: filterAssociatedOwners(
        editedFieldValues?.proprietarios
      ),
    };

    const values = cleanPost(filteredFieldValues, false);
    const body = objectToFormData(values, user.id);

    const isValid = validateEditedPost(
      editedFieldValues,
      false,
      validatePostTranslatedStrings
    );

    if (isValid) {
      editProject(body, editedFieldValues?.local);
    } else {
      setLoading(false);
    }
  };

  const editProject = async (newProject, local) => {
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
      setLoading(false);
      const postName = editedFieldValues?.nome || fieldValues?.nome;

      if (response?.data?.dados !== "erro") {
        if (local !== undefined && local !== null) {
          const addedToMap = await editCoordinates(
            fieldValues?.local,
            response?.data?.dados
          );

          if (!addedToMap) {
            toast.error("Erro ao editar coordenadas do projeto!");
          }
        }

        let nome = postName.replaceAll("/", "_");
        nome = postName.replaceAll(" ", "_");
        navigate(`/projetos/${+id}/${nome}`);
      }
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const editCoordinates = async (location, postId) => {
    const locationData = objectToFormData(
      {
        id_coordenada: location?.coordinateId,
        name: location?.local,
        latitude: location?.lat,
        longitude: location?.lng,
        id_publicacao: "",
        tipo_publicacao: "",
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

  if (!fieldValues?.id) return <div>Loading</div>;

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
            maxWidth="736px"
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
                  user.login_from === "google"
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
                  placeholder={t("projectPage.common.namePlaceholder")}
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
                    marginTop: ".25rem",
                  }}
                >
                  <Typography fontWeight="bold" fontSize="0.9rem">
                    {t("projectPage.common.associatedOwners")}
                  </Typography>
                  <Dot sx={{ fontSize: ".5rem" }} />

                  <CustomizedAutoComplete
                    data={owners}
                    currentValue={fieldValues.proprietarios}
                    onChange={(_, value) => {
                      handleChangeFieldValues("proprietarios", value);
                    }}
                    onInputChange={async (event, value) => {
                      console.log(value);
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
            <Box sx={{ backgroundColor: "white", margin: "0" }}>
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
                    // width: {
                    //   xs: "20rem",
                    //   sm: "20rem",
                    //   md: "45rem",
                    //   lg: "45rem",
                    //   xl: "45rem",
                    // },
                    width: "100%",
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
              placeholder={t("projectPage.common.defaultDescription")}
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
              title={t("projectPage.common.location")}
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
            <Tooltip
              title={t("projectPage.common.culturalArea")}
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
                      placeholder={t("projectPage.common.culturalArea")}
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
                    editedFieldValues?.imagem ? "#3c3c3c" : "#808080",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: editedFieldValues?.imagem ? "pointer" : "not-allowed",
                  "&:hover": {
                    opacity: 0.8,
                  },
                }}
                onClick={() =>
                  editedFieldValues?.imagem ? setOpenCroppedImage(true) : null
                }
              >
                <Crop sx={{ color: "white", width: "1rem", height: "1rem" }} />
              </Box>
            </Tooltip>
            {!loading && (
              <Tooltip
                title={t("projectPage.common.save")}
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
