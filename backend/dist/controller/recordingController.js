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
exports.getPopularRecords = exports.deleteComment = exports.editComment = exports.getComments = exports.commentOnRecording = exports.toggleLikeRecording = exports.deleteRecording = exports.editRecording = exports.getRecordings = exports.getMyRecordings = exports.getRecordingsByUsername = exports.uploadRecording = exports.upload = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const storage_1 = require("@google-cloud/storage");
const path_1 = __importDefault(require("path"));
const multer_1 = __importDefault(require("multer"));
const fs_1 = __importDefault(require("fs"));
const index_1 = require("../index");
const User_1 = __importDefault(require("../models/User"));
const Recording_1 = __importDefault(require("../models/Recording"));
const storage = multer_1.default.diskStorage({
    destination(req, file, cb) {
        cb(null, 'uploads/');
    },
    filename(req, file, cb) {
        cb(null, `${req.user.username}-${Date.now()}-${path_1.default.extname(file.originalname)}`);
    },
});
var limits = { fileSize: 1024 * 1024 * 50 };
exports.upload = multer_1.default({
    limits,
    storage,
});
const gc = new storage_1.Storage({
    keyFilename: path_1.default.join(__dirname, '../recording.json'),
    projectId: 'justforbucketrecording',
});
exports.uploadRecording = express_async_handler_1.default((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield User_1.default.findById(req.user._id).select('-password');
    if (!user) {
        res.status(401);
        throw new Error('User not found');
    }
    let { title, description, isPublic, tags } = req.body;
    isPublic = Boolean(isPublic);
    const bucket = gc.bucket('justforbucketrecording.appspot.com');
    const uploadRes = yield bucket.upload(`${req.file.path}`, {
        public: isPublic,
    });
    const fileUri = `https://storage.googleapis.com/${bucket.name}/${req.file.filename}`;
    const recording = yield Recording_1.default.create({
        user,
        fileUri,
        title,
        tags,
        description,
        isPublic,
    });
    if (uploadRes) {
        fs_1.default.unlink(path_1.default.join(index_1.uploadDir, req.file.filename), () => {
            console.log('file deleted'.underline.red);
        });
    }
    res.json(recording);
}));
exports.getRecordingsByUsername = express_async_handler_1.default((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username } = req.params;
        const user = yield User_1.default.findOne({ username });
        if (!user) {
            res.status(400);
            throw new Error('User not found');
        }
        const recordings = yield Recording_1.default.find({ user, isPublic: true });
        res.json(recordings);
    }
    catch (error) {
        res.status(500);
        throw new Error(error.message);
    }
}));
exports.getMyRecordings = express_async_handler_1.default((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.user;
        if (!user) {
            res.status(400);
            throw new Error('User not found');
        }
        const recordings = yield Recording_1.default.find({ user });
        res.json(recordings);
    }
    catch (error) {
        res.status(500);
        throw new Error(error.message);
    }
}));
exports.getRecordings = express_async_handler_1.default((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const pageSize = 5;
    const page = Number(req.query.pageNumber) || 1;
    const title = req.query.title
        ? {
            title: {
                $regex: req.query.title,
                $options: 'i',
            },
        }
        : {};
    const tags = req.query.tags
        ? {
            tags: {
                $regex: req.query.tags,
                $options: 'i',
            },
        }
        : {};
    const recordings = yield Recording_1.default.find(Object.assign(Object.assign({}, title), tags))
        .limit(pageSize)
        .skip(pageSize * (page - 1));
    res.send(recordings);
}));
exports.editRecording = express_async_handler_1.default((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { recordingId, title, tags, description, isPublic } = req.body;
    const user = req.user;
    const recording = yield Recording_1.default.findById(recordingId);
    if (!recording) {
        res.status(400);
        throw new Error('Recording not found');
    }
    const isUsersRecording = String(recording === null || recording === void 0 ? void 0 : recording.user) === String(user._id);
    if (!isUsersRecording) {
        res.status(401);
        throw new Error('Unauthorized ');
    }
    recording.title = title || recording.title;
    recording.tags = tags || recording.tags;
    recording.description = description || recording.description;
    recording.isPublic = isPublic || recording.isPublic;
    const updatedRecording = yield recording.save();
    res.json(updatedRecording);
}));
exports.deleteRecording = express_async_handler_1.default((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { recordingid } = req.headers;
    const user = req.user;
    const recording = yield Recording_1.default.findById(recordingid);
    if (!recording) {
        res.status(400);
        throw new Error('Recording not found');
    }
    const isUsersRecording = String(recording === null || recording === void 0 ? void 0 : recording.user) === String(user._id);
    if (!isUsersRecording) {
        res.status(401);
        throw new Error('Unauthorized ');
    }
    const isDeleted = yield (recording === null || recording === void 0 ? void 0 : recording.deleteOne({ _id: recordingid }));
    res.json({ status: 'success', deletedRecording: isDeleted.title });
}));
exports.toggleLikeRecording = express_async_handler_1.default((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const recording = yield Recording_1.default.findById(req.params.id);
    if (recording.likes.some((like) => like.user.toString() === req.user.id)) {
        recording.likes = recording.likes.filter((myLike) => myLike.user.toString() !== req.user.id);
        yield recording.save();
        return res.json(recording.likes);
    }
    recording.likes.unshift({ user: req.user.id });
    yield recording.save();
    return res.json(recording.likes);
}));
exports.commentOnRecording = express_async_handler_1.default((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const recording = yield Recording_1.default.findById(req.params.id);
    const { comment, avatar, username } = req.body;
    recording.comments.push({ user, comment, avatar, username });
    yield recording.save();
    return res.json(recording.comments.pop());
}));
exports.getComments = express_async_handler_1.default((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const recording = yield Recording_1.default.findById(req.params.id);
    if (!recording) {
        res.status(404);
        throw new Error('Recording not found');
    }
    res.json(recording.comments);
}));
exports.editComment = express_async_handler_1.default((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const recording = yield Recording_1.default.findById(req.params.id);
    const { comment } = req.body;
    const { comments } = recording;
    const commentIndex = comments.findIndex((comment) => String(comment.id) === req.params.commentId);
    const commentToBeEdited = comments[commentIndex];
    if (String(commentToBeEdited.user) === String(req.user.id)) {
        commentToBeEdited.comment = comment;
        yield recording.save();
        res.send(recording.comments[commentIndex]);
    }
    else {
        res.status(401);
        throw new Error('Unauthorized');
    }
}));
exports.deleteComment = express_async_handler_1.default((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const recording = yield Recording_1.default.findById(req.params.id);
    const { comments } = recording;
    const commentIndex = comments.findIndex((comment) => String(comment._id) === req.params.commentId);
    const commentToBeDeleted = comments[commentIndex];
    if (String(commentToBeDeleted.user) === String(req.user._id) ||
        String(recording.user) === String(req.user._id)) {
        comments.splice(commentIndex, 1);
        yield recording.save();
        res.send(recording.comments);
    }
    else {
        res.status(401);
        throw new Error('Unauthorized');
    }
}));
exports.getPopularRecords = express_async_handler_1.default((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const recordings = yield Recording_1.default.find({});
    res.send(recordings);
}));
//# sourceMappingURL=recordingController.js.map