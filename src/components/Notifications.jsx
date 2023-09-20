import React, { useState, useEffect } from "react";
import {
  Button,
  Typography,
  List,
  ListItem,
  Divider,
  ListItemText,
  Menu,
} from "@mui/material";
import { useTranslation } from "react-i18next";

import useNotifications from "../hooks/useNotifications";

const Notifications = ({ open, anchorEl, handleClose }) => {
  const { t } = useTranslation();
  const { getUserNotifications, addNotifications } = useNotifications();

  const userId = localStorage.getItem("userId");

  const [notifications, setNotications] = useState([]);

  async function fetchData() {
    const notificationData = await getUserNotifications(userId);

    setNotications(notificationData.dados);
  }
  useEffect(() => {
    if (userId) {
      fetchData();
      //   addNotifications(336, 114, "E", "Danilson Reis adicionou um evento novo");
    }
  }, [userId]);
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
                    background: notification.vista === "N" ? "#d3d3d3" : "#fff",
                    marginBottom: "10px",
                    borderRadius: "5px",
                    boxShadow: "1px 1px 1px 1px #00000045",
                  }}
                >
                  <ListItemText
                    primary="Nova atualização"
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
                </ListItem>
                <Divider />
              </React.Fragment>
            ))}
          <Button
            variant="text"
            sx={{
              textTransform: "capitalize",
            }}
          >
            Limpar
          </Button>
        </List>
      </Menu>
    </div>
  );
};

export default Notifications;
