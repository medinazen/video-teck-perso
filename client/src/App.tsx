import { useState, useEffect } from 'react';
import './App.css';
import MovieTicker from "./components/MovieTicker";

function App() {
  const [movies, setMovies] = useState<any[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<any>(null);
  const [showDetails, setShowDetails] = useState(false);
  const [view, setView] = useState('home'); 
  const [searchTerm, setSearchTerm] = useState('');

  // LOGIQUE DE CHARGEMENT ET RECHERCHE
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        let url = "http://localhost:5000/api/getPopularMovies";
        
        // Si on a un terme de recherche, on change d'URL
        if (searchTerm.trim() !== '') {
          url = `http://localhost:5000/api/movies/search?q=${encodeURIComponent(searchTerm)}`;
        }

        const res = await fetch(url);
        const data = await res.json();
        setMovies(data);
      } catch (err) {
        console.error("Erreur de récupération:", err);
      }
    };

    // On ajoute un petit délai (debounce) pour la recherche
    const delayDebounce = setTimeout(() => {
      fetchMovies();
    }, searchTerm ? 500 : 0); // 500ms si on tape, instantané si c'est le premier chargement

    return () => clearTimeout(delayDebounce);
  }, [searchTerm]);

  const currentMovie = selectedMovie || movies[0];

  const handleNavigate = (newView: string) => {
    setView(newView);
    setShowDetails(false);
  };

  return (
    <div id="root">
      <header className="flex flex-col items-center z-10">
        <h1 className="neon-title" onClick={() => handleNavigate('home')} style={{cursor:'pointer'}}>
          VIDÉOTHÈQUE CINÉMA
        </h1>
        <nav className="flex gap-10 mt-4">
          <button className="nav-btn nav-accueil" onClick={() => handleNavigate('home')}>ACCUEIL</button>
          <button className="nav-btn nav-connexion" onClick={() => handleNavigate('login')}>CONNEXION</button>
          <button className="nav-btn nav-inscription" onClick={() => handleNavigate('register')}>INSCRIPTION</button>
        </nav>
        
        <input 
          type="text" 
          placeholder="RECHERCHER UN FILM..." 
          className="search-input" 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </header>

      <main>
        {view === 'home' && currentMovie && (
          !showDetails ? (
            <div className="featured-card">
              <img src={`https://image.tmdb.org/t/p/w500${currentMovie.poster_path}`} alt="" />
              <div className="featured-content">
                <p className="featured-label" style={{color: '#00f2ff'}}>À L'AFFICHE</p>
                <h2 className="featured-title">{currentMovie.title}</h2>
                <p className="featured-desc">{currentMovie.overview?.substring(0, 120)}...</p>
                <button className="btn-details" onClick={() => setShowDetails(true)}>VOIR DÉTAILS</button>
              </div>
            </div>
          ) : (
            <div className="details-overlay">
              <div className="close-btn" onClick={() => setShowDetails(false)}>[ X FERMER ]</div>
              <img src={`https://image.tmdb.org/t/p/w500${currentMovie.poster_path}`} alt="" />
              <div className="featured-content">
                <h2 className="featured-title" style={{fontSize: '24px'}}>{currentMovie.title}</h2>
                <div className="mb-4">
                  <span className="info-cyan">NOTE: {currentMovie.vote_average}/10</span>
                  <span className="info-cyan">DATE: {currentMovie.release_date?.substring(0,4)}</span>
                </div>
                <p className="featured-desc" style={{fontSize: '20px', lineHeight: '1.6'}}>
                  {currentMovie.overview}
                </p>
              </div>
            </div>
          )
        )}

        {/* PAGES CONNEXION / INSCRIPTION */}
        {view === 'login' && (
          <div className="auth-card auth-login">
            <h2 className="auth-title">CONNEXION</h2>
            <form className="auth-form" onSubmit={(e) => e.preventDefault()}>
              <input type="email" placeholder="EMAIL" className="auth-input" />
              <input type="password" placeholder="MOT DE PASSE" className="auth-input" />
              <button type="submit" className="auth-submit">VALIDER</button>
            </form>
          </div>
        )}

        {view === 'register' && (
          <div className="auth-card auth-register">
            <h2 className="auth-title">INSCRIPTION</h2>
            <form className="auth-form" onSubmit={(e) => e.preventDefault()}>
              <input type="text" placeholder="PRÉNOM" className="auth-input" />
              <input type="text" placeholder="NOM" className="auth-input" />
              <input type="email" placeholder="EMAIL VALIDE" className="auth-input" />
              <input type="password" placeholder="MOT DE PASSE" className="auth-input" />
              <button type="submit" className="auth-submit">ENREGISTRER PROFIL</button>
            </form>
          </div>
        )}
      </main>

      <div className="bottom-area">
        {view === 'home' && (
          <div className="ticker-container">
            {movies.length > 0 ? (
              <MovieTicker 
                movies={movies} 
                onSelectMovie={(movie: any) => {
                  setSelectedMovie(movie);
                  setShowDetails(false);
                }} 
              />
            ) : (
              <div className="w-full text-center text-cyan-400 italic text-sm animate-pulse">
                {searchTerm ? `AUCUN RÉSULTAT POUR "${searchTerm.toUpperCase()}"` : "CHARGEMENT..."}
              </div>
            )}
          </div>
        )}
        
        <footer>
          <div className="footer-links">
            <a href="#">CONDITIONS GÉNÉRALES</a>
            <a href="#">MENTIONS LÉGALES</a>
          </div>
          <p className="footer-copyright">© 2026 CYBER_VOD</p>
        </footer>
      </div>
    </div>
  );
}

export default App;