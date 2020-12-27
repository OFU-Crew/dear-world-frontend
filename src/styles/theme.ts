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
    body: '#212E5A',
    activeMenu: '#20D7D7',
    sendButton: '#F8E36C',
    sendButtonHover: '#20D7D7',
    level0: '#445282',
    level1: '#F5EEC7',
    level2: '#F5EEC7',
    level3: '#F5EEC7',
    level4: '#F8E26C',
    level5: '#F8E26C',
  },
  color: {
    message: '#212E5A',
    menu: '#F4F7FF',
    activeMenu: '#212E5A',
    sendButton: '#212E5A',
    sendButtonHover: '#212E5A',
    messageCount: '#F8E36C',
  },
  borderColor: '#4a4b50',
  media,
};

const lightTheme: DefaultTheme = {
  backgroundColor: {
    body: '#F4F7FF',
    activeMenu: '#212E5A',
    sendButton: '#20D7D7',
    sendButtonHover: '#212E5A',
    level0: '#E5EAFF',
    level1: '#94FBFB',
    level2: '#77F1F1',
    level3: '#42E5E5',
    level4: '#22D7D7',
    level5: '#07C9C9',
  },
  color: {
    message: '#212E5A',
    menu: '#212E5A',
    activeMenu: '#F4F7FF',
    sendButton: '#F4F7FF',
    sendButtonHover: '#20D7D7',
    messageCount: '#2AD9D9',
  },
  borderColor: '#dcdcdc',
  media,
};

const themes = {
  dark: darkTheme,
  light: lightTheme,
};

export { themes };
