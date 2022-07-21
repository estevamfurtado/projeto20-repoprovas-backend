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
exports.getByTeachers = exports.getByTerms = exports.create = void 0;
const chalkLogger_1 = require("../utils/chalkLogger");
const services = __importStar(require("../services"));
function create(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        chalkLogger_1.chalkLogger.log('middleware', 'Saving test');
        const { name, pdfUrl, teacherId, disciplineId, categoryId } = res.locals;
        const test = yield services.tests.save({ name, pdfUrl, teacherId, disciplineId, categoryId });
        chalkLogger_1.chalkLogger.log('controller', 'Test saved');
        res.status(201).json({ test });
    });
}
exports.create = create;
function getByTerms(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        chalkLogger_1.chalkLogger.log('middleware', 'Getting tests by disciplines');
        const testsByTerms = yield services.tests.getByTerms();
        chalkLogger_1.chalkLogger.log('controller', 'Got tests');
        res.status(200).json({ testsByTerms });
    });
}
exports.getByTerms = getByTerms;
function getByTeachers(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        chalkLogger_1.chalkLogger.log('middleware', 'Getting tests');
        const testsByTeachers = yield services.tests.getByTeachers();
        chalkLogger_1.chalkLogger.log('controller', 'Got tests');
        res.status(200).json({ testsByTeachers });
    });
}
exports.getByTeachers = getByTeachers;
