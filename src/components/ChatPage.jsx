import React, { useState } from "react";
import EmojiPicker from "emoji-picker-react"; // Import Emoji Picker
import "./ChatPage.css";

const ChatPage = () => {
  const [publicMessages, setPublicMessages] = useState([]);
  const [privateMessages, setPrivateMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [privateMessage, setPrivateMessage] = useState("");
  const [currentContact, setCurrentContact] = useState(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  // Dummy contact list (replace with actual data)
  const contacts = [
    { id: 1, name: "Alice", avatar: "https://source.unsplash.com/100x100/?person" },
    { id: 2, name: "Bob", avatar: "https://source.unsplash.com/100x100/?man" },
    { id: 3, name: "Charlie", avatar: "https://source.unsplash.com/100x100/?woman" },
  ];

  // Handle public message submission
  const handlePublicMessageSubmit = () => {
    if (message.trim()) {
      setPublicMessages([...publicMessages, { sender: "You", text: message }]);
      setMessage("");
    }
  };

  // Handle private message submission
  const handlePrivateMessageSubmit = () => {
    if (privateMessage.trim() && currentContact) {
      setPrivateMessages([
        ...privateMessages,
        { sender: "You", recipient: currentContact.name, text: privateMessage },
      ]);
      setPrivateMessage("");
    }
  };

  // Add emoji to message
  const handleEmojiClick = (emoji) => {
    setMessage(message + emoji.emoji);
  };

  const handlePrivateEmojiClick = (emoji) => {
    setPrivateMessage(privateMessage + emoji.emoji);
  };

  return (
    <div className="chat-page">
      <div className="chat-container">
        {/* Public Chat Section */}
        <div className="public-chat">
          <h3>Public Chat</h3>
          <div className="messages">
            {publicMessages.map((msg, index) => (
              <div key={index} className="message">
                <strong>{msg.sender}:</strong> {msg.text}
              </div>
            ))}
          </div>
          <div className="message-input">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your public message..."
              onKeyDown={(e) => e.key === "Enter" && handlePublicMessageSubmit()}
            />
            <button onClick={handlePublicMessageSubmit}>Send</button>
            <button onClick={() => setShowEmojiPicker(!showEmojiPicker)}>😊</button>
            {showEmojiPicker && (
              <div className="emoji-picker">
                <EmojiPicker onEmojiClick={handleEmojiClick} />
              </div>
            )}
          </div>
        </div>

        {/* Private Chat Section */}
        <div className="private-chat">
          <h3>Private Chat</h3>
          <div className="contact-list">
            {contacts.map((contact) => (
              <div
                key={contact.id}
                className={`contact ${currentContact?.id === contact.id ? "active" : ""}`}
                onClick={() => setCurrentContact(contact)}
              >
                <img src={contact.avatar} alt={contact.name} />
                <p>{contact.name}</p>
              </div>
            ))}
          </div>

          {currentContact && (
            <div className="private-chat-box">
              <h4>Chat with {currentContact.name}</h4>
              <div className="messages">
                {privateMessages
                  .filter((msg) => msg.recipient === currentContact.name)
                  .map((msg, index) => (
                    <div key={index} className="message">
                      <strong>{msg.sender}:</strong> {msg.text}
                    </div>
                  ))}
              </div>
              <div className="message-input">
                <input
                  type="text"
                  value={privateMessage}
                  onChange={(e) => setPrivateMessage(e.target.value)}
                  placeholder={`Type your message to ${currentContact.name}...`}
                  onKeyDown={(e) => e.key === "Enter" && handlePrivateMessageSubmit()}
                />
                <button onClick={handlePrivateMessageSubmit}>Send</button>
                <button onClick={() => setShowEmojiPicker(!showEmojiPicker)}>😊</button>
                {showEmojiPicker && (
                  <div className="emoji-picker">
                    <EmojiPicker onEmojiClick={handlePrivateEmojiClick} />
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
