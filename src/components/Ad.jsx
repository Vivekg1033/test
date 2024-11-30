import React from 'react';
import './Ad.css';

function Ad() {
  return (
    <div className="ad-container">
      <div className="ad-item">
        <img src={require('../assets/images/e-library.png')} alt="Room Ad 1" />
        <h3>Room for Rent - ABC Location</h3>
        <p>Contact for more details</p>
        <button className="ad-btn">Contact Now</button>
      </div>
      <div className="ad-item">
        <img src={require('../assets/images/e-library.png')} alt="Room Ad 2" />
        <h3>Room for Rent - XYZ Location</h3>
        <p>Contact for more details</p>
        <button className="ad-btn">Contact Now</button>
      </div>
    </div>
  );
}

export default Ad;
