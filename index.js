const express = require("express");
const app = express();
const path = require("path");
const http = require("http");
const server = http.createServer(app);
const port = 8000;

const { Server } = require("socket.io");
const io = new Server(server);

//socket.io
io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("join room", (roomCode) => {
    socket.join(roomCode);
    console.log(`User joined room ${roomCode}`);
  });

  socket.on("chat message", ({ room, msg }) => {
    io.to(room).emit("chat message", msg);
  });
});


app.get("/", (req, res) => {
  return res.sendFile(path.resolve("./public/room.html")); // new room selection page
});

app.get("/chat", (req, res) => {
  return res.sendFile(path.resolve("./public/index.html"));
});

app.use(express.static(path.resolve("./public")));


server.listen(port, () => console.log(`server started at port ${port}`));
