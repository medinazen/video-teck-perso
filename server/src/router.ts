import express from "express";
import movieActions from "./modules/item/movieActions";

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
import { popularMovies } from "./modules/item/popular";

router.get("/api/getPopularMovies", popularMovies);
/* ************************************************************************* */

// Define item-related routes
//import itemActions from "./modules/item/itemActions";

router.get("/api/movies", movieActions.browse);
router.get("/api/movies/:id", movieActions.read);
router.post("/api/movies", movieActions.add);

/* ************************************************************************* */

export default router;
