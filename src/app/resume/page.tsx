'use client';

import Image from 'next/image';

export default function ResumePage() {
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
          margin: 0;
          padding: 20px;
        }

        .resume-container {
          max-width: 1200px;
          margin: 0 auto;
          background: var(--bg-secondary);
          box-shadow: 0 4px 20px var(--shadow-soft);
        }

        /* Hero Section */
        .hero-section {
          background: var(--accent-primary);
          padding: 60px;
          text-align: center;
          color: var(--bg-primary);
        }

        .hero-image {
          width: 180px;
          height: 180px;
          background: var(--accent-secondary);
          border-radius: 50%;
          margin: 0 auto 30px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 60px;
          font-weight: bold;
          color: white;
          box-shadow: 0 8px 24px rgba(44, 24, 16, 0.3);
          border: 4px solid var(--accent-secondary);
          overflow: hidden;
        }

        .hero-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center top;
        }

        .hero-name {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: 2.8rem;
          font-weight: bold;
          margin-bottom: 16px;
          text-shadow: 0 2px 8px rgba(0,0,0,0.2);
        }

        .hero-headline {
          font-family: 'Source Serif Pro', Georgia, serif;
          font-size: 1.3rem;
          opacity: 0.95;
          margin-bottom: 12px;
          font-weight: 600;
        }

        .hero-subtitle {
          font-family: 'Source Serif Pro', Georgia, serif;
          font-size: 1.1rem;
          opacity: 0.85;
          font-weight: 400;
        }

        /* Content Sections */
        .content-section {
          padding: 60px;
          border-bottom: 1px solid var(--border-light);
        }

        .content-section:last-child {
          border-bottom: none;
        }

        .section-heading {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: 2rem;
          color: var(--text-accent);
          margin-bottom: 30px;
          font-weight: bold;
        }

        .content-paragraph {
          font-family: 'Source Serif Pro', Georgia, serif;
          font-size: 1.1rem;
          color: var(--text-primary);
          line-height: 1.8;
          margin-bottom: 20px;
        }

        .content-paragraph:last-child {
          margin-bottom: 0;
        }

        /* Technical Expertise Section */
        .subsection-heading {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: 1.4rem;
          color: var(--text-accent);
          margin-top: 30px;
          margin-bottom: 20px;
          font-weight: bold;
        }

        .subsection-heading:first-of-type {
          margin-top: 0;
        }

        .skill-list {
          list-style: none;
          padding: 0;
          margin-bottom: 20px;
        }

        .skill-item {
          font-family: 'Source Serif Pro', Georgia, serif;
          font-size: 1.05rem;
          color: var(--text-primary);
          line-height: 1.8;
          margin-bottom: 12px;
          padding-left: 20px;
          position: relative;
        }

        .skill-item::before {
          content: '';
          position: absolute;
          left: 0;
          top: 12px;
          width: 8px;
          height: 8px;
          background: var(--accent-secondary);
          border-radius: 50%;
        }

        .skill-item strong {
          color: var(--text-accent);
        }

        .belief-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .belief-item {
          font-family: 'Source Serif Pro', Georgia, serif;
          font-size: 1.05rem;
          color: var(--text-primary);
          line-height: 1.8;
          margin-bottom: 8px;
          padding-left: 20px;
          position: relative;
        }

        .belief-item::before {
          content: '';
          position: absolute;
          left: 0;
          top: 12px;
          width: 8px;
          height: 8px;
          background: var(--accent-secondary);
          border-radius: 50%;
        }

        /* Featured Work Section */
        .project-title {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: 1.5rem;
          color: var(--text-accent);
          margin-bottom: 8px;
          font-weight: bold;
        }

        .project-meta {
          font-family: 'Source Serif Pro', Georgia, serif;
          font-size: 1rem;
          color: var(--accent-secondary);
          font-style: italic;
          margin-bottom: 20px;
        }

        .project-meta a {
          color: var(--accent-secondary);
          text-decoration: underline;
          font-weight: 600;
          transition: color 0.3s ease;
        }

        .project-meta a:hover {
          color: #B8722D;
        }

        .project-description {
          font-family: 'Source Serif Pro', Georgia, serif;
          font-size: 1.05rem;
          color: var(--text-primary);
          line-height: 1.8;
          margin-bottom: 16px;
        }

        .project-features {
          list-style: none;
          padding: 0;
          margin-bottom: 20px;
        }

        .project-feature {
          font-family: 'Source Serif Pro', Georgia, serif;
          font-size: 1.05rem;
          color: var(--text-primary);
          line-height: 1.8;
          margin-bottom: 8px;
          padding-left: 20px;
          position: relative;
        }

        .project-feature::before {
          content: '';
          position: absolute;
          left: 0;
          top: 12px;
          width: 8px;
          height: 8px;
          background: var(--accent-secondary);
          border-radius: 50%;
        }

        /* Connect Section */
        .connect-list {
          list-style: none;
          padding: 0;
          margin-bottom: 30px;
        }

        .connect-item {
          font-family: 'Source Serif Pro', Georgia, serif;
          font-size: 1.05rem;
          color: var(--text-primary);
          line-height: 1.8;
          margin-bottom: 8px;
          padding-left: 20px;
          position: relative;
        }

        .connect-item::before {
          content: '';
          position: absolute;
          left: 0;
          top: 12px;
          width: 8px;
          height: 8px;
          background: var(--accent-secondary);
          border-radius: 50%;
        }

        .contact-links {
          display: flex;
          gap: 20px;
          flex-wrap: wrap;
          margin-top: 30px;
        }

        .contact-link {
          padding: 14px 28px;
          border-radius: 8px;
          text-decoration: none;
          font-family: 'Source Serif Pro', Georgia, serif;
          font-weight: 600;
          font-size: 1rem;
          transition: all 0.3s ease;
          box-shadow: 0 2px 8px var(--shadow-soft);
        }

        .contact-link-primary {
          background: var(--accent-secondary);
          color: var(--bg-primary);
        }

        .contact-link-primary:hover {
          background: #B8722D;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(205, 127, 50, 0.3);
        }

        .contact-link-secondary {
          background: transparent;
          color: var(--accent-primary);
          border: 2px solid var(--accent-secondary);
        }

        .contact-link-secondary:hover {
          background: var(--accent-secondary);
          color: var(--bg-primary);
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(205, 127, 50, 0.2);
        }

        /* Responsive */
        @media (max-width: 768px) {
          body {
            padding: 10px;
          }

          .hero-section {
            padding: 40px 30px;
          }

          .hero-image {
            width: 150px;
            height: 150px;
          }

          .hero-name {
            font-size: 2.2rem;
          }

          .hero-headline {
            font-size: 1.1rem;
          }

          .hero-subtitle {
            font-size: 1rem;
          }

          .content-section {
            padding: 40px 30px;
          }

          .section-heading {
            font-size: 1.7rem;
          }

          .contact-links {
            flex-direction: column;
          }

          .contact-link {
            text-align: center;
          }
        }
      `}</style>

      <div className="resume-container">
        {/* Hero Section */}
        <section className="hero-section">
          <div className="hero-image">
            <Image
              src="/franck.jpg"
              alt="Francois Tshibala"
              width={180}
              height={180}
            />
          </div>
          <h1 className="hero-name">Francois Tshibala</h1>
          <p className="hero-headline">Full-Stack Software Engineer | Building Solutions That Matter</p>
          <p className="hero-subtitle">React, TypeScript, Node.js | Passionate About Education Technology</p>
        </section>

        {/* My Journey Section */}
        <section className="content-section">
          <h2 className="section-heading">My Journey</h2>
          <p className="content-paragraph">
            I grew up in the Democratic Republic of Congo, where public libraries simply don&apos;t exist. As a child, I had no books to read and didn&apos;t even know how to approach reading one. It wasn&apos;t until I arrived in America in 2019 that I experienced my first public library - free books, free WiFi, open to everyone. That moment changed everything.
          </p>
          <p className="content-paragraph">
            Back in Congo, I witnessed how access to books and education could change lives. That experience drives my passion for building technology that solves real problems and creates opportunities for people.
          </p>
          <p className="content-paragraph">
            As a software development student at BYU-Idaho, I&apos;ve applied everything I&apos;m learning to build BookBridge - an AI-powered reading platform that makes classic literature accessible to ESL learners worldwide. In two months, I built a working MVP serving 259 active users with real-time audio-text synchronization and AI text simplification.
          </p>
        </section>

        {/* Technical Expertise Section */}
        <section className="content-section">
          <h2 className="section-heading">Technical Expertise</h2>

          <h3 className="subsection-heading">What I Build</h3>
          <p className="content-paragraph">
            I specialize in full-stack web applications with complex features:
          </p>
          <ul className="skill-list">
            <li className="skill-item">
              <strong>Frontend:</strong> React, Next.js, TypeScript - Building responsive, accessible user interfaces
            </li>
            <li className="skill-item">
              <strong>Backend:</strong> Node.js, Express, PostgreSQL, MongoDB - Designing scalable APIs and database architectures
            </li>
            <li className="skill-item">
              <strong>AI Integration:</strong> Claude API, OpenAI, ElevenLabs - Implementing intelligent features and automation
            </li>
            <li className="skill-item">
              <strong>Architecture:</strong> Service layer patterns, state management, caching strategies - Writing maintainable, testable code
            </li>
          </ul>

          <h3 className="subsection-heading">My Approach</h3>
          <p className="content-paragraph">
            I focus on writing clean, type-safe code with comprehensive documentation. I believe in:
          </p>
          <ul className="belief-list">
            <li className="belief-item">Breaking down complex problems into manageable components</li>
            <li className="belief-item">Implementing industry-standard design patterns</li>
            <li className="belief-item">Writing tests and maintaining high code quality</li>
            <li className="belief-item">Creating solutions that scale and perform well</li>
          </ul>
        </section>

        {/* Featured Work Section */}
        <section className="content-section">
          <h2 className="section-heading">Featured Work</h2>

          <h3 className="project-title">BookBridge - AI-Powered Reading Platform</h3>
          <p className="project-meta">Live at <a href="https://bookbridge.app/" target="_blank" rel="noopener noreferrer">bookbridge.app</a> | 259 active users | 12,000+ tracked events</p>

          <p className="project-description">
            Built a production web application that demonstrates:
          </p>
          <ul className="project-features">
            <li className="project-feature">Real-time audio-text synchronization with word-level precision</li>
            <li className="project-feature">Multi-layer caching architecture (50%+ performance improvement)</li>
            <li className="project-feature">120+ serverless API routes handling authentication and payments</li>
            <li className="project-feature">Service layer pattern with 31 unit tests, 100% TypeScript coverage</li>
            <li className="project-feature">Integration with multiple AI APIs (Claude, OpenAI, ElevenLabs)</li>
          </ul>

          <p className="content-paragraph">
            Currently piloting with INX Academy (85+ students). In partnership discussions with LDS Church Literacy Services and BYU English Language Center.
          </p>
        </section>

        {/* Professional Background Section */}
        <section className="content-section">
          <h2 className="section-heading">Professional Background</h2>
          <p className="content-paragraph">
            Beyond coding, I bring 5 years of leadership experience from my role as Custodial Lead at LDS Church Headquarters, where I manage teams and coordinate facility operations. This background has taught me:
          </p>
          <ul className="belief-list">
            <li className="belief-item">How to lead and work effectively in teams</li>
            <li className="belief-item">Clear communication and documentation practices</li>
            <li className="belief-item">Managing complex schedules and priorities</li>
            <li className="belief-item">Taking ownership and delivering results</li>
          </ul>
          <p className="content-paragraph">
            I&apos;m currently completing my Bachelor&apos;s in Software Development at BYU-Idaho while building BookBridge and seeking full-time software engineering opportunities.
          </p>
        </section>

        {/* Let's Connect Section */}
        <section className="content-section">
          <h2 className="section-heading">Let&apos;s Connect</h2>
          <p className="content-paragraph">
            I&apos;m looking for software engineering roles where I can:
          </p>
          <ul className="connect-list">
            <li className="connect-item">Apply my full-stack development skills to meaningful projects</li>
            <li className="connect-item">Continue learning from experienced engineers</li>
            <li className="connect-item">Contribute to building products that make a difference</li>
            <li className="connect-item">Grow as a professional software engineer</li>
          </ul>
          <p className="content-paragraph">
            Whether you&apos;re hiring, have project opportunities, or just want to connect about technology and education, I&apos;d love to hear from you.
          </p>

          <div className="contact-links">
            <a href="mailto:francois.tshibala@example.com" className="contact-link contact-link-primary">
              Email Me
            </a>
            <a href="https://www.linkedin.com/in/francois-tshibala-556486233/" target="_blank" rel="noopener noreferrer" className="contact-link contact-link-secondary">
              LinkedIn
            </a>
            <a href="https://github.com/francoistshibala" target="_blank" rel="noopener noreferrer" className="contact-link contact-link-secondary">
              GitHub
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}
