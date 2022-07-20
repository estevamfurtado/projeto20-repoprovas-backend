import prisma from "../prisma"
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