# Call Center Training Application - Project Structure

## Overview
This is an Angular 19 standalone component-based application for training call center agents. The application allows agents to practice handling customer scenarios and receive AI-powered feedback.

## Technology Stack
- **Framework**: Angular 19 (Standalone Components)
- **UI Library**: Angular Material
- **Styling**: SCSS
- **HTTP Client**: Angular HttpClient with fetch API
- **Routing**: Angular Router

## Project Structure

```
src/
├── app/
│   ├── components/
│   │   ├── question-list/           # Lists all available training scenarios
│   │   │   ├── question-list.component.ts
│   │   │   ├── question-list.component.html
│   │   │   └── question-list.component.scss
│   │   ├── practice/                # Practice screen for answering scenarios
│   │   │   ├── practice.component.ts
│   │   │   ├── practice.component.html
│   │   │   └── practice.component.scss
│   │   └── feedback-card/           # Displays AI evaluation results
│   │       ├── feedback-card.component.ts
│   │       ├── feedback-card.component.html
│   │       └── feedback-card.component.scss
│   ├── models/
│   │   ├── question.model.ts        # Question/scenario data structure
│   │   ├── feedback.model.ts        # AI feedback data structure
│   │   ├── training-session.model.ts # Training session data structure
│   │   └── index.ts                 # Model exports barrel file
│   ├── services/
│   │   ├── question.service.ts      # Service for fetching questions
│   │   └── training.service.ts      # Service for submitting answers
│   ├── app.component.ts             # Root component with navigation toolbar
│   ├── app.component.html
│   ├── app.component.scss
│   ├── app.config.ts                # Application configuration (providers)
│   └── app.routes.ts                # Application routing configuration
├── environments/
│   ├── environment.ts               # Development environment config
│   └── environment.prod.ts          # Production environment config
└── styles.scss                      # Global styles and Material theme

public/
└── assets/
    └── mock-data/
        ├── questions.json           # Mock question data
        └── feedback.json            # Mock feedback data
```

## Key Features

### 1. Environment Configuration
- **Mock Mode**: Toggle between mock data and real API calls
- **Configuration**: `src/environments/environment.ts`
- Set `useMockData: true` for development with local JSON files
- Set `useMockData: false` for production with real backend API

### 2. Models (PascalCase, ending with "Model")
- **QuestionModel**: Represents a training scenario
- **FeedbackModel**: Represents AI evaluation results
- **TrainingSessionModel**: Represents a user's answer submission

### 3. Services (API calls only)
- **QuestionService**: Fetches questions from mock data or API
- **TrainingService**: Submits answers and receives feedback

### 4. Components (Standalone)
- **QuestionListComponent**: Browse and select training scenarios
- **PracticeComponent**: Answer scenarios (text or audio)
- **FeedbackCardComponent**: Display evaluation results

### 5. Routing
- `/questions` - Question list (default route)
- `/practice/:id` - Practice screen for specific question
- Wildcard redirects to questions

## Coding Conventions

### Naming
- **Variables/Properties**: camelCase (e.g., `textAnswer`, `isLoading`)
- **Models**: PascalCase + "Model" suffix (e.g., `QuestionModel`)
- **Files**: kebab-case (e.g., `question-list.component.ts`)
- **Functions**: Arrow functions only

### Functions
- All functions have single-line English comments above them
- Related functions are grouped together
- Arrow function syntax: `functionName = (): returnType => { ... }`

### Services
- Services contain ONLY API calls
- No business logic in services
- Business logic stays in components

### Styling
- SCSS per component (no inline styles)
- Angular Material components for UI
- Responsive design with mobile breakpoints

## Running the Application

### Development Server
```bash
npm start
# or
ng serve
```

Navigate to `http://localhost:4200/`

### Build
```bash
npm run build
```

### Switching Between Mock and Real API

**For Mock Data (Development):**
Edit `src/environments/environment.ts`:
```typescript
export const environment = {
  production: false,
  useMockData: true,  // Set to true
  apiUrl: 'http://localhost:5000/api'
};
```

**For Real API (Production):**
Edit `src/environments/environment.prod.ts`:
```typescript
export const environment = {
  production: true,
  useMockData: false,  // Set to false
  apiUrl: 'https://api.callcentertraining.com/api'
};
```

## Mock Data

### Questions (public/assets/mock-data/questions.json)
Contains 6 sample training scenarios covering:
- Conflict Resolution
- Customer Service
- Technical Support
- Sales
- Billing
- Onboarding

Each question includes:
- ID, title, description
- Category and difficulty level
- Detailed scenario
- Key focus points

### Feedback (public/assets/mock-data/feedback.json)
Sample AI evaluation with:
- Score (0-100)
- Strengths (what was done well)
- Weaknesses (areas for improvement)
- Suggestions (actionable recommendations)

## Next Steps

### Future Enhancements
1. **Audio Recording**: Implement actual audio recording functionality
2. **Backend Integration**: Connect to real AI evaluation API
3. **User Authentication**: Add login and user management
4. **Progress Tracking**: Store and display user progress over time
5. **Advanced Analytics**: Dashboard with performance metrics
6. **More Scenarios**: Expand the question database
7. **Difficulty Filtering**: Filter questions by difficulty/category
8. **Search Functionality**: Search scenarios by keywords

### API Endpoints (Future Backend)
When `useMockData: false`, services will call:
- `GET /api/questions` - Fetch all questions
- `GET /api/questions/:id` - Fetch single question
- `POST /api/training/evaluate` - Submit text answer
- `POST /api/training/evaluate-audio` - Submit audio answer

## Notes
- All TypeScript files follow arrow function convention
- Every function has a descriptive comment
- Services are designed for easy mock/API switching
- Components are fully standalone (no NgModules)
- Angular Material theming is configured in styles.scss
