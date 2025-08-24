import Image from 'next/image';

export default function WireframeV21() {
  return (
    <div className="bg-white">
      {/* HERO SECTION - Full Screen Impact */}
      <section className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 text-white flex items-center">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
          <div className="text-center lg:text-left">
            <Image 
              src="/franck.jpg" 
              alt="François - BookBridge Founder" 
              width={200}
              height={200}
              className="w-48 h-48 lg:w-56 lg:h-56 rounded-full mx-auto lg:mx-0 mb-8 object-cover border-4 border-blue-400 shadow-2xl"
            />
            <h1 className="text-5xl lg:text-7xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
              François
            </h1>
            <p className="text-2xl lg:text-3xl text-blue-300 mb-6 font-light">Founder & CEO, BookBridge</p>
            <p className="text-xl lg:text-2xl text-gray-300 leading-relaxed mb-8 max-w-2xl">
              Democratizing reading for <span className="text-cyan-400 font-semibold">1.5 billion</span> ESL students worldwide through AI-powered literacy solutions
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <a 
                href="https://bookbridge-six.vercel.app/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-2xl hover:scale-105 transition-all duration-300"
              >
                Experience BookBridge →
              </a>
              <a 
                href="mailto:franck1tshibala@gmail.com" 
                className="border-2 border-blue-400 text-blue-400 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-blue-400 hover:text-white transition-all duration-300"
              >
                Partner With Us
              </a>
            </div>
          </div>
          
          <div className="text-center">
            <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20">
              <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-cyan-300">BookBridge</h2>
              <p className="text-xl text-gray-300 mb-8">&ldquo;Netflix for Books&rdquo; + AI Tutor</p>
              
              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="text-center">
                  <div className="text-4xl font-bold text-blue-400">1.5B</div>
                  <div className="text-sm text-gray-400">ESL Students Globally</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-cyan-400">2 Months</div>
                  <div className="text-sm text-gray-400">to Working MVP</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-green-400">76K+</div>
                  <div className="text-sm text-gray-400">Books Available</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-purple-400">A1-C2</div>
                  <div className="text-sm text-gray-400">Reading Levels</div>
                </div>
              </div>
              
              <div className="text-sm text-gray-400">
                AI-Powered • Persistent Memory • Socratic Method
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STORY SECTION */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">From Congo to Global Impact</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">A personal mission to democratize reading access worldwide</p>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-red-500 rounded-full mx-auto mb-6 flex items-center justify-center">
                <span className="text-white font-bold text-xl">🇨🇩</span>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Growing Up in Congo</h3>
              <p className="text-gray-700 leading-relaxed">
                No public libraries existed. No books to read. Witnessed how literacy determined who escaped poverty and who remained trapped.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-500 rounded-full mx-auto mb-6 flex items-center justify-center">
                <span className="text-white font-bold text-xl">🇺🇸</span>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">America, 2019</h3>
              <p className="text-gray-700 leading-relaxed">
                First public library experience - free books, free WiFi, open to everyone. That moment changed everything and sparked the vision.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-green-500 rounded-full mx-auto mb-6 flex items-center justify-center">
                <span className="text-white font-bold text-xl">🌍</span>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">BookBridge Solution</h3>
              <p className="text-gray-700 leading-relaxed">
                AI-powered platform reaching anyone, anywhere. Physical libraries are expensive and limited - digital scales globally.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* TECHNICAL PROWESS */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">Technical Innovation</h2>
            <p className="text-xl text-gray-600">Built for global scale with cutting-edge AI</p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h3 className="text-3xl font-bold mb-8 text-gray-900">Beyond Generic AI</h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-3 h-3 bg-blue-500 rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Persistent Memory</h4>
                    <p className="text-gray-700">Remembers entire reading journey across books and sessions</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-3 h-3 bg-green-500 rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Socratic Method</h4>
                    <p className="text-gray-700">Guides discovery through questions vs. direct answers</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-3 h-3 bg-purple-500 rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Adaptive Intelligence</h4>
                    <p className="text-gray-700">Adjusts to age, reading level, and learning style</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-3 h-3 bg-cyan-500 rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-semibold text-gray-900">CEFR-Aligned</h4>
                    <p className="text-gray-700">Text simplification from A1 Beginner to C2 Proficient</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-slate-900 to-blue-900 rounded-3xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-6 text-cyan-300">Tech Stack</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="font-semibold text-blue-300">AI & ML</div>
                  <div className="text-gray-300">Claude 3.5 Sonnet</div>
                  <div className="text-gray-300">OpenAI GPT-4</div>
                  <div className="text-gray-300">Pinecone Vector DB</div>
                </div>
                <div>
                  <div className="font-semibold text-green-300">Platform</div>
                  <div className="text-gray-300">Next.js 15</div>
                  <div className="text-gray-300">TypeScript</div>
                  <div className="text-gray-300">Supabase</div>
                </div>
                <div>
                  <div className="font-semibold text-purple-300">Content</div>
                  <div className="text-gray-300">76K+ Public Domain</div>
                  <div className="text-gray-300">1.4M+ Open Library</div>
                  <div className="text-gray-300">20M+ Google Books</div>
                </div>
                <div>
                  <div className="font-semibold text-yellow-300">Features</div>
                  <div className="text-gray-300">Voice Integration</div>
                  <div className="text-gray-300">Multi-language</div>
                  <div className="text-gray-300">Accessibility</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* INVESTOR CTA */}
      <section className="py-24 bg-gradient-to-br from-blue-900 via-purple-900 to-slate-900 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl lg:text-5xl font-bold mb-8">Ready to Democratize Reading?</h2>
          <p className="text-xl text-gray-300 mb-4">
            Seeking investors who share this vision and can provide mentorship, connections, and expertise
          </p>
          <p className="text-lg text-gray-400 mb-12 max-w-2xl mx-auto">
            Help us reach 1.5 billion ESL students worldwide with affordable, AI-powered literacy solutions
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <a 
              href="https://bookbridge-six.vercel.app/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-12 py-4 rounded-xl font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all duration-300"
            >
              Experience BookBridge
            </a>
            <a 
              href="mailto:franck1tshibala@gmail.com" 
              className="border-2 border-cyan-400 text-cyan-400 px-12 py-4 rounded-xl font-bold text-lg hover:bg-cyan-400 hover:text-white transition-all duration-300"
            >
              Partner With Us
            </a>
          </div>
        </div>
      </section>

      {/* Option Label */}
      <div className="bg-gray-900 text-white text-center py-3">
        <p className="text-sm font-medium">Option V2.1: Hero-Driven Professional Layout</p>
      </div>
    </div>
  );
}