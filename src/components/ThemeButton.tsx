import React, { FC, useCallback } from 'react';

import { THEME, useTheme } from '../hooks/useTheme';

const ThemeButton: FC = () => {
  const [theme, setTheme] = useTheme();
  const changeTheme = useCallback(
    () => setTheme(theme === THEME.LIGHT ? THEME.DARK : THEME.LIGHT),
    [theme, setTheme],
  );

  return <button onClick={changeTheme}>Change Theme</button>;
};

export default ThemeButton;
