import AbstractSeeder from "./AbstractSeeder";
import UserSeeder from "./UserSeeder";
import MovieSeeder from "./MovieSeeder";

class UserMovieSeeder extends AbstractSeeder{
    constructor(){
        super({
            table: "User_Movie",
            truncate: false,
            dependencies: [UserSeeder, MovieSeeder]
        });
    }
    async run(){
        // On fait en sorte que chaque utilisateur (5) ait au moins 2 films favoris
        for (let i = 0; i < 10; i +=1){
            const userRef = this.getRef(`user_${i}`);
            const chosenMovieIds = new Set<number>();
                while (chosenMovieIds.size < 3) {
                    const randomMovieIndex = Math.floor(Math.random() * 10);
                    const movieRef = this.getRef(`movie_${randomMovieIndex}`);

                if(userRef && movieRef){
                    const movieId = movieRef.insertId;
                    if (!chosenMovieIds.has(movieId)) {
               
                    await this.insert({
                        user_id: userRef.insertId,
                        movie_id: movieRef.insertId,
                    });
                    chosenMovieIds.add(movieId);
                }
                }
            }
        }
        }
    }
export default UserMovieSeeder;