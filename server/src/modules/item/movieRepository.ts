import databaseClient from "../../../database/client";

import type { Result, Rows } from "../../../database/client";

type Movie = {
  id: number;
  Title: string;
  ReleaseYear: number | null;
  Synopsis: string;
  PosterURL: string | null;
  Rating: number;
  director_id: number | null;
};

class MovieRepository {
  async readAll() {
    const [rows] = await databaseClient.query<Rows>("select * from Movie");
    return rows as Movie[];
  }
  
   deleteMovie = async (id: number) => {
  const client = await import("../../../database/client");
  const DatabaseClient = client.default;
  await DatabaseClient.query("delete from Movie where id = ?", [id]);
};

  async read(id: number) {
    const [rows] = await databaseClient.query<Rows>(
      "select * from Movie where id = ?",
      [id],
    );
    return rows[0] as Movie;
  }

  async create(movie: Omit<Movie, "id">) {
    // Execute the SQL INSERT query to add a new item to the "item" table
    const [result] = await databaseClient.query<Result>(
      "insert into Movie (Title, ReleaseYear, Synopsis, PosterURL, Rating, director_id) values (?, ?, ?, ?, ?, ?)",
      [
        movie.Title,
        movie.ReleaseYear,
        movie.Synopsis,
        movie.PosterURL,
        movie.Rating,
        movie.director_id,
      ],
    );
    return result.insertId;
    // Return the ID of the newly inserted item
  }

  // The Rs of CRUD - Read operations

  // Execute the SQL SELECT query to retrieve a specific item by its ID

  // Return the first row of the result, which represents the item

  // Execute the SQL SELECT query to retrieve all items from the "item" table

  // Return the array of items

  // The U of CRUD - Update operation
  // TODO: Implement the update operation to modify an existing item

  // async update(item: Item) {
  //   ...
  // }

  // The D of CRUD - Delete operation
  // TODO: Implement the delete operation to remove an item by its ID
}


export default new MovieRepository();
