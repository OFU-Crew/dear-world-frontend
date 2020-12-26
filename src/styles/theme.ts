import { DefaultTheme } from 'styled-components';
import baseStyled, {
  css,
  CSSProp,
  ThemedStyledInterface,
} from 'styled-components';

import { Media } from './styled';

const sizes: { [key: string]: number } = {
  mobile: 320,
  tablet: 768,
  desktop: 1024,
};

type BackQuoteArgs = string[];

const media: Media = {
  mobile: (...args: BackQuoteArgs) => undefined,
  tablet: (...args: BackQuoteArgs) => undefined,
  desktop: (...args: BackQuoteArgs) => undefined,
};

Object.keys(sizes).reduce((acc: Media, label: string) => {
  switch (label) {
    case 'desktop':
      acc.desktop = (...args: BackQuoteArgs) =>
        css`
          @media only screen and (min-width: ${sizes.desktop}px) {
            ${args}
          }
        `;
      break;
    case 'tablet':
      acc.tablet = (...args: BackQuoteArgs) =>
        css`
          @media only screen and (max-width: ${sizes.desktop}px) and (min-width: ${sizes.tablet}px) {
            ${args}
          }
        `;
      break;
    case 'mobile':
      acc.mobile = (...args: BackQuoteArgs) =>
        css`
          @media only screen and (max-width: ${sizes.tablet}px) {
            ${args}
          }
        `;
      break;
    default:
      break;
  }

  return acc;
}, media);

const darkTheme: DefaultTheme = {
  backgroundColor: {
    first: '#292a2d',
    secondary: '#3b3d42',
  },
  color: {
    first: '#a9a9b3',
    secondary: '#73747b',
  },
  borderColor: '#4a4b50',
  media,
};

const lightTheme: DefaultTheme = {
  backgroundColor: {
    first: '#fff',
    secondary: '#eaeaea',
  },
  color: {
    first: '#222',
    secondary: '#999',
  },
  borderColor: '#dcdcdc',
  media,
};

const themes = {
  dark: darkTheme,
  light: lightTheme,
};

export { themes };
