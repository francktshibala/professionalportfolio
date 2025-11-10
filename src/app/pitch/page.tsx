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
      `}</style>

      <div className="slide-container">
        {/* Test Slide 1 */}
        <div className="slide" style={{ background: 'var(--accent-primary)' }}>
          <div>
            <h1 style={{ color: 'var(--bg-primary)' }}>Test Slide 1</h1>
            <p style={{ color: 'var(--bg-primary)' }}>Scroll down to test scroll-snap functionality</p>
          </div>
        </div>

        {/* Test Slide 2 */}
        <div className="slide" style={{ background: 'var(--bg-primary)' }}>
          <div>
            <h1>Test Slide 2</h1>
            <p>Scroll-snap working - Each slide takes full viewport</p>
          </div>
        </div>

        {/* Test Slide 3 */}
        <div className="slide" style={{ background: 'var(--bg-secondary)' }}>
          <div>
            <h1>Test Slide 3</h1>
            <p>Foundation ready for actual pitch deck content</p>
          </div>
        </div>
      </div>
    </div>
  );
}
