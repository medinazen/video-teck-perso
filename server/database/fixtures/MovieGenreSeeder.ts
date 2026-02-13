import AbstractSeeder from "./AbstractSeeder";
import GenreSeeder from "./GenreSeeder";
import MovieSeeder from "./MovieSeeder";

class MovieGenreSeeder extends AbstractSeeder {
    constructor(){
        super({
            table: "Movie_Genre",
            truncate: false,
            dependencies: [MovieSeeder, GenreSeeder]
        });
    }
    async run(){
        for(let i = 0; i < 10; i +=1){
            const movieRef = this.getRef(`movie_${i}`);
            const randomGenreIndex = Math.floor(Math.random() * 7);
            const genreRef = this.getRef(`genre_${randomGenreIndex}`);
            if (movieRef && genreRef){
                await this.insert({
                    movie_id: movieRef.insertId,
                    genre_id: genreRef.insertId,
                });
            }else{
                console.warn(`Liaison impossible : movie : movie_${i} ou genre_${randomGenreIndex} introuvable.`);
            }
        }
        }
    }
    export default MovieGenreSeeder;