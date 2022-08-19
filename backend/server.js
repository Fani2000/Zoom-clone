const express = require("express");

const app = express();
const server = require("http").createServer(app);

const io = require("socket.io")(server);
const port = 3000;

io.on("connection", (socket) => {
  console.log("a user connect :d");
  socket.on("join-room", ({ roomId, userId }) => {
    console.log("User Joined room");
    console.log(roomId);
    console.log(userId);
  });
});

app.get("/", (req, res) => {});

server.listen(port, () => {
  console.log("Listening in PORT:", port);
});
