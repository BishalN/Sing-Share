"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controller/userController");
const userProfileController_1 = require("../controller/userProfileController");
const userProfilePictureController_1 = require("../controller/userProfilePictureController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = express_1.default.Router();
router.post('/change-password', userController_1.changePassword);
router.get('/nominees', userProfileController_1.getNominees);
router.get('/find/:id', userProfileController_1.getUserById);
router.post('/reset-password', userController_1.resetPassword);
router.route('/login').post(userController_1.login);
router.route('/facebook-login').post(userController_1.facebookLogin);
router.route('/google-login').post(userController_1.googleLogin);
router.route('/all').get(authMiddleware_1.protect, userProfileController_1.getUsers);
router.route('/me').get(authMiddleware_1.protect, userProfileController_1.getUser);
router.route('/:username').get(authMiddleware_1.protect, userProfileController_1.getUserByUsername);
router.route('/edit').put(authMiddleware_1.protect, userProfileController_1.updateProfile);
router.post('/upload-profilePicture', authMiddleware_1.protect, userProfilePictureController_1.upload.single('image'), userProfilePictureController_1.uploadProfilePictureHandler);
router.route('/').post(userController_1.register);
exports.default = router;
//# sourceMappingURL=userRoutes.js.map