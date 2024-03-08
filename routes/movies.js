const fetch = require("node-fetch");
const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");
const fs = require("fs");


const {
  validateItemInput,
  validateMiddleware,
} = require("../../middleware/validationMiddleware");

const knex = require("knex")(require("../../knexfile"));

const API_KEY = "YOUR_TMDB_API_KEY"; // Replace this with your actual TMDb API key

router.get("/search", async (req, res) => {
  const query = req.query.query; 

  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/search/movie`,
      {
        params: {
          api_key: API_KEY,
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