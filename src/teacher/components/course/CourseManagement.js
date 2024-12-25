import React, { useState } from 'react';
import Navbar from '../common/Navbar';
import Sidebar from '../common/Sidebar';
import '../../styles/course/courseManagement.css';

function CourseManagement() {
  const [activeTab, setActiveTab] = useState('info');
  const [courseData, setCourseData] = useState({
    title: '',
    instructor: '',
    targetAudience: '',
    enrollmentKey: '',
    courseInfo: '',
    specialization: '',
    materials: {
      videos: [],
      documents: []
    },
    assessments: {
      quizzes: [],
      assignments: [],
      exams: []
    }
  });

  const [currentMaterial, setCurrentMaterial] = useState({
    type: 'video',
    title: '',
    file: null,
    description: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCourseData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleMaterialUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCurrentMaterial(prev => ({
        ...prev,
        file: file
      }));
    }
  };

  const handleAddMaterial = () => {
    if (currentMaterial.title && currentMaterial.file) {
      setCourseData(prev => ({
        ...prev,
        materials: {
          ...prev.materials,
          [currentMaterial.type]: [
            ...prev.materials[currentMaterial.type],
            { ...currentMaterial, id: Date.now() }
          ]
        }
      }));
      setCurrentMaterial({
        type: 'video',
        title: '',
        file: null,
        description: ''
      });
    }
  };

  return (
    <div className="dashboard-layout">
      <Navbar />
      <div className="dashboard-container">
        <Sidebar />
        <main className="dashboard-content">
          <div className="course-management">
            <div className="course-header">
              <h1>Course Management</h1>
              <div className="course-tabs">
                <button 
                  className={`tab ${activeTab === 'info' ? 'active' : ''}`}
                  onClick={() => setActiveTab('info')}
                >
                  Basic Information
                </button>
                <button 
                  className={`tab ${activeTab === 'materials' ? 'active' : ''}`}
                  onClick={() => setActiveTab('materials')}
                >
                  Course Materials
                </button>
                <button 
                  className={`tab ${activeTab === 'assessments' ? 'active' : ''}`}
                  onClick={() => setActiveTab('assessments')}
                >
                  Assessments
                </button>
              </div>
            </div>

            {activeTab === 'info' && (
              <div className="tab-content">
                <section className="form-section">
                  <h2>Course Information</h2>
                  <div className="form-grid">
                    <div className="form-group">
                      <label>Course Title*</label>
                      <input
                        type="text"
                        name="title"
                        value={courseData.title}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label>Target Audience*</label>
                      <input
                        type="text"
                        name="targetAudience"
                        value={courseData.targetAudience}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label>Enrollment Key*</label>
                      <input
                        type="text"
                        name="enrollmentKey"
                        value={courseData.enrollmentKey}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label>Specialization*</label>
                      <select
                        name="specialization"
                        value={courseData.specialization}
                        onChange={handleInputChange}
                        required
                      >
                        <option value="">Select Specialization</option>
                        <option value="web">Web Development</option>
                        <option value="mobile">Mobile Development</option>
                        <option value="ai">Artificial Intelligence</option>
                        <option value="security">Cybersecurity</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-group full-width">
                    <label>Course Description*</label>
                    <textarea
                      name="courseInfo"
                      value={courseData.courseInfo}
                      onChange={handleInputChange}
                      rows="4"
                      required
                    />
                  </div>
                </section>
              </div>
            )}

            {activeTab === 'materials' && (
              <div className="tab-content">
                <section className="materials-section">
                  <h2>Course Materials</h2>
                  
                  <div className="upload-section">
                    <div className="form-group">
                      <label>Material Type</label>
                      <select
                        value={currentMaterial.type}
                        onChange={(e) => setCurrentMaterial(prev => ({
                          ...prev,
                          type: e.target.value
                        }))}
                      >
                        <option value="video">Video</option>
                        <option value="documents">Document</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label>Title</label>
                      <input
                        type="text"
                        value={currentMaterial.title}
                        onChange={(e) => setCurrentMaterial(prev => ({
                          ...prev,
                          title: e.target.value
                        }))}
                      />
                    </div>

                    <div className="form-group">
                      <label>Upload File</label>
                      <input
                        type="file"
                        onChange={handleMaterialUpload}
                        accept={currentMaterial.type === 'video' ? 'video/*' : '.pdf,.doc,.docx'}
                      />
                    </div>

                    <button 
                      type="button" 
                      onClick={handleAddMaterial}
                      className="add-material-btn"
                    >
                      Add Material
                    </button>
                  </div>

                  <div className="materials-list">
                    <h3>Videos</h3>
                    {courseData.materials.videos.map(video => (
                      <div key={video.id} className="material-item">
                        <i className="fas fa-video"></i>
                        <span>{video.title}</span>
                      </div>
                    ))}

                    <h3>Documents</h3>
                    {courseData.materials.documents.map(doc => (
                      <div key={doc.id} className="material-item">
                        <i className="fas fa-file-alt"></i>
                        <span>{doc.title}</span>
                      </div>
                    ))}
                  </div>
                </section>
              </div>
            )}

            {activeTab === 'assessments' && (
              <div className="tab-content">
                <section className="assessments-section">
                  <h2>Course Assessments</h2>
                  {/* Assessment creation will be implemented here */}
                  <p>Assessment creation coming soon...</p>
                </section>
              </div>
            )}

            <div className="form-actions">
              <button type="button" className="save-draft-btn">
                Save as Draft
              </button>
              <button type="submit" className="publish-btn">
                Publish Course
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default CourseManagement; 