import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ShopContextProvider from './Context/ShopContext.jsx';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
      <QueryClientProvider client={queryClient}>
    <ShopContextProvider>
      <App />
    </ShopContextProvider>
      </QueryClientProvider>
  </BrowserRouter>
);
