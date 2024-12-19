import User from "../models/user.model";
import { Request, Response } from "express";
import { constants } from "../../constants";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Register user
export const registerUser = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({
      $or: [{ username }, { email }],
    });

    if (existingUser) {
      return res.status(400).json({
        message: "Email or Username already exists, please login.",
      });
    }

    // Hash the password before saving to the database
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    res.status(200).json({ message: "Registration successful. Please login." });
  } catch (error: any) {
    console.log("Error during registration:", error);
    // Handle unique constraint error (e.g., duplicate email or username)
    if (error.code === 11000) {
      return res.status(400).json({
        message: "Email or Username already exists, please login.",
        error: error.message,
      });
    }

    // Internal server error
    res.status(500).json({
      message: "Something went wrong. Please try again later.",
      error: error.message,
    });
  }
};

// Login user
export const loginUser = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {
    // Find the user by username or email
    const user = await User.findOne({
      $or: [{ username }, { email: username }],
    });

    // If user is not found, return 404
    if (!user) {
      return res.status(404).json({ message: constants.USER_NOT_FOUND });
    }

    // Compare the provided password with the stored hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    // If password is invalid, return 401
    if (!isPasswordValid) {
      return res.status(401).json({ message: constants.INVALID_PASSWORD });
    }

    // Generate JWT token with user data
    const token = jwt.sign(
      { id: user._id, username: user.username },
      process.env.JWT_SECRET as string,
      {
        expiresIn: process.env.JWT_EXPIRES_IN || "24h", // Default to 24 hours
      }
    );

    // Set the token in a secure HTTP-only cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV == "production", // Use secure cookies in production
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
      sameSite: process.env.NODE_ENV == "production" ? "none" : "lax",
      path: "/",
    });    
    // Return a success message along with user data (excluding password)
    res.status(200).json({
      message: constants.LOGIN_SUCCESS,
      user: {
        username: user.username,
        email: user.email,
        id: user._id,
      },
    });
  } catch (error) {
    console.log("Error during login:", error);
    // Internal server error
    res.status(500).json({ message: constants.INTERNAL_SERVER_ERROR });
  }
};
