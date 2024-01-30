import React, { useEffect, useRef, useState } from "react";
import {
  Avatar,
  Box,
  Typography,
  IconButton,
  Skeleton,
  Stack,
  Menu,
  Button,
  Grid,
  Modal,
} from "@mui/material";
import { ThumbUp, Share, Close, Link } from "@mui/icons-material";

import {
  FacebookShareButton,
  FacebookIcon,
  PinterestShareButton,
  PinterestIcon,
  FacebookMessengerShareButton,
  FacebookMessengerIcon,
  LinkedinIcon,
  LinkedinShareButton,
  WhatsappShareButton,
  WhatsappIcon,
  ViberShareButton,
  ViberIcon,
  TwitterShareButton,
  TwitterIcon,
  EmailShareButton,
  EmailIcon,
} from "react-share";

import { Visibility } from "@mui/icons-material";

import useEvents from "../hooks/useEvents";
import useProjects from "../hooks/useProjects";
import { useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { AspectRatio } from "react-aspect-ratio";
import "react-aspect-ratio/aspect-ratio.css";
import copy from "clipboard-copy";

const HighlightsCustomCard = ({
  id = null,
  name = "",
  likes,
  visits,
  picture,
  publisherName,
  type,
  onRefresh,
}) => {
  const [isLiked, setIsLiked] = useState(null);
  const [isFavorite, setIsFavorite] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [openShareModal, setOpenShareModal] = useState(false);
  const [displayInteractions, setDisplayInteraction] = useState("none");

  const [openRemoveEventModal, setOpenRemoveEventModal] = React.useState(false);

  const [linkCopied, setLinkCopied] = useState(false);

  const { deleteProject } = useProjects();

  const { removeEvent } = useEvents();

  const { t } = useTranslation();

  const navigate = useNavigate();

  const location = useLocation();

  const handleCloseRemoveEventModal = () => setOpenRemoveEventModal(false);

  const getPostPath = () => {
    const postType = type === "E" ? "eventos" : "projetos";
    const postName = name
      .toLowerCase()
      .trim()
      .replaceAll(" ", "_")
      .replaceAll("/", "_")
      .replaceAll(".", "");

    return `/${postType}/${id}/${postName}`;
  };

  const handleOpen = () => {
    localStorage.setItem("previousLocation", location.pathname);
    navigate(getPostPath());
  };

  const handleOpenShareModal = () => setOpenShareModal(true);
  const handleCloseShareModal = () => setOpenShareModal(false);

  const handleRemoveEvent = async () => {
    if (type === "E") {
      const res = await removeEvent(id);
      if (!res) {
        handleCloseRemoveEventModal();
        toast.error(t("userProfile.removerEventoErro"));
      } else {
        handleCloseRemoveEventModal();
        toast.success(t("userProfile.removerEventoSucesso"));
        onRefresh();
      }
    } else {
      const res = await deleteProject(id);

      if (!res) {
        handleCloseRemoveEventModal();
        toast.error(t("userProfile.removerProjetoErro"));
      } else {
        handleCloseRemoveEventModal();
        toast.success(t("userProfile.removerProjetoSucesso"));
        onRefresh();
      }
    }
  };

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 1500);
  }, []);

  useEffect(() => {
    if (!id && isLiked !== null && isFavorite !== null) return;
    const user = JSON.parse(localStorage.getItem("userInfo"));

    if (!user) return;
  }, [id]);

  const handleCopyLink = () => {
    const linkToCopy = "https://comein.cv/" + getPostPath();
    copy(linkToCopy)
      .then(() => {
        setLinkCopied(!linkCopied);
      })
      .catch((err) => {
        console.error("Failed to copy link to clipboard", err);
      });
  };

  if (isLoading) {
    return (
      <Stack spacing={1}>
        <Skeleton variant="rectangular" width="15rem" height="12rem" />
        <Box display="flex">
          <Skeleton variant="circular" width={25} height={25} />
          <Box
            display="flex"
            alignItems="center"
            gap=".5rem"
            sx={{ marginLeft: "auto" }}
          >
            <Skeleton variant="rounded" width={12} height={12} />
            <Skeleton variant="rounded" width={12} height={12} />
            <Skeleton variant="rounded" width={12} height={12} />
          </Box>
        </Box>
      </Stack>
    );
  }

  return (
    <>
      <Box
        id="card-container"
        sx={{
          maxHeight: "15rem",
          maxWidth: "20rem",
        }}
        onMouseEnter={() => setDisplayInteraction("flex")}
        onMouseLeave={() => setDisplayInteraction("none")}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            marginBottom: ".25rem",
            position: "relative",
          }}
        >
          <AspectRatio ratio="16/9">
            <Avatar
              variant="square"
              src={picture || null}
              alt={`Foto de ${name}`}
              onClick={handleOpen}
              sx={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                "&:hover": {
                  cursor: "pointer",
                  borderRadius: "0.25rem",
                },
              }}
            />
          </AspectRatio>
        </Box>

        <Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "0.25rem",
              top: "-25rem",
            }}
          >
            <Typography
              fontWeight="bold"
              fontSize="0.8rem"
              sx={{
                "&:hover": {
                  textDecoration: "underline",
                  cursor: "pointer",
                },
              }}
              onClick={handleOpen}
            >
              {name}
            </Typography>

            <Box
              sx={{
                display: "flex",
                gap: ".5rem",
                marginLeft: "auto",
                fontSize: ".9rem",
              }}
            >
              <Box
                sx={{ display: "flex", alignItems: "center", gap: ".125rem" }}
              >
                <ThumbUp sx={{ width: 15, height: 15, color: "black" }} />
                <Typography
                  sx={{
                    fontWeight: "bold",
                    color: "black",
                    fontSize: ".8rem",
                  }}
                  variant="p"
                >
                  {likes}
                </Typography>
              </Box>
              <Box
                sx={{ display: "flex", alignItems: "center", gap: ".125rem" }}
              >
                <Visibility sx={{ width: 15, height: 15, color: "black" }} />
                <Typography
                  sx={{
                    fontWeight: "bold",
                    color: "black",
                    fontSize: ".8rem",
                  }}
                  variant="p"
                >
                  {visits !== null ? visits : "0"}
                </Typography>
              </Box>
              <Share
                sx={{
                  width: 14,
                  height: 14,
                  cursor: "pointer",
                }}
                onClick={handleOpenShareModal}
              />
            </Box>
          </Box>
          <Box width="fit-content" alignItems="center" gap=".25rem">
            <Typography
              fontWeight="bold"
              fontSize="0.7rem"
              sx={{
                color: "gray",
                "&:hover": {
                  textDecoration: "underline",
                  cursor: "pointer",
                },
              }}
            >
              {publisherName}
            </Typography>
          </Box>
        </Box>

        <Modal
          id="share-modal"
          open={openShareModal}
          onClose={handleCloseShareModal}
          aria-labelledby="share-modal-title"
          aria-describedby="share-modal-description"
          sx={{
            ".MuiModal-backdrop": {
              backgroundColor: "rgba(0,0,0,.5)",
            },
          }}
        >
          <Box
            id="wrapper"
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "100vh",
            }}
          >
            <Box
              display="flex"
              flexDirection="column"
              sx={{
                width: "25rem",
                height: "14rem",
                backgroundColor: "white",
                borderRadius: ".25rem",
              }}
            >
              <Box id="header" display="flex" justifyContent="flex-end">
                <Close
                  sx={{
                    color: "black",
                    cursor: "pointer",
                    margin: ".25rem",
                    "&:hover": {
                      opacity: ".9",
                    },
                  }}
                  onClick={handleCloseShareModal}
                />
              </Box>
              <Box
                id="body"
                display="flex"
                flexDirection="column"
                alignItems="center"
                mt="1rem"
              >
                <Typography fontWeight="bold">
                  {t("postCard.partilhePostRedeSociais")}
                </Typography>
                <Box id="media-shares" mt="1rem" display="flex" gap=".25rem">
                  <FacebookShareButton
                    url={"https://comein.cv/" + getPostPath()}
                    quote={"Post it with your friends"}
                    hashtag="comeincv"
                    media="https://img.freepik.com/vetores-gratis/paisagem-noturna-do-oceano-lua-cheia-e-estrelas-brilham_107791-7397.jpg?size=626&ext=jpg"
                  >
                    <FacebookIcon size={40} round />
                  </FacebookShareButton>
                  <FacebookMessengerShareButton
                    appId="976472220466365"
                    url={"https://comein.cv/"}
                  >
                    <FacebookMessengerIcon size={40} round />
                  </FacebookMessengerShareButton>
                  <PinterestShareButton
                    url={"https://comein.cv/" + getPostPath()}
                    description={"Testing description"}
                    media={picture}
                  >
                    <PinterestIcon size={40} round />
                  </PinterestShareButton>
                  <LinkedinShareButton
                    url={"https://comein.cv/" + getPostPath()}
                    title={name}
                    summary={"minha descricao"}
                    source={"Comein CV"}
                  >
                    <LinkedinIcon size={40} round />
                  </LinkedinShareButton>
                  <WhatsappShareButton
                    url={"https://comein.cv/" + getPostPath()}
                    title={name}
                  >
                    <WhatsappIcon size={40} round />
                  </WhatsappShareButton>
                  <ViberShareButton
                    url={"https://comein.cv/" + getPostPath()}
                    title={name}
                  >
                    <ViberIcon size={40} round />
                  </ViberShareButton>
                  <TwitterShareButton
                    url={"https://comein.cv/" + getPostPath()}
                    title={name}
                    via="Comein-CV"
                  >
                    <TwitterIcon size={40} round />
                  </TwitterShareButton>
                  <EmailShareButton
                    url={"https://comein.cv/" + getPostPath()}
                    subject={`${name}: de Comein CV`}
                    body={`Venha ver o post de ${publisherName}`}
                  >
                    <EmailIcon size={40} round />
                  </EmailShareButton>
                </Box>
                <Button
                  sx={{ marginTop: "1rem" }}
                  variant="contained"
                  endIcon={<Link />}
                  onClick={handleCopyLink}
                >
                  {t("shareModal.copiarLigacao")}
                </Button>
              </Box>
            </Box>
          </Box>
        </Modal>

        <Modal
          open={openRemoveEventModal}
          onClose={handleCloseRemoveEventModal}
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
              display: "flex",
              flexDirection: "column",
              justifyItems: "center",
            }}
          >
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={handleCloseRemoveEventModal}
              sx={{
                position: "absolute",
                top: 8,
                right: 8,
              }}
            >
              <Close />
            </IconButton>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              {type === "E"
                ? t("userProfile.removerEventoModal")
                : t("userProfile.removerProjetoModal")}
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
                  onClick={handleCloseRemoveEventModal}
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
                  onClick={handleRemoveEvent}
                >
                  {t("userProfile.configPage.sim")}
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Modal>
      </Box>
    </>
  );
};

export default HighlightsCustomCard;
