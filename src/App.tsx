import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import Dashboard from './components/Dashboard';
import Courses from './components/Courses';
import Subscription from './components/Subscription';
import AITutor from './components/AITutor';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/subscription" element={<Subscription />} />
          <Route path="/ai-tutor" element={<AITutor />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;