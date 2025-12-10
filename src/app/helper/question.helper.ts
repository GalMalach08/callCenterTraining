

  // Provides helper utilities for filtering, sorting, and validating questions
export class QuestionHelper {

    // Returns the color class for difficulty chip
  static getDifficultyColor = (difficulty: string): string => {
    switch (difficulty) {
      case 'easy':
        return 'difficulty-easy';
      case 'medium':
        return 'difficulty-medium';
      case 'hard':
        return 'difficulty-hard';
      default:
        return '';
    }
  };

  static translateDifficulty = (difficulty: string): string => {
    switch (difficulty) {
          case 'easy':
            return 'קל';
          case 'medium':
            return 'בינוני';
          case 'hard':
            return 'קשה';
          default:
            return '';
    }
  }



}
