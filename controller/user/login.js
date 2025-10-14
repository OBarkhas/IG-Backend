import { userModel } from "../../schema/user.schema.js";
import { compare } from "bcrypt";
import jwt from "jsonwebtoken";

export const login = async (req, res) => {
  const { Email, Password } = req.body;
  const JWT_SECRET = process.env.JWT_SECRET;

  const existingUser = await userModel.findOne({ Email });

  if (!existingUser) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  const isPasswordValid = await compare(Password, existingUser.Password);

  if (!isPasswordValid) {
    return res.status(400).json({ message: "Invalid credentials" });
  }
  const acessToken = jwt.sign(
    {
      data: existingUser,
    },
    JWT_SECRET,
    { expiresIn: "5h" }
  );
  res.status(200).json(acessToken);
};
