import { HeroSection } from '@/components/sections/HeroSection';
import { SkillsGrid } from '@/components/sections/SkillsGrid';
import { FeaturedProjects } from '@/components/sections/FeaturedProjects';
import { TestimonialsSection } from '@/components/sections/TestimonialsSection';
import { ContactSection } from '@/components/sections/ContactSection';

export default function Home() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <SkillsGrid />
      <FeaturedProjects />
      <TestimonialsSection />
      <ContactSection />
    </div>
  );
}
