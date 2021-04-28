import React, { useState } from "react";
import "./App.css";
import Axios from "axios";

const App = () => {
  const [password, setPassword] = useState("");
  const [title, setTitle] = useState("");

  const addPassword = () => {
    Axios.post("http://localhost:5000/addpassword", { password, title });
  };

  return (
    <div className="App">
      <div className="AddingPassword">
        <input
          onChange={(e) => setPassword(e.target.value)}
          type="text"
          placeholder="Ex. password123"
        />
        <input
          onChange={(e) => setTitle(e.target.value)}
          type="text"
          placeholder="Ex. Facebook"
        />
        <button onClick={addPassword}>Add Password</button>
      </div>
    </div>
  );
};

export default App;
