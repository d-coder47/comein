import { useState, useEffect } from "react";
import {
  Typography,
  Grid,
  Paper,
  Box,
  IconButton,
  Button,
  InputAdornment,
  TextField,
  FormLabel,
} from "@mui/material";

import { useNavigate } from "react-router-dom";

import { useTranslation } from "react-i18next";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import useRegisterUser from "../../hooks/useRegisterUser";

import { toast } from "react-toastify";

export default function ResetPassword() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfPassword, setShowConfPassword] = useState(false);

  const handleClickShowNewPassword = () => setShowNewPassword((show) => !show);

  const [showNewPasswordError, setShowNewPasswordError] = useState(false);
  const [showConfPasswordError, setShowConfPasswordError] = useState(false);

  const queryParameters = new URLSearchParams(window.location.search);
  const key = queryParameters.get("key");
  const email = queryParameters.get("email");

  const { verifyForgotPassEmailLink, changeForgotPass } = useRegisterUser();

  const [formData, setFormData] = useState({
    newPassword: "",
    confPassword: "",
  });

  const [formErrors, setFormErrors] = useState({
    newPassword: "",
    confPassword: "",
  });

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleClickShowConfPassword = () =>
    setShowConfPassword((show) => !show);

  useEffect(() => {
    async function fetchData() {
      const verfify_res = await verifyForgotPassEmailLink(email, key);
      if (!verfify_res.dados) {
        navigate("/");
      }
    }
    fetchData();
  }, []);

  const handleChangePassSubmit = async (e) => {
    e.preventDefault();

    let errors = {};

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
      const res = await changeForgotPass(email, formData.newPassword);
      if (res.dados) {
        toast.success(t("editProfilePage.palavraPassAtualizadoSucesso"));
      } else {
        toast.error(t("editProfilePage.erroAtualizarPalavraPasse"));
      }
    }
  };
  return (
    <Paper
      sx={{
        width: "100vw",
        height: "100vh",
        background: "#f3f3f3",

        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Button href="/">{t("forgotPassword.voltarHome")}</Button>

      <Box
        component="form"
        className="reset_pass_form"
        sx={{
          "& .MuiTextField-root": {
            m: 1,
            width: "40ch",
          },
          display: "flex",
          flexDirection: "column",
          width: "500px",
          height: "400px",
          alignItems: "center",
          justifyContent: "center",
          background: "#fff",
          marginTop: "10px",
        }}
        noValidate
        autoComplete="off"
        onSubmit={handleChangePassSubmit}
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
        <Grid
          container
          justifyContent="center"
          spacing={2}
          sx={{
            marginLeft: "0px",
            width: "100%",
          }}
        >
          <Box
            sx={{
              marginTop: "20px",
            }}
          >
            <Grid
              display="flex"
              flexDirection="column"
              justifyContent="center"
              item
              xs={12}
              textAlign="left"
            >
              <FormLabel
                id="new_reset_password_label"
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
                        {showNewPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid
              display="flex"
              flexDirection="column"
              justifyContent="center"
              item
              xs={12}
              textAlign="left"
            >
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
                        {showConfPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
          </Box>
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
  );
}
