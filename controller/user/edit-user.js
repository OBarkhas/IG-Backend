import { userModel } from "../../schema/user.schema.js";

export const editUser = async (req, res) => {
  const userId = req.user.id;

  const data = req.body;

  const updatedUser = await userModel.findByIdAndUpdate(userId, data, {
    new: true,
  });

  if (!updatedUser) {
    return res.status(404).json({ message: "user not found" });
  }

  res.json({ message: "Sucessful updated", user: updatedUser });
};
