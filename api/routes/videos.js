import express from "express";

import {
  addVideo,
  updateVideo,
  deleteVideo,
  getVideo,
  addView,
  trend,
  random,
  sub,
  getByTag,
  search,
} from "../controllers/video.js";
import { verifyToken } from "../utils/verifyToken.js";

const router = express.Router();

//create a video
router.post("/", verifyToken, addVideo);

//update a video
router.put("/:id", verifyToken, updateVideo);

//delete a video
router.delete("/:id", verifyToken, deleteVideo);

//get a video
router.get("/find/:id", getVideo);

//update a video views
router.put("/view/:id", addView);

//get trend videos
router.get("/trend/:id", trend);

//get random videos
router.get("/random/", random);

//get sub videos
router.get("/sub/", verifyToken, sub);

//get video by tags
router.get("/tags", getByTag);

//get search a video
router.get("/search", search);

export default router;
