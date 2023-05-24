import React, { useState } from "react";

import { Avatar, Box, Typography, Icon } from "@mui/material";
import {
  ThumbUpOffAlt,
  ThumbUp,
  Star,
  StarOutline,
  Reply,
} from "@mui/icons-material";

import event2 from "../assets/img/event2.jpg";
import avatar from "../assets/img/avatar.jpg";

const CustomCard = () => {
  const [showTitle, setshowTitle] = useState(false);

  return (
    <Box
      sx={{
        margin: "2rem",
        width: "100%",
      }}
      onMouseEnter={() => setshowTitle(true)}
      onMouseLeave={() => setshowTitle(false)}
    >
      <Box
        sx={{
          // maxWidth: 300,
          display: "flex",
          flexDirection: "column",
          marginBottom: "1rem",
        }}
      >
        <Avatar
          variant="square"
          src={event2}
          alt="event1"
          sx={{
            width: "95%",
            height: "100%",
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
            "&:hover": {
              textDecoration: "underline",
              cursor: "pointer",
            },
          }}
        >
          Título do Evento
        </Typography>
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
          <ThumbUpOffAlt sx={{ width: 18, height: 18, cursor: "pointer" }} />
          {/* <ThumbUp sx={{  width: 18, height: 18, cursor: "pointer" }} /> */}
          <Star sx={{ width: 18, height: 18, cursor: "pointer" }} />
          {/* <StarOutline sx={{  width: 18, height: 18, cursor: "pointer" }} /> */}
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
    </Box>
  );
};

export default CustomCard;
