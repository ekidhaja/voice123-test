import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import SearchResultContextProvider from './contexts/SearchResultContext';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <SearchResultContextProvider>
      <App />
    </SearchResultContextProvider>
  </React.StrictMode>
);
