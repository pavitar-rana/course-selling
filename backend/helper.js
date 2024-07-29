const e = require("express");
const mysql = require("mysql2");

const con = mysql.createConnection({
  host: "193.203.184.7",
  user: "u223830212_pav",
  password: "Pavitr@123",
  database: "u223830212_jjh",
});

con.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");

  const sql = `CREATE TABLE users (id INT, name VARCHAR(255), address VARCHAR(255), phone VARCHAR(255), email VARCHAR(255), password VARCHAR(255))`;
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table created");
  });
});

con.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");

  const sql = `CREATE TABLE purchased_courses (id INT, name VARCHAR(255), description VARCHAR(255), price INT, user_id INT, image VARCHAR(255))`;
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table created");
  });
});
