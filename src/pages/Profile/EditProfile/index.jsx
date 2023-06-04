import React from "react";
import NavBar from "../../../components/NavBar";
import { useNavigate } from "react-router-dom";
import {
  Typography,
  Avatar,
  Grid,
  Paper,
  Box,
  IconButton,
  Button,
  Tabs,
  Tab,
  List,
  ListItemButton,
  ListItemText,
  ListItem,
} from "@mui/material";

const EditProfile = () => {
  const navigate = useNavigate();

  const [selectedIndex, setSelectedIndex] = React.useState(1);

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };
  return (
    <>
      <NavBar />
      <div className="edit_profile_container">
        <Box
          sx={{
            backgroundColor: "#f8f8f8",

            padding: "2rem",
            height: "100%",
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={6} md={4}>
              <Paper
                elevation={3}
                className=""
                sx={{
                  padding: "1rem",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  width: "350px",
                }}
              >
                <List
                  component="nav"
                  sx={{
                    width: "100%",
                  }}
                  aria-label="secondary mailbox folder"
                >
                  <ListItemButton
                    selected={selectedIndex === 2}
                    onClick={(event) => handleListItemClick(event, 2)}
                  >
                    <ListItemText primary="Editar perfil" />
                  </ListItemButton>
                  <ListItemButton
                    selected={selectedIndex === 3}
                    onClick={(event) => handleListItemClick(event, 3)}
                  >
                    <ListItemText primary="Na web" />
                  </ListItemButton>
                </List>
              </Paper>
            </Grid>
            <Grid item xs={6} md={8}>
              <Paper
                elevation={3}
                className=""
                sx={{
                  padding: "1rem",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                B
              </Paper>
            </Grid>
          </Grid>
        </Box>
      </div>
    </>
  );
};

export default EditProfile;
