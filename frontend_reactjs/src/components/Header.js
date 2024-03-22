// Header.js

import React, { useState } from 'react';

function Header() {
  const [showPopup, setShowPopup] = useState(true);

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  return (
    <div className="header-container">
      {showPopup && (
        <div className="popup-container">
          <div className="popup">      
            <p>
              This website is currently undergoing updates. Learn more about upcoming features/projects and site navigation{" "}
              <a href="https://www.linkedin.com/in/rachakonda-dharmendra/" rel="noopener noreferrer">
                Here
              </a>{" "}
              <span className="close-popup" onClick={handleClosePopup}>
                ✕
              </span>
            </p>
          </div>
        </div>
      )}

      <header className={`header ${showPopup ? 'header-with-popup' : ''}`}>
        <nav className="nav">
          <div className="logo">
            <a href="./#home">
              <span className="logo-text">DevOps ∞ Journey</span>
            </a>
          </div>
        </nav>
        <nav className="nav">
          <ul className="nav-links">
            <li>
              <a href="./#home">Home</a>
            </li>
            <li>
              <a href="./#about">About</a>
            </li>
            <li>
              <a href="./#projects">Projects</a>
            </li>
            <li>
              <a href="./#contact">Contact</a>
            </li>
          </ul>
          <div className="hamburger">
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
          </div>
        </nav>
      </header>
    </div>
  );
}

export default Header;
