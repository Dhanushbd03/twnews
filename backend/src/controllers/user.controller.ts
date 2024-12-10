import User from "../models/user.model";
import { Request, Response } from "express";
import { constants } from "../../constants";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const registerUser = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });
    console.log("user:", user);
    res.status(200).json({ message: constants.REGISTER_SUCCESS });
  } catch (error: any) {
    console.log("error:", error);
    if (error.code === 11000) {
      return res.status(400).json({ message: constants.EMAIL_ALREADY_EXISTS, error: error.message });
    }
    res.status(500).json({ message: constants.INTERNAL_SERVER_ERROR, error: error.message });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  try {
    // find the user
    const user = await User.findOne({
      $or: [{ username }, { email: username }],
    });
    if (!user) {
      return res.status(404).json({ message: constants.USER_NOT_FOUND });
    }
    // compare the password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: constants.INVALID_PASSWORD });
    }
    // generate the token
    const token = jwt.sign(
      { id: user._id, username: user.username },
      process.env.JWT_SECRET as string,
      {
        expiresIn: process.env.JWT_EXPIRES_IN || "24h",
      }
    );

    res.status(200).json({ message: constants.LOGIN_SUCCESS, token });
  } catch (error) {
    res.status(500).json({ message: constants.INTERNAL_SERVER_ERROR });
  }
};
