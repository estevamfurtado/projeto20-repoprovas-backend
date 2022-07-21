import prisma from "../prisma/index.js";
import { AppError } from '../utils/errors/AppError.js';
import { chalkLogger } from '../utils/chalkLogger.js';
import * as categoryDisciplineTeacherService from './categoryDisciplineTeacher.repository.js';
import * as repos from '../repositories/index.js';

import { TestCreateInput, Test } from '../models/types/index.js';

type OptionsToCreate = {
    disciplines: {
        id: number; name: string;
        teachers: {id: number, name: string}[]
    }[];
    categories: {id: number; name: string;}[];
}

export async function getOptionsToCreate(): Promise<OptionsToCreate> {
    const categories = await repos.category.getAll();
    const disciplinesWithTeachers = await repos.discipline.getAllWithTeachers();
    const disciplines = disciplinesWithTeachers.map(({id, name, teachers}) => ({
        id, name, teachers: teachers.map(({teacher}) => teacher)
    }));
    return {categories, disciplines};
}

export async function save(data: TestCreateInput): Promise<Test> {
    const { disciplineId, teacherId, categoryId } = data;
    await categoryDisciplineTeacherService.validateIdsOrCrash(categoryId, disciplineId, teacherId);
    await categoryDisciplineTeacherService.findOrCreate(categoryId, disciplineId, teacherId);
    const test = await repos.test.create(data);
    return test;
}

export async function getByTerms() {
    const data = await repos.test.getByTerms();
    return data;
}

export async function getByTeachers() {
    const data = await repos.test.getByTeacher();
    return data;
}


