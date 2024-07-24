import React, { useEffect, useState } from "react";

function Login() {
  const [purchased, setPurchased] = useState([]);
  useEffect(() => {
    const data = localStorage.getItem("purchased");
    if (data) {
      setPurchased(JSON.parse(data));
    } else {
      setPurchased([]);
      localStorage.setItem("purchased", JSON.stringify([]));
    }
  }, []);
  return (
    <div>
      {purchased.map((e) => {
        return (
          <div
            key={e.id}
            style={{
              border: "1px solid black",
              margin: "10px",
              padding: "10px",
            }}
          >
            <div>{e.name}</div>
            <div>{e.description}</div>
            <div>{e.price}</div>
          </div>
        );
      })}
    </div>
  );
}

export default Login;
