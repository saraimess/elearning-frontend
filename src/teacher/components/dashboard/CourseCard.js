import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/dashboard/courseCard.css'; // Import the CSS file

function CourseCard({ course }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/teacher/course/${course.id}`);
  };

  return (
    <div className="course-card" onClick={handleClick}>
      <div className="course-thumbnail">
        <img src={course.thumbnail} alt={course.title} />
        <div className="course-overlay">
          <span className="course-lessons">
            <i className="fas fa-book-open"></i> {course.lessons} Lessons
          </span>
          <span className="course-duration">
            <i className="fas fa-clock"></i> {course.duration}h
          </span>
        </div>
      </div>
      <div className="course-content">
        <h3>{course.title}</h3>
        <div className="course-footer">
          <div className="course-progress">
            <div className="progress-bar">
              <div 
                className="progress" 
                style={{ width: `${course.progress || 0}%` }}
              ></div>
            </div>
            <span>{course.progress || 0}% Complete</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CourseCard;