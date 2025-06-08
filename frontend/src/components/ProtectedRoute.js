import React from 'react';
import { useAuth } from '@clerk/clerk-react';
import { SignIn } from '@clerk/clerk-react';
import LoadingSpinner from './LoadingSpinner';

const ProtectedRoute = ({ children }) => {
  const { isSignedIn, isLoaded } = useAuth();

  if (!isLoaded) {
    return <LoadingSpinner />;
  }

  if (!isSignedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full">
          <SignIn 
            redirectUrl="/app"
            signUpUrl="/sign-up"
          />
        </div>
      </div>
    );
  }

  return children;
};

export default ProtectedRoute;