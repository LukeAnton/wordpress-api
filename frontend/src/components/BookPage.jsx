import React, { useState, Fragment, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
const BookPage = props => {
  const [book, setBook] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    axios
      .get(`/wp-json/wp/v2/books/${props.match.params.id}`)
      .then(res => {
        setBook(res.data);
        setIsLoaded(true);
      })
      .catch(err => console.log(err));
  }, [props.match.params.id]);

  return (
    <div>
      {isLoaded ? (
        <Fragment>
          <Link to="/">Go Back</Link>
          <hr />
          <h1>{book.title.rendered}</h1>
          <div dangerouslySetInnerHTML={{ __html: book.content.rendered }} />
          <h4>Publisher: {book.acf.publisher} </h4>
        </Fragment>
      ) : (
        <div>Loading....</div>
      )}
    </div>
  );
};

export default BookPage;
