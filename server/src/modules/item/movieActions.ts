import type { RequestHandler } from "express";

// Import access to data
import movieRepository from "./movieRepository";

// The B of BREAD - Browse (Read All) operation
const browse: RequestHandler = async (req, res, next) => {
  try {
    // Fetch all items
    const movies = await movieRepository.readAll();

    // Respond with the items in JSON format
    res.json(movies);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The R of BREAD - Read operation
const read: RequestHandler = async (req, res, next) => {
  try {
    
    // Fetch a specific item based on the provided ID
    const movie = await movieRepository.read(Number(req.params.id));

    // If the item is not found, respond with HTTP 404 (Not Found)
    
    // Otherwise, respond with the item in JSON format
    if (movie == null) {
      res.sendStatus(404);
    } else {
      res.json(movie);
    }
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The A of BREAD - Add (Create) operation
const add: RequestHandler = async (req, res, next) => {
  try {
    // Extract the item data from the request body
    const { Title, ReleaseYear, Synopsis, PosterURL, Rating, tmdb_id, director_id } =
      req.body;
// Validation simple pour faire plaisir aux tests (erreur 400 si Title manque)
    if (!Title || !tmdb_id) {
      res.status(400).json({ message: "Missing required fields" });
      return;
    }
    // Create the item
    const insertId = await movieRepository.create({Title, ReleaseYear, Synopsis, PosterURL, Rating, director_id });

    // Respond with HTTP 201 (Created) and the ID of the newly inserted item
    res.status(201).json({ insertId });
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};
const edit: RequestHandler = async (req, res, next) => {
  try {
    const movie = { ...req.body, id: Number(req.params.id) };
    // Validation simple pour le test (400 si body vide)
    if (Object.keys(req.body).length === 0) {
      res.sendStatus(400);
      return;
    }
    const affectedRows = await movieRepository.update(movie);
    if (affectedRows === 0) {
      res.sendStatus(404);
    } else {
      res.sendStatus(204);
    }
  } catch (err) {
    next(err);
  }
};

const destroy: RequestHandler = async (req, res, next) => {
  try {
    const affectedRows = await movieRepository.delete(Number(req.params.id));
    if (affectedRows === 0) {
      res.sendStatus(404);
    } else {
      res.sendStatus(204);
    }
  } catch (err) {
    next(err);
  }
};

export default { browse, read, add, edit, destroy }; // N'oublie pas d'ajouter edit et destroy ici

