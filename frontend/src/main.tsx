import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app'; // Corrigido para usar App.tsx corretamente
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
