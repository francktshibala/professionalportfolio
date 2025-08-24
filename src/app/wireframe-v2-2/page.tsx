import Image from 'next/image';

export default function WireframeV22() {
  return (
    <div className="bg-white">
      {/* HERO SECTION - Centered Focus */}
      <section className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-white px-6">
        <div className="max-w-5xl mx-auto text-center">
          <div className="relative mb-12">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-3xl"></div>
            <Image 
              src="/franck.jpg" 
              alt="François - BookBridge Founder" 
              width={300}
              height={300}
              className="relative w-72 h-72 rounded-full mx-auto object-cover border-8 border-white shadow-2xl"
            />
          </div>
          
          <h1 className="text-6xl lg:text-8xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent">François</span>
          </h1>
          <p className="text-2xl lg:text-3xl text-gray-700 mb-4 font-light">Founder & CEO</p>
          
          <div className="inline-flex items-center bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-3 rounded-full text-xl font-semibold mb-8">
            <span className="mr-3">🌍</span>
            BookBridge - Democratizing Reading Globally
          </div>
          
          <p className="text-xl lg:text-2xl text-gray-600 leading-relaxed max-w-4xl mx-auto mb-12">
            From growing up without books in Congo to building AI-powered literacy solutions for 
            <span className="font-bold text-blue-600"> 1.5 billion ESL students</span> worldwide
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
            <a 
              href="https://bookbridge-six.vercel.app/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-10 py-4 rounded-2xl font-bold text-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
            >
              Experience BookBridge →
            </a>
            <a 
              href="mailto:franck1tshibala@gmail.com" 
              className="bg-white border-2 border-blue-600 text-blue-600 px-10 py-4 rounded-2xl font-bold text-lg hover:bg-blue-600 hover:text-white transition-all duration-300 shadow-lg"
            >
              Schedule Partnership Discussion
            </a>
          </div>
          
          {/* Key Metrics */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <div className="text-3xl lg:text-4xl font-bold text-blue-600 mb-2">1.5B</div>
              <div className="text-gray-600 font-medium">Global ESL Students</div>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <div className="text-3xl lg:text-4xl font-bold text-green-600 mb-2">2</div>
              <div className="text-gray-600 font-medium">Months to MVP</div>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <div className="text-3xl lg:text-4xl font-bold text-purple-600 mb-2">76K+</div>
              <div className="text-gray-600 font-medium">Books Available</div>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <div className="text-3xl lg:text-4xl font-bold text-orange-600 mb-2">A1-C2</div>
              <div className="text-gray-600 font-medium">CEFR Levels</div>
            </div>
          </div>
        </div>
      </section>

      {/* MISSION STATEMENT */}
      <section className="py-24 bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 text-white">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-4xl lg:text-6xl font-bold mb-12">
            <span className="bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent">
              &ldquo;Netflix for Books&rdquo;
            </span>
          </h2>
          <p className="text-2xl lg:text-3xl text-gray-300 mb-16 max-w-4xl mx-auto leading-relaxed">
            AI-powered reading companion that makes any book accessible to any reader, regardless of education level, income, or location
          </p>
          
          <div className="grid lg:grid-cols-3 gap-12 text-left">
            <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20">
              <div className="text-4xl mb-4">🧠</div>
              <h3 className="text-2xl font-bold mb-4 text-cyan-300">Persistent AI Memory</h3>
              <p className="text-gray-300 leading-relaxed">
                Unlike ChatGPT, BookBridge remembers your entire reading journey across books and sessions, building genuine understanding over time.
              </p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-2xl font-bold mb-4 text-green-300">Socratic Method</h3>
              <p className="text-gray-300 leading-relaxed">
                Guides discovery through questions rather than direct answers, creating deeper comprehension like a PhD literature professor.
              </p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20">
              <div className="text-4xl mb-4">🌐</div>
              <h3 className="text-2xl font-bold mb-4 text-purple-300">Global Accessibility</h3>
              <p className="text-gray-300 leading-relaxed">
                CEFR-aligned text simplification, multi-language support, and pricing adapted to local economic conditions worldwide.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FOUNDER JOURNEY */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">The Journey That Changed Everything</h2>
            <p className="text-xl text-gray-600">From personal struggle to global solution</p>
          </div>
          
          <div className="space-y-16">
            <div className="flex flex-col lg:flex-row items-center gap-12">
              <div className="lg:w-1/2">
                <div className="bg-red-500 text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mb-6">1</div>
                <h3 className="text-3xl font-bold mb-6 text-gray-900">Congo: The Problem Revealed</h3>
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  Growing up in the Democratic Republic of Congo, I had no access to books or libraries. I witnessed firsthand how literacy determined life outcomes - those who could read escaped poverty, while others remained trapped.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  This wasn&apos;t just about education; it was about fundamental human opportunity being denied by circumstances beyond anyone&apos;s control.
                </p>
              </div>
              <div className="lg:w-1/2">
                <div className="bg-gradient-to-br from-red-500 to-orange-500 rounded-3xl p-8 text-white">
                  <div className="text-6xl font-bold mb-4">0</div>
                  <div className="text-2xl font-semibold mb-2">Public Libraries in Congo</div>
                  <div className="text-red-100">Limited access to books determined who could break the cycle of poverty</div>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col lg:flex-row-reverse items-center gap-12">
              <div className="lg:w-1/2">
                <div className="bg-blue-500 text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mb-6">2</div>
                <h3 className="text-3xl font-bold mb-6 text-gray-900">America 2019: The Vision Sparked</h3>
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  My first American public library experience was transformative - free books, free WiFi, open to everyone. That moment of realized potential changed my entire perspective on what was possible.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  I knew I had to bring this access back home, but physical libraries are expensive and reach limited people. The solution had to be digital and global.
                </p>
              </div>
              <div className="lg:w-1/2">
                <div className="bg-gradient-to-br from-blue-500 to-cyan-500 rounded-3xl p-8 text-white">
                  <div className="text-6xl font-bold mb-4">∞</div>
                  <div className="text-2xl font-semibold mb-2">Global Digital Reach</div>
                  <div className="text-blue-100">AI can scale personal tutoring to anyone, anywhere, at affordable prices</div>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col lg:flex-row items-center gap-12">
              <div className="lg:w-1/2">
                <div className="bg-green-500 text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mb-6">3</div>
                <h3 className="text-3xl font-bold mb-6 text-gray-900">BookBridge: AI-Powered Solution</h3>
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  As a software development student, I spent two months building BookBridge - combining my personal mission with cutting-edge AI technology to create something unprecedented.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Not just another AI tool, but a persistent reading companion that remembers, adapts, and guides discovery using proven educational methods.
                </p>
              </div>
              <div className="lg:w-1/2">
                <div className="bg-gradient-to-br from-green-500 to-emerald-500 rounded-3xl p-8 text-white">
                  <div className="text-6xl font-bold mb-4">2</div>
                  <div className="text-2xl font-semibold mb-2">Months to Working MVP</div>
                  <div className="text-green-100">From concept to functional AI reading companion serving ESL students globally</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* INVESTMENT OPPORTUNITY */}
      <section className="py-24 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl lg:text-5xl font-bold mb-8 bg-gradient-to-r from-cyan-300 to-pink-300 bg-clip-text text-transparent">
            Join the Mission
          </h2>
          <p className="text-xl lg:text-2xl text-gray-300 mb-6 leading-relaxed">
            Seeking investors who share this vision of democratizing reading for 1.5 billion people worldwide
          </p>
          <p className="text-lg text-gray-400 mb-12 max-w-3xl mx-auto">
            We&apos;re not just building a product - we&apos;re creating a movement to break down educational barriers globally. 
            Partner with us to provide funding, mentorship, connections, and expertise.
          </p>
          
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 mb-12">
            <h3 className="text-2xl font-bold mb-6 text-cyan-300">Next 2-3 Years Vision</h3>
            <div className="grid md:grid-cols-3 gap-6 text-left">
              <div>
                <div className="text-3xl mb-2">🏫</div>
                <div className="font-semibold mb-2">ESL School Partnerships</div>
                <div className="text-sm text-gray-300">Global institutional adoption</div>
              </div>
              <div>
                <div className="text-3xl mb-2">📚</div>
                <div className="font-semibold mb-2">Modern Book Catalog</div>
                <div className="text-sm text-gray-300">Expand beyond public domain</div>
              </div>
              <div>
                <div className="text-3xl mb-2">💰</div>
                <div className="font-semibold mb-2">Affordable Global Pricing</div>
                <div className="text-sm text-gray-300">Accessible in every country</div>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <a 
              href="https://bookbridge-six.vercel.app/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-gradient-to-r from-cyan-500 to-purple-500 text-white px-12 py-4 rounded-2xl font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all duration-300"
            >
              Experience the Platform
            </a>
            <a 
              href="mailto:franck1tshibala@gmail.com" 
              className="border-2 border-cyan-400 text-cyan-400 px-12 py-4 rounded-2xl font-bold text-lg hover:bg-cyan-400 hover:text-white transition-all duration-300"
            >
              Let&apos;s Partner Together
            </a>
          </div>
        </div>
      </section>

      {/* Option Label */}
      <div className="bg-gray-900 text-white text-center py-3">
        <p className="text-sm font-medium">Option V2.2: Centered Portrait with Journey Flow</p>
      </div>
    </div>
  );
}