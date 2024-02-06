import express from "express";
import dotenv from "dotenv";
import { DATABASE } from "./functions/database.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import postRoutes from "./routes/postsRoutes.js";

dotenv.config();
const app = express();

app.use(express.json());
app.use(express.static("./public"));

const PORT = process.env.PORT;

//Routes
app.use("/rram/auth", authRoutes);
app.use("/rram", userRoutes);
app.use("/rram", postRoutes);

app.get("/", (req, res) => {
  res.send("<h1>Hey there whats up</h1>");
});

app.listen(PORT, () => {
  DATABASE();
  console.log(`server started at ${PORT}`);
});
