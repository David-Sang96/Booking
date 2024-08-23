import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";

export const validationResults = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: result.array()[0].msg,
    });
  }
  next();
};
