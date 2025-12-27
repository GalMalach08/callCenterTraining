import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export type ViewMode = 'simple' | 'detailed';

@Injectable({
  providedIn: 'root'
})
export class ViewModeService {
  
  // Default view mode is detailed
  private viewModeSubject = new BehaviorSubject<ViewMode>('detailed');
  
  // Observable for components to subscribe
  public viewMode$: Observable<ViewMode> = this.viewModeSubject.asObservable();

  constructor() {
    // Load saved preference from localStorage if exists
    const savedMode = localStorage.getItem('viewMode') as ViewMode;
    if (savedMode === 'simple' || savedMode === 'detailed') {
      this.viewModeSubject.next(savedMode);
    }
  }

  // Get current view mode
  getCurrentViewMode(): ViewMode {
    return this.viewModeSubject.value;
  }

  // Set view mode
  setViewMode(mode: ViewMode): void {
    this.viewModeSubject.next(mode);
    localStorage.setItem('viewMode', mode);
  }

  // Toggle between simple and detailed
  toggleViewMode(): void {
    const currentMode = this.getCurrentViewMode();
    const newMode: ViewMode = currentMode === 'simple' ? 'detailed' : 'simple';
    this.setViewMode(newMode);
  }

  // Check if current mode is simple
  isSimpleMode(): boolean {
    return this.getCurrentViewMode() === 'simple';
  }

  // Check if current mode is detailed
  isDetailedMode(): boolean {
    return this.getCurrentViewMode() === 'detailed';
  }
}
