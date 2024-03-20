// RouteGuard.js

import React, { useEffect } from 'react';
import { useMsal } from '@azure/msal-react';
import { Redirect } from 'react-router-dom';

const RouteGuard = ({ children }) => {
  const { accounts } = useMsal();

  useEffect(() => {
    // Check your authentication conditions here
    if (!accounts || accounts.length === 0) {
      alert("User is not authenticated")
      window.location.href = '/contact'; // You can customize the login route
    }
  }, [accounts]);

  return <>{children}</>;
};

export default RouteGuard;
