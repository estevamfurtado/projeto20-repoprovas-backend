import { NextFunction, Request, Response } from "express";
import joi from "../models/joi";
import { AppError } from "../utils/errors/AppError";
import Joi from "joi";
import { chalkLogger } from "../utils/chalkLogger";
import { validateJoiSchemaFromObjectOrCrash } from "../utils/joiUtils";


export function joiSchema (joi: Joi.AnySchema) {
    return (req: Request, res: Response, next: NextFunction) => {
        chalkLogger.log('middleware', 'Validating request data with joi schema');
        validateJoiSchemaFromObjectOrCrash(res.locals, joi);
        next();
    }
}

