import { Router } from "express";
import * as mws from "../middlewares";
import * as cts from "../controllers";
import { joiSchemas } from "../models/joi";

const router = Router();

router.post('/sign-up',
    mws.help.logRoute('Sign-up'),
    mws.set.localsFromRequestData,
    mws.validate.joiSchema(joiSchemas.User.SignUp),
    cts.auth.signUp,
)
router.post('/sign-in',
    mws.help.logRoute('Sign-in'),
    mws.set.localsFromRequestData,
    mws.validate.joiSchema(joiSchemas.User.SignIn),
    cts.auth.signIn,
)

export default router;