"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/productRoutes.ts
const express_1 = __importDefault(require("express"));
const productController_1 = require("../controllers/productController");
const VerifyToken_1 = __importDefault(require("../middleware/VerifyToken"));
const router = express_1.default.Router();
router.get('/', productController_1.getProducts);
router.get('/:id', productController_1.getProductById);
router.post('/', VerifyToken_1.default, productController_1.createProduct);
router.put('/:id', VerifyToken_1.default, productController_1.updateProduct);
router.delete('/:id', VerifyToken_1.default, productController_1.deleteProduct);
exports.default = router;
