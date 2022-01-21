import styled from 'styled-components';

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

export default GoBackButton;
