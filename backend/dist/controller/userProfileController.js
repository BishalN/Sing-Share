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
exports.getUserById = exports.getNominees = exports.profilePictureUpload = exports.updateProfile = exports.getUserByUsername = exports.getUser = exports.getUsers = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const User_1 = __importDefault(require("../models/User"));
const generateToken_1 = require("../utils/generateToken");
const storage_1 = require("@google-cloud/storage");
const path_1 = __importDefault(require("path"));
const Recording_1 = __importDefault(require("../models/Recording"));
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
const updateProfile = express_async_handler_1.default((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield User_1.default.findById(req.user._id);
    const { username, fullName, bio, email } = req.body;
    if (user) {
        user.username = username || user.username;
        user.fullName = fullName || user.fullName;
        user.bio = bio || user.bio;
        user.email = email || user.email;
        user.profilePicture = user.profilePicture;
        const updatedUser = yield user.save();
        res.json({
            _id: updatedUser._id,
            bio: updatedUser.bio,
            fullName: updatedUser.fullName,
            username: updatedUser.username,
            email: updatedUser.email,
            profilePicture: updatedUser.profilePicture,
            token: generateToken_1.generateToken(updatedUser._id),
        });
    }
    else {
        res.status(404);
        throw new Error('User not found');
    }
}));
exports.updateProfile = updateProfile;
const profilePictureUpload = express_async_handler_1.default((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const gc = new storage_1.Storage({
        keyFilename: path_1.default.join(__dirname, '../google.json'),
        projectId: 'recordandshare-4e3f0',
    });
    const myBucket = gc.bucket('recordandshare-4e3f0.appspot.com');
    myBucket.file('myfile').createWriteStream({ resumable: false });
}));
exports.profilePictureUpload = profilePictureUpload;
const getNominees = express_async_handler_1.default((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const recordings = yield Recording_1.default.find({}).limit(5);
    const newRec = Object(recordings);
    for (let i = 0; i < newRec.length; i++) {
        let user = yield User_1.default.findById(String(newRec[i].user));
        newRec[i].username = user.username;
        newRec[i].avatar =
            user.profilePicture === 'undefined' ? user.username : user.profilePicture;
        console.log(user);
    }
    res.send(newRec);
}));
exports.getNominees = getNominees;
const getUserById = express_async_handler_1.default((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield User_1.default.findById(req.params.id);
    res.send(user);
}));
exports.getUserById = getUserById;
//# sourceMappingURL=userProfileController.js.map