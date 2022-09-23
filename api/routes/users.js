import express from "express";
import {
  getUser,
  deleteUser,
  updateUser,
  subscribe,
  unSubscribe,
  like,
  dislike,
} from "../controllers/user.js";

import { verifyToken } from "../utils/verifyToken.js";
const router = express.Router();

//update user
router.put("/:id", verifyToken, updateUser); //before upate, we have to verify the user first otherwise any user can just update

//delete user
router.delete("/:id", verifyToken, deleteUser);

//get a user
router.get("/find/:id", getUser);

//subscribe a user
router.put("/sub/:id", verifyToken, subscribe); //id of the channel to which we want to subscribe

//unsubscribe a user
router.put("/unsub/:id", verifyToken, unSubscribe); //id of the channel to which we want to unsubscribe

//like a video
router.put("/like/:videoId", verifyToken, like);

//unlike a video
router.put("/dislike/:videoId", verifyToken, dislike);

export default router;
