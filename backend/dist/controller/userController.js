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
exports.googleLogin = exports.facebookLogin = exports.changePassword = exports.resetPassword = exports.login = exports.register = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const google_auth_library_1 = require("google-auth-library");
const node_fetch_1 = __importDefault(require("node-fetch"));
const client = new google_auth_library_1.OAuth2Client('1094965231233-8smhp95p11cj6lehlhvshqjf4b9nrao8.apps.googleusercontent.com');
const generateToken_1 = require("../utils/generateToken");
const User_1 = __importDefault(require("../models/User"));
const sendForgetPasswordEmail_1 = require("../utils/sendForgetPasswordEmail");
const register = express_async_handler_1.default((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email, password, fullName } = req.body;
    if (username.includes(' ' || '@')) {
        res.status(400);
        throw new Error('Space and @ character are not allowed in Username');
    }
    const duplicateUsername = yield User_1.default.findOne({ username });
    if (duplicateUsername) {
        res.status(401);
        throw new Error('Username already in use');
    }
    const duplicateEmail = yield User_1.default.findOne({ email });
    if (duplicateEmail) {
        res.status(401);
        throw new Error('Email already in use');
    }
    const hashedPassword = yield bcryptjs_1.default.hash(password, 12);
    try {
        const user = yield User_1.default.create({
            fullName,
            username,
            email,
            password: hashedPassword,
        });
        if (user) {
            res.status(201);
            res.json({
                _id: user.id,
                fullName,
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
            fullName: user.fullName,
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
    const { newPassword, token } = req.body;
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
            fullName: user.fullName,
            token: generateToken_1.generateToken(user.id),
        });
    }
    catch (error) {
        console.error(error.message);
        throw new Error(error.message);
    }
}));
exports.changePassword = changePassword;
const googleLogin = express_async_handler_1.default((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { idToken } = req.body;
    const { payload } = (yield client.verifyIdToken({
        idToken,
        audience: '1094965231233-8smhp95p11cj6lehlhvshqjf4b9nrao8.apps.googleusercontent.com',
    }));
    const { email, email_verified, picture, name } = payload;
    if (email_verified) {
        try {
            const user = yield User_1.default.findOne({ email });
            if (user) {
                res.json({
                    _id: user.id,
                    profilePicture: picture,
                    username: user.username,
                    fullName: user.fullName,
                    email: user.email,
                    token: generateToken_1.generateToken(user.id),
                });
            }
            else {
                let password = email + process.env.JWT_SECRET;
                let username = name;
                try {
                    const user = yield User_1.default.create({
                        fullName: name,
                        username,
                        email,
                        password,
                        profilePicture: picture,
                    });
                    if (user) {
                        res.status(201);
                        res.json({
                            _id: user.id,
                            username,
                            fullName: name,
                            email,
                            profilePicture: picture,
                            token: generateToken_1.generateToken(user.id),
                        });
                    }
                }
                catch (error) {
                    res.status(500);
                    throw new Error(error.message);
                }
            }
        }
        catch (error) {
            res.status(500);
            throw new Error(error.message);
        }
    }
}));
exports.googleLogin = googleLogin;
const facebookLogin = express_async_handler_1.default((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { accessToken, userId } = req.body;
    let userData;
    let graphUrl = `https://graph.facebook.com/v9.0/${userId}/?fields=id,name,email,picture&access_token=${accessToken}`;
    yield node_fetch_1.default(graphUrl, { method: 'GET' })
        .then((res) => res.json())
        .then((data) => (userData = data));
    const { name, email, picture: { data: { url }, }, } = userData;
    if (!email) {
        res.status(403);
        throw new Error('You cannot continue with your facebook as no email address is associated with your facebook account');
    }
    try {
        const user = yield User_1.default.findOne({ email });
        if (user) {
            res.json({
                _id: user.id,
                profilePicture: url,
                username: user.username,
                fullName: user.fullName,
                email: user.email,
                token: generateToken_1.generateToken(user.id),
            });
        }
        else {
            let password = email + process.env.JWT_SECRET;
            let username = name;
            try {
                const user = yield User_1.default.create({
                    fullName: name,
                    username,
                    email,
                    password,
                    profilePicture: url,
                });
                if (user) {
                    res.status(201);
                    res.json({
                        _id: user.id,
                        fullName: name,
                        username,
                        email,
                        profilePicture: url,
                        token: generateToken_1.generateToken(user.id),
                    });
                }
            }
            catch (error) {
                res.status(500);
                throw new Error(error.message);
            }
        }
    }
    catch (error) {
        res.status(500);
        throw new Error(error.message);
    }
}));
exports.facebookLogin = facebookLogin;
//# sourceMappingURL=userController.js.map