import app from '../src/app.js';
import supertest from 'supertest';
import prisma from '../src/prisma';
import * as factory from './factories';



beforeEach(async () => {
    await prisma.$executeRaw`TRUNCATE TABLE "User";`;
});

describe('Sign Up', () => {

    const newUserData1 = factory.user.validInput();
    const newUserData2 = factory.user.validInput(4);

    it('should return a token and status 201 when user is created', async () => {
        const response = await supertest(app)
            .post('/sign-up')
            .send({...newUserData1, confirmPassword: newUserData1.password});
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('token');
    })

    it('should return a status 400 when email already exists', async () => {
        await factory.user.createUser(newUserData1);
        const response = await supertest(app)
            .post('/sign-up')
            .send({...newUserData1, confirmPassword: newUserData1.password});
        expect(response.status).toBe(400);
    })

    it('should return a status 400 when password is too short', async () => {
        const response = await supertest(app)
            .post('/sign-up')
            .send({...newUserData2, confirmPassword: newUserData2.password});
        expect(response.status).toBe(400);
    })

    it('should return a status 400 when password and confirmPassword are not equal', async () => {
        const response = await supertest(app)
            .post('/sign-up')
            .send({...newUserData1, confirmPassword: newUserData2.password});
        expect(response.status).toBe(400);
    });
})

describe('Sign In', () => {

    const validUserData = factory.user.validInput();
    const invalidUserData = factory.user.validInput();
    const rightLogin = validUserData;
    const wrongPassword = { ...validUserData, password: invalidUserData.password };
    const wrongLogin = invalidUserData;

    it('should return 200 when user has signed in', async () => {
        const user = await factory.user.createUser(validUserData);
        const response = await supertest(app).post('/sign-in').send(rightLogin);
        expect(response.status).toBe(200);
    })
    it('should return a token', async () => {
        const user = await factory.user.createUser(validUserData);
        const response = await supertest(app).post('/sign-in').send(rightLogin);
        expect(response.body.token).toBeDefined();
    });
    it('should return a 401 if the user does not exist', async () => {
        const user = await factory.user.createUser(validUserData);
        const response = await supertest(app).post('/sign-in').send(wrongLogin);
        expect(response.status).toBe(401);
    })
    it('should return a 401 if the password is wrong', async () => {
        const user = await factory.user.createUser(validUserData);
        const response = await supertest(app).post('/sign-in').send(wrongPassword);
        expect(response.status).toBe(401);
    })
})

afterAll(async () => {
    await prisma.$disconnect();
});