import { Component, OnInit } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CommonModule } from '@angular/common';
import { ViewModeService, ViewMode } from './services/view-mode.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSlideToggleModule,
    MatTooltipModule,
    CommonModule
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  title = 'Call Center Training';
  currentViewMode: ViewMode = 'detailed';
  
  constructor(public viewModeService: ViewModeService) {}

  ngOnInit(): void {
    // Subscribe to view mode changes
    this.viewModeService.viewMode$.subscribe(mode => {
      this.currentViewMode = mode;
    });
  }

  // Toggle view mode
  toggleViewMode(): void {
    this.viewModeService.toggleViewMode();
  }

  // Check if detailed mode
  get isDetailedMode(): boolean {
    return this.currentViewMode === 'detailed';
  }
}
