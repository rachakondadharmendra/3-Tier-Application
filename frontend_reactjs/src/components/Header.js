import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="header">
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
  );
}

export default Header;
