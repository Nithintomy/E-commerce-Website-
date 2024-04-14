"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const VerifyToken_1 = __importDefault(require("../middleware/VerifyToken"));
const cartController_1 = require("../controllers/cartController");
const router = express_1.default.Router();
router.route('/').get(VerifyToken_1.default, cartController_1.getCartItems);
router.route('/add').post(VerifyToken_1.default, cartController_1.addToCart);
router.route('/:id').put(VerifyToken_1.default, cartController_1.updateCartItem).delete(VerifyToken_1.default, cartController_1.removeCartItem);
exports.default = router;
