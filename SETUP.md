# NutriLens Setup Guide

Complete step-by-step instructions to get NutriLens running on your machine.

## Quick Start (5 minutes)

```bash
# 1. Install dependencies
npm install

# 2. Add your API key to .env
echo "EXPO_PUBLIC_ANTHROPIC_API_KEY=sk-ant-..." > .env

# 3. Start the app
npx expo start
```

Then scan the QR code with:
- **iOS:** Camera app → Opens in Expo Go
- **Android:** Expo Go app → Scan QR

---

## Detailed Setup

### Step 1: Prerequisites

Install these if you don't have them:

**Node.js** (18 or newer)
```bash
node --version  # Should show v18.x or higher
```
Download from: https://nodejs.org

**Expo CLI** (optional but recommended)
```bash
npm install -g expo-cli
```

**Expo Go App** (on your phone)
- iOS: https://apps.apple.com/app/expo-go/id982107779
- Android: https://play.google.com/store/apps/details?id=host.exp.exponent

### Step 2: Get an Anthropic API Key

1. Go to: https://console.anthropic.com
2. Sign up or log in
3. Navigate to **API Keys**
4. Click **Create Key**
5. Copy the key (starts with `sk-ant-...`)

**Important:** Keep this key secret! Never commit it to git.

### Step 3: Clone & Install

```bash
# Navigate to the project directory
cd C:\Nutri_lens

# Install all dependencies
npm install

# This will take 2-3 minutes
```

### Step 4: Configure Environment

Create a `.env` file in the root directory:

**Windows:**
```cmd
echo EXPO_PUBLIC_ANTHROPIC_API_KEY=sk-ant-your-key-here > .env
```

**Mac/Linux:**
```bash
echo "EXPO_PUBLIC_ANTHROPIC_API_KEY=sk-ant-your-key-here" > .env
```

**Or manually:**
1. Create new file named `.env` (no file extension)
2. Add this line:
   ```
   EXPO_PUBLIC_ANTHROPIC_API_KEY=sk-ant-your-actual-key-here
   ```
3. Save the file

### Step 5: Start Development Server

```bash
npx expo start
```

You'll see a QR code in the terminal. Options:
- Press `i` → Open iOS simulator (Mac only)
- Press `a` → Open Android emulator (if installed)
- Press `w` → Open in web browser (limited features)
- Scan QR → Open on physical device

### Step 6: Test the App

1. **First Launch:** You'll see the profile screen
   - Enter your details (name, age, weight, height)
   - Select activity level
   - Choose your goal
   - Tap "Save Profile"

2. **Scan Food:**
   - Tap the green camera button
   - Grant camera permissions
   - Take a photo of any food
   - Wait for AI analysis
   - Adjust serving size if needed
   - Tap "Log to Diary"

3. **View Progress:**
   - Navigate to "Today" tab
   - See calorie ring and macro bars
   - Check "Progress" tab for weekly chart

---

## Running on Physical Device

### iOS (Requires Mac + Xcode)

**Option A: Expo Go (Easiest)**
1. Install Expo Go from App Store
2. Scan QR code from `npx expo start`
3. App loads instantly

**Option B: Development Build**
```bash
eas build --platform ios --profile development
```

### Android

**Option A: Expo Go**
1. Install Expo Go from Play Store
2. Scan QR code in-app
3. App loads instantly

**Option B: APK Build**
```bash
eas build --platform android --profile preview
```

---

## Running on Emulator/Simulator

### iOS Simulator (Mac only)

1. Install Xcode from App Store
2. Open Xcode → Preferences → Components
3. Install iOS Simulator
4. Run: `npx expo start`
5. Press `i` to open simulator

### Android Emulator

1. Install Android Studio
2. Open AVD Manager
3. Create a virtual device (Pixel 5, API 33)
4. Start the emulator
5. Run: `npx expo start`
6. Press `a` to deploy

---

## Troubleshooting

### "Cannot find module" errors

```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npx expo start -c
```

### Camera not working

**iOS:**
- Settings → Privacy → Camera → Enable for Expo Go

**Android:**
- Settings → Apps → Expo Go → Permissions → Camera → Allow

### API key not working

1. Check `.env` file exists in root directory
2. Verify key starts with `sk-ant-`
3. Restart expo server: Stop (Ctrl+C) and `npx expo start`
4. Check Anthropic console for API key status

### Slow image analysis

- Use good lighting
- Ensure stable internet connection
- Check Anthropic API status page
- Image may be too large (auto-resizes to 1024px)

### Database errors

```bash
# Reset database
rm -rf node_modules/.cache
npx expo start -c
```

### Build fails

```bash
# Update all Expo packages
npx expo install --fix

# Update Expo CLI
npm install -g expo-cli@latest
```

---

## Development Tips

### Hot Reloading

Changes auto-reload in Expo Go:
- Shake device → Developer menu
- Enable Fast Refresh
- File changes appear instantly

### Debug Menu

- **iOS:** Cmd+D (simulator) or Shake device
- **Android:** Cmd+M or Shake device

Options:
- Toggle Inspector
- Enable Performance Monitor
- Remote JS Debugging
- Show/Hide Element Inspector

### Environment Variables

Access in code:
```typescript
import Constants from 'expo-constants';

const apiKey = Constants.expoConfig?.extra?.EXPO_PUBLIC_ANTHROPIC_API_KEY;
```

### Viewing Logs

```bash
# Terminal logs
npx expo start

# Device logs (iOS)
npx react-native log-ios

# Device logs (Android)
npx react-native log-android
```

### SQLite Database Location

**iOS Simulator:**
```
~/Library/Developer/CoreSimulator/Devices/[DEVICE_ID]/data/Containers/Data/Application/[APP_ID]/Library/LocalDatabase/nutrilens.db
```

**Android Emulator:**
```
/data/data/host.exp.exponent/databases/nutrilens.db
```

View with: [DB Browser for SQLite](https://sqlitebrowser.org/)

---

## Testing Checklist

Before submitting or demoing:

- [ ] Camera capture works on real device
- [ ] Gallery picker selects images
- [ ] AI analysis returns nutrition data
- [ ] Food logs to correct meal type
- [ ] Calorie ring animates on home screen
- [ ] Macro bars show correct percentages
- [ ] Progress chart displays weekly data
- [ ] Profile saves and loads correctly
- [ ] Serving multiplier scales values
- [ ] Database persists across app restarts
- [ ] Dark mode renders properly
- [ ] No console errors or warnings

---

## Next Steps

Once running successfully:

1. **Customize appearance** → Edit `constants/theme.ts`
2. **Adjust calculations** → Modify `lib/goals.ts`
3. **Add features** → Follow existing patterns in `app/` and `components/`
4. **Build for production** → Set up EAS: `npm install -g eas-cli`

---

## Getting Help

- **Expo Docs:** https://docs.expo.dev
- **React Native Docs:** https://reactnative.dev
- **Anthropic API Docs:** https://docs.anthropic.com
- **Issues:** Create an issue in the GitHub repo

---

**You're all set!** Start scanning food and tracking nutrition.
