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
Object.defineProperty(exports, "__esModule", { value: true });
exports.disciplineOnTeacher = exports.categoryOnTeacher = exports.categoryOnDiscipline = exports.category = exports.discipline = exports.term = exports.teacher = exports.test = exports.user = void 0;
const user = __importStar(require("./user.repository"));
exports.user = user;
const test = __importStar(require("./test.repository"));
exports.test = test;
const teacher = __importStar(require("./teacher.repository"));
exports.teacher = teacher;
const term = __importStar(require("./term.repository"));
exports.term = term;
const discipline = __importStar(require("./discipline.repository"));
exports.discipline = discipline;
const category = __importStar(require("./category.repository"));
exports.category = category;
const categoryOnDiscipline = __importStar(require("./category-discipline.repository"));
exports.categoryOnDiscipline = categoryOnDiscipline;
const categoryOnTeacher = __importStar(require("./category-teacher.repository"));
exports.categoryOnTeacher = categoryOnTeacher;
const disciplineOnTeacher = __importStar(require("./discipline-teacher.repository"));
exports.disciplineOnTeacher = disciplineOnTeacher;
