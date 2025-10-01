import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
// --- Import Page Components ---
import HomePage from './Components/HomePage';
import LogIn from './Components/Login';
import RegisterPage from './Components/RegisterPage';
import Header from './Components/Header';
import Loader from './Components/Loader';
import PointerAnimation from './Components/PointerAnimation';




// --- Corrected Import Path for AboutUs if needed ---
// Make sure this component exists at the specified path
// import AboutUs from './components/AboutUs'; 

function App() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      <PointerAnimation />
      {loading && <Loader onFinish={() => setLoading(false)} />}

      {!loading && (
        <>
          <Header />

          {/* The <Routes> component handles switching between pages */}
          <Routes>
            {/* Route for the Home Page */}
            <Route path="/" element={<HomePage />} />

            {/* Route for the Login Page */}
            <Route path="/login" element={<LogIn />} />

            {/* Route for the Registration Page */}
            <Route path="/register" element={<RegisterPage />} />
            
            {/* You can add more routes here later, e.g., for a user dashboard */}
            {/* <Route path="/dashboard" element={<Dashboard />} /> */}
          </Routes>
        </>
      )}
    </>
  );
}

export default App;