"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import { chalkLogger } from './chalkLogger';
const AppError_1 = require("./errors/AppError");
function errorHandlingMiddleware(error, req, res, next) {
    if (error instanceof AppError_1.AppError) {
        // chalkLogger.log('error', error.message);
        console.log('error', error.message);
        return res.status(error.statusCode).send({ message: error.message, status: 'error' });
    }
    else {
        // chalkLogger.logObject('error', error);
        console.log('error', error);
        return res.status(500).send({ message: 'Internal server error', status: 'error' });
    }
}
exports.default = errorHandlingMiddleware;
