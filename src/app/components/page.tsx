import { Button } from '@/components/ui/Button';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/Card';
import { Container } from '@/components/ui/Container';
import { Heading, Text } from '@/components/ui/Typography';
import { ThemeToggle } from '@/components/ui/ThemeToggle';

export default function ComponentsPage() {
  return (
    <Container className="py-8 space-y-8">
      <div className="flex justify-between items-center">
        <Heading size="h1">Design System Components</Heading>
        <ThemeToggle />
      </div>

      <div className="space-y-8">
        <section>
          <Heading size="h2" className="mb-4">Typography</Heading>
          <div className="space-y-2">
            <Heading size="h1">Heading 1</Heading>
            <Heading size="h2">Heading 2</Heading>
            <Heading size="h3">Heading 3</Heading>
            <Text size="base">This is base text content.</Text>
            <Text size="sm" color="muted">This is small muted text.</Text>
            <Text size="lg" weight="semibold">This is large semibold text.</Text>
            <Text color="accent">This is accent colored text.</Text>
          </div>
        </section>

        <section>
          <Heading size="h2" className="mb-4">Buttons</Heading>
          <div className="flex gap-4 flex-wrap">
            <Button variant="primary">Primary Button</Button>
            <Button variant="secondary">Secondary Button</Button>
            <Button variant="ghost">Ghost Button</Button>
            <Button variant="primary" size="sm">Small</Button>
            <Button variant="primary" size="lg">Large</Button>
            <Button variant="primary" disabled>Disabled</Button>
          </div>
        </section>

        <section>
          <Heading size="h2" className="mb-4">Cards</Heading>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card variant="default">
              <CardHeader>
                <Heading size="h3">Default Card</Heading>
                <Text size="sm" color="muted">This is a default card with border.</Text>
              </CardHeader>
              <CardContent>
                <Text>Card content goes here. This is some example text to show how content appears in cards.</Text>
              </CardContent>
              <CardFooter>
                <Button size="sm">Action</Button>
              </CardFooter>
            </Card>

            <Card variant="elevated">
              <CardHeader>
                <Heading size="h3">Elevated Card</Heading>
                <Text size="sm" color="muted">This card has a shadow for elevation.</Text>
              </CardHeader>
              <CardContent>
                <Text>This card demonstrates the elevated variant with shadow effects.</Text>
              </CardContent>
              <CardFooter>
                <Button variant="secondary" size="sm">Secondary Action</Button>
              </CardFooter>
            </Card>

            <Card variant="outlined">
              <CardHeader>
                <Heading size="h3">Outlined Card</Heading>
                <Text size="sm" color="muted">This card has a thicker border.</Text>
              </CardHeader>
              <CardContent>
                <Text>The outlined variant uses a thicker border for emphasis.</Text>
              </CardContent>
              <CardFooter>
                <Button variant="ghost" size="sm">Ghost Action</Button>
              </CardFooter>
            </Card>
          </div>
        </section>

        <section>
          <Heading size="h2" className="mb-4">Containers</Heading>
          <div className="space-y-4">
            <div className="bg-secondary-100 dark:bg-secondary-800 p-4 rounded">
              <Text size="sm" color="muted">Container with default settings (xl max-width, medium padding)</Text>
            </div>
            <Container maxWidth="md" className="bg-primary-50 dark:bg-primary-900 p-4 rounded">
              <Text size="sm">Container with medium max-width</Text>
            </Container>
            <Container maxWidth="lg" padding="lg" className="bg-accent-50 dark:bg-accent-900 p-4 rounded">
              <Text size="sm">Container with large max-width and large padding</Text>
            </Container>
          </div>
        </section>
      </div>
    </Container>
  );
}