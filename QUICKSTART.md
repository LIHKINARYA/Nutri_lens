# NutriLens Quick Start

> Get NutriLens running in 2 minutes

## 1️⃣ Install (30 seconds)

```bash
npm install
```

## 2️⃣ Configure (30 seconds)

Create `.env` file:
```bash
EXPO_PUBLIC_ANTHROPIC_API_KEY=your_key_here
```

Get API key: https://console.anthropic.com

## 3️⃣ Run (30 seconds)

```bash
npx expo start
```

Scan QR code with:
- **iOS:** Camera app
- **Android:** Expo Go app

## 4️⃣ Test (30 seconds)

1. Set up profile
2. Tap camera button
3. Scan any food
4. View nutrition

**Done!** ✅

---

## Development Commands

```bash
# Start dev server
npx expo start

# Clear cache
npx expo start -c

# iOS simulator
npx expo start --ios

# Android emulator
npx expo start --android

# Check for issues
npx expo doctor
```

---

## File Structure

```
app/
├── (tabs)/        # Main screens
│   ├── index.tsx  # Home
│   ├── progress   # Charts
│   ├── meals      # History
│   └── profile    # Settings
└── scan/          # Camera flow
    ├── camera     # Capture
    ├── analyzing  # AI
    └── result     # Display

components/        # UI pieces
lib/              # Logic
store/            # State
```

---

## Common Issues

**"Cannot find module"**
```bash
npm install
```

**Camera not working**
- Grant permissions in phone settings

**API not working**
- Check `.env` file exists
- Verify API key is valid
- Restart: `npx expo start`

---

## Key Files

| File | Purpose |
|------|---------|
| `.env` | API key (DON'T COMMIT) |
| `app/_layout.tsx` | Navigation setup |
| `lib/claude.ts` | AI integration |
| `lib/storage.ts` | Database |
| `store/diaryStore.ts` | App state |

---

## Customization

**Colors:** `constants/theme.ts`
```typescript
export const Colors = {
  green: '#1D9E75',  // Change primary color
  // ...
};
```

**Goals:** `lib/goals.ts`
```typescript
// Adjust macro percentages
carbsPercent = 0.40;   // 40% carbs
proteinPercent = 0.30; // 30% protein
fatPercent = 0.30;     // 30% fat
```

---

## Need Help?

- 📖 Full docs: `README.md`
- 🔧 Setup guide: `SETUP.md`
- ✅ Testing: `CHECKLIST.md`
- 🐛 Issues: GitHub issues

---

**Happy coding!** 🚀
