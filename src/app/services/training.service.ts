import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TrainingService {

  private baseUrl = 'http://localhost:8002';   // השרת בפייתון

  constructor(private http: HttpClient) {}

  getQuestions(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/questions`);
  }

  submitAnswer(session: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/answer`, {
      question_id: session.questionId,
      answer: session.textAnswer
    });
  }
}
