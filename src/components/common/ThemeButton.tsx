import React, { FC, useCallback } from 'react';
import styled from 'styled-components';

import { THEME, useTheme } from '../../hooks';

const ThemeButtonWrapper = styled.div`
  position: fixed;
  bottom: 10px;
  left: 10px;
`;

const ThemeButton: FC = () => {
  const [theme, setTheme] = useTheme();
  const changeTheme = useCallback(
    () => setTheme(theme === THEME.LIGHT ? THEME.DARK : THEME.LIGHT),
    [theme, setTheme],
  );

  return (
    <ThemeButtonWrapper>
      <button onClick={changeTheme}>Change Theme</button>
    </ThemeButtonWrapper>
  );
};

export default ThemeButton;
