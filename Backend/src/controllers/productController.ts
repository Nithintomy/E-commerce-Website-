import { Request, Response } from 'express';
import productModel from '../models/productModel';

// GET all products
export const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await productModel.find();
    res.json(products);
  } catch (error:any) {
    res.status(500).json({ message: error.message });
  }
};

// GET single product by ID
export const getProductById = async (req: Request, res: Response) => {
  console.log("productId")
  console.log(req.params.id,"idd")
  try {
    const product = await productModel.findById(req.params.id);
    console.log(product,"producttt")
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error:any) {
    res.status(500).json({ message: error.message });
  }
};

// POST new product
export const createProduct = async (req: Request, res: Response) => {
  console.log(req.body,"bodyyyuy")
  try {
    const product = new productModel(req.body);
    console.log("productyyyyyyyyyyyyy",product)
    await product.save();
    res.status(201).json(product);
  } catch (error:any) {
    res.status(400).json({ message: error.message });
  }
};

// PUT update product
export const updateProduct = async (req: Request, res: Response) => {
  console.log("reqbodyuy",req.body)
  try {
    const { id } = req.params;
    const updatedProduct = req.body;
    const product = await productModel.findByIdAndUpdate(id, updatedProduct, { new: true });
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error:any) {
    res.status(400).json({ message: error.message });
  }
};

// DELETE product
export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const product = await productModel.findByIdAndDelete(id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json({ message: 'Product deleted' });
  } catch (error:any) {
    res.status(500).json({ message: error.message });
  }
};
