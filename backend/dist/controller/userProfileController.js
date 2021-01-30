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
exports.getUserByUsername = exports.getUser = exports.getUsers = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const User_1 = __importDefault(require("../models/User"));
const getUsers = express_async_handler_1.default((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield User_1.default.find({}).select('-password');
        res.json(users);
    }
    catch (error) {
        res.status(500);
        throw new Error(error.message);
    }
}));
exports.getUsers = getUsers;
const getUser = express_async_handler_1.default((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.json(req.user);
    }
    catch (error) {
        res.status(500);
        throw new Error(error.message);
    }
}));
exports.getUser = getUser;
const getUserByUsername = express_async_handler_1.default((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username } = req.params;
        const user = yield User_1.default.findOne({ username }).select('-password');
        if (!user) {
            res.status(400);
            throw new Error('User not found');
        }
        res.json(user);
    }
    catch (error) {
        res.status(500);
        throw new Error(error.message);
    }
}));
exports.getUserByUsername = getUserByUsername;
//# sourceMappingURL=userProfileController.js.map