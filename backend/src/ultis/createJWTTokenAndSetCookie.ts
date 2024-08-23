import { Response } from "express";
import jwt from "jsonwebtoken";
import { ENV_VARS } from "../config/envVars";

export const createJWTTokenAndSetCookie = (res: Response, userId: any) => {
  const token = jwt.sign({ userId }, ENV_VARS.JWT_SECRET as string, {
    expiresIn: "3d",
  });

  res.cookie("auth_token", token, {
    httpOnly: true,
    secure: ENV_VARS.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 3 * 24 * 60 * 60 * 1000,
  });

  return token;
};
