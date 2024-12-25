import React, { useState } from 'react';
import Navbar from '../common/Navbar';
import Sidebar from '../common/Sidebar';
import '../../styles/dashboard/addCourse.css';

function AddCourse() {
  const [courseData, setCourseData] = useState({
    title: '',
    instructor: {
      id: '1',
      name: 'John Doe'
    },
    targetAudience: '',
    enrollmentKey: '',
    courseInfo: ''
  });

  // Modal states
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [showDocModal, setShowDocModal] = useState(false);
  const [showQuizModal, setShowQuizModal] = useState(false);

  // Content states
  const [videoData, setVideoData] = useState({
    title: '',
    description: '',
    file: null,
    duration: ''
  });

  const [docData, setDocData] = useState({
    title: '',
    description: '',
    file: null
  });

  const [quizData, setQuizData] = useState({
    title: '',
    questions: [
      {
        question: '',
        options: ['', '', '', ''],
        correctAnswer: null
      }
    ]
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCourseData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleVideoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setVideoData(prev => ({
        ...prev,
        file: file
      }));
    }
  };

  const handleDocUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setDocData(prev => ({
        ...prev,
        file: file
      }));
    }
  };

  const handleAddQuestion = () => {
    setQuizData(prev => ({
      ...prev,
      questions: [
        ...prev.questions,
        {
          question: '',
          options: ['', '', '', ''],
          correctAnswer: null
        }
      ]
    }));
  };

  const handleQuestionChange = (questionIndex, field, value) => {
    setQuizData(prev => ({
      ...prev,
      questions: prev.questions.map((q, index) => {
        if (index === questionIndex) {
          return { ...q, [field]: value };
        }
        return q;
      })
    }));
  };

  const handleOptionChange = (questionIndex, optionIndex, value) => {
    setQuizData(prev => ({
      ...prev,
      questions: prev.questions.map((q, qIndex) => {
        if (qIndex === questionIndex) {
          const newOptions = [...q.options];
          newOptions[optionIndex] = value;
          return { ...q, options: newOptions };
        }
        return q;
      })
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Course Data:', courseData);
  };

  return (
    <div className="dashboard-layout">
      <Navbar />
      <div className="dashboard-container">
        <Sidebar />
        <main className="dashboard-content">
          <div className="add-course-container">
            {/* Main Form */}
            <form onSubmit={handleSubmit} className="course-form">
              <h2>Course Information</h2>
              <div className="form-group">
                <label>Course Title</label>
                <input
                  type="text"
                  name="title"
                  value={courseData.title}
                  onChange={handleInputChange}
                  placeholder="Enter the course title"
                  required
                />
              </div>

              <div className="form-group">
                <label>Target Audience</label>
                <input
                  type="text"
                  name="targetAudience"
                  value={courseData.targetAudience}
                  onChange={handleInputChange}
                  placeholder="Specify who this course is for"
                  required
                />
              </div>

              <div className="form-group">
                <label>Enrollment Key</label>
                <input
                  type="text"
                  name="enrollmentKey"
                  value={courseData.enrollmentKey}
                  onChange={handleInputChange}
                  placeholder="Create an enrollment key for students"
                  required
                />
              </div>

              <div className="form-group">
                <label>Course Description</label>
                <textarea
                  name="courseInfo"
                  value={courseData.courseInfo}
                  onChange={handleInputChange}
                  placeholder="Enter detailed course description"
                  rows="4"
                  required
                />
              </div>

              <div className="content-buttons">
                <button 
                  type="button" 
                  className="content-btn video-btn"
                  onClick={() => setShowVideoModal(true)}
                >
                  <i className="fas fa-video"></i>
                  <span>Add Video</span>
                </button>
                <button 
                  type="button" 
                  className="content-btn doc-btn"
                  onClick={() => setShowDocModal(true)}
                >
                  <i className="fas fa-file-alt"></i>
                  <span>Add Document</span>
                </button>
                <button 
                  type="button" 
                  className="content-btn quiz-btn"
                  onClick={() => setShowQuizModal(true)}
                >
                  <i className="fas fa-question-circle"></i>
                  <span>Add Quiz</span>
                </button>
              </div>

              <button type="submit" className="submit-btn">
                Create Course
              </button>
            </form>

            {/* Video Upload Modal */}
            {showVideoModal && (
              <div className="modal">
                <div className="modal-content">
                  <h3>Add Video</h3>
                  <div className="modal-form">
                    <div className="form-group">
                      <label>Video Title</label>
                      <input
                        type="text"
                        value={videoData.title}
                        onChange={(e) => setVideoData(prev => ({ ...prev, title: e.target.value }))}
                        placeholder="Enter video title"
                      />
                    </div>
                    <div className="form-group">
                      <label>Description</label>
                      <textarea
                        value={videoData.description}
                        onChange={(e) => setVideoData(prev => ({ ...prev, description: e.target.value }))}
                        placeholder="Enter video description"
                      />
                    </div>
                    <div className="form-group">
                      <label>Upload Video</label>
                      <div className="file-upload">
                        <input
                          type="file"
                          accept="video/*"
                          onChange={handleVideoUpload}
                        />
                        <i className="fas fa-cloud-upload-alt"></i>
                        <span>Click to upload or drag and drop</span>
                      </div>
                    </div>
                    <div className="modal-actions">
                      <button type="button" onClick={() => setShowVideoModal(false)}>Cancel</button>
                      <button type="button" className="save-btn">Save Video</button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Document Upload Modal */}
            {showDocModal && (
              <div className="modal">
                <div className="modal-content">
                  <h3>Add Document</h3>
                  <div className="modal-form">
                    <div className="form-group">
                      <label>Document Title</label>
                      <input
                        type="text"
                        value={docData.title}
                        onChange={(e) => setDocData(prev => ({ ...prev, title: e.target.value }))}
                        placeholder="Enter document title"
                      />
                    </div>
                    <div className="form-group">
                      <label>Description</label>
                      <textarea
                        value={docData.description}
                        onChange={(e) => setDocData(prev => ({ ...prev, description: e.target.value }))}
                        placeholder="Enter document description"
                      />
                    </div>
                    <div className="form-group">
                      <label>Upload Document</label>
                      <div className="file-upload">
                        <input
                          type="file"
                          accept=".pdf,.doc,.docx"
                          onChange={handleDocUpload}
                        />
                        <i className="fas fa-cloud-upload-alt"></i>
                        <span>Click to upload or drag and drop</span>
                      </div>
                    </div>
                    <div className="modal-actions">
                      <button type="button" onClick={() => setShowDocModal(false)}>Cancel</button>
                      <button type="button" className="save-btn">Save Document</button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Quiz Modal */}
            {showQuizModal && (
              <div className="modal">
                <div className="modal-content">
                  <h3>Create Quiz</h3>
                  <div className="modal-form">
                    <div className="form-group">
                      <label>Quiz Title</label>
                      <input
                        type="text"
                        value={quizData.title}
                        onChange={(e) => setQuizData(prev => ({ ...prev, title: e.target.value }))}
                        placeholder="Enter quiz title"
                      />
                    </div>
                    
                    {quizData.questions.map((question, qIndex) => (
                      <div key={qIndex} className="question-box">
                        <div className="form-group">
                          <label>Question {qIndex + 1}</label>
                          <input
                            type="text"
                            value={question.question}
                            onChange={(e) => handleQuestionChange(qIndex, 'question', e.target.value)}
                            placeholder="Enter your question"
                          />
                        </div>
                        
                        <div className="options-group">
                          {question.options.map((option, oIndex) => (
                            <div key={oIndex} className="option-item">
                              <input
                                type="text"
                                value={option}
                                onChange={(e) => handleOptionChange(qIndex, oIndex, e.target.value)}
                                placeholder={`Option ${oIndex + 1}`}
                              />
                              <input
                                type="radio"
                                name={`correct-${qIndex}`}
                                checked={question.correctAnswer === oIndex}
                                onChange={() => handleQuestionChange(qIndex, 'correctAnswer', oIndex)}
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                    
                    <button 
                      type="button" 
                      className="add-question-btn"
                      onClick={handleAddQuestion}
                    >
                      <i className="fas fa-plus"></i> Add Question
                    </button>

                    <div className="modal-actions">
                      <button type="button" onClick={() => setShowQuizModal(false)}>Cancel</button>
                      <button type="button" className="save-btn">Save Quiz</button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

export default AddCourse; 