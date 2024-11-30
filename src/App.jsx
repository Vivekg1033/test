import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar'; // Import Navbar
import Home from './components/Home';
import ChatPage from './components/ChatPage';
import ELibrary from './components/ELibrary';
import StoryUpload from './components/StoryUpload';
import UploadNotes from './components/UploadNotes';
import ProfilePage from './components/ProfilePage';

function App() {
  return (
    <Router>
      <div>
        <Navbar /> {/* Add Navbar to the top */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/ChatPage" element={<ChatPage />} />
          <Route path="/elibrary" element={<ELibrary />} />
          <Route path="/story-upload" element={<StoryUpload />} />
          <Route path="/UPloadnotes" element={<UploadNotes />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
