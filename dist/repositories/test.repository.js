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
exports.getByTeacher = exports.getByTerms = exports.create = void 0;
const prisma_1 = __importDefault(require("../prisma"));
const chalkLogger_1 = require("../utils/chalkLogger");
function create(data) {
    return __awaiter(this, void 0, void 0, function* () {
        chalkLogger_1.chalkLogger.log('repository', 'Creating test');
        console.log(data);
        const { name, pdfUrl, disciplineId, teacherId, categoryId } = data;
        const test = yield prisma_1.default.test.create({ data: {
                name, pdfUrl, disciplineId, teacherId, categoryId,
            } });
        return test;
    });
}
exports.create = create;
function getByTerms() {
    return __awaiter(this, void 0, void 0, function* () {
        const terms = yield prisma_1.default.term.findMany({
            select: { id: true, number: true,
                disciplines: { select: { id: true, name: true,
                        categories: { select: {
                                category: { select: { id: true, name: true,
                                        tests: { select: { id: true, name: true, pdfUrl: true,
                                                teacher: { select: { name: true } }
                                            } }
                                    } }
                            } }
                    } }
            }
        });
        return terms;
    });
}
exports.getByTerms = getByTerms;
function getByTeacher() {
    return __awaiter(this, void 0, void 0, function* () {
        const data = yield prisma_1.default.teacher.findMany({
            select: { id: true, name: true,
                categories: { select: {
                        category: { select: { id: true, name: true,
                                tests: { select: { id: true, name: true, pdfUrl: true,
                                        discipline: { select: { name: true } }
                                    } }
                            } }
                    } }
            }
        });
        return data;
    });
}
exports.getByTeacher = getByTeacher;
