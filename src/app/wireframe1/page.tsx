import Image from 'next/image';

export default function Wireframe1() {
  return (
    <div className="bg-white">
      {/* HERO SECTION */}
      <header className="text-center py-20">
        <Image 
          src="/franck.jpg" 
          alt="François" 
          width={128}
          height={128}
          className="w-32 h-32 rounded-full mx-auto mb-6 object-cover border-4 border-blue-200"
        />
        <h1 className="text-5xl font-bold mb-2">François</h1>
        <p className="text-xl text-gray-600 mb-4">Founder of BookBridge</p>
        <p className="text-lg mt-4 max-w-2xl mx-auto text-gray-700">
          Democratizing reading for 1.5 billion ESL students worldwide through AI
        </p>
      </header>

      {/* STORY SECTION */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">The Story</h2>
          <div className="prose prose-lg mx-auto text-gray-700 space-y-6">
            <p>
              I grew up in the Democratic Republic of Congo, where public libraries simply don&apos;t exist. 
              As a child, I had no books to read and didn&apos;t even know how to approach reading one.
            </p>
            <p>
              It wasn&apos;t until I arrived in America in 2019 that I experienced my first public library - 
              free books, free WiFi, open to everyone. That moment changed everything.
            </p>
            <p>
              Back in Congo, I witnessed how people who could read and had access to books consistently 
              escaped poverty while others remained trapped. When AI emerged, I realized I&apos;d found the 
              key to scaling my mission globally.
            </p>
          </div>
        </div>
      </section>

      {/* BOOKBRIDGE SECTION */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-3xl font-bold mb-8">BookBridge</h2>
          <p className="text-xl mb-12 text-gray-700">AI-powered reading platform - &ldquo;Netflix for Books&rdquo;</p>
          
          {/* Key Stats Grid */}
          <div className="grid grid-cols-3 gap-8 mb-12">
            <div className="bg-blue-50 p-6 rounded-lg">
              <div className="text-3xl font-bold text-blue-600">1.5B</div>
              <div className="text-gray-600">ESL Students</div>
            </div>
            <div className="bg-blue-50 p-6 rounded-lg">
              <div className="text-3xl font-bold text-blue-600">2</div>
              <div className="text-gray-600">Months to MVP</div>
            </div>
            <div className="bg-blue-50 p-6 rounded-lg">
              <div className="text-3xl font-bold text-blue-600">A1-C2</div>
              <div className="text-gray-600">Reading Levels</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-16 bg-blue-600 text-white text-center">
        <h2 className="text-2xl font-bold mb-8">Ready to democratize reading?</h2>
        <div className="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center">
          <a 
            href="https://bookbridge-six.vercel.app/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            View BookBridge App
          </a>
          <a 
            href="mailto:franck1tshibala@gmail.com" 
            className="inline-block border-2 border-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
          >
            Contact Me
          </a>
        </div>
      </section>

      {/* Option Label */}
      <div className="bg-gray-800 text-white text-center py-2">
        <p className="text-sm">Option 1: Single Column Clean Design</p>
      </div>
    </div>
  );
}