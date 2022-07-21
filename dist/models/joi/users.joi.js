"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignIn = exports.SignUp = exports.User = void 0;
const joi_1 = __importDefault(require("joi"));
exports.User = joi_1.default.object().keys({
    email: joi_1.default.string().email(),
    password: joi_1.default.string().min(4),
});
exports.SignUp = joi_1.default.object().keys({
    email: joi_1.default.string().email().required(),
    password: joi_1.default.string().min(4).required(),
});
exports.SignIn = joi_1.default.object().keys({
    email: joi_1.default.string().email().required(),
    password: joi_1.default.string().min(4).required(),
});
