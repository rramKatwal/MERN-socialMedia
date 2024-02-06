import express from "express";
import {
  getAllPosts,
  imagePosts,
  videoPosts,
} from "../controllers/postsController.js";
import { imageUpload, videoUpload } from "../functions/multer.js";

const router = express.Router();

router.get("/all-posts", getAllPosts);
router.post("/posts/image", imageUpload.array("images", 5), imagePosts);
router.post("/posts/video", videoUpload.array("videos", 5), videoPosts);

export default router;
