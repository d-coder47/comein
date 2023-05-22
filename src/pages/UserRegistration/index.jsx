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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { GoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";

import { useNavigate } from "react-router-dom";

export default function UserRegistration() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = React.useState(false);

  const [showEmailError, setShowEmailError] = React.useState(false);
  const [showPasswordError, setShowPasswordError] = React.useState(false);
  const [showNameError, setShowNameError] = React.useState(false);
  const [showSurnameError, setShowSurnameError] = React.useState(false);

  const [showRegisterForm, setShowRegisterForm] = React.useState(false);

  const [formData, setFormData] = React.useState({
    email: "",
    password: "",
    name: "",
    surname: "",
    day: "",
    month: "",
    year: "",
  });

  const [formErrors, setFormErrors] = React.useState({
    email: "",
    password: "",
    name: "",
    surname: "",
    day: "",
    month: "",
    year: "",
  });
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(showRegisterForm);

    let errors = {};

    if (!showRegisterForm) {
      // Validate name field
      if (formData.email.trim() === "") {
        errors.email = "Email is required";
        setShowEmailError(true);
      } else {
        setShowEmailError(false);
      }

      // Validate email field
      if (formData.email.trim() === "") {
        errors.email = "Email is required";
        setShowEmailError(true);
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        errors.email = "Email is invalid";
        setShowEmailError(true);
      } else {
        setShowEmailError(false);
        setFormErrors({
          email: "",
          password: "",
        });
      }

      if (formData.password.trim() === "") {
        errors.password = "Password is required";
        setShowPasswordError(true);
      } else if (password.length < 6) {
        errors.password = "Password should be at least 6 characters long";
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
        // Form is valid, submit or process the data here
        console.log("formData");
        setShowRegisterForm(true);
      }
    } else {
    }
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <div className="container">
      <section className="panel">
        <div className="formContainer">
          <Typography
            variant="h8"
            sx={{
              marginTop: "1rem",
              marginBottom: "1rem",
              fontWeight: "bold",
            }}
          >
            {showRegisterForm ? "Etapa 1 de 2" : "Etapa 2 de 2"}
          </Typography>
          <Typography
            variant="h5"
            sx={{
              marginTop: "1rem",
              marginBottom: "1rem",
              fontWeight: "bold",
            }}
          >
            Criar uma conta
          </Typography>

          {showRegisterForm && (
            <GoogleLogin
              onSuccess={(credentialResponse) => {
                var decoded = jwt_decode(credentialResponse.credential);
                localStorage.setItem("user", decoded);
                navigate("/");
              }}
              onError={() => {
                console.log("Login Failed");
              }}
            />
          )}

          {showRegisterForm && (
            <>
              <Divider variant="middle" sx={{ backgroundColor: "red" }} />

              <Typography
                variant="h5"
                sx={{
                  marginTop: "2rem",
                  marginBottom: "2rem",
                  fontWeight: "bold",
                }}
              >
                ou
              </Typography>

              <Typography
                variant="h8"
                sx={{
                  marginTop: "2rem",
                  marginBottom: "2rem",
                  fontWeight: "bold",
                }}
              >
                Inscrever-se com email
              </Typography>
            </>
          )}
          <Box
            component="form"
            sx={{
              "& .MuiTextField-root": {
                m: 1,
                width: showRegisterForm ? "40ch" : "20ch",
              },
              display: "flex",
              flexDirection: "column",
            }}
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit}
          >
            {showRegisterForm && (
              <>
                <TextField
                  id="emailField"
                  name="email"
                  value={formData.email}
                  error={showEmailError}
                  helperText={formErrors.email}
                  label="Endereço de email"
                  variant="standard"
                  focused
                  onChange={handleInputChange}
                />
                <TextField
                  id="password"
                  label="Password"
                  name="password"
                  variant="standard"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleInputChange}
                  error={showPasswordError}
                  helperText={formErrors.password}
                  focused
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

            {!showRegisterForm && (
              <>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <TextField
                      id="nameField"
                      name="name"
                      value={formData.name}
                      error={showNameError}
                      helperText={formErrors.name}
                      label="Nome"
                      variant="standard"
                      focused
                      onChange={handleInputChange}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      id="surnameField"
                      name="surname"
                      value={formData.surname}
                      error={showSurnameError}
                      helperText={formErrors.surname}
                      label="Sobrenome"
                      variant="standard"
                      focused
                      onChange={handleInputChange}
                    />
                  </Grid>
                </Grid>

                <Typography
                  variant="h6"
                  align="center"
                  sx={{
                    marginTop: "2rem",
                    marginBottom: "2rem",
                  }}
                  gutterBottom
                >
                  Insira sua data de nascimento
                </Typography>

                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <TextField
                      label="Dia"
                      name="day"
                      type="number"
                      value={formData.day}
                      onChange={handleInputChange}
                      variant="standard"
                      margin="normal"
                      focused
                      required
                    />
                  </Grid>

                  <Grid item xs={6}>
                    <FormControl variant="standard" margin="normal" required>
                      <InputLabel>Mês</InputLabel>
                      <Select
                        label="Mês"
                        name="month"
                        value={formData.month}
                        onChange={handleInputChange}
                      >
                        <MenuItem value="">Selecione</MenuItem>
                        <MenuItem value="Janeiro">Janeiro</MenuItem>
                        <MenuItem value="Fevereiro">Fevereiro</MenuItem>
                        <MenuItem value="Março">Março</MenuItem>
                        <MenuItem value="Abril">Abril</MenuItem>
                        <MenuItem value="Maio">Maio</MenuItem>
                        <MenuItem value="Junho">Junho</MenuItem>
                        <MenuItem value="Julho">Julho</MenuItem>
                        <MenuItem value="Agosto">Agosto</MenuItem>
                        <MenuItem value="Setembro">Setembro</MenuItem>
                        <MenuItem value="Novembro">Novembro</MenuItem>
                        <MenuItem value="Dezembro">Dezembro</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>

                  <Grid item xs={6}>
                    <TextField
                      label="Ano"
                      name="year"
                      type="number"
                      value={formData.year}
                      onChange={handleInputChange}
                      variant="standard"
                      margin="normal"
                      required
                      focused
                    />
                  </Grid>
                </Grid>
              </>
            )}

            <Button
              type="submit"
              variant="contained"
              sx={{ m: 3, backgroundColor: "#33b3cc", color: "#ffffff" }}
            >
              {showRegisterForm ? "Continuar" : "Concluido"}
            </Button>
          </Box>
        </div>
      </section>

      <div className="logoSection">
        <img src={logo} alt="logo" className="logo" />
      </div>
    </div>
  );
}
