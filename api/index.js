import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";

import authRoute from "./routes/auth.js";
import usersRoute from "./routes/users.js";
import videoRoute from "./routes/videos.js";
import commentRoute from "./routes/comments.js";

const app = express();
dotenv.config();

const connectToMongoDb = (URL) => {
  mongoose
    .connect(URL)
    .then(() => {
      console.log("successfully connected to DB");
    })
    .catch((err) => {
      console.log(err);
    });
};

app.use(cookieParser());
app.use(express.json());
app.use("/api/auth/", authRoute);
app.use("/api/users/", usersRoute);
app.use("/api/videos/", videoRoute);
app.use("/api/comments", commentRoute);

app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Something went wrong";
  return res.status(status).json({
    success: false,
    status,
    message,
  });
});

app.listen(8800, () => {
  connectToMongoDb(process.env.MONGO_URL);
  console.log(`listening on port 8800`);
});
