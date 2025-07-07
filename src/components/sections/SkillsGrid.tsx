import { Card } from '@/components/ui/Card';
import { Container } from '@/components/ui/Container';
import { Heading, Text } from '@/components/ui/Typography';

const skillCategories = [
  {
    title: 'Frontend',
    skills: [
      { name: 'React', level: 'Expert' },
      { name: 'TypeScript', level: 'Expert' },
      { name: 'Next.js', level: 'Advanced' },
      { name: 'Tailwind CSS', level: 'Advanced' },
      { name: 'JavaScript', level: 'Expert' },
      { name: 'HTML/CSS', level: 'Expert' },
    ],
  },
  {
    title: 'Backend',
    skills: [
      { name: 'Node.js', level: 'Advanced' },
      { name: 'Python', level: 'Intermediate' },
      { name: 'PostgreSQL', level: 'Advanced' },
      { name: 'MongoDB', level: 'Intermediate' },
      { name: 'REST APIs', level: 'Advanced' },
      { name: 'GraphQL', level: 'Intermediate' },
    ],
  },
  {
    title: 'Tools & DevOps',
    skills: [
      { name: 'Git', level: 'Expert' },
      { name: 'Docker', level: 'Intermediate' },
      { name: 'AWS', level: 'Intermediate' },
      { name: 'Vercel', level: 'Advanced' },
      { name: 'Jest', level: 'Advanced' },
      { name: 'Cypress', level: 'Intermediate' },
    ],
  },
];

function SkillBadge({ skill }: { skill: { name: string; level: string } }) {
  const levelColors = {
    Expert: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    Advanced: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    Intermediate: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
  };

  return (
    <div className="flex items-center justify-between p-3 rounded-lg border bg-card">
      <span className="font-medium">{skill.name}</span>
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${levelColors[skill.level as keyof typeof levelColors]}`}>
        {skill.level}
      </span>
    </div>
  );
}

export function SkillsGrid() {
  return (
    <section id="skills" className="py-20 bg-muted/50">
      <Container>
        <div className="text-center mb-12">
          <Heading as="h2" className="text-3xl lg:text-4xl font-bold mb-4">
            Skills & Technologies
          </Heading>
          <Text className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Here are the technologies and tools I work with to bring ideas to life.
          </Text>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {skillCategories.map((category) => (
            <Card key={category.title} className="p-6">
              <Heading as="h3" className="text-xl font-semibold mb-4 text-primary">
                {category.title}
              </Heading>
              <div className="space-y-3">
                {category.skills.map((skill) => (
                  <SkillBadge key={skill.name} skill={skill} />
                ))}
              </div>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}