"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = express_1.default.Router();
const recordingController_1 = require("../controller/recordingController");
router.post('/upload', authMiddleware_1.protect, recordingController_1.upload.single('recording'), recordingController_1.uploadRecording);
exports.default = router;
//# sourceMappingURL=recordingRoutes.js.map