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
Object.defineProperty(exports, "__esModule", { value: true });
exports.logRoute = exports.throwError = exports.throwAppError = void 0;
// import { chalkLogger } from "../../utils/chalkLogger";
// import { AppError } from "../../utils/errors/AppError";
function throwAppError(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        // throw new AppError(500, "Test AppError in middleware");
        throw new Error("Test AppError in middleware");
    });
}
exports.throwAppError = throwAppError;
function throwError(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        throw new Error("Test error in middleware");
    });
}
exports.throwError = throwError;
function logRoute(message) {
    return (req, res, next) => {
        // chalkLogger.log('route', message);
        next();
    };
}
exports.logRoute = logRoute;
