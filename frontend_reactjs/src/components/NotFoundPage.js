import React from 'react';
import '../styles/notfound.css'; // Import CSS styles

const imageUrl = `${process.env.REACT_APP_IMAGE_FOLDER_PATH}`;

// NotFoundPage Component
const NotFoundPage = () => {
  // Define the main color
  const mainColor = '#24344c'; // Main color for styling

  // Style for header and footer
  const headerFooterStyle = {
    backgroundColor: mainColor // Set background color
  };

  // Style for body
  const bodyStyle = {
    backgroundColor: mainColor, // Set background color
    minHeight: '100vh', // Ensure the body covers the entire viewport height
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative' // Added to contain dust particles
  };

  return (
    <div className="error-page permission_denied" style={bodyStyle}>
      {/* Dust particles */}
      <div className="dust-container">
        {[...Array(50)].map((_, index) => (
          <div
            key={index}
            className="dust-particle"
            style={{
              top: `${Math.random() * 100}vh`, // Randomize vertical position
              left: `${Math.random() * 100}vw`, // Randomize horizontal position
              animationDelay: `${Math.random() * 15}s` // Randomize animation delay for each particle
            }}
          />
        ))}
      </div>

      {/* Header */}
      <header id="header" style={headerFooterStyle}>
        {/* Header content */}
      </header>

      {/* Body content */}
      <div className="denied__wrapper">
        <h1>404</h1>
        <h3>
          LOST IN <span>SPACE</span> Portfolio? Hmm, looks like that page doesn't
          exist.
        </h3>
        <img id="planet" src={`${imageUrl}/planet.svg`} alt="Planet" />
        <a href="/"><button className="denied__link">Go Home</button></a>
        <img id="astronaut" src={`${imageUrl}/astronaut.svg`} alt="Astronaut" />
      </div>

      {/* Footer */}
      <footer id="footer" style={headerFooterStyle}>
        {/* Footer content */}
      </footer>
    </div>
  );
};

export default NotFoundPage;
