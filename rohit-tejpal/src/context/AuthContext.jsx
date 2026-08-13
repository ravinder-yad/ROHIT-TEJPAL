import { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

// Ensure Axios always sends cookies
axios.defaults.withCredentials = true;

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check if user is logged in on mount
  useEffect(() => {
    const userInfo = localStorage.getItem('userInfo');
    if (userInfo) {
      setUser(JSON.parse(userInfo));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
        email,
        password,
      });
      return { success: true, message: response.data.message };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Login failed',
      };
    }
  };

  const register = async (name, email, password, phone) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/register`, {
        name,
        email,
        password,
        phone,
      });
      return { success: true, message: response.data.message };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Registration failed',
      };
    }
  };

  const verifyOtp = async (email, otp) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/verify-otp`, {
        email,
        otp,
      });
      setUser(response.data);
      localStorage.setItem('userInfo', JSON.stringify(response.data));
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'OTP Verification failed',
      };
    }
  };

  const forgotPassword = async (email) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/forgot-password`, { email });
      return { success: true, message: response.data.message };
    } catch (error) {
      return { success: false, error: error.response?.data?.message || 'Failed to send reset link' };
    }
  };

  const resetPassword = async (email, otp, newPassword) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/reset-password`, { email, otp, newPassword });
      return { success: true, message: response.data.message };
    } catch (error) {
      return { success: false, error: error.response?.data?.message || 'Failed to reset password' };
    }
  };

  const logout = async () => {
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/logout`);
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setUser(null);
      localStorage.removeItem('userInfo');
    }
  };

  const updateUser = (userData) => {
    setUser(userData);
    localStorage.setItem('userInfo', JSON.stringify(userData));
  };

  const value = {
    user,
    loading,
    login,
    register,
    verifyOtp,
    forgotPassword,
    resetPassword,
    logout,
    updateUser,
  };

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
};
