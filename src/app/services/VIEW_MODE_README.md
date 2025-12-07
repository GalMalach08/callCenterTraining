# ViewModeService - תיעוד

## סקירה כללית

`ViewModeService` הוא service גלובלי שמנהל את מצב התצוגה של כרטיסיות השאלות באפליקציה. הוא מאפשר למשתמשים לעבור בין שתי תצוגות:

- **תצוגה מפורטת (Detailed)** - כרטיסיות מלאות עם כל המידע
- **תצוגה פשוטה (Simple)** - רשימה קומפקטית רק עם כותרת השאלה

## שימוש

### ייבוא ב-Component

```typescript
import { ViewModeService, ViewMode } from './services/view-mode.service';

export class MyComponent implements OnInit {
  currentViewMode: ViewMode = 'detailed';

  constructor(private viewModeService: ViewModeService) {}

  ngOnInit(): void {
    // האזנה לשינויים במצב התצוגה
    this.viewModeService.viewMode$.subscribe(mode => {
      this.currentViewMode = mode;
    });
  }
}
```

### מתודות זמינות

#### `getCurrentViewMode(): ViewMode`
מחזיר את מצב התצוגה הנוכחי ('simple' או 'detailed')

```typescript
const mode = this.viewModeService.getCurrentViewMode();
console.log(mode); // 'detailed' או 'simple'
```

#### `setViewMode(mode: ViewMode): void`
מגדיר מצב תצוגה חדש ושומר אותו ב-localStorage

```typescript
this.viewModeService.setViewMode('simple');
```

#### `toggleViewMode(): void`
מחליף בין שני מצבי התצוגה

```typescript
this.viewModeService.toggleViewMode();
```

#### `isSimpleMode(): boolean`
בודק אם המצב הנוכחי הוא תצוגה פשוטה

```typescript
if (this.viewModeService.isSimpleMode()) {
  console.log('תצוגה פשוטה פעילה');
}
```

#### `isDetailedMode(): boolean`
בודק אם המצב הנוכחי הוא תצוגה מפורטת

```typescript
if (this.viewModeService.isDetailedMode()) {
  console.log('תצוגה מפורטת פעילה');
}
```

### Observable - `viewMode$`

Observable שניתן להירשם אליו כדי לקבל עדכונים על שינויים במצב התצוגה:

```typescript
this.viewModeService.viewMode$.subscribe(mode => {
  console.log('View mode changed to:', mode);
  // עדכון UI בהתאם
});
```

## תכונות

### שמירה אוטומטית
מצב התצוגה נשמר אוטומטית ב-localStorage, כך שההעדפה נשמרת גם אחרי רענון הדף.

### Singleton Pattern
ה-Service מוזרק ברמת ה-root (`providedIn: 'root'`), כך שיש instance אחד בלבד בכל האפליקציה.

## דוגמאות שימוש

### שימוש ב-AppComponent (תפריט עליון)

```typescript
export class AppComponent implements OnInit {
  currentViewMode: ViewMode = 'detailed';
  
  constructor(public viewModeService: ViewModeService) {}

  ngOnInit(): void {
    this.viewModeService.viewMode$.subscribe(mode => {
      this.currentViewMode = mode;
    });
  }

  toggleViewMode(): void {
    this.viewModeService.toggleViewMode();
  }

  get isDetailedMode(): boolean {
    return this.currentViewMode === 'detailed';
  }
}
```

### שימוש ב-QuestionCardComponent

```typescript
export class QuestionCardComponent implements OnInit, OnDestroy {
  currentViewMode: ViewMode = 'detailed';
  private viewModeSubscription?: Subscription;

  constructor(private viewModeService: ViewModeService) {}

  ngOnInit(): void {
    this.viewModeSubscription = this.viewModeService.viewMode$.subscribe(mode => {
      this.currentViewMode = mode;
    });
  }

  ngOnDestroy(): void {
    this.viewModeSubscription?.unsubscribe();
  }

  get isSimpleView(): boolean {
    return this.currentViewMode === 'simple';
  }
}
```

## טיפים ושימושים מתקדמים

### שילוב עם RxJS Operators

```typescript
import { map, distinctUntilChanged } from 'rxjs/operators';

// קבל רק אירועים כשהמצב משתנה ל-simple
this.viewModeService.viewMode$.pipe(
  distinctUntilChanged(),
  map(mode => mode === 'simple')
).subscribe(isSimple => {
  if (isSimple) {
    console.log('עברנו לתצוגה פשוטה');
  }
});
```

### שימוש ב-Async Pipe

```html
<div *ngIf="(viewModeService.viewMode$ | async) === 'simple'">
  תצוגה פשוטה פעילה
</div>
```

## קובץ הקונפיגורציה

המידע נשמר ב-localStorage תחת המפתח `'viewMode'`.

אם רוצים למחוק את ההעדפה השמורה:
```typescript
localStorage.removeItem('viewMode');
```
