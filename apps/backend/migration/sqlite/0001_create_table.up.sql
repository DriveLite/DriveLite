CREATE TABLE IF NOT EXISTS users (
    user_id INTEGER PRIMARY KEY ,
    email TEXT UNIQUE NOT NULL,
    name TEXT,
    creation_time INTEGER NOT NULL
);
