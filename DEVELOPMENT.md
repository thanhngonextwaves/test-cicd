# Development Guide

Complete guide for developers working on this Expo mobile application.

## Table of Contents

1. [Getting Started](#getting-started)
2. [Project Architecture](#project-architecture)
3. [Development Workflow](#development-workflow)
4. [Code Style Guide](#code-style-guide)
5. [Testing](#testing)
6. [Debugging](#debugging)
7. [Common Tasks](#common-tasks)

---

## Getting Started

### Prerequisites

```bash
# Required
- Node.js 18+ (use nvm: nvm install 18)
- npm or yarn
- Git

# Recommended
- Expo Go app on your phone
- iOS Simulator (macOS only)
- Android Studio with emulator
- VS Code with extensions:
  - ESLint
  - Prettier
  - React Native Tools
  - TypeScript
```

### Initial Setup

1. **Clone and install:**
   ```bash
   git clone <repository-url>
   cd expo-mobile-app
   npm install
   ```

2. **Set up Expo:**
   ```bash
   # Install Expo CLI globally (optional)
   npm install -g expo-cli

   # Login to Expo
   npx expo login
   ```

3. **Configure environment:**
   ```bash
   # Copy example env file
   cp .env.example .env

   # Edit .env with your values
   ```

4. **Start development:**
   ```bash
   npm start
   ```

### Running the App

```bash
# Start Metro bundler
npm start

# Press 'i' for iOS simulator
# Press 'a' for Android emulator
# Or scan QR code with Expo Go app
```

---

## Project Architecture

### Directory Structure Explained

```
src/
├── components/          # Reusable UI components
│   ├── common/         # Shared across app (Button, Card, Input)
│   └── screens/        # Screen-specific components
├── contexts/           # React Context for global state
│   ├── AppContext.tsx  # App-wide settings, theme
│   └── AuthContext.tsx # Authentication state
├── hooks/              # Custom React hooks
│   ├── useDebounce.ts  # Debounce values
│   ├── useAsync.ts     # Async operation handler
│   └── ...
├── services/           # External service integrations
│   └── api/           # API client and endpoints
│       ├── client.ts   # Axios instance with interceptors
│       ├── endpoints.ts # API service methods
│       └── types.ts    # Request/response types
├── utils/              # Utility functions
│   ├── env.ts         # Environment variable access
│   └── storage.ts     # AsyncStorage wrapper
├── constants/          # App-wide constants
│   └── config.ts      # Configuration values, colors, spacing
└── types/             # TypeScript type definitions
    └── index.ts       # Shared types
```

### Navigation Architecture

Using **expo-router** (file-based routing):

```
app/
├── _layout.tsx           # Root layout (providers, etc.)
├── (tabs)/              # Tab group
│   ├── _layout.tsx      # Tab configuration
│   ├── index.tsx        # Home tab (/)
│   ├── explore.tsx      # Explore tab (/explore)
│   └── profile.tsx      # Profile tab (/profile)
└── modal.tsx            # Modal screen (/modal)
```

**Navigation patterns:**

```typescript
import { useRouter } from 'expo-router';

// Navigate
router.push('/explore');
router.push('/modal');

// Go back
router.back();

// Replace (no back navigation)
router.replace('/home');
```

### State Management

**Global State (React Context):**

```typescript
// AppContext - theme, settings, loading
const { theme, setTheme, isLoading } = useApp();

// AuthContext - user, authentication
const { user, isAuthenticated, signIn, signOut } = useAuth();
```

**Local State (useState):**
```typescript
const [value, setValue] = useState('');
```

**Server State (custom hooks):**
```typescript
const { data, error, isLoading } = useAsync(
  () => authService.getCurrentUser()
);
```

### API Layer

**Making API calls:**

```typescript
import { authService, userService, postsService } from '@services/api';

// Login
const response = await authService.login({
  email: 'user@example.com',
  password: 'password',
});

// Get user
const user = await userService.getProfile('user-id');

// Get posts with pagination
const posts = await postsService.getPosts({ page: 1, pageSize: 20 });
```

**Adding new endpoints:**

1. Define types in `src/services/api/types.ts`
2. Add service methods in `src/services/api/endpoints.ts`
3. Use in components

---

## Development Workflow

### Branch Strategy

```bash
# Main branches
main          # Production-ready code
develop       # Integration branch

# Feature branches
feature/user-auth
feature/profile-page

# Bug fix branches
fix/login-crash
hotfix/critical-bug

# Create feature branch
git checkout -b feature/my-feature

# Commit changes
git add .
git commit -m "feat: add my feature"

# Push and create PR
git push origin feature/my-feature
```

### Commit Convention

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: Add user profile page
fix: Fix login crash on Android
docs: Update README
style: Format code
refactor: Simplify API client
test: Add auth tests
chore: Update dependencies
```

### Code Review Process

1. Create feature branch
2. Make changes and commit
3. Push and create Pull Request
4. Request review
5. Address feedback
6. Merge when approved

### CI/CD Pipeline

Automated checks on PR:
- Linting (ESLint)
- Type checking (TypeScript)
- Tests (Jest)
- Build validation

---

## Code Style Guide

### TypeScript

**Use explicit types:**

```typescript
// Good
interface User {
  id: string;
  name: string;
  email: string;
}

function getUser(id: string): Promise<User> {
  return userService.getProfile(id);
}

// Avoid 'any'
const data: any = {}; // Bad
const data: User = {}; // Good
```

### React Components

**Function components with TypeScript:**

```typescript
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface ProfileCardProps {
  name: string;
  email: string;
  onPress?: () => void;
}

export default function ProfileCard({ name, email, onPress }: ProfileCardProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.email}>{email}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  email: {
    fontSize: 14,
    color: '#666',
  },
});
```

### Hooks Guidelines

```typescript
// Custom hooks start with 'use'
export function useUser(userId: string) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUser();
  }, [userId]);

  const loadUser = async () => {
    try {
      const data = await userService.getProfile(userId);
      setUser(data.data);
    } catch (error) {
      console.error('Failed to load user:', error);
    } finally {
      setLoading(false);
    }
  };

  return { user, loading, refresh: loadUser };
}
```

### Styling

**Use constants for consistency:**

```typescript
import { COLORS, SPACING, FONT_SIZES } from '@constants/config';

const styles = StyleSheet.create({
  container: {
    padding: SPACING.md,          // Instead of 16
    backgroundColor: COLORS.white, // Instead of '#fff'
  },
  text: {
    fontSize: FONT_SIZES.lg,       // Instead of 18
    color: COLORS.textPrimary,     // Instead of '#000'
  },
});
```

### Path Aliases

Use configured path aliases:

```typescript
// Good
import { Button } from '@components/common';
import { useAuth } from '@contexts/AuthContext';
import { authService } from '@services/api';

// Avoid
import { Button } from '../../../components/common';
```

---

## Testing

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with coverage
npm test -- --coverage
```

### Writing Tests

**Component tests:**

```typescript
import { render, fireEvent } from '@testing-library/react-native';
import Button from '@components/common/Button';

describe('Button', () => {
  it('renders correctly', () => {
    const { getByText } = render(
      <Button title="Click me" onPress={() => {}} />
    );
    expect(getByText('Click me')).toBeTruthy();
  });

  it('calls onPress when pressed', () => {
    const onPress = jest.fn();
    const { getByText } = render(
      <Button title="Click me" onPress={onPress} />
    );

    fireEvent.press(getByText('Click me'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });
});
```

**Hook tests:**

```typescript
import { renderHook } from '@testing-library/react-hooks';
import { useDebounce } from '@hooks/useDebounce';

describe('useDebounce', () => {
  it('debounces value changes', async () => {
    const { result, rerender, waitForNextUpdate } = renderHook(
      ({ value }) => useDebounce(value, 500),
      { initialProps: { value: 'initial' } }
    );

    expect(result.current).toBe('initial');

    rerender({ value: 'updated' });
    expect(result.current).toBe('initial'); // Still old value

    await waitForNextUpdate();
    expect(result.current).toBe('updated'); // Updated after delay
  });
});
```

---

## Debugging

### React Native Debugger

```bash
# Install React Native Debugger
brew install --cask react-native-debugger

# Or download from:
# https://github.com/jhen0409/react-native-debugger/releases
```

### Debug Menu

- **iOS Simulator:** Cmd + D
- **Android Emulator:** Cmd + M (Mac) or Ctrl + M (Windows/Linux)
- **Physical Device:** Shake device

### Console Logs

```typescript
// Development only
if (__DEV__) {
  console.log('Debug info:', data);
}

// Better debugging
console.log('[Component] Action:', { user, status });
```

### Network Debugging

View API requests in React Native Debugger:

1. Open React Native Debugger
2. Enable "Debug JS Remotely"
3. Go to Network tab
4. See all API requests/responses

### Common Issues

**Metro bundler cache issues:**
```bash
npm run clear
```

**Native module errors:**
```bash
npm run prebuild:clean
```

**iOS build errors:**
```bash
cd ios && pod install && cd ..
```

---

## Common Tasks

### Adding a New Screen

1. **Create screen file:**
   ```typescript
   // app/settings.tsx
   export default function SettingsScreen() {
     return (
       <View>
         <Text>Settings</Text>
       </View>
     );
   }
   ```

2. **Navigate to it:**
   ```typescript
   router.push('/settings');
   ```

### Adding a New API Endpoint

1. **Define types:**
   ```typescript
   // src/services/api/types.ts
   export interface Product {
     id: string;
     name: string;
     price: number;
   }
   ```

2. **Add service method:**
   ```typescript
   // src/services/api/endpoints.ts
   export const productsService = {
     getProducts: async () => {
       return apiClient.get<Product[]>('/products');
     },
   };
   ```

3. **Use in component:**
   ```typescript
   const { data, isLoading } = useAsync(() => productsService.getProducts());
   ```

### Adding a New Context

1. **Create context file:**
   ```typescript
   // src/contexts/CartContext.tsx
   import React, { createContext, useContext, useState } from 'react';

   interface CartContextValue {
     items: any[];
     addItem: (item: any) => void;
     removeItem: (id: string) => void;
   }

   const CartContext = createContext<CartContextValue | undefined>(undefined);

   export function CartProvider({ children }) {
     const [items, setItems] = useState([]);

     const addItem = (item) => {
       setItems([...items, item]);
     };

     const removeItem = (id) => {
       setItems(items.filter(item => item.id !== id));
     };

     return (
       <CartContext.Provider value={{ items, addItem, removeItem }}>
         {children}
       </CartContext.Provider>
     );
   }

   export function useCart() {
     const context = useContext(CartContext);
     if (!context) throw new Error('useCart must be used within CartProvider');
     return context;
   }
   ```

2. **Add to root layout:**
   ```typescript
   // app/_layout.tsx
   import { CartProvider } from '@contexts/CartContext';

   export default function RootLayout() {
     return (
       <CartProvider>
         {/* ... */}
       </CartProvider>
     );
   }
   ```

### Updating Dependencies

```bash
# Check for outdated packages
npm outdated

# Update all dependencies
npm update

# Update specific package
npm install expo@latest

# Update Expo SDK
npx expo install --fix
```

---

## Resources

- **Expo Docs:** https://docs.expo.dev/
- **React Native Docs:** https://reactnative.dev/
- **TypeScript Docs:** https://www.typescriptlang.org/
- **expo-router Docs:** https://docs.expo.dev/router/introduction/

---

**Questions?** Open an issue or ask in team chat!
