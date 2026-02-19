// Import the supertest library for making HTTP requests
import supertest from "supertest";

// Import the Express application
import app from "../../src/app";

// Import databaseClient
import databaseClient from "../../database/client";

import type { Result, Rows } from "../../database/client";

// Restore all mocked functions after each test
afterEach(() => {
  jest.restoreAllMocks();
});

/* ************************************************************************* */
// Test suite for the GET /api/movies route
/* ************************************************************************* */
describe("GET /api/movies", () => {
  it("should fetch movies successfully", async () => {
    // Mock empty rows returned from the database
    const rows = [] as Rows;

    // Mock the implementation of the database query method
    jest
      .spyOn(databaseClient, "query")
      .mockImplementation(async () => [rows, []]);

    // Send a GET request to the /api/movies endpoint
    const response = await supertest(app).get("/api/movies");

    // Assertions
    expect(response.status).toBe(200);
    expect(response.body).toStrictEqual(rows);
  });
});

/* ************************************************************************* */
// Test suite for the GET /api/movies/:id route
/* ************************************************************************* */
describe("GET /api/movies/:id", () => {
  it("should fetch a single movie successfully", async () => {
    // Mock rows returned from the database
    const rows = [{ 
      id: 1, 
      Title: "Inception", 
      ReleaseYear: 2010, 
      Synopsis: "A thief who steals corporate secrets...",
      PosterURL: "https://image.tmdb.org/t/p/w500/etc.jpg",
      Rating: 8.8,
      tmdb_id: 27205,
      director_id: 1
    }] as Rows;

    // Mock the implementation of the database query method
    jest
      .spyOn(databaseClient, "query")
      .mockImplementation(async () => [rows, []]);

    // Send a GET request to the /api/movies/:id endpoint
    const response = await supertest(app).get("/api/movies/1");

    // Assertions
    expect(response.status).toBe(200);
    expect(response.body).toStrictEqual(rows[0]);
  });

  it("should fail on invalid id", async () => {
    // Mock empty rows returned from the database (movie not found)
    const rows = [] as Rows;

    // Mock the implementation of the database query method
    jest
      .spyOn(databaseClient, "query")
      .mockImplementation(async () => [rows, []]);

    // Send a GET request to the /api/movies/:id endpoint with an ID that doesn't exist
    const response = await supertest(app).get("/api/movies/0");

    // Assertions
    expect(response.status).toBe(404);
    expect(response.body).toEqual({});
  });
});

/* ************************************************************************* */
// Test suite for the POST /api/movies route
/* ************************************************************************* */
describe("POST /api/movies", () => {
  it("should add a new movie successfully", async () => {
    // Mock result of the database query
    const result = { insertId: 1 } as Result;

    // Mock the implementation of the database query method
    jest
      .spyOn(databaseClient, "query")
      .mockImplementation(async () => [result, []]);

    // Fake movie data matching your database structure
    const fakeMovie = { 
      Title: "Interstellar", 
      ReleaseYear: 2014,
      Synopsis: "A team of explorers travel through a wormhole...",
      PosterURL: "https://image.tmdb.org/t/p/w500/interstellar.jpg",
      Rating: 8.6,
      tmdb_id: 157336,
      director_id: 1
    };

    // Send a POST request to the /api/movies endpoint
    const response = await supertest(app).post("/api/movies").send(fakeMovie);

    // Assertions
    expect(response.status).toBe(201);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body.insertId).toBe(result.insertId);
  });

  it("should fail on invalid request body", async () => {
    // Fake movie data with missing required fields (like Title or tmdb_id)
    const invalidMovie = { 
      ReleaseYear: 2010 
      // Title and tmdb_id are missing
    };

    // Send a POST request to the /api/movies endpoint
    const response = await supertest(app).post("/api/movies").send(invalidMovie);

    // Assertions
    // Note: This requires a validation check in your movieActions.ts
    expect(response.status).toBe(400);
    expect(response.body).toEqual({ message: "Missing required fields" });
  });
});

/* ************************************************************************* */
// Test suite for the PUT /api/movies/:id route
/* ************************************************************************* */
describe("PUT /api/movies/:id", () => {
  it("should update an existing movie successfully", async () => {
    // Mock result of the database query
    const result = { affectedRows: 1 } as Result;

    // Mock the implementation of the database query method
    jest
      .spyOn(databaseClient, "query")
      .mockImplementation(async () => [result, []]);

    // Movie data to update
    const updatedMovie = { 
      Title: "Inception Updated",
      Rating: 9.0
    };

    // Send a PUT request to the /api/movies/:id endpoint
    const response = await supertest(app).put("/api/movies/1").send(updatedMovie);

    // Assertions
    expect(response.status).toBe(204);
    expect(response.body).toEqual({});
  });

  it("should fail on invalid request body during update", async () => {
    const result = { affectedRows: 1 } as Result;

    jest
      .spyOn(databaseClient, "query")
      .mockImplementation(async () => [result, []]);

    // Empty body or invalid format
    const invalidData = {};

    const response = await supertest(app).put("/api/movies/1").send(invalidData);

    // Assertions
    expect(response.status).toBe(400);
    expect(response.body).toEqual({});
  });

  it("should fail on invalid id during update", async () => {
    // Mock result: 0 rows affected means ID was not found
    const result = { affectedRows: 0 } as Result;

    jest
      .spyOn(databaseClient, "query")
      .mockImplementation(async () => [result, []]);

    const someData = { Title: "Doesn't matter" };

    const response = await supertest(app).put("/api/movies/999").send(someData);

    // Assertions
    expect(response.status).toBe(404);
    expect(response.body).toEqual({});
  });
});

/* ************************************************************************* */
// Test suite for the DELETE /api/movies/:id route
/* ************************************************************************* */
describe("DELETE /api/movies/:id", () => {
  it("should delete an existing movie successfully", async () => {
    // Mock result of the database query
    const result = { affectedRows: 1 } as Result;

    // Mock the implementation of the database query method
    jest
      .spyOn(databaseClient, "query")
      .mockImplementation(async () => [result, []]);

    // Send a DELETE request to the /api/movies/:id endpoint
    const response = await supertest(app).delete("/api/movies/1");

    // Assertions
    expect(response.status).toBe(204);
    expect(response.body).toEqual({});
  });

  it("should fail on invalid id during deletion", async () => {
    // Mock result: 0 rows affected
    const result = { affectedRows: 0 } as Result;

    jest
      .spyOn(databaseClient, "query")
      .mockImplementation(async () => [result, []]);

    // Send a DELETE request with an unknown ID
    const response = await supertest(app).delete("/api/movies/999");

    // Assertions
    expect(response.status).toBe(404);
    expect(response.body).toEqual({});
  });
});