const axios = require("axios");

// Define the function to fetch post by ID
async function getPostById(id) {
  try {
    const url = `https://comein.cv/comeincv_api_250923/eventos/listar/${id}`;
    const response = await axios.get(url);
    return response.data.dados;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error; // Re-throw the error to propagate it to the caller
  }
}

// Export the function
module.exports = getPostById;
