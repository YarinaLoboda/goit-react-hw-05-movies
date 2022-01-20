import { useState, useEffect, lazy } from 'react';
import { useParams, Route } from 'react-router-dom';
import { useLocation, useHistory } from 'react-router-dom';
import { IMG_URL } from '../services/constList';
import * as moviesAPI from '../services/movies-api';
import { NavLink, useRouteMatch } from 'react-router-dom';
import styles from './MoviePage.module.css';
import styled from 'styled-components';

const Cast = lazy(() => import('./Cast.js' /* webpackChunkName: "Cast" */));
const Reviews = lazy(() =>
  import('./Reviews.js' /* webpackChunkName: "Reviews" */),
);

const GoBackButton = styled.button`
   {
    display: inline-block;
    margin: 15px;
    width: 120px;
    height: 40px;
    border: 1px solid #aaa;
    opacity: 0.6;
    font-weight: 600;
    transition: opacity 250ms cubic-bezier(0.4, 0, 0.2, 1);
    cursor: pointer;
    outline: none;
  }
  &: hover {
    opacity: 1;
  }
`;

export default function MovieDetailsPage() {
  const { url } = useRouteMatch();
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    moviesAPI.fetchMovieById(movieId).then(data => {
      setMovie(data);
    });
  }, [movieId]);

  const onGoBackClick = () => {
    history.push(location?.state?.from ?? '/');
  };

  return (
    <>
      <GoBackButton type="button" onClick={onGoBackClick}>
        &laquo; Go back
      </GoBackButton>
      <br />
      {movie && (
        <>
          <img
            src={IMG_URL + movie.poster_path}
            width={300}
            alt={movie.title}
          />
          <h2>
            {movie.title} ({movie.release_date.substr(0, 4)})
          </h2>
          <p>
            <b>User score: </b>
            {movie.vote_average * 10 + '%'}
          </p>
          <p>
            <b>Overview: </b>
            {movie.overview}
          </p>
          <p>
            <b>Genres: </b>

            {movie.genres.reduce(function (acc, curVal) {
              return acc + ' ' + curVal.name;
            }, '')}
          </p>
        </>
      )}
      <hr />
      <p>Additional information:</p>
      <ul>
        <li>
          <NavLink
            to={{
              pathname: `${url}/reviews`,
              state: { from: location },
            }}
            className={styles.link}
            activeClassName={styles.activeLink}
          >
            Reviews
          </NavLink>
        </li>
        <li>
          <NavLink
            to={{
              pathname: `${url}/cast`,
              state: { from: location },
            }}
            className={styles.link}
            activeClassName={styles.activeLink}
          >
            Cast
          </NavLink>
        </li>
      </ul>
      <hr />

      <Route path="/movies/:movieId/cast">
        <Cast />
      </Route>

      <Route path="/movies/:movieId/reviews">
        <Reviews />
      </Route>
    </>
  );
}
