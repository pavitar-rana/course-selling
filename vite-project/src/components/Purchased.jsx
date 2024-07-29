import axios from "axios";
import React, { useEffect, useState } from "react";

function Purchased() {
  const [courses, setCourses] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const result = await axios.post(
        "http://localhost:3000/purchased-courses",
        {
          uid: JSON.parse(localStorage.getItem("user")).id,
        }
      );
      setCourses(result.data.courses);
    }
    fetchData();
  }, []);
  return (
    <div>
      <h1>Purchased</h1>
      <p>Your purchased courses will be displayed here</p>
      <div>
        {courses.map((course, index) => {
          return (
            <div key={index}>
              <img src={course.image} alt="course" />
              <h3>{course.name}</h3>
              <p>{course.description}</p>
              <p>{course.price}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Purchased;
