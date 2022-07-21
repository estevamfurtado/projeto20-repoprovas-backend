import prisma from "../prisma/index.js"
import { DisciplineOnTeacher } from "@prisma/client";


export async function findByIds (disciplineId: number, teacherId: number) : Promise<DisciplineOnTeacher | null> {
    const result = await prisma.disciplineOnTeacher.findFirst({
        where: {disciplineId, teacherId,},
    });
    return result;
}

export async function create (disciplineId: number, teacherId: number) : Promise<DisciplineOnTeacher> {
    const result = await prisma.disciplineOnTeacher.create({
        data: {disciplineId, teacherId},
    });
    return result;
}