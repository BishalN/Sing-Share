import express from 'express';
import { protect } from '../middleware/authMiddleware';
const router = express.Router();

import {
  uploadRecording,
  getRecordingsByUsername,
  getMyRecordings,
  upload,
  editRecording,
  deleteRecording,
} from '../controller/recordingController';

router.post('/upload', protect, upload.single('recording'), uploadRecording);
router.get('/my', protect, getMyRecordings);
router.put('/edit', protect, editRecording);
router.delete('/delete', protect, deleteRecording);
router.get('/:username', protect, getRecordingsByUsername);

export default router;
