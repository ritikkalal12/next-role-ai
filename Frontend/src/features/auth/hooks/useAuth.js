// this file is used to create a custom hook for authentication

import { useContext } from 'react';
import { AuthConext } from '../auth.context.jsx';
import { login, logout, register, getMe } from '../services/auth.api.js';

// Custom hook to access authentication context to manage user state and loading state throughout the application
export const useAuth = () => {
  const context = useContext(AuthConext);
  const { user, setUser, loading, setLoading } = context;

  // Function to handle user login by calling the login API and updating the user state
  const handleLogin = async (email, password) => {
    setLoading(true);
    const data = await login(email, password);
    setUser(data.user);
    setLoading(false);
  };

  // Function to handle user registration by calling the register API and updating the user state
  const handleRegister = async (username, email, password) => {
    setLoading(true);
    const data = await register(username, email, password);
    setUser(data.user);
    setLoading(false);
  };

  // Function to handle user logout by calling the logout API and clearing the user state
  const handleLogout = async () => {
    setLoading(true);
    const data = await logout();
    setUser(null);
    setLoading(false);
  };

  return {
    user,
    loading,
    handleRegister,
    handleLogin,
    handleLogout,
  };
};
