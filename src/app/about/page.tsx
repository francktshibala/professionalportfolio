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
        }
        
        .option2 {
          display: grid;
          grid-template-columns: 1fr 1fr;
          min-height: 100vh;
        }
        
        .photo-section {
          background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 60px 40px;
          color: white;
          position: relative;
        }
        
        .photo-section::before {
          content: '';
          position: absolute;
          inset: 0;
          background: url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M20 20c0-8.837-7.163-16-16-16s-16 7.163-16 16 7.163 16 16 16 16-7.163 16-16zm16 0c0-8.837-7.163-16-16-16s-16 7.163-16 16 7.163 16 16 16 16-7.163 16-16z'/%3E%3C/g%3E%3C/svg%3E") repeat;
        }
        
        .featured-photo {
          width: 200px;
          height: 200px;
          border-radius: 20px;
          margin-bottom: 30px;
          box-shadow: 0 25px 50px rgba(0,0,0,0.3);
          position: relative;
          z-index: 2;
          overflow: hidden;
          border: 4px solid rgba(255,255,255,0.2);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        
        .featured-photo:hover {
          transform: translateY(-5px);
          box-shadow: 0 35px 70px rgba(0,0,0,0.4);
        }
        
        .photo-info {
          text-align: center;
          position: relative;
          z-index: 2;
        }
        
        .photo-info h2 {
          font-size: 2.5rem;
          margin-bottom: 10px;
        }
        
        .photo-info p {
          font-size: 1.3rem;
          opacity: 0.9;
          margin-bottom: 30px;
        }
        
        .content-section {
          padding: 60px 50px;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        
        .content-section h3 {
          font-size: 2rem;
          color: #1e293b;
          margin-bottom: 30px;
        }
        
        .content-section p {
          font-size: 1.1rem;
          color: #475569;
          margin-bottom: 20px;
          line-height: 1.7;
        }
        
        .action-buttons {
          display: flex;
          gap: 20px;
          margin-top: 35px;
        }
        
        .btn {
          padding: 14px 32px;
          border-radius: 50px;
          text-decoration: none;
          font-weight: 600;
          font-size: 1.1rem;
          transition: all 0.3s ease;
          border: none;
          cursor: pointer;
          text-align: center;
        }
        
        .btn-primary {
          background: linear-gradient(135deg, #3b82f6, #1d4ed8);
          color: white;
          box-shadow: 0 4px 15px rgba(59, 130, 246, 0.3);
        }
        
        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(59, 130, 246, 0.4);
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
          box-shadow: 0 8px 25px rgba(59, 130, 246, 0.3);
        }
        
        @media (max-width: 768px) {
          .option2 {
            grid-template-columns: 1fr;
          }
          
          .action-buttons {
            flex-direction: column;
            align-items: stretch;
          }
          
          .btn {
            width: 100%;
            margin-bottom: 10px;
          }
        }
      `}</style>

      <div className="option2">
        <div className="photo-section">
          <div className="featured-photo">
            <Image 
              src="/franck.jpg" 
              alt="François" 
              width={200}
              height={200}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="photo-info">
            <h2>Franck Tshibala</h2>
            <p>Founder of BookBridge</p>
          </div>
        </div>
        
        <div className="content-section">
          <h3>My Journey</h3>
          <p>I grew up in the Democratic Republic of Congo, where public libraries simply don&apos;t exist. As a child, I had no books to read and didn&apos;t even know how to approach reading one.</p>
          <p>It wasn&apos;t until I arrived in America in 2019 that I experienced my first public library - free books, free WiFi, open to everyone. That moment changed everything.</p>
          <p>Back in Congo, I witnessed something powerful: people who could read and had access to books consistently escaped poverty while others remained trapped.</p>
          <p>BookBridge is now a working MVP focused on ESL students, with AI-powered features that simplify complex books to any reading level (A1 to C2). In just two months, we&apos;ve created what could become &ldquo;Netflix for books&rdquo; - but unlike Netflix, everyone gets access regardless of income, location, or education level.</p>
          <p>My vision for the next 2-3 years: partner with ESL schools globally, expand our book catalog with modern titles, and reach individuals in every country who want to improve their reading skills at prices they can afford.</p>
          <p>Whether you&apos;re an investor, educator, developer, or simply someone who believes in democratizing education, I welcome your support of any kind. Every connection, piece of feedback, or helping hand brings us closer to making quality education accessible to everyone, everywhere.</p>
          
          <div className="action-buttons">
            <a href="https://bookbridge-six.vercel.app/" target="_blank" rel="noopener noreferrer" className="btn btn-primary">Try BookBridge</a>
            <a href="mailto:franck1tshibala@gmail.com" className="btn btn-secondary">Contact Me</a>
          </div>
        </div>
      </div>
    </div>
  );
}

