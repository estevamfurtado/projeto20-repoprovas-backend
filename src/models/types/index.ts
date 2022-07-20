import { Prisma, User, Test, Category, Teacher, Discipline, CategoryOnDisciplineOnTeacher } from '@prisma/client';

type UserCreateInput = Prisma.UserCreateInput;


type GetUser = {
    id: number;
    email: string;
}

type CategoryOnDisciplineOnTeacherCreateInput = {
    categoryId: number;
    disciplineId: number;
    teacherId: number;
}

type TestCreateInput = {
    name: string;
    pdfUrl: string;
    categoryId: number;
    teacherId: number;
    disciplineId: number;
};

export {
    User, UserCreateInput, GetUser, 
    Test, TestCreateInput,
    Category, 
    Teacher,
    Discipline,
    CategoryOnDisciplineOnTeacher,
    CategoryOnDisciplineOnTeacherCreateInput
};