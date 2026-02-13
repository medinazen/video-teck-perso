import AbstractSeeder from "./AbstractSeeder";
import DirectorSeeder from "./DirectorSeeder";
// Import seeders that must be executed before this one
// Follow your foreign keys to find the right order ;)
//import UserSeeder from "./UserSeeder";

class MovieSeeder extends AbstractSeeder {
  constructor() {
    // Call the constructor of the parent class (AbstractSeeder) with appropriate options
    super({ table: "Movie", truncate: true, dependencies: [DirectorSeeder] });
  }

  // The run method - Populate the 'item' table with fake data

  async run() {
    // Ajoute async ici
    for (let i = 0; i < 10; i += 1) {
      const directorRef = this.getRef(`director_${i}`);

      // On vérifie si la référence existe pour éviter l'erreur
      if (!directorRef) {
        console.error(`Référence director_${i} introuvable !`);
        continue;
      }

      await this.insert({
        // Ajoute await ici
        Title: this.faker.lorem.word(), // Generate a fake title using faker library
        ReleaseYear: this.faker.date.past({ years: 20 }).getFullYear(), // Generate a fake release year using faker library
        Synopsis: this.faker.lorem.sentence(), // Generate a fake synopsis using faker library
        PosterURL: this.faker.image.urlLoremFlickr({ category: "movie" }), // Generate a fake poster URL using faker library
        Rating: this.faker.number.float({ min: 1, max: 10, fractionDigits: 1 }), // Generate a fake rating between 1 and 10 using faker library
        director_id: directorRef.insertId, // Get the insertId of the corresponding director from DirectorSeeder
        refName: `movie_${i}`,
      });
    }
  }
}

// Export the ItemSeeder class
export default MovieSeeder;
