import React from "react";
import { Box, Avatar, Typography } from "@mui/material";

const Category = ({ name, icon, onCategoryClick, isSelected }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
      }}
      onClick={() => onCategoryClick(name)}
    >
      <Avatar
        alt="category"
        src={icon}
        sx={{
          width: 45,
          height: 45,
          border: (theme) =>
            isSelected ? `2px solid ${theme.palette.primary.main}` : "none",
        }}
      />
      <Typography
        fontSize={14}
        sx={{
          whiteSpace: "nowrap",
          fontWeight: isSelected ? "bold" : "normal",
          color: (theme) =>
            isSelected ? theme.palette.primary.main : "normal",
        }}
      >
        {name}
      </Typography>
    </Box>
  );
};

export default Category;
