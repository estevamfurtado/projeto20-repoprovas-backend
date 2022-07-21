"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateJoiSchemaFromObjectOrCrash = void 0;
const AppError_1 = require("../utils/errors/AppError");
const chalkLogger_1 = require("./chalkLogger");
function validateJoiSchemaFromObjectOrCrash(object, joiSchema) {
    chalkLogger_1.chalkLogger.log('service', 'Validating object joi schema');
    let values = {};
    const keys = Object.keys(joiSchema.describe().keys);
    keys.forEach(key => {
        const value = object[key] || undefined;
        values = Object.assign(Object.assign({}, values), { [key]: value });
    });
    const { error } = joiSchema.validate(values);
    if (error) {
        throw new AppError_1.AppError(400, error.message);
    }
    return values;
}
exports.validateJoiSchemaFromObjectOrCrash = validateJoiSchemaFromObjectOrCrash;
