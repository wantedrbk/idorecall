import { create } from 'zustand';
import axios from 'axios';
import { AuthState, User } from '../types';

const API_URL = 'http://localhost:3000/api'; // Replace with your actual API URL

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  login: async (email: string, password: string) => {
    try {
      const response = await axios.post(`${API_URL}/login`, { email, password });
      const user: User = response.data.user;
      set({ user, isAuthenticated: true });
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  },
  logout: () => {
    set({ user: null, isAuthenticated: false });
  },
  register: async (username: string, email: string, password: string) => {
    try {
      const response = await axios.post(`${API_URL}/register`, { username, email, password });
      const user: User = response.data.user;
      set({ user, isAuthenticated: true });
    } catch (error) {
      console.error('Registration failed:', error);
      throw error;
    }
  },
}));