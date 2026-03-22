# NutriLens - App Store Publishing Guide

Complete guide to publish NutriLens to Google Play Store and Apple App Store.

---

## 📋 Prerequisites Checklist

### Required Accounts
- [ ] Google Play Console account ($25 one-time fee)
- [ ] Apple Developer Program membership ($99/year)
- [ ] Expo account (free at https://expo.dev)

### Required Assets
- [ ] App icon (1024x1024px PNG, no transparency)
- [ ] Screenshots (5-8 per platform)
- [ ] Feature graphic (Android: 1024x500px)
- [ ] Privacy policy URL (hosted publicly)
- [ ] App description and store listing text

---

## 🎨 Step 1: Create App Assets

### App Icon
Create a 1024x1024px PNG icon:
- Simple, recognizable design
- No text (it will be too small)
- Suggested: Food/nutrition themed icon
- Save as: `assets/icon.png`

### Screenshots (Required)
Take screenshots on actual devices:

**Android (at least 2):**
- 1080x1920px (portrait) or 1920x1080px (landscape)
- Show: Home screen, camera scanning, meal details, progress

**iOS (at least 1 per device size):**
- iPhone 6.7" (1290x2796px)
- iPhone 6.5" (1242x2688px)
- iPad Pro 12.9" (2048x2732px)

**What to show:**
1. Food scanning with camera
2. Nutrition analysis results
3. Daily meal log
4. Progress/stats screen
5. User profile/goals

### Feature Graphic (Android only)
- 1024x500px PNG
- Showcases app's main feature
- Text should be readable at small sizes

---

## 🔧 Step 2: Install Expo Application Services (EAS)

```bash
# Install EAS CLI globally
npm install -g eas-cli

# Login to Expo
eas login

# Configure project
eas build:configure
```

This creates `eas.json` (already created in your project).

---

## 🏗️ Step 3: Build Production Apps

### For Android (AAB for Play Store)

```bash
# First build
eas build --platform android --profile production

# You'll be prompted to:
# 1. Generate a new keystore (say YES)
# 2. Let Expo manage credentials (say YES)
```

This creates an `.aab` file (Android App Bundle).

**Time:** 10-20 minutes. Download the `.aab` when complete.

### For iOS (Archive for App Store)

⚠️ **Requires Mac for final submission, but you can build on Windows:**

```bash
# Build iOS app
eas build --platform ios --profile production

# You'll need:
# - Apple Developer account
# - Apple Team ID
# - Bundle identifier: com.nutrilens.app
```

**Time:** 15-30 minutes. Creates an `.ipa` file.

**Note:** For iOS, you can build the app on Windows, but need a Mac with Xcode to upload to App Store Connect.

---

## 🤖 Step 4: Publish to Google Play Store

### 4.1 Create App Listing

1. Go to https://play.google.com/console
2. Click **Create app**
3. Fill in details:
   - **App name:** NutriLens
   - **Default language:** English (US)
   - **App type:** App
   - **Category:** Health & Fitness
   - **Free/Paid:** Free

### 4.2 Complete Store Listing

**Main store listing:**
- **App name:** NutriLens
- **Short description (80 chars):**
  ```
  AI-powered nutrition tracker. Scan meals, log nutrition, reach your goals.
  ```

- **Full description (4000 chars max):**
  ```
  Transform your nutrition tracking with NutriLens - the AI-powered app that makes logging meals effortless!

  🔍 SCAN & ANALYZE
  Simply take a photo of your meal and let our AI instantly identify foods and calculate nutrition. No manual entry needed!

  📊 COMPREHENSIVE TRACKING
  • Calories, macros (carbs, protein, fat)
  • Micronutrients (vitamins, minerals, fiber)
  • Daily progress and streaks
  • Weekly trends and insights

  🎯 PERSONALIZED GOALS
  Set custom calorie and macro targets based on your health goals - weight loss, muscle gain, or maintenance.

  💡 SMART INSIGHTS
  Get AI-powered recommendations for healthier alternatives and actionable nutrition advice.

  ✨ KEY FEATURES
  • Lightning-fast food recognition
  • Detailed nutrition breakdown
  • Beautiful progress visualization
  • Meal history and search
  • Cloud sync across devices
  • No ads, no subscriptions

  🔒 PRIVACY FIRST
  Your data is yours. We use industry-standard encryption and never sell your information.

  Perfect for:
  ✓ Fitness enthusiasts
  ✓ Weight management
  ✓ Athletes tracking macros
  ✓ Health-conscious individuals
  ✓ Anyone wanting to eat better

  Download NutriLens today and start your journey to better nutrition!
  ```

- **Upload screenshots** (at least 2)
- **Upload feature graphic** (1024x500px)
- **App icon:** Upload from `assets/icon.png`

### 4.3 Privacy Policy

1. Host your privacy policy online:
   - Option A: Create a simple website (GitHub Pages, Google Sites)
   - Option B: Use privacy policy generator + free hosting

2. Add URL to Play Console

3. **Content rating questionnaire:**
   - Answer questions honestly
   - App asks for: Camera, Photos
   - No violent/mature content
   - Should get: Everyone rating

### 4.4 Upload APK/AAB

1. Go to **Production** → **Create new release**
2. Upload the `.aab` file from EAS build
3. **Release name:** `1.0.0 (1)` - Initial release
4. **Release notes:**
   ```
   🎉 Welcome to NutriLens 1.0!

   • AI-powered food scanning
   • Comprehensive nutrition tracking
   • Beautiful meal logging
   • Progress tracking and insights
   • Cloud sync
   ```

5. Save and review

### 4.5 Submit for Review

1. Complete all sections with ✅
2. Click **Review release**
3. Submit for review

**Review time:** 1-7 days (usually 1-3 days)

---

## 🍎 Step 5: Publish to Apple App Store

⚠️ **You need a Mac with Xcode for this step**

### 5.1 App Store Connect

1. Go to https://appstoreconnect.apple.com
2. Click **My Apps** → **+** → **New App**
3. Fill details:
   - **Platform:** iOS
   - **Name:** NutriLens
   - **Primary Language:** English (US)
   - **Bundle ID:** com.nutrilens.app
   - **SKU:** nutrilens-ios-001
   - **User Access:** Full Access

### 5.2 App Information

- **Name:** NutriLens
- **Subtitle (30 chars):** AI Nutrition Tracker
- **Privacy Policy URL:** [your hosted URL]
- **Category:** Health & Fitness
- **Secondary Category:** Food & Drink

### 5.3 Pricing and Availability

- **Price:** Free
- **Availability:** All countries

### 5.4 Prepare for Submission

**Screenshots required:**
- iPhone 6.7" (at least 3)
- iPhone 6.5" (at least 3)
- iPad Pro 12.9" (at least 2)

**App Preview (optional but recommended):**
- 15-30 second video showing app in action

**Description (4000 chars):**
(Use same as Google Play)

**Keywords (100 chars):**
```
nutrition,diet,food,calorie,macro,health,fitness,meal,tracker,weight
```

**Promotional Text (170 chars):**
```
Scan your meals with AI! Get instant nutrition info, track your calories and macros, and reach your health goals faster than ever before.
```

### 5.5 Build Info

**Export Compliance:**
- Uses encryption: YES
- Complies with US export laws: YES
- App uses standard encryption: YES

**Advertising Identifier:**
- No (unless you add ads later)

### 5.6 Upload Build (on Mac)

```bash
# On Mac, install Transporter app from App Store
# Download your .ipa from EAS
# Upload via Transporter

# OR use command line:
eas submit --platform ios --profile production
```

### 5.7 App Review Information

- **Contact:** Your email
- **Phone:** Your phone number
- **Review Notes:**
  ```
  NutriLens uses AI to scan food photos and calculate nutrition.

  Test Credentials:
  Email: test@nutrilens.com
  Password: TestUser123!

  Camera permission is required for food scanning feature.
  Please test by taking a photo of any food item.
  ```

- **Demo Account:** Create a test account for reviewers

### 5.8 Submit for Review

1. Complete all sections
2. Click **Submit for Review**

**Review time:** 1-3 days typically (can be 24-48 hours)

---

## 🔄 Step 6: Updates & Maintenance

### Version Updates

When you want to release an update:

1. **Update version numbers:**
   ```javascript
   // app.config.js
   version: '1.0.1',  // Increment
   android: {
     versionCode: 2,   // Always increment
   },
   ios: {
     buildNumber: '2', // Always increment
   }
   ```

2. **Build new version:**
   ```bash
   eas build --platform all --profile production
   ```

3. **Submit updates:**
   - Google Play: Upload new AAB
   - App Store: Upload new build + submit for review

### Common Update Reasons
- Bug fixes
- New features
- Performance improvements
- Security patches

---

## 📱 Step 7: Store Listing Optimization (ASO)

### Google Play Tips
- Use all 80 chars in short description
- Include keywords naturally in full description
- Update screenshots to show new features
- Respond to all reviews quickly
- Maintain high rating (4.0+)

### App Store Tips
- Optimize keyword field (comma-separated, no spaces)
- Use all 170 chars in promotional text
- Update preview video regularly
- Encourage reviews (tastefully, in-app)
- Monitor search rankings

---

## 🚨 Common Issues & Solutions

### Build Failures
**Problem:** Build fails on EAS
**Solution:**
```bash
# Clear cache and retry
eas build --platform android --profile production --clear-cache
```

### Missing Credentials
**Problem:** iOS signing fails
**Solution:** Let Expo manage credentials automatically

### Privacy Policy Required
**Problem:** Submission rejected - no privacy policy
**Solution:** Host PRIVACY_POLICY.md on GitHub Pages or similar

### Screenshots Rejected
**Problem:** Screenshots don't meet size requirements
**Solution:** Use actual device screenshots, not emulator

### Long Review Times
**Problem:** App in review for 2+ weeks
**Solution:** Contact support:
- Google: Via Play Console
- Apple: Via App Store Connect

---

## 📊 Post-Launch Checklist

- [ ] Monitor crash reports (Firebase Crashlytics)
- [ ] Respond to user reviews within 24-48 hours
- [ ] Track app analytics (downloads, retention)
- [ ] Plan feature updates based on feedback
- [ ] Update app regularly (every 2-4 weeks ideal)
- [ ] Keep privacy policy updated
- [ ] Monitor API usage and costs
- [ ] Test on new OS versions when released

---

## 💰 Costs Summary

**One-time:**
- Google Play Developer: $25
- App icon design (if outsourced): $0-50
- Privacy policy hosting: Free (GitHub Pages)

**Annual:**
- Apple Developer Program: $99/year
- EAS builds: Free tier or $29/month

**Ongoing:**
- Firebase: Free tier sufficient for small apps
- Anthropic API: Pay-as-you-go (~$5-20/month depending on users)

**Total First Year:** ~$150-300 + API costs

---

## 🎯 Quick Start Summary

```bash
# 1. Install EAS CLI
npm install -g eas-cli

# 2. Login
eas login

# 3. Configure (already done)
eas build:configure

# 4. Build for both platforms
eas build --platform all --profile production

# 5. Wait for builds to complete (20-30 min)

# 6. Download .aab (Android) and .ipa (iOS)

# 7. Upload to respective stores

# 8. Fill in store listings

# 9. Submit for review

# 10. Wait 1-7 days for approval
```

---

## 📚 Additional Resources

- **Expo Docs:** https://docs.expo.dev/build/introduction/
- **Google Play Console Help:** https://support.google.com/googleplay/android-developer
- **App Store Connect Help:** https://developer.apple.com/help/app-store-connect/
- **EAS Build:** https://docs.expo.dev/build-reference/eas-json/

---

## 🆘 Need Help?

If you encounter issues:
1. Check Expo forums: https://forums.expo.dev
2. Google Play support: Via Play Console
3. Apple Developer support: https://developer.apple.com/contact/
4. Firebase support: https://firebase.google.com/support

---

**Good luck with your launch! 🚀**

Remember: First app release is always the hardest. After that, updates are much easier!
