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
exports.findById = exports.getPassword = exports.findByEmail = exports.create = void 0;
const prisma_1 = __importDefault(require("../prisma"));
const crypt_1 = require("../utils/crypt");
function create(data) {
    return __awaiter(this, void 0, void 0, function* () {
        const encryptedPassword = crypt_1.crypt.bcrypt.encrypt(data.password);
        const newData = Object.assign(Object.assign({}, data), { password: encryptedPassword });
        return yield prisma_1.default.user.create({ data: newData });
    });
}
exports.create = create;
function findByEmail(email) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield prisma_1.default.user.findFirst({
            where: { email: email },
            select: { id: true, email: true, },
        });
        return user;
    });
}
exports.findByEmail = findByEmail;
function getPassword(email) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield prisma_1.default.user.findFirst({
            where: { email: email },
            select: { password: true },
        });
        return (_a = user === null || user === void 0 ? void 0 : user.password) !== null && _a !== void 0 ? _a : null;
    });
}
exports.getPassword = getPassword;
function findById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield prisma_1.default.user.findFirst({
            where: { id: id },
            select: { id: true, email: true, },
        });
        return user;
    });
}
exports.findById = findById;
