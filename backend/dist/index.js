"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = require("./config/db");
const errorMiddleware_1 = require("./middleware/errorMiddleware");
dotenv_1.default.config();
db_1.connectDb();
const app = express_1.default();
app.get('/', (_, res) => {
    res.send('hello to the world');
});
app.use(errorMiddleware_1.notFound);
app.use(errorMiddleware_1.errorHandler);
app.listen(4000, () => {
    console.log('The app is listening on port 4000');
});
//# sourceMappingURL=index.js.map