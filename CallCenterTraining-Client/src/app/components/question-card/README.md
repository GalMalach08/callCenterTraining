# QuestionCardComponent

קומפוננטה מודולרית לתצוגת כרטיסיות שאלות/תרחישים. ניתן לשימוש חוזר בכל מקום באפליקציה.

## שימוש בסיסי

```html
<app-question-card
  [question]="questionData"
  (actionClick)="handleClick($event)">
</app-question-card>
```

## Inputs (מאפיינים)

| שם | סוג | ברירת מחדל | תיאור |
|-----|-----|-----------|-------|
| `question` | `QuestionModel` | **חובה** | אובייקט המכיל את נתוני השאלה |
| `buttonText` | `string` | `'התחלת תרגול'` | טקסט הכפתור הראשי |
| `showDescription` | `boolean` | `true` | האם להציג את התיאור |
| `showScenario` | `boolean` | `true` | האם להציג את התרחיש |

## Outputs (אירועים)

| שם | פרמטרים | תיאור |
|-----|---------|-------|
| `actionClick` | `number` (question ID) | נורה כאשר לוחצים על כפתור הפעולה |
| `cardClick` | `number` (question ID) | נורה כאשר לוחצים על הכרטיסייה עצמה |

## דוגמאות שימוש

### דוגמה 1: תצוגה בסיסית ברשימה
```html
<app-question-card
  *ngFor="let q of questions"
  [question]="q"
  (actionClick)="startPractice($event)">
</app-question-card>
```

### דוגמה 2: כרטיסייה עם טקסט כפתור מותאם
```html
<app-question-card
  [question]="selectedQuestion"
  [buttonText]="'המשך תרגול'"
  (actionClick)="continuePractice($event)">
</app-question-card>
```

### דוגמה 3: הצגה מצומצמת (ללא תרחיש)
```html
<app-question-card
  [question]="question"
  [showScenario]="false"
  [buttonText]="'צפה בפרטים'"
  (actionClick)="viewDetails($event)">
</app-question-card>
```

### דוגמה 4: כרטיסייה פשוטה (רק כותרת ורמת קושי)
```html
<app-question-card
  [question]="question"
  [showDescription]="false"
  [showScenario]="false"
  [buttonText]="'בחר'"
  (actionClick)="selectQuestion($event)">
</app-question-card>
```

## מבנה QuestionModel

```typescript
interface QuestionModel {
  id: number;
  title: string;
  category: string;
  difficulty: 'קל' | 'בינוני' | 'קשה';
  description: string;
  scenario: string;
}
```

## עיצוב

הקומפוננטה כוללת עיצוב מלא עם:
- אנימציות hover
- גרדיאנט מותאם אישית בכותרת
- צ'יפ לרמת קושי עם צבעים דינמיים
- רספונסיביות מלאה למובייל
- סגנון חלק ומודרני

## התאמה אישית

ניתן לעקוף את העיצוב ב-SCSS של הקומפוננטה האב:

```scss
::ng-deep app-question-card {
  .question-card {
    border: 2px solid blue;
    // התאמות נוספות...
  }
}
```

## זמינות

הקומפוננטה היא `standalone: true`, כך שניתן לייבא אותה ישירות בכל קומפוננטה אחרת:

```typescript
import { QuestionCardComponent } from '../question-card/question-card.component';

@Component({
  imports: [QuestionCardComponent, ...]
})
```
