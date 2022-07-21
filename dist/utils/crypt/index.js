"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
exports.crypt = void 0;
const cryptr_1 = __importDefault(require("cryptr"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const AppError_1 = require("../errors/AppError");
const secretKey = (_a = process.env.JWT_SECRET) !== null && _a !== void 0 ? _a : 'JWT_SECRET';
const cryptrSecret = (_b = process.env.JWT_SECRET) !== null && _b !== void 0 ? _b : 'JWT_SECRET';
const cryptr = new cryptr_1.default(cryptrSecret);
function encryptCryptr(value) {
    const encryptedPassword = cryptr.encrypt(value);
    return encryptedPassword;
}
function decryptCryptr(value) {
    const decryptedPassword = cryptr.decrypt(value);
    return decryptedPassword;
}
function createToken(saveData) {
    const data = Object.assign({}, saveData);
    const config = { expiresIn: '1h' };
    const token = jsonwebtoken_1.default.sign(data, secretKey, config);
    return token;
}
function decodeToken(token) {
    try {
        const decoded = jsonwebtoken_1.default.verify(token, secretKey);
        return decoded;
    }
    catch (e) {
        throw new AppError_1.AppError(401, 'Invalid token');
    }
}
function encryptBcrypt(value) {
    const encryptedPassword = bcrypt_1.default.hashSync(value, bcrypt_1.default.genSaltSync(8));
    return encryptedPassword;
}
function compareBcrypt(value, encryptedValue) {
    const isValid = bcrypt_1.default.compareSync(value, encryptedValue);
    return isValid;
}
exports.crypt = {
    cryptr: { encrypt: encryptCryptr, decrypt: decryptCryptr },
    bcrypt: { encrypt: encryptBcrypt, compare: compareBcrypt },
    jwt: { create: createToken, decode: decodeToken },
};
