"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadDir = void 0;
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const db_1 = require("./config/db");
const errorMiddleware_1 = require("./middleware/errorMiddleware");
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const recordingRoutes_1 = __importDefault(require("./routes/recordingRoutes"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config();
db_1.connectDb();
const app = express_1.default();
app.use(cors_1.default());
exports.uploadDir = path_1.default.join(__dirname, '../uploads');
app.use(express_1.default.json());
app.use('/api/users', userRoutes_1.default);
app.use('/api/recordings', recordingRoutes_1.default);
app.use(errorMiddleware_1.notFound);
app.use(errorMiddleware_1.errorHandler);
app.listen(process.env.PORT || 4000, () => {
    console.log('The app is listening on port 4000');
});
//# sourceMappingURL=index.js.map