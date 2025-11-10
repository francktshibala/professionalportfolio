'use client';

export default function PitchDeckPage() {
  return (
    <div className="pitch-deck">
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
        }

        .pitch-deck {
          width: 100%;
          height: 100vh;
          overflow: hidden;
        }

        .slide-container {
          scroll-snap-type: y mandatory;
          overflow-y: scroll;
          height: 100vh;
          scroll-behavior: smooth;
        }

        .slide {
          scroll-snap-align: start;
          scroll-snap-stop: always;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 40px;
        }

        .slide h1 {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: 48px;
          color: var(--text-accent);
          margin-bottom: 20px;
        }

        .slide p {
          font-family: 'Source Serif Pro', Georgia, serif;
          font-size: 20px;
          color: var(--text-primary);
          max-width: 800px;
          text-align: center;
        }

        /* Slide 1: Title/Cover Styles */
        .slide-cover {
          background: linear-gradient(135deg, var(--accent-primary) 0%, #003366 100%);
          animation: fadeIn 1s ease-in;
        }

        .cover-content {
          text-align: center;
          color: var(--bg-primary);
        }

        .cover-title {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: 64px;
          font-weight: 700;
          margin-bottom: 30px;
          color: var(--bg-primary);
        }

        .cover-subtitle {
          font-family: 'Source Serif Pro', Georgia, serif;
          font-size: 24px;
          margin-bottom: 50px;
          max-width: 700px;
          line-height: 1.6;
        }

        .cover-name {
          font-family: 'Source Serif Pro', Georgia, serif;
          font-size: 20px;
          margin-top: 40px;
          margin-bottom: 5px;
        }

        .cover-role {
          font-family: 'Source Serif Pro', Georgia, serif;
          font-size: 18px;
          color: var(--accent-secondary);
          margin-bottom: 10px;
        }

        .cover-email {
          font-family: 'Source Serif Pro', Georgia, serif;
          font-size: 16px;
          margin-bottom: 40px;
        }

        .cover-email a {
          color: var(--bg-primary);
          text-decoration: underline;
        }

        .cover-buttons {
          display: flex;
          gap: 20px;
          justify-content: center;
          flex-wrap: wrap;
        }

        .btn-primary {
          background: var(--accent-secondary);
          color: var(--bg-primary);
          border: none;
          border-radius: 8px;
          padding: 14px 32px;
          font-size: 18px;
          font-family: 'Source Serif Pro', Georgia, serif;
          cursor: pointer;
          transition: all 0.3s ease;
          text-decoration: none;
          display: inline-block;
        }

        .btn-primary:hover {
          background: #B8722D;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(205, 127, 50, 0.3);
        }

        .btn-secondary {
          background: transparent;
          color: var(--bg-primary);
          border: 2px solid var(--accent-secondary);
          border-radius: 8px;
          padding: 14px 32px;
          font-size: 18px;
          font-family: 'Source Serif Pro', Georgia, serif;
          cursor: pointer;
          transition: all 0.3s ease;
          text-decoration: none;
          display: inline-block;
        }

        .btn-secondary:hover {
          background: var(--accent-secondary);
          transform: translateY(-2px);
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Slide 2: The Problem Styles */
        .slide-problem {
          background: var(--bg-secondary);
        }

        .problem-container {
          display: grid;
          grid-template-columns: 60% 40%;
          gap: 60px;
          max-width: 1200px;
          align-items: center;
        }

        .problem-content h2 {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: 48px;
          color: var(--text-accent);
          margin-bottom: 30px;
        }

        .problem-content ul {
          list-style: none;
          padding: 0;
        }

        .problem-content li {
          font-family: 'Source Serif Pro', Georgia, serif;
          font-size: 20px;
          color: var(--text-primary);
          margin-bottom: 20px;
          padding-left: 30px;
          position: relative;
          line-height: 1.6;
        }

        .problem-content li:before {
          content: "•";
          position: absolute;
          left: 0;
          color: var(--accent-secondary);
          font-size: 28px;
          font-weight: bold;
        }

        .problem-visual {
          display: flex;
          flex-direction: column;
          gap: 30px;
          align-items: center;
          justify-content: center;
        }

        .problem-icon {
          font-size: 64px;
          color: var(--accent-primary);
        }

        /* Slide 3: Founder's Story Styles */
        .slide-story {
          background-image: url('/franck.jpg');
          background-size: cover;
          background-position: center;
          position: relative;
        }

        .slide-story::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, rgba(0, 33, 71, 0.9) 0%, rgba(0, 33, 71, 0.8) 100%);
        }

        .story-content {
          position: relative;
          z-index: 1;
          text-align: center;
          max-width: 900px;
          color: var(--bg-primary);
        }

        .story-content h2 {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: 48px;
          color: var(--bg-primary);
          margin-bottom: 40px;
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
        }

        .story-content p {
          font-family: 'Source Serif Pro', Georgia, serif;
          font-size: 20px;
          line-height: 1.8;
          margin-bottom: 25px;
          text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
        }

        /* Slide 4: The Solution Styles */
        .slide-solution {
          background: var(--bg-primary);
        }

        .solution-container {
          text-align: center;
          max-width: 1200px;
        }

        .solution-container h2 {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: 54px;
          color: var(--text-accent);
          margin-bottom: 20px;
        }

        .solution-subtitle {
          font-family: 'Source Serif Pro', Georgia, serif;
          font-size: 22px;
          color: var(--text-secondary);
          margin-bottom: 50px;
          max-width: 800px;
          margin-left: auto;
          margin-right: auto;
        }

        .how-it-works {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: 32px;
          color: var(--text-accent);
          margin-bottom: 40px;
        }

        .solution-steps {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 40px;
          margin-bottom: 50px;
        }

        .solution-step {
          padding: 30px;
          background: var(--bg-secondary);
          border-radius: 12px;
          box-shadow: 0 4px 12px var(--shadow-soft);
        }

        .solution-step-icon {
          font-size: 48px;
          margin-bottom: 20px;
        }

        .solution-step h3 {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: 22px;
          color: var(--text-accent);
          margin-bottom: 15px;
        }

        .solution-step p {
          font-family: 'Source Serif Pro', Georgia, serif;
          font-size: 16px;
          color: var(--text-primary);
          line-height: 1.6;
        }

        .app-preview {
          margin-top: 40px;
          padding: 20px;
          background: var(--bg-secondary);
          border-radius: 12px;
          box-shadow: 0 4px 12px var(--shadow-soft);
        }

        .app-preview img {
          max-width: 100%;
          height: auto;
          border-radius: 8px;
        }

        /* Slide 5: Key Features Styles */
        .slide-features {
          background: var(--bg-secondary);
        }

        .features-container {
          max-width: 1200px;
        }

        .features-container h2 {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: 48px;
          color: var(--text-accent);
          margin-bottom: 50px;
          text-align: center;
        }

        .features-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 30px;
        }

        .feature-card {
          padding: 30px;
          background: var(--bg-primary);
          border: 2px solid var(--accent-secondary);
          border-radius: 12px;
          box-shadow: 0 4px 12px var(--shadow-soft);
          transition: transform 0.3s ease;
        }

        .feature-card:hover {
          transform: translateY(-5px);
        }

        .feature-icon {
          font-size: 36px;
          margin-bottom: 15px;
        }

        .feature-card h3 {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: 22px;
          color: var(--text-accent);
          margin-bottom: 10px;
        }

        .feature-card p {
          font-family: 'Source Serif Pro', Georgia, serif;
          font-size: 16px;
          color: var(--text-primary);
          line-height: 1.6;
        }

        /* Slide 6: Competitive Advantage Styles */
        .slide-competitive {
          background: var(--bg-primary);
        }

        .competitive-container {
          max-width: 1100px;
        }

        .competitive-container h2 {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: 48px;
          color: var(--text-accent);
          margin-bottom: 40px;
          text-align: center;
        }

        .comparison-table {
          width: 100%;
          border-collapse: collapse;
          margin-bottom: 30px;
          background: var(--bg-secondary);
          border-radius: 12px;
          overflow: hidden;
        }

        .comparison-table th {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: 20px;
          padding: 20px;
          background: var(--accent-primary);
          color: var(--bg-primary);
          text-align: left;
        }

        .comparison-table td {
          font-family: 'Source Serif Pro', Georgia, serif;
          font-size: 18px;
          padding: 18px 20px;
          border-bottom: 1px solid var(--border-light);
          color: var(--text-primary);
        }

        .comparison-table tr:last-child td {
          border-bottom: none;
        }

        .comparison-table .highlight {
          background: rgba(205, 127, 50, 0.1);
          font-weight: 600;
        }

        .competitive-callout {
          padding: 25px;
          background: var(--accent-secondary);
          color: var(--bg-primary);
          border-radius: 12px;
          text-align: center;
          font-family: 'Source Serif Pro', Georgia, serif;
          font-size: 20px;
          line-height: 1.6;
        }

        /* Slide 7: Early Traction Styles */
        .slide-traction {
          background: var(--bg-secondary);
        }

        .traction-container {
          max-width: 1100px;
        }

        .traction-container h2 {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: 48px;
          color: var(--text-accent);
          margin-bottom: 40px;
          text-align: center;
        }

        .traction-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 25px;
          margin-bottom: 30px;
        }

        .traction-card {
          padding: 25px;
          background: var(--bg-primary);
          border-left: 4px solid var(--accent-secondary);
          border-radius: 8px;
          box-shadow: 0 2px 8px var(--shadow-soft);
        }

        .traction-card h3 {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: 22px;
          color: var(--accent-primary);
          margin-bottom: 12px;
        }

        .traction-card p {
          font-family: 'Source Serif Pro', Georgia, serif;
          font-size: 16px;
          color: var(--text-primary);
          line-height: 1.6;
          margin-bottom: 8px;
        }

        .traction-stats {
          display: flex;
          justify-content: center;
          gap: 60px;
          margin-top: 30px;
          padding: 25px;
          background: var(--bg-primary);
          border-radius: 12px;
        }

        .stat {
          text-align: center;
        }

        .stat-number {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: 48px;
          color: var(--accent-secondary);
          font-weight: 700;
        }

        .stat-label {
          font-family: 'Source Serif Pro', Georgia, serif;
          font-size: 18px;
          color: var(--text-secondary);
        }

        /* Slide 8: Business Model Styles */
        .slide-business {
          background: var(--bg-secondary);
        }

        .business-container {
          max-width: 1100px;
        }

        .business-container h2 {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: 48px;
          color: var(--text-accent);
          margin-bottom: 50px;
          text-align: center;
        }

        .revenue-streams {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 30px;
          margin-bottom: 30px;
        }

        .revenue-card {
          padding: 30px;
          background: var(--bg-primary);
          border-radius: 12px;
          box-shadow: 0 4px 12px var(--shadow-soft);
          text-align: center;
        }

        .revenue-icon {
          font-size: 48px;
          margin-bottom: 20px;
        }

        .revenue-card h3 {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: 22px;
          color: var(--text-accent);
          margin-bottom: 15px;
        }

        .revenue-card .label {
          font-family: 'Source Serif Pro', Georgia, serif;
          font-size: 14px;
          color: var(--accent-secondary);
          font-weight: 600;
          margin-bottom: 15px;
        }

        .revenue-card p {
          font-family: 'Source Serif Pro', Georgia, serif;
          font-size: 16px;
          color: var(--text-primary);
          line-height: 1.6;
          margin-bottom: 10px;
        }

        .strategy-note {
          padding: 20px;
          background: var(--accent-secondary);
          color: var(--bg-primary);
          border-radius: 12px;
          text-align: center;
          font-family: 'Source Serif Pro', Georgia, serif;
          font-size: 18px;
        }

        @media (max-width: 768px) {
          .cover-title {
            font-size: 40px;
          }
          .cover-subtitle {
            font-size: 18px;
          }
          .btn-primary, .btn-secondary {
            font-size: 16px;
            padding: 12px 24px;
          }
          .problem-container {
            grid-template-columns: 1fr;
            gap: 30px;
          }
          .problem-content h2 {
            font-size: 36px;
          }
          .problem-content li {
            font-size: 18px;
          }
          .story-content h2 {
            font-size: 36px;
          }
          .story-content p {
            font-size: 18px;
          }
          .solution-container h2 {
            font-size: 40px;
          }
          .solution-subtitle {
            font-size: 18px;
          }
          .how-it-works {
            font-size: 26px;
          }
          .solution-steps {
            grid-template-columns: 1fr;
            gap: 20px;
          }
          .features-container h2 {
            font-size: 36px;
          }
          .features-grid {
            grid-template-columns: 1fr;
            gap: 20px;
          }
          .competitive-container h2 {
            font-size: 36px;
          }
          .comparison-table th, .comparison-table td {
            font-size: 14px;
            padding: 12px;
          }
          .traction-container h2 {
            font-size: 36px;
          }
          .traction-grid {
            grid-template-columns: 1fr;
            gap: 20px;
          }
          .traction-stats {
            flex-direction: column;
            gap: 20px;
          }
          .business-container h2 {
            font-size: 36px;
          }
          .revenue-streams {
            grid-template-columns: 1fr;
            gap: 20px;
          }
        }
      `}</style>

      <div className="slide-container">
        {/* Slide 1: Title/Cover */}
        <div className="slide slide-cover">
          <div className="cover-content">
            <h1 className="cover-title">BookBridge</h1>
            <p className="cover-subtitle">Democratizing Reading for 1.5 Billion ESL Learners</p>

            <p className="cover-name">Franck Tshibala</p>
            <p className="cover-role">Founder & CEO</p>
            <p className="cover-email">
              <a href="mailto:bookbridgegap@gmail.com">bookbridgegap@gmail.com</a>
            </p>

            <div className="cover-buttons">
              <a
                href="https://www.youtube.com/watch?v=671_mDB5tBk&list=PL7CrnyOZbVAbRhdqTkGJwekhkFkLuD7gu"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                Watch Demo
              </a>
              <a
                href="https://bookbridge.app"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
              >
                Try BookBridge
              </a>
            </div>
          </div>
        </div>

        {/* Slide 2: The Problem */}
        <div className="slide slide-problem">
          <div className="problem-container">
            <div className="problem-content">
              <h2>The Challenge</h2>
              <ul>
                <li>1.5 billion people worldwide are learning English</li>
                <li>Most can&apos;t afford tutors ($50-100/hour) or graded readers ($10-20/book)</li>
                <li>They want to read real books but the content is too difficult</li>
                <li>Current solutions are fragmented - dictionary apps, audio apps, and simplification tools are all separate</li>
              </ul>
            </div>
            <div className="problem-visual">
              <div className="problem-icon">📚</div>
              <div className="problem-icon">💰</div>
              <div className="problem-icon">🌍</div>
            </div>
          </div>
        </div>

        {/* Slide 3: Founder's Story */}
        <div className="slide slide-story">
          <div className="story-content">
            <h2>My Journey</h2>
            <p>
              I grew up in the Democratic Republic of Congo without access to books or libraries.
            </p>
            <p>
              When I discovered American libraries in 2019, it changed my life.
            </p>
            <p>
              Now as a Church employee and BYU-Idaho software development student, I&apos;m building the solution I needed.
            </p>
          </div>
        </div>

        {/* Slide 4: The Solution */}
        <div className="slide slide-solution">
          <div className="solution-container">
            <h2>BookBridge</h2>
            <p className="solution-subtitle">
              AI-powered reading platform that makes any book accessible at any level
            </p>

            <h3 className="how-it-works">How It Works</h3>

            <div className="solution-steps">
              <div className="solution-step">
                <div className="solution-step-icon">📖</div>
                <h3>1. Choose Your Book</h3>
                <p>Select from our growing library</p>
              </div>

              <div className="solution-step">
                <div className="solution-step-icon">✨</div>
                <h3>2. AI Adjusts to Your Level</h3>
                <p>Text simplifies from beginner to advanced</p>
              </div>

              <div className="solution-step">
                <div className="solution-step-icon">🎧</div>
                <h3>3. Read with Support</h3>
                <p>Audio narration + instant dictionary</p>
              </div>
            </div>

            <div className="app-preview">
              <p style={{ marginBottom: '15px', fontFamily: 'Source Serif Pro', color: 'var(--text-secondary)' }}>
                Try it now: <a href="https://bookbridge.app" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-primary)', textDecoration: 'underline' }}>bookbridge.app</a>
              </p>
            </div>
          </div>
        </div>

        {/* Slide 5: Key Features */}
        <div className="slide slide-features">
          <div className="features-container">
            <h2>What Makes BookBridge Complete</h2>
            <div className="features-grid">
              <div className="feature-card">
                <div className="feature-icon">📝</div>
                <h3>Text Simplification</h3>
                <p>6 CEFR levels (A1 Beginner to C2 Advanced)</p>
              </div>

              <div className="feature-card">
                <div className="feature-icon">🎧</div>
                <h3>Audio Narration</h3>
                <p>Learn proper pronunciation while reading</p>
              </div>

              <div className="feature-card">
                <div className="feature-icon">📖</div>
                <h3>Integrated Dictionary</h3>
                <p>Simple definitions with examples</p>
              </div>

              <div className="feature-card">
                <div className="feature-icon">📚</div>
                <h3>Growing Library</h3>
                <p>28+ classic books, expanding to modern titles</p>
              </div>

              <div className="feature-card">
                <div className="feature-icon">📊</div>
                <h3>Progress Tracking</h3>
                <p>Students see their improvement over time</p>
              </div>

              <div className="feature-card">
                <div className="feature-icon">✨</div>
                <h3>AI-Powered</h3>
                <p>Adaptive learning personalized to each reader</p>
              </div>
            </div>
          </div>
        </div>

        {/* Slide 6: Competitive Advantage */}
        <div className="slide slide-competitive">
          <div className="competitive-container">
            <h2>The Competitive Advantage</h2>

            <table className="comparison-table">
              <thead>
                <tr>
                  <th>Feature</th>
                  <th>Competitors</th>
                  <th className="highlight">BookBridge</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Simplified books</td>
                  <td>Some</td>
                  <td className="highlight">✓</td>
                </tr>
                <tr>
                  <td>Audio sync</td>
                  <td>Some</td>
                  <td className="highlight">✓</td>
                </tr>
                <tr>
                  <td>Instant dictionary</td>
                  <td>Rare</td>
                  <td className="highlight">✓</td>
                </tr>
                <tr>
                  <td>Full-length books</td>
                  <td>Some</td>
                  <td className="highlight">✓</td>
                </tr>
                <tr>
                  <td><strong>ALL-IN-ONE</strong></td>
                  <td>None</td>
                  <td className="highlight"><strong>✓</strong></td>
                </tr>
              </tbody>
            </table>

            <div className="competitive-callout">
              BookBridge is the only platform that integrates everything an ESL learner needs in one place.
            </div>
          </div>
        </div>

        {/* Slide 7: Early Traction */}
        <div className="slide slide-traction">
          <div className="traction-container">
            <h2>Institutional Interest</h2>

            <div className="traction-grid">
              <div className="traction-card">
                <h3>INX Academy (San Diego)</h3>
                <p>Currently piloting with students</p>
                <p><strong>Expanding school-wide December 2025</strong></p>
              </div>

              <div className="traction-card">
                <h3>BYU English Language Center</h3>
                <p>Exploring pilot for January 2026</p>
                <p><em>&quot;This is how reading technology should be used&quot;</em> - Teacher coordinator</p>
              </div>

              <div className="traction-card">
                <h3>LDS Church Literacy Services</h3>
                <p>Discussing global deployment</p>
                <p><strong>Across 150+ countries</strong></p>
              </div>

              <div className="traction-card">
                <h3>Salt Lake Community College</h3>
                <p>Meeting scheduled December</p>
                <p>January 2026 pilot planned</p>
              </div>
            </div>

            <div className="traction-stats">
              <div className="stat">
                <div className="stat-number">59</div>
                <div className="stat-label">Active Users</div>
              </div>
              <div className="stat">
                <div className="stat-number">43</div>
                <div className="stat-label">Cities</div>
              </div>
            </div>
          </div>
        </div>

        {/* Slide 8: Business Model */}
        <div className="slide slide-business">
          <div className="business-container">
            <h2>Revenue Streams</h2>

            <div className="revenue-streams">
              <div className="revenue-card">
                <div className="revenue-icon">🏢</div>
                <h3>B2B Institutional</h3>
                <div className="label">(Primary)</div>
                <p>Schools and churches pay $10-50/student/year</p>
                <p><strong>Example:</strong> 1,000 students × $30/year = $30K contract</p>
              </div>

              <div className="revenue-card">
                <div className="revenue-icon">👤</div>
                <h3>B2C Consumer</h3>
                <div className="label">(Secondary)</div>
                <p>Individual subscriptions</p>
                <p>$5-10/month</p>
              </div>

              <div className="revenue-card">
                <div className="revenue-icon">🤝</div>
                <h3>Partnerships</h3>
                <div className="label">(Future)</div>
                <p>White-label for EdTech platforms</p>
                <p>Revenue sharing agreements</p>
              </div>
            </div>

            <div className="strategy-note">
              Current Strategy: Free pilots → convert to paid contracts
            </div>
          </div>
        </div>

        {/* Temporary placeholder for remaining slides */}
        <div className="slide" style={{ background: 'var(--bg-primary)' }}>
          <div>
            <h1>Slides 9-12 coming next...</h1>
          </div>
        </div>
      </div>
    </div>
  );
}
