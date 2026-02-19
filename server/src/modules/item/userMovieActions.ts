import type { RequestHandler } from "express";
import userMovieRepository from "./userMovieRepository";

const addFavorite: RequestHandler = async (req, res, next) => {
  try {
    // Pour l'instant, on récupère l'id depuis le corps de la requête
    // Plus tard, on le prendra de req.user (quand l'auth sera là)
    const { userId, movieId } = req.body;

    if (!userId || !movieId) {
      res.status(400).json({ message: "ID utilisateur ou film manquant" });
      return;
    }

    await userMovieRepository.create(userId, movieId);
    res.status(201).json({ message: "Favori ajouté avec succès en base !" });
  } catch (err) {
    next(err);
  }
};

const getFavorites: RequestHandler = async (req, res, next) => {
  try {
    const userId = Number(req.params.userId);
    const favorites = await userMovieRepository.findByUserId(userId);
    res.json(favorites);
  } catch (err) {
    next(err);
  }
};

export default { addFavorite, getFavorites };