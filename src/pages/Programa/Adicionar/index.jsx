import React, { useEffect, useState } from "react";
import NavBar from "../../../components/NavBar";
import {
  Autocomplete,
  Avatar,
  Box,
  Input,
  Popover,
  TextField,
  Tooltip,
  LinearProgress,
} from "@mui/material";
import img from "../../../assets/img/upload.png";
import { CalendarMonth, LocationOn, Save, Close } from "@mui/icons-material";

import ReactQuill from "react-quill";

import "react-quill/dist/quill.snow.css";
import "react-quill/dist/quill.bubble.css";

import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../../api/axiosInstance";
import useRegisterUser from "../../../hooks/useRegisterUser";
import { useTranslation } from "react-i18next";
import {
  cleanPost,
  cleanProgram,
  extractDateFromLocalDateTime,
  extractHourFromLocalDateTime,
  filterEndDate,
  objectToFormData,
} from "../../../utils/filterPostAttributes";
import { toast } from "react-toastify";
import { imgApiPath } from "../../../api/apiPath";
import ImageCropper from "../../../components/ImageCropper";
import CircularProgress from "@mui/material/CircularProgress";

const Adicionar = () => {
  const { t } = useTranslation();
  const params = useParams();
  const { id } = params;

  const [user, setUser] = useState(null);
  const [anchorLocationEl, setAnchorLocationEl] = useState(null);
  const [anchorDateEl, setAnchorDateEl] = useState(null);
  const [fieldValues, setFieldValues] = useState({
    nome: "",
    data_inicio: "",
    data_fim: "",
    imagem: null,
    descricao: ``,
    local: { id: null, nome: "", local: null },
  });
  const [addresses, setAddresses] = useState([]);
  const [openCroppedImage, setOpenCroppedImage] = useState(false);

  const [loading, setLoading] = React.useState(false);

  const navigate = useNavigate();

  const { getAddresses } = useRegisterUser();

  const handleLocationClick = (event) => {
    setAnchorLocationEl(event.currentTarget);
  };

  const handleDateClick = (event) => {
    setAnchorDateEl(event.currentTarget);
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
  }, []);

  const openLocationPopover = Boolean(anchorLocationEl);
  const locationPopoverId = open ? "location-popover" : undefined;

  const openDatePopover = Boolean(anchorDateEl);
  const datePopoverId = open ? "date-popover" : undefined;

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
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  const handleChangeImgClick = () => {
    document.getElementById("upload-photo").click();
  };

  const handleSave = () => {
    const newEvent = {
      idUser: user.id,
      idEvento: id,
      titulo: fieldValues?.nome,
      imagemPrograma: fieldValues?.imgEvento,
      descricaoPrograma: fieldValues?.descricao,
      data: extractDateFromLocalDateTime(fieldValues?.data_inicio),
      hora: extractHourFromLocalDateTime(fieldValues?.data_inicio),
      idGeografia: fieldValues?.local?.id,
      localPrograma: fieldValues?.local?.local,
    };

    const values = cleanProgram(newEvent, false);
    const body = objectToFormData(values, user.id, true);

    addProgram(body);
  };

  const addProgram = async (newEvent) => {
    setLoading(true);
    try {
      const response = await axiosInstance.post(
        `/programaEvento/criar`,
        newEvent,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            // Authorization:
            //   "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MiwibmFtZSI6Imh1bWJlcnRvIG5hc2NpbWVudG8iLCJleHBpcmVzX2luIjoxNjc3OTMxODIzfQ.vJnAshie-1hUo_VVKK0QInFI4NpBmx5obuWzOauK4B8",
          },
          timeout: 180000,
        }
      );
      if (response?.data?.status !== "error") {
        return onGoBack();
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
        }}
      >
        <Box onClick={onGoBack} mr=".5rem" sx={{ float: "right" }}>
          <Close
            sx={{
              color: "rgba(0,0,0,.9)",
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
                  placeholder={t("eventPage.common.programPlaceholder")}
                  variant="standard"
                  value={fieldValues?.nome}
                  onChange={(e) =>
                    handleChangeFieldValues("nome", e.target.value)
                  }
                />
              </Box>
            </Box>
            <Box
              id="image-container"
              sx={{
                backgroundColor: "white",
                margin: "0",
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
                  handleSaveMinimizedImage={null}
                />
              ) : (
                <Avatar
                  src={fieldValues.imagem || img}
                  alt={`Adicionar imagem`}
                  variant="square"
                  sx={{ width: "100%", height: "auto" }}
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
              placeholder={t("eventPage.common.programDescription")}
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
              style={{ padding: ".8rem" }}
            >
              <Box
                display="flex"
                gap="1rem"
                justifyContent="space-between"
                p=".8rem"
              >
                <Autocomplete
                  id="location-auto-complete"
                  options={addresses}
                  sx={{ width: 300 }}
                  disableCloseOnSelect
                  size="small"
                  renderOption={(props, option) => {
                    return (
                      <li {...props} key={option.id}>
                        {option.nome}
                      </li>
                    );
                  }}
                  renderInput={(params) => (
                    <TextField
                      label={t("locationModals.postModal.city")}
                      {...params}
                    />
                  )}
                  getOptionLabel={(option) => option?.nome}
                  value={fieldValues?.local}
                  onChange={(_, value) => {
                    handleChangeFieldValues("local", {
                      ...fieldValues?.local,
                      ...value,
                    });
                  }}
                  onInputChange={async (event, value) => {
                    if (value.length > 2) {
                      const res = await getAddresses(value);
                      if (res?.dados) {
                        setAddresses(res.dados);
                      }
                    }
                  }}
                />

                <TextField
                  id="outlined-required"
                  label={t("locationModals.postModal.location")}
                  size="small"
                  value={fieldValues?.local?.local || ""}
                  onChange={(e) =>
                    handleChangeFieldValues("local", {
                      ...fieldValues?.local,
                      local: e.target.value,
                    })
                  }
                  sx={{ ml: "1rem" }}
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
                  label={t("eventPage.common.startDateHour")}
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
                  id="hour-end"
                  name="endHour"
                  type="time"
                  label={t("eventPage.common.endHour")}
                  value={fieldValues.data_fim}
                  sx={{
                    height: "2rem",
                    ".MuiInputBase-root": {
                      height: "2rem",
                      borderRadius: ".25rem",
                    },
                  }}
                  InputLabelProps={{ shrink: true }}
                  onChange={(e) => {
                    handleChangeFieldValues("data_fim", e.target.value);
                    setAnchorDateEl(null);
                  }}
                />
              </Box>
            </Popover>

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
