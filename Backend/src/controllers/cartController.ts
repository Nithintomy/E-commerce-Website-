import { Request, Response } from 'express';
import CartItem from '../models/cartModel';
import asyncHandler from 'express-async-handler';
import { CustomRequest } from '../middleware/VerifyToken';

export const getCartItems = asyncHandler(async (req: CustomRequest, res: Response) => {
    
    const cartItem = await CartItem.find({ user: req.user?._id}).populate('product');
    res.status(200).json(cartItem);
});



export const addToCart = asyncHandler(async (req: CustomRequest, res: Response) => {
  console.log("addTocart",req.body)
  console.log(req.user?._id,"userrrrr")
  const { productId, quantity } = req.body;

  const existingCartItem = await CartItem.findOne({ user: req.user?._id, product: productId });

  if (existingCartItem) {
      existingCartItem.quantity += quantity;
      await existingCartItem.save();
      res.status(200).json({ message: 'Product quantity updated in the cart' });
  } else {
      const newCartItem = new CartItem({ user: req.user?._id, product: productId, quantity });
      await newCartItem.save();
      res.status(201).json({ message: 'Product added to cart' });
  }
});


export const updateCartItem = async (req: Request, res: Response) => {
  console.log("enterrrrr")
    try {
      const { id } = req.params;
      const { quantity } = req.body;
  
     
      const cartItem = await CartItem.findById(id);
  
      if (cartItem) {
        cartItem.quantity = quantity;
        await cartItem.save();
        return res.status(200).json({ message: 'Cart item quantity updated successfully' });
      } else {
        return res.status(404).json({ message: 'Cart item not found' });
      }
    } catch (error) {
      console.error('Error updating cart item:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  };



export const removeCartItem = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const deletedItem = await CartItem.deleteOne({ _id: id });
        if (deletedItem.deletedCount && deletedItem.deletedCount > 0) {
            res.json({ message: 'Product removed from cart' });
        } else {
            res.status(404).json({ message: 'Cart item not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
});
