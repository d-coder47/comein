import React from "react";
import { Box, Avatar, Typography, Tooltip } from "@mui/material";

const Category = ({ id, name, icon, onCategoryClick, isSelected }) => {
  return (
    <Box
      className="category"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
      }}
      onClick={() => onCategoryClick(id, name)}
    >
      <Avatar
        alt="category"
        src={icon}
        sx={{
          width: 38,
          height: 38,
          padding: ".25rem",
          border: (theme) => `2px solid ${theme.palette.primary.main}`,
        }}
      />
      <Tooltip title={name}>
        <Typography
          fontSize={11}
          sx={{
            fontWeight: isSelected ? "bold" : "normal",
            overflow: "hidden",
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
            textAlign: "center",
            width: "80%",
            color: (theme) =>
              isSelected ? theme.palette.primary.main : "normal",
          }}
        >
          {name}
        </Typography>
      </Tooltip>
    </Box>
  );
};

export default Category;
