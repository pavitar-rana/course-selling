import React, { useState } from "react";
import axios from "axios";

function Signup() {
  // const { id, name, address, phone, email, password } = req.body;
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div>
      <h1>Signup</h1>

      <input
        type="text"
        onChange={(e) => {
          setName(e.target.value);
        }}
        placeholder="Name"
      />
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
      <input
        type="text"
        onChange={(e) => {
          setAddress(e.target.value);
        }}
        placeholder="Address"
      />
      <input
        type="text"
        onChange={(e) => {
          setPhone(e.target.value);
        }}
        placeholder="Phone"
      />
      <input
        type="email"
        onChange={(e) => {
          setEmail(e.target.value);
        }}
        placeholder="Email"
      />

      <button
        onClick={async () => {
          const result = await axios.post("http://localhost:3000/signup", {
            id,
            name,
            address,
            phone,
            email,
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
        Signup
      </button>
    </div>
  );
}

export default Signup;
