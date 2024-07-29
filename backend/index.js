const express = require("express");
const app = express();
const port = 3000;

const mysql = require("mysql2");
const cors = require("cors");
const pool = mysql.createPool({
  host: "193.203.184.7",
  user: "u223830212_pav",
  password: "Pavitr@123",
  database: "u223830212_jjh",
});

app.use(cors());
app.use(express.json());

//  Route to signup user

app.post("/signup", (req, res) => {
  const { id, name, address, phone, email, password } = req.body;

  console.log(req.body);

  if (!id || !name || !address || !phone || !email || !password) {
    return res.json({ message: "All fields are required" });
  }

  const sql = `INSERT INTO users (id, name, address, phone, email, password) VALUES (?, ?, ?, ?, ?, ?)`;

  pool.query(
    sql,
    [id, name, address, phone, email, password],
    (err, result) => {
      if (err) {
        console.log("Error executing query:", err);
        return res.json({ message: "Database error" });
      }
      return res.json({
        message: "Signup success",
        user: { id, name, address, phone, email, password },
      });
    }
  );
});

// Route to login user

app.post("/login", (req, res) => {
  const { id, password } = req.body;

  if (!id || !password) {
    return res.json({ message: "All fields are required" });
  }

  const sql = `SELECT * FROM users WHERE id = ? AND password = ?`;
  pool.query(sql, [id, password], (err, result) => {
    if (err) {
      console.log("Error executing query:", err);
      return res.json({ error: "Database error" });
    }
    if (result.length === 0) {
      return res.json({ message: "Invalid credentials" });
    }
    return res.json({ message: "Login success", user: result[0] });
  });
});

// Route to purchase course

app.post("/purchase", (req, res) => {
  const { uid, id, name, description, price, image } = req.body;

  const sql = `SELECT * FROM purchased_courses WHERE user_id = ? AND id = ?`;

  //    Checking if course is already purchased
  pool.query(sql, [uid, id], (err, result) => {
    if (err) {
      console.log("Error executing query:", err);
      return res.json({ message: "Database error" });
    }
    if (result.length > 0) {
      return res.json({ message: "Course already purchased" });
    }

    //  Inserting course into purchased_courses table when purchased

    const sql = `INSERT INTO purchased_courses (id, name, description, price, user_id, image) VALUES (?, ?, ?, ?, ?, ?)`;

    pool.query(
      sql,
      [id, name, description, price, uid, image],
      (err, result) => {
        if (err) {
          console.log("Error executing query:", err);
          return res.json({ message: "Database error" });
        }
        return res.json({ message: "Course purchased" });
      }
    );
  });
});

// Route to return purchased courses

app.post("/purchased-courses", (req, res) => {
  const uid = req.body.uid;

  const sql = `SELECT * FROM purchased_courses WHERE user_id = ?`;

  pool.query(sql, [uid], (err, result) => {
    if (err) {
      console.log("Error executing query:", err);
      return res.json({ message: "Database error" });
    }
    return res.json({ courses: result });
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
