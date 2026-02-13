import type { Request, Response } from "express";
import { searchMovies } from "./fetchMovie";

export const searchMoviesController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const queryParam = req.query.q;

    const query =
      typeof queryParam === "string"
        ? queryParam
        : Array.isArray(queryParam)
          ? queryParam[0]
          : undefined;

    if (!query) {
      res.status(400).json({ error: "Query manquante" });
      return;
    }
    if (!query) {
      res.status(400).json({ error: "Query manquante" });
      return;
    }
    const safeQuery = query as string;

    const movies = await searchMovies(safeQuery);
    res.json(movies);
  } catch (err) {
    console.error("Erreur search TMDB:", err);
    res.status(500).json({ error: "Erreur serveur" });
  }
  console.log("QUERY =>", req.query);
  console.log("TMDB URL =>", URL.toString());
  const response = await fetch(URL.toString());
  console.log("STATUS =>", response.status);
};
