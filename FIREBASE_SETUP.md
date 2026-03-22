# Firebase Setup Guide for NutriLens

## 🔥 Step 1: Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click **"Add project"**
3. Enter project name: `nutrilens` (or your preferred name)
4. Disable Google Analytics (optional)
5. Click **"Create project"**

## 📱 Step 2: Add App to Firebase

### For Web/Expo:
1. In Firebase Console, click the **Web icon** (</>)
2. Register app with nickname: `NutriLens Web`
3. Copy the Firebase configuration object
4. Paste values into your `.env` file:

```env
EXPO_PUBLIC_FIREBASE_API_KEY=your_api_key_here
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
EXPO_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
EXPO_PUBLIC_FIREBASE_APP_ID=your_app_id
```

## 🔐 Step 3: Enable Authentication Methods

1. In Firebase Console, go to **Authentication** → **Sign-in method**
2. Enable the following:

### Email/Password:
- Click **Email/Password**
- Toggle **Enable**
- Save

### Google Sign-In:
- Click **Google**
- Toggle **Enable**
- Enter support email
- Save
- Copy the **Web Client ID**
- Add to `.env`:
```env
EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID=your-web-client-id.apps.googleusercontent.com
```

### Phone Authentication (Optional):
- Click **Phone**
- Toggle **Enable**
- Follow reCAPTCHA setup instructions
- Save

## 📊 Step 4: Set Up Firestore Database

1. Go to **Firestore Database**
2. Click **Create database**
3. Choose **Start in production mode** (we'll add rules next)
4. Select your region (closest to your users)
5. Click **Enable**

### Firestore Security Rules:

Go to **Firestore Database** → **Rules** and paste:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // User data - only authenticated users can read/write their own data
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;

      // Profile subcollection
      match /profile/{document=**} {
        allow read, write: if request.auth != null && request.auth.uid == userId;
      }

      // Daily entries subcollection
      match /daily_entries/{document=**} {
        allow read, write: if request.auth != null && request.auth.uid == userId;
      }
    }
  }
}
```

Click **Publish**

## 🔒 Step 5: Configure App Authorization (for Google Sign-In)

### Android:
1. Get your SHA-1 certificate fingerprint:
```bash
cd android
./gradlew signingReport
```
2. In Firebase Console → **Project Settings** → **Your apps** → **Android app**
3. Add SHA-1 fingerprint
4. Download `google-services.json`
5. Place in `android/app/` directory

### iOS:
1. In Firebase Console → **Project Settings** → **Your apps** → **iOS app**
2. Download `GoogleService-Info.plist`
3. Add to your Xcode project

## ✅ Step 6: Test Your Setup

1. Update your `.env` file with all Firebase credentials
2. Restart your development server:
```bash
npx expo start -c
```
3. Try signing up with email/password
4. Check Firebase Console → **Authentication** to see the new user

## 📝 Firestore Data Structure

Your Firestore will have this structure:

```
users/
  {userId}/
    profile/
      data/
        - name
        - email
        - photoURL
        - createdAt

      goals/
        - dailyCalories
        - carbsG
        - proteinG
        - fatG
        - weightKg
        - heightCm
        - age
        - activityLevel
        - goalType

    daily_entries/
      {YYYY-MM-DD}/
        - date
        - totalCalories
        - totalCarbs
        - totalProtein
        - totalFat
        - totalFiber
        - totalSugar
        - totalSodium
        - meals: []
        - createdAt
        - updatedAt
```

## 🎯 Next Steps

1. **Test Authentication**: Try signing up and logging in
2. **Test Data Storage**: Add a food entry and check Firestore Console
3. **Configure Google Sign-In**: Follow platform-specific setup for Android/iOS
4. **Enable Phone Auth**: Set up reCAPTCHA for phone verification

## 🆘 Troubleshooting

### "Firebase: Error (auth/invalid-api-key)"
- Check your `EXPO_PUBLIC_FIREBASE_API_KEY` in `.env`
- Make sure you copied it correctly from Firebase Console

### "Firebase: Error (auth/app-not-authorized)"
- Add your app's package name in Firebase Console
- Add SHA-1 fingerprint for Android

### Google Sign-In not working
- Verify `EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID` is set correctly
- Make sure Google Sign-In is enabled in Firebase Console

### "Permission denied" in Firestore
- Check your Firestore security rules
- Make sure user is authenticated before accessing data

## 📚 Resources

- [Firebase Documentation](https://firebase.google.com/docs)
- [Expo Firebase Guide](https://docs.expo.dev/guides/using-firebase/)
- [React Native Firebase](https://rnfirebase.io/)
