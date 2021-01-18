import { DefaultTheme } from 'styled-components';
import baseStyled, {
  css,
  CSSProp,
  ThemedStyledInterface,
} from 'styled-components';

import { sizes } from '../constants';
import { Media } from './styled';

type BackQuoteArgs = string[];

const media: Media = {
  mobile: (...args: BackQuoteArgs) => undefined,
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
    case 'mobile':
      acc.mobile = (...args: BackQuoteArgs) =>
        css`
          @media only screen and (max-width: ${sizes.mobile}px) {
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
    cheerRank: '#2E3D6D',
    level0: '#445282',
    level1: '#9D9D9C',
    level2: '#E3DAA7',
    level3: '#F8E36C',
    level4: '#FFE134',
    level5: '#FFE600',
    filter: '#212E5A',
  },
  color: {
    message: '#212E5A',
    menu: '#F4F7FF',
    activeMenu: '#212E5A',
    sendButton: '#212E5A',
    sendButtonHover: '#212E5A',
    messageCount: '#F8E36C',
    cheerCount: '#D6DDFB',
    filter: '#F4F7FF',
    search: '#445282',
    selectedFilterItem: '#F8E36C',
  },
  borderColor: {
    cheerRank: '#445282',
    filter: '#445282',
  },
  url: {
    filterArrow: '/images/filter-arrow-dark.svg',
  },
  media,
};

const lightTheme: DefaultTheme = {
  backgroundColor: {
    body: '#F4F7FF',
    activeMenu: '#212E5A',
    sendButton: '#20D7D7',
    sendButtonHover: '#212E5A',
    cheerRank: '#fff',
    card: '#fff',
    level0: '#E5EAFF',
    level1: '#94FBFB',
    level2: '#77F1F1',
    level3: '#42E5E5',
    level4: '#22D7D7',
    level5: '#07C9C9',
    filter: '#f4f7ff',
  },
  color: {
    message: '#212E5A',
    menu: '#212E5A',
    card: '#212E5A',
    activeMenu: '#F4F7FF',
    sendButton: '#F4F7FF',
    sendButtonHover: '#20D7D7',
    messageCount: '#2AD9D9',
    cheerCount: '#445282',
    filter: '#212E5A',
    search: '#D6DDFB',
    selectedFilterItem: '#2AD9D9',
  },
  borderColor: {
    cheerRank: '#F4F7FF',
    filter: '#D6DDFB',
  },
  url: {
    filterArrow: '/images/filter-arrow.svg',
  },
  media,
};

const themes = {
  dark: darkTheme,
  light: lightTheme,
};

export { themes };
