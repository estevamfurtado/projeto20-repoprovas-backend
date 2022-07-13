import { NextFunction, Request, Response } from "express";
import { joiSchemas } from "../models/joi";
import { AppError } from "../utils/errors/AppError";
import Joi from "joi";
import { chalkLogger } from "../utils/chalkLogger";


function validateJoiSchemaFromLocals(locals: any, joiSchema: Joi.AnySchema) {
    
    let values = {};
    const keys = Object.keys(joiSchema.describe().keys);

    keys.forEach(key => {
        if (joiSchema.describe().keys[key].presence === 'required') {
            if (locals[key] === undefined) {
                throw new AppError(400, `${key} is required`);
            }
        }
        values = { ...values, [key]: locals[key] };
    });

    const { error } = joiSchema.validate(values);
    if (error) {
        throw new AppError(400, error.message);
    }

    return true;
}


function joiSchema (joiSchema: Joi.AnySchema) {
    return (req: Request, res: Response, next: NextFunction) => {
        chalkLogger.log('middleware', 'Validating request data with joi schema');
        validateJoiSchemaFromLocals(res.locals, joiSchema);
        next();
    }
}

export {joiSchema}