# 🥗 NutriLens - AI-Powered Nutrition Tracker

<div align="center">

![NutriLens Logo](https://img.shields.io/badge/NutriLens-AI%20Nutrition%20Tracker-1D9E75?style=for-the-badge&logo=data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEyIDJDNi40OCAyIDIgNi40OCAyIDEyczQuNDggMTAgMTAgMTAgMTAtNC40OCAxMC0xMFMxNy41MiAyIDEyIDJ6bTAgMThjLTQuNDEgMC04LTMuNTktOC04czMuNTktOCA4LTggOCAzLjU5IDggOC0zLjU5IDgtOCA4eiIgZmlsbD0iI2ZmZiIvPgo8L3N2Zz4=)

**Scan your meals, track nutrition, reach your goals** ✨

[![React Native](https://img.shields.io/badge/React_Native-0.81-61DAFB?style=flat-square&logo=react&logoColor=white)](https://reactnative.dev/)
[![Expo](https://img.shields.io/badge/Expo-54.0-000020?style=flat-square&logo=expo&logoColor=white)](https://expo.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Firebase](https://img.shields.io/badge/Firebase-12.11-FFCA28?style=flat-square&logo=firebase&logoColor=black)](https://firebase.google.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg?style=flat-square)](LICENSE)

[📱 Download APK](#-download) • [🚀 Features](#-features) • [📖 Documentation](#-documentation) • [🛠️ Setup](#️-installation)

</div>

---

## 📖 About

**NutriLens** is an AI-powered mobile nutrition tracking application that makes logging meals effortless. Simply take a photo of your food, and let advanced AI instantly identify and analyze the nutritional content. No more manual entry, no more guessing - just smart, accurate nutrition tracking.

Built with modern technologies including **React Native**, **Expo**, **Firebase**, and **Claude AI**, NutriLens provides a seamless experience for users who want to maintain a healthy lifestyle without the hassle of traditional food logging.

---

## ✨ Features

### 🤖 **AI-Powered Food Recognition**
- Instant food identification using Claude Haiku 4.5 vision model
- Recognizes dishes with 70-99% confidence
- Provides detailed nutritional breakdown automatically

### 📊 **Comprehensive Nutrition Tracking**
- **Macronutrients:** Calories, Carbs, Protein, Fat, Fiber, Sugar
- **Micronutrients:** Sodium, Potassium, Cholesterol, Calcium, Iron, Vitamin C
- Adjustable serving sizes with real-time recalculation
- Meal categorization (Breakfast, Lunch, Dinner, Snacks)

### 🎯 **Personalized Goals**
- Custom daily calorie targets
- Macro distribution based on your goals (lose, maintain, gain weight)
- Activity level adjustment
- BMR/TDEE automatic calculation

### 📈 **Progress Visualization**
- Weekly calorie trends with bar charts
- 7-day streak tracking
- Average macro consumption
- Most frequently logged foods
- Daily summary dashboard

### 💡 **Smart AI Insights**
- Nutritional commentary specific to each dish
- Healthier alternative suggestions
- Actionable dietary advice
- Calorie comparison with alternatives

### ☁️ **Cloud Sync & Authentication**
- Secure Firebase Authentication
- Email/password login
- Cross-device data synchronization
- Real-time Firestore database
- Automatic data backup

### 🎨 **Beautiful UI/UX**
- Clean, modern interface
- Dark mode support
- Smooth animations
- Intuitive navigation
- Camera scanning with visual guides

---

## 📱 Download

### Android APK
Download the latest version from [Releases](https://github.com/LIHKINARYA/Nutri_lens/releases/latest)

### System Requirements
- **Android:** 6.0 (API 23) or higher
- **iOS:** 13.0 or higher *(coming soon)*
- Camera permission required
- Internet connection for AI analysis

---

## 📸 Screenshots

<div align="center">

| Welcome Screen | Scanning | Nutrition Results |
|:---:|:---:|:---:|
| 🏠 | 📸 | 📊 |

| Daily Dashboard | Progress Chart | Meal Log |
|:---:|:---:|:---:|
| 📅 | 📈 | 🍽️ |

*Screenshots coming soon - app in beta*

</div>

---

## 🛠️ Tech Stack

### **Frontend**
- **React Native** `0.81` - Cross-platform mobile framework
- **Expo SDK** `54.0` - Development platform and build tools
- **TypeScript** `5.9` - Type-safe development
- **Expo Router** `6.0` - File-based navigation
- **Zustand** `5.0` - Lightweight state management

### **Backend & Services**
- **Firebase Authentication** - User management and secure login
- **Firebase Firestore** - NoSQL cloud database
- **Anthropic Claude AI** - Computer vision and food recognition
- **Expo Camera** - Native camera integration
- **Expo Image Picker** - Photo gallery access

### **Key Dependencies**
```json
{
  "@anthropic-ai/sdk": "^0.32.1",
  "firebase": "^12.11.0",
  "expo": "~54.0.0",
  "react-native": "0.81.5",
  "zustand": "^5.0.2"
}
```

---

## 🚀 Installation

### Prerequisites
- **Node.js** 18+ and npm
- **Expo Go** app (for testing on phone)
- **Firebase** account
- **Anthropic API** key

### Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/LIHKINARYA/Nutri_lens.git
   cd Nutri_lens
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**

   Create a `.env` file in the root directory:
   ```env
   EXPO_PUBLIC_ANTHROPIC_API_KEY=your_anthropic_api_key

   EXPO_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
   EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   EXPO_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
   EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   EXPO_PUBLIC_FIREBASE_APP_ID=your_app_id
   EXPO_PUBLIC_FIREBASE_MEASUREMENT_ID=your_measurement_id
   ```

4. **Start the development server**
   ```bash
   npm start
   ```

5. **Run on your device**
   - Scan the QR code with **Expo Go** (Android) or **Camera** app (iOS)
   - Or press `a` for Android emulator / `i` for iOS simulator

---

## 🔑 API Setup

### Anthropic Claude AI

1. Go to [Anthropic Console](https://console.anthropic.com/)
2. Create an account and add credits ($5 minimum)
3. Generate an API key under Settings → API Keys
4. Add to your `.env` file

**Cost:** ~$0.002-0.003 per food scan with Claude Haiku 4.5

### Firebase Setup

1. Create a project at [Firebase Console](https://console.firebase.google.com/)
2. Enable **Authentication** → Email/Password provider
3. Enable **Firestore Database** → Start in test mode
4. Go to Project Settings → Get your config values
5. Add to your `.env` file

**Free tier:** 50K reads/20K writes per day

---

## 📁 Project Structure

```
nutrilens/
├── app/                          # Expo Router pages
│   ├── (tabs)/                   # Tab navigation
│   │   ├── index.tsx            # Home dashboard
│   │   ├── meals.tsx            # Meal history
│   │   ├── progress.tsx         # Weekly analytics
│   │   └── profile.tsx          # User settings
│   ├── auth/                     # Authentication screens
│   │   ├── login.tsx
│   │   ├── signup.tsx
│   │   └── phone.tsx
│   ├── scan/                     # Food scanning flow
│   │   ├── camera.tsx           # Camera capture
│   │   ├── analyzing.tsx        # AI processing
│   │   └── result.tsx           # Nutrition display
│   └── _layout.tsx              # Root layout & navigation
├── components/                   # Reusable UI components
│   ├── CalorieRing.tsx
│   ├── MacroBar.tsx
│   ├── MealGroup.tsx
│   └── ...
├── lib/                          # Core logic & utilities
│   ├── claude.ts                # Anthropic AI integration
│   ├── firebase.ts              # Firebase initialization
│   ├── firebaseAuth.ts          # Authentication functions
│   ├── firestore.ts             # Database operations
│   ├── nutrition.ts             # Nutrition calculations
│   └── goals.ts                 # TDEE/BMR formulas
├── store/                        # Zustand state management
│   ├── authStore.ts             # Authentication state
│   ├── diaryStore.ts            # Food diary state
│   └── userStore.ts             # User settings state
├── constants/                    # App constants
│   └── theme.ts                 # Colors, typography
├── types/                        # TypeScript definitions
│   └── nutrition.ts
├── app.config.js                # Expo configuration
├── eas.json                     # Build configuration
└── package.json
```

---

## 🎯 Key Screens

### 📱 Home Screen
- Calorie ring showing consumed vs goal
- Macro progress bars (Carbs, Protein, Fat)
- Today's meals grouped by type
- Quick access to camera scan

### 📸 Camera Screen
- Real-time camera preview
- Frame guides for optimal photo
- Gallery picker option
- Silent capture (production build)

### ⚡ Analyzing Screen
- Animated scan visualization
- Real-time AI processing indicators
- Food recognition in progress

### 📊 Result Screen
- AI-identified food name with confidence
- Adjustable serving size slider
- Complete nutrition breakdown
- AI insights and recommendations
- Healthier alternative suggestions
- One-tap logging to diary

### 📈 Progress Screen
- 7-day calorie bar chart
- Weekly macro averages
- Streak tracking
- Most logged foods list

### 👤 Profile Screen
- Personal information
- Activity level settings
- Goal type selection
- Auto-calculated calorie targets
- Account management

---

## 🔬 How It Works

1. **📸 Capture:** User takes a photo of their meal
2. **🔄 Process:** Image is compressed and sent to Claude AI
3. **🤖 Analyze:** AI identifies food and estimates nutrition
4. **📊 Display:** Results shown with confidence score
5. **✏️ Adjust:** User can modify serving size
6. **💾 Save:** Logged to Firebase with timestamp
7. **☁️ Sync:** Data syncs across all user devices

### AI Analysis Prompt Engineering

The app uses a carefully crafted prompt that instructs Claude AI to:
- Identify specific dish names (not generic categories)
- Estimate typical serving sizes
- Calculate comprehensive nutrition data
- Provide actionable dietary insights
- Suggest healthier alternatives
- Return structured JSON for parsing

---

## 📊 Database Schema

### Firestore Structure

```
users/
  └── {userId}/
      ├── profile/
      │   ├── data          # User profile info
      │   └── goals         # Nutrition goals
      └── daily_entries/
          └── {YYYY-MM-DD}  # Daily food log
              ├── date
              ├── meals[]   # Array of food entries
              ├── totalCalories
              ├── totalCarbs
              ├── totalProtein
              └── ...
```

### Food Entry Model

```typescript
interface FoodEntry {
  id: number;
  date: string;
  mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  foodName: string;
  calories: number;
  carbs: number;
  protein: number;
  fat: number;
  fiber: number;
  sugar: number;
  // + 7 more micronutrients
  servingMultiplier: number;
  imageUri: string;
  aiData: string;
  isAiScanned: boolean;
  loggedAt: string;
}
```

---

## 🏗️ Building for Production

### Build APK (Android)

1. **Install EAS CLI**
   ```bash
   npm install -g eas-cli
   ```

2. **Login to Expo**
   ```bash
   eas login
   ```

3. **Build APK**
   ```bash
   eas build --platform android --profile preview
   ```

4. **Download and install** the APK when build completes (10-15 min)

### Build for iOS

```bash
eas build --platform ios --profile preview
```

*Note: Requires Apple Developer account*

---

## 🧪 Testing

### Run in Development

```bash
# Start dev server
npm start

# Run on Android
npm run android

# Run on iOS
npm run ios
```

### Test Credentials

For testing the live app:
```
Email: demo@nutrilens.com
Password: Demo123!
```

---

## 🐛 Troubleshooting

### Camera Not Working
- Check camera permissions in device settings
- Grant storage permissions for gallery access
- Restart the app after granting permissions

### API Errors
- Verify `.env` file has valid API keys
- Check Anthropic account has credits
- Ensure internet connection is stable

### Firebase Authentication Issues
- Check Firebase console for enabled providers
- Verify Firebase config in `.env`
- Check Firestore security rules

### Build Fails
```bash
# Clear cache and reinstall
npx expo start -c
rm -rf node_modules
npm install
```

---

## 🚀 Deployment

### Publish to Expo
```bash
eas update --branch production
```

### Submit to Google Play Store
```bash
eas submit --platform android
```

### Submit to Apple App Store
```bash
eas submit --platform ios
```

See [PUBLISHING_GUIDE.md](PUBLISHING_GUIDE.md) for detailed instructions.

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Development Guidelines

- Follow TypeScript best practices
- Maintain existing code style
- Write meaningful commit messages
- Test on both Android and iOS (if possible)
- Update documentation for new features

---

## 📝 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

```
MIT License

Copyright (c) 2024 NutriLens

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software...
```

---

## 👨‍💻 Author

**LIHKINARYA**

- GitHub: [@LIHKINARYA](https://github.com/LIHKINARYA)
- LinkedIn: [Your LinkedIn](https://linkedin.com/in/yourprofile)
- Email: your.email@example.com

---

## 🙏 Acknowledgments

- **[Anthropic](https://www.anthropic.com/)** - Claude AI for food recognition
- **[Firebase](https://firebase.google.com/)** - Backend services
- **[Expo](https://expo.dev/)** - Development platform
- **[React Native](https://reactnative.dev/)** - Mobile framework
- **Open source community** - For amazing libraries and tools

---

## 📊 Project Stats

- **Lines of Code:** 20,000+
- **Files:** 60+
- **Technologies:** 15+
- **Development Time:** [Your timeframe]
- **Version:** 1.0.5

---

## 🗺️ Roadmap

### Current Features (v1.0)
- ✅ AI food recognition
- ✅ Nutrition tracking
- ✅ Cloud sync
- ✅ Progress visualization
- ✅ User authentication

### Planned Features (v2.0)
- [ ] Barcode scanning for packaged foods
- [ ] Custom food creation
- [ ] Recipe nutrition calculator
- [ ] Water intake tracking
- [ ] Exercise logging
- [ ] Meal planning features
- [ ] Social sharing
- [ ] Export data to CSV
- [ ] Multi-language support
- [ ] Apple Health integration
- [ ] Google Fit integration

---

## 📞 Support

If you encounter any issues or have questions:

- 📧 Email: support@nutrilens.com
- 🐛 [Open an Issue](https://github.com/LIHKINARYA/Nutri_lens/issues)
- 💬 [Discussions](https://github.com/LIHKINARYA/Nutri_lens/discussions)

---

## ⭐ Show Your Support

If you find this project useful, please consider:

- ⭐ **Starring** the repository
- 🐛 **Reporting** bugs and issues
- 💡 **Suggesting** new features
- 📢 **Sharing** with others
- 🤝 **Contributing** to the code

---

## 📱 Connect

<div align="center">

[![GitHub followers](https://img.shields.io/github/followers/LIHKINARYA?style=social)](https://github.com/LIHKINARYA)
[![GitHub stars](https://img.shields.io/github/stars/LIHKINARYA/Nutri_lens?style=social)](https://github.com/LIHKINARYA/Nutri_lens/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/LIHKINARYA/Nutri_lens?style=social)](https://github.com/LIHKINARYA/Nutri_lens/network/members)

</div>

---

<div align="center">

**Made with ❤️ and ☕ by LIHKINARYA**

*Transforming nutrition tracking with AI, one meal at a time* 🥗✨

</div>
