
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';

// Polyfill essencial para o objeto 'process' no ambiente do navegador.
// Muitas bibliotecas (incluindo o SDK do Gemini) esperam que 'process.env' exista.
// Sem isso, o app pode sofrer um ReferenceError fatal antes mesmo de montar o React.
if (typeof (window as any).process === 'undefined') {
  (window as any).process = { 
    env: {
      // As variáveis de ambiente injetadas pelo Vercel estarão acessíveis via process.env
    } 
  };
}

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
