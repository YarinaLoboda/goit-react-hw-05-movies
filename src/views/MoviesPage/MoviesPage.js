import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import * as moviesAPI from '../../services/movies-api';
import {
  SearchForm,
  SearchFormButton,
  SearchFormInput,
} from './MoviesPage.styled';

export default function MoviesPage() {
  const [query, setQuery] = useState('');
  const [searchResult, setSearchResult] = useState(null);

  useEffect(() => {
    if (!query) {
      return;
    }
    moviesAPI.fetchSearchMovie(query).then(({ results }) => {
      setSearchResult(results);
    });
  }, [query]);

  const handleFormSubmit = evt => {
    evt.preventDefault();
    setQuery(document.forms.queryForm.query.value);
    document.forms.queryForm.query.value = '';
  };

  return (
    <>
      <SearchForm name="queryForm" onSubmit={handleFormSubmit}>
        <SearchFormInput
          type="text"
          name="query"
          autocomplete="off"
          autoFocus
          placeholder="Search movies "
        />
        <SearchFormButton type="submit">Search</SearchFormButton>
      </SearchForm>

      {searchResult && (
        <>
          <h2>Result by search "{query}"</h2>
          <ul>
            {searchResult.map(el => (
              <li key={el.id}>
                <Link
                  to={{
                    pathname: `./movies/${el.id}`,
                  }}
                >
                  {el.title}
                </Link>
              </li>
            ))}
          </ul>
        </>
      )}
    </>
  );
}
