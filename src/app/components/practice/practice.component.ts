import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { QuestionHelper } from '../../helper/question.helper';

import { TrainingService } from '../../services/training.service';
import { QuestionService } from '../../services/question.service';
import { QuestionModel, FeedbackModel, TrainingSessionModel } from '../../models';
import { MarkdownPipe } from '../../pipes/markdown.pipe';
import { QuestionCardComponent } from '../question-card/question-card.component';

@Component({
  selector: 'app-practice',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MarkdownPipe,
    MatChipsModule,
    QuestionCardComponent
  ],
  templateUrl: './practice.component.html',
  styleUrls: ['./practice.component.scss']
})
export class PracticeComponent implements OnInit {

  @ViewChild('textareaElement') textareaElement!: ElementRef<HTMLTextAreaElement>;

  // Current question
  question: QuestionModel | null = null;
  textAnswer: string = '';

  // All questions for sidebar
  allQuestions: QuestionModel[] = [];
  visibleQuestionsCount = 2; // Number of cards visible at once
  currentScrollIndex = 0; // Starting index for visible questions

  feedbackHtml: string = '';
  feedback: FeedbackModel | null = null;

  isLoading = false;
  errorMessage = '';
  isSubmitting = false;
  loadAnswer = false;
  copyText: string = "העתק";
  typingInterval: any;


  // Voice
  isListening = false;
  recognizedText = '';
  recognition: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private questionService: QuestionService,
    private trainingService: TrainingService
  ) {}

  ngOnInit(): void {
    this.loadQuestion();
  }

  // ------------------------------------------------------------
  // Load selected question by ID
  // ------------------------------------------------------------
  loadQuestion(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (!id) {
      this.router.navigate(['/questions']);
      return;
    }

    this.isLoading = true;

    this.questionService.getAllQuestions().subscribe({
      next: questions => {
        this.allQuestions = questions;
        this.question = questions.find(q => q.id === id) || null;
        
        this.isLoading = false;

        if (!this.question) {
          this.errorMessage = 'לא נמצא תרחיש מתאים.';
          this.router.navigate(['/questions']);
        } else {
          // Set scroll index to show current question
          const currentIndex = this.allQuestions.findIndex(q => q.id === id);
          if (currentIndex !== -1) {
            this.currentScrollIndex = Math.max(0, currentIndex - 1);
          }
        }
      },
      error: err => {
        console.error(err);
        this.errorMessage = 'שגיאה בטעינת התרחיש.';
        this.isLoading = false;
      }
    });
  }

  // ------------------------------------------------------------
  // Submit Answer → ChatGPT typing effect
  // ------------------------------------------------------------
  submitAnswer(): void {
    if (!this.textAnswer.trim() || !this.question) return;

    this.feedbackHtml = '';
    this.feedback = null;
    this.isSubmitting = true;
    this.loadAnswer = true;

    const session: TrainingSessionModel = {
      questionId: this.question.id,
      textAnswer: this.textAnswer,
      submittedAt: new Date()
    };

    this.trainingService.submitAnswer(session).subscribe({
      next: feedback => {
        const text = feedback.rawResponse ?? JSON.stringify(feedback, null, 2);
        this.startTypingEffect(text);
      },
      error: err => {
        console.error(err);
        this.loadAnswer = false;
        this.isSubmitting = false;
        this.feedbackHtml = 'אירעה שגיאה בשליחת התשובה.';
      }
    });
  }

  startTypingEffect(fullText: string): void {
    let index = 0;
    this.feedbackHtml = '';
    this.isSubmitting = false;

    this.typingInterval = setInterval(() => {
      this.feedbackHtml += fullText[index];
      index++;

      if (index >= fullText.length) {
        clearInterval(this.typingInterval);
        this.loadAnswer = false;
      }
    }, 12);
  }

  stopTyping(): void {
    clearInterval(this.typingInterval);
    this.loadAnswer = false;
  }

  // ------------------------------------------------------------
  // Voice Input
  // ------------------------------------------------------------
  startVoiceInput(): void {
    this.isListening = true;
    this.recognizedText = '';

    const SpeechRecognition =
      (window as any).webkitSpeechRecognition ||
      (window as any).SpeechRecognition;

    if (!SpeechRecognition) {
      alert('הדפדפן לא תומך בזיהוי קולי');
      this.isListening = false;
      return;
    }

    this.recognition = new SpeechRecognition();
    this.recognition.lang = 'he-IL';
    this.recognition.interimResults = false;

    this.recognition.onresult = (event: any) => {
      this.recognizedText = event.results[0][0].transcript;
    };

    this.recognition.onerror = () => {
      this.isListening = false;
    };

    this.recognition.start();
  }

  confirmVoice(): void {
    if (this.recognizedText.trim()) {
      this.textAnswer += (this.textAnswer ? ' ' : '') + this.recognizedText;
      this.adjustTextareaHeight();
    }
    if (this.recognition) this.recognition.stop();
    this.isListening = false;
  }

  cancelVoice(): void {
    if (this.recognition) this.recognition.stop();
    this.isListening = false;
    this.recognizedText = '';
  }

  // ------------------------------------------------------------
  // Input helpers
  // ------------------------------------------------------------
  handleEnterKey(event: KeyboardEvent): void {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      if (this.textAnswer.trim() && !this.isSubmitting) {
        this.submitAnswer();
      }
    }
  }

  copyResponse(): void {
    navigator.clipboard.writeText(this.feedbackHtml || '')
      .catch(err => console.error('Copy failed:', err));
      this.copyText = "הועתק!"
      setTimeout(() => {
        this.copyText = "העתק"
      }, 2000);
  }

  adjustTextareaHeight(): void {
    const tx = this.textareaElement.nativeElement;
    tx.style.height = 'auto';
    tx.style.height = Math.min(tx.scrollHeight, 200) + 'px';
  }

    // Returns color class for difficulty chip
    getDifficultyColor(difficulty: string): string {
      return QuestionHelper.getDifficultyColor(difficulty);
    }

  goBack(): void {
    this.router.navigate(['/questions']);
  }

  // ------------------------------------------------------------
  // Questions Sidebar Navigation
  // ------------------------------------------------------------
  
  // Get visible questions for carousel
  get visibleQuestions(): QuestionModel[] {
    return this.allQuestions.slice(
      this.currentScrollIndex,
      this.currentScrollIndex + this.visibleQuestionsCount
    );
  }

  // Check if can scroll previous
  get canScrollPrev(): boolean {
    return this.currentScrollIndex > 0;
  }

  // Check if can scroll next
  get canScrollNext(): boolean {
    return this.currentScrollIndex + this.visibleQuestionsCount < this.allQuestions.length;
  }

  // Scroll to previous questions
  scrollPrev(): void {
    if (this.canScrollPrev) {
      this.currentScrollIndex--;
    }
  }

  // Scroll to next questions
  scrollNext(): void {
    if (this.canScrollNext) {
      this.currentScrollIndex++;
    }
  }

  // Select a different question from sidebar
  selectQuestion(questionId: number): void {
    if (this.question?.id === questionId) return; // Already selected

    // Reset current state
    this.textAnswer = '';
    this.feedbackHtml = '';
    this.feedback = null;
    this.isSubmitting = false;
    this.loadAnswer = false;
    
    // Navigate to new question
    this.router.navigate(['/practice', questionId]).then(() => {
      // Reload the question
      this.loadQuestion();
    });
  }

  // Check if question is currently selected
  isQuestionSelected(questionId: number): boolean {
    return this.question?.id === questionId;
  }
}
