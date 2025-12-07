import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
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
      return this.http.get<FeedbackModel>(this.mockDataPath);
    }
    return this.http.post<FeedbackModel>(`${this.apiUrl}/evaluate`, session);
  };

  // Submits an audio answer for evaluation
  submitAudioAnswer = (questionId: number, audioBlob: Blob): Observable<FeedbackModel> => {
    const formData = new FormData();
    formData.append('questionId', questionId.toString());
    formData.append('audio', audioBlob, 'answer.webm');

    if (environment.useMockData) {
      return this.http.get<FeedbackModel>(this.mockDataPath);
    }
    return this.http.post<FeedbackModel>(`${this.apiUrl}/evaluate-audio`, formData);
  };
}
