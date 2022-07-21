import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import { chalkLogger } from "../utils/chalkLogger.js";
import { validateJoiSchemaFromObjectOrCrash } from "../utils/joiUtils.js";


export function joiSchema (joi: Joi.AnySchema) {
    return (req: Request, res: Response, next: NextFunction) => {
        chalkLogger.log('middleware', 'Validating request data with joi schema');
        validateJoiSchemaFromObjectOrCrash(res.locals, joi);
        next();
    }
}

