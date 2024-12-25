import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../common/Navbar';
import Sidebar from '../common/Sidebar';
import '../../styles/dashboard/addLessons.css';

function AddLessons() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [courseInfo, setCourseInfo] = useState(null);
  const [chapters, setChapters] = useState([]);
  const [currentChapter, setCurrentChapter] = useState({
    title: '',
    description: ''
  });
  const [currentLesson, setCurrentLesson] = useState({
    title: '',
    duration: '',
    videoFile: null,
    materials: []
  });
  const [videoPreview, setVideoPreview] = useState(null);

  // Fetch existing course information
  useEffect(() => {
    // Mock API call - replace with your actual API call
    setCourseInfo({
      id: courseId,
      title: "React Development Course",
      description: "Complete React Course"
    });
  }, [courseId]);

  const handleVideoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCurrentLesson(prev => ({
        ...prev,
        videoFile: file
      }));
      // Create video preview URL
      const url = URL.createObjectURL(file);
      setVideoPreview(url);
    }
  };

  const handleMaterialUpload = (e) => {
    const files = Array.from(e.target.files);
    setCurrentLesson(prev => ({
      ...prev,
      materials: [...prev.materials, ...files]
    }));
  };

  const handleAddChapter = () => {
    if (currentChapter.title) {
      setChapters(prev => [...prev, {
        ...currentChapter,
        id: Date.now(),
        lessons: []
      }]);
      setCurrentChapter({ title: '', description: '' });
    }
  };

  const handleAddLesson = (chapterId) => {
    if (currentLesson.title && currentLesson.videoFile) {
      setChapters(prev => prev.map(chapter => {
        if (chapter.id === chapterId) {
          return {
            ...chapter,
            lessons: [...chapter.lessons, { ...currentLesson, id: Date.now() }]
          };
        }
        return chapter;
      }));
      setCurrentLesson({
        title: '',
        duration: '',
        videoFile: null,
        materials: []
      });
      setVideoPreview(null);
    }
  };

  const handleSave = () => {
    // Save logic here
    console.log('Saving course content...');
    navigate(`/course/${courseId}`); // Navigate back to course details
  };

  return (
    <div className="dashboard-layout">
      <Navbar />
      <div className="dashboard-container">
        <Sidebar />
        <main className="dashboard-content">
          <div className="add-lessons-container">
            <div className="course-header">
              <h1>{courseInfo?.title}</h1>
              <button onClick={handleSave} className="save-button">
                <i className="fas fa-save"></i> Save Changes
              </button>
            </div>

            {/* Add Chapter Section */}
            <section className="add-chapter-section">
              <h2>Add New Chapter</h2>
              <div className="add-chapter-form">
                <input
                  type="text"
                  placeholder="Chapter Title"
                  value={currentChapter.title}
                  onChange={e => setCurrentChapter(prev => ({
                    ...prev,
                    title: e.target.value
                  }))}
                />
                <textarea
                  placeholder="Chapter Description"
                  value={currentChapter.description}
                  onChange={e => setCurrentChapter(prev => ({
                    ...prev,
                    description: e.target.value
                  }))}
                />
                <button onClick={handleAddChapter} className="primary-button">
                  <i className="fas fa-plus"></i> Add Chapter
                </button>
              </div>
            </section>

            {/* Chapters List */}
            <div className="chapters-list">
              {chapters.map(chapter => (
                <div key={chapter.id} className="chapter-card">
                  <div className="chapter-header">
                    <h3>{chapter.title}</h3>
                    <p>{chapter.description}</p>
                  </div>

                  {/* Lessons List */}
                  <div className="lessons-list">
                    {chapter.lessons.map(lesson => (
                      <div key={lesson.id} className="lesson-item">
                        <div className="lesson-info">
                          <i className="fas fa-play-circle"></i>
                          <span>{lesson.title}</span>
                        </div>
                        <div className="lesson-meta">
                          <span className="duration">{lesson.duration}</span>
                          <span className="materials">
                            {lesson.materials.length} materials
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Add Lesson Form */}
                  <div className="add-lesson-form">
                    <h4>Add New Lesson</h4>
                    <input
                      type="text"
                      placeholder="Lesson Title"
                      value={currentLesson.title}
                      onChange={e => setCurrentLesson(prev => ({
                        ...prev,
                        title: e.target.value
                      }))}
                    />
                    <input
                      type="text"
                      placeholder="Duration (e.g., 30 mins)"
                      value={currentLesson.duration}
                      onChange={e => setCurrentLesson(prev => ({
                        ...prev,
                        duration: e.target.value
                      }))}
                    />
                    
                    <div className="file-upload-section">
                      <div className="video-upload">
                        <label>Upload Video*</label>
                        <input
                          type="file"
                          accept="video/*"
                          onChange={handleVideoUpload}
                        />
                        {videoPreview && (
                          <video 
                            src={videoPreview} 
                            controls 
                            className="video-preview"
                          />
                        )}
                      </div>

                      <div className="materials-upload">
                        <label>Additional Materials (Optional)</label>
                        <input
                          type="file"
                          multiple
                          onChange={handleMaterialUpload}
                        />
                        {currentLesson.materials.length > 0 && (
                          <div className="materials-list">
                            {currentLesson.materials.map((file, index) => (
                              <div key={index} className="material-item">
                                <i className="fas fa-file"></i>
                                <span>{file.name}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    <button 
                      onClick={() => handleAddLesson(chapter.id)}
                      className="add-lesson-button"
                    >
                      <i className="fas fa-plus"></i> Add Lesson
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default AddLessons; 