import Image from 'next/image';

export default function Wireframe3() {
  return (
    <div className="bg-gradient-to-br from-blue-50 to-gray-100">
      {/* CENTERED CARD LAYOUT */}
      <div className="min-h-screen flex items-center justify-center py-12 px-6">
        <div className="max-w-2xl bg-white rounded-2xl shadow-2xl p-12 text-center">
          
          <Image 
            src="/franck.jpg" 
            alt="François" 
            width={96}
            height={96}
            className="w-24 h-24 rounded-full mx-auto mb-6 object-cover border-4 border-blue-200"
          />
          
          <h1 className="text-4xl font-bold mb-2">François</h1>
          <p className="text-lg text-gray-600 mb-8">Founder of BookBridge</p>
          
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-blue-600">BookBridge</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              AI-powered reading platform democratizing literacy for 1.5 billion ESL students worldwide. 
              Built MVP in 2 months - &ldquo;Netflix for Books&rdquo; accessible regardless of income or location.
            </p>
            <p className="text-gray-600 italic">
              From growing up without books in Congo to creating global reading access through AI.
            </p>
          </div>
          
          {/* Mini Stats */}
          <div className="flex justify-center space-x-8 mb-8 text-center">
            <div className="bg-blue-50 px-4 py-2 rounded-lg">
              <div className="font-bold text-blue-600">1.5B</div>
              <div className="text-xs text-gray-600">ESL Students</div>
            </div>
            <div className="bg-blue-50 px-4 py-2 rounded-lg">
              <div className="font-bold text-blue-600">2 Months</div>
              <div className="text-xs text-gray-600">to MVP</div>
            </div>
            <div className="bg-blue-50 px-4 py-2 rounded-lg">
              <div className="font-bold text-blue-600">Global</div>
              <div className="text-xs text-gray-600">Reach</div>
            </div>
          </div>
          
          {/* CTA Buttons */}
          <div className="space-y-4">
            <a 
              href="https://bookbridge-six.vercel.app/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="block w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              View BookBridge App
            </a>
            <a 
              href="mailto:franck1tshibala@gmail.com" 
              className="block w-full border-2 border-blue-600 text-blue-600 py-3 rounded-lg font-semibold hover:bg-blue-600 hover:text-white transition-colors"
            >
              Contact for Investment
            </a>
          </div>
          
          <p className="text-xs text-gray-500 mt-6">
            Ready to democratize reading for 1.5 billion people worldwide?
          </p>
        </div>
      </div>

      {/* Option Label */}
      <div className="bg-gray-800 text-white text-center py-2">
        <p className="text-sm">Option 3: Card-Based Minimal Design</p>
      </div>
    </div>
  );
}