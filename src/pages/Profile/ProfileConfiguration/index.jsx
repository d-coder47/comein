import React from "react";
import NavBar from "../../../components/NavBar";
import { useNavigate } from "react-router-dom";
import {
  Typography,
  Grid,
  Paper,
  Box,
  Button,
  List,
  ListItemButton,
  ListItemText,
  TextField,
  InputAdornment,
  Modal,
  Accordion,
  AccordionDetails,
  AccordionSummary,
} from "@mui/material";

import useRegisterUser from "../../../hooks/useRegisterUser";

import DeleteIcon from "@mui/icons-material/Delete";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import "./ProfileConfiguration.css";
import { useTranslation } from "react-i18next";

import useUserProfile from "../../../hooks/useUserProfile";

const ProfileConfiguration = () => {
  const navigate = useNavigate();

  const [openRemoveModal, setOpenRemoveModal] = React.useState(false);
  const handleOpenRemoveModal = () => setOpenRemoveModal(true);
  const handleCloseRemoveModal = () => setOpenRemoveModal(false);

  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const authenticated = localStorage.getItem("authenticated");

  const { t } = useTranslation();
  const { deleteUserProfile } = useUserProfile();

  const { getTermsPolicy } = useRegisterUser();

  const [terms, setTerms] = React.useState();
  const [policy, setPolicy] = React.useState();

  const [selectedIndex, setSelectedIndex] = React.useState(1);

  const [errorMessage, setErrorMessage] = React.useState("");

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  const handleErrorSubmit = (event) => {
    event.preventDefault();
    // Here you can perform the error reporting logic
    console.log("Error message:", errorMessage);
    // Reset the form
    setErrorMessage("");
  };

  const handleErrorChange = (event) => {
    setErrorMessage(event.target.value);
  };

  const handleRemoveAccount = async () => {
    const res = await deleteUserProfile(userInfo.id);
    setOpenRemoveModal(false);
    localStorage.clear();
    navigate("/");
  };

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getTermsPolicy();
        setTerms(res.termos);
        setPolicy(res.politicas);
      } catch (error) {
        console.error(error);
        // Handle error if necessary
      }
    };

    if (!authenticated) {
      navigate("/");
    }

    fetchData();
  }, []);

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
                    <ListItemText
                      primary={t("userProfile.configPage.ajudaSuporte")}
                    />
                  </ListItemButton>
                  <ListItemButton
                    selected={selectedIndex === 2}
                    onClick={(event) => handleListItemClick(event, 2)}
                  >
                    <ListItemText
                      primary={t("userProfile.configPage.reportarErro")}
                    />
                  </ListItemButton>
                  <ListItemButton
                    selected={selectedIndex === 3}
                    onClick={(event) => handleListItemClick(event, 3)}
                  >
                    <ListItemText
                      primary={t("userProfile.configPage.termosdeUsoPoliticas")}
                    />
                  </ListItemButton>

                  <ListItemButton
                    selected={selectedIndex === 4}
                    onClick={(event) => handleListItemClick(event, 4)}
                  >
                    <ListItemText
                      primary={t("userProfile.configPage.removerConta")}
                    />
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
                    {t("userProfile.configPage.ajudaSuporte")}
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
                            {t("userProfile.configPage.comoAddPub")}{" "}
                          </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          <Typography>
                            {t("userProfile.configPage.comoAddPubDetails")}
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
                            {t("userProfile.configPage.comoMudarProfileInfo")}
                          </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          <Typography>
                            {t(
                              "userProfile.configPage.comoMudarProfileInfoDetails"
                            )}
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
                            {t("userProfile.configPage.comoMudarProfilePhoto")}
                          </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          <Typography>
                            {t(
                              "userProfile.configPage.comoMudarProfilePhotoDetails"
                            )}
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
                            {t("userProfile.configPage.comoReportarError")}
                          </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          <Typography>
                            {t(
                              "userProfile.configPage.comoReportarErrorDetails"
                            )}
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
                            {t("userProfile.configPage.comoRemoverConta")}
                          </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          <Typography>
                            {t(
                              "userProfile.configPage.comoRemoverContaDetails"
                            )}
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
                  <Typography
                    variant="h5"
                    sx={{
                      marginTop: "1rem",
                      marginBottom: "1rem",
                      fontWeight: "bold",
                    }}
                  >
                    {t("userProfile.configPage.reportarErro")}
                  </Typography>
                  <Box
                    component="form"
                    onSubmit={handleErrorSubmit}
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                      width: "60%",
                    }}
                  >
                    <TextField
                      variant="outlined"
                      fullWidth
                      multiline
                      rows={4}
                      value={errorMessage}
                      onChange={handleErrorChange}
                      margin="normal"
                    />

                    <Button
                      variant="contained"
                      color="primary"
                      type="submit"
                      sx={{
                        width: "30%",
                        borderRadius: "20px",
                        textTransform: "none",
                      }}
                    >
                      {t("userProfile.configPage.reportarErro")}
                    </Button>
                  </Box>
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
                  <Typography
                    variant="h5"
                    sx={{
                      marginTop: "1rem",
                      marginBottom: "1rem",
                      fontWeight: "bold",
                    }}
                  >
                    {t("userProfile.configPage.termosdeUsoPoliticas")}
                  </Typography>
                  <Accordion>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel2a-content"
                      id="panel2a-header"
                    >
                      <Typography>
                        {t("userProfile.configPage.termosUso")}
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography>
                        <div dangerouslySetInnerHTML={{ __html: terms }} />
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
                        {" "}
                        {t("userProfile.configPage.politicasPrivacidade")}
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography>
                        <div dangerouslySetInnerHTML={{ __html: policy }} />
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                </Paper>
              )}

              {selectedIndex === 4 && (
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
                    {t("userProfile.configPage.removerConta")}
                  </Typography>

                  <Typography variant="body2" gutterBottom>
                    {t("userProfile.configPage.removerContaDetails")}
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                      width: "60%",
                    }}
                  >
                    {/* <Typography
                      variant="h6"
                      sx={{
                        marginTop: "1rem",
                        marginBottom: "1rem",
                        fontSize: 15,
                      }}
                    >
                      {t("userProfile.configPage.inserirEmail")}
                    </Typography>

                    <TextField variant="outlined" fullWidth /> */}
                    <Button
                      variant="contained"
                      className="remove-account-button"
                      sx={{
                        marginTop: "15px",
                        borderRadius: "20px",
                        textTransform: "none",
                      }}
                      onClick={handleOpenRemoveModal}
                      startIcon={<DeleteIcon />}
                    >
                      {t("userProfile.configPage.removerConta")}
                    </Button>
                  </Box>
                  <Modal
                    open={openRemoveModal}
                    onClose={handleCloseRemoveModal}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                  >
                    <Box
                      sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        width: 400,
                        bgcolor: "background.paper",
                        border: "2px solid #000",
                        boxShadow: 24,
                        p: 4,
                      }}
                    >
                      <Typography
                        id="modal-modal-title"
                        variant="h6"
                        component="h2"
                      >
                        {t("userProfile.configPage.confirmarRemoverConta")}
                      </Typography>
                      <Grid
                        container
                        spacing={2}
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <Grid item xs={6} md={4}>
                          <Button
                            variant="contained"
                            className="remove-account-button"
                            sx={{
                              marginTop: "15px",
                              borderRadius: "20px",
                              textTransform: "none",
                            }}
                            onClick={handleRemoveAccount}
                          >
                            {t("userProfile.configPage.sim")}
                          </Button>
                        </Grid>
                        <Grid item xs={6} md={4}>
                          <Button
                            variant="contained"
                            className="remove-account-button"
                            sx={{
                              marginTop: "15px",
                              borderRadius: "20px",
                              textTransform: "none",
                            }}
                            onClick={handleCloseRemoveModal}
                          >
                            {t("userProfile.configPage.nao")}
                          </Button>
                        </Grid>
                      </Grid>
                    </Box>
                  </Modal>
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
