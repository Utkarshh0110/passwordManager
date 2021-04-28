const express = require("express");
const cors = require("cors");
const app = express();
const mysql = require("mysql");
const { decrypt, encrypt } = require("./EncryptionHandler");

app.use(cors());
app.use(express.json());

const PORT = 5000;

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "",
  database: "",
});

db.connect(function (err) {
  if (err) {
    console.error("error connecting: " + err.message);
    return;
  }
});

app.post("/addpassword", (req, res) => {
  const { password, title } = req.body;
  const hashedPassword = encrypt(password);


  db.query(
    "INSERT INTO manager (password, title, iv) VALUES (?,?,?)",
    [hashedPassword.password, title, hashedPassword.iv],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Success");
      }
    }
  );
});

app.get("/showpasswords", (req, res) => {
  db.query("SELECT * FROM manager;", (err, result) => {
    if(err){
      console.log(err)
      return res.send("NO PASSWORD FOUND....")
    }
    res.send(result)
  })
})


app.post("/decryptPassword", (req,res) => {
  res.send(decrypt(req.body));
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
