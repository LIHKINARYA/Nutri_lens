# NutriLens Build Checklist

Use this checklist to verify all components are working correctly.

## ✅ Setup Verification

- [ ] Node.js 18+ installed (`node --version`)
- [ ] Dependencies installed (`npm install` completed)
- [ ] `.env` file created with API key
- [ ] Expo server starts without errors (`npx expo start`)
- [ ] QR code displays in terminal

## ✅ Core Features

### Home Screen (Today Tab)
- [ ] Greeting displays with time of day
- [ ] Date and streak badge show correctly
- [ ] Calorie ring animates on load
- [ ] Ring shows consumed vs goal accurately
- [ ] Macro bars (carbs, protein, fat) display
- [ ] Macro bars animate smoothly
- [ ] Scan button is visible and tappable
- [ ] Meal groups (breakfast/lunch/dinner/snacks) render
- [ ] Empty meal groups show placeholder
- [ ] Tab navigation works

### Camera Screen
- [ ] Camera permission prompt appears
- [ ] Live camera preview displays
- [ ] Corner guides visible
- [ ] Shutter button captures photo
- [ ] Gallery picker opens photo library
- [ ] Flip camera button works (front/back)
- [ ] Back button returns to home
- [ ] Captured photo passes to analyzing screen

### Analyzing Screen
- [ ] Food image displays with green tint
- [ ] Scan line animates top to bottom
- [ ] "Analyzing with AI" status shows
- [ ] Three step cards appear sequentially
- [ ] Step 1 activates at 0ms
- [ ] Step 2 activates at 1200ms
- [ ] Step 3 activates at 2500ms
- [ ] Checkmarks appear when steps complete
- [ ] Claude API call succeeds
- [ ] Navigation to result screen after analysis
- [ ] Error handling for failed analysis

### Result Screen
- [ ] Food image in header with gradient
- [ ] Food name displays correctly
- [ ] Confidence badge shows percentage
- [ ] Meal type selector (4 chips) works
- [ ] Selected meal highlights green
- [ ] Calorie hero card shows correct value
- [ ] Serving adjuster (+/- buttons) work
- [ ] Serving multiplier updates values
- [ ] All nutrition values scale correctly
- [ ] Macro 2x2 grid displays (carbs/protein/fat/fiber)
- [ ] Each macro shows progress bar
- [ ] Detailed nutrition table populated
- [ ] AI insight banner displays
- [ ] Healthier alternatives list shows 3 items
- [ ] Rescan button navigates back
- [ ] Log to Diary button saves entry
- [ ] Success alert appears after logging
- [ ] Navigates to home after logging

### Progress Screen
- [ ] Weekly summary card shows averages
- [ ] 7-day bar chart renders
- [ ] Today's bar highlighted in green
- [ ] Goal line displays if goals set
- [ ] Bars scale to highest value
- [ ] Day labels show correctly
- [ ] Macro averages calculated
- [ ] Most logged foods list populates
- [ ] Chart updates after new entries

### Meals Screen
- [ ] Date header shows current date
- [ ] Total calories display
- [ ] Items logged count correct
- [ ] Four meal groups render
- [ ] Expandable/collapsible groups work
- [ ] Food cards show all details
- [ ] AI badge visible on scanned items
- [ ] Delete button on entries works
- [ ] Confirmation dialog before delete
- [ ] Empty state shows when no meals
- [ ] Add button opens camera

### Profile Screen
- [ ] Name input field works
- [ ] Age input accepts numbers only
- [ ] Weight input accepts decimals
- [ ] Height input accepts numbers
- [ ] Activity level radio buttons work
- [ ] Selected activity highlights
- [ ] Goal type cards work (3 options)
- [ ] Selected goal highlights
- [ ] Daily targets auto-calculate
- [ ] Displays: calories, carbs, protein, fat
- [ ] Save button updates database
- [ ] Success alert after save
- [ ] Values persist after app restart

## ✅ Data Persistence

- [ ] SQLite database initialized on first launch
- [ ] diary_entries table created
- [ ] user_goals table created
- [ ] streaks table created
- [ ] Food entries save to database
- [ ] Entries reload after app restart
- [ ] Today's totals calculate correctly
- [ ] Week entries query works
- [ ] Streak increments daily
- [ ] Streak resets if day skipped
- [ ] User goals save and load
- [ ] Database queries are fast (<100ms)

## ✅ AI Integration

- [ ] Anthropic API key loaded from .env
- [ ] Images resize to max 1024px before upload
- [ ] JPEG compression at 80% quality
- [ ] Base64 encoding succeeds
- [ ] API request includes vision model
- [ ] Prompt formatted correctly
- [ ] Response parses as JSON
- [ ] All nutrition fields present
- [ ] Confidence score 70-99%
- [ ] Food name is specific (not generic)
- [ ] Serving size estimated
- [ ] All macros and micros returned
- [ ] AI insight text is relevant
- [ ] Three alternatives provided
- [ ] Alternatives have lower calories
- [ ] Error handling for API failures
- [ ] Retry option on errors

## ✅ Animations & UX

