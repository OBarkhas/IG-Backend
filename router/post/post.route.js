import express from "express";
import { getAllPosts } from "../../controller/post/getallPost.js";
import { createPost } from "../../controller/post/create-post.js";
import { authMiddleware } from "../../middleware/auth-middleware.js";
import { getUserPost } from "../../controller/post/get-user-post.js";
import { togglePostLike } from "../../controller/post/toggle-post-like.js";

const postRouter = express.Router();

postRouter.get("/posts", authMiddleware, getAllPosts);

postRouter.get("/posts/:userId", authMiddleware, getUserPost);
postRouter.get("/user-posts/:userId", authMiddleware, getUserPost);
postRouter.post("/post", authMiddleware, createPost);
postRouter.post("/toggle-like/:postId", authMiddleware, togglePostLike);

export default postRouter;
