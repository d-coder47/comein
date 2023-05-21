import * as React from "react";
import logo from "../../assets/img/logo_cicv3.png";
import "./userRegistration.css";
import {
  Typography,
  Box,
  TextField,
  FormControl,
  InputLabel,
  Input,
  InputAdornment,
  Button,
  Divider,
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

  const handleSubmit = (e) => {
    e.preventDefault();

    let errors = {};

    // Validate name field
    if (formData.email.trim() === "") {
      errors.email = "Name is required";
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
      navigate("/");
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
            variant="h5"
            sx={{
              marginTop: "1rem",
              marginBottom: "1rem",
              fontWeight: "bold",
            }}
          >
            Criar uma conta
          </Typography>

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
          <Box
            component="form"
            sx={{
              "& .MuiTextField-root": { m: 1, width: "40ch" },
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

            <Button
              type="submit"
              variant="contained"
              sx={{ m: 3, backgroundColor: "#33b3cc", color: "#ffffff" }}
            >
              Submit
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
