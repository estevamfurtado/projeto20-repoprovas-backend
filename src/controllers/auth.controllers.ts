import { NextFunction, Request, Response } from "express";
import { chalkLogger } from "../utils/chalkLogger";
import * as services from "../services";

export async function signUp (req: Request, res: Response, next: NextFunction) {

    const { password, email } = res.locals;
    const token = await services.auth.signUp(password, email);

    chalkLogger.log('controller', 'Sign up success');
    return res.status(200).json({ token });
} 

export async function signIn (req: Request, res: Response, next: NextFunction) {

    const { password, email } = res.locals;
    const token = await services.auth.signIn(password, email);

    chalkLogger.log('controller', 'Sign in success');
    return res.status(200).json({ token });
} 