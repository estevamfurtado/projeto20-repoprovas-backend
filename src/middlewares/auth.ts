import { NextFunction, Request, Response } from "express";
import * as authService from "../services/auth";

async function validateToken (req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization;
    if (!token) {
        throw new Error('No token provided');
    }
    const decoded = authService.validateTokenOrCrash(token);
    next();
}

export {validateToken}