import express from "express";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import cors from "cors";
import userRouter from "./router/user/user.route.js";
import postRouter from "./router/post/post.route.js";
import { userModel } from "./schema/user.schema.js";
import dotenv from "dotenv";
import commentRouter from "./router/comment/comment.route.js";

dotenv.config();

const port = 5555;
const app = express();
app.use(express.json());
app.use(cors());

const connectToMongoDB = async () => {
  await mongoose.connect(process.env.MONGO_DB_URI);
};
connectToMongoDB();
app.get("/", async (_req, res) => {
  const JWT_SECRET = "secret";
  const user = await userModel.find();

  const acessToken = jwt.sign(
    {
      data: user,
    },
    JWT_SECRET,
    { expiresIn: "5h" }
  );
  res.status(200).json(acessToken);
});
console.log(process.env.JWT_SECRET);
app.use("/", userRouter);

app.use("/", postRouter);
app.use("/comment", commentRouter);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
