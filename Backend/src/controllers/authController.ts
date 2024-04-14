import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import UserModel from "../models/userModel";
import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken";


export const registerUser = asyncHandler(async (req: Request, res: Response) => {
    console.log("hiiii")
    try {
      
      console.log(req.body)
      const { userName, email, mobile, password } = req.body;
  
      // Check if user with the same email exists
      const existingUser = await UserModel.findOne({ email });
      if (existingUser) {
        res.status(400).json({ message: 'User with this email already exists' });
        return;
      }

      console.log(typeof password); // Check the type of password

  
      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Create new user
      const newUser = new UserModel({
        userName,
        email,
        mobile,
        password: hashedPassword
      });
      await newUser.save();
  
      res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });


// User login

export const loginUser = async (req: Request, res: Response) => {
  try {
    console.log("loginnnnnn")
      const { email, password } = req.body;
      console.log(req.body,"login body")

      const user = await UserModel.findOne({ email });
      console.log(user,"user is here")
      if (!user) {
          return res.status(404).json({ message: 'User not found' });
      }

      
      const isPasswordValid = await bcrypt.compare(password, user.password);
      console.log(isPasswordValid,"password")
      if (!isPasswordValid) {
          return res.status(401).json({ message: 'Invalid credentials' });
      }

      if (!process.env.JWT_SECRET) { 
          throw new Error('JWT_SECRET is not defined in the environment variables');
      }
      
      const token = generateToken(user._id);
      console.log(token,"token")
    
      res.json({ token,user });
   
  } catch (error:any) {
      res.status(500).json({ message: error.message });
  }
};
