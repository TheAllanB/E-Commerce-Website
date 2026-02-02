# Firebase Setup Guide

Follow these steps to configure the backend for your application.

## 1. Create a Firebase Project
1.  Go to the [Firebase Console](https://console.firebase.google.com/).
2.  Click **"Add project"**.
3.  Enter a name (e.g., `ecom-fashion-store`).
4.  Disable Google Analytics (optional, for simplicity) and click **"Create project"**.
5.  Wait for it to initialize and click **"Continue"**.

## 2. Register the App
1.  In the project overview, click the **Web icon (`</>`)** to add an app.
2.  App nickname: `ecom-web`.
3.  Click **"Register app"**.
4.  **Important:** You will see a `firebaseConfig` object (apiKey, authDomain, etc.). Keep this page open or copy these values. You will need them for your `.env` file.
    *(If you click Continue, you can find them again in Project Settings > General)*.

## 3. Enable Authentication
1.  On the left sidebar, click **"Build"** > **"Authentication"**.
2.  Click **"Get started"**.
3.  In the **Sign-in method** tab, click **"Email/Password"**.
4.  Toggle **"Enable"** (leave "Email link" disabled for now).
5.  Click **"Save"**.

## 4. Enable Firestore Database
1.  On the left sidebar, click **"Build"** > **"Firestore Database"**.
2.  Click **"Create database"**.
3.  Choose a location (e.g., `nam5` or one close to you). Click **"Next"**.
4.  **Security Rules:** Select **"Start in test mode"** (this allows read/write access for 30 days, which is easier for development).
5.  Click **"Create"**.

## 5. Add Credentials to Code
1.  Create a new file named `.env` in your project root `c:\Users\allan\Desktop\ecom\ecomwbst\.env`.
2.  Paste the configuration from Step 2 in this format:

```env
VITE_FIREBASE_API_KEY=AIzaSy...
VITE_FIREBASE_AUTH_DOMAIN=your-id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-id
VITE_FIREBASE_STORAGE_BUCKET=your-id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456...
VITE_FIREBASE_APP_ID=1:123456...
```
*(Replace the values with your actual keys).*

## 6. Restart Server
Stop your running terminal (Ctrl+C) and run `npm run dev` again to load the new environment variables.
