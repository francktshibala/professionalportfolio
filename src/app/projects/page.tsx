import { Container } from '@/components/ui/Container';
import { Heading, Text } from '@/components/ui/Typography';

export default function ProjectsPage() {
  return (
    <Container>
      <div className="py-12">
        <Heading size="h1" className="mb-6">
          Projects
        </Heading>
        <Text className="text-muted-foreground">
          This is the projects page. Content will be added in the next phase.
        </Text>
      </div>
    </Container>
  );
}