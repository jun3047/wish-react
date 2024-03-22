import React, { Suspense } from 'react';
import Router from './routes/Router';
import { RecoilRoot } from 'recoil';
import { GlobalStyle } from './styles';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';


const queryClient = new QueryClient();

function App() {
  return (
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <Suspense fallback={<h1>loading...</h1>}>
          <GlobalStyle />
          <Router />
        </Suspense>
      </QueryClientProvider>
    </RecoilRoot>
  );
}

export default App;