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
    body: '#131E44',
    header: '#212E5A',
    activeMenu: '#D6DDFB',
    sendButton: '#F8E36C',
    sendButtonHover: '#D6DDFB',
    cheerRank: '#2E3D6D',
    card: '#212E5A',
    activeHeart: '#fa3766',
    heart: '#46537E',
    level0: '#445282',
    level1: '#9D9D9C',
    level2: '#E3DAA7',
    level3: '#F8E36C',
    level4: '#FFE134',
    level5: '#FFE600',
    filter: '#212E5A',
    themeButton: '#212E5A',
  },
  color: {
    message: '#212E5A',
    menu: '#F4F7FF',
    activeMenu: '#212E5A',
    sendButton: '#212E5A',
    sendButtonHover: '#212E5A',
    messageCount: '#F8E36C',
    messageNickname: '#F4F7FF',
    messageCountry: '#D6DDFB',
    messageDescription: '#D6DDFB',
    cheerCount: '#D6DDFB',
    filter: '#F4F7FF',
    search: '#445282',
    selectedFilterItem: '#F8E36C',
  },
  borderColor: {
    cheerRank: '#445282',
    filter: '#445282',
    themeButton: '#F8E36C',
  },
  url: {
    filterArrow: '/images/filter-arrow-dark.svg',
    messageBg: '/images/message-bg-dark.svg',
    shareButton: '/images/share-button-dark.svg',
    shareButtonHover: '/images/share-button-hover-dark.svg',
    themeButton: '/images/theme-dark.svg',
  },
  media,
};

const lightTheme: DefaultTheme = {
  backgroundColor: {
    body: '#F4F7FF',
    header: '#F4F7FF',
    activeMenu: '#212E5A',
    sendButton: '#20D7D7',
    sendButtonHover: '#212E5A',
    cheerRank: '#fff',
    card: '#fff',
    activeHeart: '#fa3766',
    heart: '#d6ddfb',
    level0: '#E5EAFF',
    level1: '#94FBFB',
    level2: '#77F1F1',
    level3: '#42E5E5',
    level4: '#22D7D7',
    level5: '#07C9C9',
    filter: '#f4f7ff',
    themeButton: '#F4F7FF',
  },
  color: {
    message: '#212E5A',
    menu: '#212E5A',
    card: '#212E5A',
    activeMenu: '#F4F7FF',
    sendButton: '#F4F7FF',
    sendButtonHover: '#20D7D7',
    messageCount: '#2AD9D9',
    messageNickname: '#212E5A',
    messageCountry: '#445282',
    messageDescription: '#212E5A',
    cheerCount: '#445282',
    filter: '#212E5A',
    search: '#D6DDFB',
    selectedFilterItem: '#2AD9D9',
  },
  borderColor: {
    cheerRank: '#F4F7FF',
    filter: '#D6DDFB',
    themeButton: '#212E5A',
  },
  url: {
    filterArrow: '/images/filter-arrow.svg',
    messageBg: '/images/message-bg.svg',
    shareButton: '/images/share-button.svg',
    shareButtonHover: '/images/share-button-hover.svg',
    themeButton: '/images/theme.svg',
  },
  media,
};

const themes = {
  dark: darkTheme,
  light: lightTheme,
};

export { themes };
