import { NextFunction, Request, Response } from "express";
import { chalkLogger } from "../../utils/chalkLogger";
import { AppError } from "../../utils/errors/AppError";

export async function throwAppError (req: Request, res: Response, next: NextFunction) {
    throw new AppError(500, "Test AppError in middleware");
}

export async function throwError (req: Request, res: Response, next: NextFunction) {
    throw new Error("Test error in middleware");
}

export function logRoute (message: string) {
    return (req: Request, res: Response, next: NextFunction) => {
        chalkLogger.log('route', message);
        next();
    };
}