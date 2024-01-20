const request = require('supertest');
const app = require('../app.js');
const Genre = require('../models/Genre.js');
require('../models')

let id;

test('GET /actors return all actors', async () => {
    const res = await request(app).get('/actors')
    expect(res.status).toBe(200)
    expect(res.body).toBeInstanceOf(Array)
}) 

test("POST /actors should add an actor", async () => {
    const newActor = {
        firstName: "Leonardo",
        lastName: "DiCaprio",
        nationality: "American",
        birthday: "1974/11/11",
        image: "http://actor.image.com"
    }
    const res = await request(app).post("/actors").send(newActor);
    id = res.body.id
		expect(res.status).toBe(201);
        expect(res.body.firstName).toBe(newActor.firstName);
        expect(res.body.id).toBeDefined()
})

test("PUT /actors/:id should update an actor", async () => {
    const updatedActor = {
        firstName: "Robert",
        lastName: "De",
        nationality: "American",
        birthday: "1974/11/11",
        image: "http://actor.image.com"
}
    const res = await request(app)
            .put(`/actors/${id}`)
            .send(updatedActor);
    expect(res.status).toBe(200);
    expect(res.body.firstName).toBe(updatedActor.firstName);
})

test("PUT /actors/:id/genres should update an actor[s genre", async () => {
    const genre = await Genre.create( {
        name: "Horror"
})
    const res = await request(app)
            .post(`/actors/${id}/genres`)
            .send([ genre.id ]);
    await genre.destroy()
    expect(res.status).toBe(200);
    expect(res.body.length).toBe(1);
})


test("DELETE /actors/:id should delete an actor", async () => {
    const res = await request(app).delete(`/actors/${id}`);
    expect(res.status).toBe(204);
});