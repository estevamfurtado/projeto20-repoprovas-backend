import prisma from "../prisma/index.js"
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

export async function getAll () : Promise<Discipline[]> {
    const result = await prisma.discipline.findMany();
    return result;
}

type DisciplineWithTeachers = {
    id: number;
    name: string;
    teachers: {
        teacher: {
            id: number;
            name: string;
        }
    }[];
}

export async function getAllWithTeachers () : Promise<DisciplineWithTeachers[]> {
    const result = await prisma.discipline.findMany({
        include: {
            teachers: {
                select: {
                    teacher: {
                        select: {id: true, name: true,}
                    }
                }
            },
        },
    });
    return result;
}