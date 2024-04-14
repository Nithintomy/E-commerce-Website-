"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProduct = exports.updateProduct = exports.createProduct = exports.getProductById = exports.getProducts = void 0;
const productModel_1 = __importDefault(require("../models/productModel"));
// GET all products
const getProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield productModel_1.default.find();
        res.json(products);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.getProducts = getProducts;
// GET single product by ID
const getProductById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("productId");
    console.log(req.params.id, "idd");
    try {
        const product = yield productModel_1.default.findById(req.params.id);
        console.log(product, "producttt");
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json(product);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.getProductById = getProductById;
// POST new product
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body, "bodyyyuy");
    try {
        const product = new productModel_1.default(req.body);
        console.log("productyyyyyyyyyyyyy", product);
        yield product.save();
        res.status(201).json(product);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
});
exports.createProduct = createProduct;
// PUT update product
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("reqbodyuy", req.body);
    try {
        const { id } = req.params;
        const updatedProduct = req.body;
        const product = yield productModel_1.default.findByIdAndUpdate(id, updatedProduct, { new: true });
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json(product);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
});
exports.updateProduct = updateProduct;
// DELETE product
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const product = yield productModel_1.default.findByIdAndDelete(id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json({ message: 'Product deleted' });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.deleteProduct = deleteProduct;
