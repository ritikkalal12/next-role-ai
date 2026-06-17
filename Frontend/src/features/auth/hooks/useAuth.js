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
    try {
      const data = await login(email, password);
      setUser(data.user);
    } catch (error) {
      console.error('Login failed:', error);
    } finally {
      setLoading(false);
    }
  };

  // Function to handle user registration by calling the register API and updating the user state
  const handleRegister = async (username, email, password) => {
    setLoading(true);
    try {
      const data = await register(username, email, password);
      setUser(data.user);
    } catch (error) {
      console.error('Registration failed:', error);
    } finally {
      setLoading(false);
    }
  };

  // Function to handle user logout by calling the logout API and clearing the user state
  const handleLogout = async () => {
    setLoading(true);
    try {
      const data = await logout();
      setUser(null);
    } catch (error) {
      console.error('Logout failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return {
    user,
    loading,
    handleRegister,
    handleLogin,
    handleLogout,
  };
};
