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
    const response = await fetchMoviesWithRetry(query);
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

router.post("/update", async (req, res) => {
  const { username, email, password } = req.body;
  console.log(req.body);
  try {
    // Query the database to find the user by username or email
    const user = await knex("user").where("username", username).first();
    console.log(user);
    if (user) {
      // Compare passwords
      const passwordMatch = await bcrypt.compare(password, user.password);

      if (passwordMatch) {
        // Passwords match, login successful
        res.status(200).json({ message: "Login successful", user });
      } else {
        // Passwords don't match
        res
          .status(401)
          .json({ message: "Invalid username, email, or password" });
      }
    } else {
      // User not found
      res.status(401).json({ message: "Invalid username, email, or password" });
    }
  } catch (error) {
    console.error("Error during login:", error);
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
          },
        }
      );
      if (response.status != 200 && response.status != 404) {
        console.log(response);
        throw new Error(`Request failed`);
      }
      return response; // If successful, return data
    } catch (error) {
      console.error(`Attempt ${i + 1} failed:`, error.message);
      await new Promise((resolve) => setTimeout(resolve, delay)); // Wait for specified delay
    }
  }
  throw new Error(`Failed to fetch data after ${retries} attempts`);
}

module.exports = router;
