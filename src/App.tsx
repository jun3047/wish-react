import React, { Suspense, useEffect } from 'react';
import Router from './routes/Router';
import { RecoilRoot } from 'recoil';
import { GlobalStyle } from './styles';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Logo } from './pages/HomePage';
import { trackEvent } from './apis/logging/amplitude';


const queryClient = new QueryClient();

function App() {

  useEffect(()=>{
    trackEvent('loadedtest: react 시작')
  }, [])

  return (
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <Suspense fallback={<Logo>loading...</Logo>}>
          <GlobalStyle />
          <Router />
        </Suspense>
      </QueryClientProvider>
    </RecoilRoot>
  );
}

export default App;