import React, { useEffect, useRef } from "react";
import { Box, Grid } from "@mui/material";
import CustomCard from "./CustomCard";
import useEvents from "../hooks/useEvents";

const cards = [
  "1",
  "1",
  "1",
  "1",
  "1",
  "1",
  "1",
  "1",
  "1",
  "1",
  "1",
  "1",
  "1",
  "1",
  "1",
  "1",
  "1",
  "1",
];

const ProfileCards = () => {
  const containerRef = useRef(null);

  const handleScroll = () => {
    const container = containerRef.current;

    if (container) {
      const { scrollTop, scrollHeight, clientHeight } = container;

      if (scrollTop + clientHeight === scrollHeight) {
        console.log("Reached the end of scroll");
        // Perform any actions or fetch more data here
      } else {
        console.log("here");
      }
    }
  };

  let gridNum;
  useEffect(() => {
    if (window.innerWidth <= 1366) {
      gridNum = 12;
    } else {
      gridNum = 4;
    }
    if (!containerRef.current) return;
    const container = containerRef.current;
    container.addEventListener("scroll", handleScroll);
    return () => {
      container.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Box sx={{ margin: "2rem", flexGrow: 1 }}>
      <Grid container sx={{ justifyContent: "center" }} spacing={2}>
        {cards.map((card, index) => (
          <Grid key={index} item xs={gridNum}>
            <CustomCard key={index} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ProfileCards;
