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
exports.removeCartItem = exports.updateCartItem = exports.addToCart = exports.getCartItems = void 0;
const cartModel_1 = __importDefault(require("../models/cartModel"));
const express_async_handler_1 = __importDefault(require("express-async-handler"));
exports.getCartItems = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const cartItem = yield cartModel_1.default.find({ user: (_a = req.user) === null || _a === void 0 ? void 0 : _a._id }).populate('product');
    res.status(200).json(cartItem);
}));
exports.addToCart = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b, _c, _d;
    console.log("addTocart", req.body);
    console.log((_b = req.user) === null || _b === void 0 ? void 0 : _b._id, "userrrrr");
    const { productId, quantity } = req.body;
    const existingCartItem = yield cartModel_1.default.findOne({ user: (_c = req.user) === null || _c === void 0 ? void 0 : _c._id, product: productId });
    if (existingCartItem) {
        existingCartItem.quantity += quantity;
        yield existingCartItem.save();
        res.status(200).json({ message: 'Product quantity updated in the cart' });
    }
    else {
        const newCartItem = new cartModel_1.default({ user: (_d = req.user) === null || _d === void 0 ? void 0 : _d._id, product: productId, quantity });
        yield newCartItem.save();
        res.status(201).json({ message: 'Product added to cart' });
    }
}));
const updateCartItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("enterrrrr");
    try {
        const { id } = req.params;
        const { quantity } = req.body;
        const cartItem = yield cartModel_1.default.findById(id);
        if (cartItem) {
            cartItem.quantity = quantity;
            yield cartItem.save();
            return res.status(200).json({ message: 'Cart item quantity updated successfully' });
        }
        else {
            return res.status(404).json({ message: 'Cart item not found' });
        }
    }
    catch (error) {
        console.error('Error updating cart item:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});
exports.updateCartItem = updateCartItem;
exports.removeCartItem = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const deletedItem = yield cartModel_1.default.deleteOne({ _id: id });
        if (deletedItem.deletedCount && deletedItem.deletedCount > 0) {
            res.json({ message: 'Product removed from cart' });
        }
        else {
            res.status(404).json({ message: 'Cart item not found' });
        }
    }
    catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
}));
