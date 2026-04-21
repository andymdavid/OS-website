import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import { App } from './App';
import './globals.css';

const container = document.getElementById('root');

if (container) {
  createRoot(container).render(
    <StrictMode>
      <HelmetProvider>
        <App />
      </HelmetProvider>
    </StrictMode>
  );
}
