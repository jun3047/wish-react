import React, { Suspense } from 'react';
import Router from './routes/Router';
import { RecoilRoot } from 'recoil';
import { GlobalStyle } from './styles';


function App() {
  return (
    <RecoilRoot>
        <Suspense fallback={<h1>loading...</h1>}>
          <GlobalStyle />
          <Router />
        </Suspense>
    </RecoilRoot>
  );
}

export default App;