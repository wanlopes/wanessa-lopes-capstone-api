const express = require("express");
const app = express();
const port = process.env.PORT || 8080;
const knex = require("knex")(require("./knexfile"));
const axios = require("axios");

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

//middleware
app.use(cors());
app.use(express.json());

//test connetion routes
app.get("/test1", (req, res) => {
  res.send("THIS IS THE SERVER!!!");
});
