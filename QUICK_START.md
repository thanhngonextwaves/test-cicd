# Quick Start Guide

Get up and running in 5 minutes!

## 1. Install Dependencies

```bash
npm install
```

## 2. Start Development Server

```bash
npm start
```

## 3. Run on Device/Simulator

- Press **`i`** for iOS Simulator (macOS only)
- Press **`a`** for Android Emulator
- Or scan the QR code with **Expo Go** app on your phone

---

## What's Next?

### Customize Your App

1. **Update app information** in `app.json`:
   ```json
   {
     "expo": {
       "name": "Your App Name",
       "slug": "your-app-slug"
     }
   }
   ```

2. **Configure bundle identifiers**:
   - iOS: `ios.bundleIdentifier` in `app.json`
   - Android: `android.package` in `app.json`

3. **Set up environment variables** in `.env`:
   ```bash
   cp .env.example .env
   # Edit .env with your values
   ```

### Start Building

**Add a new screen:**
```typescript
// Create: app/about.tsx
export default function AboutScreen() {
  return (
    <View>
      <Text>About Page</Text>
    </View>
  );
}

// Navigate: router.push('/about')
```

**Make an API call:**
```typescript
import { authService } from '@services/api';

const login = async () => {
  const response = await authService.login({
    email: 'user@example.com',
    password: 'password',
  });
};
```

**Use global state:**
```typescript
import { useAuth } from '@contexts/AuthContext';

const { user, isAuthenticated, signIn } = useAuth();
```

---

## Common Commands

```bash
# Development
npm start              # Start Metro bundler
npm run ios           # Run on iOS
npm run android       # Run on Android

# Code Quality
npm run lint          # Run ESLint
npm run type-check    # Run TypeScript check
npm test              # Run tests

# Building
npm run build:development:ios    # Dev build for iOS
npm run build:preview:android    # Preview build for Android
npm run build:production:ios     # Production build

# Utilities
npm run clear                    # Clear all caches
npm run prebuild:clean           # Clean native folders
npm run version:bump -- patch    # Bump version
```

---

## Next Steps

- Read [DEVELOPMENT.md](./DEVELOPMENT.md) for detailed development guide
- Read [DEPLOYMENT.md](./DEPLOYMENT.md) for production deployment
- Check [README.md](./README.md) for complete documentation

---

**Need Help?**

- [Expo Documentation](https://docs.expo.dev/)
- [expo-router Guide](https://docs.expo.dev/router/introduction/)
- [EAS Build Docs](https://docs.expo.dev/build/introduction/)

Happy coding!
