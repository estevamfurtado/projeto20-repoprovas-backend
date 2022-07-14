import { joiSchemas } from '../models/joi';
import { client } from "../database";
import { AppError } from '../utils/errors/AppError';
import {crypt} from '../utils/crypt';
import { chalkLogger } from '../utils/chalkLogger';
import { validateJoiSchemaFromObjectOrCrash } from '../utils/joiUtils';
import { Passes } from '@prisma/client';
import Joi from 'joi';


export interface TypeUtil {
    type: string;
    cryptedColumns: string[];
    outputColumns: string[];
    joi: {
        new: Joi.AnySchema;
        update: Joi.AnySchema;
    }
}

const typesUtils: TypeUtil[] = [
    {   type: 'card', 
        cryptedColumns: ['cvv', 'password'],
        outputColumns: ['id', 'createdAt', 'title', 'name', 'number', 'expiry', 'cardType', 'cvv', 'password'],
        joi: {new: joiSchemas.Passes.new.card, update: joiSchemas.Passes.update.card}},
    {   type: 'wifi',
        cryptedColumns: ['password'],
        outputColumns: ['id', 'createdAt', 'title', 'network', 'password'],
        joi: {new: joiSchemas.Passes.new.wifi, update: joiSchemas.Passes.update.wifi}},
    {   type: 'credential',
        cryptedColumns: ['password'],
        outputColumns: ['id', 'createdAt', 'title', 'login', 'password'],
        joi: {new: joiSchemas.Passes.new.credential, update: joiSchemas.Passes.update.credential}},
    {   type: 'note',
        cryptedColumns: [],
        outputColumns: ['id', 'createdAt', 'title', 'content'],
        joi: {new: joiSchemas.Passes.new.note, update: joiSchemas.Passes.update.note}}
];

function getTypeUtilOrCrash (type: string) {
    // if there is not, crash
    const typeUtil = typesUtils.find((typeUtil) => typeUtil.type === type);
    if (!typeUtil) {
        throw new AppError(404, `Invalid pass type ${type}`);
    }
    return typeUtil;
}

function cryptKeys(data: any, keys: string[]) {    
    keys.forEach((key) => {
        if (data[key]) {
            data[key] = crypt.cryptr.encrypt(data[key]);
        }
    });
    return data;
}

function decryptKeys(data: any, keys: string[]) {
    keys.forEach((key) => {
        if (data[key]) {
            data[key] = crypt.cryptr.decrypt(data[key]);
        }
    });
    return data;
}

function validateData(data: any, joiSchema: Joi.AnySchema) {
    const {error} = joiSchema.validate(data);
    if (error) {
        throw new AppError(400, error.message);
    }
    return data;
}

function formatPass(data: Passes, typeUtil: TypeUtil) {
    const columns = typeUtil.outputColumns;
    const formattedData = columns.reduce((acc, column) => {
        acc[column] = data[column as keyof typeof data];
        return acc;
    }
    , {} as any);
    return decryptKeys(formattedData, typeUtil.cryptedColumns);
}

function clearData(data: any, typeUtil: TypeUtil) {
    const clear = Object.keys(data).forEach((key) => {
        if (data[key] === null || data[key] === undefined) {
            delete data[key];
        }
    });
    if (data.passId) {delete data.passId}
    return decryptKeys(data, typeUtil.cryptedColumns);
}

function formatPassesObject(passes: any, typeUtil: TypeUtil) {
    const array = Object.values(passes) as Passes[];
    return array.map((pass) => {return formatPass(pass, typeUtil)});
}

// -------------------------

export async function insert (data: any) {
    const typeUtil = getTypeUtilOrCrash(data.type);
    const dataToInsert = validateData(data, typeUtil.joi.new);
    const cryptedData = cryptKeys(dataToInsert, typeUtil.cryptedColumns);
    const pass = await client.passes.create({data: cryptedData});
    return formatPass(pass, typeUtil);
}

export async function findById(passId: number, userId: number) {
    const pass = await client.passes.findFirst({
        where: {
            id: {
                equals: passId
            }
        },
    })

    if (!pass || pass.userId !== userId) {
        throw new AppError(404, 'Pass not found');
    }

    const typeUtil = getTypeUtilOrCrash(pass.type);
    return formatPass(pass, typeUtil);
}

export async function deleteById(passId: number, userId: number) {
    await findById(passId, userId);
    const result = await client.passes.delete({
        where: {
            id: passId,
        },
    })
    return result;
}

export async function updateById (passId: number, userId:number, data: any) {
    const pass = await client.passes.findFirst({where: { id: {equals: passId}},})
    if (!pass || pass.userId !== userId) {
        throw new AppError(404, 'Pass not found');
    }
    const typeUtil = getTypeUtilOrCrash(pass.type);
    const dataToUpdate = validateData(data, typeUtil.joi.update);
    const clearedData = clearData(dataToUpdate, typeUtil);
    const updatedPass = await client.passes.update({data: clearedData, where: {id: passId}});
    return formatPass(updatedPass, typeUtil);
}

export async function getTypesCounter (userId: number) {
    const typesPassesCounter = await client.passes.groupBy({
        by: ['type'],
        where: {
            userId: {
                equals: userId
            },
        },
        _count: {
            _all: true,
        },
    })
    return formatTypesCounter(typesPassesCounter);
}

function formatTypesCounter(typesPassesCounter: any){
    const counter = typesUtils.map((typeUtil) => {
        const type = typeUtil.type;
        const count = 0;
        return {type, count};
    });
    const keys = Object.keys(typesPassesCounter);
    keys.forEach((key) => {
        const type = typesPassesCounter[key].type;
        const value = typesPassesCounter[key]._count._all;
        counter.forEach((c) => {
            if (c.type === type) {
                c.count = value;
            }
        });
    });
    return counter;
}

export async function findByType (userId: number, type: string) {
    const typeUtil = getTypeUtilOrCrash(type);
    const passes = await client.passes.findMany({
        where: {
            userId: {
                equals: userId
            },
            type: {
                equals: type
            },
        },
        orderBy: {
            createdAt: 'desc',
        },
    })
    return formatPassesObject(passes, typeUtil);
}
