import { Switch, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import Navigation from './components/Navigation/Navigation';
const HomePage = lazy(() =>
  import('./views/HomePage/HomePage.js' /* webpackChunkName: "Home-page" */),
);
const MoviesPage = lazy(() =>
  import(
    './views/MoviesPage/MoviesPage.js' /* webpackChunkName: "Movie-page" */
  ),
);
const MovieDetailsPage = lazy(() =>
  import(
    './views/MovieDetailsPage/MovieDetailsPage.js' /* webpackChunkName: "MovieDetails-page" */
  ),
);
const NotFoundMsg = lazy(() =>
  import('./components/NotFoundMsg/NotFoundMsg.js' /* webpackChunkName: "NotFoundMsg" */),
);

export default function App() {
  return (
    <>
      <Navigation />
      <Suspense fallback={<h2>L O A D I N G . . . </h2>}>
        <Switch>
          <Route path="/" exact>
            <HomePage />
          </Route>
          <Route path="/movies/:movieId">
            <MovieDetailsPage />
          </Route>

          <Route path="/movies">
            <MoviesPage />
          </Route>

          <Route>
            <NotFoundMsg msg="Page is not find !" />
          </Route>
        </Switch>
      </Suspense>
    </>
  );
}
