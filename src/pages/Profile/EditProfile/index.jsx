import React from "react";
import NavBar from "../../../components/NavBar";
import { useNavigate } from "react-router-dom";
import {
  Typography,
  Avatar,
  Grid,
  Paper,
  Box,
  IconButton,
  Button,
  Tabs,
  Tab,
  List,
  InputAdornment,
  ListItemButton,
  ListItemText,
  TextField,
  ListItem,
  FormLabel,
  MenuItem,
  Autocomplete,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import { useTranslation } from "react-i18next";
import { MuiTelInput } from "mui-tel-input";

import useRegisterUser from "../../../hooks/useRegisterUser";

const EditProfile = () => {
  const navigate = useNavigate();
  const { addUser, getAddresses, updateUser, getUser, getTermsPolicy } =
    useRegisterUser();

  const [countries, setCountries] = React.useState([]);
  const [addresses, setAddresses] = React.useState([]);

  const [selectedIndex, setSelectedIndex] = React.useState(1);

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

  const [showPassword, setShowPassword] = React.useState(false);
  const [showPasswordError, setShowPasswordError] = React.useState(false);
  const [showEmailError, setShowEmailError] = React.useState(false);
  const [showNameError, setShowNameError] = React.useState(false);
  const [showSurnameError, setShowSurnameError] = React.useState(false);
  const [showNationalityError, setShowNationalityError] = React.useState(false);
  const [showResidenceError, setShowResidenceError] = React.useState(false);
  const [showContactError, setShowContactError] = React.useState(false);
  const [showDateError, setShowDateError] = React.useState(false);
  const [showGenderError, setShowGenderError] = React.useState(false);

  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const authenticated = localStorage.getItem("authenticated");

  const { t, i18n } = useTranslation();

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

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

  React.useEffect(() => {
    if (!authenticated) {
      navigate("/");
    }
  }, []);
  const handleEditProfileSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <>
      <NavBar />
      <div className="edit_profile_container">
        <Box
          sx={{
            backgroundColor: "#f8f8f8",

            padding: "2rem",
            height: "100%",
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={6} md={4}>
              <Paper
                elevation={3}
                className=""
                sx={{
                  padding: "1rem",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  width: "350px",
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
                    <ListItemText primary="Informações básicas" />
                  </ListItemButton>
                  <ListItemButton
                    selected={selectedIndex === 2}
                    onClick={(event) => handleListItemClick(event, 2)}
                  >
                    <ListItemText primary="Na web" />
                  </ListItemButton>
                  <ListItemButton
                    selected={selectedIndex === 3}
                    onClick={(event) => handleListItemClick(event, 3)}
                  >
                    <ListItemText primary="Sobre mim" />
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
                    padding: "1rem",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
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
                    Informações básicas
                  </Typography>
                  <Box
                    component="form"
                    sx={{
                      "& .MuiTextField-root": {
                        m: 1,
                        width: "42ch",
                      },
                      display: "flex",
                      flexDirection: "column",
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
                          id="surname_label"
                          sx={{
                            margin: "8px",
                          }}
                        >
                          {t("registerpage.sobrenome")}
                        </FormLabel>
                        <TextField
                          id="surnameField"
                          name="surname"
                          value={formData.surname}
                          error={showSurnameError}
                          helperText={formErrors.surname}
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
                          id="password _label"
                          sx={{
                            marginLeft: "8px",
                          }}
                        >
                          {t("registerpage.password")}
                        </FormLabel>
                        <TextField
                          id="password"
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
                          autoHighlight
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              variant="outlined"
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
                          onInputChange={async (event, value) => {
                            formData.nationality = value;
                            if (value.length >= 2 && value.length <= 4) {
                              const res = await getAddresses(value);
                              const newCountries = [];
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
                          autoHighlight
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              variant="outlined"
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
                            formData.residence = value;
                            if (value.length >= 2 && value.length <= 4) {
                              const res = await getAddresses(value);
                              const newAddresses = [];
                              const newGeoIds = [];
                              for (let key in res.dados) {
                                if (res.dados.hasOwnProperty(key)) {
                                  const value = res.dados[key];
                                  newAddresses.push(value.nome);
                                  newGeoIds.push({
                                    id: value.id,
                                    nome: value.nome,
                                  });
                                }
                              }
                              setAddresses(newAddresses);
                              setGeoIds(newGeoIds);
                            }
                          }}
                          onChange={(event, value) => {
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
                        }}
                      >
                        {t("registerpage.concluido")}
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
                    padding: "1rem",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
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
                    Na web
                  </Typography>
                </Paper>
              )}
              {selectedIndex === 3 && (
                <Paper
                  elevation={3}
                  className=""
                  sx={{
                    padding: "1rem",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
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
                    Sobre mim
                  </Typography>
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
