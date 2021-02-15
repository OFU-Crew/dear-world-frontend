import React, { FC, useCallback } from 'react';
import styled from 'styled-components';

import { THEME, useTheme } from '../../hooks';

const ThemeButtonWrapper = styled.button`
  position: relative;
  width: 48px;
  height: 48px;
  background: 24px 24px no-repeat url(${props => props.theme.url.themeButton});
  background-position: 50% 50%;
  background-color: ${props => props.theme.backgroundColor.themeButton};
  border: 1px solid ${props => props.theme.borderColor.themeButton};
  box-sizing: border-box;
  border-radius: 30px;
  margin-left: 12px;
  outline: 0;
  cursor: pointer;
`;

const ThemeButton: FC = () => {
  const [theme, setTheme] = useTheme();
  const changeTheme = useCallback(
    () => setTheme(theme === THEME.LIGHT ? THEME.DARK : THEME.LIGHT),
    [theme, setTheme],
  );

  return <ThemeButtonWrapper onClick={changeTheme}></ThemeButtonWrapper>;
};

export default ThemeButton;
