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
  const [showErrors, setShowErrors] = useState(false);

  const validateLocation = () => {
    if (location?.nome?.length > 0) {
      setShowErrors(false);
      return handleClose();
    }
    setShowErrors(true);
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
          display: "flex",
          flexDirection: "column",
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
            size="small"
            renderOption={(props, option) => {
              return (
                <li {...props} key={option.id}>
                  {option.nome}
                </li>
              );
            }}
            renderInput={(params) => (
              <TextField
                required
                label="Cidade do Evento"
                helperText={
                  showErrors ? "Cidade do evento é obrigatória" : null
                }
                error={showErrors}
                {...params}
              />
            )}
            getOptionLabel={(option) => option?.nome}
            value={location}
            onChange={(_, value) => {
              setLocation({ ...location, ...value });
              setShowErrors(false);
            }}
            onInputChange={async (event, value) => {
              // if (value.length >= 2 && value.length <= 4) {
              if (value.length >= 2) {
                const res = await getAddresses(value);
                if (res?.dados) {
                  console.log(res.dados);
                  setAddresses(res.dados);
                }
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
