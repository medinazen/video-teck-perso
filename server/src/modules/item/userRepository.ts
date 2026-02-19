import databaseClient from "../../../database/client";
import type { Result, Rows } from "../../../database/client";

class UserRepository {
  // INSCRIPTION : Créer un nouvel utilisateur
  async create(user: any) {
    const [result] = await databaseClient.query<Result>(
      "INSERT INTO User (Firstname, Lastname, Email, Password) VALUES (?, ?, ?, ?)",
      [user.firstname, user.lastname, user.email, user.password]
    );

    return result.insertId;
  }

  // CONNEXION : Trouver un utilisateur par son email
  async findByEmail(email: string) {
    const [rows] = await databaseClient.query<Rows>(
      "SELECT * FROM User WHERE Email = ?",
      [email]
    );

    // On retourne le premier utilisateur trouvé (ou undefined)
    return rows[0];
  }

  // Pour afficher le profil plus tard
  async read(id: number) {
    const [rows] = await databaseClient.query<Rows>(
      "SELECT id, Firstname, Lastname, Email FROM User WHERE id = ?",
      [id]
    );

    return rows[0];
  }
}

export default new UserRepository();