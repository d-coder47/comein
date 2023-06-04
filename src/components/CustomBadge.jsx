import { Bookmark } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import React from "react";

const CustomBadge = ({ isEvent = true }) => {
  return (
    <Box
      sx={{
        display: "flex",
        justitfyContent: "center",
        alignItems: "center",
        position: "relative",
      }}
      justifyContent="center"
    >
      <Bookmark
        sx={{
          fontSize: 50,
          color: (theme) => theme.palette.secondary.main,
        }}
      />
      <Box sx={{ position: "absolute" }}>
        <Typography color="white" fontWeight="bold">
          {isEvent ? "E" : "P"}
        </Typography>
      </Box>
    </Box>
  );
};

export default CustomBadge;
