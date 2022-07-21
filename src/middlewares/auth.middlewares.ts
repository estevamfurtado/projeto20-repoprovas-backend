import { NextFunction, Request, Response } from "express";
import { GetUser } from "../models/types/index.js";
import * as authService from "../services/auth.services.js";
import { chalkLogger } from "../utils/chalkLogger.js";
import { AppError } from "../utils/errors/AppError.js";

async function validateToken (req: Request, res: Response, next: NextFunction) {
    chalkLogger.log('middleware', 'Validating token');

    const {authorization} = res.locals || undefined;
    if (!authorization) {
        throw new AppError(401, 'No token provided');
    }
    const token = authorization.split(' ')[1];
    if (!token) {
        throw new AppError(401, 'No token provided');
    }
    const user: GetUser = authService.validateTokenOrCrash(token) as GetUser;
    res.locals.userId = user.id;

    next();
}

export {validateToken}