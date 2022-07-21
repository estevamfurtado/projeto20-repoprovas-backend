import prisma from "../prisma/index.js";
import {TestCreateInput, Test} from "../models/types/index.js";
import { chalkLogger } from "../utils/chalkLogger.js";

export async function create(data: TestCreateInput): Promise<Test> {
    chalkLogger.log('repository', 'Creating test')
    console.log(data);
    const {name, pdfUrl, disciplineId, teacherId, categoryId} = data;
    const test = await prisma.test.create({data: {
        name, pdfUrl, disciplineId, teacherId, categoryId,
    }});
    return test;
}

export async function getByTerms() {
    const terms = await prisma.term.findMany({
        select: {id: true, number: true,
            disciplines: { select: {id: true, name: true,
                categories: {select: {
                    category: {select: {id: true, name: true, 
                        tests: {select: {id: true, name: true, pdfUrl: true,
                            teacher: {select: {name: true}}
                        }}
                    }}
                }}
            }}
        }
    });
    
    return terms;
}

export async function getByTeacher() {
    const data = await prisma.teacher.findMany({
        select: {id: true, name: true,
            categories: { select: {
                category: {select: {id: true, name: true, 
                    tests: {select: {id: true, name: true, pdfUrl: true,
                        discipline: {select: {name: true}}
                    }}
                }}
            }}
        }
    });
    
    return data;
}

