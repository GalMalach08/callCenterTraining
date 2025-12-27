import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { QuestionService } from '../../services/question.service';
import { QuestionModel } from '../../models';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { QuestionHelper } from '../../helper/question.helper';
import { QuestionCardComponent } from '../question-card/question-card.component';

@Component({
  selector: 'app-question-list',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatChipsModule,
    MatIconModule,
    MatProgressSpinnerModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    QuestionCardComponent
  ],
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.scss']
})
export class QuestionListComponent implements OnInit {

  questions: QuestionModel[] = [];

  isLoading = false;
  errorMessage: string[] = [];

  searchText = '';
  difficultyFilter = '';

  difficultyLevels = [
    { code: '', name: 'הכול' },
    { code: 'קל', name: 'קל' },
    { code: 'בינוני', name: 'בינוני' },
    { code: 'קשה', name: 'קשה' }
  ];
    // רשימת קטגוריות ייחודיות
  categories: string[] = [];

  // הקטגוריות שנבחרו בפילטר
  selectedCategories: string[] = [];
  constructor(
    private questionService: QuestionService,
    private router: Router
  ) {}

  // Initializes component and loads all questions
  ngOnInit() {
    this.loadQuestions();
  }

  // Fetches all questions from the service with caching optimization
  loadQuestions = (): void => {
    // Check if questions are already cached to avoid unnecessary loading
    if (this.questionService.hasCachedQuestions && this.questions.length > 0) {
      return; // Skip loading if we already have cached data
    }

    this.isLoading = true;
    this.errorMessage = [];

    this.questionService.getAllQuestions().subscribe({
      next: (questions) => {
        this.questions = questions;
        this.categories = Array.from(
          new Set(
            this.questions
              .map(q => q.category)
              .filter(cat => !!cat)
          )
        );
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = ['ארעה שגיאה בטעינת התרחישים.', 'נא לנסות שנית ואם הבעיה ממשיכה ניתן לפנות לתמיכה הטכנית של האוניברסיטה.']
        this.isLoading = false;
        console.error('Error loading questions:', error);
      }
    });
  };

  // Navigates to the practice screen for the selected question
  selectQuestion = (questionId: number): void => {
    this.router.navigate(['/practice', questionId]);
  };

  // Sets difficulty filter
  setDifficulty = (level: string): void => {
    this.difficultyFilter = level;
  };

  // Returns color class for difficulty chip
  getDifficultyColor(difficulty: string): string {
    return QuestionHelper.getDifficultyColor(difficulty);
  }

    // Translates difficulty to Hebrew
  translateDifficulty(difficulty: string): string {
    return QuestionHelper.translateDifficulty(difficulty);
  }

  // Reset all filters
  resetFilters = (): void => {
    this.searchText = '';
    this.difficultyFilter = '';
    this.selectedCategories = [];

  };

  // Filtered questions getter
  get filteredQuestions(): QuestionModel[] {
  return this.questions.filter(q => {
    const matchesDifficulty =
      !this.difficultyFilter || this.translateDifficulty(q.difficulty) === this.difficultyFilter;

    const text = this.searchText.toLowerCase();
    const matchesText =!text || q.title.toLowerCase().includes(text);

    const matchesCategory =
      this.selectedCategories.length === 0 ||
      this.selectedCategories.includes(q.category);

    return matchesDifficulty && matchesText && matchesCategory;
  });
}

}
