import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// تغییر ID برای جلوگیری از تداخل در وردپرس
const rootElement = document.getElementById('peikyar-root');

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} else {
  console.warn("PeikYar Plugin: Root element #peikyar-root not found. Shortcode might be missing.");
}