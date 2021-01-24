import React, { FC } from 'react';

import { sizes } from '../../../constants';
import { useTheme, useWindowDimensions } from '../../../hooks';
import DesktopHeader from './Desktop';
import MobileHeader from './Mobile';

const Header: FC = props => {
  const [theme] = useTheme();
  const [width] = useWindowDimensions();

  return width > sizes.desktop ? (
    <DesktopHeader theme={theme} />
  ) : (
    <MobileHeader theme={theme} />
  );
};

export default Header;
