"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendForgetPasswordEmail = void 0;
const mail_1 = __importDefault(require("@sendgrid/mail"));
const sendForgetPasswordEmail = (email, token) => {
    mail_1.default.setApiKey(process.env.SEND_GRID_API_KEY);
    const msg = {
        to: email,
        from: 'neupanebishal07@gmail.com',
        subject: 'Account forget password',
        text: 'This is an account reset request made probably by in app sing&share',
        html: `<div>
    <h1>Reset your password</h1>
    <a href='http://localhost:3000/reset-password?token=${token}'>
    Click here to reset your password</a>
    <h2>Hurry up it won't last long!!</h2></div>`,
    };
    mail_1.default
        .send(msg)
        .then(() => {
        console.log('Email sent');
    })
        .catch((error) => {
        console.error(error.response.body);
    });
};
exports.sendForgetPasswordEmail = sendForgetPasswordEmail;
//# sourceMappingURL=sendForgetPasswordEmail.js.map