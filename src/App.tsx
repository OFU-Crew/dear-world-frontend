import 'react-toastify/dist/ReactToastify.css';

import React, { FC, Suspense } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { RecoilRoot } from 'recoil';

import { ThemeProvider } from './hooks';
import { About, CheeringMap, DearWorld, NotFound } from './pages';
import { GlobalStyle } from './styles/global-styles';

const App: FC = () => {
  return (
    <RecoilRoot>
      <BrowserRouter>
        <ToastContainer hideProgressBar={true} />
        <ThemeProvider>
          <GlobalStyle />
          <Switch>
            <Route exact path="/" component={DearWorld} />
            <Route exact path="/cheering-map" component={CheeringMap} />
            <Route exact path="/about" component={About} />
            <Route component={NotFound} />
          </Switch>
        </ThemeProvider>
      </BrowserRouter>
    </RecoilRoot>
  );
};

export default App;
