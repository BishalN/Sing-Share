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
exports.changePassword = exports.resetPassword = exports.login = exports.register = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generateToken_1 = require("../utils/generateToken");
const User_1 = __importDefault(require("../models/User"));
const sendForgetPasswordEmail_1 = require("../utils/sendForgetPasswordEmail");
const register = express_async_handler_1.default((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email, password } = req.body;
    const userAlreadyExistsWithThatUsername = yield User_1.default.findOne({ username });
    if (userAlreadyExistsWithThatUsername) {
        res.status(401);
        throw new Error('Username already in use');
    }
    const userAlreadyExistsWithThatEmail = yield User_1.default.findOne({ email });
    if (userAlreadyExistsWithThatEmail) {
        res.status(401);
        throw new Error('Email already in use');
    }
    const hashedPassword = yield bcryptjs_1.default.hash(password, 12);
    try {
        const user = yield User_1.default.create({
            username,
            email,
            password: hashedPassword,
        });
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
const login = express_async_handler_1.default((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { usernameOrEmail, password } = req.body;
    let user;
    try {
        if (usernameOrEmail.includes('@')) {
            user = yield User_1.default.findOne({ email: usernameOrEmail });
        }
        else {
            user = yield User_1.default.findOne({ username: usernameOrEmail });
        }
        if (!user) {
            res.status(400);
            throw new Error('Invalid Credentials');
        }
        const passwordIsValid = yield bcryptjs_1.default.compare(password, user.password);
        if (!passwordIsValid) {
            res.status(401);
            throw new Error('Invalid Credentials');
        }
        res.json({
            _id: user.id,
            username: user.username,
            email: user.email,
            token: generateToken_1.generateToken(user.id),
        });
    }
    catch (error) {
        console.log(error.message);
        throw new Error(error.message);
    }
}));
exports.login = login;
const resetPassword = express_async_handler_1.default((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    let user;
    try {
        user = yield User_1.default.findOne({ email });
        if (!user) {
            res.status(404);
            throw new Error('User with that email does not exist');
        }
        const userid = user.id;
        const token = jsonwebtoken_1.default.sign({ userid }, process.env.JWT_SECRET, {
            expiresIn: '30m',
        });
        sendForgetPasswordEmail_1.sendForgetPasswordEmail(user.email, token);
    }
    catch (error) {
        res.status(500);
        throw new Error(error.message);
    }
    res.json({
        message: 'The reset email has been sent to the owner of the email plz check out your mail inbox',
    });
}));
exports.resetPassword = resetPassword;
const changePassword = express_async_handler_1.default((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { token } = req.params;
    const { newPassword } = req.body;
    try {
        const { userid } = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        const user = yield User_1.default.findById(userid);
        if (!user) {
            res.status(404);
            throw new Error('Invalid Request');
        }
        const hashedPassword = yield bcryptjs_1.default.hash(newPassword, 12);
        user.password = hashedPassword;
        user.save();
        res.json({
            _id: user.id,
            username: user.username,
            email: user.email,
            token: generateToken_1.generateToken(user.id),
        });
    }
    catch (error) {
        console.error(error.message);
        throw new Error(error.message);
    }
}));
exports.changePassword = changePassword;
//# sourceMappingURL=userController.js.map