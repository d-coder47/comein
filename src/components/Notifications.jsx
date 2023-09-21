import React, { useState, useEffect } from "react";
import {
  Button,
  Typography,
  List,
  ListItem,
  Divider,
  ListItemText,
  Menu,
  ButtonBase,
  ListItemIcon,
  IconButton,
} from "@mui/material";
import { useTranslation } from "react-i18next";

import useNotifications from "../hooks/useNotifications";
import useProjects from "../hooks/useProjects";
import useEvents from "../hooks/useEvents";
import { useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";

const Notifications = ({ open, anchorEl, handleClose, notifications }) => {
  const { t } = useTranslation();
  const { addNotifications, alterarEstadoNotificacao, removerNotificacao } =
    useNotifications();
  const { getProject } = useProjects();
  const { getEvent } = useEvents();

  const userId = localStorage.getItem("userId");

  const navigate = useNavigate();

  async function fetchData() {}
  useEffect(() => {
    if (userId) {
      // addNotifications(336, 114, "E", "Danilson Reis adicionou um evento novo");
    }
  }, [userId]);

  async function ListItemClick(idPub, pubType, idNotification) {
    if (pubType === "E") {
      const event = await getEvent(idPub);
      const postName = event.dados.nome
        .toLowerCase()
        .trim()
        .replaceAll(" ", "_");
      navigate(`/eventos/${idPub}/${postName}`);
    } else {
      const project = await getProject(idPub);

      const postName = project.dados.nome
        .toLowerCase()
        .trim()
        .replaceAll(" ", "_");
      navigate(`/projetos/${idPub}/${postName}`);
    }

    await alterarEstadoNotificacao(idNotification);
  }

  async function removeItemClick(idNotification) {
    await removerNotificacao(idNotification);
  }
  return (
    <div>
      <Menu
        id="notification-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "notification-button",
        }}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <List
          sx={{
            width: "100%",
            maxWidth: 360,
            maxHeight: 360,
            bgcolor: "background.paper",
            padding: "5px 5px 0 5px",
            overflowY: "auto",
          }}
        >
          {notifications.length > 0 &&
            notifications.map((notification, index) => (
              <React.Fragment key={index}>
                <ListItem
                  alignItems="flex-start"
                  sx={{
                    background: notification.lida === "N" ? "#d3d3d3" : "#fff",
                    marginBottom: "10px",
                    borderRadius: "5px",
                    boxShadow: "1px 1px 1px 1px #00000045",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <ButtonBase
                    onClick={() =>
                      ListItemClick(
                        notification.id_publicacao,
                        notification.tipo_publicacao,
                        notification.id,
                        "item"
                      )
                    }
                    style={{ width: "100%", textAlign: "left" }}
                  >
                    <ListItemText
                      primary={t("navBar.novaAtualizacao")}
                      secondary={
                        <React.Fragment>
                          <Typography
                            sx={{ display: "inline" }}
                            component="span"
                            variant="body2"
                            color="text.primary"
                          >
                            {notification.mensagem}
                          </Typography>
                        </React.Fragment>
                      }
                    />
                  </ButtonBase>
                  <ListItemIcon>
                    <IconButton>
                      <DeleteIcon
                        onClick={() => removeItemClick(notification.id)}
                      />
                    </IconButton>
                  </ListItemIcon>
                </ListItem>

                <Divider />
              </React.Fragment>
            ))}
        </List>
        <Button
          variant="text"
          sx={{
            textTransform: "none",
          }}
        >
          {t("navBar.limparTudo")}
        </Button>
      </Menu>
    </div>
  );
};

export default Notifications;
