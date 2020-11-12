CREATE TABLE IF NOT EXISTS noteful_folders (
    id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    title TEXT NOT NULL,

);

CREATE TABLE IF NOT EXISTS noteful_notes (
   id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    note_tile TEXT NOT NULL,
    note_content TEXT NOT NULL, // _instead of or -instead
    folder-id TIMESTAMP DEFAULT now() NOT NULL //this needs to be a foreign key
);

//you should have a separate file for each table you are creating