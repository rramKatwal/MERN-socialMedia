import express from "express";
import {
  deleteUser,
  getUserbyID,
  getUsers,
  updateUser,
} from "../controllers/userController.js";

const router = express.Router();

router.get("/users-all", getUsers);
router.get("/users/:id", getUserbyID);
router.patch("/users/:id", updateUser);
router.delete("/users/:id", deleteUser);

export default router;
