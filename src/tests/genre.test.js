const request = require('supertest');
const app = require('../app.js');
require('../models')

let id;

test('GET /genres return all genders', async () => {
    const res = await request(app).get('/genres')
    expect(res.status).toBe(200)
    expect(res.body).toBeInstanceOf(Array)
}) 

test("POST /genres should add a genre", async () => {
    const newGenre = {
        name: "Horror",
    }
    const res = await request(app).post("/genres").send(newGenre);
    id = res.body.id
		expect(res.status).toBe(201);
        expect(res.body.name).toBe(newGenre.name);
})

test("PUT /genres/:id should update a genre", async () => {
    const updatedGenre = {
    name: "Romantic",
}
    const res = await request(app)
            .put(`/genres/${id}`)
            .send(updatedGenre);
    expect(res.status).toBe(200);
    expect(res.body.name).toBe(updatedGenre.name);
})

test("DELETE /genres/:id should delete a genre", async () => {
    const res = await request(app).delete(`/genres/${id}`);
    expect(res.status).toBe(204);
});