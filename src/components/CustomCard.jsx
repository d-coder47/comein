import React, { useEffect, useState } from "react";

import {
  Avatar,
  Box,
  Typography,
  Icon,
  Badge,
  Modal,
  Tooltip,
} from "@mui/material";
import {
  ThumbUpOffAlt,
  ThumbUp,
  Star,
  StarOutline,
  Reply,
} from "@mui/icons-material";

import CardDetailed from "./CardDetailed";
import CustomBadge from "./CustomBadge";

const CustomCard = ({
  id = null,
  name,
  picture,
  publisherName,
  publisherPhoto,
  type,
}) => {
  const [showTitle, setshowTitle] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Box
      sx={{
        height: "19rem",
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
        <Tooltip title={name}>
          <Avatar
            variant="square"
            src={picture || null}
            alt="event1"
            sx={{
              width: "100%",
              height: "17rem",
              objectFit: "cover",
              "&:hover": {
                cursor: "pointer",
                borderRadius: "0.25rem",
              },
            }}
          />
        </Tooltip>
        {/* <Typography
            sx={{
              color: showTitle ? "#fff" : "transparent",
              marginLeft: "1rem",
              marginTop: "-2rem",
              fontWeight: "bold",
              // width: "fit-content",
              zIndex: 99,
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              overflow: "hidden",
              width: "65%",
              "&:hover": {
                textDecoration: "underline",
                cursor: "pointer",
              },
            }}
            onClick={handleOpen}
          >
            {name}
          </Typography> */}
        {showTitle ? (
          <Box
            sx={{ position: "absolute", top: "-0.25rem", right: "-0.125rem" }}
          >
            <CustomBadge isEvent={type === "E"} />
          </Box>
        ) : null}
      </Box>
      <Box sx={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
        <Avatar
          alt="avatar"
          src={publisherPhoto || null}
          sx={{ width: 18, height: "auto" }}
        />
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
          {publisherName}
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
        {open ? (
          <CardDetailed
            id={id}
            publisherPhoto={publisherPhoto}
            publishers={[publisherName]}
            title={name}
            type={type}
            picture={picture}
          />
        ) : (
          <div></div>
        )}
      </Modal>
    </Box>
  );
};

export default CustomCard;
