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
        }
        
        .main-container {
          display: grid;
          grid-template-columns: 1fr 1fr;
          min-height: 100vh;
        }
        
        .left-section {
          background: #2a5298;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 60px 40px;
          color: white;
          text-align: center;
        }
        
        .profile-image {
          width: 160px;
          height: 160px;
          background: #fbbf24;
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 80px;
          font-weight: bold;
          color: white;
          margin-bottom: 30px;
          box-shadow: 0 8px 32px rgba(0,0,0,0.3);
        }
        
        .name {
          font-size: 2.2rem;
          font-weight: bold;
          margin-bottom: 8px;
        }
        
        .title {
          font-size: 1.1rem;
          opacity: 0.9;
          font-weight: normal;
        }
        
        .right-section {
          background: white;
          padding: 60px 50px;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        
        .content-heading {
          font-size: 2rem;
          color: #1a1a1a;
          margin-bottom: 30px;
          font-weight: bold;
        }
        
        .content-paragraph {
          font-size: 1rem;
          color: #4a4a4a;
          line-height: 1.6;
          margin-bottom: 20px;
        }
        
        .button-container {
          display: flex;
          gap: 15px;
          margin-top: 30px;
        }
        
        .btn {
          padding: 12px 24px;
          border-radius: 25px;
          text-decoration: none;
          font-weight: 600;
          font-size: 0.95rem;
          transition: all 0.3s ease;
          border: none;
          cursor: pointer;
          text-align: center;
        }
        
        .btn-primary {
          background: #3b82f6;
          color: white;
        }
        
        .btn-primary:hover {
          background: #2563eb;
        }
        
        .btn-secondary {
          background: transparent;
          color: #3b82f6;
          border: 2px solid #3b82f6;
        }
        
        .btn-secondary:hover {
          background: #3b82f6;
          color: white;
        }
        
        @media (max-width: 768px) {
          .main-container {
            grid-template-columns: 1fr;
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
          <div className="profile-image">
            <Image 
              src="/franck.jpg" 
              alt="Franck Tshibala" 
              width={160}
              height={160}
              className="w-full h-full object-cover rounded-2xl"
            />
          </div>
          <div className="name">Franck Tshibala</div>
          <div className="title">Founder of BookBridge</div>
        </div>
        
        <div className="right-section">
          <h1 className="content-heading">My Journey</h1>
          
          <p className="content-paragraph">
            I grew up in the Democratic Republic of Congo, where public libraries simply don't exist. As a child, I had no books to read and didn't even know how to approach reading one.
          </p>
          
          <p className="content-paragraph">
            It wasn't until I arrived in America in 2019 that I experienced my first public library - free books, free WiFi, open to everyone. That moment changed everything.
          </p>
          
          <p className="content-paragraph">
            Back in Congo, I witnessed something powerful: people who could read and had access to books consistently escaped poverty while others remained trapped.
          </p>
          
          <p className="content-paragraph">
            BookBridge is now a working MVP focused on ESL students, with AI-powered features that simplify complex books to any reading level (A1 to C2). In just two months, we've created what could become "Netflix for books" - but unlike Netflix, everyone gets access regardless of income, location, or education level.
          </p>
          
          <p className="content-paragraph">
            My vision for the next 2-3 years: partner with ESL schools globally, expand our book catalog with modern titles, and reach individuals in every country who want to improve their reading skills at prices they can afford.
          </p>
          
          <p className="content-paragraph">
            Whether you're an investor, educator, developer, or simply someone who believes in democratizing education, I welcome your support of any kind. Every connection, piece of feedback, or helping hand brings us closer to making quality education accessible to everyone, everywhere.
          </p>
          
          <div className="button-container">
            <a href="https://bookbridge-six.vercel.app/" target="_blank" rel="noopener noreferrer" className="btn btn-primary">
              Try BookBridge
            </a>
            <a href="mailto:franck1tshibala@gmail.com" className="btn btn-secondary">
              Contact Me
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}