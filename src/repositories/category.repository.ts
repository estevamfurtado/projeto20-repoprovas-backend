import prisma from "../prisma"
import { Category } from "@prisma/client";


export async function findById (id: number) : Promise<Category | null> {
    const result = await prisma.category.findFirst({where: {id},});
    return result;
}

export async function create (name: string) : Promise<Category> {
    const result = await prisma.category.create({
        data: {name,},
    });
    return result;
}