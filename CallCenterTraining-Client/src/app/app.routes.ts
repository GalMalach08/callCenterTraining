import { Routes } from '@angular/router';
import { QuestionListComponent } from './components/question-list/question-list.component';
import { PracticeComponent } from './components/practice/practice.component';

export const routes: Routes = [
  { path: '', redirectTo: '/questions', pathMatch: 'full' },
  { path: 'questions', component: QuestionListComponent },
  { path: 'practice/:id', component: PracticeComponent },
  { path: '**', redirectTo: '/questions' }
];
