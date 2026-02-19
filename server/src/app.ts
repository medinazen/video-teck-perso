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

// You should NOT do that: such code uses the `cors` module to allow all origins, which can pose security issues.
// For this pedagogical template, the CORS code allows CLIENT_URL in development mode (when process.env.CLIENT_URL is defined).


if (process.env.CLIENT_URL != null) {
  app.use(cors({ origin: [process.env.CLIENT_URL] }));
}

// If you need to allow extra origins, you can add something like this:

/*
app.use(
  cors({
    origin: ["http://mysite.com", "http://another-domain.com"],
  }),
);
*/

// With ["http://mysite.com", "http://another-domain.com"]
// to be replaced with an array of your trusted origins

/* ************************************************************************* */

// Request Parsing: Understanding the purpose of this part

// Request parsing is necessary to extract data sent by the client in an HTTP request.
// For example to access the body of a POST request.
// The current code contains different parsing options as comments to demonstrate different ways of extracting data.

// 1. `express.json()`: Parses requests with JSON data.
// 2. `express.urlencoded()`: Parses requests with URL-encoded data.
// 3. `express.text()`: Parses requests with raw text data.
// 4. `express.raw()`: Parses requests with raw binary data.

// Uncomment one or more of these options depending on the format of the data sent by your client:

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