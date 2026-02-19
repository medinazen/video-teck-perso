export default function MovieTicker({ movies, onSelectMovie }: any) {
  const doubleMovies = [...movies, ...movies];

  return (
    <div className="w-full overflow-hidden">
      <div className="animate-infinite-scroll flex items-center">
        {doubleMovies.map((movie, index) => (
          <div 
            key={`${movie.id}-${index}`} 
            className="flex-none cursor-pointer px-2 transition-transform hover:scale-105"
            style={{ width: '200px' }} // Largeur augmentée
            onClick={() => onSelectMovie(movie)}
          >
            <img
              src={`https://image.tmdb.org/t/p/w342${movie.poster_path}`}
              alt={movie.title}
              className="w-full h-[270px] object-cover border border-white/20 rounded-sm shadow-lg shadow-black" 
            />
          </div>
        ))}
      </div>
    </div>
  );
}