const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./src/database/notes.db");

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS notes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    content TEXT
  )`);
});

async function getAllNotes() {
  return new Promise((resolve, reject) => {
    db.all("SELECT * FROM notes", (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
}

async function createNote(note) {
  return new Promise((resolve, reject) => {
    db.run(
      "INSERT INTO notes (title, content) VALUES (?, ?)",
      [note.title, note.content],
      function (err) {
        if (err) {
          reject(err);
        } else {
          resolve({ id: this.lastID, ...note });
        }
      }
    );
  });
}

async function updateNote(id, updates) {
  return new Promise((resolve, reject) => {
    db.run(
      "UPDATE notes SET title = ?, content = ? WHERE id = ?",
      [updates.title, updates.content, id],
      (err) => {
        if (err) {
          reject(err);
        } else {
          resolve({ id, ...updates });
        }
      }
    );
  });
}

async function deleteNote(id) {
  return new Promise((resolve, reject) => {
    db.run("DELETE FROM notes WHERE id = ?", id, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}

module.exports = { getAllNotes, createNote, updateNote, deleteNote };
