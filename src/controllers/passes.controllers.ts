import { Request, Response } from "express";
import { chalkLogger } from "../utils/chalkLogger";
import * as services from '../services';
import { NewCard } from "../models/types/cards.types";

async function create (req: Request, res: Response) {
    chalkLogger.log('middleware', 'Creating pass');
    const pass = await services.passes.insert(res.locals);
    chalkLogger.log('controller', 'Pass created');
    res.status(201).json({pass: pass});
}

async function getAll (req: Request, res: Response) {
    chalkLogger.log('middleware', 'Getting passes');
    const passes = await services.passes.getTypesCounter(res.locals.userId);
    chalkLogger.log('controller', 'Got all passes');
    res.status(201).json(passes);
}

async function getByType (req: Request, res: Response) {
    chalkLogger.log('middleware', 'Getting passes');
    const {type, userId} = res.locals;
    const passes = await services.passes.findByType(userId, type);
    chalkLogger.log('controller', 'Got all passes');
    res.status(201).json(passes);
}

async function getById (req: Request, res: Response) {
    chalkLogger.log('middleware', 'Getting pass by id');

    const {passId, userId} = res.locals;
    const pass = await services.passes.findById(Number(passId), userId);

    chalkLogger.log('controller', 'Got pass by id');
    res.status(201).json(pass);
}

async function updateById (req: Request, res: Response) {
    chalkLogger.log('middleware', 'Updating by id');

    const {passId, userId} = res.locals;
    const pass = await services.passes.updateById(Number(passId), userId, res.locals);

    chalkLogger.log('controller', 'Updated pass by id');
    res.status(201).json(pass);
}

async function deleteById (req: Request, res: Response) {
    chalkLogger.log('middleware', 'Deleting pass by id');

    const {passId, userId} = res.locals;
    const pass = await services.passes.deleteById(Number(passId), userId);

    chalkLogger.log('controller', 'Deleted pass by id');
    res.status(201).json('Deleted');
}


export {create, getAll, getByType, getById, updateById, deleteById}