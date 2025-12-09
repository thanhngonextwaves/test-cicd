#!/usr/bin/env node

/**
 * Clear Cache Script
 *
 * Clears all caches (npm, Metro, Expo, watchman).
 * Useful when experiencing build or runtime issues.
 *
 * Usage: npm run clear
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const os = require('os');

console.log('🧹 Clearing all caches...\n');

// Helper to run command safely
function runCommand(command, description) {
  try {
    console.log(`🔄 ${description}...`);
    execSync(command, { stdio: 'inherit' });
    console.log(`✅ ${description} completed\n`);
  } catch (error) {
    console.log(`⚠️  ${description} failed (may not be installed)\n`);
  }
}

// Clear npm cache
runCommand('npm cache clean --force', 'Clearing npm cache');

// Clear Metro bundler cache
const metroCacheDir = path.join(os.tmpdir(), 'metro-*');
console.log('🔄 Clearing Metro cache...');
try {
  if (process.platform === 'win32') {
    execSync(`rmdir /s /q "${os.tmpdir()}\\metro-*"`, { stdio: 'ignore' });
  } else {
    execSync(`rm -rf ${metroCacheDir}`, { stdio: 'ignore' });
  }
  console.log('✅ Metro cache cleared\n');
} catch (error) {
  console.log('ℹ️  No Metro cache found\n');
}

// Clear Expo cache
const expoCacheDir = path.join(os.homedir(), '.expo');
if (fs.existsSync(expoCacheDir)) {
  console.log('🔄 Clearing Expo cache...');
  try {
    fs.rmSync(expoCacheDir, { recursive: true, force: true });
    console.log('✅ Expo cache cleared\n');
  } catch (error) {
    console.log('⚠️  Could not clear Expo cache\n');
  }
} else {
  console.log('ℹ️  No Expo cache found\n');
}

// Clear watchman (if installed)
runCommand('watchman watch-del-all', 'Clearing watchman watches');

// Clear node_modules and reinstall
console.log('🔄 Removing node_modules...');
const nodeModulesDir = path.join(__dirname, '..', 'node_modules');
if (fs.existsSync(nodeModulesDir)) {
  fs.rmSync(nodeModulesDir, { recursive: true, force: true });
  console.log('✅ node_modules removed\n');
}

console.log('📦 Reinstalling dependencies...');
try {
  execSync('npm install', { stdio: 'inherit' });
  console.log('\n✅ Dependencies installed successfully!\n');
} catch (error) {
  console.error('\n❌ Failed to install dependencies:', error.message);
  process.exit(1);
}

console.log('✨ All caches cleared! Try running your app now.\n');
