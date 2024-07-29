import React, { useEffect, useState } from "react";
import axios from "axios";

function Login() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div>
      <h1>Login</h1>

      <input
        type="text"
        onChange={(e) => {
          setId(e.target.value);
        }}
        placeholder="ID"
      />
      <input
        type="password"
        onChange={(e) => {
          setPassword(e.target.value);
        }}
        placeholder="Password"
      />
      <button
        onClick={async () => {
          const result = await axios.post("http://localhost:3000/login", {
            id,
            password,
          });

          console.log(result.data);

          const luser = localStorage.getItem("user");
          if (luser) {
            localStorage.removeItem("user");
            localStorage.setItem("user", JSON.stringify(result.data.user));
          } else {
            localStorage.setItem("user", JSON.stringify(result.data.user));
          }
        }}
        type="submit"
      >
        Login
      </button>
    </div>
  );
}

export default Login;
