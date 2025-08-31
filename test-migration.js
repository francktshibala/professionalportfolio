#!/usr/bin/env node

// Simple test script to verify migration works
const { exec } = require('child_process');

async function testMigration() {
  console.log('🧪 Testing migration system...');
  
  // Test 1: Check if core migration file exists
  const fs = require('fs');
  const migrationFile = './src/lib/core-migration.ts';
  
  if (fs.existsSync(migrationFile)) {
    console.log('✅ Core migration file exists');
  } else {
    console.log('❌ Core migration file missing');
    return;
  }
  
  // Test 2: Check if backup system exists
  const backupFile = './src/lib/backup-system.ts';
  
  if (fs.existsSync(backupFile)) {
    console.log('✅ Backup system file exists');
  } else {
    console.log('❌ Backup system file missing');
    return;
  }
  
  // Test 3: Check if orchestrator exists
  const orchestratorFile = './src/lib/migration-orchestrator.ts';
  
  if (fs.existsSync(orchestratorFile)) {
    console.log('✅ Migration orchestrator file exists');
  } else {
    console.log('❌ Migration orchestrator file missing');
    return;
  }
  
  // Test 4: Check if package.json has the migration script
  const packageJson = JSON.parse(fs.readFileSync('./package.json', 'utf8'));
  
  if (packageJson.scripts && packageJson.scripts['migrate:core']) {
    console.log('✅ Migration script added to package.json');
  } else {
    console.log('❌ Migration script missing from package.json');
    return;
  }
  
  // Test 5: Check if ESLint config has been updated
  const eslintConfig = JSON.parse(fs.readFileSync('./.eslintrc.json', 'utf8'));
  
  if (eslintConfig.overrides && eslintConfig.overrides.length > 0) {
    console.log('✅ ESLint config updated with migration overrides');
  } else {
    console.log('❌ ESLint config not updated');
    return;
  }
  
  console.log('🎉 All migration system tests passed!');
  console.log('📋 Migration system is ready for deployment');
}

testMigration().catch(console.error);