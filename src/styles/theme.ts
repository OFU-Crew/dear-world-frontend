// src/styles/theme.ts
import { DefaultTheme } from 'styled-components';

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
};

const themes = {
  dark: darkTheme,
  light: lightTheme,
};

export { themes };
