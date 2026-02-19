import databaseClient from "../../../database/client";
import type { Result, Rows } from "../../../database/client";

class UserMovieRepository {
  // Ajouter un film aux favoris
  async create(userId: number, movieId: number) {
    // On utilise INSERT IGNORE pour éviter les erreurs si l'utilisateur 
    // clique deux fois sur le même film
    const [result] = await databaseClient.query<Result>(
      "INSERT IGNORE INTO User_Movie (user_id, movie_id) VALUES (?, ?)",
      [userId, movieId]
    );
    return result.affectedRows;
  }

  // Retirer un film des favoris
  async delete(userId: number, movieId: number) {
    const [result] = await databaseClient.query<Result>(
      "DELETE FROM User_Movie WHERE user_id = ? AND movie_id = ?",
      [userId, movieId]
    );
    return result.affectedRows;
  }

  // Récupérer tous les favoris d'un utilisateur spécifique
  async findByUserId(userId: number) {
    const [rows] = await databaseClient.query<Rows>(
      `SELECT m.* FROM Movie m 
       JOIN User_Movie um ON m.id = um.movie_id 
       WHERE um.user_id = ?`,
      [userId]
    );
    return rows;
  }
}

export default new UserMovieRepository();