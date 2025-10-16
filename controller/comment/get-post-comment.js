import { commentModel } from "../../schema/comment.schema.js";

export const getPostComments = async (req, res) => {
  const postId = req.params.postId;
  const comments = await commentModel
    .find({
      post: postId,
    })
    .populate({
      path: "post",
      populate: { path: "user", select: "Username profilePicture" },
    })
    .populate("user", "Username profilePicture");

  res.status(200).json(comments);
};
