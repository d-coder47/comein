import { Box, Button, Modal, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const UpdateUserInfoModal = ({ show, handleClose }) => {
  const loggedUserInfo = JSON.parse(localStorage.getItem("userInfo"));

  const navigate = useNavigate();

  const { t } = useTranslation();
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
          width: "40vw",
          height: {
            xs: "30vh",
            sm: "30vh",
            md: "30vh",
            lg: "30vh",
            xl: "30vh",
          },
          bgcolor: "background.paper",
          borderRadius: ".25rem",
          boxShadow: 24,
          p: 4,
          overflowY: "auto",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography id="modal-modal-title" variant="h6" component="h2">
          {t("udpateUserInfoModal.titulo")}
        </Typography>
        <Typography id="modal-modal-description" sx={{ my: 2 }}>
          {t("udpateUserInfoModal.descricao")}
        </Typography>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100vh",
          }}
        >
          <Box
            mt="1rem"
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Button
              variant="contained"
              size="large"
              sx={{
                textTransform: "capitalize",
              }}
              onClick={() => navigate(`/editar-perfil/${loggedUserInfo.id}`)}
            >
              Editar perfil
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default UpdateUserInfoModal;
