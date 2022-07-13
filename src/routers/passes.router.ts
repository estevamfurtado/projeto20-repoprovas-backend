import * as mws from "../middlewares";
import * as cts from "../controllers";
import { Router } from "express";

const router = Router();

// get all passes
router.post('/', 
    mws.help.logRoute('Save pass'),
    mws.auth.validateToken,
    cts.passes.create
)

// get all passes
router.get('/', 
    mws.help.logRoute('Get all passes'),
    mws.auth.validateToken,
    cts.passes.getAll
)

// get passes by type
router.get('/types/:type',
    mws.help.logRoute('Get passes by type'),
    mws.auth.validateToken,
    cts.passes.getByType
)

// get pass by id
router.get('/:id',
    mws.help.logRoute('Get pass by id'),
    mws.auth.validateToken,
    cts.passes.getById
)

router.put('/:id',
    mws.help.logRoute('Update pass by id'),
    mws.auth.validateToken,
    cts.passes.updateById
)

router.delete('/:id',
    mws.help.logRoute('Delete pass by id'),
    mws.auth.validateToken,
    cts.passes.deleteById
)

export default router;