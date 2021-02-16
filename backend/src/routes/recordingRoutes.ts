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
  toggleLikeRecording,
  commentOnRecording,
  getComments,
  editComment,
  deleteComment,
} from '../controller/recordingController';

router.post('/upload', protect, upload.single('recording'), uploadRecording);
router.get('/my', protect, getMyRecordings);
router.put('/edit', protect, editRecording);
router.delete('/delete', protect, deleteRecording);
router.put('/toggle-like/:id', protect, toggleLikeRecording);
router.put('/comment/:id', protect, commentOnRecording);
router.get('/comment/:id', protect, getComments);
router.put('/comment/:id/edit/:commentId', protect, editComment);
router.delete('/comment/:id/delete/:commentId', protect, deleteComment);
router.get('/:username', protect, getRecordingsByUsername);

export default router;
