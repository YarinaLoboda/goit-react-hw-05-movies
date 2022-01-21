import styled from 'styled-components';

export const SearchForm = styled.form`
   {
    display: flex;
    align-items: center;
    width: 100%;
    background-color: #fff;
  }
`;
export const SearchFormButton = styled.button`
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

export const SearchFormInput = styled.input`
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
