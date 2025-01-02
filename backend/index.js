import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRoute from "./routes/user.route.js";
import messageRoute from "./routes/message.route.js";

import { app, server } from "./SocketIO/server.js";

dotenv.config();

app.use(express.json());
app.use(cors());
app.use(cookieParser());

const port=process.env.PORT || 3000;
const URI=process.env.MONGODB_URI;

try {
    mongoose.connect(URI);
    console.log("Connected to MongoDB");
} catch (error) {
    console.log(error);
}

app.use("/api/user",userRoute);
app.use("/api/message", messageRoute);

server.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})