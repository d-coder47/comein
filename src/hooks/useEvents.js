import React from "react";

const useEvents = () => {
  const getEvents = () => {
    fetch("/data/events.json")
      .then((response) => response.json())
      .then((data) => {
        // 'data' contains the parsed JSON content
        // You can store it in an array or perform any other operations
        const jsonArray = data; // Store the parsed JSON array in a variable
        console.log(jsonArray); // Example: Display the array in the console
      })
      .catch((error) => {
        // Handle any errors that occur during the fetch or parsing process
        console.error("Error:", error);
      });
  };

  return {
    getEvents,
  };
};

export default useEvents;
