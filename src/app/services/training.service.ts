import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, delay } from 'rxjs';
import { FeedbackModel, TrainingSessionModel } from '../models';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TrainingService {
  private readonly mockDataPath = 'assets/mock-data/feedback.json';
  private readonly apiUrl = `${environment.apiUrl}/training`;

  constructor(private http: HttpClient) {}

// Submits a training session answer and receives AI feedback
submitAnswer = (session: TrainingSessionModel): Observable<FeedbackModel> => {
  if (environment.useMockData) {
    return this.http.get<FeedbackModel>(this.mockDataPath).pipe(
      delay(3000) // delay the mock response by 3 seconds
    );
  }
  return this.http.post<FeedbackModel>(`${this.apiUrl}/evaluate`, session);
}


}
