import express from "express";
import { body } from "express-validator";

import { logIn, logOut } from "../controller/auth.controller";
import { validationResults } from "../ultis/validationResults";

const router = express.Router();

const logInvalidation = [
  body("email")
    .trim()
    .notEmpty()
    .withMessage("E-mail is required")
    .isEmail()
    .withMessage("Must be a valid email address"),
  body("password")
    .trim()
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),
  validationResults,
];

router.post("/login", logInvalidation, logIn);
router.post("/log-out", logInvalidation, logOut);

export default router;
