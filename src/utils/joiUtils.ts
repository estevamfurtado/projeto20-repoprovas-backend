import { AppError } from "../utils/errors/AppError";
import Joi from "joi";
import { chalkLogger } from "./chalkLogger";


function validateJoiSchemaFromObjectOrCrash(object: any, joiSchema: Joi.AnySchema) {
    
    chalkLogger.log('service', 'Validating object joi schema');

    let values = {};
    const keys = Object.keys(joiSchema.describe().keys);
    keys.forEach(key => {
        const value = object[key] || undefined;
        values = { ...values, [key]: value };
    });

    const { error } = joiSchema.validate(values);
    if (error) {
        throw new AppError(400, error.message);
    }

    return values;
}

export {validateJoiSchemaFromObjectOrCrash}