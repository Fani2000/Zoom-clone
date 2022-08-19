const express = require("express");

const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);

let users = [];
const port = 3000;

io.on("connection", (socket) => {
  console.log("a user connect :d");
  socket.on("join-room", ({ roomId, userId }) => {
    console.log("User Joined room", roomId, userId);
    addUsers(userId, roomId);
    socket.join(roomId);
    socket.to(roomId).emit("user-connected", userId);

    io.to(roomId).emit("all-users", getRoomUsers(roomId));

    socket.on("disconnect", () => {
      console.log(`user ${userId} has left the room.`);
      socket.leave(roomId);

      userLeave(userId);
      io.to(roomId).emit("all-users", getRoomUsers(roomId));
    });
  });
});

app.get("/", (req, res) => {});

const userLeave = (userId) => {
  users = users.filter((user) => user.userId != userId);
};

const getRoomUsers = (roomId) => {
  return users.filter((user) => user.roomId === roomId);
};

const addUsers = (userId, roomId) => {
  users.push({
    userId,
    roomId,
  });
};

server.listen(port, () => {
  console.log("Listening in PORT:", port);
});
