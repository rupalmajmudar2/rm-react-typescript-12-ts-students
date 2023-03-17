import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import Rocket from './components/Rocket'
import { StudentComponent } from './components/Student';
import { QueryClient, QueryClientProvider } from "react-query";
import CharApp from './components/CharModel';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const queryClient = new QueryClient();
root.render(
  <React.StrictMode>
    <App />
    <Rocket />
    <QueryClientProvider client={queryClient}>
      <StudentComponent />
    </QueryClientProvider>
  </React.StrictMode>
);