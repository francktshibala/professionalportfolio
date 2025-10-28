'use client';

import Image from 'next/image';

export default function AboutPage() {
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

        .main-container {
          display: grid;
          grid-template-columns: 1fr 1fr;
          min-height: 100vh;
          max-width: 1400px;
          margin: 0 auto;
          box-shadow: 0 4px 20px var(--shadow-soft);
        }

        .left-section {
          background: var(--accent-primary);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: flex-start;
          padding: 60px 60px 40px 60px;
          color: var(--bg-primary);
          text-align: center;
          min-height: 100vh;
        }

        .profile-section {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-top: 80px;
          margin-bottom: 40px;
        }

        .profile-image {
          width: 200px;
          height: 200px;
          background: var(--accent-secondary);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 80px;
          font-weight: bold;
          color: white;
          margin-bottom: 30px;
          box-shadow: 0 8px 24px rgba(44, 24, 16, 0.3);
          border: 4px solid var(--accent-secondary);
          overflow: hidden;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          position: relative;
        }

        .profile-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center top;
        }

        .profile-image:hover {
          transform: translateY(-5px);
          box-shadow: 0 12px 32px rgba(44, 24, 16, 0.4);
        }

        .name {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: 2.5rem;
          font-weight: bold;
          margin-bottom: 12px;
          text-shadow: 0 2px 8px rgba(0,0,0,0.2);
        }

        .title {
          font-family: 'Source Serif Pro', Georgia, serif;
          font-size: 1.2rem;
          opacity: 0.95;
          font-weight: 300;
          letter-spacing: 0.5px;
          margin-bottom: 40px;
        }

        .left-buttons {
          display: flex;
          flex-direction: column;
          gap: 16px;
          width: 100%;
          max-width: 280px;
        }

        .left-btn {
          padding: 14px 28px;
          border-radius: 8px;
          text-decoration: none;
          font-family: 'Source Serif Pro', Georgia, serif;
          font-weight: 600;
          font-size: 1rem;
          transition: all 0.3s ease;
          border: none;
          cursor: pointer;
          text-align: center;
          box-shadow: 0 2px 8px var(--shadow-soft);
        }

        .left-btn-primary {
          background: var(--accent-secondary);
          color: var(--bg-primary);
        }

        .left-btn-primary:hover {
          background: #B8722D;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(205, 127, 50, 0.3);
        }

        .left-btn-secondary {
          background: transparent;
          color: var(--bg-primary);
          border: 2px solid var(--accent-secondary);
        }

        .left-btn-secondary:hover {
          background: var(--accent-secondary);
          color: var(--bg-primary);
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(205, 127, 50, 0.2);
        }

        .right-section {
          background: var(--bg-secondary);
          padding: 80px 60px;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .content-heading {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: 2.5rem;
          color: var(--text-accent);
          margin-bottom: 40px;
          font-weight: bold;
        }

        .content-paragraph {
          font-family: 'Source Serif Pro', Georgia, serif;
          font-size: 1.1rem;
          color: var(--text-primary);
          line-height: 1.7;
          margin-bottom: 24px;
        }

        @media (max-width: 768px) {
          body {
            padding: 10px;
          }

          .main-container {
            grid-template-columns: 1fr;
          }

          .left-section {
            padding: 60px 40px;
          }

          .right-section {
            padding: 60px 40px;
          }

          .profile-image {
            width: 180px;
            height: 180px;
          }

          .name {
            font-size: 2.2rem;
          }

          .content-heading {
            font-size: 2.2rem;
          }
        }
      `}</style>

      <div className="main-container">
        <div className="left-section">
          <div className="profile-section">
            <div className="profile-image">
              <Image
                src="/franck.jpg"
                alt="Franck Tshibala"
                width={200}
                height={200}
              />
            </div>
            <div className="name">Franck Tshibala</div>
            <div className="title">Founder of BookBridge</div>
          </div>

          <div className="left-buttons">
            <a href="https://bookbridge.app/" target="_blank" rel="noopener noreferrer" className="left-btn left-btn-primary">
              Explore BookBridge
            </a>
            <a href="https://www.linkedin.com/in/francois-tshibala-556486233/" target="_blank" rel="noopener noreferrer" className="left-btn left-btn-secondary">
              Connect on LinkedIn
            </a>
            <a href="https://donorbox.org/bookbridge-make-books-accessible-to-everyone-regardless-of-their-their-situation" target="_blank" rel="noopener noreferrer" className="left-btn left-btn-primary">
              Donate Now
            </a>
            <a href="/support-needs" className="left-btn left-btn-secondary">
              Ways to Help
            </a>
          </div>
        </div>

        <div className="right-section">
          <h1 className="content-heading">My Journey</h1>

          <p className="content-paragraph">
            I grew up in the Democratic Republic of Congo, where public libraries simply don&apos;t exist. As a child, I had no books to read and didn&apos;t even know how to approach reading one. It wasn&apos;t until I arrived in America in 2019 that I experienced my first public library - free books, free WiFi, open to everyone. That moment changed everything.
          </p>

          <p className="content-paragraph">
            Back in Congo, I witnessed something powerful: people who could read and had access to books consistently escaped poverty while others remained trapped. That&apos;s when I knew I had to build public libraries back home to give people the same opportunity.
          </p>

          <p className="content-paragraph">
            But physical libraries are expensive and reach limited people. When AI emerged, I realized I&apos;d found the key to scaling my mission globally. As a software development student, I&apos;ve spent the last two months applying everything I&apos;m learning to build BookBridge - a digital solution that can reach anyone, anywhere.
          </p>

          <p className="content-paragraph">
            BookBridge is now a working MVP focused on ESL students, with AI-powered features that simplify complex books to any reading level (A1 to C2). In just two months, we&apos;ve created what could become &ldquo;Netflix for books&rdquo; - but unlike Netflix, everyone gets access regardless of income, location, or education level.
          </p>

          <p className="content-paragraph">
            My vision for the next 2-3 years: partner with ESL schools globally, expand our book catalog with modern titles, and reach individuals in every country who want to improve their reading skills at prices they can afford.
          </p>

          <p className="content-paragraph">
            I&apos;m seeking investors who share this vision and can provide not just funding, but mentorship, connections, and expertise to help us democratize reading for the 1.5 billion people worldwide who need it most.
          </p>

          <p className="content-paragraph">
            Whether you&apos;re an investor, educator, developer, or simply someone who believes in democratizing education, I welcome your support of any kind. Every connection, piece of feedback, or helping hand brings us closer to making quality education accessible to everyone, everywhere.
          </p>

        </div>
      </div>
    </div>
  );
}
