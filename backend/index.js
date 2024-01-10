import express from "express";
import mysql from "mysql";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

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

app.listen(8800, () => {
  console.log("Connected to backend");
});

app.get("/", (req, res) => {
  res.json("Hello");
});

app.get("/paints", (req, res) => {
  const q = "SELECT * FROM jmb.paint";
  db.query(q, (err, data) => {
    if (err) return res.json({ error: err.message });
    return res.json(data);
  });
});

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
