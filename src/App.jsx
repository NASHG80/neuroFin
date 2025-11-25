import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Home from './app/page';
import LoginPage from './pages/LoginPage.jsx';
import SignupPage from './pages/SignupPage.jsx';
import DashboardPage from './pages/DashboardPage.jsx';
import AssistantPage from './pages/AssistantPage.jsx'; // Make sure to import this
import Navbar from './components/Navbar.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import LaunchNotesSection from './components/LaunchNotesSection'; 
import ForCompaniesSection from './components/ForCompaniesSection';
import SpendsBudgetsSection from './components/SpendsBudgetsSection';
// Layout component to conditionally render Navbar
const Layout = ({ children }) => {
  const location = useLocation();
  
  // Hide global Navbar on Dashboard AND Assistant pages
  const showNavbar = !['/dashboard', '/assistant'].includes(location.pathname);

  return (
    <>
      {showNavbar && <Navbar />}
      {children}
    </>
  );
};

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/launch" element={<LaunchNotesSection />} /> 
          <Route path="/for-companies" element={<ForCompaniesSection />} />
          <Route path="/spends-budgets" element={<SpendsBudgetsSection />} />
          
          {/* Protected Routes */}
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/assistant" 
            element={
              <ProtectedRoute>
                <AssistantPage />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;