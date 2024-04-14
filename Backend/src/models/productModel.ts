import mongoose, { Document } from "mongoose";

interface Product extends Document {
  name: string;
  description: string;
  price: number;
  featured: boolean;
  imageUrl: string; 
}

const productSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  featured: {
    type: Boolean,
    default: false,
  },
  imageUrl: {
    type: String,
    required: true,
  }
});

export default mongoose.model<Product>("Product", productSchema);
