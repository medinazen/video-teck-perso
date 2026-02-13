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

    const safeQuery = query as string;

    console.log("QUERY =>", safeQuery);

    const movies = await searchMovies(safeQuery);

    console.log("Movies trouvés:", movies.length);

    res.json(movies);
  } catch (err) {
    console.error("Erreur search TMDB:", err);
    res.status(500).json({ error: "Erreur serveur" });
  }
};
