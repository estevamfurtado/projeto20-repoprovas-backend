import prisma from "../prisma";
import { AppError } from '../utils/errors/AppError';
import { chalkLogger } from '../utils/chalkLogger';
import * as categoryDisciplineTeacherService from './categoryDisciplineTeacher.repository';
import * as repos from '../repositories/';

import { TestCreateInput, Test } from '../models/types';



export async function save (data: TestCreateInput): Promise<Test> {
    const {disciplineId, teacherId, categoryId} = data;
    await categoryDisciplineTeacherService.validateIdsOrCrash(categoryId, disciplineId, teacherId);
    await categoryDisciplineTeacherService.findOrCreate(categoryId, disciplineId, teacherId);
    const test = await repos.test.create(data);
    return test;
}

export async function getByTerms () {
    const data = await repos.test.getByTerms();
    return data;
}

export async function getByTeachers () {
    const data = await repos.test.getByTeacher();
    return data;
}
