import React from 'react';
import './App.css';
import { HomePage, GamePage } from './pages';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

export const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/game/:level' element={<GamePage />} />
          <Route path='*' element={<h1>404 Not Found</h1>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
