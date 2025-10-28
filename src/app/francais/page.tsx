import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'BookBridge - Apprendre l\'Anglais pour Francophones',
  description: 'Application gratuite pour apprendre l\'anglais en lisant des livres adaptés à votre niveau. Créée pour les francophones du monde entier.',
  keywords: ['apprendre anglais', 'livres anglais', 'francophones', 'ESL', 'lecture anglais', 'BookBridge', 'Congo', 'Côte d\'Ivoire', 'France', 'apprentissage langue'],
  authors: [{ name: 'Franck Tshibala' }],
  openGraph: {
    title: 'BookBridge - Apprendre l\'Anglais pour Francophones',
    description: 'Application gratuite pour apprendre l\'anglais en lisant des livres adaptés à votre niveau.',
    type: 'website',
    locale: 'fr_FR',
    url: 'https://portfolio-4u8c.vercel.app/francais',
    siteName: 'BookBridge',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BookBridge - Apprendre l\'Anglais pour Francophones',
    description: 'Application gratuite pour apprendre l\'anglais en lisant des livres adaptés à votre niveau.',
  },
  alternates: {
    canonical: 'https://portfolio-4u8c.vercel.app/francais',
    languages: {
      'en': 'https://portfolio-4u8c.vercel.app/',
      'fr': 'https://portfolio-4u8c.vercel.app/francais',
    },
  },
};

export default function FrancaisPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white" lang="fr">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white py-20 px-4 sm:py-32">
        <div className="container mx-auto max-w-5xl text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight mb-6">
            Apprendre l&apos;Anglais en Lisant des Livres à Votre Niveau
          </h1>
          <p className="text-xl sm:text-2xl md:text-3xl text-blue-100 font-light leading-relaxed max-w-4xl mx-auto">
            BookBridge aide les francophones du monde entier à lire en anglais sans frustration
          </p>
        </div>
      </section>

      {/* Mission Statement Section */}
      <section className="py-16 px-4 sm:py-24">
        <div className="container mx-auto max-w-4xl">
          <div className="bg-white rounded-2xl shadow-lg p-8 sm:p-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-6 text-center">
              Mon Histoire
            </h2>
            <div className="prose prose-lg max-w-none text-slate-700 space-y-4">
              <p className="text-lg leading-relaxed">
                J&apos;ai grandi en République Démocratique du Congo sans accès aux livres. Quand j&apos;ai découvert les bibliothèques américaines en 2019, cela a changé ma vie.
              </p>
              <p className="text-lg leading-relaxed">
                J&apos;ai créé BookBridge pour que tous les francophones puissent apprendre l&apos;anglais en lisant de vrais livres adaptés à leur niveau.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 px-4 sm:py-24 bg-slate-50">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-12 text-center">
            Comment ça marche
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Step 1 */}
            <div className="bg-white rounded-xl shadow-md p-6 sm:p-8 hover:shadow-xl transition-shadow">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold">
                  1
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-2">
                    Choisissez un livre qui vous intéresse
                  </h3>
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-white rounded-xl shadow-md p-6 sm:p-8 hover:shadow-xl transition-shadow">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold">
                  2
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-2">
                    L&apos;application simplifie le texte selon votre niveau
                  </h3>
                  <p className="text-slate-600 text-sm">
                    (débutant à avancé)
                  </p>
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-white rounded-xl shadow-md p-6 sm:p-8 hover:shadow-xl transition-shadow">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold">
                  3
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-2">
                    Écoutez la prononciation avec l&apos;audio
                  </h3>
                </div>
              </div>
            </div>

            {/* Step 4 */}
            <div className="bg-white rounded-xl shadow-md p-6 sm:p-8 hover:shadow-xl transition-shadow">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold">
                  4
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-2">
                    Appuyez sur n&apos;importe quel mot pour voir la définition simple
                  </h3>
                </div>
              </div>
            </div>
          </div>

          {/* Free Pilot Badge */}
          <div className="mt-12 text-center">
            <div className="inline-block bg-gradient-to-r from-amber-400 to-amber-500 text-amber-900 px-8 py-4 rounded-full shadow-lg">
              <p className="text-lg sm:text-xl font-bold">
                ✨ Gratuit pendant la phase pilote
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call-to-Action Section */}
      <section className="py-16 px-4 sm:py-24">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-8">
            Commencez dès aujourd&apos;hui
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center">
            {/* Primary CTA - Try BookBridge */}
            <a
              href="https://bookbridge.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg px-8 py-4 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
            >
              Essayer BookBridge Gratuitement
            </a>

            {/* Secondary CTA - Watch Demo */}
            <a
              href="https://www.youtube.com/watch?v=dnVxPVGx-i0"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto bg-white hover:bg-slate-50 text-blue-600 font-bold text-lg px-8 py-4 rounded-full shadow-lg hover:shadow-xl border-2 border-blue-600 transform hover:scale-105 transition-all duration-200"
            >
              Regarder la Démonstration (10 min)
            </a>
          </div>
        </div>
      </section>

      {/* Who This Helps Section */}
      <section className="py-16 px-4 sm:py-24 bg-slate-50">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-12 text-center">
            Pour qui?
          </h2>
          <div className="grid sm:grid-cols-2 gap-6">
            {/* Audience 1 */}
            <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start gap-4">
                <div className="text-3xl">🎓</div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-1">
                    Étudiants des pays francophones
                  </h3>
                  <p className="text-slate-600 text-sm">
                    Qui veulent étudier à l&apos;étranger
                  </p>
                </div>
              </div>
            </div>

            {/* Audience 2 */}
            <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start gap-4">
                <div className="text-3xl">💼</div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-1">
                    Professionnels
                  </h3>
                  <p className="text-slate-600 text-sm">
                    Cherchant de meilleures opportunités
                  </p>
                </div>
              </div>
            </div>

            {/* Audience 3 */}
            <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start gap-4">
                <div className="text-3xl">👨‍👩‍👧</div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-1">
                    Parents
                  </h3>
                  <p className="text-slate-600 text-sm">
                    Voulant lire en anglais avec leurs enfants
                  </p>
                </div>
              </div>
            </div>

            {/* Audience 4 */}
            <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start gap-4">
                <div className="text-3xl">🌍</div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-1">
                    Tous les francophones
                  </h3>
                  <p className="text-slate-600 text-sm">
                    Du monde entier apprenant l&apos;anglais
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 px-4 sm:py-24 bg-gradient-to-br from-blue-50 to-white">
        <div className="container mx-auto max-w-3xl text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
            Contactez-moi
          </h2>
          <p className="text-lg text-slate-600 mb-10">
            Des questions? Je suis là pour vous aider
          </p>

          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center">
            {/* Email Button */}
            <a
              href="mailto:bookbridgegap@gmail.com"
              className="w-full sm:w-auto bg-white hover:bg-slate-50 text-slate-900 font-semibold text-lg px-8 py-4 rounded-xl shadow-lg hover:shadow-xl border-2 border-slate-200 transform hover:scale-105 transition-all duration-200 flex items-center justify-center gap-3"
            >
              <span className="text-2xl">📧</span>
              <div className="text-left">
                <div className="text-sm text-slate-500">Email</div>
                <div className="text-base font-bold">bookbridgegap@gmail.com</div>
              </div>
            </a>

            {/* WhatsApp Button */}
            <a
              href="https://wa.me/18177709866"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto bg-green-500 hover:bg-green-600 text-white font-semibold text-lg px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center justify-center gap-3"
            >
              <span className="text-2xl">💬</span>
              <div>WhatsApp</div>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
