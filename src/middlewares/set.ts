import { NextFunction, Request, Response } from "express";

export function localsFromRequestData(req: Request, res: Response, next: NextFunction) {
    const locals = {...res.locals, ...req.body, ...req.query, ...req.params, ...req.headers};
    res.locals = locals;
    next();
}