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
    <section id="contact" className="py-24 bg-gradient-to-br from-secondary-50 to-primary-50 dark:from-secondary-900 dark:to-primary-950">
      <Container>
        <div className="text-center mb-16">
          <Heading as="h2" className="text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
            Let&apos;s Work Together
          </Heading>
          <Text className="text-xl text-secondary-700 dark:text-secondary-300 max-w-3xl mx-auto leading-relaxed">
            I&apos;m currently available for freelance projects and full-time opportunities. 
            Let&apos;s discuss how we can bring your ideas to life and create something amazing together.
          </Text>
        </div>
        
        <div className="grid md:grid-cols-2 gap-16 items-start">
          <div className="space-y-6">
            <Card className="p-8 bg-white/80 dark:bg-secondary-900/80 backdrop-blur-sm border-secondary-200 dark:border-secondary-700 hover:shadow-xl transition-all duration-300">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center shadow-lg">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <Heading as="h3" className="text-xl font-bold text-secondary-900 dark:text-secondary-100">Available for Work</Heading>
                  <Text className="text-secondary-600 dark:text-secondary-400 font-medium">Open to new opportunities</Text>
                </div>
              </div>
              <Text className="text-secondary-700 dark:text-secondary-300 leading-relaxed">
                I&apos;m actively seeking new projects and collaborations. Whether you need a full-stack developer 
                or want to discuss a potential partnership, I&apos;d love to hear from you and explore how we can work together.
              </Text>
            </Card>
            
            <div className="space-y-4">
              {contactInfo.map((info) => (
                <a
                  key={info.title}
                  href={info.href}
                  className="flex items-center gap-4 p-4 rounded-xl hover:bg-white/50 dark:hover:bg-secondary-800/50 transition-all duration-200 group hover:shadow-lg hover:-translate-y-1 border border-transparent hover:border-secondary-200 dark:hover:border-secondary-700"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-accent-500 rounded-xl flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow duration-200">
                    <span className="text-white text-xl">{info.icon}</span>
                  </div>
                  <div>
                    <Text className="font-semibold text-secondary-900 dark:text-secondary-100 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                      {info.title}
                    </Text>
                    <Text className="text-secondary-600 dark:text-secondary-400">
                      {info.value}
                    </Text>
                  </div>
                </a>
              ))}
            </div>
          </div>
          
          <div className="space-y-6">
            <Card className="p-8 bg-white/80 dark:bg-secondary-900/80 backdrop-blur-sm border-secondary-200 dark:border-secondary-700 hover:shadow-xl transition-all duration-300">
              <Heading as="h3" className="text-xl font-bold mb-4 text-secondary-900 dark:text-secondary-100">Get In Touch</Heading>
              <Text className="text-secondary-700 dark:text-secondary-300 mb-6 leading-relaxed">
                Ready to start a conversation? Choose your preferred method:
              </Text>
              <div className="space-y-4">
                <a href="mailto:francisco@example.com" className="inline-flex items-center justify-center rounded-lg text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-gradient-to-r from-primary-600 to-primary-700 text-white hover:from-primary-700 hover:to-primary-800 active:from-primary-800 active:to-primary-900 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 h-12 px-8 py-3 w-full">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Send Email
                </a>
                <a href="https://linkedin.com/in/francisco" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center rounded-lg text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-secondary-100 active:bg-secondary-200 dark:hover:bg-secondary-800 dark:active:bg-secondary-700 h-12 px-8 py-3 w-full border border-secondary-300 dark:border-secondary-700 text-secondary-700 dark:text-secondary-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                  Connect on LinkedIn
                </a>
              </div>
            </Card>
            
            <Card className="p-8 bg-white/80 dark:bg-secondary-900/80 backdrop-blur-sm border-secondary-200 dark:border-secondary-700 hover:shadow-xl transition-all duration-300">
              <Heading as="h3" className="text-xl font-bold mb-6 text-secondary-900 dark:text-secondary-100">Follow Me</Heading>
              <div className="flex gap-4">
                {socialLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-14 h-14 bg-gradient-to-br from-secondary-100 to-secondary-200 dark:from-secondary-800 dark:to-secondary-700 rounded-2xl flex items-center justify-center hover:from-primary-500 hover:to-accent-500 hover:text-white transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-1"
                    title={link.name}
                  >
                    <span className="text-xl">{link.icon}</span>
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