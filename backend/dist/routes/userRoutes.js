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
const fs_1 = __importDefault(require("fs"));
const express_1 = __importDefault(require("express"));
const userProfilePictureController_1 = require("../controller/userProfilePictureController");
const userController_1 = require("../controller/userController");
const userProfileController_1 = require("../controller/userProfileController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const storage_1 = require("@google-cloud/storage");
const path_1 = __importDefault(require("path"));
const User_1 = __importDefault(require("../models/User"));
const storage = new storage_1.Storage({});
const gc = new storage_1.Storage({
    keyFilename: path_1.default.join(__dirname, '../google.json'),
    projectId: 'recordandshare-4e3f0',
});
const router = express_1.default.Router();
router.post('/change-password', userController_1.changePassword);
router.post('/reset-password', userController_1.resetPassword);
router.route('/login').post(userController_1.login);
router.route('/facebook-login').post(userController_1.facebookLogin);
router.route('/google-login').post(userController_1.googleLogin);
router.route('/all').get(authMiddleware_1.protect, userProfileController_1.getUsers);
router.route('/me').get(authMiddleware_1.protect, userProfileController_1.getUser);
router.route('/:username').get(authMiddleware_1.protect, userProfileController_1.getUserByUsername);
router.route('/edit').put(authMiddleware_1.protect, userProfileController_1.updateProfile);
router.post('/upload-profilePicture', authMiddleware_1.protect, userProfilePictureController_1.upload.single('image'), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield User_1.default.findById(req.user._id).select('-password');
    if (!user) {
        res.status(400);
        throw new Error('User not found');
    }
    const bucket = gc.bucket('recordandshare-4e3f0.appspot.com');
    yield bucket.upload(`${req.file.path}`, {});
    const publicUrl = `https://storage.googleapis.com/${bucket.name}/${req.file.filename}`;
    fs_1.default.unlink(path_1.default.join(__dirname, req.file.filename), () => {
        console.log('file deleted successfully');
    });
    user.profilePicture = publicUrl;
    const updatedUser = yield user.save();
    res.json(updatedUser);
    res.send(`${req.file.path} }`);
}));
router.route('/').post(userController_1.register);
exports.default = router;
//# sourceMappingURL=userRoutes.js.map