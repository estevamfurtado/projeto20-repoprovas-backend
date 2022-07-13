import { Request, Response } from "express";


async function create (req: Request, res: Response) {
    res.status(201).json({'message': 'Pass created'});
}

async function getAll (req: Request, res: Response) {
    res.status(201).json({'message': 'Pass created'});
}

async function getByType (req: Request, res: Response) {
    res.status(201).json({'message': 'Pass created'});
}

async function getById (req: Request, res: Response) {
    res.status(201).json({'message': 'Pass created'});
}

async function updateById (req: Request, res: Response) {
    res.status(201).json({'message': 'Pass created'});
}

async function deleteById (req: Request, res: Response) {
    res.status(201).json({'message': 'Pass created'});
}


export {create, getAll, getByType, getById, updateById, deleteById}