import { Request, Response } from "express";
import { chalkLogger } from "../utils/chalkLogger.js";
import * as services from '../services/index.js';

async function create (req: Request, res: Response) {
    chalkLogger.log('middleware', 'Saving test');
    const {name, pdfUrl, teacherId, disciplineId, categoryId} = res.locals;
    const test = await services.tests.save({name, pdfUrl, teacherId, disciplineId, categoryId});
    chalkLogger.log('controller', 'Test saved');
    res.status(201).json({test});
}

async function getByTerms (req: Request, res: Response) {
    chalkLogger.log('middleware', 'Getting tests by disciplines');
    const testsByTerms = await services.tests.getByTerms();
    chalkLogger.log('controller', 'Got tests');
    res.status(200).json({testsByTerms});
}

async function getByTeachers (req: Request, res: Response) {
    chalkLogger.log('middleware', 'Getting tests');
    const testsByTeachers = await services.tests.getByTeachers();
    chalkLogger.log('controller', 'Got tests');
    res.status(200).json({testsByTeachers});
}

export {create, getByTerms, getByTeachers};