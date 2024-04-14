import mongoose, { Schema, Model, Document } from 'mongoose';

interface User extends Document {
 
  userName: string;
  email: string;
  mobile: string;
  password: string;
  isBlocked: boolean;
  createAt:Date,
}


const userSchema = new Schema<User>({
  userName: {
    type: String,
    required: true,
    
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    match: [
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      'Please enter a valid email'
    ]
  },
  mobile: {
    type: String,
    required:true,
    unique:true,
    match: [/^[0-9]{10}$/, 'Please enter a valid 10-digit mobile number']
  },
  password: {
    type: String,
    minlength: 8
  },
  createAt:{
    type:Date,
    required:true,
    default:Date.now
},
},{timestamps:true});


const userModel:Model<User> = mongoose.model<User>('userModel',userSchema)
export default userModel