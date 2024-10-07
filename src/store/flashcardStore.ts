import { create } from 'zustand';
import axios from 'axios';
import { FlashcardState, Flashcard } from '../types';
import { useAuthStore } from './authStore';

const API_URL = 'http://localhost:3000/api'; // Replace with your actual API URL

export const useFlashcardStore = create<FlashcardState>((set) => ({
  flashcards: [],
  createFlashcard: async (question: string, answer: string) => {
    try {
      const { user } = useAuthStore.getState();
      if (!user) throw new Error('User not authenticated');

      const response = await axios.post(`${API_URL}/flashcards`, { question, answer }, {
        headers: { Authorization: `Bearer ${user.id}` },
      });
      const newFlashcard: Flashcard = response.data;
      set((state) => ({ flashcards: [...state.flashcards, newFlashcard] }));
    } catch (error) {
      console.error('Failed to create flashcard:', error);
      throw error;
    }
  },
  updateFlashcard: async (id: string, question: string, answer: string) => {
    try {
      const { user } = useAuthStore.getState();
      if (!user) throw new Error('User not authenticated');

      const response = await axios.put(`${API_URL}/flashcards/${id}`, { question, answer }, {
        headers: { Authorization: `Bearer ${user.id}` },
      });
      const updatedFlashcard: Flashcard = response.data;
      set((state) => ({
        flashcards: state.flashcards.map((card) => card.id === id ? updatedFlashcard : card),
      }));
    } catch (error) {
      console.error('Failed to update flashcard:', error);
      throw error;
    }
  },
  deleteFlashcard: async (id: string) => {
    try {
      const { user } = useAuthStore.getState();
      if (!user) throw new Error('User not authenticated');

      await axios.delete(`${API_URL}/flashcards/${id}`, {
        headers: { Authorization: `Bearer ${user.id}` },
      });
      set((state) => ({
        flashcards: state.flashcards.filter((card) => card.id !== id),
      }));
    } catch (error) {
      console.error('Failed to delete flashcard:', error);
      throw error;
    }
  },
  fetchUserFlashcards: async () => {
    try {
      const { user } = useAuthStore.getState();
      if (!user) throw new Error('User not authenticated');

      const response = await axios.get(`${API_URL}/flashcards`, {
        headers: { Authorization: `Bearer ${user.id}` },
      });
      const flashcards: Flashcard[] = response.data;
      set({ flashcards });
    } catch (error) {
      console.error('Failed to fetch user flashcards:', error);
      throw error;
    }
  },
}));