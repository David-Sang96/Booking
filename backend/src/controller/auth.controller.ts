import bcryptjs from "bcryptjs";
import { Request, Response } from "express";

import User from "../models/user.model";
import { createJWTTokenAndSetCookie } from "../ultis/createJWTTokenAndSetCookie";

export const logIn = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select("-__v +password");

    if (!user || !(await bcryptjs.compare(password, user.password as string))) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid credential!" });
    }
    createJWTTokenAndSetCookie(res, user._id);
    user.password = undefined;

    res.json({ success: true, message: "Logged in successfully", user });
  } catch (error) {
    console.error("Error in logIn controller: ", error);
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
};

export const logOut = async (req: Request, res: Response) => {
  res.clearCookie("auth_token");
  res.json({ success: true, message: "Logged out successfully" });
};
