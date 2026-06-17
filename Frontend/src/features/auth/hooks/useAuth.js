// this file is used to create a custom hook for authentication

import { useContext } from 'react';
import { AuthConext } from '../auth.context.jsx';
import { login, logout, register, getMe } from '../services/auth.api.js';

// Custom hook to access authentication context to manage user state and loading state throughout the application
export const useAuth = () => {
  const context = useContext(AuthConext);
  const { user, setUser, loading, setLoading } = context;
};
