import type { Request, Response } from "express";
import movieRepository from "./movieRepository";

export const getLibrary = async (_req: Request, res: Response) => {
  try {
    const movies = await movieRepository.readAll();
    res.json(movies);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur serveur" });
  }
};
