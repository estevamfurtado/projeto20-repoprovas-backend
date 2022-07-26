import app from '../src/app.js';
import supertest from 'supertest';
import prisma from '../src/prisma';
import * as factory from './factories';



beforeEach(async () => {
    await prisma.$executeRaw`TRUNCATE TABLE "Test";`;
});

describe('Create new test', () => {

    const valid = factory.test.validInput();
    const invalid = factory.test.invalidInput();

    // 401 -> no token
    it ('should return a status 401 when no token is provided', async () => {
        const response = await supertest(app)
            .post('/tests')
            .send(valid)
        expect(response.status).toBe(401);
    })

    // 403 -> wrong token
    it ('should return a status 403 when wrong token is provided', async () => {
        const token = await factory.user.createUserAndToken();
        const response = await supertest(app)
            .post('/tests')
            .set('Authorization', `Bearer wrong${token}`);
    })

    // 400 -> data in the wrong format
    it ('should return a status 400 when invalid data is provided', async () => {
        const token = await factory.user.createUserAndToken();
        const response = await supertest(app)
            .post('/tests')
            .set('Authorization', `Bearer ${token}`)
            .send(invalid);
        expect(response.status).toBe(400);
    })

    // 400 -> invalid categoryId or teacherId or disciplineId
    it ('should return a status 400 when invalid data is provided', async () => {
        const token = await factory.user.createUserAndToken();
        const {name, pdfUrl} = invalid;
        const response = await supertest(app)
            .post('/tests')
            .set('Authorization', `Bearer ${token}`)
            .send({...valid, name, pdfUrl});
        expect(response.status).toBe(400);
    })

    // 400 -> invalid categoryId or teacherId or disciplineId
    it ('should return a status 404 when invalid ids are provided', async () => {
        const token = await factory.user.createUserAndToken();
        const {categoryId, teacherId, disciplineId} = invalid;
        
        const response1 = await supertest(app)
            .post('/tests')
            .set('Authorization', `Bearer ${token}`)
            .send({...valid, categoryId});
        expect(response1.status).toBe(404);

        const response2 = await supertest(app)
            .post('/tests')
            .set('Authorization', `Bearer ${token}`)
            .send({...valid, teacherId});
        expect(response2.status).toBe(404);

        const response3 = await supertest(app)
            .post('/tests')
            .set('Authorization', `Bearer ${token}`)
            .send({...valid, disciplineId});
        expect(response3.status).toBe(404);
    })

    // 201 -> created
    it ('should return a status 201 when test is created', async () => {
        const token = await factory.user.createUserAndToken();
        const response = await supertest(app)
            .post('/tests')
            .set('Authorization', `Bearer ${token}`)
            .send(valid);
        expect(response.status).toBe(201);
    })
})

describe('Get tests formatted by terms/disciplines', () => {
    // 401 -> no token
    it ('should return a status 401 when no token is provided', async () => {
        const response = await supertest(app)
            .get('/tests/by-disciplines')
        expect(response.status).toBe(401);
    });
    // 403 -> wrong token
    it ('should return a status 403 when wrong token is provided', async () => {
        const token = await factory.user.createUserAndToken();
        const response = await supertest(app)
            .get('/tests/by-disciplines')
            .set('Authorization', `Bearer wrong${token}`);
    });
    // 200 -> ok
    it ('should return a status 200 when ok', async () => {
        const token = await factory.user.createUserAndToken();
        const response = await supertest(app)
            .get('/tests/by-disciplines')
            .set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(200);
    })
})

describe('Get tests formatted by teachers', () => {
    // 401 -> no token
    it ('should return a status 401 when no token is provided', async () => {
        const response = await supertest(app)
            .get('/tests/by-teachers')
        expect(response.status).toBe(401);
    });
    // 403 -> wrong token
    it ('should return a status 403 when wrong token is provided', async () => {
        const token = await factory.user.createUserAndToken();
        const response = await supertest(app)
            .get('/tests/by-teachers')
            .set('Authorization', `Bearer wrong${token}`);
    });
    // 200 -> ok
    it ('should return a status 200 when ok', async () => {
        const token = await factory.user.createUserAndToken();
        const response = await supertest(app)
            .get('/tests/by-teachers')
            .set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(200);
    })
})

describe('Get options for create new test', () => {
    // 401 -> no token
    it ('should return a status 401 when no token is provided', async () => {
        const response = await supertest(app)
            .get('/tests/create/options')
        expect(response.status).toBe(401);
    });
    // 403 -> wrong token
    it ('should return a status 403 when wrong token is provided', async () => {
        const token = await factory.user.createUserAndToken();
        const response = await supertest(app)
            .get('/tests/create/options')
            .set('Authorization', `Bearer wrong${token}`);
    });
    // 200 -> ok
    it ('should return a status 200 when ok', async () => {
        const token = await factory.user.createUserAndToken();
        const response = await supertest(app)
            .get('/tests/create/options')
            .set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(200);
    })
})

afterAll(async () => {
    await prisma.$disconnect();
});