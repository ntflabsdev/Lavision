import React from 'react';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  // Auth state is now handled via localStorage token
  const token = localStorage.getItem('token');

  // Simulate loading state if needed (optional)
  // You can add a loading state if you want to check token asynchronously

  if (!token) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
