import { Router } from "express";
import * as mws from "../middlewares";
import * as cts from "../controllers";
import joi from "../models/joi";

const router = Router();

router.post('/sign-up',
    mws.help.logRoute('Sign-up'),
    mws.set.localsFromRequestData,
    mws.validate.joiSchema(joi.users.SignUp),
    cts.auth.signUp,
)
router.post('/sign-in',
    mws.help.logRoute('Sign-in'),
    mws.set.localsFromRequestData,
    mws.validate.joiSchema(joi.users.SignIn),
    cts.auth.signIn,
)

export default router;