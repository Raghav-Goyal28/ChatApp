import {Server} from "socket.io";
import http from "http";
import express from "express"
const app = express();


const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3001",
    methods: ["GET", "POST"],
  },
});

const users = {};


// realtime message code goes here
export const getReceiverSocketId = (receiverId) => {
    return users[receiverId];
  };

// used to listen events on server side.
io.on("connection", (socket) => {
    console.log("a user connected", socket.id);
//baad me
const userId = socket.handshake.query.userId;
if (userId) {
  users[userId] = socket.id;
  console.log("Hello ", users);
}
 // used to send the events to all connected users
 io.emit("getOnlineUsers", Object.keys(users));

    socket.on("disconnect", () => {
        console.log("a user disconnected", socket.id);
         delete users[userId];
    io.emit("getOnlineUsers", Object.keys(users));
      });
    });

    export{app,io,server};