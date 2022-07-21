"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateTokenOrCrash = exports.signIn = exports.signUp = void 0;
const AppError_1 = require("../utils/errors/AppError");
const userService = __importStar(require("./users.services"));
const repos = __importStar(require("../repositories"));
const crypt_1 = require("../utils/crypt");
function signUp(password, email) {
    return __awaiter(this, void 0, void 0, function* () {
        const newUser = yield userService.createOrCrash({ password, email });
        const token = crypt_1.crypt.jwt.create(newUser);
        return token;
    });
}
exports.signUp = signUp;
function signIn(password, email) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield userService.findByEmailOrCrash(email);
        const encryptedPassword = yield repos.user.getPassword(email);
        yield userService.validatePasswordOrCrash(password, encryptedPassword !== null && encryptedPassword !== void 0 ? encryptedPassword : '');
        const token = crypt_1.crypt.jwt.create(user);
        return token;
    });
}
exports.signIn = signIn;
function validateTokenOrCrash(token) {
    const decoded = crypt_1.crypt.jwt.decode(token);
    if (!decoded) {
        throw new AppError_1.AppError(401, 'Invalid token');
    }
    return decoded;
}
exports.validateTokenOrCrash = validateTokenOrCrash;
