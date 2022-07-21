import prisma from "../prisma/index.js"
import { Teacher } from "@prisma/client";


export async function findById (id: number) : Promise<Teacher | null> {
    const result = await prisma.teacher.findFirst({where: {id},});
    return result;
}

export async function create (name: string) : Promise<Teacher> {
    const result = await prisma.teacher.create({
        data: {name,},
    });
    return result;
}

export async function getAll () : Promise<Teacher[]> {
    const result = await prisma.teacher.findMany();
    return result;
}