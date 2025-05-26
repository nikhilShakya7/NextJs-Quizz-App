export interface Question {
  category: string;
  type: string;
  difficulty: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

export interface QuizQuestion extends Question {
  all_answers: string[];
  user_answer?: string;
}

export interface Category {
  id: number;
  name: string;
  icon: string;
  color: string;
}
