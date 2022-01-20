import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import * as moviesAPI from '../services/movies-api';

export default function HomePage() {
  const location = useLocation();
  const [movies, setMovies] = useState(null);

  useEffect(() => {
    moviesAPI.fetchMovies().then(({ results }) => {
      setMovies(results);
    });
  }, []);

  return (
    <>
      {movies && (
        <>
          <h2>Trending today</h2>
          <ul>
            {movies.map(movie => (
              <li key={movie.id}>
                <Link
                  to={{
                    pathname: `./movies/${movie.id}`,
                    state: { from: location },
                  }}
                >
                  {movie.title}
                </Link>
              </li>
            ))}
          </ul>
        </>
      )}
    </>
  );
}
