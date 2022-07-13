import { NextFunction, Request, Response } from "express";
import { joiSchemas } from "../models/joi";
import { AppError } from "../utils/errors/AppError";
import Joi from "joi";

function validateJoiSchemaFromLocals(locals: any, joiSchema: Joi.AnySchema) {
    
    let values = {};
    const keys = Object.keys(joiSchema.describe().keys);

    keys.forEach(key => {
        // check if is required
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


function validate (joiSchema: Joi.AnySchema) {
    return (req: Request, res: Response, next: NextFunction) => {
        validateJoiSchemaFromLocals(res.locals, joiSchema);
        next();
    }
}

export const joiSchema = {
    validate
}