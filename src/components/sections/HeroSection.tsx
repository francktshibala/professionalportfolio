import { Container } from '@/components/ui/Container';
import { Heading, Text } from '@/components/ui/Typography';

export function HeroSection() {
  return (
    <section className="py-20 lg:py-32 relative overflow-hidden">
      <Container>
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <Heading as="h1" className="text-4xl lg:text-6xl font-bold leading-tight text-balance">
              Hi, I&apos;m{' '}
              <span className="bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
                Francisco
              </span>
            </Heading>
            <Text className="text-xl text-secondary-700 dark:text-secondary-300 leading-relaxed max-w-2xl">
              I craft exceptional digital experiences that bridge beautiful design with robust functionality. 
              Specializing in React, TypeScript, and modern web technologies to bring your ideas to life.
            </Text>
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <a href="#contact" className="inline-flex items-center justify-center rounded-lg text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-gradient-to-r from-primary-600 to-primary-700 text-white hover:from-primary-700 hover:to-primary-800 active:from-primary-800 active:to-primary-900 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 h-12 px-8 py-3">
                Get In Touch
                <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
              <a href="#projects" className="inline-flex items-center justify-center rounded-lg text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-secondary-100 active:bg-secondary-200 dark:hover:bg-secondary-800 dark:active:bg-secondary-700 h-12 px-8 py-3 border border-secondary-300 dark:border-secondary-700 text-secondary-700 dark:text-secondary-300 hover:text-secondary-900 dark:hover:text-secondary-100 shadow-sm hover:shadow-md transform hover:-translate-y-0.5">
                View My Work
                <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </a>
            </div>
          </div>
          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              <div className="w-80 h-80 rounded-full bg-gradient-to-br from-primary-100 to-accent-100 dark:from-primary-900/20 dark:to-accent-900/20 flex items-center justify-center shadow-2xl">
                <div className="w-72 h-72 rounded-full bg-gradient-to-br from-white to-secondary-50 dark:from-secondary-800 dark:to-secondary-900 flex items-center justify-center shadow-inner">
                  <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center shadow-lg">
                    <span className="text-4xl font-bold text-white drop-shadow-sm">F</span>
                  </div>
                </div>
              </div>
              <div className="absolute -top-6 -right-6 w-20 h-20 rounded-full bg-gradient-to-br from-primary-200 to-primary-300 dark:from-primary-700 dark:to-primary-800 animate-pulse shadow-lg"></div>
              <div className="absolute -bottom-6 -left-6 w-16 h-16 rounded-full bg-gradient-to-br from-accent-200 to-accent-300 dark:from-accent-700 dark:to-accent-800 animate-pulse delay-1000 shadow-lg"></div>
              <div className="absolute top-8 -left-8 w-12 h-12 rounded-full bg-gradient-to-br from-secondary-200 to-secondary-300 dark:from-secondary-600 dark:to-secondary-700 animate-pulse delay-2000 shadow-md"></div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}