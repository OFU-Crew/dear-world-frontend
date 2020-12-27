import React, { FC } from 'react';

import Hello from './components/Hello';
import ThemeButton from './components/ThemeButton';
import { ThemeProvider } from './hooks/useTheme';
import CheeringMap from './pages/CheeringMap';
import { GlobalStyle } from './styles/global-styles';

const App: FC = () => {
  return (
    <ThemeProvider>
      <GlobalStyle />
      <CheeringMap />
    </ThemeProvider>
  );
};

export default App;
