import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import './index.css';
import { LucidProvider } from './context/LucidProvider';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <LucidProvider>
      <App />
    </LucidProvider>
  </React.StrictMode>
);