import React, { useState } from 'react';
import Navbar from '../common/Navbar';
import Sidebar from '../common/Sidebar';
import '../../styles/dashboard/students.css';

function Students() {
  const [searchTerm, setSearchTerm] = useState('');
  const [students, setStudents] = useState([
    {
      id: 1,
      name: "John Doe",
      course: "React JS Basic to Advance",
      joiningDate: "2023-11-20",
      email: "john@example.com",
      progress: 75
    },
    {
      id: 2,
      name: "Jane Smith",
      course: "Basic to Advance Figma",
      joiningDate: "2023-11-15",
      email: "jane@example.com",
      progress: 45
    }
  ]);

  const [editStudent, setEditStudent] = useState(null);

  const filteredStudents = students.filter(student => 
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.course.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (id) => {
    setStudents(students.filter(student => student.id !== id));
  };

  const handleEdit = (student) => {
    setEditStudent(student);
  };

  const handleSaveEdit = () => {
    setStudents(students.map(student => 
      student.id === editStudent.id ? editStudent : student
    ));
    setEditStudent(null);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditStudent(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="teacher-container dashboard-layout">
      <Navbar />
      <div className="dashboard-container">
        <Sidebar />
        <main className="dashboard-content">
          <div className="students-header">
            <h1>Students</h1>
            <div className="header-actions">
              <div className="search-box">
                <input 
                  type="text" 
                  placeholder="Search students..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <i className="fas fa-search"></i>
              </div>
            </div>
          </div>
          <div className="table-container">
            <table className="students-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Course</th>
                  <th>Joining Date</th>
                  <th>Email</th>
                  <th>Progress</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.map(student => (
                  <tr key={student.id}>
                    <td>
                      <div className="student-info">
                        <img src={`https://ui-avatars.com/api/?name=${student.name}`} alt={student.name} />
                        <span>{student.name}</span>
                      </div>
                    </td>
                    <td>{student.course}</td>
                    <td>{student.joiningDate}</td>
                    <td>{student.email}</td>
                    <td>
                      <div className="progress-bar">
                        <div 
                          className="progress" 
                          style={{ width: `${student.progress}%` }}
                        ></div>
                        <span className="progress-text">{student.progress}%</span>
                      </div>
                    </td>
                    <td>
                      <div className="action-buttons">
                        <button 
                          className="edit-btn" 
                          title="Edit"
                          onClick={() => handleEdit(student)}
                        >
                          <i className="fas fa-edit"></i>
                        </button>
                        <button 
                          className="delete-btn" 
                          title="Delete"
                          onClick={() => handleDelete(student.id)}
                        >
                          <i className="fas fa-trash"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {editStudent && (
            <div className="modal">
              <div className="modal-content">
                <h3>Edit Student</h3>
                <div className="modal-form">
                  <div className="form-group">
                    <label>Name</label>
                    <input
                      type="text"
                      name="name"
                      value={editStudent.name}
                      onChange={handleEditChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Course</label>
                    <input
                      type="text"
                      name="course"
                      value={editStudent.course}
                      onChange={handleEditChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Joining Date</label>
                    <input
                      type="date"
                      name="joiningDate"
                      value={editStudent.joiningDate}
                      onChange={handleEditChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Email</label>
                    <input
                      type="email"
                      name="email"
                      value={editStudent.email}
                      onChange={handleEditChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Progress</label>
                    <input
                      type="number"
                      name="progress"
                      value={editStudent.progress}
                      onChange={handleEditChange}
                      max="100"
                      min="0"
                    />
                  </div>
                  <div className="modal-actions">
                    <button type="button" onClick={() => setEditStudent(null)}>Cancel</button>
                    <button type="button" className="save-btn" onClick={handleSaveEdit}>Save</button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default Students;