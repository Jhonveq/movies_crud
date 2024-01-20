const request = require('supertest');
const app = require('../app.js');
const Genre = require('../models/Genre.js');
const Actor = require('../models/Actor.js');
const Director = require('../models/Director.js');
require('../models')

let id;

test('GET /movies return all movies', async () => {
    const res = await request(app).get('/movies')
    expect(res.status).toBe(200)
    expect(res.body).toBeInstanceOf(Array)
}) 

test("POST /movies should add a movie", async () => {
    const newMovie = {
        name: "Deadpool",
        image: "http://movieimage.com",
        synopsis: "lorum ",
        releaseYear: 2001
    }
    const res = await request(app).post("/movies").send(newMovie);
    id = res.body.id
		expect(res.status).toBe(201);
        expect(res.body.name).toBe(newMovie.name);
        expect(res.body.id).toBeDefined()
})

test("PUT /movies/:id should update a movie", async () => {
    const updatedMovie = {
        releaseYear: 2013
    }
    const res = await request(app)
            .put(`/movies/${id}`)
            .send(updatedMovie);
    expect(res.status).toBe(200);
    expect(res.body.releaseYear).toBe(updatedMovie.releaseYear);
})

test("PUT /movies/:id/genres should update a movie genre", async () => {
    const genre = await Genre.create( {
        name: "Horror"
})
    const res = await request(app)
            .post(`/movies/${id}/genres`)
            .send([ genre.id ]);
    await genre.destroy()
    expect(res.status).toBe(200);
    expect(res.body.length).toBe(1);
})

test("PUT /movies/:id/actors should update a movie actor", async () => {
    const actor = await Actor.create( {
        firstName: "Leonardo",
        lastName: "DiCaprio",
        nationality: "American",
        birthday: "1974/11/11",
        image: "http://actor.image.com"
})
    const res = await request(app)
            .post(`/movies/${id}/actors`)
            .send([ actor.id ]);
    await actor.destroy()
    expect(res.status).toBe(200);
    expect(res.body.length).toBe(1);
})

test("PUT /movies/:id/directors should update a movie director", async () => {
    const director = await Director.create( {
        firstName: "Leonardo",
        lastName: "DiCaprio",
        nationality: "American",
        birthday: "1974/11/11",
        image: "http://director.movie.com"
})
    const res = await request(app)
            .post(`/movies/${id}/directors`)
            .send([ director.id ]);
    await director.destroy()
    expect(res.status).toBe(200);
    expect(res.body.length).toBe(1);
})


test("DELETE /movies/:id should delete a movie", async () => {
    const res = await request(app).delete(`/movies/${id}`);
    expect(res.status).toBe(204);
});