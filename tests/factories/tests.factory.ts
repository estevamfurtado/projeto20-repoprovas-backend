import { faker } from "@faker-js/faker";
import prisma from "../../src/prisma/index.js";

function validInput(passwordLength: number = 8) {
    return {
        name: faker.lorem.sentence(),
        pdfUrl: faker.internet.url(),
        categoryId: 2,
        teacherId: 2,
        disciplineId: 4,
    };
}

function invalidInput(passwordLength: number = 8) {
    return {
        name: faker.random.numeric(),
        pdfUrl: faker.lorem.sentence(),
        categoryId: 50000,
        teacherId: 50000,
        disciplineId: 50000,
    };
}

export { validInput, invalidInput };