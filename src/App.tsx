import React, { Suspense } from 'react';
import Router from './routes/Router';
import { RecoilRoot } from 'recoil';
import { GlobalStyle } from './styles';

function App() {
  return (
    <RecoilRoot>
      <Suspense fallback={<>loading</>}>
        <GlobalStyle />
        <Router />
      </Suspense>
    </RecoilRoot>
  );
}

export default App;