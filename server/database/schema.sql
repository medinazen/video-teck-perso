
create table user (
  id int unsigned primary key auto_increment not null
    id_user INT AUTO_INCREMENT PRIMARY KEY,
    firstname VARCHAR(250) NOT NULL,
    lastname VARCHAR(250) NOT NULL,
    email VARCHAR(250) NOT NULL UNIQUE,
    password VARCHAR(250) NOT NULL,
);

CREATE TABLE director (
    id_director INT AUTO_INCREMENT PRIMARY KEY,
    firstname VARCHAR(250) NOT NULL,
    lastname VARCHAR(250) NOT NULL,
    biography TEXT
);
CREATE TABLE movie (
    id_movie INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(250) NOT NULL,
    release_year YEAR,
    synopsis TEXT,
    poster VARCHAR(500),
    director_id INT NOT NULL,
    
    CONSTRAINT fk_movie_director
        FOREIGN KEY (director_id)
        REFERENCES director(id_director)
        ON DELETE CASCADE
);
CREATE TABLE genre (
    id_genre INT AUTO_INCREMENT PRIMARY KEY,
    label VARCHAR(250) NOT NULL
);

CREATE TABLE user_movie (
    user_id INT NOT NULL,
    movie_id INT NOT NULL,
    rating DECIMAL(3,1) NOT NULL,
    comment TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY (user_id, movie_id),

    CONSTRAINT fk_um_user
        FOREIGN KEY (user_id)
        REFERENCES user(id_user)
        ON DELETE CASCADE,

    CONSTRAINT fk_um_movie
        FOREIGN KEY (movie_id)
        REFERENCES movie(id_movie)
        ON DELETE CASCADE
);



insert into user(id, email, password)
values
  (1, "jdoe@mail.com", "123456");

insert into item(id, title, user_id)
values
  (1, "Stuff", 1),
  (2, "Doodads", 1);
