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
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

const LocationModal = ({ show, handleClose, location, setLocation }) => {
  const { getAddresses } = useRegisterUser();
  const [addresses, setAddresses] = useState([]);
  const [showErrors, setShowErrors] = useState(false);

  const { t } = useTranslation();

  const validateLocation = () => {
    if (!location.local || !location.lat || !location.lng) {
      !location.local ? setShowErrors(true) : setShowErrors(false);

      if (!location.lat && !location.lng) {
        toast.error(
          "Coordenadas do mapa são obrigatórias. Para adiciona-las clique na localização do seu evento."
        );
      }
      return;
    }

    setShowErrors(false);
    return handleClose();
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
          {t("locationModals.postModal.title")}
        </Typography>
        <Typography id="modal-modal-description" sx={{ my: 2 }}>
          {t("locationModals.postModal.explanation")}
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
                label={t("locationModals.postModal.city")}
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
            required
            size="small"
            id="outlined-required"
            label={t("locationModals.postModal.location")}
            value={location?.local || ""}
            onChange={(e) =>
              setLocation({ ...location, local: e.target.value })
            }
            helperText={showErrors ? "Local do evento é obrigatório" : null}
            error={showErrors}
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
              {t("locationModals.cancel")}
            </Button>
            <Button
              variant="contained"
              size="small"
              sx={{ textTransform: "capitalize" }}
              onClick={validateLocation}
            >
              {t("locationModals.save")}
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default LocationModal;
