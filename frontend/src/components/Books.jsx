import React, { useState, useEffect } from "react";
import axios from "axios";
import BookItem from "./BookItem";
const Books = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios
      .get("/wp-json/wp/v2/books")
      .then(res => {
        setBooks(res.data);
        setLoading(true);
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <div>
      {loading ? (
        books.map(book => <BookItem key={book.id} book={book} />)
      ) : (
        <h2>Loading.....</h2>
      )}
    </div>
  );
};

export default Books;
