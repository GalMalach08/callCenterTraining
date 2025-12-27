export interface FeedbackModel {
  score: number;
  strengths: string[];
  weaknesses: string[];
  suggestions: string[];
  rawResponse?: string;
  evaluatedAt: Date;
}
