import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import prisma from "@/infra/database/database.config";
import { User } from "../types/userTypes";

export const authenticateToken = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN
  
  // Also check cookies as fallback
  const cookieToken = req.cookies?.accessToken;
  const accessToken = token || cookieToken;

  if (!accessToken) {
    res.status(401).json({ message: "Access token required" });
    return;
  }

  try {
    const secret = process.env.ACCESS_TOKEN_SECRET;
    if (!secret) {
      throw new Error("Access token secret is not defined");
    }

    const decoded = jwt.verify(accessToken, secret) as User;
    
    const user = await prisma.user.findUnique({
      where: { id: String(decoded.id) },
      select: { id: true, role: true, email: true, name: true },
    });

    if (!user) {
      res.status(401).json({ message: "Invalid token" });
      return;
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Authentication error:", error);
    res.status(403).json({ message: "Invalid or expired token" });
  }
};
