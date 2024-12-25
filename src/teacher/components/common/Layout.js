import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';  // Make sure Navbar is correct
import Sidebar from './Sidebar'; // Make sure Sidebar is correct

function Layout() {
  return (
    <div className="teacher-container dashboard-layout">
      <Navbar />  {/* Navbar should be fixed at the top */}
      <div className="dashboard-container">
        <Sidebar />  {/* Sidebar should be on the left */}
        <main className="main-content">
          <Outlet />  {/* The content of the selected route will be rendered here */}
        </main>
      </div>
    </div>
  );
}

export default Layout;
