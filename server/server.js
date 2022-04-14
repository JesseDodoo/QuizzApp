const express = require("express");
const cors = require("cors");

const server = express();

server.use(cors());
server.use(express.json());

let msg = `
Quiz App:
/ Returns all scores from the db,
/:id Returns specific score by ID`;
server.get("/", (req, res) => res.send(msg));

module.exports = server;
