import React from 'react';
import { Link } from 'react-router-dom';
import ProfileDropdown from './ProfileDropdown';
import SearchBar from './SearchBar';
import Logo from './Logo';
import '../../styles/common/navbar.css';

function Navbar() {
  return (
    <nav className="teacher-container navbar">
      <div className="navbar-brand">
        <Link to="/teacher/dashboard">
          <Logo />
        </Link>
      </div>

      <div className="navbar-search">
        <SearchBar />
      </div>

      <div className="navbar-actions">
        <button className="notification-btn">
          <i className="fas fa-bell"></i>
          <span className="notification-badge">3</span>
        </button>
        <ProfileDropdown />
      </div>
    </nav>
  );
}

export default Navbar;