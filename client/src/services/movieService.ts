const API_URL = "http://localhost:3310/api";

export const fetchPopularMovies = async () => {
  try {
    const response = await fetch(`${API_URL}/getPopularMovies`);
    if (!response.ok) throw new Error("Erreur");
    const data = await response.json();
    // On vérifie si les films sont dans 'results' (TMDB) ou si c'est déjà un tableau
    return data.results || data; 
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const fetchMyMovies = async () => {
  try {
    const response = await fetch(`${API_URL}/movies`);
    if (!response.ok) throw new Error("Erreur lors de la récupération de la base locale");
    return await response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
};
export const searchMovies = async (query: string) => {
  try {
    const response = await fetch(`${API_URL}/movies/search?q=${query}`);
    const data = await response.json();
    // Idem ici : on cible le tableau de films
    return data.results || data;
  } catch (error) {
    console.error("Erreur recherche:", error);
    return [];
  }
};