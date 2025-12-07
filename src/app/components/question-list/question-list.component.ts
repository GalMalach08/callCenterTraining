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
  import {MatSelectModule} from '@angular/material/select';


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
    MatSelectModule
  ],

  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.scss']
})
export class QuestionListComponent implements OnInit {
  questions: QuestionModel[] = [];
  isLoading = false;
  errorMessage = '';
  searchText: string = '';
  difficultyFilter: string = '';
  constructor(
    private questionService: QuestionService,
    private router: Router
  ) {}

  // Initializes component and loads all questions
  ngOnInit() {    
    this.loadQuestions();
  };

  // Fetches all questions from the service
  loadQuestions = (): void => {
    console.log('eeee');
    
    this.isLoading = true;
    this.errorMessage = '';

    this.questionService.getAllQuestions().subscribe({
      next: (questions) => {
        console.log(questions);
        
        this.questions = questions;
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = 'Failed to load questions. Please try again.';
        this.isLoading = false;
        console.error('Error loading questions:', error);
      }
    });
  };

  // Navigates to the practice screen for the selected question
  selectQuestion = (questionId: number): void => {
    this.router.navigate(['/practice', questionId]);
  };



    get filteredQuestions(): QuestionModel[] {
      return this.questions.filter(q => {
        const matchesDifficulty =
          !this.difficultyFilter || q.difficulty === this.difficultyFilter;

        const text = this.searchText.toLowerCase();

        const matchesText =
          !text ||
          q.title.toLowerCase().includes(text) ||
          q.description.toLowerCase().includes(text) ||
          q.scenario.toLowerCase().includes(text) ||
          q.category.toLowerCase().includes(text);

        return matchesDifficulty && matchesText;
      });
    }


  // Returns the color class for difficulty chip
  getDifficultyColor = (difficulty: string): string => {
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
}
