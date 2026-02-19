import type { Request, Response } from "express";
import movieRepository from "./movieRepository";

export const addMovieToLibrary = async (req: Request, res: Response) => {
  try {
    const { tmdbId, title, posterPath, releaseDate } = req.body;

    if (!tmdbId || !title) {
      res.status(400).json({ error: "Données manquantes" });
      return;
    }

    const newMovieId = await movieRepository.create({
      Title: title,
      ReleaseYear: releaseDate?.slice(0, 4) || null,
      Synopsis: "",
      PosterURL: posterPath,
      Rating: 0,
      director_id: null,
    });

    res.status(201).json({ id: newMovieId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur serveur" });
  }
};
