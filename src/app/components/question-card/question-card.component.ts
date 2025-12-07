import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { QuestionModel } from '../../models';
import { QuestionHelper } from '../../helper/question.helper';
import { ViewModeService, ViewMode } from '../../services/view-mode.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-question-card',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatChipsModule
  ],
  templateUrl: './question-card.component.html',
  styleUrls: ['./question-card.component.scss']
})
export class QuestionCardComponent implements OnInit, OnDestroy {
  
  // Input: Question data
  @Input() question!: QuestionModel;
  
  // Input: Custom button text (optional)
  @Input() buttonText: string = 'התחלת תרגול';
  
  // View mode state
  currentViewMode: ViewMode = 'detailed';
  private viewModeSubscription?: Subscription;
  
  // Output: Event when card is clicked
  @Output() cardClick = new EventEmitter<number>();
  
  // Output: Event when action button is clicked
  @Output() actionClick = new EventEmitter<number>();

  constructor(private viewModeService: ViewModeService) {}

  ngOnInit(): void {
    // Subscribe to view mode changes
    this.viewModeSubscription = this.viewModeService.viewMode$.subscribe(mode => {
      this.currentViewMode = mode;
    });
  }

  ngOnDestroy(): void {
    // Cleanup subscription
    this.viewModeSubscription?.unsubscribe();
  }

  // Computed properties based on view mode
  get shouldShowDescription(): boolean {
    return this.currentViewMode === 'detailed';
  }

  get shouldShowScenario(): boolean {
    return this.currentViewMode === 'detailed';
  }

  get shouldShowChips(): boolean {
    return this.currentViewMode === 'detailed';
  }

  get isSimpleView(): boolean {
    return this.currentViewMode === 'simple';
  }

  // Returns color class for difficulty chip
  getDifficultyColor(difficulty: string): string {
    return QuestionHelper.getDifficultyColor(difficulty);
  }

  // Handles card click
  onCardClick(): void {
    this.cardClick.emit(this.question.id);
  }

  // Handles action button click
  onActionClick(event: Event): void {
    event.stopPropagation(); // Prevent card click event
    this.actionClick.emit(this.question.id);
  }
}
