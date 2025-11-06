import { Navigate } from 'react-router-dom';
import { useUser } from '../../context/UserContext';
import type { ReactNode } from 'react';

interface ProtectedRouteProps {
  children: ReactNode;
  requireAdmin?: boolean;
}

const ProtectedRoute = ({ children, requireAdmin = false }: ProtectedRouteProps) => {
  const { isAuthenticated, isAdmin } = useUser();

  // Check if user is authenticated first
  if (!isAuthenticated()) {
    // Redirect to home if not authenticated
    return <Navigate to="/" replace />;
  }

  // If route requires admin and user is not admin, redirect to home
  if (requireAdmin && !isAdmin()) {
    return <Navigate to="/" replace />;
  }

  // User is authenticated and has proper role
  return <>{children}</>;
};

export default ProtectedRoute;