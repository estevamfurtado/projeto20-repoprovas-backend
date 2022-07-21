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
exports.create = exports.findByIds = void 0;
const prisma_1 = __importDefault(require("../prisma"));
function findByIds(disciplineId, teacherId) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield prisma_1.default.disciplineOnTeacher.findFirst({
            where: { disciplineId, teacherId, },
        });
        return result;
    });
}
exports.findByIds = findByIds;
function create(disciplineId, teacherId) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield prisma_1.default.disciplineOnTeacher.create({
            data: { disciplineId, teacherId },
        });
        return result;
    });
}
exports.create = create;
