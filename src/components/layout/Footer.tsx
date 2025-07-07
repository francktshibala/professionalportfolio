import { Container } from '@/components/ui/Container';

export function Footer() {
  return (
    <footer className="border-t border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <Container>
        <div className="flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
          <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
            <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
              Built with Next.js, TypeScript, and Tailwind CSS.
            </p>
          </div>
          <div className="flex items-center space-x-1">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Professional Portfolio
            </p>
          </div>
        </div>
      </Container>
    </footer>
  );
}