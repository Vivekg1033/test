const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const db = new sqlite3.Database('./database.db');

// Create tables
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY,
      username TEXT,
      password TEXT,
      profile_pic TEXT,
      bio TEXT
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS notes (
      id INTEGER PRIMARY KEY,
      title TEXT,
      content TEXT,
      author_id INTEGER,
      is_private BOOLEAN,
      FOREIGN KEY (author_id) REFERENCES users(id)
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS comments (
      id INTEGER PRIMARY KEY,
      note_id INTEGER,
      user_id INTEGER,
      comment TEXT,
      FOREIGN KEY (note_id) REFERENCES notes(id),
      FOREIGN KEY (user_id) REFERENCES users(id)
    )
  `);
});

// API endpoints
app.post('/register', (req, res) => {
  const { username, password, bio } = req.body;
  db.run(
    `INSERT INTO users (username, password, bio) VALUES (?, ?, ?)`,
    [username, password, bio],
    function (err) {
      if (err) return res.status(500).send(err.message);
      res.send({ id: this.lastID });
    }
  );
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  db.get(
    `SELECT * FROM users WHERE username = ? AND password = ?`,
    [username, password],
    (err, row) => {
      if (err) return res.status(500).send(err.message);
      if (!row) return res.status(404).send('User not found');
      res.send(row);
    }
  );
});

app.post('/upload-note', (req, res) => {
  const { title, content, author_id, is_private } = req.body;
  db.run(
    `INSERT INTO notes (title, content, author_id, is_private) VALUES (?, ?, ?, ?)`,
    [title, content, author_id, is_private],
    function (err) {
      if (err) return res.status(500).send(err.message);
      res.send({ id: this.lastID });
    }
  );
});

app.get('/notes', (req, res) => {
  db.all(`SELECT * FROM notes`, [], (err, rows) => {
    if (err) return res.status(500).send(err.message);
    res.send(rows);
  });
});

app.listen(5000, () => console.log('Backend running on http://localhost:5000'));
