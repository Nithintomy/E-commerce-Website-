// src/routes/productRoutes.ts
import express from 'express';
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
} from '../controllers/productController';
import verifyToken from '../middleware/VerifyToken';

const router = express.Router();


router.get('/', getProducts);


router.get('/:id', getProductById);


router.post('/',verifyToken, createProduct);


router.put('/:id',verifyToken, updateProduct);


router.delete('/:id',verifyToken, deleteProduct);

export default router;
