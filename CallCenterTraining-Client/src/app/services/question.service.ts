import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { QuestionModel } from '../models';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  private readonly mockDataPath = 'assets/mock-data/questions1.json';
  private readonly apiUrl = `${environment.apiUrl}/questions`;

  constructor(private http: HttpClient) {}

  // Retrieves all available questions from mock data or server API
  getAllQuestions = (): Observable<QuestionModel[]> => {    
    if (environment.useMockData) {    
      return this.http.get<QuestionModel[]>(this.mockDataPath);
    }
    return this.http.get<QuestionModel[]>(this.apiUrl);
  };

  // Retrieves a single question by ID from mock data or server API
getQuestionById = (id: number): Observable<QuestionModel> => {
  if (environment.useMockData) {
    return this.http.get<QuestionModel[]>(this.mockDataPath).pipe(
      map((questions) => {
        const question = questions.find(q => q.id === id);
        if (!question) throw new Error('Question not found');
        return question;
      })
    );
  }

  return this.http.get<QuestionModel>(`${this.apiUrl}/${id}`);
};

}
