import Image from 'next/image';

export default function WireframeClean3() {
  return (
    <div className="min-h-screen bg-white">
      {/* Full-width Hero */}
      <div className="bg-gradient-to-br from-slate-50 to-blue-50 py-24">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <Image 
            src="/franck.jpg" 
            alt="François" 
            width={240}
            height={240}
            className="w-56 h-56 rounded-full mx-auto mb-10 object-cover border-8 border-white shadow-2xl"
          />
          <h1 className="text-6xl font-bold text-gray-900 mb-6">François</h1>
          <p className="text-3xl text-gray-600 font-light">Founder of BookBridge</p>
        </div>
      </div>

      {/* Story Section */}
      <div className="py-24">
        <div className="max-w-4xl mx-auto px-6">
          <div className="prose prose-xl max-w-none text-gray-700 leading-relaxed space-y-8">
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

            <p className="text-2xl font-semibold text-center text-blue-600 mt-12">
              Try BookBridge yourself:
            </p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <a 
              href="https://bookbridge-six.vercel.app/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-blue-600 text-white px-12 py-4 rounded-full font-bold text-xl hover:bg-blue-700 transition-colors shadow-lg"
            >
              Try BookBridge
            </a>
            <a 
              href="mailto:franck1tshibala@gmail.com" 
              className="bg-white border-3 border-blue-600 text-blue-600 px-12 py-4 rounded-full font-bold text-xl hover:bg-blue-600 hover:text-white transition-colors shadow-lg"
            >
              Contact Me
            </a>
          </div>
        </div>
      </div>

      {/* Option Label */}
      <div className="bg-gray-100 text-center py-3">
        <p className="text-sm text-gray-600">Clean Style 3: Hero Header with Flowing Content</p>
      </div>
    </div>
  );
}