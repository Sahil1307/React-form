import styled, {createGlobalStyle} from 'styled-components';

const GlobalStyle = createGlobalStyle`
  html {
    height: 100%;
    @media(max-height: 660px) {
    height: fit-content;
    margin-top:20px;
    margin-bottom: 20px;
  }
  }

  body {
    font-family: Arial, Helvetica, sans-serif;
    background: cadetblue;
    height: 100%;
    
  }
`;

export default GlobalStyle;