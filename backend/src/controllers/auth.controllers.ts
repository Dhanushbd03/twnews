import { Request, Response } from "express";
import jwt from "jsonwebtoken";

/**
 * Verifies the user session by checking the JWT token in cookies.
 * If the token is valid, the decoded information is returned.
 * Otherwise, an appropriate error response is sent.
 *
 * @param req - Express request object
 * @param res - Express response object
 */
const verifySession = (req: Request, res: Response) => {
  // Retrieve the token from cookies
  const token = req.cookies?.token;
  // If no token is provided, return an unauthorized response
  console.log("Token received:", token);
  if (!token) {
    return res.status(401).json({ message: "Unauthorized, no token provided" });
  }

  try {
    // Verify the token using the secret key
    const decoded = jwt.verify(token as string, process.env.JWT_SECRET || "");
    res.status(200).json({
      message: "Authorized",
      decoded, // Return decoded token information
    });
  } catch (error) {
    // Handle invalid or expired token errors
    res.status(403).json({
      message: "Invalid or expired token",
    });
  }
};

/**
 * Logs the user out by clearing the 'token' cookie.
 *
 * @param req - Express request object
 * @param res - Express response object
 */
const logout = (req: Request, res: Response) => {
  // Clear the token cookie
  res.clearCookie("token");
  res.status(200).json({ message: "Logged out successfully" });
};

// Export the functions for use in other parts of the application
export { verifySession, logout };
