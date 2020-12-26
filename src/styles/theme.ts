// src/styles/theme.ts
import { DefaultTheme } from 'styled-components';

const darkTheme: DefaultTheme = {
  backgroundColor: {
    first: '#292a2d',
    secondary: '#3b3d42',
    level0: '#445282',
    level1: '#F5EEC7',
    level2: '#F5EEC7',
    level3: '#F5EEC7',
    level4: '#F8E26C',
    level5: '#F8E26C',
  },
  color: {
    first: '#a9a9b3',
    secondary: '#73747b',
  },
  borderColor: '#4a4b50',
};

const lightTheme: DefaultTheme = {
  backgroundColor: {
    first: '#f4f7ff',
    secondary: '#eaeaea',
    level0: '#E5EAFF',
    level1: '#94FBFB',
    level2: '#77F1F1',
    level3: '#42E5E5',
    level4: '#22D7D7',
    level5: '#07C9C9',
  },
  color: {
    first: '#212e5a',
    secondary: '#999',
  },
  borderColor: '#dcdcdc',
};

const themes = {
  dark: darkTheme,
  light: lightTheme,
};

export { themes };
