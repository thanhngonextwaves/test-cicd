# Project Structure

Complete overview of the Expo mobile app structure.

## Directory Tree

```
expo-mobile-app/
├── .eas/
│   └── workflows/                    # EAS Build custom workflows
│       ├── build-development.yml     # Development build workflow
│       ├── build-preview.yml         # Preview build workflow
│       ├── build-production.yml      # Production build workflow
│       └── ota-update.yml            # OTA update workflow
│
├── app/                              # expo-router app directory
│   ├── (tabs)/                       # Tab navigation group
│   │   ├── _layout.tsx              # Tab configuration
│   │   ├── index.tsx                # Home screen (Tab 1)
│   │   ├── explore.tsx              # Explore screen (Tab 2)
│   │   └── profile.tsx              # Profile screen (Tab 3)
│   ├── _layout.tsx                  # Root layout with providers
│   └── modal.tsx                    # Example modal screen
│
├── src/
│   ├── components/                  # UI Components
│   │   ├── common/                 # Reusable components
│   │   │   ├── Button.tsx         # Button component
│   │   │   ├── Card.tsx           # Card container
│   │   │   ├── TextInput.tsx      # Text input
│   │   │   ├── LoadingSpinner.tsx # Loading indicator
│   │   │   └── index.ts           # Exports
│   │   └── screens/               # Screen-specific components
│   │
│   ├── contexts/                   # React Context providers
│   │   ├── AppContext.tsx         # Global app state
│   │   └── AuthContext.tsx        # Authentication state
│   │
│   ├── hooks/                      # Custom React hooks
│   │   ├── useDebounce.ts         # Debounce hook
│   │   ├── useAsync.ts            # Async operations hook
│   │   ├── usePrevious.ts         # Previous value hook
│   │   ├── useToggle.ts           # Toggle state hook
│   │   ├── useKeyboard.ts         # Keyboard visibility hook
│   │   └── index.ts               # Exports
│   │
│   ├── services/                   # External services
│   │   └── api/                   # API layer
│   │       ├── client.ts          # Axios client with interceptors
│   │       ├── endpoints.ts       # API service methods
│   │       ├── types.ts           # API types
│   │       └── index.ts           # Exports
│   │
│   ├── utils/                      # Utility functions
│   │   ├── env.ts                 # Environment variables
│   │   └── storage.ts             # AsyncStorage wrapper
│   │
│   ├── constants/                  # App constants
│   │   └── config.ts              # Config, colors, spacing
│   │
│   └── types/                      # TypeScript types
│       └── index.ts               # Shared type definitions
│
├── assets/                         # Static assets
│   ├── images/                    # Images, icons
│   └── fonts/                     # Custom fonts
│
├── scripts/                        # Utility scripts
│   ├── prebuild-clean.js         # Clean native directories
│   ├── clear-cache.js            # Clear all caches
│   └── bump-version.js           # Bump version numbers
│
├── .gitignore                     # Git ignore rules
├── .easignore                     # EAS Build ignore rules
├── .eslintrc.js                   # ESLint configuration
├── .env.example                   # Environment variables template
│
├── app.json                       # Expo configuration (static)
├── app.config.js                  # Expo configuration (dynamic)
├── babel.config.js                # Babel configuration
├── eas.json                       # EAS Build profiles
├── package.json                   # Dependencies and scripts
├── tsconfig.json                  # TypeScript configuration
│
├── README.md                      # Main documentation
├── QUICK_START.md                 # Quick setup guide
├── DEVELOPMENT.md                 # Development guide
├── DEPLOYMENT.md                  # Deployment guide
└── PROJECT_STRUCTURE.md           # This file
```

## Key Files Explained

### Configuration Files

| File | Purpose |
|------|---------|
| `app.json` | Static Expo configuration (name, version, icons) |
| `app.config.js` | Dynamic config with environment variables |
| `eas.json` | EAS Build profiles (dev, preview, production) |
| `babel.config.js` | Babel config with path aliases |
| `tsconfig.json` | TypeScript config with path aliases |
| `.eslintrc.js` | ESLint rules for code quality |

