import { postModel } from "../../schema/post.schema.js";

export const createPost = async (req, res) => {
  const user = req.user;

  const { caption, images } = req.body;

  const createdPost = await postModel.create({
    caption,
    images,
    user: user._id,
  });

  res.json(createdPost);
};
