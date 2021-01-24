import React, {
  createContext,
  FC,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';

import { themes } from '../styles/theme';

export const THEME = {
  LIGHT: 'light',
  DARK: 'dark',
};

const getMql = () =>
  window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)');

const getBrowserTheme = () => {
  const mql = getMql();

  return mql && mql.matches ? THEME.DARK : THEME.LIGHT;
};

const onBrowserThemeChanged = (callback: Function) => {
  const mql = getMql();
  const mqlListener = (e: MediaQueryListEvent) =>
    callback(e.matches ? THEME.DARK : THEME.LIGHT);

  mql && mql.addListener(mqlListener);

  return () => mql && mql.removeListener(mqlListener);
};

const getLocalStorageTheme = () => {
  try {
    const localTheme = localStorage && localStorage.getItem('theme');
    if (localTheme && [THEME.LIGHT, THEME.DARK].includes(localTheme)) {
      return localTheme;
    }
  } catch (err) {
    console.warn('Can’t access local storage:', err.message);
  }
};

const setLocalStorageTheme = (theme: string) => {
  try {
    localStorage && localStorage.setItem('theme', theme);
  } catch (err) {
    console.warn('Can’t write to local storage:', err.message);
  }
};

const ThemeContext = createContext<[string, Function]>(['', () => {}]);

export const ThemeProvider: FC = ({ children }) => {
  const [theme, setTheme] = useState<string>('');

  const updateTheme = useCallback(
    newTheme => {
      if (typeof newTheme === 'function') {
        setTheme(currentTheme => {
          const actualNewTheme = newTheme(currentTheme);
          setLocalStorageTheme(actualNewTheme);

          return actualNewTheme;
        });
      } else {
        setLocalStorageTheme(newTheme);
        setTheme(newTheme);
      }
    },
    [setTheme],
  );

  useEffect(() => {
    if (!theme) {
      setTheme(getLocalStorageTheme() || getBrowserTheme());
    }

    return onBrowserThemeChanged(updateTheme);
  }, [theme, updateTheme]);

  return useMemo(
    () => (
      <ThemeContext.Provider value={[theme, updateTheme]}>
        <StyledThemeProvider
          theme={theme === THEME.DARK ? themes.dark : themes.light}
        >
          {children}
        </StyledThemeProvider>
      </ThemeContext.Provider>
    ),
    [theme],
  );
};

export const useTheme = () => useContext(ThemeContext);
