export interface User {
  id: string;
  username: string;
  email: string;
}

export interface Flashcard {
  id: string;
  userId: string;
  question: string;
  answer: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (username: string, email: string, password: string) => Promise<void>;
}

export interface FlashcardState {
  flashcards: Flashcard[];
  createFlashcard: (question: string, answer: string) => Promise<void>;
  updateFlashcard: (id: string, question: string, answer: string) => Promise<void>;
  deleteFlashcard: (id: string) => Promise<void>;
  fetchUserFlashcards: () => Promise<void>;
}