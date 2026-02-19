const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
// On importe getPopularMovies ET searchMovies (à ajouter dans ton module)
const { getPopularMovies, searchMovies } = require('./src/modules/item/fetchMovie'); 

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '', 
  database: 'videotheque' 
});

db.connect((err) => {
  if (err) {
    console.error('Erreur MySQL:', err.message);
    return;
  }
  console.log('Connecté à la base de données MySQL "videotheque" !');
});

// --- ROUTE : FILMS POPULAIRES ---
app.get('/api/getPopularMovies', async (req, res) => {
  try {
    const movies = await getPopularMovies();
    res.json(movies);
  } catch (err) {
    console.error("Erreur TMDB:", err);
    res.status(500).json({ error: "Impossible de récupérer les films" });
  }
});

// --- ROUTE : RECHERCHE MONDIALE (C'est ici que la magie opère) ---
app.get('/api/movies/search', async (req, res) => {
  const query = req.query.q;
  if (!query) return res.json([]);

  try {
    // On appelle la fonction de recherche que l'on va créer dans fetchMovie.js
    const movies = await searchMovies(query);
    res.json(movies);
  } catch (err) {
    console.error("Erreur Recherche TMDB:", err);
    res.status(500).json({ error: "Erreur lors de la recherche" });
  }
});

// --- AUTHENTIFICATION ---
app.post('/api/register', (req, res) => {
  const { firstname, lastname, email, password } = req.body;
  const sql = "INSERT INTO User (Firstname, Lastname, Email, Password, favoris_json) VALUES (?, ?, ?, ?, '[]')";
  db.query(sql, [firstname, lastname, email, password], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Utilisateur créé !" });
  });
});

app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  const sql = "SELECT Firstname, Lastname, Email, favoris_json FROM User WHERE Email = ? AND Password = ?";
  
  db.query(sql, [email, password], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.length > 0) {
      const user = result[0];
      res.json({
        firstname: user.Firstname,
        lastname: user.Lastname,
        email: user.Email,
        favorites: user.favoris_json ? JSON.parse(user.favoris_json) : []
      });
    } else {
      res.status(401).json({ message: "Identifiants incorrects" });
    }
  });
});

app.listen(5000, () => console.log(`Serveur Fusionné sur http://localhost:5000`));