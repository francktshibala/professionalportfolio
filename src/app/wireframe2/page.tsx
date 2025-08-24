import Image from 'next/image';

export default function Wireframe2() {
  return (
    <div className="bg-white">
      {/* HERO SECTION */}
      <header className="min-h-screen flex items-center px-6">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <Image 
              src="/franck.jpg" 
              alt="François" 
              width={160}
              height={160}
              className="w-40 h-40 rounded-full mb-8 object-cover border-4 border-blue-200"
            />
            <h1 className="text-6xl font-bold mb-4">François</h1>
            <p className="text-2xl text-gray-600 mb-6">BookBridge Founder</p>
            <p className="text-xl leading-relaxed text-gray-700 mb-8">
              From Congo to creating AI-powered reading solutions for 1.5 billion ESL students
            </p>
            
            {/* CTA Buttons */}
            <div className="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex">
              <a 
                href="https://bookbridge-six.vercel.app/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-block bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                View BookBridge
              </a>
              <a 
                href="mailto:franck1tshibala@gmail.com" 
                className="inline-block border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-blue-600 hover:text-white transition-colors"
              >
                Contact Me
              </a>
            </div>
          </div>
          
          <div className="text-center">
            {/* Large BookBridge Visual */}
            <div className="text-7xl lg:text-8xl font-bold text-blue-600 mb-4">BookBridge</div>
            <p className="text-xl text-gray-600 mb-12">&ldquo;Netflix for Books&rdquo;</p>
            
            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="text-3xl font-bold text-blue-600">1.5B</div>
                <div className="text-gray-600">ESL Students</div>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="text-3xl font-bold text-blue-600">2 Months</div>
                <div className="text-gray-600">to MVP</div>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg col-span-2">
                <div className="text-3xl font-bold text-blue-600">Global Reach</div>
                <div className="text-gray-600">Accessible Anywhere</div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* STORY SECTION (Condensed) */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-4xl font-bold mb-12">The Mission</h2>
          <div className="text-lg leading-relaxed text-gray-700 space-y-6 max-w-3xl mx-auto">
            <p>
              Growing up in Congo without access to books, I witnessed how literacy determined who escaped poverty. 
              After experiencing American public libraries in 2019, I knew I had to democratize reading access globally.
            </p>
            <p>
              BookBridge uses AI to simplify complex books to any reading level (A1-C2), creating &ldquo;Netflix for books&rdquo; 
              that&apos;s accessible regardless of income, location, or education level.
            </p>
          </div>
        </div>
      </section>

      {/* Option Label */}
      <div className="bg-gray-800 text-white text-center py-2">
        <p className="text-sm">Option 2: Split Layout with Visual Emphasis</p>
      </div>
    </div>
  );
}