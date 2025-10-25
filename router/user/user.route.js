import express from "express";
import { login } from "../../controller/user/login.js";
import { signup } from "../../controller/user/sign-up.js";
import { authMiddleware } from "../../middleware/auth-middleware.js";
import followUser from "../../controller/user/follow-user.js";
import { getUserProfileAndPosts } from "../../controller/post/user-detail.js";
import { getUsers } from "../../controller/user/get-users.js";
const userRouter = express.Router();
userRouter.post("/sign-up", signup);
userRouter.post("/login", login);
userRouter.post("/follow-toggle/:followedUserId", authMiddleware, followUser);
userRouter.get("/user/:userId", authMiddleware, getUserProfileAndPosts);
userRouter.get("/users/:searchParam", authMiddleware, getUsers);

export default userRouter;
