import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useMsal } from '@azure/msal-react';
 
const ProtectedRoute = ({ children  }) => {
  const { accounts } = useMsal();
  const isAuthenticated = accounts.length > 0;
 
  return (
    isAuthenticated === true ? children : <Navigate to="/" replace />
  );
};
 
export default ProtectedRoute;