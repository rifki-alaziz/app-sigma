// src/components/ProtectedRoute.tsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  adminOnly?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, adminOnly = false }) => {
  const { user } = useAuth();

  // Kalau belum login → redirect ke /login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Kalau route khusus admin → cek role
  if (adminOnly && user.role !== 'admin') {
    return <Navigate to="/" replace />;
  }

  // Kalau lolos semua → render children
  return <>{children}</>;
};

export default ProtectedRoute;
