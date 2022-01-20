import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import * as moviesAPI from '../services/movies-api';

const SearchForm = styled.form`
   {
    display: flex;
    align-items: center;
    width: 100%;
    background-color: #fff;
  }
`;
const SearchFormButton = styled.button`
   {
    display: inline-block;
    width: 80px;
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

const SearchFormInput = styled.input`
   {
    display: inline-block;
    width: 300px;
    height: 40px;
    margin: 15px;
    font: inherit;
    font-size: 20px;
    border: 1px solid #ccc;
    outline: none;
    padding-left: 4px;
    padding-right: 4px;
  }
  & :placeholder {
    font: inherit;
    font-size: 18px;
  }
`;

export default function MoviesPage() {
  const [querry, setQuerry] = useState('');
  const [searchResult, setSearchResult] = useState(null);

  useEffect(() => {
    if (!querry) {
      return;
    }
    moviesAPI.fetchSearchMovie(querry).then(({ results }) => {
      setSearchResult(results);
    });
  }, [querry]);

  const handleFormSubmit = evt => {
    evt.preventDefault();
    setQuerry(document.forms.querryForm.querry.value);
    document.forms.querryForm.querry.value = '';
  };

  return (
    <>
      <SearchForm name="querryForm" onSubmit={handleFormSubmit}>
        <SearchFormInput
          type="text"
          name="querry"
          autocomplete="off"
          autoFocus
          placeholder="Search movies "
          // value={querry}
          // onChange={handleChange}
        />
        <SearchFormButton type="submit">Search</SearchFormButton>
      </SearchForm>

      {searchResult && (
        <>
          <h2>Result by search "{querry}"</h2>
          <ul>
            {searchResult.map(el => (
              <li key={el.id}>
                <Link to={`./movies/${el.id}`}>{el.title}</Link>
              </li>
            ))}
          </ul>
        </>
      )}
    </>
  );
}
