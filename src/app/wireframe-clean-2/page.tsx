import Image from 'next/image';

export default function WireframeClean2() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-6 py-16">
        {/* Split Layout */}
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left Column - Profile */}
          <div className="text-center lg:text-left lg:sticky lg:top-16">
            <Image 
              src="/franck.jpg" 
              alt="François" 
              width={280}
              height={280}
              className="w-64 h-64 lg:w-72 lg:h-72 rounded-full mx-auto lg:mx-0 mb-8 object-cover shadow-xl"
            />
            <h1 className="text-5xl font-bold text-gray-900 mb-4">François</h1>
            <p className="text-2xl text-gray-600 mb-8">Founder of BookBridge</p>
            
            {/* Buttons */}
            <div className="space-y-4">
              <a 
                href="https://bookbridge-six.vercel.app/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block w-full bg-blue-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-blue-700 transition-colors"
              >
                Try BookBridge
              </a>
              <a 
                href="mailto:franck1tshibala@gmail.com" 
                className="block w-full border-2 border-gray-400 text-gray-700 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-100 transition-colors"
              >
                Contact Me
              </a>
            </div>
          </div>

          {/* Right Column - Story */}
          <div className="bg-white rounded-2xl p-12 shadow-lg">
            <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-6">
              <p>
                I grew up in the Democratic Republic of Congo, where public libraries
                simply don&apos;t exist. As a child, I had no books to read and didn&apos;t even
                know how to approach reading one. It wasn&apos;t until I arrived in
                America in 2019 that I experienced my first public library - free
                books, free WiFi, open to everyone. That moment changed everything.
              </p>

              <p>
                Back in Congo, I witnessed something powerful: people who could read
                and had access to books consistently escaped poverty while others
                remained trapped. That&apos;s when I knew I had to build public libraries
                back home to give people the same opportunity.
              </p>

              <p>
                But physical libraries are expensive and reach limited people. When AI
                emerged, I realized I&apos;d found the key to scaling my mission globally.
                As a software development student, I&apos;ve spent the last two months
                applying everything I&apos;m learning to build BookBridge - a digital
                solution that can reach anyone, anywhere.
              </p>

              <p>
                BookBridge is now a working MVP focused on ESL students, with
                AI-powered features that simplify complex books to any reading level
                (A1 to C2). In just two months, we&apos;ve created what could become
                &ldquo;Netflix for books&rdquo; - but unlike Netflix, everyone gets access
                regardless of income, location, or education level.
              </p>

              <p>
                My vision for the next 2-3 years: partner with ESL schools globally,
                expand our book catalog with modern titles, and reach individuals in
                every country who want to improve their reading skills at prices they
                can afford.
              </p>

              <p>
                I&apos;m seeking investors who share this vision and can provide not just
                funding, but mentorship, connections, and expertise to help us
                democratize reading for the 1.5 billion people worldwide who need it
                most.
              </p>

              <p className="font-semibold text-blue-600">
                Try BookBridge yourself:
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Option Label */}
      <div className="bg-gray-100 text-center py-3">
        <p className="text-sm text-gray-600">Clean Style 2: Split Layout with Card</p>
      </div>
    </div>
  );
}