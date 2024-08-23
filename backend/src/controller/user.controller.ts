import { Request, Response } from "express";
import User from "../models/user.model";
import { createJWTTokenAndSetCookie } from "../ultis/createJWTTokenAndSetCookie";

export const register = async (req: Request, res: Response) => {
  try {
    const user = await User.create(req.body);
    createJWTTokenAndSetCookie(res, user._id);
    user.password = undefined;

    res
      .status(201)
      .json({ success: true, message: "Register successfully", user });
  } catch (error) {
    console.error("Error in register controller: ", error);
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
};
