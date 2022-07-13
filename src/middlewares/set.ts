import { NextFunction, Request, Response } from "express";
import { chalkLogger } from "../utils/chalkLogger";

export function localsFromRequestData(req: Request, res: Response, next: NextFunction) {
    chalkLogger.log('middleware', 'Saving request data to locals');
    const locals = {...res.locals, ...req.body, ...req.query, ...req.params, ...req.headers};
    res.locals = locals;
    next();
}