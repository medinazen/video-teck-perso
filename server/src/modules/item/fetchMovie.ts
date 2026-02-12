const BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = "f24140cd1f7535b914b1c998148be1cc"


export const tmdbFetch = async (
  endpoint: string,
  params: Record<string, string> = {}
) => {
  const url = new URL(BASE_URL + endpoint);


  url.searchParams.set("api_key", API_KEY);
  url.searchParams.set("language", "fr-FR");

 

  const response = await fetch(url.toString());

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`TMDB error ${response.status} : ${text}`);
  }

  return response.json();
};

export const getPopularMovies = async () => {
  const data = await tmdbFetch("/movie/popular");
  return data.results;
};

