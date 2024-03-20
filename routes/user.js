const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
require("dotenv").config();
const { v4: uuidv4 } = require("uuid");
const jwt = require("jsonwebtoken");
const knex = require("knex")(require("../knexfile"));
const secretKey = process.env.JSON_SECRET_KEY;

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  console.log(req.body);
  try {
    const user = await knex("user").where("username", username).first();
    if (user) {
      // Compare passwords
      const passwordMatch = await bcrypt.compare(password, user.password);

      if (passwordMatch) {
        delete user.password;
        console.log(user);
        const token = jwt.sign(
          { userId: user.id, userName: user.username },
          secretKey,
          {
            expiresIn: "7d",
          }
        );
        res.status(200).json({ message: "Login successful", user, token });
      } else {
        // Passwords don't match
        // res
        //   .status(401)
        //   .json({ message: "Invalid username, email, or password" });
        res.status(401).send("Invalid password!");
      }
    } else {
      // User not found`
      res.status(401).send("Invalid username or email!");
      // res.status(401).json({ message: "Invalid username, email, or password" });
    }
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const emailRegex =
    /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: "Invalid email address" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const userId = uuidv4();

    await knex("user").insert({
      id: userId,
      username,
      email,
      password: hashedPassword,
    });

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
