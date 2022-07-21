import { Router } from "express";
import * as mws from "../middlewares/index.js";
import * as cts from "../controllers/index.js";
import joi from "../models/joi/index.js";

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