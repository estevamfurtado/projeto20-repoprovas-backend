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
exports.findOrCreate = exports.validateIdsOrCrash = void 0;
const disciplineService = __importStar(require("./disciplines.services"));
const teacherService = __importStar(require("./teachers.services"));
const categoryService = __importStar(require("./categories.services"));
const repos = __importStar(require("../repositories"));
const chalkLogger_1 = require("../utils/chalkLogger");
function validateIdsOrCrash(categoryId, disciplineId, teacherId) {
    return __awaiter(this, void 0, void 0, function* () {
        chalkLogger_1.chalkLogger.log('service', 'Validating categ-disci-teach ids...');
        yield disciplineService.validateIdExistsOrCrash(disciplineId);
        yield teacherService.validateIdExistsOrCrash(teacherId);
        yield categoryService.validateIdExistsOrCrash(categoryId);
    });
}
exports.validateIdsOrCrash = validateIdsOrCrash;
function findOrCreate(categoryId, disciplineId, teacherId) {
    return __awaiter(this, void 0, void 0, function* () {
        chalkLogger_1.chalkLogger.log('service', 'Making sure categ-disci-teach exists');
        const categoryOnDiscipline = yield repos.categoryOnDiscipline.findByIds(categoryId, disciplineId);
        if (!categoryOnDiscipline) {
            yield repos.categoryOnDiscipline.create(categoryId, disciplineId);
        }
        const categoryOnTeacher = yield repos.categoryOnTeacher.findByIds(categoryId, teacherId);
        if (!categoryOnTeacher) {
            yield repos.categoryOnTeacher.create(categoryId, teacherId);
        }
        const disciplineOnTeacher = yield repos.disciplineOnTeacher.findByIds(disciplineId, teacherId);
        if (!disciplineOnTeacher) {
            yield repos.disciplineOnTeacher.create(disciplineId, teacherId);
        }
    });
}
exports.findOrCreate = findOrCreate;
