#!/usr/bin/env node

/**
 * Bump Version Script
 *
 * Automatically bumps version numbers in app.json and package.json.
 * Also increments iOS buildNumber and Android versionCode.
 *
 * Usage:
 *   npm run version:bump -- patch  (1.0.0 -> 1.0.1)
 *   npm run version:bump -- minor  (1.0.1 -> 1.1.0)
 *   npm run version:bump -- major  (1.1.0 -> 2.0.0)
 */

const fs = require('fs');
const path = require('path');

const APP_JSON_PATH = path.join(__dirname, '..', 'app.json');
const PACKAGE_JSON_PATH = path.join(__dirname, '..', 'package.json');

// Get bump type from arguments
const bumpType = process.argv[2] || 'patch';
const validBumpTypes = ['major', 'minor', 'patch'];

if (!validBumpTypes.includes(bumpType)) {
  console.error(`❌ Invalid bump type: ${bumpType}`);
  console.log(`Usage: npm run version:bump -- [major|minor|patch]`);
  process.exit(1);
}

/**
 * Bump semver version
 */
function bumpVersion(version, type) {
  const [major, minor, patch] = version.split('.').map(Number);

  switch (type) {
    case 'major':
      return `${major + 1}.0.0`;
    case 'minor':
      return `${major}.${minor + 1}.0`;
    case 'patch':
      return `${major}.${minor}.${patch + 1}`;
    default:
      return version;
  }
}

try {
  console.log(`📦 Bumping version (${bumpType})...\n`);

  // Read package.json
  const packageJson = JSON.parse(fs.readFileSync(PACKAGE_JSON_PATH, 'utf8'));
  const oldVersion = packageJson.version;
  const newVersion = bumpVersion(oldVersion, bumpType);

  // Update package.json
  packageJson.version = newVersion;
  fs.writeFileSync(PACKAGE_JSON_PATH, JSON.stringify(packageJson, null, 2) + '\n');
  console.log(`✅ package.json: ${oldVersion} → ${newVersion}`);

  // Read app.json
  const appJson = JSON.parse(fs.readFileSync(APP_JSON_PATH, 'utf8'));
  appJson.expo.version = newVersion;

  // Bump iOS buildNumber
  const oldBuildNumber = parseInt(appJson.expo.ios.buildNumber || '1');
  const newBuildNumber = oldBuildNumber + 1;
  appJson.expo.ios.buildNumber = newBuildNumber.toString();
  console.log(`✅ iOS buildNumber: ${oldBuildNumber} → ${newBuildNumber}`);

  // Bump Android versionCode
  const oldVersionCode = appJson.expo.android.versionCode || 1;
  const newVersionCode = oldVersionCode + 1;
  appJson.expo.android.versionCode = newVersionCode;
  console.log(`✅ Android versionCode: ${oldVersionCode} → ${newVersionCode}`);

  // Update app.json
  fs.writeFileSync(APP_JSON_PATH, JSON.stringify(appJson, null, 2) + '\n');
  console.log(`✅ app.json: ${oldVersion} → ${newVersion}\n`);

  console.log('🎉 Version bump complete!\n');
  console.log('Next steps:');
  console.log('1. Review changes: git diff');
  console.log('2. Commit changes: git add . && git commit -m "chore: bump version to ${newVersion}"');
  console.log('3. Create tag: git tag v${newVersion}');
  console.log('4. Push: git push && git push --tags\n');
} catch (error) {
  console.error('❌ Error bumping version:', error.message);
  process.exit(1);
}
