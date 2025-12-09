# Expo Mobile App

A production-ready React Native mobile application built with Expo, featuring modern architecture, EAS Build integration, and best practices.

## Tech Stack

- **Framework:** React Native + Expo SDK 52
- **Navigation:** expo-router (file-based routing)
- **State Management:** React Context + Hooks
- **Styling:** React Native StyleSheet API
- **API Client:** Axios with interceptors
- **Build System:** EAS Build (Managed Workflow)
- **OTA Updates:** expo-updates
- **Language:** TypeScript

## Project Structure

```
├── .eas/
│   └── workflows/           # Custom EAS Build workflows
├── app/                     # expo-router app directory
│   ├── (tabs)/             # Tab navigation group
│   ├── _layout.tsx         # Root layout
│   └── modal.tsx           # Example modal
├── src/
│   ├── components/         # Reusable UI components
│   │   ├── common/        # Common components (Button, Card, etc.)
│   │   └── screens/       # Screen-specific components
│   ├── contexts/          # React Context providers
│   │   ├── AppContext.tsx
│   │   └── AuthContext.tsx
│   ├── hooks/             # Custom React hooks
│   ├── services/          # API services
│   │   └── api/          # API client and endpoints
│   ├── utils/            # Utility functions
│   ├── constants/        # App constants and config
│   └── types/            # TypeScript type definitions
├── assets/               # Static assets (images, fonts)
├── scripts/              # Utility scripts
└── [config files]        # Configuration files
```

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Expo CLI: `npm install -g expo-cli`
- EAS CLI: `npm install -g eas-cli`
- Expo account (sign up at https://expo.dev)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd expo-mobile-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Expo project**
   ```bash
   # Login to Expo
   eas login

   # Configure EAS Build
   eas build:configure

   # Update app.json with your project details
   # - Change slug, name, bundle identifiers
   # - Update projectId in extra.eas.projectId
   ```

4. **Set up environment variables**
   ```bash
   # Copy example env file
   cp .env.example .env

   # Set EAS Secrets (for builds)
   eas secret:create --scope project --name API_URL --value https://api.yourapp.com
   eas secret:create --scope project --name API_KEY --value your-api-key
   ```

5. **Start development server**
   ```bash
   npm start
   ```

## Development

### Running the App

```bash
# Start Metro bundler
npm start

# Run on iOS simulator
npm run ios

# Run on Android emulator
npm run android

# Run on web
npm run web
```

### Code Quality

```bash
# Run linter
npm run lint

# Run type checking
npm run type-check

# Run tests
npm test
```

### Utility Scripts

```bash
# Clear all caches
npm run clear

# Clean prebuild (removes ios/ and android/)
npm run prebuild:clean

# Bump version (patch/minor/major)
npm run version:bump -- patch
```

## Building

### Development Build

Development builds include the Expo Dev Client for rapid development.

```bash
# iOS
npm run build:development:ios

# Android
npm run build:development:android
```

### Preview Build

Preview builds are for internal testing (QA, stakeholders).

```bash
# iOS
npm run build:preview:ios

# Android
npm run build:preview:android
```

### Production Build

Production builds are optimized and ready for store submission.

```bash
# iOS
npm run build:production:ios

# Android
npm run build:production:android

# Both platforms
npm run build:all:production
```

## OTA Updates

Publish over-the-air updates without rebuilding:

```bash
# Preview channel
npm run update:preview -- "Bug fixes"

# Production channel
npm run update:production -- "New features"
```

## Store Submission

### iOS App Store

```bash
# Submit latest build
npm run submit:ios

# Or use EAS CLI directly
eas submit --platform ios --latest
```

### Google Play Store

```bash
# Submit latest build
npm run submit:android

# Or use EAS CLI directly
eas submit --platform android --latest
```

## Environment Variables

Environment variables are managed through EAS Secrets:

```bash
# Create secret
eas secret:create --scope project --name SECRET_NAME --value secret_value

# List secrets
eas secret:list

# Delete secret
eas secret:delete --name SECRET_NAME
```

Available in app via `expo-constants`:

```typescript
import Constants from 'expo-constants';

const apiUrl = Constants.expoConfig?.extra?.apiUrl;
```

## Contributing

1. Create a feature branch: `git checkout -b feature/my-feature`
2. Make your changes
3. Run tests and linting: `npm test && npm run lint`
4. Commit your changes: `git commit -m "feat: add my feature"`
5. Push to the branch: `git push origin feature/my-feature`
6. Create a Pull Request

## Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed production deployment instructions.

## Documentation

- [Development Guide](./DEVELOPMENT.md) - Detailed development setup and guidelines
- [Deployment Guide](./DEPLOYMENT.md) - Production deployment process
- [Expo Documentation](https://docs.expo.dev/)
- [EAS Build Documentation](https://docs.expo.dev/build/introduction/)
- [expo-router Documentation](https://docs.expo.dev/router/introduction/)

## License

[Your License Here]

## Support

For issues and questions:
- Create an issue in this repository
- Contact: your-email@example.com
