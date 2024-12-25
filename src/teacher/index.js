import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import TeacherApp from './TeacherApp';
import './styles/global.css'; // Add global styles

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <TeacherApp />
    </Router>
  </React.StrictMode>
);