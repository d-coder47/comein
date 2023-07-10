import React from "react";
import { Box, Button } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";

import { useNavigate } from "react-router-dom";

export default function MapButton() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        width: "2.5rem",
        height: "2.5rem",
        backgroundColor: "#33B3CC",
        position: "fixed",
        bottom: "25px",
        right: "20px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: "50%",
        cursor: "pointer",
        "&:hover": {
          backgroundColor: "#743600",
        },
      }}
    >
      <Button onClick={() => navigate("/map")}>
        <LocationOnIcon
          sx={{
            color: "#fff",
            fontSize: "2rem",
          }}
        />
      </Button>
    </Box>
  );
}
