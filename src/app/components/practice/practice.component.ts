import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { QuestionService } from '../../services/question.service';
import { TrainingService } from '../../services/training.service';
import { QuestionModel, FeedbackModel, TrainingSessionModel } from '../../models';
import { FeedbackCardComponent } from '../feedback-card/feedback-card.component';

@Component({
  selector: 'app-practice',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatChipsModule,
    MatDividerModule,
    FeedbackCardComponent
  ],
  templateUrl: './practice.component.html',
  styleUrl: './practice.component.scss'
})
export class PracticeComponent implements OnInit {
  question: QuestionModel | null = null;
  textAnswer = '';
  feedback: FeedbackModel | null = null;
  isLoading = false;
  isSubmitting = false;
  errorMessage = '';
  isRecording = false;
  audioBlob: Blob | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private questionService: QuestionService,
    private trainingService: TrainingService
  ) {}

  // Initializes component and loads the selected question
  ngOnInit() {
    this.loadQuestion();
  };

  // Fetches the question based on route parameter
  loadQuestion = (): void => {
    const questionId = Number(this.route.snapshot.paramMap.get('id'));
    if (!questionId) {
      this.router.navigate(['/questions']);
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    this.questionService.getAllQuestions().subscribe({
      next: (questions) => {
        this.question = questions.find(q => q.id === questionId) || null;
        if (!this.question) {
          this.errorMessage = 'Question not found.';
          this.router.navigate(['/questions']);
        }
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = 'Failed to load question. Please try again.';
        this.isLoading = false;
        console.error('Error loading question:', error);
      }
    });
  };

  // Submits the text answer for evaluation
  submitAnswer = (): void => {
    if (!this.textAnswer.trim() || !this.question) {
      return;
    }

    this.isSubmitting = true;
    this.errorMessage = '';
    this.feedback = null;

    const session: TrainingSessionModel = {
      questionId: this.question.id,
      textAnswer: this.textAnswer,
      submittedAt: new Date()
    };

    this.trainingService.submitAnswer(session).subscribe({
      next: (feedback) => {
        this.feedback = feedback;
        this.isSubmitting = false;
      },
      error: (error) => {
        this.errorMessage = 'Failed to submit answer. Please try again.';
        this.isSubmitting = false;
        console.error('Error submitting answer:', error);
      }
    });
  };

  // Starts recording audio answer
  startRecording = (): void => {
    this.isRecording = true;
    // TODO: Implement audio recording functionality
    console.log('Audio recording started');
  };

  // Stops recording and saves the audio blob
  stopRecording = (): void => {
    this.isRecording = false;
    // TODO: Implement audio recording stop and blob capture
    console.log('Audio recording stopped');
  };

  // Submits the audio answer for evaluation
  submitAudioAnswer = (): void => {
    if (!this.audioBlob || !this.question) {
      return;
    }

    this.isSubmitting = true;
    this.errorMessage = '';
    this.feedback = null;

    this.trainingService.submitAudioAnswer(this.question.id, this.audioBlob).subscribe({
      next: (feedback) => {
        this.feedback = feedback;
        this.isSubmitting = false;
      },
      error: (error) => {
        this.errorMessage = 'Failed to submit audio answer. Please try again.';
        this.isSubmitting = false;
        console.error('Error submitting audio answer:', error);
      }
    });
  };

  // Resets the practice session for the current question
  resetPractice = (): void => {
    this.textAnswer = '';
    this.feedback = null;
    this.audioBlob = null;
    this.errorMessage = '';
  };

  // Navigates back to the question list
  goBack = (): void => {
    this.router.navigate(['/questions']);
  };

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
