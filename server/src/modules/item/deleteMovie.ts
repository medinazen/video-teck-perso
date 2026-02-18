import type { Request, Response } from "express";
import movieRepository from "./movieRepository";

export const deleteMovie = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    if (!id) {
      res.status(400).json({ error: "ID invalide" });
      return;
    }

    await movieRepository.deleteMovie(id);
    res.sendStatus(204);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur serveur" });
  }
};

