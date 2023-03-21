import React from 'react';
import ReactDOM from 'react-dom/client';
import { StudentComponent } from './components/Student';
import { QueryClient, QueryClientProvider } from "react-query";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const queryClient = new QueryClient();
console.log("Starting index.tsx render");
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <div>StartRender</div>
      <StudentComponent />
      <div>StopRender</div>
    </QueryClientProvider>
  </React.StrictMode>
);
console.log("Done index.tsx render");