### Navigation (expo-router)

| Location | Purpose |
|----------|---------|
| `app/_layout.tsx` | Root layout, wraps app with providers |
| `app/(tabs)/_layout.tsx` | Tab navigation configuration |
| `app/(tabs)/index.tsx` | Home screen (first tab) |
| `app/modal.tsx` | Modal screen example |

### State Management

| File | Purpose |
|------|---------|
| `src/contexts/AppContext.tsx` | Global app state (theme, settings) |
| `src/contexts/AuthContext.tsx` | Authentication state and methods |

### API Layer

| File | Purpose |
|------|---------|
| `src/services/api/client.ts` | Axios instance with auth interceptors |
| `src/services/api/endpoints.ts` | API service methods (auth, user, posts) |
| `src/services/api/types.ts` | Request/response TypeScript types |

### Utilities

| File | Purpose |
|------|---------|
| `src/utils/env.ts` | Access environment variables |
| `src/utils/storage.ts` | Type-safe AsyncStorage wrapper |
| `src/constants/config.ts` | Colors, spacing, app constants |

### Reusable Components

| Component | Purpose |
|-----------|---------|
| `Button` | Customizable button with variants |
| `Card` | Container with shadow and padding |
| `TextInput` | Input field with label and error state |
| `LoadingSpinner` | Loading indicator |

### Custom Hooks

| Hook | Purpose |
|------|---------|
| `useDebounce` | Debounce value changes |
| `useAsync` | Handle async operations |
| `usePrevious` | Get previous value |
| `useToggle` | Toggle boolean state |
| `useKeyboard` | Monitor keyboard visibility |

## Path Aliases

Configured in `tsconfig.json` and `babel.config.js`:

```typescript
import { Button } from '@components/common';
import { useAuth } from '@contexts/AuthContext';
import { authService } from '@services/api';
import { useDebounce } from '@hooks';
import { COLORS } from '@constants/config';
import { User } from '@types';
```

## Build Profiles

Configured in `eas.json`:

| Profile | Purpose | Platform |
|---------|---------|----------|
| `development` | Dev builds with Expo Dev Client | iOS (simulator) + Android (APK) |
| `preview` | Internal testing builds | iOS + Android |
| `production` | Store-ready builds | iOS (IPA) + Android (AAB) |

## Workflow Files

Located in `.eas/workflows/`:

| Workflow | Trigger | Purpose |
|----------|---------|---------|
| `build-development.yml` | Manual | Build dev client |
| `build-preview.yml` | Manual or PR | Build preview for testing |
| `build-production.yml` | Manual | Build production + submit |
| `ota-update.yml` | Manual or push | Publish OTA update |

## Scripts

Utility scripts in `package.json`:

```bash
# Development
npm start
npm run ios
npm run android

# Building
npm run build:development:ios
npm run build:preview:android
npm run build:production:ios

# Updates
npm run update:production -- "Message"

# Utilities
npm run clear              # Clear all caches
npm run prebuild:clean     # Clean native folders
npm run version:bump       # Bump version

# Code Quality
npm run lint
npm run type-check
npm test
```

## Data Flow

```
User Action
    ↓
Component (UI)
    ↓
Context / Hook
    ↓
API Service
    ↓
API Client (Axios)
    ↓
Backend API
    ↓
Response
    ↓
Context / Hook
    ↓
Component Update
    ↓
UI Re-render
```

## Environment Variables

Set via EAS Secrets:

```bash
eas secret:create --scope project --name API_URL --value https://api.com
eas secret:create --scope project --name API_KEY --value key123
```

Access in app:

```typescript
import { ENV } from '@utils/env';

console.log(ENV.apiUrl);  // https://api.com
console.log(ENV.apiKey);  // key123
```

## Further Reading

- [README.md](./README.md) - Overview and getting started
- [QUICK_START.md](./QUICK_START.md) - 5-minute setup
- [DEVELOPMENT.md](./DEVELOPMENT.md) - Development workflow
- [DEPLOYMENT.md](./DEPLOYMENT.md) - Production deployment

---

**Questions?** Check the docs or ask the team!
