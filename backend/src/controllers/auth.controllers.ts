import { Request, Response } from "express";
import jwt from "jsonwebtoken";
// verify session
const verifySession = (req: Request, res: Response) => {
  const token = req.cookies?.token;
  console.log("token", token);
  if (!token) {
    return res.status(401).json({ message: "Unauthorized , no token" });
  }

  try {
    
    const decoded = jwt.verify(token as string, process.env.JWT_SECRET || "");
    res.status(200).json({
      message: "Authorized",
      decoded,
    });
  } catch (error) {
    res.status(403).json({
      message: "invalid or expired token",
    });
  }
};
// logout
const logout = (req: Request, res: Response) => {
  res.clearCookie("token");
  res.status(200).json({ message: "Logged out" });
};
export { verifySession, logout };
