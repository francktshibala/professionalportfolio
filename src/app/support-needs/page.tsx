'use client';

interface NeedItem {
  title: string;
  cost: string;
  description: string;
  help: string[];
}

interface NeedSection {
  title: string;
  timeframe: string;
  totalCost: string;
  description: string;
  items: NeedItem[];
}

const supportNeeds: NeedSection[] = [
  {
    title: 'Short-Term Needs',
    timeframe: 'Next 3 Months',
    totalCost: '$42,000 + $5,000/month',
    description: 'These are the essentials we need to launch and help our first users',
    items: [
      {
        title: 'Legal Protection',
        cost: '$16,000',
        description: 'We need lawyers to ensure we can legally use books without getting sued. Without this, we can\'t even start.',
        help: ['Financial donations', 'Pro-bono legal services', 'Connections to copyright attorneys']
      },
      {
        title: 'AI Technology Costs',
        cost: '$5,000/month',
        description: 'The AI is the heart of BookBridge - it\'s what makes personalized tutoring possible for everyone.',
        help: ['Monthly sponsorships', 'Corporate partnerships', 'Technical credits from AI companies']
      },
      {
        title: 'Book Licensing',
        cost: '$10,000',
        description: 'Students want to read Harry Potter and modern books, not just old classics. We need licenses for 50 popular books.',
        help: ['Publishing connections', 'Book donations', 'Author partnerships']
      },
      {
        title: 'Academic Reviewers',
        cost: '$8,000',
        description: 'We\'re hiring accredited teachers and professors to review every simplified book before it\'s available. Each book will be checked for accuracy and educational quality by real educators - some paid, some volunteering their expertise.',
        help: ['University professor volunteers', 'Accredited teacher connections', 'Academic partnerships', 'Educational reviewer recommendations']
      },
      {
        title: 'Student Testing',
        cost: '$3,000',
        description: 'We need 50 real ESL students to test BookBridge before launch to ensure it truly helps learners.',
        help: ['ESL teacher connections', 'Student volunteer testers', 'Language school partnerships']
      }
    ]
  },
  {
    title: 'Mid-Term Needs',
    timeframe: '6-12 Months',
    totalCost: '$75,000',
    description: 'Once we\'ve launched, these will help us grow and serve more people',
    items: [
      {
        title: 'Accessibility Features',
        cost: '$20,000',
        description: '285 million people have visual impairments. We want BookBridge to work for everyone with advanced voice features, screen reader support, and dyslexia-friendly fonts.',
        help: ['Voice technology experts', 'Accessibility testers', 'Screen reader specialists', 'Funding for specialized tools']
      },
      {
        title: 'Content Expansion',
        cost: '$35,000',
        description: 'Different cultures need different books. We need to license 200 more books from around the world and create simplified versions in multiple languages.',
        help: ['Book licensing funds', 'Translation volunteers', 'International publisher connections', 'Cultural content advisors']
      },
      {
        title: 'Community Building',
        cost: '$20,000',
        description: 'Learning is better together. We need to build a supportive community of learners with forums, study groups, and peer support.',
        help: ['Community platform development', 'Community managers', 'Social media helpers', 'Student ambassadors']
      }
    ]
  },
  {
    title: 'Long-Term Vision',
    timeframe: '1-2 Years',
    totalCost: '$150,000',
    description: 'Our dream to serve every type of learner',
    items: [
      {
        title: 'Learning Disability Support',
        cost: '$50,000',
        description: 'Millions of people with dyslexia, ADHD, and other learning differences struggle with traditional reading. We\'ll develop specialized features and tools for each learning difference.',
        help: ['Special education experts', 'Research partnerships', 'Adaptive technology development', 'Clinical testing funds']
      },
      {
        title: 'Global Language Expansion',
        cost: '$60,000',
        description: 'Not everyone learns in English. We want to support reading in 50+ languages with culturally appropriate content and native speaker support.',
        help: ['Translation costs for 50 languages', 'Native speaker reviewers', 'Cultural content advisors', 'International educator partnerships']
      },
      {
        title: 'School Partnerships',
        cost: '$40,000',
        description: 'To truly democratize reading, we need to be in classrooms worldwide, especially in underserved communities where students need us most.',
        help: ['School pilot program funding', 'Teacher training materials', 'Education policy advisors', 'Classroom technology support']
      }
    ]
  }
];

const howToHelp = [
  {
    title: 'Financial Support',
    items: [
      'Every $100 helps one student access BookBridge for a full year',
      '$1,000 sponsors AI tutoring for 50 students per month',
      '$5,000 funds an entire classroom for a year'
    ]
  },
  {
    title: 'Your Network',
    items: [
      'Know a teacher? Connect us!',
      'Have publisher friends? We need book partnerships',
      'Work in tech? We need AI credits and technical advice'
    ]
  },
  {
    title: 'Your Time',
    items: [
      'Test our platform and give feedback',
      'Share our mission on social media',
      'Volunteer your professional skills'
    ]
  },
  {
    title: 'Your Expertise',
    items: [
      'Educators: Help shape our curriculum',
      'Developers: Contribute to our open-source components',
      'Writers: Help create reading guides'
    ]
  }
];

