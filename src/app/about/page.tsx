'use client';

import Image from 'next/image';

export default function AboutPage() {
  return (
    <div>
      <style jsx global>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          line-height: 1.6;
          background: #f8fafc;
          margin: 0;
          padding: 20px;
        }
        
        .main-container {
          display: grid;
          grid-template-columns: 1fr 1fr;
          min-height: 100vh;
          max-width: 1400px;
          margin: 0 auto;
          box-shadow: 0 0 40px rgba(0,0,0,0.1);
        }
        
        .left-section {
          background: #2a5298;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: flex-start;
          padding: 60px 60px 40px 60px;
          color: white;
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
          background: #fbbf24;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 80px;
          font-weight: bold;
          color: white;
          margin-bottom: 30px;
          box-shadow: 0 12px 40px rgba(0,0,0,0.4);
          border: 4px solid #3b82f6;
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
          box-shadow: 0 20px 60px rgba(0,0,0,0.5);
        }
        
        .name {
          font-size: 2.5rem;
          font-weight: bold;
          margin-bottom: 12px;
          text-shadow: 0 2px 8px rgba(0,0,0,0.2);
        }
        
        .title {
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
          border-radius: 30px;
          text-decoration: none;
          font-weight: 600;
          font-size: 1rem;
          transition: all 0.3s ease;
          border: none;
          cursor: pointer;
          text-align: center;
          box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        }
        
        .left-btn-primary {
          background: #3b82f6;
          color: white;
        }
        
        .left-btn-primary:hover {
          background: #2563eb;
          transform: translateY(-2px);
          box-shadow: 0 6px 25px rgba(59, 130, 246, 0.4);
        }
        
        .left-btn-secondary {
          background: transparent;
          color: white;
          border: 2px solid #3b82f6;
        }
        
        .left-btn-secondary:hover {
          background: #3b82f6;
          color: white;
          transform: translateY(-2px);
          box-shadow: 0 6px 25px rgba(59, 130, 246, 0.3);
        }
        
        .right-section {
          background: white;
          padding: 80px 60px;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        
        .content-heading {
          font-size: 2.5rem;
          color: #1a1a1a;
          margin-bottom: 40px;
          font-weight: bold;
        }
        
        .content-paragraph {
          font-size: 1.1rem;
          color: #4a4a4a;
          line-height: 1.7;
          margin-bottom: 24px;
        }
        
        .button-container {
          display: flex;
          gap: 20px;
          margin-top: 40px;
        }
        
        .btn {
          padding: 14px 32px;
          border-radius: 30px;
          text-decoration: none;
          font-weight: 600;
          font-size: 1rem;
          transition: all 0.3s ease;
          border: none;
          cursor: pointer;
          text-align: center;
          box-shadow: 0 4px 15px rgba(0,0,0,0.1);
        }
        
        .btn-primary {
          background: #3b82f6;
          color: white;
        }
        
        .btn-primary:hover {
          background: #2563eb;
          transform: translateY(-2px);
          box-shadow: 0 6px 25px rgba(59, 130, 246, 0.3);
        }
        
        .btn-secondary {
          background: transparent;
          color: #3b82f6;
          border: 2px solid #3b82f6;
        }
        
        .btn-secondary:hover {
          background: #3b82f6;
          color: white;
          transform: translateY(-2px);
          box-shadow: 0 6px 25px rgba(59, 130, 246, 0.2);
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
          
          .button-container {
            flex-direction: column;
          }
          
          .btn {
            width: 100%;
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
            <a href="https://bookbridge-six.vercel.app/" target="_blank" rel="noopener noreferrer" className="left-btn left-btn-primary">
              Explore BookBridge
            </a>
            <a href="mailto:franck1tshibala@gmail.com" className="left-btn left-btn-secondary">
              Contact Me
            </a>
          </div>
        </div>
        
        <div className="right-section">
          <h1 className="content-heading">My Journey</h1>
          
          <p className="content-paragraph">
            I grew up in the Democratic Republic of Congo, where public libraries simply don&apos;t exist. As a child, I had no books to read and didn&apos;t even know how to approach reading one.
          </p>
          
          <p className="content-paragraph">
            It wasn&apos;t until I arrived in America in 2019 that I experienced my first public library - free books, free WiFi, open to everyone. That moment changed everything.
          </p>
          
          <p className="content-paragraph">
            Back in Congo, I witnessed something powerful: people who could read and had access to books consistently escaped poverty while others remained trapped.
          </p>
          
          <p className="content-paragraph">
            BookBridge is now a working MVP focused on ESL students, with AI-powered features that simplify complex books to any reading level (A1 to C2). In just two months, we&apos;ve created what could become &ldquo;Netflix for books&rdquo; - but unlike Netflix, everyone gets access regardless of income, location, or education level.
          </p>
          
          <p className="content-paragraph">
            My vision for the next 2-3 years: partner with ESL schools globally, expand our book catalog with modern titles, and reach individuals in every country who want to improve their reading skills at prices they can afford.
          </p>
          
          <p className="content-paragraph">
            Whether you&apos;re an investor, educator, developer, or simply someone who believes in democratizing education, I welcome your support of any kind. Every connection, piece of feedback, or helping hand brings us closer to making quality education accessible to everyone, everywhere.
          </p>
          
        </div>
      </div>
    </div>
  );
}