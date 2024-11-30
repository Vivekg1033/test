import React, { useState } from 'react';

function StoryUpload() {
  const [story, setStory] = useState({ title: '', content: '' });
  const [stories, setStories] = useState(JSON.parse(localStorage.getItem('stories')) || []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStory({ ...story, [name]: value });
  };

  const handleSubmit = () => {
    const newStories = [...stories, story];
    setStories(newStories);
    localStorage.setItem('stories', JSON.stringify(newStories));
    setStory({ title: '', content: '' });
  };

  return (
    <div>
      <h2>Upload Story</h2>
      <input
        type="text"
        name="title"
        value={story.title}
        onChange={handleChange}
        placeholder="Story Title"
      />
      <textarea
        name="content"
        value={story.content}
        onChange={handleChange}
        placeholder="Story Content"
      />
      <button onClick={handleSubmit}>Upload</button>

      <h3>Uploaded Stories</h3>
      <ul>
        {stories.map((story, index) => (
          <li key={index}>
            <h4>{story.title}</h4>
            <p>{story.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default StoryUpload;
