const express = require("express");
const cors = require("cors");
const http = require("http");
const socketio = require("socket.io");
const { handleJoin } = require("./utils/rooms");

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = socketio(server, {
  cors: {
    origin: "*",
  },
});

app.use(express.json());

const scoreRoutes = require("./routes/scoreRoutes");
app.use("/scores", scoreRoutes);

let msg = `
<ul> 
<p>Quiz App:</p>
<li>/scores   Returns all scores from the db</li>
<li>scores/:id   Returns specific score by id</li>
</ul>`;
app.get("/", (req, res) => res.send(msg));

io.on("connection", (socket) => {
  console.log("New websocket connected");

  socket.on("joinRoom", (user, room, quizData, callback) => {
    let resp = handleJoin(user, room, quizData);
    socket.join(room);
    socket.broadcast.to(room).emit("joined", resp);

    callback(resp);
  });
});

module.exports = server;

// const roomExists = rooms.find((r) => r.id === room);
// if (!roomExists) {
//   rooms.push({ id: room, players: [user] });
//   callback(rooms.find((r) => r.id === room));
// } else {
//   roomExists.players.push(user);
// }
// console.log(rooms);
// console.log(`${user} has joined room: ${room}`);
