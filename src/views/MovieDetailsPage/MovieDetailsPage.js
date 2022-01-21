import { useState, useEffect, lazy } from 'react';
import { useParams, Route } from 'react-router-dom';
import { useLocation, useHistory } from 'react-router-dom';
import * as moviesAPI from '../../services/movies-api';
import { NavLink, useRouteMatch } from 'react-router-dom';
import getImg from '../../services/getImg';
import styles from './MovieDetailsPage.module.css';
import GoBackButton from '../GoBackButton.styled';

const Cast = lazy(() =>
  import('../Cast/Cast.js' /* webpackChunkName: "Cast" */),
);
const Reviews = lazy(() =>
  import('../Reviews/Reviews.js' /* webpackChunkName: "Reviews" */),
);

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
          <img src={getImg(movie)} width={300} alt={movie.title} />
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
