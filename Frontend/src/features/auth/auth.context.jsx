// this file defines the authentication context for the application, allowing components to access and manage authentication state throughout the app.

import { createContext, useState } from 'react';

// Create the AuthContext to hold the authentication state and functions
export const AuthConext = createContext();

// Create the AuthProvider component to wrap around the app and provide authentication state
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // State to hold the current user
  const [loading, setLoading] = useState(false); // State to indicate if authentication is in progress

  return (
    <AuthConext.Provider value={{ user, setUser, loading, setLoading }}>
      {children}{' '}
      {/* Render the child components that will have access to the authentication context */}
    </AuthConext.Provider>
  );
};
