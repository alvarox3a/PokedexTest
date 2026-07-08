# PokedexTest

This project is a React Native application. Follow the instructions below to start the bundler, compile the app for iOS and Android, and run the tests.
https://reactnative.dev/docs/set-up-your-environment
## Prerequisites

Before starting, ensure you have installed the npm dependencies:

```bash
npm install
```

Start the Metro bundler server:

```bash
npm start
```

---

## Compiling and Running the Project

Keep the Metro bundler running in one terminal session, and run the following commands in a separate terminal session.

### Android

To build and run the application on an Android device or emulator:

```bash
npm run android
```

### iOS

To build and run the application on an iOS device or simulator:

1. Install the CocoaPods dependencies:

   ```bash
   bundle install
   bundle exec pod install
   ```

2. Run the application:

   ```bash
   npm run ios
   ```

---

## Running Tests

To run the test suite:

```bash
npm test
```
