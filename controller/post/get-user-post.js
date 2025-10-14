import { postModel } from "../../schema/post.schema.js";

export const getUserPost = async (req, res) => {
  const params = req.params;
  const posts = await postModel.find({ user: params.userId });
  res.status(200).json(posts);
};
