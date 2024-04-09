import { Suspense } from 'react';
import Router from './routes/Router';
import { RecoilRoot } from 'recoil';
import { GlobalStyle } from './styles';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Logo } from './pages/HomePage';


const queryClient = new QueryClient();

function App() {

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