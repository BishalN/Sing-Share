"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const comment = new mongoose_1.default.Schema({
    user: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        required: true,
    },
    comment: {
        type: String,
        required: true,
    },
}, { timestamps: true });
const like = new mongoose_1.default.Schema({
    user: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        required: true,
    },
}, { timestamps: true });
const recordingSchema = new mongoose_1.default.Schema({
    user: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    fileUri: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    tags: {
        type: String,
    },
    description: {
        type: String,
    },
    likes: [like],
    comments: [comment],
    isPublic: {
        type: Boolean,
        default: true,
    },
}, { timestamps: true });
exports.default = mongoose_1.default.model('Recording', recordingSchema);
//# sourceMappingURL=Recording.js.map