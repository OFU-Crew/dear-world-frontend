import React, { FC, useCallback, useState } from 'react';
import { Helmet } from 'react-helmet';

import { THEME, useTheme } from '../hooks/useTheme';

const ThemeClassOnBody: FC = () => {
  const [theme] = useTheme();

  return (
    <Helmet>
      <body className={theme} />
    </Helmet>
  );
};

const ThemeButton = () => {
  const [theme, setTheme] = useTheme();
  const changeTheme = useCallback(
    () => setTheme(theme === THEME.LIGHT ? THEME.DARK : THEME.LIGHT),
    [theme, setTheme],
  );

  return (
    <>
      <ThemeClassOnBody />
      <button onClick={changeTheme}>Change Theme</button>
    </>
  );
};

export default ThemeButton;
