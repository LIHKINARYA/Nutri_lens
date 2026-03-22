# 🚀 Get Started with NutriLens

Welcome! This guide will get you from zero to scanning food in **under 5 minutes**.

---

## ⚡ Lightning Setup (< 2 minutes)

### Step 1: Install Dependencies

Open terminal in `C:\Nutri_lens` and run:

```bash
npm install
```

☕ Grab a coffee. This takes ~2 minutes.

### Step 2: Add Your API Key

1. Get an Anthropic API key from: https://console.anthropic.com/settings/keys
2. Create a file named `.env` in the project root
3. Add this line (replace with your actual key):

```
EXPO_PUBLIC_ANTHROPIC_API_KEY=sk-ant-your-key-here
```

### Step 3: Start the App

```bash
npx expo start
```

A QR code will appear in your terminal.

### Step 4: Open on Your Phone

**iPhone:**
1. Open Camera app
2. Point at QR code
3. Tap notification
4. Opens in Expo Go

**Android:**
1. Open Expo Go app
2. Tap "Scan QR code"
3. Point at QR code
4. App loads

---

## 🎯 Your First Food Scan

1. **Setup Profile**
   - Enter your name, age, weight, height
   - Select activity level
   - Choose your goal
   - Tap "Save Profile"

2. **Scan Food**
   - Tap the big green camera button
   - Grant camera permissions
   - Take a photo of any meal
   - Wait 5-10 seconds

3. **View Results**
   - See AI-identified food name
   - Check calories and macros
   - Adjust serving size if needed
   - Select meal type
   - Tap "Log to Diary"

4. **Track Progress**
   - Go to "Today" tab
   - See your calorie ring
   - Check macro progress bars
   - View logged meals

**🎉 Congratulations! You're tracking nutrition with AI.**

---

## 📖 Documentation Index

Choose your path:

| Document | Best For | Time |
|----------|----------|------|
| **QUICKSTART.md** | Absolute fastest path | 2 min |
| **GET_STARTED.md** | First-time setup (this file) | 5 min |
| **SETUP.md** | Detailed instructions | 15 min |
| **INSTALLATION.md** | Troubleshooting install | 10 min |
| **README.md** | Feature overview | 10 min |
| **CHECKLIST.md** | Testing & QA | 30 min |
| **BUILD_SUMMARY.md** | Complete technical spec | 20 min |

---

## 🎨 Customization Quick Wins

### Change Primary Color

Edit `constants/theme.ts`:

```typescript
export const Colors = {
  green: '#FF6B6B',  // Your brand color
  // ...
}
```

### Adjust Macro Ratios

Edit `lib/goals.ts`:

```typescript
function calculateMacroSplit(dailyCalories, goalType) {
  carbsPercent = 0.50;   // 50% carbs
  proteinPercent = 0.25; // 25% protein
  fatPercent = 0.25;     // 25% fat
}
```

### Change App Name

Edit `app.config.js`:

```javascript
name: 'MyFoodTracker',
slug: 'myfoodtracker',
```

---

## 🐛 Common Issues & Fixes

### "Cannot find module 'expo'"

**Problem:** Dependencies not installed
**Fix:**
```bash
npm install
```

### Camera Not Working

**Problem:** Permissions denied
**Fix:**
- iOS: Settings → Privacy → Camera → Expo Go → Enable
- Android: Settings → Apps → Expo Go → Permissions → Camera → Allow

### API Key Not Working

**Problem:** `.env` file not found or incorrect
**Fix:**
1. Check file is named `.env` exactly (no .txt)
2. Check file is in root: `C:\Nutri_lens\.env`
3. Verify key starts with `sk-ant-`
4. Restart: Stop server (Ctrl+C) and run `npx expo start`

### Analysis Takes Forever

**Problem:** Large images or slow connection
**Fix:**
- Ensure good internet connection
- Images auto-resize to 1024px
- Check Anthropic API status

### App Won't Load on Phone

**Problem:** Phone and computer not on same network
**Fix:**
- Connect both to same WiFi
- Or try "Tunnel" mode in Expo
- Or use Expo Go's QR scanner

---

## 💻 Development Tools

### Hot Reload

Changes auto-reload:
- Save file → App updates instantly
- No need to rebuild

### Debug Menu

**iOS:** Shake device or Cmd+D (simulator)
**Android:** Shake device or Cmd+M

Menu options:
- Toggle Inspector
- Performance Monitor
- Remote Debugging
- Reload

### View Logs

```bash
# In the terminal where you ran npx expo start
# All console.log() statements appear here
```

---

## 📂 Project Structure at a Glance

