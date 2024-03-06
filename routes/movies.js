const fetch = require("node-fetch");
const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");
const fs = require("fs");
var cors = require("cors");

const url = "https://api.themoviedb.org/3/account/null";
const options = { method: "GET", headers: { accept: "application/json" } };

fetch(url, options)
  .then((res) => res.json())
  .then((json) => console.log(json))
  .catch((err) => console.error("error:" + err));