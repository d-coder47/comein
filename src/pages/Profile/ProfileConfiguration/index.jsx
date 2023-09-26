import React from "react";
import NavBar from "../../../components/NavBar";
import { useNavigate, useParams } from "react-router-dom";
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
  Modal,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Tabs,
  Tab,
  Tooltip,
  IconButton,
  useMediaQuery,
} from "@mui/material";

import { Close } from "@mui/icons-material";

import useRegisterUser from "../../../hooks/useRegisterUser";

import DeleteIcon from "@mui/icons-material/Delete";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import "./ProfileConfiguration.css";
import { useTranslation, Trans } from "react-i18next";

import useUserProfile from "../../../hooks/useUserProfile";

const ProfileConfiguration = () => {
  const params = useParams();
  const { userId } = params;
  const navigate = useNavigate();
  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  const [openRemoveModal, setOpenRemoveModal] = React.useState(false);
  const handleOpenRemoveModal = () => setOpenRemoveModal(true);
  const handleCloseRemoveModal = () => setOpenRemoveModal(false);

  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const authenticated = localStorage.getItem("authenticated");

  const { t } = useTranslation();
  const { deleteUserProfile, reportProblem } = useUserProfile();

  const { getTermsPolicy } = useRegisterUser();

  const [terms, setTerms] = React.useState();
  const [policy, setPolicy] = React.useState();

  const [selectedIndex, setSelectedIndex] = React.useState(1);

  const [errorMessage, setErrorMessage] = React.useState("");
  const [sugestionMessage, setSugestionMessage] = React.useState("");

  const [reportTabvalue, setReportTabValue] = React.useState(0);

  const handleReportTabChange = (event, newValue) => {
    setReportTabValue(newValue);
  };

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  const handleErrorSubmit = async (event) => {
    event.preventDefault();

    await reportProblem(userInfo.id, errorMessage, "error");

    setErrorMessage("");
  };

  const handleSugestionSubmit = async (event) => {
    event.preventDefault();

    await reportProblem(userInfo.id, sugestionMessage, "sugestion");

    setSugestionMessage("");
  };

  const handleErrorChange = (event) => {
    setErrorMessage(event.target.value);
  };

  const handleSugestionChange = (event) => {
    setSugestionMessage(event.target.value);
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

    if (!authenticated || userId !== userInfo.id) {
      navigate("/");
    }

    fetchData();
  }, []);

  return (
    <>
      <NavBar />
      <Box className="config_profile_container">
        <Box
          sx={{
            backgroundColor: "#f8f8f8",
            padding: "2rem",
            minHeight: "100vh",
          }}
        >
          <Grid
            container
            spacing={2}
            sx={{
              ...(isSmallScreen
                ? {
                    flexDirection: "column",
                    display: "flex",
                    justifyContent: "center",
                  }
                : {}),
            }}
          >
            <Grid item xs={6} md={4}>
              <Paper
                elevation={3}
                className=""
                sx={{
                  // Styles for larger displays
                  ...(isSmallScreen
                    ? {}
                    : {
                        padding: "1rem",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        width: "350px",
                      }),
                  // Styles for small displays
                  ...(isSmallScreen ? { width: "330px" } : {}),
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
                    // Styles for larger displays
                    ...(isSmallScreen
                      ? {}
                      : {
                          padding: "1rem",
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                        }),
                    // Styles for small displays
                    ...(isSmallScreen
                      ? {
                          width: "330px",
                          paddingTop: "10px",
                          paddingLeft: "10px",
                          height: "370px",
                        }
                      : {}),
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
                  <Box className="help-topics-area">
                    <Box>
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
                            <Trans i18nKey="userProfile.configPage.comoAddPubDetails" />
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
                            <Trans i18nKey="userProfile.configPage.comoMudarProfileInfoDetails" />
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
                            <Trans i18nKey="userProfile.configPage.comoMudarProfilePhotoDetails" />
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
                            <Trans i18nKey="userProfile.configPage.comoReportarErrorDetails" />
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
                            <Trans i18nKey="userProfile.configPage.comoRemoverContaDetails" />
                          </Typography>
                        </AccordionDetails>
                      </Accordion>
                    </Box>
                  </Box>
                </Paper>
              )}
              {selectedIndex === 2 && (
                <Paper
                  elevation={3}
                  className=""
                  sx={{
                    // Styles for larger displays
                    ...(isSmallScreen
                      ? {}
                      : {
                          padding: "1rem",
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                        }),
                    // Styles for small displays
                    ...(isSmallScreen
                      ? {
                          width: "330px",
                          height: "350px",
                          paddingTop: "10px",
                          paddingLeft: "10px",
                          alignItems: "center",
                          justifyContent: "center",
                        }
                      : {}),
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
                  <Box sx={{ width: "100%" }}>
                    <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                      <Tabs
                        value={reportTabvalue}
                        onChange={handleReportTabChange}
                        aria-label="basic tabs example"
                      >
                        <Tab
                          label={t("userProfile.configPage.erro")}
                          sx={{
                            textTransform: "none",
                          }}
                        />
                        <Tab
                          label={t("userProfile.configPage.suggestion")}
                          sx={{
                            textTransform: "none",
                          }}
                        />
                      </Tabs>
                    </Box>
                    {reportTabvalue === 0 && (
                      <Typography variant="h6">
                        <Box
                          component="form"
                          onSubmit={handleErrorSubmit}
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                            width: "100%",
                          }}
                        >
                          <TextField
                            variant="outlined"
                            fullWidth
                            multiline
                            sx={{
                              width: "60%",
                            }}
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
                              // Styles for larger displays
                              ...(isSmallScreen
                                ? {}
                                : {
                                    width: "30%",
                                    borderRadius: "20px",
                                    textTransform: "none",
                                  }),
                              // Styles for small displays
                              ...(isSmallScreen
                                ? {
                                    width: "40%",
                                    borderRadius: "15px",
                                    textTransform: "none",
                                  }
                                : {}),
                            }}
                          >
                            {t("userProfile.configPage.enviarErro")}
                          </Button>
                        </Box>
                      </Typography>
                    )}
                    {reportTabvalue === 1 && (
                      <Typography variant="h6">
                        <Box
                          component="form"
                          onSubmit={handleSugestionSubmit}
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                            width: "100%",
                          }}
                        >
                          <TextField
                            variant="outlined"
                            fullWidth
                            sx={{
                              width: "60%",
                            }}
                            multiline
                            rows={4}
                            value={sugestionMessage}
                            onChange={handleSugestionChange}
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
                            {t("userProfile.configPage.enviarSugestao")}
                          </Button>
                        </Box>
                      </Typography>
                    )}
                  </Box>
                </Paper>
              )}

              {selectedIndex === 3 && (
                <Paper
                  elevation={3}
                  className=""
                  sx={{
                    // Styles for larger displays
                    ...(isSmallScreen
                      ? {}
                      : {
                          padding: "1rem",
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                        }),
                    // Styles for small displays
                    ...(isSmallScreen
                      ? {
                          width: "330px",
                          height: "350px",
                          paddingTop: "10px",
                          paddingLeft: "10px",
                        }
                      : {}),
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
                    // Styles for larger displays
                    ...(isSmallScreen
                      ? {}
                      : {
                          padding: "1rem",
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          height: "300px",
                        }),
                    // Styles for small displays
                    ...(isSmallScreen
                      ? {
                          width: "330px",
                          height: "350px",
                          paddingLeft: "10px",
                          paddingTop: "10px",
                        }
                      : {}),
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
                      <IconButton
                        aria-label="close"
                        color="inherit"
                        size="small"
                        onClick={handleCloseRemoveModal}
                        sx={{
                          position: "absolute",
                          top: 8,
                          right: 8,
                        }}
                      >
                        <Close />
                      </IconButton>
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
                            onClick={handleCloseRemoveModal}
                          >
                            {t("userProfile.configPage.nao")}
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
                            onClick={handleRemoveAccount}
                          >
                            {t("userProfile.configPage.sim")}
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
      </Box>
    </>
  );
};

export default ProfileConfiguration;
