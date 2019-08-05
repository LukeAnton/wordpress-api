import React, { useState, useEffect, Fragment } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
const BookItem = ({ book: { id, title, excerpt, featured_media, author } }) => {
  const [imgUrl, setImgUrl] = useState("");
  const [auth, setAuthor] = useState(author);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const getImageUrl = axios.get(`/wp-json/wp/v2/media/${featured_media}`);
    const getAuthor = axios.get(`/wp-json/wp/v2/users/${author}`);

    Promise.all([getImageUrl, getAuthor]).then(res => {
      setImgUrl(res[0].data.media_details.sizes.full.source_url);
      setAuthor(res[1].data.name);
      setIsLoaded(true);
    });
  }, [author, featured_media]);

  return (
    <div>
      {isLoaded ? (
        <Fragment>
          <h1 style={{ marginBottom: "0" }}>{title.rendered}</h1>
          <small>
            Review by <strong>{author}</strong>
          </small>
          <img style={{ width: "100%" }} src={imgUrl} alt={title.rendered} />
          <div dangerouslySetInnerHTML={{ __html: excerpt.rendered }} />
          <Link to={`/book/${id}`}>Read Review</Link>
          <hr />
        </Fragment>
      ) : null}
    </div>
  );
};

export default BookItem;
