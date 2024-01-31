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
  Modal,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import CloseIcon from "@mui/icons-material/Close";
import { GoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";

import { useNavigate } from "react-router-dom";

import { useTranslation, Trans } from "react-i18next";

import validator from "validator";

import useRegisterUser from "../../hooks/useRegisterUser";

import { toast } from "react-toastify";

const UserRegistration = () => {
  const navigate = useNavigate();

  const { t, i18n } = useTranslation();

  const [showPassword, setShowPassword] = React.useState(false);

  const [showEmailError, setShowEmailError] = React.useState(false);
  const [showPasswordError, setShowPasswordError] = React.useState(false);
  const [showNameError, setShowNameError] = React.useState(false);

  const { addUser, updateUser, getUser, getTermsPolicy, login, getUserByMail } =
    useRegisterUser();

  const [openTermsModal, setOpenTermsModal] = React.useState(false);
  const handleModalTermsOpen = () => setOpenTermsModal(true);
  const handleModalTermsClose = () => setOpenTermsModal(false);

  const [openPrivacityModal, setOpenPrivacityModal] = React.useState(false);
  const handleModalPrivacityOpen = () => setOpenPrivacityModal(true);
  const handleModalPrivacityClose = () => setOpenPrivacityModal(false);

  const [terms, setTerms] = React.useState();
  const [policy, setPolicy] = React.useState();

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

  const registeUserGoogleAccount = async (token, decode) => {
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

      if (user.dados) {
        localStorage.setItem("userInfo", JSON.stringify(user.dados));
        localStorage.setItem("authenticated", true);
        localStorage.setItem("userId", user.dados.id);
        navigate("/");
      } else {
        toast.error(t("registerpage.erroCadastro"));
      }
    } else {
      toast.error(t("registerpage.erroCadastro"));
    }

    // let email = userDecoded.email;
    // const addRes = await addUser(email);
    // if (!addRes) {
    //   toast.error(t("registerpage.erroCadastro"));
    // } else if (!addRes.data.id) {
    //   toast.error(t("registerpage.erroUserExiste"));
    // } else {
    //   localStorage.setItem("userID", addRes.data.id);
    //   localStorage.setItem("token", addRes.token);
    //   let userId = addRes.data.id;
    //   let token = addRes.token;
    //   let nome = userDecoded.name;
    //   let img_perfil = userDecoded.picture;
    //   const updateRes = await updateUser(
    //     "googleRegisterForm",
    //     null,
    //     null,
    //     null,
    //     null,
    //     null,
    //     userId,
    //     token,
    //     nome,
    //     "PUT",
    //     img_perfil,
    //     null
    //   );
    //   if (!updateRes) {
    //     toast.error(t("registerpage.erroCadastro"));
    //   } else {
    //     const user = await getUser(userId);
    //     localStorage.setItem("authenticated", true);
    //     localStorage.setItem("userInfo", JSON.stringify(user.dados));
    //     navigate("/editar-perfil");
    //   }
    // }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let errors = {};

    if (formData.name.trim() === "") {
      errors.name = t("registerpage.nomeObrigatorio");
      setShowNameError(true);
    } else {
      setShowNameError(false);
    }

    // Validate email field
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

    const passwordRegex =
      /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{7,}$/;

    if (formData.password.trim() === "") {
      errors.password = t("registerpage.passwordObrigatorio");
      setShowPasswordError(true);
    } else if (!passwordRegex.test(formData.password)) {
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
      console.log(errors);
    } else {
      const addUserRes = await addUser(formData.email, formData.password);

      if (!addUserRes) {
        toast.error(t("registerpage.erroCadastro"));
      } else if (
        addUserRes.data ===
        "Já tem uma conta utilizando o email: rubenmartins463@gmail.com"
      ) {
        toast.error(t("registerpage.erroUserExiste"));
      } else {
        localStorage.setItem("userID", addUserRes.data.id);

        let nome = formData.name;
        let _method = "PUT";

        const updateUserRes = await updateUser(
          "registerForm",
          null,
          null,
          null,
          null,
          null,
          addUserRes.data.id,
          addUserRes.token,
          nome,
          _method,
          null,
          null
        );

        if (!updateUserRes) {
          toast.error(t("registerpage.erroCadastro"));
        } else {
          const user = await getUser(addUserRes.data.id);
          localStorage.setItem("authenticated", true);
          localStorage.setItem("userInfo", JSON.stringify(user.dados));
          navigate("/");
        }
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
    const fetchData = async () => {
      try {
        const res = await getTermsPolicy();
        setTerms(res.termos);
        setPolicy(res.politicas);
      } catch (error) {
        console.error(error);
        // Handle error if necessary
      }
    };

    fetchData();
  }, []);

  return (
    <div className="registerContainer">
      <div className="logoSection">
        <Avatar
          variant="square"
          className="logo"
          src={logo}
          onClick={() => navigate("/")}
          alt="logo"
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
      <div className="registerPanel">
        <div className="registerFormContainer">
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

          <GoogleLogin
            locale={i18n.language}
            onSuccess={(credentialResponse) => {
              var decoded = jwt_decode(credentialResponse.credential);
              registeUserGoogleAccount(credentialResponse.credential, decoded);
            }}
            onError={() => {
              console.log("Login Failed");
            }}
          />

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

          <Box
            component="form"
            sx={{
              "& .MuiTextField-root": {
                m: 1,
                width: "40ch",
              },
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit}
          >
            <>
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
                <Trans i18nKey="registerpage.termosPoliticaParte1" />
                <Button
                  sx={{
                    fontSize: 14,
                    textTransform: "none",
                  }}
                  onClick={handleModalTermsOpen}
                >
                  {t("registerpage.termosPoliticaParte2")}
                </Button>
                {t("registerpage.termosPoliticaParte3")}{" "}
                <Button
                  sx={{
                    fontSize: 14,
                    textTransform: "none",
                  }}
                  onClick={handleModalPrivacityOpen}
                >
                  {t("registerpage.termosPoliticaParte4")}
                </Button>
              </Typography>
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
                {t("registerpage.concluido")}
              </Button>
            </Grid>

            <Modal
              open={openTermsModal}
              onClose={handleModalTermsClose}
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

                  maxHeight: "80vh",
                  overflow: "auto",
                }}
              >
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={handleModalTermsClose}
                  sx={{
                    position: "absolute",
                    top: 8,
                    right: 8,
                  }}
                >
                  <CloseIcon />
                </IconButton>
                <div dangerouslySetInnerHTML={{ __html: terms }} />
              </Box>
            </Modal>

            <Modal
              open={openPrivacityModal}
              onClose={handleModalPrivacityClose}
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
                  maxHeight: "80vh",
                  overflow: "auto",
                }}
              >
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={handleModalPrivacityClose}
                  sx={{
                    position: "absolute",
                    top: 8,
                    right: 8,
                  }}
                >
                  <CloseIcon />
                </IconButton>
                <div dangerouslySetInnerHTML={{ __html: policy }} />
              </Box>
            </Modal>
          </Box>
        </div>
      </div>
    </div>
  );
};

export default UserRegistration;
