import * as mws from "../middlewares";
import * as cts from "../controllers";
import { Router } from "express";

const router = Router();

// post new pass -> OK
router.post('/', 
    mws.help.logRoute('Save pass'),
    mws.set.localsFromRequestData,
    mws.auth.validateToken,
    cts.passes.create
)

// get all passes -> OK
router.get('/', 
    mws.help.logRoute('Get all passes'),
    mws.set.localsFromRequestData,
    mws.auth.validateToken,
    cts.passes.getAll
)

// get passes by type -> OK
router.get('/types/:type',
    mws.help.logRoute('Get passes by type'),
    mws.set.localsFromRequestData,
    mws.auth.validateToken,
    cts.passes.getByType
)

// get pass by id -> OK
router.get('/:passId',
    mws.help.logRoute('Get pass by id'),
    mws.set.localsFromRequestData,
    mws.auth.validateToken,
    cts.passes.getById
)

// update pass by id -> OK
router.put('/:passId',
    mws.help.logRoute('Update pass by id'),
    mws.set.localsFromRequestData,
    mws.auth.validateToken,
    cts.passes.updateById
)

// delete pass by id -> OK
router.delete('/:passId',
    mws.help.logRoute('Delete pass by id'),
    mws.set.localsFromRequestData,
    mws.auth.validateToken,
    cts.passes.deleteById
)

export default router;