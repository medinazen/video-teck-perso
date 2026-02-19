import express from "express";
import cors from "cors";
import fs from "node:fs";
import path from "node:path";
import router from "./router"; // Import du routeur
import type { ErrorRequestHandler } from "express";
import mysql from 'mysql2';

// Connexion MySQL
// Change ta ligne de création par :
export const db = mysql.createConnection({ 
  host: 'localhost',
  user: 'root',
  password: '', 
  database: 'videotheque' 
});

db.connect((err) => {
  if (err) console.error('Erreur MySQL:', err.message);
  else console.log('Base de données MySQL connectée !');
});

const app = express();

/* --- 1. CONFIGURATION CORS --- */
// On autorise le port 3000 (React)
app.use(cors({
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200
}));

/* --- 2. PARSING DES REQUÊTES --- */
// Indispensable pour lire le JSON envoyé par le client (ex: login, favoris)
app.use(express.json());

/* --- 3. ROUTES API --- */
// On monte le routeur sur le préfixe /api
app.use("/api", router);

/* --- 4. GESTION DES FICHIERS STATIQUES & PRODUCTION --- */
const publicFolderPath = path.join(__dirname, "../../server/public");
if (fs.existsSync(publicFolderPath)) {
  app.use(express.static(publicFolderPath));
}

const clientBuildPath = path.join(__dirname, "../../client/dist");

if (fs.existsSync(clientBuildPath)) {
  app.use(express.static(clientBuildPath));

  // Gestion du routage Single Page Application (React)
  // On place cette route APRES le /api pour ne pas intercepter les requêtes API
  app.get("*", (req, res) => {
    if (req.path.startsWith("/api")) {
      res.status(404).json({ message: "API route not found" });
    } else {
      res.sendFile("index.html", { root: clientBuildPath });
    }
  });
}

/* --- 5. MIDDLEWARE D'ERREUR (TOUJOURS EN DERNIER) --- */
const logErrors: ErrorRequestHandler = (err, req, res, next) => {
  console.error("ERREUR SUR :", req.method, req.path);
  console.error(err);
  res.status(500).json({ error: "Internal Server Error" });
};

app.use(logErrors);

export default app;