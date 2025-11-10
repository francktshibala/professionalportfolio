'use client';

import { useState, useEffect, useRef } from 'react';

export default function PitchDeckPage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slideContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = slideContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollPosition = container.scrollTop;
      const slideHeight = window.innerHeight;
      const slide = Math.round(scrollPosition / slideHeight);
      setCurrentSlide(slide);
    };

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowDown':
        case 'PageDown':
          e.preventDefault();
          if (currentSlide < 11) scrollToSlide(currentSlide + 1);
          break;
        case 'ArrowUp':
        case 'PageUp':
          e.preventDefault();
          if (currentSlide > 0) scrollToSlide(currentSlide - 1);
          break;
        case 'Home':
          e.preventDefault();
          scrollToSlide(0);
          break;
        case 'End':
          e.preventDefault();
          scrollToSlide(11);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSlide]);

  const scrollToSlide = (slideIndex: number) => {
    const container = slideContainerRef.current;
    if (!container) return;

    const slideHeight = window.innerHeight;
    container.scrollTo({
      top: slideIndex * slideHeight,
      behavior: 'smooth'
    });
  };

  return (
    <div className="pitch-deck">
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Source+Serif+Pro:wght@400;600&display=swap');

        /* Force 16px base for consistent REM calculations */
        html {
          font-size: 16px !important;
        }

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
          animation: fadeInSlide 0.8s ease-in-out;
        }

        /* High specificity with fluid responsive sizing */
        .pitch-deck .slide h1 {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: clamp(2rem, 3rem + 1vw, 3.5rem) !important;
          color: var(--text-accent);
          margin-bottom: 30px;
          line-height: 1.3;
        }

        .pitch-deck .slide h2 {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: clamp(1.5rem, 2rem + 0.5vw, 2.25rem) !important;
          color: var(--text-accent);
          margin-bottom: 25px;
          line-height: 1.4;
        }

        .pitch-deck .slide p {
          font-family: 'Source Serif Pro', Georgia, serif;
          font-size: clamp(1rem, 1.25rem + 0.2vw, 1.4rem) !important;
          color: var(--text-primary);
          max-width: 900px;
          text-align: center;
          line-height: 1.7;
        }

        /* Slide 1: Title/Cover Styles */
        .slide-cover {
          background: linear-gradient(135deg, var(--accent-primary) 0%, #003366 100%);
          animation: fadeIn 1s ease-in;
        }

        .cover-content {
          text-align: center;
          color: #FFFFFF;
        }

        .pitch-deck .cover-title {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: clamp(3rem, 5rem + 2vw, 6rem) !important;
          font-weight: 700;
          margin-bottom: 30px;
          color: #FFFFFF !important;
        }

        .pitch-deck .cover-subtitle {
          font-family: 'Source Serif Pro', Georgia, serif;
          font-size: clamp(1.25rem, 1.75rem + 0.5vw, 2rem) !important;
          margin-bottom: 50px;
          max-width: 800px;
          line-height: 1.6;
          color: #FFFFFF !important;
        }

        .pitch-deck .cover-name {
          font-family: 'Source Serif Pro', Georgia, serif;
          font-size: clamp(1.25rem, 1.5rem + 0.3vw, 1.75rem) !important;
          margin-top: 40px;
          margin-bottom: 5px;
          color: #FFFFFF !important;
        }

        .pitch-deck .cover-role {
          font-family: 'Source Serif Pro', Georgia, serif;
          font-size: clamp(1.125rem, 1.375rem + 0.2vw, 1.5rem) !important;
          color: #FFFFFF !important;
          margin-bottom: 10px;
        }

        .cover-email {
          font-family: 'Source Serif Pro', Georgia, serif;
          font-size: 22px;
          margin-bottom: 40px;
          color: #FFFFFF;
        }

        .cover-email a {
          color: #FFFFFF;
          text-decoration: underline;
        }

        .cover-buttons {
          display: flex;
          gap: 20px;
          justify-content: center;
          flex-wrap: wrap;
        }

        /* Scroll indicator */
        .scroll-indicator {
          position: absolute;
          bottom: 30px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
          animation: bounce 2s infinite;
        }

        .scroll-text {
          font-family: 'Source Serif Pro', Georgia, serif;
          font-size: 14px;
          color: var(--bg-primary);
          opacity: 0.8;
        }

        .scroll-arrow {
          font-size: 24px;
          color: var(--accent-secondary);
        }

        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% {
            transform: translateX(-50%) translateY(0);
          }
          40% {
            transform: translateX(-50%) translateY(-10px);
          }
          60% {
            transform: translateX(-50%) translateY(-5px);
          }
        }

        @keyframes fadeInSlide {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Navigation Dots */
        .nav-dots {
          position: fixed;
          right: 40px;
          top: 50%;
          transform: translateY(-50%);
          display: flex;
          flex-direction: column;
          gap: 15px;
          z-index: 1000;
        }

        .nav-dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: rgba(0, 33, 71, 0.4);
          border: 2px solid rgba(0, 33, 71, 0.6);
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.3);
        }

        .nav-dot:hover {
          background: rgba(0, 33, 71, 0.7);
          transform: scale(1.2);
          box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.5);
        }

        .nav-dot.active {
          background: var(--accent-secondary);
          border-color: var(--accent-secondary);
          transform: scale(1.3);
          box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.8);
        }

        .pitch-deck .btn-primary {
          background: var(--accent-secondary);
          color: var(--bg-primary);
          border: none;
          border-radius: 8px;
          padding: 16px 36px;
          font-size: clamp(1.125rem, 1.375rem + 0.2vw, 1.5rem) !important;
          font-family: 'Source Serif Pro', Georgia, serif;
          cursor: pointer;
          transition: all 0.3s ease;
          text-decoration: none;
          display: inline-block;
          font-weight: 600;
        }

        .pitch-deck .btn-primary:hover {
          background: #B8722D;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(205, 127, 50, 0.3);
        }

        .pitch-deck .btn-secondary {
          background: transparent;
          color: var(--bg-primary);
          border: 2px solid var(--accent-secondary);
          border-radius: 8px;
          padding: 16px 36px;
          font-size: clamp(1.125rem, 1.375rem + 0.2vw, 1.5rem) !important;
          font-family: 'Source Serif Pro', Georgia, serif;
          cursor: pointer;
          transition: all 0.3s ease;
          text-decoration: none;
          display: inline-block;
          font-weight: 600;
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
          font-size: 56px;
          color: var(--text-accent);
          margin-bottom: 30px;
        }

        .problem-content ul {
          list-style: none;
          padding: 0;
        }

        .problem-content li {
          font-family: 'Source Serif Pro', Georgia, serif;
          font-size: 1.125rem;
          color: var(--text-primary);
          margin-bottom: 20px;
          padding-left: 30px;
          position: relative;
          line-height: 1.7;
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
          background-position: center 20%;
          background-repeat: no-repeat;
          image-rendering: -webkit-optimize-contrast;
          image-rendering: crisp-edges;
          position: relative;
        }

        .slide-story::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, rgba(0, 33, 71, 0.65) 0%, rgba(0, 33, 71, 0.7) 100%);
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
          font-size: 64px;
          color: #FFFFFF;
          margin-bottom: 40px;
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
        }

        .story-content p {
          font-family: 'Source Serif Pro', Georgia, serif;
          font-size: 30px;
          line-height: 2.0;
          margin-bottom: 30px;
          color: #FFFFFF;
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
          font-size: 60px;
          color: var(--text-accent);
          margin-bottom: 20px;
        }

        .solution-subtitle {
          font-family: 'Source Serif Pro', Georgia, serif;
          font-size: 26px;
          color: var(--text-secondary);
          margin-bottom: 50px;
          max-width: 900px;
          margin-left: auto;
          margin-right: auto;
        }

        .how-it-works {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: 36px;
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
          font-size: 24px;
          color: var(--text-accent);
          margin-bottom: 15px;
        }

        .solution-step p {
          font-family: 'Source Serif Pro', Georgia, serif;
          font-size: 1.125rem;
          color: var(--text-primary);
          line-height: 1.7;
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
          font-size: 56px;
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
          font-size: 24px;
          color: var(--text-accent);
          margin-bottom: 10px;
        }

        .feature-card p {
          font-family: 'Source Serif Pro', Georgia, serif;
          font-size: 1.125rem;
          color: var(--text-primary);
          line-height: 1.7;
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
          font-size: 56px;
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
          font-size: 56px;
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

        .pitch-deck .stat-number {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: clamp(2rem, 2.5rem + 0.5vw, 3rem) !important;
          color: var(--accent-secondary);
          font-weight: 700;
          margin-bottom: 8px;
        }

        .pitch-deck .stat-label {
          font-family: 'Source Serif Pro', Georgia, serif;
          font-size: clamp(1rem, 1.25rem + 0.2vw, 1.4rem) !important;
          color: var(--text-secondary);
          line-height: 1.6;
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
          font-size: 56px;
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

        /* Slide 9: Market Opportunity Styles */
        .slide-market {
          background: var(--bg-secondary);
        }

        .market-container {
          max-width: 900px;
          text-align: center;
        }

        .market-container h2 {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: 56px;
          color: var(--text-accent);
          margin-bottom: 50px;
        }

        .market-cards {
          display: flex;
          flex-direction: column;
          gap: 25px;
          margin-bottom: 40px;
        }

        .market-card {
          padding: 30px 40px;
          background: var(--bg-primary);
          border-left: 5px solid var(--accent-secondary);
          border-radius: 8px;
          box-shadow: 0 4px 12px var(--shadow-soft);
          text-align: left;
        }

        .market-card-label {
          font-family: 'Source Serif Pro', Georgia, serif;
          font-size: 18px;
          color: var(--text-secondary);
          margin-bottom: 10px;
          font-weight: 600;
        }

        .market-card-value {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: 36px;
          color: var(--text-accent);
          font-weight: 700;
        }

        .market-size {
          padding: 30px;
          background: var(--accent-secondary);
          color: var(--bg-primary);
          border-radius: 12px;
          margin-top: 20px;
        }

        .market-size h3 {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: 40px;
          color: var(--bg-primary);
          margin-bottom: 10px;
        }

        .market-size p {
          font-family: 'Source Serif Pro', Georgia, serif;
          font-size: 20px;
          color: var(--bg-primary);
        }

        /* Slide 10: Go-to-Market Styles */
        .slide-gtm {
          background: var(--bg-primary);
        }

        .gtm-container {
          max-width: 1100px;
        }

        .gtm-container h2 {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: 56px;
          color: var(--text-accent);
          margin-bottom: 50px;
          text-align: center;
        }

        .timeline {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 30px;
        }

        .timeline-phase {
          padding: 30px;
          background: var(--bg-secondary);
          border-radius: 12px;
          box-shadow: 0 4px 12px var(--shadow-soft);
          border-top: 4px solid var(--accent-secondary);
        }

        .timeline-phase h3 {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: 24px;
          color: var(--accent-primary);
          margin-bottom: 10px;
        }

        .timeline-phase .phase-duration {
          font-family: 'Source Serif Pro', Georgia, serif;
          font-size: 14px;
          color: var(--accent-secondary);
          font-weight: 600;
          margin-bottom: 20px;
        }

        .timeline-phase ul {
          list-style: none;
          padding: 0;
          text-align: left;
        }

        .timeline-phase li {
          font-family: 'Source Serif Pro', Georgia, serif;
          font-size: 16px;
          color: var(--text-primary);
          margin-bottom: 12px;
          padding-left: 20px;
          position: relative;
        }

        .timeline-phase li:before {
          content: "→";
          position: absolute;
          left: 0;
          color: var(--accent-secondary);
        }

        /* Slide 11: The Ask Styles */
        .slide-ask {
          background: var(--bg-secondary);
        }

        .ask-container {
          max-width: 1100px;
        }

        .ask-container h2 {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: 56px;
          color: var(--text-accent);
          margin-bottom: 50px;
          text-align: center;
        }

        .ask-content {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 40px;
        }

        .funding-section, .milestones-section {
          padding: 30px;
          background: var(--bg-primary);
          border-radius: 12px;
          box-shadow: 0 4px 12px var(--shadow-soft);
        }

        .funding-section h3, .milestones-section h3 {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: 28px;
          color: var(--accent-primary);
          margin-bottom: 25px;
        }

        .funding-amount {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: 36px;
          color: var(--accent-secondary);
          font-weight: 700;
          margin-bottom: 30px;
        }

        .use-of-funds {
          list-style: none;
          padding: 0;
        }

        .use-of-funds li {
          font-family: 'Source Serif Pro', Georgia, serif;
          font-size: 16px;
          color: var(--text-primary);
          margin-bottom: 15px;
          padding-left: 25px;
          position: relative;
        }

        .use-of-funds li:before {
          content: "•";
          position: absolute;
          left: 0;
          color: var(--accent-secondary);
          font-size: 20px;
        }

        .milestones-list {
          list-style: none;
          padding: 0;
        }

        .milestones-list li {
          font-family: 'Source Serif Pro', Georgia, serif;
          font-size: 18px;
          color: var(--text-primary);
          margin-bottom: 15px;
          padding-left: 25px;
          position: relative;
        }

        .milestones-list li:before {
          content: "✓";
          position: absolute;
          left: 0;
          color: var(--accent-secondary);
          font-weight: bold;
        }

        /* Slide 12: Why Now + Closing Styles */
        .slide-closing {
          background: linear-gradient(135deg, var(--accent-primary) 0%, #003366 100%);
        }

        .closing-container {
          text-align: center;
          max-width: 900px;
          color: var(--bg-primary);
        }

        .closing-container h2 {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: 56px;
          color: #FFFFFF;
          margin-bottom: 40px;
        }

        .why-now-list {
          list-style: none;
          padding: 0;
          margin-bottom: 50px;
          text-align: left;
        }

        .why-now-list li {
          font-family: 'Source Serif Pro', Georgia, serif;
          font-size: 24px;
          color: #FFFFFF;
          margin-bottom: 20px;
          padding-left: 35px;
          position: relative;
        }

        .why-now-list li:before {
          content: "✓";
          position: absolute;
          left: 0;
          color: var(--accent-secondary);
          font-weight: bold;
          font-size: 24px;
        }

        .vision-statement {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: 30px;
          line-height: 1.7;
          margin: 50px 0;
          padding: 30px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          font-style: italic;
          color: #FFFFFF;
        }

        .closing-cta {
          margin-top: 40px;
        }

        .closing-cta h3 {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: 36px;
          margin-bottom: 20px;
          color: #FFFFFF;
        }

        .closing-contact {
          font-family: 'Source Serif Pro', Georgia, serif;
          font-size: 22px;
          margin-bottom: 30px;
          color: #FFFFFF;
        }

        .closing-contact a {
          color: var(--accent-secondary);
          text-decoration: underline;
        }

        @media (max-width: 768px) {
          .slide h1 {
            font-size: 2rem;
          }
          .slide h2 {
            font-size: 1.5rem;
          }
          .slide p {
            font-size: 1rem;
          }
          .cover-title {
            font-size: 2.5rem;
          }
          .cover-subtitle {
            font-size: 1.25rem;
          }
          .cover-name {
            font-size: 1.125rem;
          }
          .cover-role {
            font-size: 1rem;
          }
          .btn-primary, .btn-secondary {
            font-size: 1.125rem;
            padding: 14px 28px;
          }
          .stat-number {
            font-size: 1.75rem;
          }
          .stat-label {
            font-size: 1rem;
          }
          .problem-container {
            grid-template-columns: 1fr;
            gap: 30px;
          }
          .problem-content h2 {
            font-size: 42px;
          }
          .problem-content li {
            font-size: 22px;
          }
          .story-content h2 {
            font-size: 52px;
          }
          .story-content p {
            font-size: 26px;
          }
          .solution-container h2 {
            font-size: 48px;
          }
          .solution-subtitle {
            font-size: 22px;
          }
          .how-it-works {
            font-size: 30px;
          }
          .solution-steps {
            grid-template-columns: 1fr;
            gap: 20px;
          }
          .features-container h2 {
            font-size: 42px;
          }
          .features-grid {
            grid-template-columns: 1fr;
            gap: 20px;
          }
          .competitive-container h2 {
            font-size: 42px;
          }
          .comparison-table th, .comparison-table td {
            font-size: 16px;
            padding: 12px;
          }
          .traction-container h2 {
            font-size: 42px;
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
            font-size: 42px;
          }
          .revenue-streams {
            grid-template-columns: 1fr;
            gap: 20px;
          }
          .market-container h2 {
            font-size: 52px;
          }
          .market-card-value {
            font-size: 32px;
          }
          .market-size h3 {
            font-size: 38px;
          }
          .gtm-container h2 {
            font-size: 42px;
          }
          .timeline {
            grid-template-columns: 1fr;
            gap: 20px;
          }
          .ask-container h2 {
            font-size: 42px;
          }
          .ask-content {
            grid-template-columns: 1fr;
            gap: 30px;
          }
          .closing-container h2 {
            font-size: 42px;
          }
          .vision-statement {
            font-size: 24px;
          }
          .why-now-list li {
            font-size: 22px;
          }
          .nav-dots {
            right: 20px;
            gap: 12px;
          }
          .nav-dot {
            width: 10px;
            height: 10px;
          }
        }
      `}</style>

      <div className="slide-container" ref={slideContainerRef}>
        {/* Slide 1: Title/Cover */}
        <div className="slide slide-cover" style={{ position: 'relative' }}>
          <div className="cover-content">
            <h1 className="cover-title" style={{ fontSize: '96px', lineHeight: 1.1 }}>BookBridge</h1>
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

          {/* Scroll indicator */}
          <div className="scroll-indicator">
            <div className="scroll-text">Scroll down to see full pitch deck</div>
            <div className="scroll-arrow">↓</div>
          </div>
        </div>

        {/* Slide 2: The Problem */}
        <div className="slide slide-problem">
          <div className="problem-container">
            <div className="problem-content">
              <h2 style={{ fontSize: '56px', fontWeight: 'bold' }}>The Challenge</h2>
              <ul style={{ fontSize: '40px', lineHeight: '1.8', fontWeight: '700' }}>
                <li style={{ marginBottom: '35px' }}>1.5 billion people worldwide are learning English</li>
                <li style={{ marginBottom: '35px' }}>Most can&apos;t afford tutors ($50-100/hour) or graded readers ($10-20/book)</li>
                <li style={{ marginBottom: '35px' }}>They want to read real books but the content is too difficult</li>
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
            <h2 style={{ fontSize: '40px', color: '#FFFFFF' }}>My Journey</h2>
            <p style={{ color: '#FFFFFF' }}>
              I grew up in the Democratic Republic of Congo without access to books or libraries.
            </p>
            <p style={{ color: '#FFFFFF' }}>
              When I discovered American libraries in 2019, it changed my life.
            </p>
            <p style={{ color: '#FFFFFF' }}>
              Now as a Church employee and BYU-Idaho software development student, I&apos;m building the solution I needed.
            </p>
          </div>
        </div>

        {/* Slide 4: The Solution */}
        <div className="slide slide-solution">
          <div className="solution-container">
            <h2 style={{ fontSize: '40px' }}>BookBridge</h2>
            <p className="solution-subtitle" style={{ fontSize: '28px' }}>
              AI-powered reading platform that makes any book accessible at any level
            </p>

            <h3 className="how-it-works" style={{ fontSize: '36px' }}>How It Works</h3>

            <div className="solution-steps">
              <div className="solution-step">
                <div className="solution-step-icon">📖</div>
                <h3 style={{ fontSize: '26px' }}>1. Choose Your Book</h3>
                <p style={{ fontSize: '20px' }}>Select from our growing library</p>
              </div>

              <div className="solution-step">
                <div className="solution-step-icon">✨</div>
                <h3 style={{ fontSize: '26px' }}>2. AI Adjusts to Your Level</h3>
                <p style={{ fontSize: '20px' }}>Text simplifies from beginner to advanced</p>
              </div>

              <div className="solution-step">
                <div className="solution-step-icon">🎧</div>
                <h3 style={{ fontSize: '26px' }}>3. Read with Support</h3>
                <p style={{ fontSize: '20px' }}>Audio narration + instant dictionary</p>
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
            <h2 style={{ fontSize: '40px' }}>What Makes BookBridge Complete</h2>
            <div className="features-grid">
              <div className="feature-card">
                <div className="feature-icon">📝</div>
                <h3 style={{ fontSize: '26px' }}>Text Simplification</h3>
                <p style={{ fontSize: '20px' }}>6 CEFR levels (A1 Beginner to C2 Advanced)</p>
              </div>

              <div className="feature-card">
                <div className="feature-icon">🎧</div>
                <h3 style={{ fontSize: '26px' }}>Audio Narration</h3>
                <p style={{ fontSize: '20px' }}>Learn proper pronunciation while reading</p>
              </div>

              <div className="feature-card">
                <div className="feature-icon">📖</div>
                <h3 style={{ fontSize: '26px' }}>Integrated Dictionary</h3>
                <p style={{ fontSize: '20px' }}>Simple definitions with examples</p>
              </div>

              <div className="feature-card">
                <div className="feature-icon">📚</div>
                <h3 style={{ fontSize: '26px' }}>Growing Library</h3>
                <p style={{ fontSize: '20px' }}>28+ classic books, expanding to modern titles</p>
              </div>

              <div className="feature-card">
                <div className="feature-icon">📊</div>
                <h3 style={{ fontSize: '26px' }}>Progress Tracking</h3>
                <p style={{ fontSize: '20px' }}>Students see their improvement over time</p>
              </div>

              <div className="feature-card">
                <div className="feature-icon">✨</div>
                <h3 style={{ fontSize: '26px' }}>AI-Powered</h3>
                <p style={{ fontSize: '20px' }}>Adaptive learning personalized to each reader</p>
              </div>
            </div>
          </div>
        </div>

        {/* Slide 6: Competitive Advantage */}
        <div className="slide slide-competitive">
          <div className="competitive-container">
            <h2 style={{ fontSize: '40px' }}>The Competitive Advantage</h2>

            <table className="comparison-table" style={{ fontSize: '20px' }}>
              <thead>
                <tr>
                  <th style={{ fontSize: '24px' }}>Feature</th>
                  <th style={{ fontSize: '24px' }}>Competitors</th>
                  <th className="highlight" style={{ fontSize: '24px' }}>BookBridge</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ fontSize: '20px' }}>Simplified books</td>
                  <td style={{ fontSize: '20px' }}>Some</td>
                  <td className="highlight" style={{ fontSize: '20px' }}>✓</td>
                </tr>
                <tr>
                  <td style={{ fontSize: '20px' }}>Audio sync</td>
                  <td style={{ fontSize: '20px' }}>Some</td>
                  <td className="highlight" style={{ fontSize: '20px' }}>✓</td>
                </tr>
                <tr>
                  <td style={{ fontSize: '20px' }}>Instant dictionary</td>
                  <td style={{ fontSize: '20px' }}>Rare</td>
                  <td className="highlight" style={{ fontSize: '20px' }}>✓</td>
                </tr>
                <tr>
                  <td style={{ fontSize: '20px' }}>Full-length books</td>
                  <td style={{ fontSize: '20px' }}>Some</td>
                  <td className="highlight" style={{ fontSize: '20px' }}>✓</td>
                </tr>
                <tr>
                  <td style={{ fontSize: '20px' }}><strong>ALL-IN-ONE</strong></td>
                  <td style={{ fontSize: '20px' }}>None</td>
                  <td className="highlight" style={{ fontSize: '20px' }}><strong>✓</strong></td>
                </tr>
              </tbody>
            </table>

            <div className="competitive-callout" style={{ fontSize: '22px' }}>
              BookBridge is the only platform that integrates everything an ESL learner needs in one place.
            </div>
          </div>
        </div>

        {/* Slide 7: Early Traction */}
        <div className="slide slide-traction">
          <div className="traction-container">
            <h2 style={{ fontSize: '40px' }}>Institutional Interest</h2>

            <div className="traction-grid">
              <div className="traction-card">
                <h3 style={{ fontSize: '24px' }}>INX Academy (San Diego)</h3>
                <p style={{ fontSize: '18px' }}>Currently piloting with students</p>
                <p style={{ fontSize: '18px' }}><strong>Expanding school-wide December 2025</strong></p>
              </div>

              <div className="traction-card">
                <h3 style={{ fontSize: '24px' }}>BYU English Language Center</h3>
                <p style={{ fontSize: '18px' }}>Exploring pilot for January 2026</p>
                <p style={{ fontSize: '18px' }}><em>&quot;This is how reading technology should be used&quot;</em> - Teacher coordinator</p>
              </div>

              <div className="traction-card">
                <h3 style={{ fontSize: '24px' }}>LDS Church Literacy Services</h3>
                <p style={{ fontSize: '18px' }}>Discussing global deployment</p>
                <p style={{ fontSize: '18px' }}><strong>Across 150+ countries</strong></p>
              </div>

              <div className="traction-card">
                <h3 style={{ fontSize: '24px' }}>Salt Lake Community College</h3>
                <p style={{ fontSize: '18px' }}>Meeting scheduled December</p>
                <p style={{ fontSize: '18px' }}>January 2026 pilot planned</p>
              </div>
            </div>

            <div className="traction-stats">
              <div className="stat">
                <div className="stat-number" style={{ fontSize: '48px', fontWeight: 700 }}>59</div>
                <div className="stat-label">Active Users</div>
              </div>
              <div className="stat">
                <div className="stat-number" style={{ fontSize: '48px', fontWeight: 700 }}>43</div>
                <div className="stat-label">Cities</div>
              </div>
            </div>
          </div>
        </div>

        {/* Slide 8: Business Model */}
        <div className="slide slide-business">
          <div className="business-container">
            <h2 style={{ fontSize: '40px' }}>Revenue Streams</h2>

            <div className="revenue-streams">
              <div className="revenue-card">
                <div className="revenue-icon">🏢</div>
                <h3 style={{ fontSize: '24px' }}>B2B Institutional</h3>
                <div className="label">(Primary)</div>
                <p style={{ fontSize: '18px' }}>Schools and churches pay $10-50/student/year</p>
                <p style={{ fontSize: '18px' }}><strong>Example:</strong> 1,000 students × $30/year = $30K contract</p>
              </div>

              <div className="revenue-card">
                <div className="revenue-icon">👤</div>
                <h3 style={{ fontSize: '24px' }}>B2C Consumer</h3>
                <div className="label">(Secondary)</div>
                <p style={{ fontSize: '18px' }}>Individual subscriptions</p>
                <p style={{ fontSize: '18px' }}>$5-10/month</p>
              </div>

              <div className="revenue-card">
                <div className="revenue-icon">🤝</div>
                <h3 style={{ fontSize: '24px' }}>Partnerships</h3>
                <div className="label">(Future)</div>
                <p style={{ fontSize: '18px' }}>White-label for EdTech platforms</p>
                <p style={{ fontSize: '18px' }}>Revenue sharing agreements</p>
              </div>
            </div>

            <div className="strategy-note" style={{ fontSize: '20px' }}>
              Current Strategy: Free pilots → convert to paid contracts
            </div>
          </div>
        </div>

        {/* Slide 9: Market Opportunity */}
        <div className="slide slide-market">
          <div className="market-container">
            <h2 style={{ fontSize: '40px' }}>The Opportunity</h2>

            <div className="market-cards">
              <div className="market-card">
                <div className="market-card-label" style={{ fontSize: '20px' }}>Total Addressable Market</div>
                <div className="market-card-value" style={{ fontSize: '38px' }}>1.5 Billion ESL Learners Globally</div>
              </div>

              <div className="market-card">
                <div className="market-card-label" style={{ fontSize: '20px' }}>Serviceable Addressable Market</div>
                <div className="market-card-value" style={{ fontSize: '38px' }}>500M Institutional Learners</div>
              </div>

              <div className="market-card">
                <div className="market-card-label" style={{ fontSize: '20px' }}>Target Year 1</div>
                <div className="market-card-value" style={{ fontSize: '38px' }}>10K-50K Users</div>
              </div>
            </div>

            <div className="market-size">
              <h3 style={{ fontSize: '42px' }}>Market Size: $75B+</h3>
              <p style={{ fontSize: '22px' }}>Based on average $50/year spent on reading resources</p>
            </div>
          </div>
        </div>

        {/* Slide 10: Go-to-Market Strategy */}
        <div className="slide slide-gtm">
          <div className="gtm-container">
            <h2 style={{ fontSize: '56px', fontWeight: 'bold' }}>Scaling Strategy</h2>

            <div className="timeline">
              <div className="timeline-phase">
                <h3 style={{ fontSize: '42px', fontWeight: 'bold' }}>Phase 1</h3>
                <div className="phase-duration" style={{ fontSize: '20px', fontWeight: '700' }}>Now - 6 months</div>
                <ul style={{ fontSize: '36px', lineHeight: '1.8', fontWeight: '700' }}>
                  <li style={{ marginBottom: '25px' }}>Partner with ESL programs</li>
                  <li style={{ marginBottom: '25px' }}>Prove effectiveness with real data</li>
                  <li>Target: 10-20 paid contracts</li>
                </ul>
              </div>

              <div className="timeline-phase">
                <h3 style={{ fontSize: '42px', fontWeight: 'bold' }}>Phase 2</h3>
                <div className="phase-duration" style={{ fontSize: '20px', fontWeight: '700' }}>6-12 months</div>
                <ul style={{ fontSize: '36px', lineHeight: '1.8', fontWeight: '700' }}>
                  <li style={{ marginBottom: '25px' }}>Hire teacher-marketers (commission-based)</li>
                  <li style={{ marginBottom: '25px' }}>Scale to 50-100 schools across US</li>
                  <li>International: Philippines, Mexico, Latin America</li>
                </ul>
              </div>

              <div className="timeline-phase">
                <h3 style={{ fontSize: '42px', fontWeight: 'bold' }}>Phase 3</h3>
                <div className="phase-duration" style={{ fontSize: '20px', fontWeight: '700' }}>Year 2+</div>
                <ul style={{ fontSize: '36px', lineHeight: '1.8', fontWeight: '700' }}>
                  <li style={{ marginBottom: '25px' }}>Launch individual subscriptions</li>
                  <li style={{ marginBottom: '25px' }}>Government partnerships</li>
                  <li>Major EdTech platform integrations</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Slide 11: The Ask */}
        <div className="slide slide-ask">
          <div className="ask-container">
            <h2 style={{ fontSize: '56px', fontWeight: 'bold' }}>Investment Opportunity</h2>

            <div className="ask-content">
              <div className="funding-section">
                <h3 style={{ fontSize: '44px', fontWeight: 'bold' }}>Seeking:</h3>
                <div className="funding-amount" style={{ fontSize: '64px', fontWeight: 'bold' }}>$50K-$100K Pre-Seed Funding</div>

                <h4 style={{ fontFamily: 'Playfair Display', fontSize: '32px', color: 'var(--text-accent)', marginBottom: '20px', fontWeight: 'bold' }}>Use of Funds:</h4>
                <ul className="use-of-funds" style={{ fontSize: '32px', lineHeight: '1.8', fontWeight: '700' }}>
                  <li style={{ marginBottom: '25px' }}><strong>40%</strong> Developer hire (scale infrastructure, add features)</li>
                  <li style={{ marginBottom: '25px' }}><strong>30%</strong> Book catalog expansion (modern books, partnerships)</li>
                  <li style={{ marginBottom: '25px' }}><strong>20%</strong> Marketing (teacher-marketers, materials)</li>
                  <li><strong>10%</strong> Operations (hosting, legal, admin)</li>
                </ul>
              </div>

              <div className="milestones-section">
                <h3 style={{ fontSize: '44px', fontWeight: 'bold' }}>12-Month Milestones:</h3>
                <ul className="milestones-list" style={{ fontSize: '32px', lineHeight: '1.8', fontWeight: '700' }}>
                  <li style={{ marginBottom: '25px' }}>50K+ active users</li>
                  <li style={{ marginBottom: '25px' }}>20+ paid institutional contracts</li>
                  <li style={{ marginBottom: '25px' }}>$200K+ annual revenue</li>
                  <li>Proof of concept for Series A</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Slide 12: Why Now + Closing */}
        <div className="slide slide-closing">
          <div className="closing-container">
            <h2 style={{ fontSize: '40px', color: '#FFFFFF' }}>Why Now?</h2>

            <ul className="why-now-list">
              <li>AI technology makes personalized learning accessible at scale</li>
              <li>Post-pandemic: schools embracing EdTech solutions</li>
              <li>Global migration: ESL demand growing</li>
              <li>We have institutional validation ready to scale</li>
            </ul>

            <div className="vision-statement">
              &quot;Every ESL learner worldwide should have access to books they can understand - regardless of income, location, or background.&quot;
            </div>

            <div className="closing-cta">
              <h3>Let&apos;s Make This Happen</h3>

              <div className="closing-contact">
                <div>Franck Tshibala</div>
                <a href="mailto:bookbridgegap@gmail.com">bookbridgegap@gmail.com</a>
              </div>

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
        </div>
      </div>

      {/* Navigation Dots */}
      <div className="nav-dots">
        {[...Array(12)].map((_, index) => (
          <div
            key={index}
            className={`nav-dot ${currentSlide === index ? 'active' : ''}`}
            onClick={() => scrollToSlide(index)}
            title={`Slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Final hard overrides to ensure production wins on Vercel */}
      <style jsx global>{`
        /* Critical slides + elements */
        .pitch-deck .cover-title { font-size: 96px !important; line-height: 1.1 !important; }

        /* Slide 2: The Challenge */
        .pitch-deck .problem-content h2 { font-size: 56px !important; font-weight: 700 !important; }
        .pitch-deck .problem-content ul { font-size: 40px !important; line-height: 1.8 !important; font-weight: 700 !important; }
        .pitch-deck .problem-content li { margin-bottom: 25px !important; }

        /* Stats */
        .pitch-deck .stat-number { font-size: 48px !important; font-weight: 700 !important; }

        /* Slide 10: Scaling Strategy */
        .pitch-deck .gtm-container h2 { font-size: 56px !important; font-weight: 700 !important; }
        .pitch-deck .timeline-phase h3 { font-size: 42px !important; font-weight: 700 !important; }
        .pitch-deck .timeline-phase .phase-duration { font-size: 20px !important; font-weight: 700 !important; }
        .pitch-deck .timeline-phase ul { font-size: 36px !important; line-height: 1.8 !important; font-weight: 700 !important; }
        .pitch-deck .timeline-phase li { margin-bottom: 25px !important; }

        /* Slide 11: Investment Opportunity */
        .pitch-deck .ask-container h2 { font-size: 56px !important; font-weight: 700 !important; }
        .pitch-deck .funding-amount { font-size: 64px !important; font-weight: 700 !important; }
        .pitch-deck .use-of-funds,
        .pitch-deck .milestones-list { font-size: 32px !important; line-height: 1.8 !important; font-weight: 700 !important; }
        .pitch-deck .use-of-funds li,
        .pitch-deck .milestones-list li { margin-bottom: 25px !important; }
      `}</style>
    </div>
  );
}
