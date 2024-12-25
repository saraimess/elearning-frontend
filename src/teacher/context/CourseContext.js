import React, { createContext, useContext, useState } from 'react';

const CourseContext = createContext();

export function CourseProvider({ children }) {
  const [courseProgress, setCourseProgress] = useState({});

  const updateLessonProgress = (courseId, lessonId, completed) => {
    setCourseProgress(prev => ({
      ...prev,
      [courseId]: {
        ...prev[courseId],
        [lessonId]: completed
      }
    }));
  };

  return (
    <CourseContext.Provider value={{ courseProgress, updateLessonProgress }}>
      {children}
    </CourseContext.Provider>
  );
}

export function useCourseProgress() {
  return useContext(CourseContext);
}