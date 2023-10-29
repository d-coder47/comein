import React from "react";
import Leaflet from "../../components/Map";
import { Box, Button, Avatar } from "@mui/material";
import { useNavigate } from "react-router-dom";
import siteLogo from "../../assets/img/logo_cicv3.png";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const DisplayMap = () => {
  const navigate = useNavigate();

  return (
    <Box
      id="map-container"
      sx={{
        display: "flex",
        justifyContent: "flex-end",
      }}
    >
      <Box
        id="map-header"
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "0.125rem",
          marginLeft: "auto",
          "&:hover": {
            cursor: "pointer",
          },
          position: "fixed",
          zIndex: 9999,
          width: "95%",
        }}
      >
        <Avatar
          variant="square"
          src={siteLogo}
          alt="Come In"
          onClick={() => navigate("/")}
          sx={{
            marginTop: "1rem",
            width: "8rem",
            height: "auto",
            objectFit: "cover",
            cursor: "pointer",
            zIndex: 9999,
            "&:hover": {
              opacity: 0.8, // Adjust the opacity or add more styles as desired
            },
          }}
        />

        <Button
          onClick={() => navigate("/")}
          sx={{
            marginRight: "20px",
            width: "8rem",
            height: "auto",
            backgroundColor: "#33B3CC",
            color: "white",
            cursor: "pointer",
            "&:hover": {
              backgroundColor: "#743600", // Adjust the opacity or add more styles as desired
            },
          }}
        >
          <ArrowBackIcon
            sx={{
              color: "#fff",
              fontSize: "1rem",
            }}
          />
          Home
        </Button>
      </Box>
      <Leaflet />
    </Box>
  );
};

export default DisplayMap;
