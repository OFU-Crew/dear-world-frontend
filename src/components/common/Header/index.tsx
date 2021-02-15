import React, { FC } from 'react';

import { sizes } from '../../../constants';
import { useTheme, useWindowDimensions } from '../../../hooks';
import DesktopHeader from './Desktop';
import MobileHeader from './Mobile';
import MobileLeftLogoHeader from './MobileLeftLogo';

interface HeaderProps {
  isMessagePage?: boolean;
}

const Header: FC<HeaderProps> = ({ isMessagePage }) => {
  const [theme] = useTheme();
  const [width] = useWindowDimensions();

  return width > sizes.desktop ? (
    <DesktopHeader theme={theme} />
  ) : isMessagePage ? (
    <MobileLeftLogoHeader theme={theme} />
  ) : (
    <MobileHeader theme={theme} />
  );
};

export default Header;
