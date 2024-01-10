const express = require("express");

const app = express();

const PORT = process.env.PORT || 8080;

app.get("/api/changeMetaData", (req, res) => {
  res.send("metadata changed");
});

app.listen(PORT, () => console.log(`Server  start listening on por ${PORT}`));
