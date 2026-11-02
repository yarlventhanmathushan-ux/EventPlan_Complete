# EventPlan (Expo React Native)

EventPlan is a JavaScript React Native app built with Expo. The existing purple/pink screen styling and assets are retained.

## Requirements

- Node.js LTS (recommended)
- npm
- Expo Go on a compatible phone, or an Android/iOS emulator

## Run on Windows

1. Extract `EventPlan_Complete.zip`.
2. Open the extracted `EventPlan` folder in VS Code.
3. In VS Code, choose **Terminal → New Terminal**.
4. Install dependencies:

   ```powershell
   npm install
   ```

5. Start Expo:

   ```powershell
   npx expo start
   ```

6. Scan the QR code with Expo Go, or press `a` to launch an Android emulator. For web, run `npm run web`.

If Metro serves stale files, stop it with Ctrl+C and run `npx expo start --clear`.

## Navigation

The app opens the Splash screen and automatically continues to Login. Login and Sign Up are connected to the Home screen flow. Home links to event creation, calendar, notifications, and profile. Event details link to guest management and tasks.

## Data and limitations

- This is a front-end/demo project. It does **not** use a database, backend, Firebase, or Supabase.
- Login and Sign Up validate form input only; they do not create or authenticate a real account.
- Events, guests, tasks, calendar entries, and notifications use sample data or component state. Changes are not permanently saved and may reset when a screen/app is restarted.
- The app source and navigation were inspected and repaired, but a full device/Expo runtime test was not performed in this environment. Please manually test the flows on Expo Go or an emulator.
