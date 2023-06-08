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
  TextField,
  InputAdornment,
  ListItem,
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import "./ProfileConfiguration.css";

const ProfileConfiguration = () => {
  const navigate = useNavigate();

  const [selectedIndex, setSelectedIndex] = React.useState(1);

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };
  return (
    <>
      <NavBar />
      <div className="config_profile_container">
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
                    selected={selectedIndex === 1}
                    onClick={(event) => handleListItemClick(event, 1)}
                  >
                    <ListItemText primary="Remover conta" />
                  </ListItemButton>
                  <ListItemButton
                    selected={selectedIndex === 2}
                    onClick={(event) => handleListItemClick(event, 2)}
                  >
                    <ListItemText primary="Ajuda e suporte" />
                  </ListItemButton>
                  <ListItemButton
                    selected={selectedIndex === 3}
                    onClick={(event) => handleListItemClick(event, 3)}
                  >
                    <ListItemText primary="Reportar erro" />
                  </ListItemButton>
                </List>
              </Paper>
            </Grid>
            <Grid item xs={6} md={8}>
              {selectedIndex === 1 && (
                <Paper
                  elevation={3}
                  className=""
                  sx={{
                    padding: "1rem",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    height: "300px",
                  }}
                >
                  <Typography
                    variant="h5"
                    sx={{
                      marginTop: "1rem",
                      marginBottom: "1rem",
                      fontWeight: "bold",
                    }}
                  >
                    Remover conta
                  </Typography>

                  <Typography variant="body2" gutterBottom>
                    A exclusão da conta removerá todo o conteúdo e dados
                    associados a ela e você perderá acesso à conta
                    imediatamente.
                  </Typography>
                  <div className="remove-account-area">
                    <Typography
                      variant="h6"
                      sx={{
                        marginTop: "1rem",
                        marginBottom: "1rem",
                        fontSize: 15,
                      }}
                    >
                      Insira seu email para continuar
                    </Typography>
                    <div className="remove-account-button-area">
                      <TextField variant="outlined" fullWidth />
                      <InputAdornment position="end">
                        <Button
                          variant="contained"
                          className="remove-account-button"
                          sx={{
                            marginLeft: "15px",
                          }}
                          startIcon={<DeleteIcon />}
                        >
                          Remover conta
                        </Button>
                      </InputAdornment>
                    </div>
                  </div>
                </Paper>
              )}
              {selectedIndex === 2 && (
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
                  Ajuda e suporte
                </Paper>
              )}
              {selectedIndex === 3 && (
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
                  Reportar erro
                </Paper>
              )}
            </Grid>
          </Grid>
        </Box>
      </div>
    </>
  );
};

export default ProfileConfiguration;
