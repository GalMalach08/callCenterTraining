# Quick Start Guide

## Getting Started

### 1. Install Dependencies (if not done)
```bash
npm install
```

### 2. Run the Application
```bash
npm start
```

The app will open at `http://localhost:4200/`

### 3. Navigate the Application

#### Question List Screen
- View all available training scenarios
- Each card shows:
  - Scenario title and category
  - Difficulty level (Easy, Medium, Hard)
  - Scenario description
  - Key focus areas
- Click "Start Practice" to begin

#### Practice Screen
- Read the scenario carefully
- Type your response in the text area
- Click "Submit for Evaluation" to get AI feedback
- View your evaluation results:
  - Overall score (0-100)
  - Strengths identified
  - Areas for improvement
  - Actionable recommendations
- Click "Try Again" to practice the same scenario
- Click "Back to Scenarios" to select a different one

## Current Features

✅ **Implemented:**
- 6 sample training scenarios across multiple categories
- Text-based answer submission
- Mock AI feedback evaluation
- Responsive Material Design UI
- Score-based performance rating
- Detailed feedback with strengths, weaknesses, and suggestions

🚧 **Placeholder (Coming Soon):**
- Audio recording for voice responses
- Real-time AI evaluation via backend API
- Progress tracking and history
- User authentication

## Mock Data Mode

The application is currently running in **mock data mode**. This means:
- Questions are loaded from `public/assets/mock-data/questions.json`
- Feedback is loaded from `public/assets/mock-data/feedback.json`
- No real API calls are made

To switch to real API mode:
1. Open `src/environments/environment.ts`
2. Set `useMockData: false`
3. Ensure your backend API is running at the configured URL

## File Structure Overview

```
Key Files You Might Want to Edit:

📁 Mock Data:
  public/assets/mock-data/questions.json  - Add/edit training scenarios
  public/assets/mock-data/feedback.json   - Customize sample feedback

📁 Configuration:
  src/environments/environment.ts         - Toggle mock mode, set API URL

📁 Components:
  src/app/components/question-list/       - Question browsing UI
  src/app/components/practice/            - Practice session UI
  src/app/components/feedback-card/       - Feedback display UI

📁 Services:
  src/app/services/question.service.ts    - Question data fetching
  src/app/services/training.service.ts    - Answer submission & feedback

📁 Models:
  src/app/models/                         - TypeScript interfaces
```

## Adding New Questions

Edit `public/assets/mock-data/questions.json`:

```json
{
  "id": 7,
  "title": "Your Scenario Title",
  "description": "Brief description",
  "category": "Your Category",
  "difficulty": "easy",
  "scenario": "Detailed scenario text...",
  "keyPoints": [
    "First key point",
    "Second key point"
  ]
}
```

## Customizing Feedback

Edit `public/assets/mock-data/feedback.json` to change the sample feedback shown after submission.

## Troubleshooting

**Problem:** "Cannot find module '@angular/material'"
**Solution:** Run `npm install @angular/material @angular/cdk @angular/animations --legacy-peer-deps`

**Problem:** Components not loading
**Solution:** Clear browser cache and restart dev server (`npm start`)

**Problem:** Routing issues
**Solution:** Ensure you're accessing `http://localhost:4200/questions` (not just root)

## Next Steps

1. **Test the Application**: Try each scenario and review feedback
2. **Customize Mock Data**: Edit questions and feedback to match your needs
3. **Review Code Structure**: Check out `PROJECT_STRUCTURE.md` for detailed documentation
4. **Plan Backend Integration**: Prepare API endpoints for real evaluation
5. **Add More Features**: Implement audio recording, user auth, etc.

## Tips

- Use Chrome DevTools to inspect network calls
- Check browser console for any errors
- Material Design guidelines: https://material.angular.io/
- All code follows arrow function convention with inline comments

## Support

For questions or issues:
1. Review `PROJECT_STRUCTURE.md` for detailed documentation
2. Check Angular Material docs: https://material.angular.io/
3. Review the inline code comments in each file
