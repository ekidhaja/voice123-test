import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './views/Home';
import NotFound from './views/NotFound';
import Search from './views/Search';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <div className="nav">
          <div className="logo-div">
            <img src="/search-logo.png" alt="logo" />
          </div>
        </div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
