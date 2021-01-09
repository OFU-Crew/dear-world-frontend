import React, { FC } from 'react';

import { sizes } from '../../constants';
import { useTheme, useWindowDimensions } from '../../hooks';
import DesktopHeader from './Desktop';
import MobileHeader from './Mobile';

interface HeaderProps {
  messageCount?: number;
}

const Header: FC<HeaderProps> = props => {
  const [theme] = useTheme();
  const [width] = useWindowDimensions();

  return width < sizes.mobile ? (
    <MobileHeader theme={theme} messageCount={props.messageCount!} />
  ) : (
    <DesktopHeader theme={theme} />
  );
};

export default Header;
