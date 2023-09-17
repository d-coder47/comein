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
  Modal,
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

import { toast } from "react-toastify";

export default function Login() {
  const navigate = useNavigate();

  const [openForgotPassForm, setOpenForgotPassForm] = React.useState(false);
  const handleOpenForgotPassForm = () => setOpenForgotPassForm(true);
  const handleCloseForgotPassForm = () => setOpenForgotPassForm(false);

  const { t, i18n } = useTranslation();

  const [showPassword, setShowPassword] = React.useState(false);

  const [showEmailError, setShowEmailError] = React.useState(false);
  const [showPasswordError, setShowPasswordError] = React.useState(false);

  const { login, getUser, getUserByMail, sendForgotPassEmail } =
    useRegisterUser();

  const [forgotPassEmail, setForgotPassEmail] = React.useState("");
  const [formData, setFormData] = React.useState({
    email: "",
    password: "",
  });

  const [formErrors, setFormErrors] = React.useState({
    email: "",
    password: "",
  });

  const [showForgotPassEmailError, setShowForgotPassEmailError] =
    React.useState();

  const [formForgotPassEmailError, setFormForgotPassEmailError] =
    React.useState();
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const googleAccountLogin = async (token, decode) => {
    const loginGoogleRes = await login(
      decode.email,
      null,
      decode.name,
      token,
      decode.picture,
      "google"
    );

    if (loginGoogleRes.token) {
      const user = await getUserByMail(decode.email);
      if (!user.dados) {
        localStorage.setItem("userInfo", JSON.stringify(user.dados));
        localStorage.setItem("authenticated", true);
        localStorage.setItem("userId", user.dados.id);
        localStorage.setItem("token", loginGoogleRes.token);
        navigate("/");
      } else {
        toast.error(t("loginPage.erroLogin"));
      }
    } else {
      toast.error(t("loginPage.erroLogin"));
    }
  };

  const handleForgotPassMailChange = (event) => {
    setForgotPassEmail(event.target.value);
  };

  const handleForgotPasswordEmailSubmit = async (event) => {
    event.preventDefault();

    // Validate email field
    if (forgotPassEmail.trim() === "") {
      setFormForgotPassEmailError(t("registerpage.emailObrigatorio"));
      setShowForgotPassEmailError(true);
    } else if (!validator.isEmail(forgotPassEmail)) {
      setFormForgotPassEmailError(t("registerpage.emailInvalido"));
      setShowForgotPassEmailError(true);
    } else {
      setShowForgotPassEmailError(false);
      setFormForgotPassEmailError(t(""));
    }

    if (!showForgotPassEmailError) {
      const send_email_res = await sendForgotPassEmail(forgotPassEmail);

      if (send_email_res === 200) {
        toast.success(t("loginPage.sucessoEnviarMail"));
        setForgotPassEmail("");
      } else {
        toast.error(t("loginPage.erroEnviarMail"));
      }
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
    } else if (formData.password.length < 6) {
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
      const loginRes = await login(
        formData.email,
        formData.password,
        null,
        null,
        null,
        "form"
      );

      if (loginRes.token) {
        localStorage.setItem("userId", loginRes.data.id);
        localStorage.setItem("token", loginRes.token);
        const user = await getUser(loginRes.data.id);
        if (user.dados === "Não existem dados para retornar") {
          toast.error(t("loginPage.erroLogin"));
        } else {
          localStorage.setItem("userInfo", JSON.stringify(user.dados));
          localStorage.setItem("authenticated", true);

          navigate("/");
        }
      } else {
        toast.error(t("loginPage.erroLogin"));
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
    if (localStorage.getItem("authenticated")) {
      navigate("/");
    } else {
      localStorage.clear();
    }
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
              opacity: 0.8,
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
                width: "40ch",
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
                onClick={handleOpenForgotPassForm}
              >
                {t("loginPage.esqueceuPassword")}
              </Button>

              <Modal
                open={openForgotPassForm}
                onClose={handleCloseForgotPassForm}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box
                  sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: 400,
                    bgcolor: "background.paper",
                    border: "2px solid #000",
                    boxShadow: 24,
                    p: 4,
                  }}
                >
                  <IconButton
                    aria-label="close"
                    color="inherit"
                    size="small"
                    onClick={handleCloseForgotPassForm}
                    sx={{
                      position: "absolute",
                      top: 8,
                      right: 8,
                    }}
                  >
                    <CloseIcon />
                  </IconButton>
                  <Box
                    id="forgot-pass-form"
                    sx={{
                      alignItems: "center",
                      display: "flex",
                      justifyContent: "center",
                      flexDirection: "column",
                    }}
                    noValidate
                    autoComplete="off"
                  >
                    <Typography
                      id="modal-modal-title"
                      variant="h6"
                      component="h2"
                      fontWeight="bold"
                      fontSize="18px"
                      textAlign="center"
                      sx={{
                        marginBottom: "10px",
                      }}
                    >
                      {t("forgotPassword.resetPassword")}
                    </Typography>

                    <Typography
                      id="modal-paragraph"
                      variant="h6"
                      component="h2"
                      fontSize="16px"
                      textAlign="center"
                    >
                      {t("loginPage.forgotPassEnterMail")}
                    </Typography>
                    <TextField
                      id="forgot_pass_email"
                      variant="outlined"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      value={forgotPassEmail}
                      onChange={handleForgotPassMailChange}
                      margin="normal"
                      error={showForgotPassEmailError}
                      helperText={formForgotPassEmailError}
                      size="small"
                      sx={{
                        width: "40ch",
                      }}
                    />
                    <Button
                      variant="contained"
                      className="forgot_pass_submit"
                      color="primary"
                      onClick={handleForgotPasswordEmailSubmit}
                      sx={{
                        marginTop: "10px",
                        width: "30%",
                        borderRadius: "20px",
                        textTransform: "none",
                      }}
                    >
                      {t("loginPage.submit")}
                    </Button>
                  </Box>
                </Box>
              </Modal>
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
                {t("loginPage.login")}
              </Button>
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
              toast.error(t("loginPage.erroLogin"));
            }}
          />
        </div>
      </div>
    </div>
  );
}
