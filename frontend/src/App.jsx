import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import SignupPage from "./pages/SignupPage/SignupPage";
import AdminPage from "./pages/AdminPage/AdminPage";
import Dashboard from "./components/Dashboard/Dashboard";
import ContactCenter from "./components/ContactCenter/ContactCenter";
import Analytics from "./components/Analytics/Analytics";
import Chatbot from "./components/Chatbot/Chatbot";
import Teams from "./components/Teams/Teams";
import Settings from "./components/Settings/Settings";
import ProtectedRoute from "./ProtectedRoute";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
function App() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 700);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 700);
    // console.log(isMobile,handleResize());

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  
  return (
    <div className="App">
      {isMobile ? (
        <Router>
          <Routes>
            <Route path="/" element={<HomePage/>} />
          </Routes>
        </Router>
      ) : (
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <AdminPage />
                </ProtectedRoute>
              }
            >
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="contact-center" element={<ContactCenter />} />
              <Route path="analytics" element={<Analytics />} />
              <Route path="chatbot" element={<Chatbot />} />
              <Route path="teams" element={<Teams />} />
              <Route path="settings" element={<Settings />} />
            </Route>
          </Routes>
        </Router>
      )}

      <ToastContainer
        position="top-center"
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        autoClose={3000}
      />
    </div>
  );
}

export default App;
