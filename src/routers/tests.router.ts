import * as mws from "../middlewares/index.js";
import * as cts from "../controllers/index.js";
import { Router } from "express";
import joi from "../models/joi/index.js";

const router = Router();

router.post('/', 
    mws.help.logRoute('Save new test'),
    mws.set.localsFromRequestData,
    mws.validate.joiSchema(joi.tests.NewTest),
    mws.auth.validateToken,
    cts.tests.create
)

// get all passes -> OK
router.get('/by-disciplines', 
    mws.help.logRoute('Get tests by disciplines'),
    mws.set.localsFromRequestData,
    mws.auth.validateToken,
    cts.tests.getByTerms
)

// get all passes -> OK
router.get('/by-teachers', 
    mws.help.logRoute('Get tests by teachers'),
    mws.set.localsFromRequestData,
    mws.auth.validateToken,
    cts.tests.getByTeachers
)


export default router;