- [ ] Calorie ring spring animation (800ms)
- [ ] Macro bars slide animation
- [ ] Scan button pulse effect
- [ ] Scan line loops smoothly
- [ ] Step cards fade in sequentially
- [ ] Serving +/- buttons bounce
- [ ] Tab transitions smooth
- [ ] No animation stuttering
- [ ] 60fps maintained
- [ ] Haptic feedback on actions
- [ ] Loading states display
- [ ] Skeleton loaders where appropriate

## ✅ Error Handling

- [ ] No camera permission handled
- [ ] Settings deep link works
- [ ] API failure shows error message
- [ ] Network offline detected
- [ ] Retry button on failures
- [ ] Low confidence food detected
- [ ] "No food detected" state shows
- [ ] Image too large auto-resizes
- [ ] Invalid API key error clear
- [ ] Database errors caught
- [ ] Validation on profile inputs
- [ ] Toast messages for success/error

## ✅ Performance

- [ ] App launches in <3 seconds
- [ ] Camera opens immediately
- [ ] Photo capture instant
- [ ] AI analysis <10 seconds
- [ ] Database queries fast
- [ ] Smooth scrolling all screens
- [ ] No memory leaks
- [ ] Images load quickly
- [ ] No unnecessary re-renders
- [ ] Bundle size reasonable (<50MB)

## ✅ UI/UX Polish

- [ ] Safe area insets handled (notch)
- [ ] Status bar style appropriate
- [ ] Keyboard dismisses when tapping outside
- [ ] Form inputs have proper keyboard types
- [ ] All buttons have active states
- [ ] Touch targets ≥44x44 pixels
- [ ] Consistent spacing throughout
- [ ] Border radius consistent (12-20px)
- [ ] Typography hierarchy clear
- [ ] Colors accessible (WCAG AA)
- [ ] Icons aligned properly
- [ ] Loading indicators visible
- [ ] Empty states friendly
- [ ] Success feedback clear

## ✅ Cross-Platform

### iOS
- [ ] Runs on iPhone 12+ (iOS 16+)
- [ ] Safe area respected
- [ ] Camera works
- [ ] Photo picker works
- [ ] Haptics work
- [ ] Animations smooth
- [ ] Database persists
- [ ] Dark mode supported

### Android
- [ ] Runs on Android 12+
- [ ] Safe area respected
- [ ] Camera works
- [ ] Photo picker works
- [ ] Haptics work (if supported)
- [ ] Animations smooth
- [ ] Database persists
- [ ] Dark mode supported

## ✅ Dark Mode

- [ ] Color scheme detects system preference
- [ ] All screens support dark mode
- [ ] Text readable in dark mode
- [ ] Cards have proper contrast
- [ ] Images have proper overlays
- [ ] Icons visible in dark mode
- [ ] Charts render correctly
- [ ] Transitions smooth between modes

## ✅ Accessibility

- [ ] All interactive elements have labels
- [ ] Touch targets adequate size
- [ ] Color contrast passes WCAG AA
- [ ] Text scalable
- [ ] Screen reader compatible
- [ ] Form labels associated
- [ ] Error messages clear
- [ ] Focus indicators visible

## ✅ Security & Privacy

- [ ] API key in .env (not committed)
- [ ] No sensitive data logged
- [ ] Images deleted after analysis
- [ ] Database local only
- [ ] No analytics tracking
- [ ] Permissions requested with context
- [ ] No data sent to external servers
- [ ] SQLite database encrypted (optional)

## ✅ Production Ready

- [ ] All TypeScript errors resolved
- [ ] No console warnings
- [ ] No TODO comments in code
- [ ] README complete
- [ ] Setup guide tested
- [ ] .gitignore excludes .env
- [ ] app.json configured correctly
- [ ] Bundle identifier set
- [ ] App icons created
- [ ] Splash screen designed
- [ ] App name finalized
- [ ] Version number set

## 🎯 Final Test Scenarios

### Scenario 1: New User Onboarding
1. Install app for first time
2. Complete profile setup
3. Scan first food item
4. Log to breakfast
5. View in today screen
6. Check progress screen

### Scenario 2: Daily Usage
1. Open app morning
2. Scan breakfast
3. Log 2 items
4. Check calorie ring
5. Scan lunch at noon
6. Adjust serving size
7. Log to lunch
8. View progress chart
9. Check macro totals

### Scenario 3: Error Recovery
1. Deny camera permission
2. See permission screen
3. Grant permission
4. Retry scan
5. Capture blurry photo
6. Get low confidence error
7. Rescan with better lighting
8. Successfully analyze
9. Log food

### Scenario 4: Multi-Day Usage
1. Log food today
2. Close app completely
3. Reopen tomorrow
4. Verify yesterday's data persists
5. Log new food today
6. Check progress chart shows both days
7. Verify streak incremented

---

## 📊 Metrics to Track

- App launch time: ____ seconds
- Camera open time: ____ seconds
- AI analysis time: ____ seconds
- Database query time: ____ ms
- Bundle size: ____ MB
- Memory usage: ____ MB
- Frame rate: ____ fps
- Crash rate: ____ %

---

## ✨ Quality Gate

**All items must be checked before considering production-ready.**

**Current Status:** _____ / _____ items complete

**Last Updated:** ________________

**Tested By:** ________________

**Platform:** [ ] iOS [ ] Android [ ] Both

**Version:** ________________
