import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatChipsModule } from '@angular/material/chips';
import { FeedbackModel } from '../../models';

@Component({
  selector: 'app-feedback-card',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatChipsModule
  ],
  templateUrl: './feedback-card.component.html',
  styleUrl: './feedback-card.component.scss'
})
export class FeedbackCardComponent {
  @Input() feedback: FeedbackModel | null = null;
  @Output() tryAgain = new EventEmitter<void>();

  // Returns the color class for the score badge
  getScoreColor = (): string => {
    if (!this.feedback) return '';
    const score = this.feedback.score;
    if (score >= 80) return 'score-excellent';
    if (score >= 60) return 'score-good';
    if (score >= 40) return 'score-fair';
    return 'score-poor';
  };

  // Returns the performance label based on score
  getPerformanceLabel = (): string => {
    if (!this.feedback) return '';
    const score = this.feedback.score;
    if (score >= 90) return 'Outstanding';
    if (score >= 80) return 'Excellent';
    if (score >= 70) return 'Very Good';
    if (score >= 60) return 'Good';
    if (score >= 50) return 'Fair';
    return 'Needs Improvement';
  };

  // Emits event to try the practice again
  onTryAgain = (): void => {
    this.tryAgain.emit();
  };
}
