import { userModel } from "../../schema/user.schema.js";

const followUser = async (req, res) => {
  try {
    const followedUserId = req.params.followedUserId;
    const followingUserId = req.user._id;

    if (followedUserId === followingUserId.toString()) {
      return res.status(400).json({ message: "You can't follow yourself" });
    }

    const followingUser = await userModel.findById(followingUserId);
    const followedUser = await userModel.findById(followedUserId);

    if (!followingUser || !followedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const isFollowed = followedUser.followers.includes(followingUserId);

    if (isFollowed) {
      await userModel.findByIdAndUpdate(followingUserId, {
        following: followingUser.following.filter(
          (id) => id.toString() !== followedUserId
        ),
      });

      await userModel.findByIdAndUpdate(followedUserId, {
        followers: followedUser.followers.filter(
          (id) => id.toString() !== followingUserId
        ),
      });

      return res.status(200).json({ message: "unfollowed" });
    } else {
      await userModel.findByIdAndUpdate(followingUserId, {
        following: [...followingUser.following, followedUserId],
      });

      await userModel.findByIdAndUpdate(followedUserId, {
        followers: [...followedUser.followers, followingUserId],
      });

      return res.status(200).json({ message: "followed" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

export default followUser;
