import React from "react";
import NavBar from "../../../components/NavBar";
import { useNavigate, useParams } from "react-router-dom";
import {
  Typography,
  Grid,
  Paper,
  Box,
  IconButton,
  Button,
  List,
  InputAdornment,
  ListItemButton,
  ListItemText,
  TextField,
  FormLabel,
  MenuItem,
  Autocomplete,
  useMediaQuery,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import validator from "validator";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import { useTranslation } from "react-i18next";
import { MuiTelInput } from "mui-tel-input";

import useRegisterUser from "../../../hooks/useRegisterUser";
import useUserProfile from "../../../hooks/useUserProfile";

import { toast } from "react-toastify";

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

const EditProfile = () => {
  const params = useParams();
  const { userId } = params;
  const isMobileScreen = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  const [isSmallScreen, setIsSmallScreen] = React.useState(false);
  const navigate = useNavigate();
  const { getAddresses, updateUser, getUser, getCountries } = useRegisterUser();
  const { changePassword, addUserbio } = useUserProfile();

  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const authenticated = localStorage.getItem("authenticated");

  const [countries, setCountries] = React.useState([]);
  const [addresses, setAddresses] = React.useState([]);

  const [selectedIndex, setSelectedIndex] = React.useState(1);

  const [countrie, setCountrie] = React.useState(userInfo.nacionalidade);
  const [address, setAddress] = React.useState(userInfo.residencia);

  const [formData, setFormData] = React.useState({
    email: "",
    name: "",
    date: "",
    password: "",
    newPassword: "",
    confPassword: "",
    nationality: "",
    residence: "",
    contact: "",
    gender: "",
  });

  const [formErrors, setFormErrors] = React.useState({
    email: "",
    name: "",
    surname: "",
    password: "",
    newPassword: "",
    confPassword: "",
    date: "",
    nationality: "",
    residence: "",
    contact: "",
    gender: "",
  });

  const { t } = useTranslation();

  const [aboutMeValue, setAboutMeValue] = React.useState(userInfo.bio || ``);
  const [showPassword, setShowPassword] = React.useState(false);
  const [showNewPassword, setShowNewPassword] = React.useState(false);
  const [showConfPassword, setShowConfPassword] = React.useState(false);
  const [showPasswordError, setShowPasswordError] = React.useState(false);
  const [showNewPasswordError, setShowNewPasswordError] = React.useState(false);
  const [showConfPasswordError, setShowConfPasswordError] =
    React.useState(false);

  const [showEmailError, setShowEmailError] = React.useState(false);
  const [showNameError, setShowNameError] = React.useState(false);
  const [showNationalityError, setShowNationalityError] = React.useState(false);
  const [showResidenceError, setShowResidenceError] = React.useState(false);
  const [showContactError, setShowContactError] = React.useState(false);
  const [showDateError, setShowDateError] = React.useState(false);
  const [showGenderError, setShowGenderError] = React.useState(false);

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowNewPassword = () => setShowNewPassword((show) => !show);
  const handleClickShowConfPassword = () =>
    setShowConfPassword((show) => !show);

  const handlePhoneChange = (newValue) => {
    setFormData({
      ...formData,
      contact: newValue,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleAboutMeSubmit = async (event) => {
    event.preventDefault();
    const res = await addUserbio(userInfo.id, aboutMeValue);

    if (res.dados === "Guardado com sucesso") {
      toast.success(t("editProfilePage.sucessoAtualizarBio"));
      setAboutMeValue(aboutMeValue);
      const user = await getUser(userId);
      localStorage.setItem("userInfo", JSON.stringify(user.dados));
    } else {
      toast.success(t("editProfilePage.sucessoAtualizarBio"));
    }
  };

  React.useEffect(() => {
    if (!authenticated || userId !== userInfo.id) {
      navigate("/");
    }
    setFormData({
      ...formData,
      name: userInfo.nome,
      email: userInfo.email,
    });
    if (userInfo.sexo) {
      setFormData({
        ...formData,
        date: userInfo.data_nasc,
        nationality: userInfo.nacionalidade,
        contact: userInfo.contatos,
        gender: userInfo.sexo,
        residence: userInfo.residencia,
      });
    }
  }, []);

  React.useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 1400);
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Initial check

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleAboutMeChange = (value) => {
    setAboutMeValue(value);
  };

  const handleChangePassSubmit = async (e) => {
    e.preventDefault();

    let errors = {};

    if (formData.password.trim() === "") {
      errors.password = t("editProfilePage.palavraPasseAtualObrigatorio");
      setShowPasswordError(true);
    } else {
      setShowPasswordError(false);
    }

    if (formData.newPassword.trim() === "") {
      errors.newPassword = t("editProfilePage.palavraPasseNovaObrigatorio");
      setShowNewPasswordError(true);
    } else {
      setShowNewPasswordError(false);
    }

    if (formData.confPassword.trim() === "") {
      errors.confPassword = t(
        "editProfilePage.confPalavraPasseNovaObrigatorio"
      );
      setShowConfPasswordError(true);
    } else {
      setShowConfPasswordError(false);
    }

    if (formData.newPassword.trim() !== formData.confPassword.trim()) {
      errors.confPassword = t("editProfilePage.palavraPasseNCoincidem");
      setShowConfPasswordError(true);
    } else {
      setShowConfPasswordError(false);
    }

    if (formData.confPassword.trim() === "") {
      errors.confPassword = t("editProfilePage.confPassObrigatorio");
      setShowConfPasswordError(true);
    } else {
      setShowConfPasswordError(false);
    }

    if (Object.keys(errors).length) {
      setFormErrors(errors);
    } else {
      const res = await changePassword(
        userInfo.id,
        formData.password,
        formData.newPassword
      );
      if (res.token) {
        toast.success(t("editProfilePage.palavraPassAtualizadoSucesso"));

        localStorage.setItem("token", res.token);
      } else {
        toast.error(t("editProfilePage.erroAtualizarPalavraPasse"));
      }
    }
  };

  const handleEditProfileSubmit = async (e) => {
    e.preventDefault();

    let errors = {};
    // Validate email field
    if (formData.email.trim() === "") {
      errors.email = t("registerpage.emailObrigatorio");
      setShowEmailError(true);
    } else if (!validator.isEmail(formData.email)) {
      errors.email = t("registerpage.emailInvalido");
      setShowEmailError(true);
    } else {
      setShowEmailError(false);
      setFormErrors({
        email: "",
        password: "",
      });
    }

    if (formData.name.trim() === "") {
      errors.name = t("registerpage.nomeObrigatorio");
      setShowNameError(true);
    } else {
      setShowNameError(false);
    }

    if (formData.date.trim() === "") {
      errors.date = t("registerpage.dataNascObrigatorio");
      setShowDateError(true);
    } else {
      setShowDateError(false);
    }

    if (formData.nationality.trim() === "") {
      errors.nationality = t("registerpage.nacionalidadeObrigatorio");
      setShowNationalityError(true);
    } else {
      setShowNationalityError(false);
    }

    if (formData.residence.trim() === "") {
      errors.residence = t("registerpage.residenciaObrigatorio");
      setShowResidenceError(true);
    } else {
      setShowResidenceError(false);
    }

    if (formData.contact.trim() === "") {
      errors.contact = t("registerpage.contatoObrigatorio");
      setShowContactError(true);
    } else {
      setShowContactError(false);
    }

    if (formData.gender.trim() === "") {
      errors.gender = t("registerpage.generoObrigatorio");
      setShowGenderError(true);
    } else {
      setShowGenderError(false);
    }
    if (Object.keys(errors).length) {
      setFormErrors(errors);
    } else {
      let token = localStorage.getItem("token");

      const nacionalidades = await getCountries(
        formData.nationality.slice(0, 4),
        token
      );
      const residencias = await getAddresses(
        formData.residence.slice(0, 4),
        token
      );

      let id_geografia_nacionalidade;
      let id_geografia_residencia;
      nacionalidades.dados.map((item) => {
        if (item.nacionalidade === formData.nationality) {
          id_geografia_nacionalidade = item.id;
        }
      });

      nacionalidades.dados.map((item) => {
        if (item.nacionalidade === formData.nationality) {
          id_geografia_nacionalidade = item.id;
        }
      });

      residencias.dados.map((item) => {
        if (item.nome === formData.residence) {
          id_geografia_residencia = item.id;
        }
      });

      let sexo = formData.gender;
      let data_nasc = formData.date;
      let contatos = formData.contact;
      let residencia = id_geografia_residencia;
      let nacionalidade = id_geografia_nacionalidade;
      let userId = userInfo.id;

      let nome = formData.name;
      let _method = "PUT";
      const res = await updateUser(
        "editProfileForm",
        sexo,
        data_nasc,
        contatos,
        residencia,
        nacionalidade,
        userId,
        token,
        nome,
        _method
      );

      if (!res) {
        toast.error(t("editProfilePage.erroAtualizarPerfil"));
      } else {
        const user = await getUser(userId);
        localStorage.setItem("userInfo", JSON.stringify(user.dados));
        toast.success(t("editProfilePage.perfilAtualizadoSucesso"));
      }
    }
  };
  return (
    <>
      <NavBar />
      <div className="edit_profile_container">
        <Box
          sx={{
            background: "#f8f8f8",
            padding: {
              xs: "0",
              sm: "0",
              md: "2rem",
              lg: "2rem",
              xl: "2rem",
            },
            height: "100%",
          }}
        >
          <Grid
            container
            spacing={2}
            sx={{
              ...(isMobileScreen
                ? {
                    flexDirection: "column",
                    display: "flex",
                    justifyContent: "center",
                  }
                : {}),
            }}
          >
            <Grid item xs={6} md={4}>
              <Paper
                elevation={3}
                className=""
                sx={{
                  // Styles for larger displays
                  ...(isMobileScreen
                    ? {}
                    : {
                        padding: "1rem",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        width: "350px",
                        transformOrigin: "top left",
                        transform: isSmallScreen ? "scale(0.88)" : "scale(1)",
                      }),

                  // Styles for small displays
                  ...(isMobileScreen
                    ? {
                        paddingTop: "10px",
                        paddingLeft: "10px",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        width: "100vw",
                        transformOrigin: "top center",
                        transform: isSmallScreen ? "scale(0.88)" : "scale(1)",
                      }
                    : {}),
                }}
              >
                <List
                  component="nav"
                  sx={{
                    width: "100%",
                  }}
                  aria-label="secondary mailbox folder"
                >
                  <ListItemButton
                    selected={selectedIndex === 1}
                    onClick={(event) => handleListItemClick(event, 1)}
                  >
                    <ListItemText
                      primary={t("editProfilePage.informaçõesBasicas")}
                    />
                  </ListItemButton>
                  <ListItemButton
                    selected={selectedIndex === 2}
                    onClick={(event) => handleListItemClick(event, 2)}
                  >
                    <ListItemText
                      primary={t("editProfilePage.mudarPalavraPasse")}
                    />
                  </ListItemButton>
                  <ListItemButton
                    selected={selectedIndex === 3}
                    onClick={(event) => handleListItemClick(event, 3)}
                  >
                    <ListItemText primary={t("editProfilePage.sobreMim")} />
                  </ListItemButton>
                </List>
              </Paper>
            </Grid>
            <Grid item xs={6} md={8}>
              {selectedIndex === 1 && (
                <Paper
                  elevation={3}
                  className=""
                  sx={{
                    // Styles for larger displays
                    ...(isMobileScreen
                      ? {}
                      : {
                          padding: "1rem",
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          transformOrigin: "top left",
                          transform: isSmallScreen ? "scale(0.88)" : "scale(1)",
                        }),
                    // Styles for small displays
                    ...(isMobileScreen
                      ? {
                          width: "100vw",
                          paddingTop: "10px",
                          paddingLeft: "10px",
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          transformOrigin: "top center",
                          transform: isSmallScreen ? "scale(0.88)" : "scale(1)",
                        }
                      : {}),
                  }}
                >
                  <Typography
                    variant="h5"
                    sx={{
                      marginTop: "1rem",
                      marginBottom: "1rem",
                      fontWeight: "bold",
                    }}
                  >
                    {t("editProfilePage.informaçõesBasicas")}
                  </Typography>
                  <Box
                    component="form"
                    sx={{
                      // Styles for larger displays
                      ...(isMobileScreen
                        ? {}
                        : {
                            "& .MuiTextField-root": {
                              m: 1,
                              width: "42ch",
                            },
                            display: "flex",
                            flexDirection: "column",
                          }),
                      // Styles for small displays
                      ...(isMobileScreen
                        ? {
                            "& .MuiTextField-root": {
                              m: 1,
                              width: "25ch",
                              display: "flex",
                              flexDirection: "row",
                            },
                          }
                        : {}),
                    }}
                    noValidate
                    autoComplete="off"
                    onSubmit={handleEditProfileSubmit}
                  >
                    <Grid
                      container
                      spacing={2}
                      justifyContent="center"
                      alignItems="center"
                      sx={{
                        maxWidth: "800px",
                      }}
                    >
                      <Grid item xs={6} textAlign="left">
                        <FormLabel
                          id="name_label"
                          sx={{
                            marginLeft: "8px",
                          }}
                        >
                          {t("registerpage.nome")}
                        </FormLabel>
                        <TextField
                          id="nameField"
                          name="name"
                          value={formData.name}
                          error={showNameError}
                          helperText={formErrors.name}
                          variant="outlined"
                          InputLabelProps={{
                            shrink: true,
                          }}
                          onChange={handleInputChange}
                          fullWidth
                        />
                      </Grid>

                      <Grid item xs={6} textAlign="left">
                        <FormLabel
                          id="email_label"
                          sx={{
                            marginLeft: "8px",
                          }}
                        >
                          {t("registerpage.email")}
                        </FormLabel>
                        <TextField
                          id="editEmailField"
                          name="email"
                          value={formData.email}
                          error={showEmailError}
                          helperText={formErrors.email}
                          variant="outlined"
                          InputLabelProps={{
                            shrink: true,
                          }}
                          onChange={handleInputChange}
                        />
                      </Grid>

                      <Grid item xs={6} textAlign="left">
                        <FormLabel
                          id="gender_label"
                          sx={{
                            margin: "8px",
                          }}
                        >
                          {t("registerpage.genero")}
                        </FormLabel>
                        <TextField
                          name="gender"
                          select
                          value={formData.gender}
                          error={showGenderError}
                          helperText={formErrors.gender}
                          onChange={handleInputChange}
                          variant="outlined"
                          fullWidth
                          InputLabelProps={{
                            shrink: true,
                          }}
                        >
                          <MenuItem value="">
                            <em>{t("registerpage.euSou")}</em>
                          </MenuItem>
                          <MenuItem value="F">
                            {t("registerpage.feminino")}
                          </MenuItem>
                          <MenuItem value="M">
                            {t("registerpage.masculino")}
                          </MenuItem>
                        </TextField>
                      </Grid>

                      <Grid item xs={6} textAlign="left">
                        <FormLabel
                          id="date_label"
                          sx={{
                            margin: "8px",
                          }}
                        >
                          {t("registerpage.dataNascimento")}
                        </FormLabel>
                        <TextField
                          name="date"
                          type="date"
                          value={formData.date}
                          error={showDateError}
                          helperText={formErrors.date}
                          onChange={handleInputChange}
                          variant="outlined"
                          margin="normal"
                          InputLabelProps={{
                            shrink: true,
                          }}
                          required
                          fullWidth
                        />
                      </Grid>

                      <Grid item xs={6} textAlign="left">
                        <FormLabel
                          id="nationality_label"
                          sx={{
                            margin: "8px",
                          }}
                        >
                          {t("registerpage.nacionalidade")}
                        </FormLabel>
                        <Autocomplete
                          id="country-select"
                          options={countries}
                          value={countrie}
                          autoHighlight
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              variant="outlined"
                              name="nationality"
                              value={countrie}
                              error={showNationalityError}
                              helperText={formErrors.nationality}
                              fullWidth
                              InputLabelProps={{
                                shrink: true,
                              }}
                              inputProps={{
                                ...params.inputProps,
                                autoComplete: "new-password", // disable autocomplete and autofill
                              }}
                            />
                          )}
                          onInputChange={async (event, value) => {
                            if (value.length >= 2) {
                              const res = await getCountries(value);
                              const newCountries = [];
                              const newNationalityGeoIds = [];
                              for (let key in res.dados) {
                                if (res.dados.hasOwnProperty(key)) {
                                  const value = res.dados[key];

                                  newCountries.push(value.nacionalidade);
                                }
                              }
                              setCountries(newCountries);
                            }
                          }}
                          onChange={(event, value) => {
                            setCountrie(value);
                            formData.nationality = value;
                          }}
                        />
                      </Grid>

                      <Grid item xs={6} textAlign="left">
                        <FormLabel
                          id="residence_label"
                          sx={{
                            margin: "8px",
                          }}
                        >
                          {t("registerpage.residencia")}
                        </FormLabel>
                        <Autocomplete
                          id="address-select"
                          options={addresses}
                          value={address}
                          autoHighlight
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              variant="outlined"
                              name="residence"
                              value={address}
                              error={showResidenceError}
                              helperText={formErrors.residence}
                              fullWidth
                              InputLabelProps={{
                                shrink: true,
                              }}
                              inputProps={{
                                ...params.inputProps,
                                autoComplete: "new-password", // disable autocomplete and autofill
                              }}
                            />
                          )}
                          onInputChange={async (event, value) => {
                            formData.residence = value;
                            if (value.length >= 2 && value.length <= 4) {
                              const res = await getAddresses(value);
                              const newAddresses = [];
                              for (let key in res.dados) {
                                if (res.dados.hasOwnProperty(key)) {
                                  const value = res.dados[key];
                                  newAddresses.push(value.nome);
                                }
                              }
                              setAddresses(newAddresses);
                            }
                          }}
                          onChange={(event, value) => {
                            setAddress(value);
                            formData.residence = value;
                          }}
                        />
                      </Grid>

                      <Grid item xs={6} textAlign="left">
                        <FormLabel
                          id="contact_label"
                          sx={{
                            margin: "8px",
                          }}
                        >
                          {t("registerpage.contato")}
                        </FormLabel>
                        <MuiTelInput
                          name="contact"
                          fullWidth
                          error={showContactError}
                          helperText={formErrors.contact}
                          variant="outlined"
                          value={formData.contact}
                          onChange={handlePhoneChange}
                          InputLabelProps={{
                            shrink: true,
                          }}
                        />
                      </Grid>
                      <Grid item xs={6} textAlign="center"></Grid>
                    </Grid>
                    <Grid container justifyContent="center">
                      <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        sx={{
                          m: 3,
                          color: "#ffffff",
                          width: "20ch",
                          borderRadius: "16px",
                          textTransform: "none",
                        }}
                      >
                        {t("editProfilePage.guardar")}
                      </Button>
                    </Grid>
                  </Box>
                </Paper>
              )}
              {selectedIndex === 2 && (
                <Paper
                  elevation={3}
                  className=""
                  sx={{
                    // Styles for larger displays
                    ...(isMobileScreen
                      ? {}
                      : {
                          padding: "1rem",
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          transformOrigin: "top left",
                          transform: isSmallScreen ? "scale(0.88)" : "scale(1)",
                        }),
                    // Styles for small displays
                    ...(isMobileScreen
                      ? {
                          paddingTop: "10px",
                          paddingLeft: "10px",
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          width: "100vw",
                          transformOrigin: "top center",
                          transform: isSmallScreen ? "scale(0.88)" : "scale(1)",
                        }
                      : {}),
                  }}
                >
                  <Typography
                    variant="h5"
                    sx={{
                      marginTop: "1rem",
                      marginBottom: "1rem",
                      fontWeight: "bold",
                    }}
                  >
                    {t("editProfilePage.mudarPalavraPasse")}
                  </Typography>

                  <Box
                    component="form"
                    className="change_pass_form"
                    sx={{
                      "& .MuiTextField-root": {
                        m: 1,
                        width: "40ch",
                      },
                      display: "flex",
                      flexDirection: "column",
                    }}
                    noValidate
                    autoComplete="off"
                    onSubmit={handleChangePassSubmit}
                  >
                    <Grid
                      container
                      spacing={2}
                      justifyContent="center"
                      alignItems="center"
                      display="flex"
                      flexDirection="column"
                    >
                      <Grid item xs={6} textAlign="left">
                        <FormLabel
                          id="change_password _label"
                          sx={{
                            marginLeft: "8px",
                          }}
                        >
                          {t("registerpage.password")}
                        </FormLabel>
                        <TextField
                          id="change_password"
                          name="password"
                          variant="outlined"
                          type={showPassword ? "text" : "password"}
                          value={formData.password}
                          onChange={handleInputChange}
                          error={showPasswordError}
                          helperText={formErrors.password}
                          InputLabelProps={{
                            shrink: true,
                          }}
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconButton
                                  aria-label="toggle password visibility"
                                  onClick={handleClickShowPassword}
                                  onMouseDown={handleMouseDownPassword}
                                  edge="end"
                                >
                                  {showPassword ? (
                                    <VisibilityOff />
                                  ) : (
                                    <Visibility />
                                  )}
                                </IconButton>
                              </InputAdornment>
                            ),
                          }}
                        />
                      </Grid>

                      <Grid item xs={6} textAlign="left">
                        <FormLabel
                          id="new_password _label"
                          sx={{
                            marginLeft: "8px",
                          }}
                        >
                          {t("editProfilePage.novoPass")}
                        </FormLabel>
                        <TextField
                          id="new_password"
                          name="newPassword"
                          variant="outlined"
                          type={showNewPassword ? "text" : "password"}
                          value={formData.newPassword}
                          onChange={handleInputChange}
                          error={showNewPasswordError}
                          helperText={formErrors.newPassword}
                          InputLabelProps={{
                            shrink: true,
                          }}
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconButton
                                  aria-label="toggle password visibility"
                                  onClick={handleClickShowNewPassword}
                                  onMouseDown={handleMouseDownPassword}
                                  edge="end"
                                >
                                  {showNewPassword ? (
                                    <VisibilityOff />
                                  ) : (
                                    <Visibility />
                                  )}
                                </IconButton>
                              </InputAdornment>
                            ),
                          }}
                        />
                      </Grid>
                      <Grid item xs={6} textAlign="left">
                        <FormLabel
                          id="conf_password_label"
                          sx={{
                            marginLeft: "8px",
                          }}
                        >
                          {t("editProfilePage.confirmPass")}
                        </FormLabel>
                        <TextField
                          id="conf_password"
                          name="confPassword"
                          variant="outlined"
                          type={showConfPassword ? "text" : "password"}
                          value={formData.confPassword}
                          onChange={handleInputChange}
                          error={showConfPasswordError}
                          helperText={formErrors.confPassword}
                          InputLabelProps={{
                            shrink: true,
                          }}
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconButton
                                  aria-label="toggle password visibility"
                                  onClick={handleClickShowConfPassword}
                                  onMouseDown={handleMouseDownPassword}
                                  edge="end"
                                >
                                  {showConfPassword ? (
                                    <VisibilityOff />
                                  ) : (
                                    <Visibility />
                                  )}
                                </IconButton>
                              </InputAdornment>
                            ),
                          }}
                        />
                      </Grid>
                    </Grid>
                    <Grid container justifyContent="center">
                      <Button
                        type="submit"
                        variant="contained"
                        className="change_pass_button"
                        color="primary"
                        sx={{
                          m: 3,
                          color: "#ffffff",
                          width: "20ch",
                          borderRadius: "16px",
                          textTransform: "none",
                        }}
                      >
                        {t("editProfilePage.guardar")}
                      </Button>
                    </Grid>
                  </Box>
                </Paper>
              )}
              {selectedIndex === 3 && (
                <Paper
                  elevation={3}
                  className=""
                  sx={{
                    // Styles for larger displays
                    ...(isMobileScreen
                      ? {}
                      : {
                          padding: "1rem",
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          transformOrigin: "top left",
                          transform: isSmallScreen ? "scale(0.88)" : "scale(1)",
                        }),
                    // Styles for small displays
                    ...(isMobileScreen
                      ? {
                          paddingTop: "10px",
                          paddingLeft: "10px",
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          width: "100vw",
                          transformOrigin: "top center",
                          transform: isSmallScreen ? "scale(0.88)" : "scale(1)",
                        }
                      : {}),
                  }}
                >
                  <Typography
                    variant="h5"
                    sx={{
                      marginTop: "1rem",
                      marginBottom: "1rem",
                      fontWeight: "bold",
                    }}
                  >
                    {t("editProfilePage.sobreMim")}
                  </Typography>

                  <Box
                    component="form"
                    onSubmit={handleAboutMeSubmit}
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                      width: "100%",
                      height: "200px",
                    }}
                  >
                    <ReactQuill
                      theme="snow"
                      modules={editorModules}
                      formats={editorFormats}
                      value={aboutMeValue}
                      placeholder={t("editProfilePage.defaultDescription")}
                      onChange={
                        (value) => {
                          console.log(value);
                          handleAboutMeChange(value);
                        }
                        // handleChangeFieldValues("descricao", value)
                      }
                    />

                    <Button
                      variant="contained"
                      color="primary"
                      type="submit"
                      sx={{
                        // Styles for larger displays
                        ...(isMobileScreen
                          ? {}
                          : {
                              width: "30%",
                              borderRadius: "20px",
                              textTransform: "none",
                              marginTop: "60px",
                            }),
                        // Styles for small displays
                        ...(isMobileScreen
                          ? {
                              width: "40%",
                              borderRadius: "15px",
                              textTransform: "none",
                              marginTop: "10px",
                            }
                          : {}),
                      }}
                    >
                      {t("editProfilePage.guardar")}
                    </Button>
                  </Box>
                </Paper>
              )}
            </Grid>
          </Grid>
        </Box>
      </div>
    </>
  );
};

export default EditProfile;
