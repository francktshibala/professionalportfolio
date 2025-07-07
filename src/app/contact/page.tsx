import { Container } from '@/components/ui/Container';
import { Heading, Text } from '@/components/ui/Typography';

export default function ContactPage() {
  return (
    <Container>
      <div className="py-12">
        <Heading size="h1" className="mb-6">
          Contact
        </Heading>
        <Text className="text-muted-foreground">
          This is the contact page. Content will be added in the next phase.
        </Text>
      </div>
    </Container>
  );
}