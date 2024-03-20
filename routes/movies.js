const express = require("express");
const router = express.Router();
const axios = require("axios");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const secretKey = process.env.JSON_SECRET_KEY;

const {
  validateItemInput,
  validateMiddleware,
} = require("../middleware/validationMiddleware");

const knex = require("knex")(require("../knexfile"));

router.get("/user/", authorize, async (req, res) => {
  let userId = req.decoded.userId;
  try {
    const movies = await knex("movies").where("user_id", userId);
    if (movies) {
      res
        .status(200)
        .json({ message: "Movies retrieved successfully", movies });
    } else {
      res.status(404).json({ message: "Movies not found!" });
    }
  } catch (error) {
    console.error("Error when retrieving movies:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/search", async (req, res) => {
  const query = req.query.query;
  try {
    const response = await fetchMoviesWithRetry(query);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/update", async (req, res) => {
  const {
    id,
    user_id,
    title,
    poster_path,
    vote_average,
    watch,
    watched,
    favorite,
  } = req.body;
  console.log(req.body);
  try {
    const movie = await knex("movies").where("id", id).first();
    console.log(movie);
    if (movie) {
      res.status(200).json({ message: "Movies was found", movie });
    } else {
      res.status(404).json({ message: "Movie not found" });
    }
  } catch (error) {
    console.error("Error updating movie:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

async function fetchMoviesWithRetry(query, retries = 20, delay = 10) {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/search/movie`,
        {
          params: {
            api_key: process.env.YOUR_TMDB_API_KEY,
            query: query,
            include_adult: false,
            language: "en-US",
          },
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );
      if (![200, 304, 404].includes(response.status)) {
        console.log(response.status);
        throw new Error(`Request failed`);
      }
      const movies = response.data.results.map((movie) => ({
        id: movie.id,
        title: movie.title,
        poster_path: movie.poster_path,
        vote_average: movie.vote_average,
      }));
      return movies; // If successful, return data
    } catch (error) {
      await new Promise((resolve) => setTimeout(resolve, delay)); // Wait for specified delay
    }
  }
  throw new Error(`Failed to fetch data after ${retries} attempts`);
}

function authorize(req, res, next) {
  const token =
    req.headers.authorization && req.headers.authorization.split(" ")[1];
  if (!token) {
    return res
      .status(401)
      .json({ error: { message: "Bearer token is missing" } });
  }
  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: { message: "Invalid token" } });
    }
    req.decoded = decoded;
    next();
  });
}

module.exports = router;
