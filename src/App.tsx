import React, { FC } from 'react';

import Hello from './components/Hello';
import ThemeButton from './components/ThemeButton';
import { ThemeProvider } from './hooks/useTheme';
import { GlobalStyle } from './styles/global-styles';

const App: FC = () => {
  return (
    <ThemeProvider>
      <GlobalStyle />
      <Hello name="React" />
      <ThemeButton />
    </ThemeProvider>
  );
};

export default App;
