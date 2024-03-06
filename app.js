const express = require("express");
const app = express();
const port = process.env.PORT || 8080;
const knex = require("knex");
const axios = require("axios");

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
