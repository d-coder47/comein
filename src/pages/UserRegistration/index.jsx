import * as React from "react";
import logo from "../../assets/img/logo_cicv3.png";
import "./userRegistration.css";
import {
  Typography,
  Box,
  TextField,
  InputAdornment,
  Button,
  Divider,
  Grid,
  Avatar,
  MenuItem,
  Link,
  Autocomplete,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { GoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";
import { MuiTelInput } from "mui-tel-input";

import { useNavigate } from "react-router-dom";

import { useTranslation } from "react-i18next";

import validator from "validator";

import countries from "../../data/countries";

import useRegisterUser from "../../hooks/useRegisterUser";

export default function UserRegistration() {
  const navigate = useNavigate();

  const { t, i18n } = useTranslation();

  const [showPassword, setShowPassword] = React.useState(false);

  const [showEmailError, setShowEmailError] = React.useState(false);
  const [showPasswordError, setShowPasswordError] = React.useState(false);
  const [showNameError, setShowNameError] = React.useState(false);
  const [showSurnameError, setShowSurnameError] = React.useState(false);
  const [showNationalityError, setShowNationalityError] = React.useState(false);
  const [showResidenceError, setShowResidenceError] = React.useState(false);
  const [showContactError, setShowContactError] = React.useState(false);
  const [showDateError, setShowDateError] = React.useState(false);
  const [showGenderError, setShowGenderError] = React.useState(false);

  const [showRegisterForm, setShowRegisterForm] = React.useState(false);

  const { addUser, getAddresses } = useRegisterUser();

  const [addresses, setAddresses] = React.useState([]);

  const [formData, setFormData] = React.useState({
    email: "",
    password: "",
    name: "",
    surname: "",
    date: "",
    nationality: "",
    residence: "",
    contact: "",
    gender: "",
  });

  const [formErrors, setFormErrors] = React.useState({
    email: "",
    password: "",
    name: "",
    surname: "",
    date: "",
    nationality: "",
    residence: "",
    contact: "",
    gender: "",
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePhoneChange = (newValue) => {
    setFormData({
      ...formData,
      contact: newValue,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let errors = {};

    if (!showRegisterForm) {
      // Validate name field
      if (formData.email.trim() === "") {
        errors.email = t("registerpage.emailObrigatorio");
        setShowEmailError(true);
      } else {
        setShowEmailError(false);
      }

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

      if (formData.password.trim() === "") {
        errors.password = t("registerpage.passwordObrigatorio");
        setShowPasswordError(true);
      } else if (password.length < 6) {
        errors.password = t("registerpage.passwordTamanho");
        setShowPasswordError(true);
      } else {
        setShowPasswordError(false);
        setFormErrors({
          email: "",
          password: "",
        });
      }

      if (Object.keys(errors).length) {
        setFormErrors(errors);
      } else {
        setShowRegisterForm(true);
      }
    } else {
      if (formData.name.trim() === "") {
        errors.name = t("registerpage.nomeObrigatorio");
        setShowNameError(true);
      } else {
        setShowNameError(false);
      }

      if (formData.surname.trim() === "") {
        errors.surname = t("registerpage.sobrenomeObrigatorio");
        setShowSurnameError(true);
      } else {
        setShowSurnameError(false);
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
        const res = await addUser(
          formData.name,
          formData.email,
          formData.gender,
          formData.date
        );
        console.log(res);
        localStorage.setItem("authenticated", true);
        formData.password = "";
        localStorage.setItem("userInfo", JSON.stringify(formData));

        navigate("/");
      }
    }
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  React.useEffect(() => {
    i18n.changeLanguage(i18n.language);
  }, [i18n]);

  return (
    <div className="container">
      <div className="logoSection">
        <Avatar
          variant="square"
          className="logo"
          src={logo}
          alt="logo"
          sx={{
            width: "232px",
            height: "auto",
          }}
        />
      </div>
      <div className="panel">
        <div className="formContainer">
          <Typography
            variant="h6"
            sx={{
              marginTop: "1rem",
              marginBottom: "1rem",
            }}
          >
            {showRegisterForm
              ? t("registerpage.etapa2")
              : t("registerpage.etapa1")}
          </Typography>
          <Typography
            variant="h5"
            sx={{
              marginTop: "1rem",
              marginBottom: "1rem",
              fontWeight: "bold",
            }}
          >
            {t("registerpage.criarConta")}
          </Typography>

          {!showRegisterForm && (
            <GoogleLogin
              onSuccess={(credentialResponse) => {
                var decoded = jwt_decode(credentialResponse.credential);
                localStorage.setItem("userInfo", JSON.stringify(decoded));
                localStorage.setItem("authenticated", true);
                navigate("/");
              }}
              onError={() => {
                console.log("Login Failed");
              }}
            />
          )}

          {!showRegisterForm && (
            <>
              <Divider style={{ width: "80%" }}>
                <Typography
                  variant="h5"
                  sx={{
                    marginTop: "2rem",
                    marginBottom: "2rem",
                  }}
                >
                  {t("registerpage.ou")}
                </Typography>
              </Divider>

              <Typography
                variant="h6"
                sx={{
                  marginTop: "0.5rem",
                  marginBottom: "2rem",
                  fontWeight: "bold",
                }}
              >
                {t("registerpage.inscreverComEmail")}
              </Typography>
            </>
          )}
          <Box
            component="form"
            sx={{
              "& .MuiTextField-root": {
                m: 1,
                width: showRegisterForm ? "20ch" : "40ch",
              },
              display: "flex",
              flexDirection: "column",
            }}
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit}
          >
            {!showRegisterForm && (
              <>
                <TextField
                  id="emailField"
                  name="email"
                  value={formData.email}
                  error={showEmailError}
                  helperText={formErrors.email}
                  label={t("registerpage.email")}
                  variant="standard"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={handleInputChange}
                />
                <TextField
                  id="password"
                  label={t("registerpage.password")}
                  name="password"
                  variant="standard"
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
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </>
            )}

            {showRegisterForm && (
              <>
                <Grid
                  container
                  spacing={2}
                  justifyContent="center"
                  alignItems="center"
                >
                  <Grid item xs={6} textAlign="center">
                    <TextField
                      id="nameField"
                      name="name"
                      value={formData.name}
                      error={showNameError}
                      helperText={formErrors.name}
                      label={t("registerpage.nome")}
                      variant="standard"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      onChange={handleInputChange}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={6} textAlign="center">
                    <TextField
                      id="surnameField"
                      name="surname"
                      value={formData.surname}
                      error={showSurnameError}
                      helperText={formErrors.surname}
                      label={t("registerpage.sobrenome")}
                      variant="standard"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      onChange={handleInputChange}
                      fullWidth
                    />
                  </Grid>

                  <Grid item xs={6} textAlign="center">
                    <TextField
                      label={t("registerpage.genero")}
                      name="gender"
                      select
                      value={formData.gender}
                      error={showGenderError}
                      helperText={formErrors.gender}
                      onChange={handleInputChange}
                      variant="standard"
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

                  <Grid item xs={6} textAlign="center">
                    <TextField
                      label={t("registerpage.dataNascimento")}
                      name="date"
                      type="date"
                      value={formData.date}
                      error={showDateError}
                      helperText={formErrors.date}
                      onChange={handleInputChange}
                      variant="standard"
                      margin="normal"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      required
                      fullWidth
                    />
                  </Grid>

                  <Grid item xs={6} textAlign="center">
                    <Autocomplete
                      id="country-select-demo"
                      options={countries}
                      autoHighlight
                      getOptionLabel={(option) => option.label}
                      renderOption={(props, option) => (
                        <Box
                          component="li"
                          sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                          {...props}
                        >
                          <img
                            loading="lazy"
                            width="20"
                            src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                            srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                            alt=""
                          />
                          {option.label} ({option.code}) +{option.phone}
                        </Box>
                      )}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label={t("registerpage.nacionalidade")}
                          variant="standard"
                          name="nationality"
                          value={formData.nationality}
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
                      onInputChange={(event, value) => {
                        // Update formData.nationality as the user types
                        formData.nationality = value ? value.label : "";
                      }}
                      onChange={(event, value) => {
                        // Update formData.nationality when an option is selected
                        formData.nationality = value ? value.label : "";
                      }}
                    />
                  </Grid>

                  <Grid item xs={6} textAlign="center">
                    <Autocomplete
                      id="address-select"
                      options={addresses}
                      autoHighlight
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label={t("registerpage.residencia")}
                          variant="standard"
                          name="residence"
                          value={formData.residence}
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
                        formData.nationality = value;
                        if (value.length >= 2) {
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
                        formData.residence = value;
                      }}
                    />
                  </Grid>

                  <Grid item xs={6} textAlign="center">
                    <MuiTelInput
                      name="contact"
                      fullWidth
                      error={showContactError}
                      helperText={formErrors.contact}
                      label={t("registerpage.contato")}
                      variant="standard"
                      value={formData.contact}
                      onChange={handlePhoneChange}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </Grid>
                  <Grid item xs={6} textAlign="center"></Grid>
                </Grid>
              </>
            )}

            {showRegisterForm && (
              <Grid container justifyContent="center">
                <Typography
                  textAlign="center"
                  variant="h6"
                  sx={{
                    marginTop: "1rem",
                    marginBottom: "1rem",
                    fontSize: 14,
                    width: "50ch",
                  }}
                >
                  {t("registerpage.termosPoliticaParte1")}{" "}
                  <Link href="#" underline="none">
                    {t("registerpage.termosPoliticaParte2")}
                  </Link>
                  {t("registerpage.termosPoliticaParte3")}{" "}
                  <Link href="#" underline="none">
                    {t("registerpage.termosPoliticaParte4")}
                  </Link>
                </Typography>
              </Grid>
            )}

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
                }}
              >
                {showRegisterForm
                  ? t("registerpage.concluido")
                  : t("registerpage.continuar")}
              </Button>
            </Grid>
          </Box>
        </div>
      </div>
    </div>
  );
}
