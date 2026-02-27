import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Home from "./app/page";
import AssistantPage from "./pages/AssistantPage.jsx";
import Navbar from "./components/Navbar.jsx";

// Layout component to conditionally render Navbar
const Layout = ({ children }) => {
  const location = useLocation();
  const showNavbar = location.pathname !== "/assistant";

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
          {/* Home */}
          <Route path="/" element={<Home />} />

          {/* Chatbot */}
          <Route path="/assistant" element={<AssistantPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
