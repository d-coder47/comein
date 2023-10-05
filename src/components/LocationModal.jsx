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
import useRegisterUser from "../hooks/useRegisterUser";

const LocationModal = ({ show, handleClose, location, setLocation }) => {
  const { getAddresses } = useRegisterUser();
  const [addresses, setAddresses] = useState([]);
  const validateLocation = () => {
    if (location?.local?.length > 0) {
      handleClose();
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
          width: "85vw",
          height: "85vh",
          bgcolor: "background.paper",
          borderRadius: ".25rem",
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Adicione a localização do evento
        </Typography>
        <Typography id="modal-modal-description" sx={{ my: 2 }}>
          Clique na posição do mapa onde será realizado o evento.
        </Typography>
        <LocationMap
          currentLocation={location}
          handlePositionChange={(value) =>
            setLocation({ ...location, ...value })
          }
        />
        <Box mt="1rem" display="flex">
          <Autocomplete
            id="location-auto-complete"
            options={addresses}
            sx={{ width: 300 }}
            disableCloseOnSelect
            renderInput={(params) => (
              <TextField
                required
                label="Cidade do Evento"
                size="small"
                helperText={false ? "Cidade do evento é obrigatória" : null}
                error={
                  location?.nome?.length === 0 ? false : location?.id === 0
                }
                {...params}
              />
            )}
            getOptionLabel={(option) => option?.nome}
            value={location}
            onChange={(_, value) => {
              setLocation({ ...location, ...value });
            }}
            onInputChange={async (event, value) => {
              if (value.length >= 2 && value.length <= 4) {
                const res = await getAddresses(value);
                setAddresses(res.dados);
              }
            }}
          />

          <TextField
            id="outlined-required"
            label="Local do Evento"
            size="small"
            value={location?.local || ""}
            onChange={(e) =>
              setLocation({ ...location, local: e.target.value })
            }
            sx={{ ml: "1rem" }}
          />
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
              onClick={validateLocation}
            >
              Guardar
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default LocationModal;
