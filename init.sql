CREATE DATABASE mydb;

\c mydb;


CREATE TABLE albums (
    id UUID PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    year INT,
    artist_id UUID
);

CREATE TABLE artists (
    id UUID PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

CREATE TABLE tracks (
    id UUID PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    artist_id UUID,
    album_id UUID,
    duration INT
);

CREATE TABLE users (
    id UUID PRIMARY KEY,
    login VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE favorites (
    id UUID PRIMARY KEY,
    artist_ids UUID[],
    album_ids UUID[],
    track_ids UUID[]
);
