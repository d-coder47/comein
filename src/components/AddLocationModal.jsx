import {
  Autocomplete,
  Box,
  Button,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import LocationMap from "./Map/LocationMap";

const AddLocationModal = ({ show, handleClose }) => {
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
        }}
      >
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Adicione a sua localização
        </Typography>
        <Typography id="modal-modal-description" sx={{ my: 2 }}>
          Ao adicionar a tua localização, iremos mapear todos os eventos e
          projetos perto de ti.
          <br />A tua localização é confidencial e só tu tens accesso a ela.
        </Typography>
        <LocationMap
          currentLocation={{ lat: null, lng: null }}
          handlePositionChange={
            (value) => {} // setLocation({ ...location, ...value })
          }
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
              sx={{ textTransform: "capitalize" }}
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
