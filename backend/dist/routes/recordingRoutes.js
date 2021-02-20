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
router.get('/my', authMiddleware_1.protect, recordingController_1.getMyRecordings);
router.put('/edit', authMiddleware_1.protect, recordingController_1.editRecording);
router.delete('/delete', authMiddleware_1.protect, recordingController_1.deleteRecording);
router.get('/popular', authMiddleware_1.protect, recordingController_1.getPopularRecords);
router.put('/toggle-like/:id', authMiddleware_1.protect, recordingController_1.toggleLikeRecording);
router.put('/comment/:id', authMiddleware_1.protect, recordingController_1.commentOnRecording);
router.get('/comment/:id', authMiddleware_1.protect, recordingController_1.getComments);
router.put('/comment/:id/edit/:commentId', authMiddleware_1.protect, recordingController_1.editComment);
router.delete('/comment/:id/delete/:commentId', authMiddleware_1.protect, recordingController_1.deleteComment);
router.get('/:username', authMiddleware_1.protect, recordingController_1.getRecordingsByUsername);
exports.default = router;
//# sourceMappingURL=recordingRoutes.js.map