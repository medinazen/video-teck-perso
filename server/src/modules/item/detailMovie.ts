import type { Request, Response } from "express";
import { getMovieDetails } from "./fetchMovie";

export const movieDetailsController = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    if (!id) {
      res.status(400).json({ error: "ID manquant" });
      return;
    }

    const movie = await getMovieDetails(id);
    res.json(movie);
  } catch (err) {
    console.error("Erreur TMDB details:", err);
    res.status(500).json({ error: "Erreur serveur" });
  }
};
