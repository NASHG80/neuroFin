// src/App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './app/page'; // Adjust path if needed
import LoginPage from './pages/LoginPage.jsx';
import SignupPage from './pages/SignupPage.jsx';
import Navbar from './components/Navbar.jsx';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;