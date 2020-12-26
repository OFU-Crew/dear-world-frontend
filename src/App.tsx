import './styles/layout.css';

import React, { FC } from 'react';

import Hello from './components/Hello';
import ThemeButton from './components/ThemeButton';
import { ThemeProvider } from './hooks/useTheme';

const App: FC = props => {
  return (
    <>
      <ThemeProvider>
        <Hello name="React" />
        <ThemeButton />
      </ThemeProvider>
    </>
  );
};

export default App;
