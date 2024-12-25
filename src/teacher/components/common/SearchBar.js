import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/common/searchBar.css';

function SearchBar() {
  const [searchTerm, setSearchTerm] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [searchResults, setSearchResults] = useState({
    courses: [],
    students: []
  });
  const searchRef = useRef(null);
  const navigate = useNavigate();

  // Mock data - replace with your actual data or API call
  const mockData = {
    courses: [
      { id: 1, title: 'React JS Basic to Advance', enrollments: 120, rating: 4.5 },
      { id: 2, title: 'Advanced Figma', enrollments: 85, rating: 4.2 },
      { id: 3, title: 'Laravel Basics', enrollments: 95, rating: 4.7 }
    ],
    students: [
      { id: 1, name: 'John Doe', email: 'john@example.com', course: 'React JS Basic' },
      { id: 2, name: 'Jane Smith', email: 'jane@example.com', course: 'Advanced Figma' },
      { id: 3, name: 'Mike Johnson', email: 'mike@example.com', course: 'Laravel Basics' }
    ]
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);

    if (term.length > 0) {
      // Filter courses
      const filteredCourses = mockData.courses.filter(course =>
        course.title.toLowerCase().includes(term)
      );

      // Filter students
      const filteredStudents = mockData.students.filter(student =>
        student.name.toLowerCase().includes(term) ||
        student.email.toLowerCase().includes(term) ||
        student.course.toLowerCase().includes(term)
      );

      setSearchResults({
        courses: filteredCourses,
        students: filteredStudents
      });
      setShowResults(true);
    } else {
      setShowResults(false);
    }
  };

  const handleResultClick = (item, type) => {
    setShowResults(false);
    setSearchTerm('');
    
    if (type === 'course') {
      navigate(`/teacher/course/${item.id}`); 
    } else if (type === 'student') {
      navigate(`/teacher/students?id=${item.id}`); 
    }
  };

  return (
    <div className="teacher-container search-container" ref={searchRef}>
      <div className="search-input-wrapper">
        <i className="fas fa-search"></i>
        <input
          type="text"
          placeholder="Search courses, students..."
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>

      {showResults && (
        <div className="search-results">
          {searchResults.courses.length > 0 && (
            <div className="result-section">
              <h3>Courses</h3>
              {searchResults.courses.map(course => (
                <div 
                  key={course.id} 
                  className="result-item"
                  onClick={() => handleResultClick(course, 'course')}
                >
                  <i className="fas fa-book"></i>
                  <div className="result-info">
                    <span className="result-title">{course.title}</span>
                    <div className="result-meta">
                      <span><i className="fas fa-users"></i> {course.enrollments} students</span>
                      <span><i className="fas fa-star"></i> {course.rating}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {searchResults.students.length > 0 && (
            <div className="result-section">
              <h3>Students</h3>
              {searchResults.students.map(student => (
                <div 
                  key={student.id} 
                  className="result-item"
                  onClick={() => handleResultClick(student, 'student')}
                >
                  <i className="fas fa-user"></i>
                  <div className="result-info">
                    <span className="result-title">{student.name}</span>
                    <div className="result-meta">
                      <span>{student.email}</span>
                      <span><i className="fas fa-book"></i> {student.course}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {searchResults.courses.length === 0 && searchResults.students.length === 0 && (
            <div className="no-results">
              <i className="fas fa-search"></i>
              <p>No results found for "{searchTerm}"</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default SearchBar;