import React from "react";
import { Box, Avatar, Typography } from "@mui/material";

const Category = ({ name, icon }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Avatar
        alt="category"
        src={icon}
        sx={{ width: 45, height: 45, cursor: "pointer" }}
      />
      <Typography
        fontSize={14}
        sx={{
          whiteSpace: "nowrap",
          "&:hover": { cursor: "pointer", textDecoration: "underline" },
        }}
      >
        {name}
      </Typography>
    </Box>
  );
};

export default Category;
