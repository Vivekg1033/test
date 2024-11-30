import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Create a separate CSS file for styling

function Navbar() {
  return (
    <nav className="navbar">
      <ul className="nav-list">
        <li className="nav-item"><Link to="/">Home</Link></li>
        <li className="nav-item"><Link to="/UploadNotes">Notes</Link></li>
        {/* <li className="nav-item"><Link to="/upload-notes">Upload Notes</Link></li> */}
        <li className="nav-item"><Link to="/profile">Profile</Link></li>
        <li className="nav-item"><Link to="/ChatPage">ChatPage</Link></li>
        <li className="nav-item"><Link to="/elibrary">E-Library</Link></li>
        <li className="nav-item"><Link to="/story-upload">Story Upload</Link></li>

      </ul>
    </nav>
  );
}

export default Navbar;
