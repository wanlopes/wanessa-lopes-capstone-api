const express = require("express");
const router = express.Router();
const axios = require("axios");
require("dotenv").config();

const {
  validateItemInput,
  validateMiddleware,
} = require("../middleware/validationMiddleware");

const knex = require("knex")(require("../knexfile"));

router.get("/search", async (req, res) => {
  const query = req.query.query;
  console.log(query);
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/search/movie`,
      {
        params: {
          api_key: process.env.YOUR_TMDB_API_KEY,
          query: query,
          include_adult: false,
        },
      }
    );

    const movies = response.data.results.map((movie) => ({
      id: movie.id,
      title: movie.title,
      poster_path: movie.poster_path,
      vote_average: movie.vote_average,
    }));

    res.json(movies);
  } catch (error) {
    console.error("Error fetching data from TMDb:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
