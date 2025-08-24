import Image from 'next/image';

export default function WireframeV23() {
  return (
    <div className="bg-white">
      {/* HERO SECTION - Executive Style */}
      <section className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-cyan-50 flex items-center">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-5 gap-16 items-center">
            {/* Profile Column */}
            <div className="lg:col-span-2 text-center lg:text-left">
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/30 to-cyan-500/30 rounded-full blur-2xl"></div>
                <Image 
                  src="/franck.jpg" 
                  alt="François - BookBridge Founder" 
                  width={320}
                  height={320}
                  className="relative w-80 h-80 rounded-full object-cover border-8 border-white shadow-2xl mx-auto lg:mx-0"
                />
              </div>
              
              <div className="mt-8 bg-white/80 backdrop-blur-sm rounded-3xl p-8 border border-blue-100 shadow-xl">
                <h1 className="text-5xl lg:text-6xl font-bold mb-4 text-gray-900">François</h1>
                <p className="text-2xl text-blue-600 font-semibold mb-6">Founder & CEO, BookBridge</p>
                
                <div className="space-y-3 text-lg text-gray-700">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">🌍</span>
                    <span>From Congo to Global Impact</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">🤖</span>
                    <span>AI-Powered Reading Revolution</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">📚</span>
                    <span>1.5B ESL Students Served</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Content Column */}
            <div className="lg:col-span-3">
              <div className="bg-gradient-to-br from-slate-900 via-blue-900 to-cyan-900 rounded-3xl p-12 text-white shadow-2xl">
                <h2 className="text-4xl lg:text-5xl font-bold mb-8 bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent">
                  BookBridge
                </h2>
                <p className="text-2xl text-cyan-300 mb-8 font-light">&ldquo;Netflix for Books&rdquo; + Personal AI Tutor</p>
                
                <p className="text-xl text-gray-300 mb-12 leading-relaxed">
                  Democratizing reading access for 1.5 billion ESL students worldwide through AI-powered literacy solutions 
                  that adapt to any reading level, anywhere in the world.
                </p>
                
                {/* Key Features Grid */}
                <div className="grid md:grid-cols-2 gap-6 mb-12">
                  <div className="bg-white/10 rounded-2xl p-6 border border-white/20">
                    <h3 className="font-bold text-cyan-300 mb-3">🧠 Persistent Memory</h3>
                    <p className="text-sm text-gray-300">Remembers your entire reading journey across books and sessions</p>
                  </div>
                  <div className="bg-white/10 rounded-2xl p-6 border border-white/20">
                    <h3 className="font-bold text-green-300 mb-3">🎯 Socratic Method</h3>
                    <p className="text-sm text-gray-300">PhD-level tutoring through discovery-based questions</p>
                  </div>
                  <div className="bg-white/10 rounded-2xl p-6 border border-white/20">
                    <h3 className="font-bold text-purple-300 mb-3">📚 76K+ Books</h3>
                    <p className="text-sm text-gray-300">Vast library from public domain to modern titles</p>
                  </div>
                  <div className="bg-white/10 rounded-2xl p-6 border border-white/20">
                    <h3 className="font-bold text-yellow-300 mb-3">🌐 A1-C2 CEFR</h3>
                    <p className="text-sm text-gray-300">Text simplification for all reading levels</p>
                  </div>
                </div>
                
                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <a 
                    href="https://bookbridge-six.vercel.app/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-8 py-4 rounded-xl font-bold text-lg hover:shadow-xl hover:scale-105 transition-all duration-300 text-center"
                  >
                    Experience BookBridge →
                  </a>
                  <a 
                    href="mailto:franck1tshibala@gmail.com" 
                    className="border-2 border-cyan-400 text-cyan-400 px-8 py-4 rounded-xl font-bold text-lg hover:bg-cyan-400 hover:text-slate-900 transition-all duration-300 text-center"
                  >
                    Discuss Investment
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* IMPACT METRICS */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">Global Impact Potential</h2>
            <p className="text-xl text-gray-600">Building technology that scales to billions</p>
          </div>
          
          <div className="grid lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-gradient-to-br from-blue-500 to-cyan-500 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl font-bold text-white">1.5B</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">ESL Students Globally</h3>
              <p className="text-gray-600">Primary market seeking affordable reading assistance</p>
            </div>
            
            <div className="text-center">
              <div className="bg-gradient-to-br from-green-500 to-emerald-500 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl font-bold text-white">2</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Months to MVP</h3>
              <p className="text-gray-600">From concept to working AI reading companion</p>
            </div>
            
            <div className="text-center">
              <div className="bg-gradient-to-br from-purple-500 to-pink-500 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">76K+</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Books Available</h3>
              <p className="text-gray-600">Public domain + partnerships for modern catalog</p>
            </div>
            
            <div className="text-center">
              <div className="bg-gradient-to-br from-orange-500 to-red-500 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">∞</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Global Reach</h3>
              <p className="text-gray-600">Digital scaling to any country, any language</p>
            </div>
          </div>
        </div>
      </section>

      {/* FOUNDER STORY - Condensed */}
      <section className="py-24 bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 text-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl lg:text-5xl font-bold mb-8 bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent">
                The Personal Mission
              </h2>
              <div className="space-y-6 text-lg text-gray-300 leading-relaxed">
                <p>
                  Growing up in the Democratic Republic of Congo, I had no access to books or public libraries. 
                  I witnessed how literacy determined life outcomes - those who could read escaped poverty, 
                  while others remained trapped.
                </p>
                <p>
                  When I experienced my first American public library in 2019 - free books, free WiFi, open to everyone - 
                  that moment changed everything. I knew I had to democratize this access globally.
                </p>
                <p>
                  Physical libraries are expensive and reach limited people. AI emerged as the key to scaling 
                  personal tutoring globally. BookBridge isn&apos;t just another AI tool - it&apos;s a mission-driven solution 
                  to break educational barriers worldwide.
                </p>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20">
                <h3 className="text-2xl font-bold mb-4 text-cyan-300">Technical Innovation</h3>
                <div className="space-y-4 text-gray-300">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                    <span>Claude 3.5 Sonnet + OpenAI GPT-4 AI Stack</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span>Pinecone Vector Database for Semantic Search</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                    <span>Next.js 15 + TypeScript for Scalability</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                    <span>Multi-Modal: Text + Voice Integration</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20">
                <h3 className="text-2xl font-bold mb-4 text-green-300">Market Strategy</h3>
                <div className="space-y-4 text-gray-300">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                    <span>Phase 1: ESL Students (1.5B market)</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span>Phase 2: Learning Disabilities Support</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                    <span>Phase 3: K-12 Educational Partnerships</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                    <span>Phase 4: Global Adult Literacy</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* INVESTMENT ASK */}
      <section className="py-24 bg-gradient-to-br from-blue-50 to-cyan-50">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-8">
            Partner With Us to Scale Global Impact
          </h2>
          <p className="text-xl text-gray-700 mb-6 max-w-3xl mx-auto leading-relaxed">
            Seeking investors who share our vision of democratizing reading for 1.5 billion people worldwide. 
            We need more than funding - we need mentorship, connections, and expertise.
          </p>
          
          <div className="bg-white rounded-3xl p-12 shadow-xl border border-gray-100 mb-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-8">Next 2-3 Years Vision</h3>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🏫</span>
                </div>
                <h4 className="font-bold text-gray-900 mb-2">ESL School Partnerships</h4>
                <p className="text-gray-600 text-sm">Global institutional adoption and curriculum integration</p>
              </div>
              <div className="text-center">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">📚</span>
                </div>
                <h4 className="font-bold text-gray-900 mb-2">Modern Book Catalog</h4>
                <p className="text-gray-600 text-sm">Expand beyond public domain with publisher partnerships</p>
              </div>
              <div className="text-center">
                <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">💰</span>
                </div>
                <h4 className="font-bold text-gray-900 mb-2">Affordable Pricing</h4>
                <p className="text-gray-600 text-sm">Accessible in every country with local economic adaptation</p>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <a 
              href="https://bookbridge-six.vercel.app/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-12 py-4 rounded-2xl font-bold text-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
            >
              Experience BookBridge Platform
            </a>
            <a 
              href="mailto:franck1tshibala@gmail.com" 
              className="bg-white border-2 border-blue-600 text-blue-600 px-12 py-4 rounded-2xl font-bold text-lg hover:bg-blue-600 hover:text-white transition-all duration-300 shadow-lg"
            >
              Schedule Investment Discussion
            </a>
          </div>
        </div>
      </section>

      {/* Option Label */}
      <div className="bg-gray-900 text-white text-center py-3">
        <p className="text-sm font-medium">Option V2.3: Executive Profile with Technical Detail</p>
      </div>
    </div>
  );
}