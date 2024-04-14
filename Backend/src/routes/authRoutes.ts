
import express from "express";
import { body } from "express-validator";
import { registerUser, loginUser } from "../controllers/authController";

const router = express.Router();

const validateRegisterUser = [
  body("firstName").notEmpty().withMessage("First name is required"),
  body("lastName").notEmpty().withMessage("Last name is required"),
  body("email").isEmail().withMessage("Please enter a valid email"),
  body("mobile").isMobilePhone(["en-US", "en-GB"]).withMessage("Please enter a valid mobile number"),
  body("password").isLength({ min: 8 }).withMessage("Password must be at least 8 characters long"),
];
const validateLoginUser = [
  body("email").isEmail().withMessage("Invalid email address"),
  body("password").notEmpty().withMessage("Password is required"),
];

router.post("/register", validateRegisterUser, registerUser);
router.post("/login", validateLoginUser, loginUser);

export default router;
