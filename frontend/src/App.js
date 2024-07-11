import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import "./styles.css";
import SignInForm from "./SignIn";
import SignUpForm from "./SignUp";
import Dashboard from "./Dashboard";
import DetailedReport from "./DetailedReport";

function App() {
  const [type, setType] = useState("signIn");

  const handleOnClick = (text) => {
    if (text !== type) {
      setType(text);
    }
  };

  const containerClass = "container " + (type === "signUp" ? "right-panel-active" : "");

  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<AuthPage type="signUp" handleOnClick={handleOnClick} containerClass={containerClass} />} />
        <Route path="/signin" element={<AuthPage type="signIn" handleOnClick={handleOnClick} containerClass={containerClass} />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/detailed_report" element={<DetailedReportPage />} />
        <Route path="*" element={<Navigate to="/signin" />} />
      </Routes>
    </Router>
  );
}

function AuthPage({ type, handleOnClick, containerClass }) {
  return (
    <div className="App">
      <h2>Expense Tracker</h2>
      <div className={containerClass} id="container">
        <SignUpForm />
        <SignInForm />
        <div className="overlay-container">
          <div className="overlay">
            {type === "signIn" ? (
              <div className="overlay-panel overlay-left">
                <h1>Welcome Back!</h1>
                <p>To keep connected with us please login with your personal info</p>
                <button className="ghost" id="signUp" onClick={() => handleOnClick("signUp")}>
                  Sign Up
                </button>
              </div>
            ) : (
              <div className="overlay-panel overlay-right">
                <h1>Hello, Friend!</h1>
                <p>Enter your personal details and start your journey with us</p>
                <button className="ghost" id="signIn" onClick={() => handleOnClick("signIn")}>
                  Sign In
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function DashboardPage() {
  return (
    <div className="App">
      <h2>Dashboard</h2>
      <Dashboard />
    </div>
  );
}

function DetailedReportPage() {
  return (
    <div className="App">
      <h2>Detailed Report</h2>
      <DetailedReport />
    </div>
  );
}

export default App;
