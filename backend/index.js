import express from "express";
import mysql from "mysql";
import cors from "cors";

// Express.js is a web framework for Node.js. It is designed for building web applications and APIs and has been called the de facto standard server framework for Node.js.
const app = express();
// Allows us to send any json file using a client eg:Postman
app.use(express.json());
// Allows our application to use our back-end API
app.use(cors());

// Used to connect to the MySQL database, we have set a connection limit so that more than 1 instance can run if another fails
const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "Bradley1995!",
  database: "jmb",
  connectionLimit: 5,
  waitForConnections: true,
  queueLimit: 0,
  debug: true,
  wait_timeout: 28800,
  connect_timeout: 10,
});

// This is calling for the app to listen to any changes and display on port 8800 on the local server.
app.listen(8800, () => {
  console.log("Connected to backend");
});

// Test to show we can make api requets with an express server 
app.get("/", (req, res) => {
  res.json("Hello");
});

// API request to 'paints' in the MySQL database. We use the constant q to state our SQL statement
app.get("/paints", (req, res) => {
  const q = "SELECT * FROM jmb.paint";
  db.query(q, (err, data) => {
    if (err) return res.json({ error: err.message });
    return res.json(data);
  });
});

// API request to post data to the SQL database from points in the frontend.
app.post("/paints", (req, res) => {
  const q =
    "INSERT INTO paint (`title`, `description`, `price`, `cover`) VALUES (?,?,?,?)";
  const values = [
    req.body.title,
    req.body.description,
    req.body.price,
    req.body.cover,
  ];

  db.query(q, values, (err, data) => {
    if (err) return res.json({ error: err.message });
    return res.json(data);
  });
});

app.delete("/paints/:id", (req, res) => {
  const paintId = req.params.id;
  const q = "DELETE FROM paint WHERE id = ?"

  db.query(q, [paintId], (err, data) => {
    if (err) return res.json(err);
    return res.json("Paint has been deleted successfully.");
  });
});

app.put("/paints/:id", (req, res) => {
  const paintId = req.params.id;
  const q = "UPDATE paint SET `title`= ?, `description`= ?, `price`= ?, `cover`= ? WHERE id = ?"
  const values = [
    req.body.title,
    req.body.description,
    req.body.price,
    req.body.cover,
  ];
  db.query(q, [...values,paintId], (err, data) => {
    if (err) return res.json(err);
    return res.json("Paint has been updated successfully.");
  });
});
