import prisma from "../prisma/index.js"
import { CategoryOnTeacher } from "@prisma/client";


export async function findByIds (categoryId: number, teacherId: number) : Promise<CategoryOnTeacher | null> {
    const result = await prisma.categoryOnTeacher.findFirst({
        where: {categoryId, teacherId,},

    });
    return result;
}

export async function create (categoryId: number, teacherId: number) : Promise<CategoryOnTeacher> {
    const result = await prisma.categoryOnTeacher.create({
        data: {categoryId, teacherId,},
    });
    return result;
}