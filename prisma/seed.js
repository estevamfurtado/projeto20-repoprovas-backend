"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
// seed data
const terms = [
    { number: 1 },
    { number: 2 },
    { number: 3 },
    { number: 4 },
    { number: 5 },
    { number: 6 },
];
const categories = [
    { name: 'Projeto' },
    { name: 'Prática' },
    { name: 'Recuperação' },
];
const teachers = [
    { name: 'Diego Pinho' },
    { name: 'Bruna Hamori' },
];
const disciplines = [
    { name: "HTML e CSS", termId: 1 },
    { name: "JavaScript", termId: 2 },
    { name: "React", termId: 3 },
    { name: "Humildade", termId: 4 },
    { name: "Planejamento", termId: 5 },
    { name: "Autoconfiança", termId: 6 },
];
const disciplinesOnTeachers = [
    { teacherId: 1, disciplineId: 1 },
    { teacherId: 1, disciplineId: 2 },
    { teacherId: 1, disciplineId: 3 },
    { teacherId: 2, disciplineId: 4 },
    { teacherId: 2, disciplineId: 5 },
    { teacherId: 2, disciplineId: 6 },
];
// main function
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        yield prisma.term.createMany({ data: terms });
        yield prisma.category.createMany({ data: categories });
        yield prisma.teacher.createMany({ data: teachers });
        yield prisma.discipline.createMany({ data: disciplines });
        yield prisma.disciplineOnTeacher.createMany({ data: disciplinesOnTeachers });
    });
}
main()
    .catch(console.error)
    .finally(() => __awaiter(void 0, void 0, void 0, function* () { return yield prisma.$disconnect(); }));
