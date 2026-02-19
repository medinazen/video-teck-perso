import express from "express";
import userMovieActions from "./modules/item/userMovieActions";
import movieActions from "./modules/item/movieActions";
import userActions from "./modules/item/userActions";
const router = express.Router();

import { movieDetailsController } from "./modules/item/detailMovie";
import { getLibrary } from "./modules/item/getLibrairie";
import { addMovieToLibrary } from "./modules/item/library";
/* ************************************************************************* */
// Define Your API Routes Here
import { popularMovies } from "./modules/item/popular";
import { searchMoviesController } from "./modules/item/search";

router.get("/api/library", getLibrary);

router.post("/api/library", addMovieToLibrary);

router.get("/api/movies/:id/tmdb", movieDetailsController);

// Enlève le "/api" car on va le mettre dans app.ts
router.get("/getPopularMovies", popularMovies);
router.get("/movies/search", searchMoviesController);
// --- ROUTES FAVORIS ---
router.post("/favorites", userMovieActions.addFavorite);
router.get("/users/:userId/favorites", userMovieActions.getFavorites);
/* ************************************************************************* */
// --- ROUTES UTILISATEURS ---
router.post("/register", userActions.add);
router.post("/login", userActions.login);
// Define item-related routes
//import itemActions from "./modules/item/itemActions";

router.get("/api/movies", movieActions.browse);
router.get("/api/movies/:id", movieActions.read);
router.post("/api/movies", movieActions.add);
router.put("/api/movies/:id", movieActions.edit);    // Nouvelle ligne
router.delete("/api/movies/:id", movieActions.destroy); // Nouvelle ligne

/* ************************************************************************* */

export default router;
