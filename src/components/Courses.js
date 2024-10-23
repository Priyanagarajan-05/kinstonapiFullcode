// src/components/Courses.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5295/api/Courses', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCourses(response.data);
      } catch (err) {
        setError('Failed to fetch courses.');
      }
    };

    fetchCourses();
  }, []);

  return (
    <div>
      <h2>Courses</h2>
      {error && <p>{error}</p>}
      <ul>
        {courses.map((course) => (
          <li key={course.courseId}>{course.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default Courses;
