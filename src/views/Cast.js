import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { IMG_URL } from '../services/constList';
import * as moviesAPI from '../services/movies-api';
import NotFoundMsg from './NotFoundMsg';

export default function Cast() {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);

  useEffect(() => {
    moviesAPI.fetchCastsById(movieId).then(({ cast }) => {
      setCast(cast);
    });
  }, [movieId]);

  return (
    <>
      {cast.length > 0 ? (
        <ul>
          {cast.map(el => (
            <li key={el.id}>
              <img src={IMG_URL + el.profile_path} alt={el.name} width={150} />
              <p>{el.name}</p>
            </li>
          ))}
        </ul>
      ) : (
        <NotFoundMsg msg="No CAST found !" />
      )}
    </>
  );
}
