import type { Request, Response } from "express";
import { getPopularMovies } from "./fetchMovie";

export const popularMovies = async (req: Request, res: Response) => {
  try {
    const movies = await getPopularMovies();

    console.log("movi récupérés :", movies.length);
    res.json(movies);
  } catch (err) {
    console.error("Erreur TMDB :", err);
    res.status(500).json({ error: "Erreur TMDB" });
  }
};
