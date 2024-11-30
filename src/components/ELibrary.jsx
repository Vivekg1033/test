import React, { useState } from "react";
import "./ELibrary.css";

const ELibrary = () => {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchBooks = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${searchTerm || "engineering"}`
      );
      const data = await response.json();
      setBooks(data.items || []);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
    setLoading(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchBooks();
  };

  return (
    <div className="elibrary">
      <h1>E-Library</h1>
      <form onSubmit={handleSearch} className="search-bar">
        <input
          type="text"
          placeholder="Search for engineering books..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      {loading ? (
        <p>Loading books...</p>
      ) : (
        <div className="books-container">
          {books.length > 0 ? (
            books.map((book) => (
              <div key={book.id} className="book-card">
                <img
                  src={
                    book.volumeInfo.imageLinks?.thumbnail ||
                    "https://via.placeholder.com/128x193.png?text=No+Image"
                  }
                  alt={book.volumeInfo.title}
                />
                <div className="book-info">
                  <h3>{book.volumeInfo.title}</h3>
                  <p>
                    <strong>Authors:</strong>{" "}
                    {book.volumeInfo.authors?.join(", ") || "N/A"}
                  </p>
                  <a
                    href={book.volumeInfo.previewLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Preview Book
                  </a>
                </div>
              </div>
            ))
          ) : (
            <p>No books found. Try searching for something else!</p>
          )}
        </div>
      )}
    </div>
  );
};

export default ELibrary;
