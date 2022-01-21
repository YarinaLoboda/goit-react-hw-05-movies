import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import * as moviesAPI from '../../services/movies-api';
import NotFoundMsg from '../../components/NotFoundMsg/NotFoundMsg';

export default function Reviews() {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    moviesAPI.fetchReviewsById(movieId).then(({ results }) => {
      setReviews(results);
    });
  }, [movieId]);

  return (
    <>
      {reviews.length > 0 ? (
        <ul>
          {reviews.map(el => (
            <li key={el.id}>
              <p>Author: {el.author}</p>
              <p>Reviews: {el.content}</p>
            </li>
          ))}
        </ul>
      ) : (
        <NotFoundMsg msg="No Reviews on this movie..." />
      )}
    </>
  );
}
