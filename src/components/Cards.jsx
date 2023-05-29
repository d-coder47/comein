import { Box, Grid } from "@mui/material";
import React, { useEffect, useRef } from "react";
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

const Cards = () => {
  const { getEvents } = useEvents();

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

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    container.addEventListener("scroll", handleScroll);
    return () => {
      container.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // const getEventsAndProjects = () => {
  // 	getEvents()
  // }

  // useEffect(() => {
  //   getEvents();
  // }, []);

  return (
    <Box sx={{ margin: "2rem", flexGrow: 1 }}>
      <Grid
        container
        // sx={{
        //   display: "flex",
        //   flexWrap: "wrap",
        //   gap: "0.5rem",
        //   maxWidth: "99vw",
        //   // justifyContent: "space-between",
        // }}
        gap={2}
      >
        {cards.map((card, index) => (
          <Grid key={index} xs={2.3}>
            <CustomCard key={index} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Cards;
