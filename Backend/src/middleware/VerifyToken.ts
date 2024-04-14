import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
dotenv.config();

export interface CustomRequest extends Request {
  decodedToken?: any;
  user?: { _id: string }; 
}

const secretKey = process.env.JWT_SECRET;

if (!secretKey) {
  throw new Error('JWT_SECRET is not defined in your environment variables');
}

const verifyToken = async (req: CustomRequest, res: Response, next: NextFunction) => {
  console.log("enter into token")
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; 

    console.log('Token received:', token);

    if (!token) {
      return res.status(401).json({ message: 'Token not provided' });
    }

    const decodedToken = jwt.verify(token, secretKey) as any;
    console.log('Token is valid:', decodedToken);

    req.decodedToken = decodedToken; 
    req.user = { _id: decodedToken.user_id }; 
    
    next();
  } catch (error) {
    console.error('Token verification failed',  (error as Error).message);
    return res.status(401).json({ message: 'Token verification failed' }); 
  }
};

export default verifyToken;
