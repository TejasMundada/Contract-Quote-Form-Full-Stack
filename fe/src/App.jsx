import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import QuoteForm from "./components/QuoteForm";
import Dashboard from "./components/Dashboard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<QuoteForm />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
