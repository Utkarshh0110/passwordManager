const express = require("express");
const cors = require("cors")
const app = express();
const mysql = require("mysql");

app.use(cors());
app.use(express.json());

const PORT = 5000;

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "admin",
  database: "passtest",
});

db.connect(function(err) {
    if (err) {
      console.error('error connecting: ' + err.message);
      return;
    }})

app.post("/addpassword", (req, res) => {
  const { password, title } = req.body;
  console.log(password, title)

  db.query(
    "INSERT INTO manager (password, title) VALUES (?,?)",
    [password, title],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Success");
      }
    }
  );
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
