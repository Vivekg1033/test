import React, { useState } from 'react';
import './ProfilePage.css';  // Import CSS for styling

function ProfilePage() {
  // State variables for profile information
  const [name, setName] = useState('John Doe');
  const [bio, setBio] = useState('A passionate learner and web developer');
  const [contact, setContact] = useState('johndoe@gmail.com');
  const [skills, setSkills] = useState('JavaScript, React, Node.js, CSS');
  
  // Temporary default image and profile image state
  const [profileImage, setProfileImage] = useState('https://media.istockphoto.com/id/183879742/photo/3d-cartoon-model-of-a-man-standing-with-arms-crossed.jpg?s=2048x2048&w=is&k=20&c=-buuAEUFUCuXbG2KXkfQnfRlbU2YXUK0CUkj9PdcMtA=');  // Default image URL
  
  // To toggle between edit and view modes
  const [isEditing, setIsEditing] = useState(false);

  // Handle image file selection
  const handleProfileImageChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setProfileImage(reader.result);  // Update the profile image
    };
    if (file) {
      reader.readAsDataURL(file);  // Read the file as a data URL
    }
  };

  // Handle editing the profile details
  const handleEditProfile = () => {
    setIsEditing(true);
  };

  const handleSaveProfile = () => {
    setIsEditing(false);
    // Here, you could add logic to save the data to localStorage or a database if necessary
  };

  return (
    <div className="profile-page">
      <div className="profile-container">
        <div className="profile-header">
          <div className="profile-image">
            <img src={profileImage} alt="Profile" />
            <input 
              type="file" 
              accept="image/*" 
              onChange={handleProfileImageChange} 
              id="profileImageInput" 
            />
          </div>
          <div className="profile-info">
            <h2>{name}</h2>
            <p>{bio}</p>
            <p>{contact}</p>
            <p>{skills}</p>
            <button className="edit-btn" onClick={handleEditProfile}>Edit Profile</button>
          </div>
        </div>

        {isEditing && (
          <div className="profile-edit">
            <h3>Edit Profile</h3>
            <form onSubmit={(e) => e.preventDefault()}>
              <div>
                <label>Name:</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <label>Bio:</label>
                <textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                />
              </div>
              <div>
                <label>Contact:</label>
                <input
                  type="text"
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                />
              </div>
              <div>
                <label>Skills:</label>
                <input
                  type="text"
                  value={skills}
                  onChange={(e) => setSkills(e.target.value)}
                />
              </div>
              <div>
                <label>Profile Image:</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleProfileImageChange}
                />
              </div>
              <button onClick={handleSaveProfile}>Save</button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProfilePage;
