import React from 'react';
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import Home from './home';
import FlashCards from './flashcards';
import './index.css';



function App() {
  return (
    <BrowserRouter>
    <header>
      <nav>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/flash-cards">Flash Cards</NavLink>
      </nav>
    </header>
     <main>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/flash-cards" element={<FlashCards />} />
      </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
