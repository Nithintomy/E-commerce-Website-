import express from 'express'
import verifyToken from '../middleware/VerifyToken'
import { addToCart, getCartItems, removeCartItem, updateCartItem } from '../controllers/cartController';

const router = express.Router()


router.route('/').get(verifyToken, getCartItems);
router.route('/add').post(verifyToken, addToCart);
router.route('/:id').put(verifyToken, updateCartItem).delete(verifyToken, removeCartItem);


export default router;