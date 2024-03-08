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

