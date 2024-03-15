const express = require("express");
const app = express();
const port = process.env.PORT || 8080;
const knex = require("knex")(require("./knexfile"));
const axios = require("axios");
const cors = require("cors");

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

//middleware
app.use(cors());
app.use(express.json());

//route imports
const moviesRoute = require("./routes/movies");
const userRoute = require("./routes/user");

//routes
app.use("/api/movies", moviesRoute);
app.use("/api/user", userRoute);