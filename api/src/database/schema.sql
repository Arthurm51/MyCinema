CREATE DATABASE mycontacts;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS genders (
  id UUID NOT NULL UNIQUE DEFAULT uuid_generate_v4(),
  name VARCHAR NOT NULL
);

CREATE TABLE IF NOT EXISTS casts (
  id UUID NOT NULL UNIQUE DEFAULT uuid_generate_v4(),
  name VARCHAR NOT NULL,
  day_of_birth INT NOT NULL CHECK (day_of_birth BETWEEN 1 AND 31),
  month_of_birth INT NOT NULL CHECK (month_of_birth BETWEEN 1 AND 12),
  year_of_birth INT NOT NULL,
  gender VARCHAR NOT NULL,
  nationality VARCHAR NOT NULL,
  role BOOLEAN
);

CREATE TABLE IF NOT EXISTS productions (
  id UUID NOT NULL UNIQUE DEFAULT uuid_generate_v4(),
  name VARCHAR NOT NULL,
  category VARCHAR NOT NULL,
  gender_id UUID NOT NULL,
  director_id UUID NOT NULL,
  cast_id UUID NOT NULL,
  rating INT NOT NULL CHECK (rating BETWEEN 1 AND 10),
  creation_year INT NOT NULL,
  sinopse VARCHAR NOT NULL,
  comment VARCHAR,
  age_rating INT NOT NULL,
  duration INT,
  seasons INT,
  FOREIGN KEY(gender_id) REFERENCES genders(id),
  FOREIGN KEY(director_id) REFERENCES casts(id),
  FOREIGN KEY(cast_id) REFERENCES casts(id)
);


