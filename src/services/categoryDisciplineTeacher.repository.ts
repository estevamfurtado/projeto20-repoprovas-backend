import * as disciplineService from './disciplines.services';
import * as teacherService from './teachers.services';
import * as categoryService from './categories.services';
import * as repos from '../repositories';
import { chalkLogger } from "../utils/chalkLogger";


export async function validateIdsOrCrash (categoryId: number, disciplineId: number, teacherId: number) : Promise<void> {
    chalkLogger.log('service', 'Validating categ-disci-teach ids...');
    await disciplineService.validateIdExistsOrCrash(disciplineId);
    await teacherService.validateIdExistsOrCrash(teacherId);
    await categoryService.validateIdExistsOrCrash(categoryId);
}


export async function findOrCreate (categoryId: number, disciplineId: number, teacherId: number) : Promise<void> {
    chalkLogger.log('service', 'Making sure categ-disci-teach exists');

    const categoryOnDiscipline = await repos.categoryOnDiscipline.findByIds(categoryId, disciplineId);
    if (!categoryOnDiscipline) {await repos.categoryOnDiscipline.create(categoryId, disciplineId);}

    const categoryOnTeacher = await repos.categoryOnTeacher.findByIds(categoryId, teacherId);
    if (!categoryOnTeacher) {await repos.categoryOnTeacher.create(categoryId, teacherId);}

    const disciplineOnTeacher = await repos.disciplineOnTeacher.findByIds(disciplineId, teacherId);
    if (!disciplineOnTeacher) {await repos.disciplineOnTeacher.create(disciplineId, teacherId);}
}