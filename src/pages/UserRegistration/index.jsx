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

  const [formData, setFormData] = React.useState({
    name: "",
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
    console.log(formData);
    navigate("/");
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
              label="Endereço de email"
              helperText="Incorrect entry."
              variant="standard"
              focused
              onChange={handleInputChange}
            />

            <FormControl sx={{ m: 1, width: "40ch" }} variant="standard">
              <InputLabel
                htmlFor="standard-adornment-password"
                variant="standard"
                shrink={true}
              >
                Password
              </InputLabel>
              <Input
                variant="standard"
                name="password"
                onChange={handleInputChange}
                id="standard-adornment-password"
                type={showPassword ? "text" : "password"}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
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
