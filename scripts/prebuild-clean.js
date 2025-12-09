#!/usr/bin/env node

/**
 * Prebuild Clean Script
 *
 * Cleans iOS and Android directories before running prebuild.
 * Useful when you need a fresh native build.
 *
 * Usage: npm run prebuild:clean
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const ANDROID_DIR = path.join(__dirname, '..', 'android');
const IOS_DIR = path.join(__dirname, '..', 'ios');

console.log('🧹 Cleaning native directories...\n');

// Remove Android directory
if (fs.existsSync(ANDROID_DIR)) {
  console.log('📱 Removing Android directory...');
  fs.rmSync(ANDROID_DIR, { recursive: true, force: true });
  console.log('✅ Android directory removed\n');
} else {
  console.log('ℹ️  Android directory does not exist\n');
}

// Remove iOS directory
if (fs.existsSync(IOS_DIR)) {
  console.log('📱 Removing iOS directory...');
  fs.rmSync(IOS_DIR, { recursive: true, force: true });
  console.log('✅ iOS directory removed\n');
} else {
  console.log('ℹ️  iOS directory does not exist\n');
}

// Run prebuild
console.log('🔨 Running expo prebuild...\n');
try {
  execSync('expo prebuild', { stdio: 'inherit' });
  console.log('\n✅ Prebuild completed successfully!');
} catch (error) {
  console.error('\n❌ Prebuild failed:', error.message);
  process.exit(1);
}
