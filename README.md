# 🥗 NutriLens - AI-Powered Nutrition Tracker

> Scan any meal with your camera and instantly get detailed nutrition information powered by Claude AI

NutriLens is an intelligent mobile nutrition tracking app that uses advanced AI to recognize food and provide comprehensive nutritional analysis. Simply take a photo of your meal, and let AI do the rest!

[![React Native](https://img.shields.io/badge/React%20Native-0.81-blue.svg)](https://reactnative.dev/)
[![Expo](https://img.shields.io/badge/Expo-54.0-000020.svg)](https://expo.dev/)
[![Firebase](https://img.shields.io/badge/Firebase-12.11-orange.svg)](https://firebase.google.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue.svg)](https://www.typescriptlang.org/)

## ✨ Features

- **🔍 AI Food Recognition** — Take a photo and get instant calorie & nutrition data
- **📊 Comprehensive Tracking** — Track calories, macros (carbs, protein, fat), and micronutrients
- **🎯 Personalized Goals** — Set custom calorie and macro targets based on your needs
- **💡 Smart Insights** — Get AI-powered nutritional advice and healthier alternatives
- **📈 Progress Visualization** — Beautiful charts showing your weekly trends and streaks
- **🔐 Secure Authentication** — Email/password login with Firebase
- **☁️ Cloud Sync** — Your data automatically syncs across all your devices
- **🌙 Dark Mode** — Automatic theme switching for comfortable viewing

## 🎥 Demo

[Download APK](../../releases/latest) to try it on Android!

## 🏗️ Tech Stack

### Frontend
- **React Native 0.81** — Cross-platform mobile development
- **Expo SDK 54** — Development platform and tooling
- **Expo Router** — File-based routing
- **TypeScript 5.9** — Type-safe code
- **Zustand** — Lightweight state management

### Backend & Services
- **Firebase Authentication** — User authentication and management
- **Firebase Firestore** — Cloud NoSQL database for data storage
- **Anthropic Claude Haiku 4.5** — AI-powered food recognition (cost-optimized)
- **Expo Camera** — Camera integration
- **Expo Image Picker** — Gallery access

### Key Libraries
- `@anthropic-ai/sdk` — Claude AI integration
- `firebase` — Firebase services
- `expo-router` — Navigation
- `expo-file-system` — File handling
- `expo-haptics` — Tactile feedback

## Setup

### Prerequisites

- Node.js 18+ installed
- Expo CLI (`npm install -g expo-cli`)
- Anthropic API key ([Get one here](https://console.anthropic.com))

### Installation

1. **Install dependencies:**

```bash
npm install
```

2. **Set up environment variables:**

Create a `.env` file in the root directory:

```bash
EXPO_PUBLIC_ANTHROPIC_API_KEY=your_anthropic_api_key_here
```

3. **Start the development server:**

```bash
npx expo start
```

4. **Run on device:**

- **iOS:** Press `i` or scan QR code with Camera app
- **Android:** Press `a` or scan QR code with Expo Go app
- **Web:** Press `w` (camera features won't work)

## Project Structure

```
nutrilens/
├── app/                      # Screens (Expo Router)
│   ├── (tabs)/              # Tab navigation screens
│   │   ├── index.tsx        # Home dashboard
│   │   ├── progress.tsx     # Weekly analytics
│   │   ├── meals.tsx        # Meal history
│   │   └── profile.tsx      # Settings & goals
│   └── scan/                # Scanning flow
│       ├── camera.tsx       # Camera capture
│       ├── analyzing.tsx    # AI processing
│       └── result.tsx       # Nutrition display
├── components/              # Reusable UI components
├── lib/                     # Core logic
│   ├── claude.ts           # AI API integration
│   ├── storage.ts          # SQLite database
│   ├── nutrition.ts        # Calorie calculations
│   └── goals.ts            # TDEE/BMR calculations
├── store/                   # Zustand state management
├── types/                   # TypeScript definitions
└── constants/              # Theme & design tokens
```

## Key Screens

### 1. Home Screen
- Calorie ring showing consumed vs goal
- Macro progress bars (carbs, protein, fat)
- Today's meals grouped by type
- Quick scan button

### 2. Camera Screen
- Real-time camera preview
- Corner guides for framing
- Gallery picker option
- Capture with visual feedback

### 3. Analyzing Screen
- Animated scan line over food image
- Real-time AI processing steps
- Claude Vision analysis in progress

### 4. Result Screen
- Food name with confidence score
- Adjustable serving size
- Complete macro & micronutrient breakdown
- AI nutritional insights
- Healthier alternative suggestions
- Log to diary by meal type

### 5. Progress Screen
- 7-day calorie bar chart
- Weekly macro averages
- Streak tracking
- Most logged foods

### 6. Profile Screen
- Personal info (age, weight, height)
- Activity level selection
- Goal type (lose/maintain/gain)
- Auto-calculated TDEE & macro targets

## Database Schema

### Tables

**diary_entries**
- Stores all logged meals with complete nutrition data
- Links to original AI scan results
- Serving multiplier for portion adjustments

**user_goals**
- Personalized daily calorie and macro targets
- Activity level and goal type
- BMR/TDEE calculations

**streaks**
- Daily logging streak tracking
- Calories logged per day

## API Integration

The app uses the Anthropic Claude API with vision capabilities:

```typescript
const response = await client.messages.create({
  model: 'claude-sonnet-4-5',
  max_tokens: 1024,
  messages: [{
    role: 'user',
    content: [
      { type: 'image', source: { /* base64 image */ } },
      { type: 'text', text: '/* nutrition analysis prompt */' }
    ]
  }]
});
```

**Image processing:**
- Photos resized to max 1024px before upload
- JPEG compression at 80% quality
- Base64 encoding for API transmission

**Response format:**
- Structured JSON with complete nutrition data
- Confidence score (70-99%)
- Serving size estimation
- AI-generated insights
- Healthier alternatives

## Customization

### Modify Daily Macro Ratios

Edit `lib/goals.ts`:

```typescript
function calculateMacroSplit(dailyCalories, goalType) {
  // Adjust percentages here
  carbsPercent = 0.40;
  proteinPercent = 0.30;
  fatPercent = 0.30;
}
```

### Change Theme Colors

Edit `constants/theme.ts`:

```typescript
export const Colors = {
  green: '#1D9E75',      // Primary color
  greenLight: '#E1F5EE', // Light backgrounds
  // ... customize all colors
};
```

### Add New Meal Types

Update `types/nutrition.ts` and `constants/theme.ts`:

```typescript
mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack' | 'pre-workout'
```

## Performance Optimization

- **Image resizing:** Max 1024px reduces API payload and response time
- **Lazy loading:** Components rendered on-demand
- **Animated 60fps:** React Native Reanimated runs on UI thread
- **SQLite indexing:** Fast queries with indexed columns
- **State updates:** Zustand subscriptions prevent unnecessary re-renders

## Troubleshooting

### Camera not working
- Check permissions in app settings
- iOS: Requires `NSCameraUsageDescription` in app.json
- Android: Requires `CAMERA` permission

### API errors
- Verify `.env` file has valid Anthropic API key
- Check API key has vision model access
- Ensure internet connection

### Images not analyzing
- Try better lighting
- Hold camera steady during capture
- Ensure food is clearly visible
- Check API rate limits

### Build errors
- Clear cache: `npx expo start -c`
- Reinstall: `rm -rf node_modules && npm install`
- Update Expo: `npx expo install --fix`

## Building for Production

### iOS

```bash
eas build --platform ios
```

### Android

```bash
eas build --platform android
```

Requires EAS account: `npm install -g eas-cli && eas login`

## Privacy & Security

- All food diary data stored locally on device
- SQLite database never synced to cloud
- Camera images processed then discarded
- API key stored in environment variables (never committed)
- No user accounts or authentication required

## Roadmap

- [ ] Barcode scanning for packaged foods
- [ ] Custom food creation
- [ ] Recipe nutrition calculator
- [ ] Water intake tracking
- [ ] Exercise logging
- [ ] Export data to CSV
- [ ] Multi-day meal planning
- [ ] Shopping list generator
- [ ] Social sharing features

## License

MIT License - See LICENSE file for details

## Credits

Built with Claude Code by Anthropic
Powered by Claude Sonnet 4.5 Vision API

---

**Made with React Native + Expo** | [Report Issues](https://github.com/yourusername/nutrilens/issues)
