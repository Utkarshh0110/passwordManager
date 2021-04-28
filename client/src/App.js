import React, { useState, useEffect } from "react";
import "./App.css";
import Axios from "axios";

const App = () => {
  const [password, setPassword] = useState("");
  const [title, setTitle] = useState("");
  const [passwordList, setPasswordList] = useState([]);

  useEffect(() => {
    Axios.get("http://localhost:5000/showpasswords").then((response) => {
      setPasswordList(response.data);
    });
  }, []);

  const addPassword = async () => {
    await Axios.post("http://localhost:5000/addpassword", { password, title });
    setPassword("");
    setTitle("");
    await Axios.get("http://localhost:5000/showpasswords").then((response) => {
      setPasswordList(response.data);
    });
  };

  const decryptPassword = (encryption) => {
    Axios.post("http://localhost:5000/decryptPassword", {
      password: encryption.password,
      iv: encryption.iv,
    }).then((response) => {
      setPasswordList(passwordList.map((val) => {
        return val.id === encryption.id ? {id: val.id, password: val.password, title: `Password :- ${response.data}`, iv:val.iv} : val;
      }))
    });


  };

  return (
    <div className="App">
      <div className="AddingPassword">
        <input
          onChange={(e) => setPassword(e.target.value)}
          type="text"
          placeholder="Ex. password123"
          value={password}
        />
        <input
          onChange={(e) => setTitle(e.target.value)}
          type="text"
          placeholder="Ex. Facebook"
          value={title}
        />
        <button onClick={addPassword}>Add Password</button>
      </div>

      <div className="Passwords">
        {passwordList.map((val) => {
          return (
            <div
              key={val.id}
              className="password"
              onClick={() =>
                decryptPassword({ password: val.password, iv: val.iv, id:val.id })
              }
            >
              <h3>{val.title}</h3>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default App;
