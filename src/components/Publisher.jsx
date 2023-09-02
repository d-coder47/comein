import React, { useEffect, useRef, useState } from "react";
import { Avatar, Box, Menu, MenuItem, Typography, Stack } from "@mui/material";
import { ArrowDropDown, LocationOn } from "@mui/icons-material";

import UserCard from "./UserCard";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Publisher = ({
  publishers = [{ nome: "" }],
  isFollowing = false,
  onFollowUser,
  isOwner,
}) => {
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [showUserCard, setShowUserCard] = useState(false);

  const userCardRef = useRef(null);
  const userCardParentRef = useRef(null);

  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  useEffect(() => {
    if (!userCardRef.current) return;
    const mouseMoveHandler = (e) => {
      const mousePosition = {
        x: e.clientX,
        y: e.clientY,
      };

      // Check if the mouse position is within the div's boundaries.
      const userCardBounds = userCardRef.current.getBoundingClientRect();
      const isInsideUserCard =
        mousePosition.x >= userCardBounds.left &&
        mousePosition.x <= userCardBounds.right &&
        mousePosition.y >= userCardBounds.top &&
        mousePosition.y <= userCardBounds.bottom;

      const userCardParentBounds =
        userCardParentRef.current.getBoundingClientRect();
      const isInsideUserCardParent =
        mousePosition.x >= userCardParentBounds.left &&
        mousePosition.x <= userCardParentBounds.right &&
        mousePosition.y >= userCardParentBounds.top &&
        mousePosition.y <= userCardParentBounds.bottom;

      if (isInsideUserCard || isInsideUserCardParent) {
        setShowUserCard(true);
        console.log("mouse over", true);
      } else {
        setShowUserCard(false);
        console.log("mouse over", false);
      }
    };

    window.addEventListener("mousemove", mouseMoveHandler);

    return () => {
      window.removeEventListener("mousemove", mouseMoveHandler);
    };
  }, []);

  return (
    <Box>
      {publishers?.length > 1 ? (
        <Box>
          <Box
            display="flex"
            gap=".25rem"
            sx={{
              cursor: "pointer",
            }}
          >
            <Typography
              onMouseEnter={handleOpenUserMenu}
              sx={{
                cursor: "pointer",
              }}
            >
              {t("cardDetailed.userCard.variousOwners")}
            </Typography>
            <ArrowDropDown
              onMouseEnter={handleOpenUserMenu}
              sx={{
                cursor: "pointer",
              }}
            />
          </Box>
          <Menu
            sx={{ mt: "45px", ".MuiPaper-root": { padding: ".25rem .5rem" } }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            {publishers.map((publisher, index) => (
              <MenuItem
                key={publisher.nome + index}
                onClick={handleCloseUserMenu}
              >
                <PublisherCard
                  publisher={publisher}
                  isFollowing={isFollowing}
                  isOwner={isOwner}
                />
              </MenuItem>
            ))}
          </Menu>
        </Box>
      ) : (
        <>
          <Typography
            ref={userCardParentRef}
            fontWeight="bold"
            color="black"
            fontSize="0.9rem"
            onMouseEnter={() => setShowUserCard(true)}
            // onMouseLeave={() => setShowUserCard(false)}
            sx={{
              "&:hover": {
                textDecoration: "underline",
                cursor: "pointer",
              },
            }}
            onClick={() =>
              navigate(
                `/user-profile/${publishers[0].id}/${publishers[0].nome}`
              )
            }
          >
            {publishers[0]?.nome}
          </Typography>
          <Box
            ref={userCardRef}
            sx={{
              position: "absolute",
              zIndex: "9",
              width: "22rem",
              paddingBottom: "1.25rem",
              backgroundColor: "white",
              borderRadius: "0.25rem",
              display: showUserCard ? "flex" : "none",
            }}
          >
            <UserCard
              publisher={publishers[0]}
              isFollowing={isFollowing}
              onFollowUser={onFollowUser}
              isOwner={isOwner}
            />
          </Box>
        </>
      )}
    </Box>
  );
};

export default Publisher;

const PublisherCard = ({ publisher, isFollowing, isOwner }) => {
  const getResidencia = (residencia) => {
    return residencia === "MUNDO" || residencia === null
      ? ""
      : `${residencia}, `;
  };
  const { t } = useTranslation();
  return (
    <Box display="flex" alignItems="center" gap=".5rem">
      <Avatar
        src={`https://comein.cv/comeincv_api_test/img/perfilImg/${publisher.img_perfil}`}
        alt={`Foto de ${publisher?.nome}`}
      >
        {publisher?.nome ? publisher?.nome[0] : "A"}
      </Avatar>
      <Stack>
        <Typography ml=".25rem">{publisher?.nome}</Typography>
        <Stack direction="row" alignItems="center" spacing={0.25}>
          <LocationOn sx={{ color: "gray" }} fontSize="1.25rem" />
          <Typography>
            {`${getResidencia(publisher.residencia)}`} {publisher.pais}
          </Typography>
        </Stack>
      </Stack>
      <Box
        sx={{
          backgroundColor: (theme) => theme.palette.primary.main,
          padding: ".25rem .5rem",
          borderRadius: ".25rem",
          marginLeft: "1rem",
          color: "white",
          "&:hover": {
            backgroundColor: (theme) => theme.palette.primary.dark,
          },
        }}
      >
        {isOwner
          ? t("cardDetailed.userCard.accessYourPage")
          : isFollowing
          ? t("cardDetailed.userCard.following")
          : t("cardDetailed.userCard.follow")}
      </Box>
    </Box>
  );
};
