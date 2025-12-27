import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, of, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { QuestionModel } from '../models';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  private readonly mockDataPath = 'assets/mock-data/questions1.json';
  private readonly apiUrl = `${environment.apiUrl}/questions`;
  
  // Cache for questions
  private questionsCache: QuestionModel[] | null = null;
  private questionsSubject = new BehaviorSubject<QuestionModel[]>([]);
  public questions$ = this.questionsSubject.asObservable();

  constructor(private http: HttpClient) {}

  // Retrieves all available questions with caching
  getAllQuestions = (): Observable<QuestionModel[]> => {
    // Return cached data if available
    if (this.questionsCache) {
      return of(this.questionsCache);
    }

    // Make API call and cache the result
    const apiCall = environment.useMockData 
      ? this.http.get<QuestionModel[]>(this.mockDataPath)
      : this.http.get<QuestionModel[]>(this.apiUrl);

    return apiCall.pipe(
      tap(questions => {
        this.questionsCache = questions;
        this.questionsSubject.next(questions);
      })
    );
  };


  // Method to check if questions are cached
  get hasCachedQuestions(): boolean {
    return this.questionsCache !== null && this.questionsCache.length > 0;
  }

}
