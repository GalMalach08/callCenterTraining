export interface QuestionModel {
  id: number;
  title: string;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
}
