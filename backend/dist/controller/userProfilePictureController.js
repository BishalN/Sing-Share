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
exports.uploadProfilePictureHandler = exports.upload = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const storage_1 = require("@google-cloud/storage");
const User_1 = __importDefault(require("../models/User"));
const fs_1 = __importDefault(require("fs"));
const index_1 = require("../index");
const storage = multer_1.default.diskStorage({
    destination(req, file, cb) {
        cb(null, 'uploads/');
    },
    filename(req, file, cb) {
        cb(null, `${req.user.username}${path_1.default.extname(file.originalname)}`);
    },
});
var limits = { fileSize: 1024 * 1024 * 5 };
const upload = multer_1.default({
    limits,
    storage,
});
exports.upload = upload;
const gc = new storage_1.Storage({
    keyFilename: path_1.default.join(__dirname, '../google.json'),
    projectId: 'recordandshare-4e3f0',
});
const uploadProfilePictureHandler = express_async_handler_1.default((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield User_1.default.findById(req.user._id).select('-password');
    if (!user) {
        res.status(400);
        throw new Error('User not found');
    }
    const bucket = gc.bucket('recordandshare-4e3f0.appspot.com');
    const uploadRes = yield bucket.upload(`${req.file.path}`, {});
    const publicUrl = `https://storage.googleapis.com/${bucket.name}/${req.file.filename}`;
    if (uploadRes) {
        fs_1.default.unlink(path_1.default.join(index_1.profileDir, req.file.filename), () => {
            console.log('file deleted');
        });
    }
    user.profilePicture = publicUrl;
    const updatedUser = yield user.save();
    res.json(updatedUser);
}));
exports.uploadProfilePictureHandler = uploadProfilePictureHandler;
//# sourceMappingURL=userProfilePictureController.js.map