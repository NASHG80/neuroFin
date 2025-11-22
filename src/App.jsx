// src/App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './app/page';
import LoginPage from './pages/LoginPage.jsx';
import SignupPage from './pages/SignupPage.jsx';
import DashboardPage from './pages/DashboardPage.jsx';
import Navbar from './components/Navbar.jsx';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        {/* Note: In a real app, Navbar might not be shown on the Dashboard 
          or would be different. For now, we can conditionally render it 
          if needed, or just let the Dashboard handle its own layout 
          (which it does, creating a sidebar). 
          
          However, the current Navbar is transparent/fixed. 
          If we want to hide the global Navbar on /dashboard, 
          we can create a layout wrapper or use location check.
          For simplicity, we assume DashboardPage handles its own full screen UI.
        */}
        <Routes>
          <Route path="/" element={<><Navbar /><Home /></>} />
          <Route path="/login" element={<><Navbar /><LoginPage /></>} />
          <Route path="/signup" element={<><Navbar /><SignupPage /></>} />
          
          {/* Dashboard Route - Protected in real app */}
          <Route path="/dashboard" element={<DashboardPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;