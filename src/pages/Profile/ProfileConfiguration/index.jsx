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
  Accordion,
  AccordionDetails,
  AccordionSummary,
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

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
                    <ListItemText primary="Ajuda e suporte" />
                  </ListItemButton>
                  <ListItemButton
                    selected={selectedIndex === 2}
                    onClick={(event) => handleListItemClick(event, 2)}
                  >
                    <ListItemText primary="Reportar erro" />
                  </ListItemButton>
                  <ListItemButton
                    selected={selectedIndex === 3}
                    onClick={(event) => handleListItemClick(event, 3)}
                  >
                    <ListItemText primary="Remover conta" />
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
                    Ajuda e suporte
                  </Typography>
                  <div className="help-topics-area">
                    <div>
                      <Accordion>
                        <AccordionSummary
                          expandIcon={<ExpandMoreIcon />}
                          aria-controls="panel1a-content"
                          id="panel1a-header"
                        >
                          <Typography>
                            Como adicionar uma publicação?{" "}
                          </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          <Typography>
                            Deve clicar no ícone com a sua foto de perfil que
                            aparece no canto superior direito do site, após isto
                            deve clicar em "Perfil", se ainda não tiver nenhuma
                            publicação vai aparecer uma área escrita "Adicionar
                            Evento", no caso de ser um evento que deseja
                            adicionar, para finalizar deve preencher o
                            formulário que aparecera com as informações do
                            evento.
                          </Typography>
                        </AccordionDetails>
                      </Accordion>
                      <Accordion>
                        <AccordionSummary
                          expandIcon={<ExpandMoreIcon />}
                          aria-controls="panel2a-content"
                          id="panel2a-header"
                        >
                          <Typography>
                            Como mudar as informações do meu perfil?
                          </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          <Typography>
                            Deve clicar no ícone com a sua foto de perfil que
                            aparece no canto superior direito do site, após isto
                            deve clicar em "Perfil", clicar no botão "editar
                            perfil" que aparece no lado esquerdo da página, isto
                            encaminhara-lhe para uma secção onde poderá editar
                            as informações relacionadas com o seu perfil.
                          </Typography>
                        </AccordionDetails>
                      </Accordion>
                      <Accordion>
                        <AccordionSummary
                          expandIcon={<ExpandMoreIcon />}
                          aria-controls="panel2a-content"
                          id="panel2a-header"
                        >
                          <Typography>
                            Como mudar a minha foto de perfil e capa?
                          </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          <Typography>
                            Deve clicar no ícone com a sua foto de perfil que
                            aparece no canto superior direito do site, após isto
                            deve clicar em "Perfil", no seu perfil deve clicar
                            em cima da sua foto de perfil para selecionar uma
                            nova foto, o mesmo processo deve ser feito para
                            adicionar uma nova foto de capa.
                          </Typography>
                        </AccordionDetails>
                      </Accordion>
                      <Accordion>
                        <AccordionSummary
                          expandIcon={<ExpandMoreIcon />}
                          aria-controls="panel2a-content"
                          id="panel2a-header"
                        >
                          <Typography>Como reportar um erro?</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          <Typography>
                            Deve clicar no ícone com a sua foto de perfil que
                            aparece no canto superior direito do site, clique no
                            ícone de "Configurações" que aparece no lado
                            esquerdo da página debaixo do botão "Editar perfil",
                            clique no item "Reportar erro" que aparece no menu
                            do lado esquerdo da página.
                          </Typography>
                        </AccordionDetails>
                      </Accordion>
                      <Accordion>
                        <AccordionSummary
                          expandIcon={<ExpandMoreIcon />}
                          aria-controls="panel2a-content"
                          id="panel2a-header"
                        >
                          <Typography>Como remover a minha conta?</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          <Typography>
                            Deve clicar no ícone com a sua foto de perfil que
                            aparece no canto superior direito do site, clique no
                            ícone de "Configurações" que aparece no lado
                            esquerdo da página debaixo do botão "Editar perfil",
                            clique no item "Remover conta" que aparece no menu
                            do lado esquerdo da página.
                          </Typography>
                        </AccordionDetails>
                      </Accordion>
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
                  Reportar erro
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
            </Grid>
          </Grid>
        </Box>
      </div>
    </>
  );
};

export default ProfileConfiguration;
