# Production Deployment Guide

This guide walks you through deploying your Expo app to production on both iOS App Store and Google Play Store.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [iOS Deployment](#ios-deployment)
3. [Android Deployment](#android-deployment)
4. [OTA Updates Strategy](#ota-updates-strategy)
5. [Versioning](#versioning)
6. [Troubleshooting](#troubleshooting)

## Prerequisites

### Required Accounts

- **Expo Account:** Sign up at https://expo.dev
- **Apple Developer Account:** $99/year - https://developer.apple.com
- **Google Play Console Account:** $25 one-time fee - https://play.google.com/console

### Required Tools

```bash
# Install EAS CLI globally
npm install -g eas-cli

# Login to Expo
eas login
```

### Configure Project

1. **Update app.json with your details:**
   ```json
   {
     "expo": {
       "name": "Your App Name",
       "slug": "your-app-slug",
       "version": "1.0.0",
       "ios": {
         "bundleIdentifier": "com.yourcompany.yourapp"
       },
       "android": {
         "package": "com.yourcompany.yourapp"
       }
     }
   }
   ```

2. **Set up EAS Secrets:**
   ```bash
   eas secret:create --scope project --name API_URL --value https://api.production.com
   eas secret:create --scope project --name API_KEY --value your-production-api-key
   eas secret:create --scope project --name ENABLE_ANALYTICS --value true
   eas secret:create --scope project --name ENABLE_CRASH_REPORTING --value true
   ```

---

## iOS Deployment

### Step 1: Generate iOS Credentials

EAS Build can automatically manage your iOS credentials.

```bash
# EAS will create and manage:
# - Distribution certificate
# - Provisioning profile
# - Push notification key (if needed)

eas build --platform ios --profile production
```

**Manual Credentials (Advanced):**

If you prefer to manage credentials manually:

1. Go to https://developer.apple.com/account
2. Create App ID (Identifier)
3. Create Distribution Certificate
4. Create Provisioning Profile
5. Upload to EAS:
   ```bash
   eas credentials
   ```

### Step 2: Create App in App Store Connect

1. Go to https://appstoreconnect.apple.com
2. Click **"+"** → **"New App"**
3. Fill in:
   - Platform: iOS
   - Name: Your app name
   - Primary Language: English
   - Bundle ID: Select your bundle ID
   - SKU: Unique identifier (e.g., `your-app-001`)
   - User Access: Full Access

### Step 3: Build for Production

```bash
# Build iOS production binary
eas build --platform ios --profile production

# Wait for build to complete (usually 10-20 minutes)
# You'll receive a URL to download the .ipa file
```

### Step 4: Submit to App Store

**Option A: Automatic Submission (Recommended)**

```bash
# Update eas.json with App Store Connect credentials
# Then submit:
eas submit --platform ios --latest
```

**Option B: Manual Submission**

1. Download the `.ipa` file from EAS Build dashboard
2. Open **Transporter** app (macOS)
3. Drag and drop the `.ipa` file
4. Wait for upload to complete

### Step 5: Configure App Store Listing

1. Go to App Store Connect
2. Select your app
3. Fill in:
   - **App Information:**
     - Category
     - Content Rights
   - **Pricing and Availability:**
     - Price tier
     - Available territories
   - **App Store Listing:**
     - Screenshots (required sizes)
     - Description
     - Keywords
     - Support URL
     - Marketing URL (optional)
     - Privacy Policy URL

### Step 6: Submit for Review

1. Create a new version
2. Select the uploaded build
3. Fill in "What's New in This Version"
4. Add required screenshots for all device sizes:
   - iPhone 6.7" (iPhone 15 Pro Max): 1290 x 2796
   - iPhone 6.5" (iPhone 11 Pro Max): 1242 x 2688
   - iPad Pro 12.9" (6th gen): 2048 x 2732
5. Answer compliance questions
6. Click **"Submit for Review"**

**Review Timeline:** Typically 24-48 hours

---

## Android Deployment

### Step 1: Create Android Keystore

EAS Build can automatically create and manage your Android keystore:

```bash
# EAS will create and securely store your keystore
eas build --platform android --profile production
```

**Manual Keystore (Advanced):**

```bash
# Generate keystore manually
keytool -genkeypair -v \
  -storetype PKCS12 \
  -keystore my-upload-key.keystore \
  -alias my-key-alias \
  -keyalg RSA \
  -keysize 2048 \
  -validity 10000

# Upload to EAS
eas credentials
```

### Step 2: Create App in Google Play Console

1. Go to https://play.google.com/console
2. Click **"Create app"**
3. Fill in:
   - App name
   - Default language
   - App or game: Select appropriate
   - Free or paid: Select appropriate
4. Accept declarations
5. Click **"Create app"**

### Step 3: Set Up Store Listing

Navigate through the left sidebar and complete:

1. **Store Settings:**
   - App category
   - Tags (optional)
   - Store listing contact details

2. **Main Store Listing:**
   - App name (30 characters)
   - Short description (80 characters)
   - Full description (4000 characters)
   - App icon (512x512 PNG)
   - Feature graphic (1024x500 JPG/PNG)
   - Screenshots (at least 2):
     - Phone: 1080 x 1920 (or 16:9 aspect)
     - Tablet: 1536 x 2048 (or 3:4 aspect) - optional

3. **Content Rating:**
   - Complete questionnaire
   - Receive rating certificate

4. **Target Audience:**
   - Select age groups
   - Answer if app appeals to children

5. **Privacy Policy:**
   - Add privacy policy URL

6. **App Access:**
   - Specify if app has restricted access

### Step 4: Set Up Google Play App Signing

1. Go to **Setup → App signing**
2. Opt in to Google Play App Signing
3. Upload your upload key certificate (if using manual keystore)

### Step 5: Build for Production

```bash
# Build Android app bundle (.aab)
eas build --platform android --profile production

# Wait for build to complete
```

### Step 6: Create Release

1. Go to **Production** → **Create new release**
2. Upload the `.aab` file:

**Option A: Automatic Submission**

```bash
# First, create service account key:
# 1. Go to Google Cloud Console
# 2. Create service account with Play Developer API access
# 3. Download JSON key
# 4. Save as service-account-key.json

# Update eas.json with service account path
# Then submit:
eas submit --platform android --latest
```

**Option B: Manual Upload**

1. Download `.aab` from EAS Build dashboard
2. In Play Console, click **"Upload"**
3. Select the `.aab` file

3. Fill in release details:
   - Release name (e.g., "1.0.0")
   - Release notes (what's new)
4. Review and **"Save"** → **"Review release"**
5. Click **"Start rollout to Production"**

**Review Timeline:** Typically a few hours to 1-2 days

### Step 7: Set Up Rollout Strategy (Optional)

Instead of releasing to everyone at once:

1. Go to **Production** → **Create new release**
2. After review, choose **"Staged rollout"**
3. Select percentage (e.g., 10%, 50%)
4. Monitor for crashes/issues
5. Increase rollout percentage gradually

---

## OTA Updates Strategy

Over-the-air updates allow you to push JavaScript/asset updates without rebuilding.

### Understanding Updates

**When to use OTA updates:**
- Bug fixes in JavaScript code
- UI changes
- New features (JavaScript only)
- Updated assets (images, fonts)

**When you need a new build:**
- Native code changes
- New native dependencies
- expo-updates configuration changes
- Native permission changes
- SDK version upgrades

### Update Channels

Your app has three update channels (configured in `eas.json`):

1. **development** - For development builds
2. **preview** - For preview/staging builds
3. **production** - For production builds

### Publishing Updates

```bash
# Publish to production
eas update --branch production --message "Fix: Login bug"

# Publish to preview
eas update --branch preview --message "Feature: New profile page"

# Publish to specific channel
eas update --channel production --message "Update description"
```

### Update Strategy Best Practices

1. **Test updates in preview first:**
   ```bash
   eas update --branch preview --message "Test update"
   # Test thoroughly
   # If successful, publish to production
   eas update --branch production --message "Stable update"
   ```

2. **Gradual rollout:**
   - Publish to a small percentage of users first
   - Monitor crash reports and analytics
   - Roll out to more users if stable

3. **Emergency rollback:**
   ```bash
   # Republish previous stable update
   eas update --branch production --message "Rollback to stable"
   ```

4. **Update naming convention:**
   ```bash
   eas update --branch production --message "v1.0.1-hotfix: Fix critical bug"
   ```

### Monitoring Updates

- Check update adoption in Expo dashboard
- Monitor crash reports after updates
- Keep update messages clear and descriptive

---

## Versioning

### Semantic Versioning

Follow semver: `MAJOR.MINOR.PATCH`

- **MAJOR:** Breaking changes
- **MINOR:** New features (backward compatible)
- **PATCH:** Bug fixes

### Bumping Version

Use the provided script:

```bash
# Patch version (1.0.0 → 1.0.1)
npm run version:bump -- patch

# Minor version (1.0.1 → 1.1.0)
npm run version:bump -- minor

# Major version (1.1.0 → 2.0.0)
npm run version:bump -- major
```

This automatically updates:
- `package.json` version
- `app.json` version
- iOS `buildNumber`
- Android `versionCode`

### Commit and Tag

```bash
# After bumping version
git add .
git commit -m "chore: bump version to 1.0.1"
git tag v1.0.1
git push && git push --tags
```

---

## Troubleshooting

### iOS Issues

**Build fails with "Certificate issue"**
```bash
# Clear credentials and regenerate
eas credentials
# Select "Remove all credentials"
# Rebuild
eas build --platform ios --profile production
```

**App crashes on launch**
- Check native logs in Xcode
- Verify all native dependencies are compatible
- Check for missing permissions in `app.json`

**Rejected for missing compliance**
- Export compliance: Answer in App Store Connect
- Privacy manifest: Add required reasons

### Android Issues

**Build fails with "Keystore issue"**
```bash
# Reset credentials
eas credentials
# Select "Remove all credentials"
# Rebuild
```

**App rejected for permissions**
- Remove unused permissions from `app.json`
- Add clear permission justifications

**Submission fails**
- Ensure service account has correct permissions
- Verify `.aab` is signed correctly
- Check Google Play Console for specific errors

### Common Issues

**OTA update not received**
- Check update channel matches build profile
- Verify `runtimeVersion` policy in `app.json`
- App needs to restart to check for updates

**Build taking too long**
- Check EAS Build dashboard for queue status
- Consider upgrading to higher resource class
- Optimize dependencies (remove unused ones)

---

## Post-Launch Checklist

- [ ] Monitor crash reports (Sentry, Bugsnag, etc.)
- [ ] Track analytics (Mixpanel, Amplitude, etc.)
- [ ] Set up alerts for critical errors
- [ ] Monitor user reviews and respond
- [ ] Plan regular update schedule
- [ ] Keep dependencies up to date
- [ ] Test updates in preview before production
- [ ] Document any production issues and resolutions

---

## Resources

- **EAS Build:** https://docs.expo.dev/build/introduction/
- **EAS Submit:** https://docs.expo.dev/submit/introduction/
- **EAS Update:** https://docs.expo.dev/eas-update/introduction/
- **App Store Review Guidelines:** https://developer.apple.com/app-store/review/guidelines/
- **Google Play Policy:** https://play.google.com/about/developer-content-policy/
- **iOS Human Interface Guidelines:** https://developer.apple.com/design/human-interface-guidelines/
- **Android Design Guidelines:** https://developer.android.com/design

---

**Need Help?**

- Expo Forums: https://forums.expo.dev/
- Expo Discord: https://chat.expo.dev/
- Stack Overflow: Tag with `expo`, `eas-build`
