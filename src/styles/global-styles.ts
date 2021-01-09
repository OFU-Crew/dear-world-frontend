import { createGlobalStyle } from 'styled-components';
import { normalize } from 'styled-normalize';

export const GlobalStyle = createGlobalStyle`
  ${normalize}

  html, body, #app {
    height: 100%; 
  }

  body {
    margin: 0;
    padding: 0;
    font-family: 'Inter UI', -apple-system, BlinkMacSystemFont, 'Roboto',
        'Segoe UI', Helvetica, Arial, sans-serif;
    font-size: 1rem;
    font-weight: 600;
    background-color: ${props => props.theme.backgroundColor.body};
    -webkit-font-smoothing: antialiased;
    -webkit-overflow-scrolling: touch;
    -webkit-text-size-adjust: 100%;
  }

  img.emoji {
    height: 1em;
    width: 1em;
    margin: 0 .05em 0 .1em;
    vertical-align: -0.1em;
 }

  button {
    outline: 0;
    cursor: pointer;
  }

  ul {
    list-style:none;
    padding-left:0px;
  }
`;
