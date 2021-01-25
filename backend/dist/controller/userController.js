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
exports.register = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const generateToken_1 = require("../utils/generateToken");
const User_1 = __importDefault(require("../models/User"));
const register = express_async_handler_1.default((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email, password } = req.body;
    try {
        const user = yield User_1.default.create({ username, email, password });
        if (user) {
            res.status(201);
            res.json({
                _id: user.id,
                username,
                email,
                token: generateToken_1.generateToken(user.id),
            });
        }
        else {
            res.status(400);
            throw new Error('Invalid User Data');
        }
    }
    catch (error) {
        console.log(error.message);
        throw new Error(error.message);
    }
}));
exports.register = register;
//# sourceMappingURL=userController.js.map