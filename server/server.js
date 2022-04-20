const express = require("express");
const cors = require("cors");

const server = express();

server.use(cors());
server.use(express.json());

const scoreRoutes = require("./routes/scoreRoutes");
server.use("/scores", scoreRoutes);

let msg = `
<ul> 
<p>Quiz App:</p>
<li>/scores   Returns all scores from the db</li>
<li>scores/:id   Returns specific score by id</li>
</ul>`;
server.get("/", (req, res) => res.send(msg));

module.exports = server;
