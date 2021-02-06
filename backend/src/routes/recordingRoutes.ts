import express from 'express';
import { protect } from '../middleware/authMiddleware';
const router = express.Router();

import { uploadRecording, upload } from '../controller/recordingController';

router.post('/upload', protect, upload.single('recording'), uploadRecording);

export default router;
