const app = require('./../../app.js');
const request = require('supertest');

// users
describe('users', () => {
    it('return status code of 201 if email is passed', async () => {
        const res = await request(app).post('/users').send({email: 'test@example.com'});
        expect(res.statusCode).toEqual(201);
    }); 

    it('return bad request status code of 422 if email is missing', async () => {
        const res = await request(app).post('/users').send({});
        expect(res.statusCode).toEqual(422);
    }); 

    it('return status status code of 200 if user is found', async () => {
        const res = await request(app).get('/users/1').send({});
        expect(res.statusCode).toEqual(200);
    }); 

    it('return status status code of 400 if user is not found', async () => {
        const res = await request(app).get('/users/1000').send({});
        expect(res.statusCode).toEqual(400);
    });
});

// event test
describe('events ', () => {
    it('return status code of 201 if events is passed', async () => {
        const res = await request(app).post('/events/1').send({consent: 'email_notifications', enabled: true});
        expect(res.statusCode).toEqual(201);
    }); 

    it('return status code of 422 if post data is not passed', async () => {
        const res = await request(app).post('/events/1').send({});
        expect(res.statusCode).toEqual(422);
    }); 

    it('return status code of 400 if post data is not valid', async () => {
        const res = await request(app).post('/events/1').send({consent: 'name', enabled: true});
        expect(res.statusCode).toEqual(400);
    }); 

    it('return status status code of 400 if user is not found!', async () => {
        const res = await request(app).get('/users/100').send({consent: 'email_notifications', enabled: true});
        expect(res.statusCode).toEqual(400);
    });
});