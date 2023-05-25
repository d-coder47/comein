import { Box } from "@mui/material";
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
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        gap: "0.5rem",
        maxWidth: "99vw",
        // justifyContent: "space-between",
      }}
    >
      {cards.map((card) => (
        <Box sx={{ maxWidth: "19%" }}>
          <CustomCard />
        </Box>
      ))}
    </Box>
  );
};

export default Cards;
