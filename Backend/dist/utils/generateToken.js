"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
console.log(process.env.JWT_SECRET, "env");
const generateToken = (user_id) => {
    const token = jsonwebtoken_1.default.sign({ user_id }, process.env.JWT_SECRET, {
        expiresIn: '1d'
    });
    return token;
};
exports.default = generateToken;
