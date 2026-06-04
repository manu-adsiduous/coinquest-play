export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number; // index into options
}

export interface Quiz {
  id: string;
  title: string;
  description: string;
  category: string;
  emoji: string;
  questions: QuizQuestion[];
}

export interface UserProfile {
  id: string;
  email: string;
  username: string;
  coins: number;
  avatar: string;
  isAdmin: boolean;
  created_at: string;
}

export interface QuizCompletion {
  id: string;
  user_id: string;
  quiz_id: string;
  score: number;
  completed_at: string;
}

export interface GiftCard {
  id: string;
  code: string;
  amount: number;
  redeemed_by: string | null;
  redeemed_at: string | null;
}
