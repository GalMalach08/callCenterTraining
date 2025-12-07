export interface QuestionModel {
  id: number;
  title: string;
  description: string;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
  scenario: string;
  keyPoints: string[];
}
