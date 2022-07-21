import { faker } from "@faker-js/faker";
import prisma from "../../src/prisma/index.js";
import { crypt } from "../../src/utils/crypt/index.js";

function validInput(passwordLength: number = 8) {
    return {
        email: faker.internet.email(),
        password: faker.internet.password(passwordLength),
    };
}

async function createUser(user: { email: string; password: string }) {
    const { email, password } = user;
    const encryptedPassword = crypt.bcrypt.encrypt(password);
    const userCreated = await prisma.user.create({
        data: {
            email,
            password: encryptedPassword
        },
    });
    return userCreated;
}

async function createUserAndToken(input: { email: string; password: string } = validInput()) {
    const user = await createUser(input);
    const {id, email} = user;
    const token = crypt.jwt.create({id, email});
    return token;
}

export { validInput, createUser, createUserAndToken };