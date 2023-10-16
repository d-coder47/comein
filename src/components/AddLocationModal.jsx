import {
  Autocomplete,
  Box,
  Button,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import LocationMap from "./Map/LocationMap";
import axiosInstance from "../api/axiosInstance";
import { toast } from "react-toastify";
import useWindowDimensions from "../hooks/useWindowDimensions";

const AddLocationModal = ({ show, handleClose }) => {
  const [location, setLocation] = useState(null);

  const updateUserInfo = (location) => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const infoStringified = JSON.stringify({
      ...userInfo,
      latitude: location?.lat,
      longitude: location?.lng,
      vx_login: +userInfo?.vx_login + 1,
    });
    localStorage.setItem("userInfo", infoStringified);
  };

  const handleSave = async () => {
    console.log(location);
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const data = new FormData();

    data.append("_method", "PUT");
    data.append("id_utilizador", userInfo?.id);
    data.append("latitude", location?.lat);
    data.append("longitude", location?.lng);
    try {
      const response = await axiosInstance.post(
        `/utilizadores/addCoordenadas`,
        data,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            // Authorization:
            //   "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MiwibmFtZSI6Imh1bWJlcnRvIG5hc2NpbWVudG8iLCJleHBpcmVzX2luIjoxNjc3OTMxODIzfQ.vJnAshie-1hUo_VVKK0QInFI4NpBmx5obuWzOauK4B8",
          },
        }
      );

      if (response.status !== 200) {
        toast.error(
          "Ocorreu um erro ao adicionar as coordenadas. Tente mais tarde nas tuas definições."
        );
      }
      updateUserInfo(location);
      handleClose();
    } catch (e) {
      console.log(e.message);
    }
  };

  return (
    <Modal
      open={show}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "75vw",
          height: {
            xs: "85vh",
            sm: "85vh",
            md: "85vh",
            lg: "85vh",
            xl: "85vh",
          },
          bgcolor: "background.paper",
          borderRadius: ".25rem",
          boxShadow: 24,
          p: 4,
          overflowY: "auto",
        }}
      >
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Adicione a sua localização
        </Typography>
        <Typography id="modal-modal-description" sx={{ my: 2 }}>
          Ao adicionar a tua localização, iremos mapear todos os eventos e
          projetos perto de ti.
          <br />A tua localização é confidencial e só tu tens accesso a ela.
          {/* <br />
          Podes modificar a tua localização mais tarde nas tuas definições. */}
        </Typography>
        <LocationMap
          currentLocation={{ lat: null, lng: null }}
          handlePositionChange={(value) => setLocation(value)}
        />
        <Box mt="1rem" display="flex">
          <Box
            id="button-group"
            display="flex"
            gap="1rem"
            ml="auto"
            alignItems="flex-start"
          >
            <Button
              size="small"
              sx={{
                textTransform: "capitalize",
                "&:hover": { textDecoration: "underline" },
              }}
              onClick={handleClose}
            >
              Cancelar
            </Button>
            <Button
              variant="contained"
              size="small"
              sx={{
                textTransform: "capitalize",
              }}
              disabled={!location}
              onClick={handleSave}
            >
              Guardar
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default AddLocationModal;
