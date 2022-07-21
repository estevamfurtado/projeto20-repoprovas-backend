"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewTest = void 0;
const joi_1 = __importDefault(require("joi"));
exports.NewTest = joi_1.default.object().keys({
    name: joi_1.default.string().required(),
    pdfUrl: joi_1.default.string().uri().required(),
    categoryId: joi_1.default.number().required(),
    teacherId: joi_1.default.number().required(),
    disciplineId: joi_1.default.number().required(),
});
