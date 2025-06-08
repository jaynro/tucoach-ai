import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { ClerkProvider } from '@clerk/clerk-react';
import LandingPage from './components/LandingPage';
import InterviewApp from './components/InterviewApp';
import WaitlistForm from './components/WaitlistForm';
import ProtectedRoute from './components/ProtectedRoute';

// Import your publishable key
const PUBLISHABLE_KEY = process.env.REACT_APP_CLERK_PUBLISHABLE_KEY || 'pk_test_placeholder';

function App() {
  return (
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <HelmetProvider>
        <Router>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/app" element={
              <ProtectedRoute>
                <InterviewApp />
              </ProtectedRoute>
            } />
            <Route path="/entrevista" element={
              <ProtectedRoute>
                <InterviewApp />
              </ProtectedRoute>
            } />
            <Route path="/waitlist" element={<WaitlistForm />} />
          </Routes>
        </Router>
      </HelmetProvider>
    </ClerkProvider>
  );
}

export default App;