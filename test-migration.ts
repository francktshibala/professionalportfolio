// Test script to validate TypeScript compilation
import { ProjectService } from './src/lib/project-service';
import { ProjectAdapter } from './src/lib/project-adapter';
import { projects } from './src/lib/projects';
import { DisplayProject } from './src/types';

async function testMigration() {
  console.log('🧪 Testing TypeScript compilation...');

  try {
    // Test static data to display conversion
    const firstProject = projects[0];
    const displayProject: DisplayProject = ProjectAdapter.staticToDisplay(firstProject);
    console.log(`✅ Static to Display conversion works: ${displayProject.title}`);

    // Test service layer
    const allProjects = await ProjectService.getProjects();
    console.log(`✅ ProjectService.getProjects() returns ${allProjects.length} projects`);

    // Test search
    const searchResults = await ProjectService.searchProjects('react');
    console.log(`✅ ProjectService.searchProjects() found ${searchResults.length} React projects`);

    // Test featured projects
    const featuredProjects = await ProjectService.getFeaturedProjects();
    console.log(`✅ ProjectService.getFeaturedProjects() returns ${featuredProjects.length} featured projects`);

    // Test migration status
    const status = await ProjectService.getMigrationStatus();
    console.log(`✅ Migration status: uses database: ${status.usesDatabase}, project count: ${status.projectCount}`);

    console.log('🎉 All TypeScript compilation tests passed!');
    return true;
  } catch (error) {
    console.error('❌ TypeScript compilation test failed:', error);
    return false;
  }
}

// Export for external testing
export { testMigration };

// Run if called directly
if (require.main === module) {
  testMigration().then((success) => {
    process.exit(success ? 0 : 1);
  });
}