import { joiSchemas } from '../models/joi';
import { client } from "../database";
import { AppError } from '../utils/errors/AppError';
import {crypt} from '../utils/crypt';
import { chalkLogger } from '../utils/chalkLogger';
import { UserInsertData } from '../models/types/users.types';
import { Card, NewCard } from '../models/types/cards.types';
import { validateJoiSchemaFromObjectOrCrash } from '../utils/joiUtils';
import { Passes } from '@prisma/client';

export function getNewPassSchemaOrCrash (type: string) {
    chalkLogger.log('service', 'Getting schema');
    const passSchemas = joiSchemas.Passes.new;
    const passSchema = passSchemas[type as keyof typeof passSchemas] ?? undefined;
    if (!passSchema) {
        throw new AppError(400, `Invalid type: ${type}`);
    }
    return passSchema;
}

export function getUpdatePassSchemaOrCrash (type: string) {
    chalkLogger.log('service', 'Getting schema');
    const passSchemas = joiSchemas.Passes.update;
    const passSchema = passSchemas[type as keyof typeof passSchemas] ?? undefined;
    if (!passSchema) {
        throw new AppError(400, `Invalid type: ${type}`);
    }
    return passSchema;
}

function cryptPass(data: any) {
    if (data.password) {
        data.password = crypt.cryptr.encrypt(data.password);
    }
    if (data.cvv) {
        data.cvv = crypt.cryptr.encrypt(data.cvv);
    }
    return data;
}

function decryptPass(data: any) {
    if (data.password) {
        data.password = crypt.cryptr.decrypt(data.password);
    }
    if (data.cvv) {
        data.cvv = crypt.cryptr.decrypt(data.cvv);
    }
    return data;
}

const formattedPassColumns = {
    card: ['id', 'createdAt', 'title', 'name', 'number', 'expiry', 'cardType', 'cvv', 'password'],
    wifi: ['id', 'createdAt', 'title', 'network', 'password'],
    credential: ['id', 'createdAt', 'title', 'url', 'login', 'password'],
    note: ['id', 'createdAt', 'title', 'content'],
}

function formatPass(data: Passes) {
    const {type} = data;
    const columns = formattedPassColumns[type as keyof typeof formattedPassColumns];
    const formattedData = columns.reduce((acc, column) => {
        acc[column] = data[column as keyof typeof data];
        return acc;
    }
    , {} as any);
    return decryptPass(formattedData);
}

function clearData(data: any) {
    const clear = Object.keys(data).forEach((key) => {
        if (data[key] === null || data[key] === undefined) {
            delete data[key];
        }
    });
    if (data.passId) {delete data.passId}
    return cryptPass(data);
}

function formatPassesObject(passes: any) {
    const array = Object.values(passes) as Passes[];
    return array.map((pass) => {return formatPass(pass)});
}

export async function insert (data: any) {
    const insertData = validateInsertData(data) as any;
    const cryptedData = cryptPass(insertData);
    const pass = await client.passes.create({data: cryptedData});
    return formatPass(pass);
}

export async function findById(passId: number, userId: number) {
    console.log(passId, userId)
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

    return formatPass(pass);
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
    // find type of pass by id
    const pass = await client.passes.findFirst({where: { id: {equals: passId}},})
    const type = pass?.type || null;
    const updateData = validateUpdateData({...data, type}) as any;
    const clearedData = clearData(updateData);
    const updatedPass = await client.passes.update({data: clearedData, where: {id: passId}});
    return formatPass(updatedPass);
}

export async function getAll (userId: number) {
    const passes = await client.passes.groupBy({
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
    return passes;
}

export async function getByType (userId: number, type: string) {
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
    return formatPassesObject(passes);
}



export function validateInsertData (insertData: any) {
    chalkLogger.log('service', 'Validating insert data');
    const { type } = insertData;
    const joiSchema = getNewPassSchemaOrCrash(type as string);
    const object = validateJoiSchemaFromObjectOrCrash(insertData, joiSchema);
    return object;
}

export function validateUpdateData (insertData: any) {
    chalkLogger.log('service', 'Validating insert data');
    const { type } = insertData;
    const joiSchema = getUpdatePassSchemaOrCrash(type as string);
    const object = validateJoiSchemaFromObjectOrCrash(insertData, joiSchema);
    return object;
}