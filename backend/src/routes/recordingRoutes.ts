import express from 'express';
import { protect } from '../middleware/authMiddleware';
const router = express.Router();

import {
  uploadRecording,
  getRecordingsByUsername,
  getMyRecordings,
  upload,
} from '../controller/recordingController';

router.post('/upload', protect, upload.single('recording'), uploadRecording);
router.get('/my', protect, getMyRecordings);
router.get('/:username', protect, getRecordingsByUsername);

export default router;
