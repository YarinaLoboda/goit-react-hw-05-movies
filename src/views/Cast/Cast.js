import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import * as moviesAPI from '../../services/movies-api';
import NotFoundMsg from '../../components/NotFoundMsg/NotFoundMsg';
import getImg from '../../services/getImg';

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
              <img src={getImg(el)} alt={el.name} width={150} />
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
