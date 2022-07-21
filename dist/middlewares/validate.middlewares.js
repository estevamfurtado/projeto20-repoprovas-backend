"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.joiSchema = void 0;
const chalkLogger_1 = require("../utils/chalkLogger");
const joiUtils_1 = require("../utils/joiUtils");
function joiSchema(joi) {
    return (req, res, next) => {
        chalkLogger_1.chalkLogger.log('middleware', 'Validating request data with joi schema');
        (0, joiUtils_1.validateJoiSchemaFromObjectOrCrash)(res.locals, joi);
        next();
    };
}
exports.joiSchema = joiSchema;
