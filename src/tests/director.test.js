const request = require('supertest');
const app = require('../app.js');
require('../models')

let id;

test('GET /directors return all directors', async () => {
    const res = await request(app).get('/directors')
    expect(res.status).toBe(200)
    expect(res.body).toBeInstanceOf(Array)
}) 

test("POST /directors should add a director", async () => {
    const newDirector = {
        firstName: "Leonardo",
        lastName: "DiCaprio",
        nationality: "American",
        birthday: "1974/11/11",
        image: "http://director.movie.com"
    }
    const res = await request(app).post("/directors").send(newDirector);
    id = res.body.id
		expect(res.status).toBe(201);
        expect(res.body.firstName).toBe(newDirector.firstName);
        expect(res.body.id).toBeDefined()
})

test("PUT /directors/:id should update a director", async () => {
    const updatedDirector = {
        firstName: "Robert",
        lastName: "De",
        nationality: "American",
        birthday: "1974/11/11",
        image: "http://director.movie.com"
}
    const res = await request(app)
            .put(`/directors/${id}`)
            .send(updatedDirector);
    expect(res.status).toBe(200);
    expect(res.body.firstName).toBe(updatedDirector.firstName);
})


test("DELETE /directos/:id should delete a director", async () => {
    const res = await request(app).delete(`/directors/${id}`);
    expect(res.status).toBe(204);
});