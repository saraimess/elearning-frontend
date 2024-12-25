import React, { useState, useRef } from 'react';
import Navbar from '../common/Navbar';
import Sidebar from '../common/Sidebar';
import '../../styles/dashboard/courseDetails.css';
import Breadcrumb from '../common/Breadcrumb';

function CourseDetails() {
  const breadcrumbItems = [
    { label: 'Dashboard', link: '/teacher/dashboard' },
    { label: 'My Courses', link: '/teacher/my-courses' },
    { label: 'React JS Basic to Advance' }
  ];

  const [selectedLesson, setSelectedLesson] = useState(null);
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const chapters = [
    {
      id: 1,
      title: "Introduction to the Course",
      duration: "45 min",
      lessons: [
        { 
          id: 1, 
          title: "Welcome to the Course", 
          duration: "10 min", 
          isCompleted: true,
          video: "https://example.com/video1.mp4",
          pdf: "/materials/welcome-guide.pdf",
          materials: [
            { type: 'video', url: 'https://example.com/video1.mp4', title: 'Welcome Video' },
            { type: 'pdf', url: '/materials/welcome-guide.pdf', title: 'Course Guide' }
          ]
        },
        { 
          id: 2, 
          title: "Course Overview", 
          duration: "15 min", 
          isCompleted: true,
          materials: [
            { type: 'video', url: 'https://example.com/video2.mp4', title: 'Overview Video' },
            { type: 'pdf', url: '/materials/course-outline.pdf', title: 'Course Outline' }
          ]
        },
        { 
          id: 3, 
          title: "Setting Up Your Environment", 
          duration: "20 min", 
          isCompleted: false,
          materials: [
            { type: 'video', url: 'https://example.com/video3.mp4', title: 'Setup Tutorial' },
            { type: 'pdf', url: '/materials/setup-guide.pdf', title: 'Setup Documentation' }
          ]
        }
      ]
    },
    {
      id: 2,
      title: "Basic Concepts",
      duration: "1h 30min",
      lessons: [
        { 
          id: 4, 
          title: "Core Fundamentals", 
          duration: "30 min", 
          isCompleted: false,
          materials: [
            { type: 'video', url: 'https://example.com/video4.mp4', title: 'Fundamentals Lecture' },
            { type: 'pdf', url: '/materials/fundamentals.pdf', title: 'Study Material' }
          ]
        },
        { 
          id: 5, 
          title: "Building Blocks", 
          duration: "30 min", 
          isCompleted: false,
          materials: [
            { type: 'video', url: 'https://example.com/video5.mp4', title: 'Building Blocks Tutorial' },
            { type: 'pdf', url: '/materials/building-blocks.pdf', title: 'Reference Guide' }
          ]
        }
      ]
    }
  ];

  const [selectedMaterial, setSelectedMaterial] = useState(null);

  const handleLessonClick = (lesson) => {
    setSelectedLesson(lesson);
    if (lesson.materials && lesson.materials.length > 0) {
      setSelectedMaterial(lesson.materials[0]); // Select first material by default
    }
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  return (
    <div className="dashboard-layout">
      <Navbar />
      <div className="dashboard-container">
        <Sidebar />
        <main className="dashboard-content">
          <Breadcrumb items={breadcrumbItems} />
          
          <div className="course-details-header">
            <h1>React JS Basic to Advance</h1>
            <div className="course-meta">
              <span><i className="fas fa-book-open"></i> 25 Lessons</span>
              <span><i className="fas fa-clock"></i> 20 Hours</span>
              <span><i className="fas fa-chart-line"></i> 45% Complete</span>
            </div>
          </div>

          <div className="course-content">
            {selectedLesson && (
              <div className="lesson-viewer">
                <div className="lesson-header">
                  <h2>{selectedLesson.title}</h2>
                  <div className="material-tabs">
                    {selectedLesson.materials.map((material, index) => (
                      <button
                        key={index}
                        className={`material-tab ${selectedMaterial === material ? 'active' : ''}`}
                        onClick={() => setSelectedMaterial(material)}
                      >
                        <i className={`fas ${material.type === 'video' ? 'fa-play-circle' : 'fa-file-pdf'}`}></i>
                        {material.title}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="material-viewer">
                  {selectedMaterial?.type === 'video' ? (
                    <div className="video-player-container">
                      <div className="video-player">
                        <video
                          ref={videoRef}
                          src={selectedMaterial.url}
                          onTimeUpdate={handleTimeUpdate}
                          onLoadedMetadata={handleLoadedMetadata}
                          onPlay={() => setIsPlaying(true)}
                          onPause={() => setIsPlaying(false)}
                        >
                          Your browser does not support the video tag.
                        </video>
                      </div>
                      <div className="video-controls">
                        <button 
                          className="play-pause-btn"
                          onClick={() => videoRef.current[isPlaying ? 'pause' : 'play']()}
                        >
                          <i className={`fas fa-${isPlaying ? 'pause' : 'play'}`}></i>
                        </button>
                        <div className="progress-bar">
                          <div 
                            className="progress"
                            style={{ width: `${(currentTime / duration) * 100}%` }}
                          ></div>
                        </div>
                        <div className="time-display">
                          {formatTime(currentTime)} / {formatTime(duration)}
                        </div>
                        <button 
                          className="fullscreen-btn"
                          onClick={() => videoRef.current.requestFullscreen()}
                        >
                          <i className="fas fa-expand"></i>
                        </button>
                      </div>
                      <div className="video-info">
                        <h3>{selectedMaterial.title}</h3>
                        <div className="video-actions">
                          <button className="action-btn">
                            <i className="fas fa-bookmark"></i> Save
                          </button>
                          <button className="action-btn">
                            <i className="fas fa-download"></i> Download
                          </button>
                          <button className="action-btn">
                            <i className="fas fa-share"></i> Share
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="pdf-viewer">
                      <iframe
                        src={selectedMaterial.url}
                        title="PDF Viewer"
                        width="100%"
                        height="600px"
                      />
                    </div>
                  )}
                </div>
              </div>
            )}

            <div className="chapters-container">
              {chapters.map(chapter => (
                <div key={chapter.id} className="chapter-card">
                  <div className="chapter-header">
                    <h3>{chapter.title}</h3>
                    <span className="chapter-duration">
                      <i className="fas fa-clock"></i> {chapter.duration}
                    </span>
                  </div>
                  <div className="lessons-list">
                    {chapter.lessons.map(lesson => (
                      <div 
                        key={lesson.id} 
                        className={`lesson-item ${lesson.isCompleted ? 'completed' : ''} ${selectedLesson?.id === lesson.id ? 'active' : ''}`}
                        onClick={() => handleLessonClick(lesson)}
                      >
                        <div className="lesson-info">
                          <i className={`fas ${lesson.isCompleted ? 'fa-check-circle' : 'fa-play-circle'}`}></i>
                          <span>{lesson.title}</span>
                        </div>
                        <div className="lesson-meta">
                          <span className="lesson-duration">{lesson.duration}</span>
                          <div className="material-icons">
                            {lesson.materials?.map(material => (
                              <i key={material.type} className={`fas ${material.type === 'video' ? 'fa-play' : 'fa-file-pdf'}`}></i>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
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

export default CourseDetails; 