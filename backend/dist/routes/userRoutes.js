"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controller/userController");
const router = express_1.default.Router();
router.post('/change-password', userController_1.changePassword);
router.post('/reset-password', userController_1.resetPassword);
router.route('/login').post(userController_1.login);
router.route('/facebook-login').post(userController_1.facebookLogin);
router.route('/google-login').post(userController_1.googleLogin);
router.route('/').post(userController_1.register);
exports.default = router;
//# sourceMappingURL=userRoutes.js.map