```
app/
├── (tabs)/        ← Main screens (home, progress, meals, profile)
└── scan/          ← Camera flow (camera, analyzing, result)

components/        ← Reusable UI (buttons, cards, charts)
lib/              ← Logic (AI, database, calculations)
store/            ← App state (diary, user)
constants/        ← Design tokens (colors, spacing)
types/            ← TypeScript types
```

**Need to edit a screen?** → Go to `app/`
**Need to change colors?** → Go to `constants/theme.ts`
**Need to modify AI?** → Go to `lib/claude.ts`
**Need to change database?** → Go to `lib/storage.ts`

---

## 🎓 Learn the Stack

### Key Technologies

1. **React Native** - Cross-platform mobile framework
2. **Expo** - Tools and services for React Native
3. **TypeScript** - Type-safe JavaScript
4. **Zustand** - Simple state management
5. **SQLite** - Local database
6. **Reanimated** - Smooth 60fps animations
7. **NativeWind** - Tailwind CSS for mobile
8. **Claude API** - AI vision and analysis

### Recommended Learning Path

1. **React basics** → https://react.dev/learn
2. **React Native** → https://reactnative.dev/docs/getting-started
3. **Expo** → https://docs.expo.dev/
4. **TypeScript** → https://www.typescriptlang.org/docs/

---

## 🚀 Next Steps

### After Your First Scan

1. ✅ Scan multiple foods
2. ✅ Try different meal types
3. ✅ Adjust serving sizes
4. ✅ Check progress charts
5. ✅ Update your profile

### Customize Your App

1. 🎨 Change colors in `constants/theme.ts`
2. 📊 Modify macro ratios in `lib/goals.ts`
3. 🖼️ Replace app icon in `assets/`
4. 📝 Update app name in `app.config.js`

### Add Features

Ideas to extend NutriLens:
- [ ] Barcode scanner
- [ ] Recipe calculator
- [ ] Water tracking
- [ ] Exercise logging
- [ ] Meal planning
- [ ] Custom foods
- [ ] Share meals
- [ ] Weekly goals

---

## 🆘 Getting Help

### In This Project

- **Error in terminal?** → Check syntax in recent changes
- **Crash on phone?** → Check terminal for error details
- **UI looks wrong?** → Check if dark mode is enabled
- **Database issues?** → Try `npx expo start -c`

### External Resources

- **Expo Issues:** https://expo.dev/help
- **React Native:** https://reactnative.dev/help
- **Anthropic API:** https://docs.anthropic.com/
- **Stack Overflow:** Tag your question with `expo` and `react-native`

### Community

- **Expo Discord:** https://chat.expo.dev
- **React Native Discord:** https://www.reactiflux.com/
- **GitHub Issues:** Create issue in your repo

---

## ✅ Verification Checklist

Before considering yourself "set up":

- [ ] `npm install` completed without errors
- [ ] `.env` file created with valid API key
- [ ] `npx expo start` shows QR code
- [ ] App loads on phone
- [ ] Camera opens when tapped
- [ ] Photo captures successfully
- [ ] AI analysis returns results
- [ ] Food logs to diary
- [ ] Data persists after restart

**All checked?** You're ready to build! 🎉

---

## 🌟 Pro Tips

1. **Fast Iteration:** Use hot reload - save file and see changes instantly
2. **Debug Faster:** Use `console.log()` - appears in terminal
3. **Test on Real Device:** Simulators don't have camera
4. **Use TypeScript:** Types catch bugs before runtime
5. **Read Errors:** Terminal errors tell you exactly what's wrong
6. **Cache Issues:** When in doubt, run `npx expo start -c`

---

## 🎯 Your Development Journey

```
TODAY:         Set up app and scan first food
WEEK 1:        Customize colors and branding
WEEK 2:        Add your own features
MONTH 1:       Build and deploy to App Store/Play Store
FUTURE:        Scale to thousands of users
```

---

## 📱 Deployment Preview

When ready to publish:

```bash
# Install EAS
npm install -g eas-cli

# Login
eas login

# Configure
eas build:configure

# Build for iOS
eas build --platform ios

# Build for Android
eas build --platform android

# Submit to stores
eas submit
```

Full guide: `SETUP.md` → "Building for Production"

---

## 💡 Final Thoughts

**You now have:**
- ✅ Complete food tracking app
- ✅ AI-powered nutrition analysis
- ✅ Beautiful, animated UI
- ✅ Offline-first architecture
- ✅ Production-ready codebase

**What's next is up to you:**
- Customize it
- Add features
- Launch to app stores
- Build a business
- Help people eat healthier

---

**🚀 Ready to build something amazing?**

Start here: `npx expo start`

---

*Built with React Native + Expo | Powered by Claude AI*
