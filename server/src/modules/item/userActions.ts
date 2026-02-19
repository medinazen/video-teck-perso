import type { RequestHandler } from "express";
import userRepository from "./userRepository";

// INSCRIPTION (Le "Add" de l'utilisateur)
const add: RequestHandler = async (req, res, next) => {
  try {
    const { firstname, lastname, email, password } = req.body;

    // On vérifie que les champs sont là
    if (!email || !password) {
      res.status(400).json({ message: "Email et mot de passe requis" });
      return;
    }

    const insertId = await userRepository.create({ firstname, lastname, email, password });
    res.status(201).json({ insertId, message: "Utilisateur créé !" });
  } catch (err) {
    next(err);
  }
};

// CONNEXION (Vérification des identifiants)
const login: RequestHandler = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await userRepository.findByEmail(email);

    if (user && user.Password === password) {
      // Si ok, on renvoie les infos de l'utilisateur (sans le MDP pour la sécurité)
      res.status(200).json({
        id: user.id,
        firstname: user.Firstname,
        lastname: user.Lastname,
        email: user.Email
      });
    } else {
      res.status(401).json({ message: "Email ou mot de passe incorrect" });
    }
  } catch (err) {
    next(err);
  }
};

export default { add, login };