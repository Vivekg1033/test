import React from 'react';
import './Home.css';  // Import the CSS file for the Home page

function Home() {
  return (
    <div className="home">
      <div className="content">
        <h1 className="title">Welcome to E-college!</h1>
        <p className="description">
          Your go-to platform for sharing notes, stories, and more. Explore the features in the navbar above and make the most of your college life!
        </p>
        <button className="cta-button">Get Started</button>
      </div>
    </div>
  );
}

export default Home;
