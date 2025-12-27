import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { AnswerRequest } from '../models';

@Injectable({
  providedIn: 'root'
})
export class TrainingService {
  private readonly apiUrl = `${environment.apiUrl}/answer`;

  constructor(private http: HttpClient) {}


 submitAnswer(payload: AnswerRequest): Observable<any> {
  return this.http.post<any>(`${this.apiUrl}`, payload);
}
}
