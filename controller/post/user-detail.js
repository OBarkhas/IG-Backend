import { userModel } from "../../schema/user.schema.js";

export const getUserProfileAndPosts = async (req, res) => {
const userId = req.params.userId;
const userPosts = await userModel.findById(userId)
res.status(200).json(userPosts)
};
