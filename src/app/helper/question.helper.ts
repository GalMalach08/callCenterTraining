

  // Provides helper utilities for filtering, sorting, and validating questions
export class QuestionHelper {

    // Returns the color class for difficulty chip
  static getDifficultyColor = (difficulty: string): string => {
    switch (difficulty) {
      case 'קל':
        return 'difficulty-easy';
      case 'בינוני':
        return 'difficulty-medium';
      case 'קשה':
        return 'difficulty-hard';
      default:
        return '';
    }
  };



}
