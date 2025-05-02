// vulnerable-server.js
// A deliberately insecure Express application for SAST testing purposes only.
// DO NOT run this code in production!

const express = require("express");
const mysql = require("mysql");
const path = require("path");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// In‑memory DB connection (replace with your own credentials for testing)
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "test_db",
});

// --- Vulnerability #1: Unsafely evaluating user‑supplied JavaScript ---------
app.get("/eval", (req, res) => {
  const { code } = req.query;
  try {
    // eslint‑disable‑next‑line no-eval
    const result = eval(code); // SAST should flag eval injection here
    res.send(`Result: ${result}`);
  } catch (err) {
    res.status(500).send(err.toString());
  }
});

// --- Vulnerability #2: SQL Injection via string concatenation --------------
app.post("/login", (req, res) => {
  const { user, pass } = req.body;
  const sql = `SELECT * FROM users WHERE username='${user}' AND password='${pass}'`;
  db.query(sql, (err, rows) => {
    if (err) return res.status(500).send(err.toString());
    if (rows.length) {
      res.cookie("session", rows[0].id); // Missing secure & httpOnly flags
      res.send("Logged in!");
    } else {
      res.status(401).send("Invalid credentials");
    }
  });
});

// --- Vulnerability #3: Path traversal through unsanitized file parameter ----
app.get("/download", (req, res) => {
  const file = req.query.file; // e.g. ../../../etc/passwd
  const fullPath = path.join(__dirname, "uploads", file);
  res.download(fullPath); // No validation ‑ path traversal
});

// --- Vulnerability #4: Insecure randomness for CSRF token -------------------
app.get("/csrf-token", (_req, res) => {
  const token = Math.random().toString(36).substring(2); // Predictable
  res.send({ token });
});

// --- Vulnerability #5: Hard‑coded secret key --------------------------------
const jwtSecret = "super‑secret‑do‑not‑use‑in‑prod";
app.get("/secret", (req, res) => {
  res.send(`Secret key is ${jwtSecret}`);
});

app.listen(3000, () => {
  console.log("Vulnerable server running on http://localhost:3000");
});
