import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { isAuthenticated, getUser } from '../utils/auth';

export default function ProtectedRoute({ requireAdmin = false, requireRole }) {
  const authed = isAuthenticated();
  const location = useLocation();
  if (!authed) {
    return <Navigate to="/b2blogin" replace state={{ from: location.pathname }} />;
  }
  if (requireAdmin || requireRole) {
    const user = getUser();
    const role = user?.role || 'user';
    if (requireRole) {
      if (role !== requireRole) {
        return <Navigate to="/" replace />;
      }
    } else if (role !== 'admin' && role !== 'superadmin') {
      return <Navigate to="/" replace />;
    }
  }
  return <Outlet />;
}


