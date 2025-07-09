#!/usr/bin/env node

import { runSafeMigration } from '../src/lib/migration-orchestrator';

async function main() {
  console.log('🚀 Starting safe core migration...');
  
  try {
    await runSafeMigration();
    console.log('✅ Migration completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

export { main as runCoreMigration };