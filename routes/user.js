const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
require("dotenv").config();


const knex = require("knex")(require("../knexfile"));

router.post("/login", async (req, res) => {
  const { username, email, password } = req.body;
  console.log(req.body);
  try {
    // Query the database to find the user by username or email
    const user = await knex("user").where("name", username).first();
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

router.post("/register", async (req, res) => {
  const { 
    username, 
    email, 
    password, 
  } = req.body;

  if (
    !username ||
    !email ||
    !password 
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const emailRegex =
    /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: "Invalid email address" });
  }

   bcrypt
     .hash(password, 10)
     .then((hashedPassword) => {
       return knex("user").insert({
         username,
         email,
         password: hashedPassword,
       });
     })
     .then(() => {
       res.status(201).json({ message: "User registered successfully" });
     })
     .catch((error) => {
       console.error("Error registering user:", error);
       res.status(500).json({ message: "Internal server error" });
     });
});

module.exports = router;
