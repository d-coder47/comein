import React, { useState } from "react";

import { Avatar, Box, Typography, Icon, Badge, Modal } from "@mui/material";
import {
  ThumbUpOffAlt,
  ThumbUp,
  Star,
  StarOutline,
  Reply,
  Bookmark,
} from "@mui/icons-material";

import event1 from "../assets/img/event1.jpg";
import event2 from "../assets/img/event2.jpg";
import event3 from "../assets/img/event3.jpg";
import avatar from "../assets/img/avatar.jpg";

import CardDetailed from "./CardDetailed";
import CustomBadge from "./CustomBadge";

const CustomCard = () => {
  const [showTitle, setshowTitle] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Box
      sx={{
        height: "10rem",
      }}
      onMouseEnter={() => setshowTitle(true)}
      onMouseLeave={() => setshowTitle(false)}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          marginBottom: "1rem",
          position: "relative",
        }}
      >
        <Avatar
          variant="square"
          src={event2}
          alt="event1"
          sx={{
            width: "100%",
            height: "8rem",
            objectFit: "cover",
            "&:hover": {
              cursor: "pointer",
              borderRadius: "0.25rem",
            },
          }}
        />
        <Typography
          sx={{
            color: showTitle ? "#fff" : "transparent",
            marginLeft: "1rem",
            marginTop: "-2rem",
            fontWeight: "bold",
            width: "fit-content",
            zIndex: 99,
            "&:hover": {
              textDecoration: "underline",
              cursor: "pointer",
            },
          }}
          onClick={handleOpen}
        >
          Título do Evento
        </Typography>
        {showTitle ? (
          <Box
            sx={{ position: "absolute", top: "-0.25rem", right: "-0.125rem" }}
          >
            <CustomBadge />
          </Box>
        ) : null}
      </Box>
      <Box sx={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
        <Avatar alt="avatar" src={avatar} sx={{ width: 18, height: 18 }} />
        <Typography
          fontWeight="bold"
          fontSize="0.9rem"
          sx={{
            "&:hover": {
              textDecoration: "underline",
              cursor: "pointer",
            },
          }}
        >
          Nome Publicador
        </Typography>

        <Box sx={{ display: "flex", marginLeft: "auto" }}>
          {isLiked ? (
            <ThumbUp
              onClick={() => setIsLiked(false)}
              sx={{ width: 18, height: 18, cursor: "pointer" }}
            />
          ) : (
            <ThumbUpOffAlt
              onClick={() => setIsLiked(true)}
              sx={{ width: 18, height: 18, cursor: "pointer" }}
            />
          )}
          {isFavorite ? (
            <Star
              onClick={() => setIsFavorite(false)}
              sx={{ width: 18, height: 18, cursor: "pointer" }}
            />
          ) : (
            <StarOutline
              onClick={() => setIsFavorite(true)}
              sx={{ width: 18, height: 18, cursor: "pointer" }}
            />
          )}
          <Reply
            sx={{
              width: 18,
              height: 18,
              cursor: "pointer",
              transform: "scaleX(-1)",
            }}
          />
        </Box>
      </Box>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{
          ".MuiModal-backdrop": {
            backgroundColor: "rgba(0,0,0,.9)",
          },
        }}
      >
        <CardDetailed
          publisherPhoto={avatar}
          publishers={["Hélio Batalha"]}
          title={"Di Cairo a Cabo"}
          type="event"
          pictures={[event1, event2, event3]}
        />
      </Modal>
    </Box>
  );
};

export default CustomCard;
