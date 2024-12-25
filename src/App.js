import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import AdminApp from "./admin/AdminApp";
import TeacherApp from './teacher/App'; // Correct import for TeacherApp
import LandingPage from "./landing/LandingPage";
import Contact from './landing/Contact';
import CourseCatalog from './landing/CourseCatalog';
import CourseDetail from './landing/CourseDetail'; 
import About from './landing/About'; 
import Login from './auth/Login';
import SignUp from './auth/SignUp';
import "./app.css";

function App() {
  return (
    <Router>
      <Routes>
        {/* Landing Page - Default Route */}
        <Route path="/" element={<LandingPage />} />
        
        {/* Public Routes */}
        <Route path="/courses" element={<CourseCatalog />} />
        <Route path="/course/:courseId" element={<CourseDetail />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />

        {/* Protected Routes */}
        <Route path="/admin/*" element={<AdminApp />} />
        <Route path="/teacher/*" element={<TeacherApp />} />  {/* This needs to use TeacherApp */}
        
        {/* Catch any unknown routes and redirect to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
