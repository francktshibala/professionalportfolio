import { Container } from '@/components/ui/Container';
import { Heading, Text } from '@/components/ui/Typography';

export function HeroSection() {
  return (
    <section className="py-20 lg:py-32">
      <Container>
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <Heading as="h1" className="text-4xl lg:text-6xl font-bold leading-tight">
              Hi, I&apos;m{' '}
              <span className="text-primary">
                Francisco
              </span>
            </Heading>
            <Text className="text-xl text-muted-foreground leading-relaxed">
              Full-stack developer passionate about creating beautiful, functional web experiences. 
              I specialize in React, TypeScript, and modern web technologies.
            </Text>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="#contact" className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary-600 text-white hover:bg-primary-700 active:bg-primary-800 h-11 px-8 py-2">
                Get In Touch
              </a>
              <a href="#projects" className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-secondary-100 active:bg-secondary-200 h-11 px-8 py-2 border border-input">
                View My Work
              </a>
            </div>
          </div>
          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              <div className="w-80 h-80 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                <div className="w-72 h-72 rounded-full bg-muted flex items-center justify-center">
                  <div className="w-32 h-32 rounded-full bg-primary/20 flex items-center justify-center">
                    <span className="text-4xl font-bold text-primary">F</span>
                  </div>
                </div>
              </div>
              <div className="absolute -top-4 -right-4 w-16 h-16 rounded-full bg-primary/10 animate-pulse"></div>
              <div className="absolute -bottom-4 -left-4 w-12 h-12 rounded-full bg-secondary/10 animate-pulse delay-1000"></div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}