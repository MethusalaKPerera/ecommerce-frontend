import { Navigate } from 'react-router-dom';
import { useUser } from '../../context/UserContext';
import type { ReactNode } from 'react';

interface ProtectedRouteProps {
  children: ReactNode;
  requireAdmin?: boolean;
}

const ProtectedRoute = ({ children, requireAdmin = false }: ProtectedRouteProps) => {
  const { isAuthenticated, isAdmin } = useUser();

  // If route requires admin and user is not admin
  if (requireAdmin && !isAdmin()) {
    return <Navigate to="/" replace />;
  }
   // If route requires authentication and user is not authenticated
  if (requireAdmin && !isAuthenticated()) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;