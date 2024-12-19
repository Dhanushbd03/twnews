import User from "../models/user.model";
import { Request, Response } from "express";
import { constants } from "../../constants";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// register   user
export const registerUser = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;
  
  // hash the password
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const user = await User.create({
      username,
      email,  
      password: hashedPassword,
    });
    
    res.status(200).json({ message: "Registration successful , Please login" });
  } catch (error: any) {
    console.log("error:", error);
    if (error.code === 11000) {
      return res.status(400).json({
        message: "Email or Username already exists , please login",
        error: error.message,
      });
    }
    res
      .status(500)
      .json({ message: "Something went wrong , please try again", error: error.message });
  }
};

// login user
export const loginUser = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  console.log("username:", username);
  console.log("password:", password);
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
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 24 * 60 * 60 * 1000 , // 24 hours
      sameSite:"none",  
    });

    res.status(200).json({ message: constants.LOGIN_SUCCESS , user:{
      username: user.username,
      email: user.email,
        id: user._id,
      },
    });
  } catch (error) {
    res.status(500).json({ message: constants.INTERNAL_SERVER_ERROR });
  }
};
