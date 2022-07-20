import prisma from "../prisma"
import { CategoryOnDiscipline } from "@prisma/client";


export async function findByIds (categoryId: number, disciplineId: number) : Promise<CategoryOnDiscipline | null> {
    const result = await prisma.categoryOnDiscipline.findFirst({
        where: {categoryId, disciplineId,},
    });
    return result;
}

export async function create (categoryId: number, disciplineId: number) : Promise<CategoryOnDiscipline> {
    const result = await prisma.categoryOnDiscipline.create({
        data: {categoryId, disciplineId,},
    });
    return result;
}