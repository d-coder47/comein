import * as React from "react";
import logo from "../../assets/img/logo_cicv3.png";
import "./loginPage.css";
import {
  Typography,
  Box,
  TextField,
  InputAdornment,
  Button,
  Divider,
  Grid,
  Avatar,
  Link,
  Alert,
  Collapse,
  AlertTitle,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import CloseIcon from "@mui/icons-material/Close";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { GoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";

import { useNavigate } from "react-router-dom";

import { useTranslation } from "react-i18next";

import validator from "validator";

import useRegisterUser from "../../hooks/useRegisterUser";

export default function Login() {
  const navigate = useNavigate();

  const { t, i18n } = useTranslation();

  const [showPassword, setShowPassword] = React.useState(false);

  const [showEmailError, setShowEmailError] = React.useState(false);
  const [showPasswordError, setShowPasswordError] = React.useState(false);

  const [showRegisterForm, setShowRegisterForm] = React.useState(false);

  const [openLoginError, setOpenLoginError] = React.useState(false);

  const { login, getUser, getUserByMail } = useRegisterUser();

  const [formData, setFormData] = React.useState({
    email: "",
    password: "",
  });

  const [formErrors, setFormErrors] = React.useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const googleAccountLogin = async (token, decode) => {
    const user = await getUserByMail(decode.email);
    if (user) {
      localStorage.setItem("userInfo", JSON.stringify(user.dados));
      localStorage.setItem("authenticated", true);
      navigate("/");
    } else {
      setOpenLoginError(true);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let errors = {};

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
      const loginRes = await login(formData.email, formData.password);

      if (loginRes.token) {
        localStorage.setItem("userId", loginRes.data.id);
        localStorage.setItem("token", loginRes.token);
        const user = await getUser(loginRes.data.id);
        if (user.dados === "Não existem dados para retornar") {
          setOpenLoginError(true);
        } else {
          localStorage.setItem("userInfo", JSON.stringify(user.dados));
          localStorage.setItem("authenticated", true);
          navigate("/");
        }
      } else {
        setOpenLoginError(true);
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

  React.useEffect(() => {
    localStorage.clear();
  }, []);
  return (
    <div className="container">
      <div className="logoSection">
        <Avatar
          variant="square"
          className="logo"
          src={logo}
          alt="logo"
          onClick={() => navigate("/")}
          sx={{
            width: "232px",
            height: "auto",
            cursor: "pointer",
            "&:hover": {
              opacity: 0.8, // Adjust the opacity or add more styles as desired
            },
          }}
        />
      </div>
      <div className="panel">
        <div className="formContainer">
          <Typography
            variant="h5"
            sx={{
              marginTop: "1rem",
              marginBottom: "1rem",
              fontWeight: "bold",
            }}
          >
            {t("loginPage.fazerLogin")}
          </Typography>

          <Grid container justifyContent="center">
            <Typography
              variant="h6"
              sx={{
                marginTop: "1rem",
                marginBottom: "2rem",
                fontSize: 13,
              }}
            >
              {t("loginPage.novoUsuario")}{" "}
              <Link href="/user-registration" underline="none">
                {t("loginPage.crieConta")}
              </Link>
            </Typography>
          </Grid>

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

            <Grid container justifyContent="right">
              <Button
                sx={{
                  fontSize: 13,
                  textTransform: "none",
                }}
              >
                Esqueceu-se da palavra-passe?
              </Button>
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
                {t("loginPage.login")}
              </Button>
            </Grid>
            <Grid>
              <Collapse in={openLoginError}>
                <Alert
                  severity="error"
                  action={
                    <IconButton
                      aria-label="close"
                      color="inherit"
                      size="small"
                      onClick={() => {
                        setOpenLoginError(false);
                      }}
                    >
                      <CloseIcon fontSize="inherit" />
                    </IconButton>
                  }
                  sx={{ mb: 2 }}
                >
                  <AlertTitle>
                    <strong>{t("loginPage.erroLogin")}</strong>
                  </AlertTitle>
                </Alert>
              </Collapse>
            </Grid>
          </Box>
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
          <GoogleLogin
            onSuccess={(credentialResponse) => {
              var decoded = jwt_decode(credentialResponse.credential);
              googleAccountLogin(credentialResponse.credential, decoded);
            }}
            onError={() => {
              console.log("Login Failed");
              setOpenLoginError(true);
            }}
          />
        </div>
      </div>
    </div>
  );
}
