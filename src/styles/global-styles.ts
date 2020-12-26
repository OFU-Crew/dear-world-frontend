import { createGlobalStyle } from 'styled-components';
import { normalize } from 'styled-normalize';

export const GlobalStyle = createGlobalStyle`
  ${normalize}

  body {
    margin: 0;
    padding: 0;
    font-family: 'Inter UI', -apple-system, BlinkMacSystemFont, 'Roboto',
        'Segoe UI', Helvetica, Arial, sans-serif;
    font-size: 1rem;
    font-weight: 600;
    background-color: ${props => props.theme.backgroundColor.first};
    color: ${props => props.theme.color.first};
    -webkit-font-smoothing: antialiased;
    -webkit-overflow-scrolling: touch;
    -webkit-text-size-adjust: 100%;
  }
`;
