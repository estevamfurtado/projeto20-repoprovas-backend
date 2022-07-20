import prisma from "../prisma"
import { Discipline } from "@prisma/client";


export async function findById (id: number) : Promise<Discipline | null> {
    const result = await prisma.discipline.findFirst({where: {id},});
    return result;
}

export async function create (name: string, termId: number) : Promise<Discipline> {
    const result = await prisma.discipline.create({
        data: {name, termId,},
    });
    return result;
}