import './index.css';
import App from './App.tsx';
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { Header } from './components/shared/header.tsx';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <Header />
      <App />
      <Toaster />
    </QueryClientProvider>
  </BrowserRouter>,
);
