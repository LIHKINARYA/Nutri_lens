# Complete Installation Instructions for NutriLens

## Windows Installation

### Method 1: Quick Install (Recommended)

Open PowerShell or Command Prompt in the `C:\Nutri_lens` directory and run:

```cmd
npm install
```

### Method 2: Step by Step

1. **Verify Node.js is installed:**
```cmd
node --version
npm --version
```
Should show v18.x or higher. If not, download from https://nodejs.org

2. **Install dependencies:**
```cmd
cd C:\Nutri_lens
npm install
```

This installs:
- React Native & Expo frameworks
- Anthropic SDK for AI
- Camera & image processing libraries
- SQLite database
- UI components & animations
- All other required packages

⏱️ Installation takes 3-5 minutes depending on internet speed.

3. **Configure API Key:**

Create `.env` file:
```cmd
echo EXPO_PUBLIC_ANTHROPIC_API_KEY=your_key_here > .env
```

Or create manually:
- Right-click in folder → New → Text Document
- Rename to `.env` (no .txt extension)
- Open in Notepad
- Add: `EXPO_PUBLIC_ANTHROPIC_API_KEY=sk-ant-your-actual-api-key`
- Save and close

4. **Start the development server:**
```cmd
npx expo start
```

5. **Open on your phone:**
- Install "Expo Go" app from App Store or Play Store
- Scan the QR code shown in terminal
- App will load on your device

---

## Common Issues & Fixes

### Issue: "npm: command not found"
**Solution:** Install Node.js from https://nodejs.org
- Download the LTS version
- Run installer
- Restart terminal
- Try again

### Issue: "Cannot find module 'expo'"
**Solution:** Dependencies didn't install
```cmd
rm -rf node_modules
npm install
```

### Issue: ".env file not being read"
**Solution:**
- Make sure file is named `.env` exactly (no .txt)
- File must be in root directory (C:\Nutri_lens\.env)
- Restart expo: Stop (Ctrl+C) and run `npx expo start` again

### Issue: "Port 8081 already in use"
**Solution:** Kill existing Metro bundler
```cmd
npx expo start -c
```

### Issue: Camera permissions denied
**Solution:**
- iOS: Settings → Privacy → Camera → Expo Go → Enable
- Android: Settings → Apps → Expo Go → Permissions → Camera → Allow

---

## Verification Checklist

After installation, verify these work:

```cmd
# 1. Node.js installed
node --version
# Should show: v18.x.x or higher

# 2. NPM installed
npm --version
# Should show: 9.x.x or higher

# 3. Dependencies installed
npm ls expo
# Should show: expo@~52.0.0

# 4. Expo can start
npx expo start
# Should show QR code and Metro bundler running

# 5. .env file exists
dir .env
# Should show: .env file size

# 6. API key configured
type .env
# Should show: EXPO_PUBLIC_ANTHROPIC_API_KEY=sk-ant-...
```

---

## Running the App

### On Physical Device (Easiest)

**iOS:**
1. Install "Expo Go" from App Store
2. Run `npx expo start` on computer
3. Open Camera app
4. Point at QR code
5. Tap notification → Opens in Expo Go

**Android:**
1. Install "Expo Go" from Play Store
2. Run `npx expo start` on computer
3. Open Expo Go app
4. Tap "Scan QR code"
5. Point at QR code on screen
6. App loads automatically

### On Emulator (Advanced)

**iOS Simulator (Mac only):**
1. Install Xcode from App Store
2. Run `npx expo start`
3. Press `i` in terminal
4. Simulator opens with app

**Android Emulator:**
1. Install Android Studio
2. Create AVD (Android Virtual Device)
3. Start emulator
4. Run `npx expo start`
5. Press `a` in terminal

---

## File Structure Overview

```
C:\Nutri_lens\
│
├── .env                       ← YOUR API KEY HERE
├── package.json              ← Dependencies list
├── app.config.js             ← Expo configuration
├── metro.config.js           ← Bundler config
│
├── app/                      ← All screens
│   ├── _layout.tsx          ← Root navigation
│   ├── (tabs)/              ← Main app tabs
│   │   ├── index.tsx        ← Home screen
│   │   ├── progress.tsx     ← Analytics
│   │   ├── meals.tsx        ← Food diary
│   │   └── profile.tsx      ← Settings
│   └── scan/                ← Camera flow
│       ├── camera.tsx       ← Capture photo
│       ├── analyzing.tsx    ← AI processing
│       └── result.tsx       ← Show nutrition
│
├── components/              ← Reusable UI
├── lib/                     ← Core logic
├── store/                   ← App state
├── types/                   ← TypeScript types
└── constants/              ← Theme colors
```

---

## Development Workflow

1. **Make changes** to code in your editor
2. **Save file** → App auto-reloads in Expo Go
3. **Shake device** → Opens debug menu
4. **Check terminal** for errors and logs

### Useful Commands

```cmd
# Start development server
npx expo start

# Start with cache cleared
npx expo start -c

# Start on specific platform
npx expo start --ios
npx expo start --android
npx expo start --web

# Install new package
npx expo install package-name

# Update all packages
npx expo install --fix

# Check for issues
npx expo doctor
```

---

## Building for Production

### Prerequisites
```cmd
npm install -g eas-cli
eas login
eas build:configure
```

### Build Commands
```cmd
# iOS App Store build
eas build --platform ios

# Android APK for testing
eas build --platform android --profile preview

# Android App Bundle for Play Store
eas build --platform android
```

Builds are created in the cloud and downloadable.

---

## Updating the App

When you want to update NutriLens:

```cmd
# Get latest code
git pull

# Update dependencies
npm install

# Clear cache and restart
npx expo start -c
```

---

## Uninstalling

To completely remove NutriLens:

```cmd
# Remove dependencies
rm -rf node_modules

# Remove build cache
rm -rf .expo

# Remove lock files
rm package-lock.json

# (Optional) Remove the entire directory
cd ..
rm -rf Nutri_lens
```

---

## Support & Resources

- **Expo Documentation:** https://docs.expo.dev
- **React Native Docs:** https://reactnative.dev
- **Anthropic API:** https://docs.anthropic.com
- **Metro Bundler:** https://metrobundler.dev

---

## Success! What's Next?

Once installed and running:

1. ✅ **Complete profile** in Profile tab
2. ✅ **Scan first food** with camera button
3. ✅ **View progress** in Progress tab
4. ✅ **Customize goals** in Profile settings

**Happy tracking!** 📱🍽️