export default function SupportNeedsPage() {
  return (
    <div>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Source+Serif+Pro:wght@400;600&display=swap');

        :root {
          --bg-primary: #F4F1EB;
          --bg-secondary: #FFFFFF;
          --text-primary: #2C1810;
          --text-secondary: #5D4E37;
          --text-accent: #002147;
          --accent-primary: #002147;
          --accent-secondary: #CD7F32;
          --border-light: #E5DDD4;
          --shadow-soft: rgba(44, 24, 16, 0.1);
        }

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: 'Source Serif Pro', Georgia, serif;
          line-height: 1.6;
          background: var(--bg-primary);
          color: var(--text-primary);
        }

        .support-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 60px 40px;
        }

        .hero-section {
          text-align: center;
          margin-bottom: 60px;
        }

        .hero-title {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: 3rem;
          font-weight: bold;
          color: var(--text-accent);
          margin-bottom: 30px;
          line-height: 1.2;
        }

        .hero-text {
          font-family: 'Source Serif Pro', Georgia, serif;
          font-size: 1.1rem;
          color: var(--text-primary);
          line-height: 1.7;
          margin-bottom: 20px;
          max-width: 900px;
          margin-left: auto;
          margin-right: auto;
        }

        .hero-text strong {
          color: var(--text-accent);
        }

        .section-card {
          background: var(--bg-secondary);
          border: 1px solid var(--border-light);
          border-radius: 8px;
          padding: 40px;
          margin-bottom: 40px;
          box-shadow: 0 2px 8px var(--shadow-soft);
        }

        .section-header {
          margin-bottom: 30px;
        }

        .section-title {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: 2rem;
          font-weight: bold;
          color: var(--text-accent);
          margin-bottom: 10px;
        }

        .section-description {
          font-family: 'Source Serif Pro', Georgia, serif;
          font-size: 1.1rem;
          color: var(--text-secondary);
          font-style: italic;
        }

        .items-grid {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .need-item {
          background: var(--bg-primary);
          border: 1px solid var(--border-light);
          border-radius: 8px;
          padding: 28px;
          box-shadow: 0 1px 4px var(--shadow-soft);
        }

        .item-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 16px;
          flex-wrap: wrap;
          gap: 12px;
        }

        .item-title {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: 1.4rem;
          font-weight: bold;
          color: var(--accent-primary);
        }

        .item-cost {
          background: var(--accent-secondary);
          color: var(--bg-primary);
          padding: 8px 20px;
          border-radius: 20px;
          font-family: 'Source Serif Pro', Georgia, serif;
          font-weight: 600;
          font-size: 1rem;
        }

        .item-description {
          font-family: 'Source Serif Pro', Georgia, serif;
          font-size: 1rem;
          color: var(--text-primary);
          line-height: 1.7;
          margin-bottom: 16px;
        }

        .help-list-title {
          font-family: 'Source Serif Pro', Georgia, serif;
          font-weight: 600;
          color: var(--text-accent);
          margin-bottom: 8px;
        }

        .help-list {
          list-style: none;
          padding: 0;
        }

        .help-list li {
          font-family: 'Source Serif Pro', Georgia, serif;
          color: var(--text-secondary);
          padding-left: 20px;
          position: relative;
          margin-bottom: 6px;
        }

        .help-list li::before {
          content: "•";
          color: var(--accent-secondary);
          font-weight: bold;
          position: absolute;
          left: 0;
        }

        .how-to-help-title {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: 2rem;
          font-weight: bold;
          color: var(--text-accent);
          text-align: center;
          margin-bottom: 40px;
        }

        .help-categories {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 24px;
          margin-bottom: 40px;
        }

        .help-category {
          background: var(--bg-secondary);
          border: 1px solid var(--border-light);
          border-radius: 8px;
          padding: 28px;
          box-shadow: 0 2px 8px var(--shadow-soft);
        }

        .category-title {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: 1.3rem;
          font-weight: bold;
          color: var(--accent-primary);
          margin-bottom: 16px;
        }

        .cta-section {
          background: var(--bg-secondary);
          border: 1px solid var(--border-light);
          border-radius: 8px;
          padding: 40px;
          text-align: center;
          box-shadow: 0 2px 8px var(--shadow-soft);
        }

        .cta-text {
          font-family: 'Source Serif Pro', Georgia, serif;
          font-size: 1.1rem;
          color: var(--text-primary);
          line-height: 1.7;
          margin-bottom: 24px;
          font-style: italic;
          max-width: 800px;
          margin-left: auto;
          margin-right: auto;
        }

        .cta-buttons {
          display: flex;
          flex-wrap: wrap;
          gap: 16px;
          justify-content: center;
          margin-top: 32px;
        }

        .cta-btn {
          padding: 14px 28px;
          border-radius: 8px;
          text-decoration: none;
          font-family: 'Source Serif Pro', Georgia, serif;
          font-weight: 600;
          font-size: 1rem;
          transition: all 0.3s ease;
          cursor: pointer;
          box-shadow: 0 2px 8px var(--shadow-soft);
          display: inline-block;
        }

        .cta-btn-primary {
          background: var(--accent-secondary);
          color: var(--bg-primary);
          border: none;
        }

        .cta-btn-primary:hover {
          background: #B8722D;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(205, 127, 50, 0.3);
        }

        .cta-btn-secondary {
          background: transparent;
          color: var(--accent-primary);
          border: 2px solid var(--accent-primary);
        }

        .cta-btn-secondary:hover {
          background: var(--accent-primary);
          color: var(--bg-primary);
          transform: translateY(-2px);
        }

        @media (max-width: 768px) {
          .support-container {
            padding: 40px 20px;
          }

          .hero-title {
            font-size: 2rem;
          }

          .hero-text {
            font-size: 1rem;
          }

          .section-card {
            padding: 28px 20px;
          }

          .section-title {
            font-size: 1.6rem;
          }

          .item-header {
            flex-direction: column;
          }

          .item-title {
            font-size: 1.2rem;
          }

          .help-categories {
            grid-template-columns: 1fr;
          }

          .cta-buttons {
            flex-direction: column;
            align-items: stretch;
          }

          .cta-btn {
            width: 100%;
          }
        }
      `}</style>

      <div className="support-container">
        {/* Hero Section */}
        <div className="hero-section">
          <h1 className="hero-title">Help Us Make Books Accessible to Everyone</h1>
          <p className="hero-text">
            <strong>BookBridge believes that everyone deserves to understand and enjoy any book, regardless of their reading level, income, or where they live.</strong>
          </p>
          <p className="hero-text">
            We&apos;re building an AI-powered reading companion that helps people truly understand what they read - starting with the 1.5 billion people learning English worldwide. Whether you&apos;re 8 or 80, whether English is your first or fifth language, BookBridge adapts to help you learn.
          </p>
          <p className="hero-text" style={{ fontWeight: 600 }}>
            Every contribution, no matter how small, brings us closer to a world where no one is left behind in their reading journey.
          </p>
        </div>

        {/* Support Needs Sections */}
        {supportNeeds.map((section, sectionIndex) => (
          <div key={sectionIndex} className="section-card">
            <div className="section-header">
              <h2 className="section-title">
                {section.title} ({section.timeframe}) - {section.totalCost}
              </h2>
              <p className="section-description">{section.description}</p>
            </div>

            <div className="items-grid">
              {section.items.map((item, itemIndex) => (
                <div key={itemIndex} className="need-item">
                  <div className="item-header">
                    <h3 className="item-title">
                      {itemIndex + 1}. {item.title}
                    </h3>
                    <span className="item-cost">{item.cost}</span>
                  </div>

                  <p className="item-description">
                    <strong>Why it matters:</strong> {item.description}
                  </p>

                  <div>
                    <p className="help-list-title">How you can help:</p>
                    <ul className="help-list">
                      {item.help.map((helpItem, helpIndex) => (
                        <li key={helpIndex}>{helpItem}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* How You Can Help Section */}
        <div>
          <h2 className="how-to-help-title">How You Can Help Right Now</h2>

          <div className="help-categories">
            {howToHelp.map((category, index) => (
              <div key={index} className="help-category">
                <h3 className="category-title">{category.title}</h3>
                <ul className="help-list">
                  {category.items.map((item, itemIndex) => (
                    <li key={itemIndex}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="cta-section">
          <p className="cta-text">
            Remember: No contribution is too small. A single book recommendation, a social media share, or an hour of testing makes a difference. Together, we&apos;re building a world where everyone can enjoy the magic of reading.
          </p>

          <p className="cta-text" style={{ fontWeight: 600, fontStyle: 'normal' }}>
            Thank you for believing in our mission. Any help is welcome, and every contribution matters.
          </p>

          <div className="cta-buttons">
            <a
              href="https://donorbox.org/bookbridge-make-books-accessible-to-everyone-regardless-of-their-their-situation"
              target="_blank"
              rel="noopener noreferrer"
              className="cta-btn cta-btn-primary"
            >
              Make Your Donation
            </a>
            <a
              href="https://www.linkedin.com/in/francois-tshibala-556486233/"
              target="_blank"
              rel="noopener noreferrer"
              className="cta-btn cta-btn-secondary"
            >
              Contact Us
            </a>
            <a
              href="/about"
              className="cta-btn cta-btn-secondary"
            >
              Learn More
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
