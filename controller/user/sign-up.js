import { userModel } from "../../schema/user.schema.js";
import { hash } from "bcrypt";
import jwt from "jsonwebtoken";

export const signup = async (req, res) => {
  const JWT_SECRET = process.env.JWT_SECRET;
  const { Username, Email, Password } = req.body;

  const existingUser = await userModel.findOne({ Email });
  if (existingUser) {
    return res.status(400).json({ message: "Email already exists" });
  }

  const hashedPassword = await hash(Password, 10);

  const createdUser = await userModel.create({
    Username,
    Email,
    Password: hashedPassword,
  });

  const acessToken = jwt.sign({ data: createdUser }, JWT_SECRET, {
    expiresIn: "5h",
  });
  res.json(acessToken);
};
