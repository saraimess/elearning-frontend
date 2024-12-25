import React from 'react';
import CourseCard from './CourseCard';
import '../../styles/dashboard/dashboard.css';
import logo from '../../assets/images/logo.png';

function Dashboard() {
  const courses = [
    {
      id: 1,
      title: "Basic to Advance Figma",
      lessons: 20,
      duration: 15,
      thumbnail: logo,
      progress: 75,
      path: '/teacher/course/1'
    },
    {
      id: 2,
      title: "React JS Basic to Advance",
      lessons: 25,
      duration: 20,
      thumbnail: logo,
      progress: 45,
      path: '/teacher/course/2'
    },
    {
      id: 3,
      title: "Mastering JS with Laravel",
      lessons: 30,
      duration: 25,
      thumbnail: logo,
      progress: 60,
      path: '/teacher/course/3'
    }
  ];

  return (
    <div className="dashboard-content">
      <div className="dashboard-header">
        <h1>My Courses</h1>
      </div>
      <div className="courses-grid">
        {courses.map(course => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </div>
  );
}

export default Dashboard; 