import { postModel } from "../../schema/post.schema.js";
import { userModel } from "../../schema/user.schema.js";

export const getUserPosts = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const posts = await postModel
      .find({ user: userId })
      .populate("user", "Username profilePicture")
      .sort({ createdAt: -1 });

    return res.status(200).json(posts);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};
