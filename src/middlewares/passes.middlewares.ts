
// middlewares

import { NextFunction, Request, Response } from "express";
import { joiSchemas } from "../models/joi";
import { AppError } from "../utils/errors/AppError";
import { validateJoiSchemaFromObjectOrCrash } from "../utils/joiUtils";
import * as services from "../services";
import { chalkLogger } from "../utils/chalkLogger";

async function validateInsertDataByType(req: Request, res: Response, next: NextFunction) {
    chalkLogger.log('middleware', 'Validating insert data');
    const { type } = res.locals;
    const joiSchema = services.passes.getNewPassSchemaOrCrash(type as string);
    const object = validateJoiSchemaFromObjectOrCrash(res.locals, joiSchema);
    res.locals.newPassObject = object;
    next();
} 

async function validateUpdateDataByType(req: Request, res: Response, next: NextFunction) {
    chalkLogger.log('middleware', 'Validating update data');
    const { type } = res.locals;
    const joiSchema = services.passes.getUpdatePassSchemaOrCrash(type as string);
    const object = validateJoiSchemaFromObjectOrCrash(res.locals, joiSchema);
    res.locals.updatePassObject = object;
    next();
}





export {validateInsertDataByType, validateUpdateDataByType}