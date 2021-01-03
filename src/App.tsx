import React, { FC } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { RecoilRoot } from 'recoil';

import ThemeButton from './components/ThemeButton';
import { ThemeProvider } from './hooks/useTheme';
import { About, CheeringMap, DearWorld, NotFound } from './pages';
import { GlobalStyle } from './styles/global-styles';

const App: FC = () => {
  return (
    <RecoilRoot>
      <BrowserRouter>
        <ThemeProvider>
          <GlobalStyle />
          <Switch>
            <Route exact path="/" component={DearWorld} />
            <Route exact path="/cheering-map" component={CheeringMap} />
            <Route exact path="/about" component={About} />
            <Route component={NotFound} />
          </Switch>
          <ThemeButton />
        </ThemeProvider>
      </BrowserRouter>
    </RecoilRoot>
  );
};

export default App;
