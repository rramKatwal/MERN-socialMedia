import express from "express";
import { Login, Register } from "../controllers/authController.js";
import { ResetPassword, sendMail } from "../controllers/resetController.js";
import { imageUpload } from "../functions/multer.js";

const router = express.Router();

router.post("/register", imageUpload.single("profilePicture"), Register);
router.post("/login", Login);
router.post("/mail", sendMail);
router.post("/reset-password", ResetPassword);

export default router;
