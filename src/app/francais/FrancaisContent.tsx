'use client';

export default function FrancaisContent() {
  return (
    <div className="min-h-screen" lang="fr" style={{
      backgroundColor: '#F4F1EB',
      fontFamily: "'Source Serif Pro', Georgia, serif"
    }}>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Source+Serif+Pro:wght@400;600&display=swap');

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
      `}</style>

      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:py-32" style={{
        backgroundColor: 'var(--bg-primary)',
        borderBottom: '2px solid var(--accent-primary)',
        color: 'var(--text-primary)'
      }}>
        <div className="container mx-auto max-w-5xl text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl leading-tight mb-6" style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontWeight: 700,
            color: 'var(--text-accent)'
          }}>
            Apprendre l&apos;Anglais en Lisant des Livres à Votre Niveau
          </h1>
          <p className="text-xl sm:text-2xl md:text-3xl leading-relaxed max-w-4xl mx-auto" style={{
            fontFamily: "'Source Serif Pro', Georgia, serif",
            fontWeight: 400,
            color: 'var(--text-secondary)',
            lineHeight: 1.7
          }}>
            BookBridge aide les francophones du monde entier à lire en anglais sans frustration
          </p>
        </div>
      </section>

      {/* Mission Statement Section */}
      <section className="py-16 px-4 sm:py-24">
        <div className="container mx-auto max-w-4xl">
          <div className="p-8 sm:p-12 transition-all duration-300" style={{
            backgroundColor: 'var(--bg-secondary)',
            border: '2px solid rgba(0, 33, 71, 0.3)',
            borderRadius: '8px',
            boxShadow: '0 2px 8px var(--shadow-soft)'
          }}>
            <h2 className="text-3xl sm:text-4xl mb-6 text-center" style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontWeight: 700,
              color: 'var(--text-accent)'
            }}>
              Mon Histoire
            </h2>
            <div className="space-y-4">
              <p className="text-lg" style={{
                fontFamily: "'Source Serif Pro', Georgia, serif",
                lineHeight: 1.7,
                color: 'var(--text-primary)'
              }}>
                J&apos;ai grandi en République Démocratique du Congo sans accès aux livres. Quand j&apos;ai découvert les bibliothèques américaines en 2019, cela a changé ma vie.
              </p>
              <p className="text-lg" style={{
                fontFamily: "'Source Serif Pro', Georgia, serif",
                lineHeight: 1.7,
                color: 'var(--text-primary)'
              }}>
                J&apos;ai créé BookBridge pour que tous les francophones puissent apprendre l&apos;anglais en lisant de vrais livres adaptés à leur niveau.
              </p>

              {/* Read Full Story Button */}
              <div className="mt-6 text-center">
                <a
                  href="/about"
                  className="inline-block px-6 py-3 transition-all duration-300 hover:-translate-y-0.5"
                  style={{
                    backgroundColor: 'transparent',
                    color: 'var(--accent-primary)',
                    border: '2px solid rgba(0, 33, 71, 0.3)',
                    borderRadius: '6px',
                    fontFamily: "'Source Serif Pro', serif",
                    fontWeight: 600,
                    textDecoration: 'none',
                    fontSize: '0.95rem'
                  }}
                >
                  Lire l&apos;histoire complète →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 px-4 sm:py-24" style={{ backgroundColor: 'var(--bg-primary)' }}>
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-3xl sm:text-4xl mb-12 text-center" style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontWeight: 700,
            color: 'var(--text-accent)'
          }}>
            Comment ça marche
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Step 1 */}
            <div className="p-6 sm:p-8 transition-all duration-300 hover:-translate-y-0.5" style={{
              backgroundColor: 'var(--bg-secondary)',
              border: '2px solid rgba(0, 33, 71, 0.3)',
              borderRadius: '8px',
              boxShadow: '0 2px 8px var(--shadow-soft)'
            }}>
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center text-xl" style={{
                  backgroundColor: 'var(--accent-secondary)',
                  color: 'var(--bg-primary)',
                  border: '2px solid rgba(0, 33, 71, 0.2)',
                  fontFamily: "'Source Serif Pro', Georgia, serif",
                  fontWeight: 600
                }}>
                  1
                </div>
                <div>
                  <h3 className="text-xl mb-2" style={{
                    fontFamily: "'Source Serif Pro', Georgia, serif",
                    fontWeight: 600,
                    color: 'var(--text-primary)'
                  }}>
                    Choisissez un livre qui vous intéresse
                  </h3>
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="p-6 sm:p-8 transition-all duration-300 hover:-translate-y-0.5" style={{
              backgroundColor: 'var(--bg-secondary)',
              border: '2px solid rgba(0, 33, 71, 0.3)',
              borderRadius: '8px',
              boxShadow: '0 2px 8px var(--shadow-soft)'
            }}>
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center text-xl" style={{
                  backgroundColor: 'var(--accent-secondary)',
                  color: 'var(--bg-primary)',
                  border: '2px solid rgba(0, 33, 71, 0.2)',
                  fontFamily: "'Source Serif Pro', Georgia, serif",
                  fontWeight: 600
                }}>
                  2
                </div>
                <div>
                  <h3 className="text-xl mb-2" style={{
                    fontFamily: "'Source Serif Pro', Georgia, serif",
                    fontWeight: 600,
                    color: 'var(--text-primary)'
                  }}>
                    L&apos;application simplifie le texte selon votre niveau
                  </h3>
                  <p className="text-sm" style={{
                    fontFamily: "'Source Serif Pro', Georgia, serif",
                    color: 'var(--text-secondary)'
                  }}>
                    (débutant à avancé)
                  </p>
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="p-6 sm:p-8 transition-all duration-300 hover:-translate-y-0.5" style={{
              backgroundColor: 'var(--bg-secondary)',
              border: '2px solid rgba(0, 33, 71, 0.3)',
              borderRadius: '8px',
              boxShadow: '0 2px 8px var(--shadow-soft)'
            }}>
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center text-xl" style={{
                  backgroundColor: 'var(--accent-secondary)',
                  color: 'var(--bg-primary)',
                  border: '2px solid rgba(0, 33, 71, 0.2)',
                  fontFamily: "'Source Serif Pro', Georgia, serif",
                  fontWeight: 600
                }}>
                  3
                </div>
                <div>
                  <h3 className="text-xl mb-2" style={{
                    fontFamily: "'Source Serif Pro', Georgia, serif",
                    fontWeight: 600,
                    color: 'var(--text-primary)'
                  }}>
                    Écoutez la prononciation avec l&apos;audio
                  </h3>
                </div>
              </div>
            </div>

            {/* Step 4 */}
            <div className="p-6 sm:p-8 transition-all duration-300 hover:-translate-y-0.5" style={{
              backgroundColor: 'var(--bg-secondary)',
              border: '2px solid rgba(0, 33, 71, 0.3)',
              borderRadius: '8px',
              boxShadow: '0 2px 8px var(--shadow-soft)'
            }}>
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center text-xl" style={{
                  backgroundColor: 'var(--accent-secondary)',
                  color: 'var(--bg-primary)',
                  border: '2px solid rgba(0, 33, 71, 0.2)',
                  fontFamily: "'Source Serif Pro', Georgia, serif",
                  fontWeight: 600
                }}>
                  4
                </div>
                <div>
                  <h3 className="text-xl mb-2" style={{
                    fontFamily: "'Source Serif Pro', Georgia, serif",
                    fontWeight: 600,
                    color: 'var(--text-primary)'
                  }}>
                    Appuyez sur n&apos;importe quel mot pour voir la définition simple
                  </h3>
                </div>
              </div>
            </div>
          </div>

          {/* Free Pilot Badge */}
          <div className="mt-12 text-center">
            <div className="inline-block px-8 py-4" style={{
              backgroundColor: 'var(--accent-secondary)',
              color: 'var(--bg-primary)',
              borderRadius: '6px',
              boxShadow: '0 2px 8px var(--shadow-soft)',
              fontFamily: "'Source Serif Pro', Georgia, serif",
              fontWeight: 600
            }}>
              <p className="text-lg sm:text-xl">
                ✨ Gratuit pendant la phase pilote
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call-to-Action Section */}
      <section className="py-16 px-4 sm:py-24">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl sm:text-4xl mb-8" style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontWeight: 700,
            color: 'var(--text-accent)'
          }}>
            Commencez dès aujourd&apos;hui
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center">
            {/* Primary CTA - Try BookBridge */}
            <a
              href="https://bookbridge.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto text-lg px-8 py-4 transition-all duration-300 hover:-translate-y-0.5"
              style={{
                backgroundColor: 'var(--accent-primary)',
                color: 'var(--bg-primary)',
                borderRadius: '6px',
                fontFamily: "'Source Serif Pro', serif",
                fontWeight: 600,
                textDecoration: 'none',
                display: 'inline-block',
                boxShadow: '0 2px 8px var(--shadow-soft)'
              }}
            >
              Essayer BookBridge Gratuitement
            </a>

            {/* Secondary CTA - Watch Demo */}
            <a
              href="https://www.youtube.com/watch?v=671_mDB5tBk&list=PL7CrnyOZbVAbRhdqTkGJwekhkFkLuD7gu"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto text-lg px-8 py-4 transition-all duration-300 hover:-translate-y-0.5"
              style={{
                backgroundColor: 'transparent',
                color: 'var(--accent-primary)',
                border: '2px solid rgba(0, 33, 71, 0.3)',
                borderRadius: '6px',
                fontFamily: "'Source Serif Pro', serif",
                fontWeight: 600,
                textDecoration: 'none',
                display: 'inline-block',
                boxShadow: '0 2px 8px var(--shadow-soft)'
              }}
            >
              Regarder la Démonstration (10 min)
            </a>
          </div>
        </div>
      </section>

      {/* Who This Helps Section */}
      <section className="py-16 px-4 sm:py-24" style={{ backgroundColor: 'var(--bg-primary)' }}>
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl sm:text-4xl mb-12 text-center" style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontWeight: 700,
            color: 'var(--text-accent)'
          }}>
            Pour qui?
          </h2>
          <div className="grid sm:grid-cols-2 gap-6">
            {/* Audience 1 */}
            <div className="p-6 transition-all duration-300 hover:-translate-y-0.5" style={{
              backgroundColor: 'var(--bg-secondary)',
              border: '2px solid rgba(0, 33, 71, 0.3)',
              borderRadius: '8px',
              boxShadow: '0 2px 8px var(--shadow-soft)'
            }}>
              <div className="flex items-start gap-4">
                <div className="text-3xl">🎓</div>
                <div>
                  <h3 className="text-lg mb-1" style={{
                    fontFamily: "'Source Serif Pro', Georgia, serif",
                    fontWeight: 600,
                    color: 'var(--text-primary)'
                  }}>
                    Étudiants des pays francophones
                  </h3>
                  <p className="text-sm" style={{
                    fontFamily: "'Source Serif Pro', Georgia, serif",
                    color: 'var(--text-secondary)'
                  }}>
                    Qui veulent étudier à l&apos;étranger
                  </p>
                </div>
              </div>
            </div>

            {/* Audience 2 */}
            <div className="p-6 transition-all duration-300 hover:-translate-y-0.5" style={{
              backgroundColor: 'var(--bg-secondary)',
              border: '2px solid rgba(0, 33, 71, 0.3)',
              borderRadius: '8px',
              boxShadow: '0 2px 8px var(--shadow-soft)'
            }}>
              <div className="flex items-start gap-4">
                <div className="text-3xl">💼</div>
                <div>
                  <h3 className="text-lg mb-1" style={{
                    fontFamily: "'Source Serif Pro', Georgia, serif",
                    fontWeight: 600,
                    color: 'var(--text-primary)'
                  }}>
                    Professionnels
                  </h3>
                  <p className="text-sm" style={{
                    fontFamily: "'Source Serif Pro', Georgia, serif",
                    color: 'var(--text-secondary)'
                  }}>
                    Cherchant de meilleures opportunités
                  </p>
                </div>
              </div>
            </div>

            {/* Audience 3 */}
            <div className="p-6 transition-all duration-300 hover:-translate-y-0.5" style={{
              backgroundColor: 'var(--bg-secondary)',
              border: '2px solid rgba(0, 33, 71, 0.3)',
              borderRadius: '8px',
              boxShadow: '0 2px 8px var(--shadow-soft)'
            }}>
              <div className="flex items-start gap-4">
                <div className="text-3xl">👨‍👩‍👧</div>
                <div>
                  <h3 className="text-lg mb-1" style={{
                    fontFamily: "'Source Serif Pro', Georgia, serif",
                    fontWeight: 600,
                    color: 'var(--text-primary)'
                  }}>
                    Parents
                  </h3>
                  <p className="text-sm" style={{
                    fontFamily: "'Source Serif Pro', Georgia, serif",
                    color: 'var(--text-secondary)'
                  }}>
                    Voulant lire en anglais avec leurs enfants
                  </p>
                </div>
              </div>
            </div>

            {/* Audience 4 */}
            <div className="p-6 transition-all duration-300 hover:-translate-y-0.5" style={{
              backgroundColor: 'var(--bg-secondary)',
              border: '2px solid rgba(0, 33, 71, 0.3)',
              borderRadius: '8px',
              boxShadow: '0 2px 8px var(--shadow-soft)'
            }}>
              <div className="flex items-start gap-4">
                <div className="text-3xl">🌍</div>
                <div>
                  <h3 className="text-lg mb-1" style={{
                    fontFamily: "'Source Serif Pro', Georgia, serif",
                    fontWeight: 600,
                    color: 'var(--text-primary)'
                  }}>
                    Tous les francophones
                  </h3>
                  <p className="text-sm" style={{
                    fontFamily: "'Source Serif Pro', Georgia, serif",
                    color: 'var(--text-secondary)'
                  }}>
                    Du monde entier apprenant l&apos;anglais
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 px-4 sm:py-24" style={{
        backgroundColor: 'var(--bg-primary)',
        borderTop: '2px solid var(--border-light)'
      }}>
        <div className="container mx-auto max-w-3xl text-center">
          <h2 className="text-3xl sm:text-4xl mb-4" style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontWeight: 700,
            color: 'var(--text-accent)'
          }}>
            Contactez-moi
          </h2>
          <p className="text-lg mb-10" style={{
            fontFamily: "'Source Serif Pro', Georgia, serif",
            color: 'var(--text-secondary)'
          }}>
            Des questions? Je suis là pour vous aider
          </p>

          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center">
            {/* Email Button */}
            <a
              href="mailto:bookbridgegap@gmail.com"
              className="w-full sm:w-auto text-lg px-8 py-4 flex items-center justify-center gap-3 transition-all duration-300 hover:-translate-y-0.5"
              style={{
                backgroundColor: 'var(--bg-secondary)',
                color: 'var(--text-primary)',
                border: '2px solid rgba(0, 33, 71, 0.3)',
                borderRadius: '8px',
                fontFamily: "'Source Serif Pro', Georgia, serif",
                fontWeight: 600,
                textDecoration: 'none',
                boxShadow: '0 2px 8px var(--shadow-soft)'
              }}
            >
              <span className="text-2xl">📧</span>
              <div className="text-left">
                <div className="text-sm" style={{ color: 'var(--text-secondary)' }}>Email</div>
                <div className="text-base" style={{
                  fontWeight: 600,
                  color: 'var(--text-primary)'
                }}>bookbridgegap@gmail.com</div>
              </div>
            </a>

            {/* WhatsApp Button */}
            <a
              href="https://wa.me/18177709866"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto text-lg px-8 py-4 flex items-center justify-center gap-3 transition-all duration-300 hover:-translate-y-0.5"
              style={{
                backgroundColor: 'var(--accent-secondary)',
                color: 'var(--bg-primary)',
                borderRadius: '8px',
                fontFamily: "'Source Serif Pro', Georgia, serif",
                fontWeight: 600,
                textDecoration: 'none',
                boxShadow: '0 2px 8px var(--shadow-soft)'
              }}
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
