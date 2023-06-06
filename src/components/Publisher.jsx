import { Box, Typography } from "@mui/material";
import React from "react";

const Publisher = ({ publishers = [{ nome: "" }] }) => {
  return (
    <Box>
      {publishers?.length > 0 ? (
        <Box>Hello</Box>
      ) : (
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
          {publishers[0]?.nome}
        </Typography>
      )}
    </Box>
  );
};

export default Publisher;
