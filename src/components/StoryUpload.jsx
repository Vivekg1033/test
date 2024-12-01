import React, { useState } from 'react';
import './StoryUpload.css';

const StoryUpload = () => {
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState('');
  const [stories, setStories] = useState([]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (image && description) {
      const newStory = { image, description };
      setStories([newStory, ...stories]);
      setImage(null);
      setDescription('');
    }
  };

  return (
    <div className="story-upload-container">
      <h1>Upload Your Story</h1>
      <form onSubmit={handleSubmit} className="upload-section">
        <div className="upload-preview">
          {image ? (
            <img src={image} alt="Story Preview" className="preview-image" />
          ) : (
            <span className="upload-placeholder">Upload Image</span>
          )}
        </div>
        <input
          type="file"
          id="file-input"
          className="file-input"
          accept="image/*"
          onChange={handleImageUpload}
        />
        <label htmlFor="file-input" className="file-input-label">
          Choose Image
        </label>
        <textarea
          className="description-input"
          placeholder="Describe your experience..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button type="submit" className="submit-button">
          Post Story
        </button>
      </form>

      <div className="stories-display">
        {stories.map((story, index) => (
          <div key={index} className="story">
            <div className="story-circle">
              <img src={story.image} alt="Story" className="story-image" />
            </div>
            <p className="story-description">{story.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StoryUpload;
