import prisma from "../prisma/index.js"
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

export async function getAll () : Promise<Category[]> {
    const result = await prisma.category.findMany();
    return result;
}