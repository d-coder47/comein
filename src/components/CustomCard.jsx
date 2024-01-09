import React, { useEffect, useRef, useState } from "react";
import {
  Avatar,
  Box,
  Typography,
  Modal,
  Skeleton,
  Stack,
  Button,
  Menu,
  MenuItem,
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

import axiosInstance from "../api/axiosInstance";
import UserCard from "./UserCard";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import copy from "clipboard-copy";

const CustomCard = ({
  id = null,
  name,
  likes,
  visits,
  picture,
  publisherId,
  publisherName,
  type,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [openShareModal, setOpenShareModal] = useState(false);
  const [publisherInfo, setPublisherInfo] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);

  const [linkCopied, setLinkCopied] = useState(false);

  const [currentContainerWidth, setCurrentContainerWidth] = useState(0);
  const containerMinusImageHeight = 48;
  const containerRef = useRef();
  const divider = 1.7778;

  const { t } = useTranslation();

  const openMenu = Boolean(anchorEl);

  const navigate = useNavigate();

  const getPostPath = () => {
    const postType = type === "E" ? "eventos" : "projetos";
    const postName = name
      .toLowerCase()
      .trim()
      .replaceAll(" ", "_")
      .replaceAll("/", "_");
    return `${postType}/${id}/${postName}`;
  };

  const getPublisherInfo = async () => {
    if (!publisherId || publisherId === undefined) return;
    try {
      const response = await axiosInstance.get(
        `/utilizadores/obterUtilizador/${publisherId}`,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            // Authorization:
            //   "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MiwibmFtZSI6Imh1bWJlcnRvIG5hc2NpbWVudG8iLCJleHBpcmVzX2luIjoxNjc3OTMxODIzfQ.vJnAshie-1hUo_VVKK0QInFI4NpBmx5obuWzOauK4B8",
          },
        }
      );
      const publisherData = response?.data?.dados || 0;
      setPublisherInfo(publisherData);
    } catch (error) {
      console.error(error);
    }
  };

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

  const handleMenuClose = (shouldClose) => {
    if (shouldClose) setAnchorEl(null);
  };

  const handleOpenUserCard = (event) => {
    setAnchorEl(event.currentTarget);
    getPublisherInfo();
  };

  const handleOpen = () => {
    localStorage.setItem("previousLocation", location.pathname);
    navigate(getPostPath());
  };

  const handleOpenShareModal = () => {
    localStorage.setItem(
      "metaData",
      JSON.stringify({
        title: name,
        description: "New Description",
        image: picture,
      })
    );

    window.dispatchEvent(new Event("storage"));

    setOpenShareModal(true);
  };
  const handleCloseShareModal = () => setOpenShareModal(false);

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 1500);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (!containerRef?.current) return;
      setCurrentContainerWidth(containerRef.current.offsetWidth);
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Initial check

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!containerRef?.current) return;
    setCurrentContainerWidth(containerRef.current.offsetWidth);
  }, [containerRef.current]);

  if (isLoading) {
    return (
      <Stack spacing={1}>
        <Skeleton variant="rectangular" width="100%" height="17rem" />
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
        ref={containerRef}
        sx={{
          height: `${
            currentContainerWidth
              ? currentContainerWidth / divider + containerMinusImageHeight
              : 0
          }px`,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            marginBottom: ".25rem",
            position: "relative",
          }}
        >
          {/* <Tooltip title={name}> */}
          <Avatar
            variant="square"
            src={picture}
            alt={`Foto de ${name}`}
            onClick={handleOpen}
            sx={{
              width: "100%",
              height: `${
                currentContainerWidth ? currentContainerWidth / divider : 0
              }px`,
              objectFit: "cover",
              borderTopLeftRadius: ".25rem",
              borderTopRightRadius: ".25rem",
              "&:hover": {
                cursor: "pointer",
              },
            }}
          />
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
          <Typography
            fontWeight="bold"
            fontSize="0.8rem"
            sx={{
              "&:hover": {
                textDecoration: "underline",
                cursor: "pointer",
              },
            }}
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
            <Box sx={{ display: "flex", alignItems: "center", gap: ".125rem" }}>
              <ThumbUp
                // onClick={() => handleLike(false)}
                sx={{ width: 15, height: 15, color: "black" }}
              />
              <Typography
                sx={{ fontWeight: "bold", color: "black", fontSize: ".8rem" }}
                variant="p"
              >
                {likes}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: ".125rem" }}>
              <Visibility
                // onClick={() => handleFavorite(false)}
                sx={{ width: 15, height: 15, color: "black" }}
              />
              <Typography
                sx={{ fontWeight: "bold", color: "black", fontSize: ".8rem" }}
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
        <Box
          width="fit-content"
          alignItems="center"
          gap=".25rem"
          onMouseEnter={handleOpenUserCard}
        >
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
            onClick={() => console.log("squi")}
          >
            {publisherName}
          </Typography>
        </Box>
        <Menu
          anchorEl={anchorEl}
          id="account-menu"
          open={openMenu}
          onClose={() => handleMenuClose(true)}
          PaperProps={{
            elevation: 0,
            sx: {
              overflow: "visible",
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
              mt: 1.5,
            },
          }}
          transformOrigin={{ horizontal: "center", vertical: "top" }}
          anchorOrigin={{ horizontal: "center", vertical: "bottom" }}
          sx={{
            ".MuiList-root": { padding: "0 0 1rem 0" },
          }}
        >
          <MenuItem
            id="user-card"
            sx={{
              padding: "0",
            }}
            onClick={() => handleMenuClose(false)}
            disableRipple
          >
            <UserCard publisher={publisherInfo} />
          </MenuItem>
        </Menu>
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
                  {t("shareModal.partilhePostRedeSociais")}
                </Typography>
                <Box id="media-shares" mt="1rem" display="flex" gap=".25rem">
                  <>
                    <FacebookShareButton
                      url={"https://comein.cv/" + getPostPath()}
                      quote={"Post it with your friends"}
                      hashtag="comeincv"
                      media={picture}
                    >
                      <FacebookIcon size={40} round />
                    </FacebookShareButton>
                  </>

                  <FacebookMessengerShareButton
                    appId="976472220466365"
                    url={"https://comein.cv/"}
                  >
                    <FacebookMessengerIcon size={40} round />
                  </FacebookMessengerShareButton>
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
                  {linkCopied
                    ? t("shareModal.ligacaoCopiada")
                    : t("shareModal.copiarLigacao")}
                </Button>
              </Box>
            </Box>
          </Box>
        </Modal>
      </Box>
    </>
  );
};

export default CustomCard;
