DROP TABLE IF EXISTS users CASCADE;

CREATE TABLE users (
    id serial primary key,
    username varchar(255)
);
