import mongoose, { Schema } from "mongoose";

const userSchema = new mongoose.Schema({
  Username: { type: String, required: true },
  Email: { type: String, required: true },
  Password: { type: String, required: true },
  bio: { type: String, required: false },
  profilePicture: { type: String, required: false },
  followers: [{ type: Schema.Types.ObjectId, required: true }],
  following: [{ type: Schema.Types.ObjectId, required: true }],
  createdAt: { type: Date, default: Date.now() },
  updatedAt: { type: Date, default: Date.now() },
});
export const userModel = mongoose.model("users", userSchema);
