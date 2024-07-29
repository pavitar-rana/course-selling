import React, { useState } from "react";
import axios from "axios";

function Dashboard() {
  const [courses, setCourses] = useState([
    {
      id: 1,
      name: "Course 1",
      description: "Description 1",
      price: 100,
      image:
        "https://media.geeksforgeeks.org/wp-content/uploads/20230911132318/Best-Backend-Development-Courses.png",
    },
    {
      id: 2,
      name: "Course 2",
      description: "Description 2",
      price: 200,
      image:
        "https://media.geeksforgeeks.org/wp-content/uploads/20230911132318/Best-Backend-Development-Courses.png",
    },
    {
      id: 3,
      name: "Course 3",
      description: "Description 3",
      price: 300,
      image:
        "https://media.geeksforgeeks.org/wp-content/uploads/20230911132318/Best-Backend-Development-Courses.png",
    },
  ]);

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Purchase courses here</p>
      <div>
        {courses.map((course, index) => {
          return (
            <div key={index}>
              <img src={course.image} alt="course" />
              <h3>{course.name}</h3>
              <p>{course.description}</p>
              <p>{course.price}</p>
              <button
                onClick={async () => {
                  const result = await axios.post(
                    "http://localhost:3000/purchase",
                    {
                      uid: JSON.parse(localStorage.getItem("user")).id,
                      id: course.id,
                      name: course.name,
                      description: course.description,
                      price: course.price,
                      image: course.image,
                    }
                  );
                  console.log(result.data);
                }}
              >
                Buy now
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Dashboard;
