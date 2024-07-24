import React, { useEffect, useState } from "react";

function Signup() {
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

  const [courses, setCourses] = useState([
    {
      id: 1,
      name: "React",
      description: "Learn React",
      price: 1000,
    },
    {
      id: 2,
      name: "Vue",
      description: "Learn Vue",
      price: 2000,
    },
    {
      id: 3,
      name: "Angular",
      description: "Learn Angular",
      price: 3000,
    },
  ]);

  return (
    <div>
      <div>Purchase course </div>
      <div>
        {courses.map((e) => {
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
              <button
                onClick={() => {
                  purchased.push(e);
                  setPurchased(purchased);
                  localStorage.setItem("purchased", JSON.stringify(purchased));

                  const result = axios.post("http://localhost:3000/purchase", {
                    id: e.id,
                    name: e.name,
                    description: e.description,
                    price: e.price,
                  });
                }}
              >
                Buy
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Signup;
