import React from 'react';
import { BrowserRouter, Routes, Route, Link, NavLink } from 'react-router-dom';
import Home from './home';
import FlashCards from './flashcards';
import './index.css';
// import ContactMe from './contactme';



function App() {
  return (
    <BrowserRouter>
    <header>
      <nav>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/flash-cards">Flash Cards</NavLink>
        {/* <NavLink to="/contactMe">Contact Me</NavLink> */}
      </nav>
    </header>
     <main>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/flash-cards" element={<FlashCards />} />
        {/* <Route path="/messages" element={<ContactMe />} /> */}
      </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
