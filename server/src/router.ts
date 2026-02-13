import express from "express";
import movieActions from "./modules/item/movieActions";

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

router.get("/api/getPopularMovies", popularMovies);

router.get("/api/movies/search", searchMoviesController);

/* ************************************************************************* */

// Define item-related routes
//import itemActions from "./modules/item/itemActions";

router.get("/api/movies", movieActions.browse);
router.get("/api/movies/:id", movieActions.read);
router.post("/api/movies", movieActions.add);

/* ************************************************************************* */

export default router;
