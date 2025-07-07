import { Card } from '@/components/ui/Card';
import { Container } from '@/components/ui/Container';
import { Heading, Text } from '@/components/ui/Typography';

const contactInfo = [
  {
    icon: '📧',
    title: 'Email',
    value: 'francisco@example.com',
    href: 'mailto:francisco@example.com',
  },
  {
    icon: '💼',
    title: 'LinkedIn',
    value: 'linkedin.com/in/francisco',
    href: 'https://linkedin.com/in/francisco',
  },
  {
    icon: '💻',
    title: 'GitHub',
    value: 'github.com/francisco',
    href: 'https://github.com/francisco',
  },
];

const socialLinks = [
  {
    name: 'Twitter',
    url: 'https://twitter.com/francisco',
    icon: '🐦',
  },
  {
    name: 'LinkedIn',
    url: 'https://linkedin.com/in/francisco',
    icon: '💼',
  },
  {
    name: 'GitHub',
    url: 'https://github.com/francisco',
    icon: '💻',
  },
  {
    name: 'Email',
    url: 'mailto:francisco@example.com',
    icon: '📧',
  },
];

export function ContactSection() {
  return (
    <section id="contact" className="py-20 bg-muted/50">
      <Container>
        <div className="text-center mb-12">
          <Heading as="h2" className="text-3xl lg:text-4xl font-bold mb-4">
            Let&apos;s Work Together
          </Heading>
          <Text className="text-xl text-muted-foreground max-w-2xl mx-auto">
            I&apos;m currently available for freelance projects and full-time opportunities. 
            Let&apos;s discuss how we can bring your ideas to life.
          </Text>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                  <span className="text-green-600 dark:text-green-400 text-xl">✓</span>
                </div>
                <div>
                  <Heading as="h3" className="font-semibold">Available for Work</Heading>
                  <Text className="text-sm text-muted-foreground">Open to new opportunities</Text>
                </div>
              </div>
              <Text className="text-muted-foreground">
                I&apos;m actively seeking new projects and collaborations. Whether you need a full-stack developer 
                or want to discuss a potential partnership, I&apos;d love to hear from you.
              </Text>
            </Card>
            
            <div className="space-y-4">
              {contactInfo.map((info) => (
                <a
                  key={info.title}
                  href={info.href}
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors group"
                >
                  <span className="text-2xl">{info.icon}</span>
                  <div>
                    <Text className="font-medium group-hover:text-primary transition-colors">
                      {info.title}
                    </Text>
                    <Text className="text-sm text-muted-foreground">
                      {info.value}
                    </Text>
                  </div>
                </a>
              ))}
            </div>
          </div>
          
          <div className="space-y-6">
            <Card className="p-6">
              <Heading as="h3" className="font-semibold mb-4">Get In Touch</Heading>
              <Text className="text-muted-foreground mb-6">
                Ready to start a conversation? Choose your preferred method:
              </Text>
              <div className="space-y-3">
                <a href="mailto:francisco@example.com" className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary-600 text-white hover:bg-primary-700 active:bg-primary-800 h-11 px-8 py-2 w-full">
                  Send Email
                </a>
                <a href="https://linkedin.com/in/francisco" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-secondary-100 active:bg-secondary-200 h-11 px-8 py-2 w-full border border-input">
                  Connect on LinkedIn
                </a>
              </div>
            </Card>
            
            <Card className="p-6">
              <Heading as="h3" className="font-semibold mb-4">Follow Me</Heading>
              <div className="flex gap-3">
                {socialLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-muted rounded-full flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                    title={link.name}
                  >
                    <span className="text-lg">{link.icon}</span>
                  </a>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </Container>
    </section>
  );
}