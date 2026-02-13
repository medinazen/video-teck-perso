import AbstractSeeder from "./AbstractSeeder";

class GenreSeeder extends AbstractSeeder {
  constructor() {
    super({ table: "Genre", truncate: true });
  }
  async run() {
    const genres = [
      "action",
      "comedie",
      "Drame",
      "Horreur",
      "Science-Fiction",
      "Animation",
      "Documentaire",
    ];
    for (let i = 0; i < genres.length; i += 1) {
      await this.insert({
        Label: genres[i],
        refName: `genre_${i}`,
      });
    }
  }
}
export default GenreSeeder;
