'use client';

import Image from 'next/image';

export default function AboutFrancaisPage() {
  return (
    <div>
      <style jsx global>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: 'Source Serif Pro', Georgia, serif;
          line-height: 1.6;
          background: #F4F1EB;
          margin: 0;
          padding: 20px;
        }

        .main-container {
          display: grid;
          grid-template-columns: 1fr 1fr;
          min-height: 100vh;
          max-width: 1400px;
          margin: 0 auto;
          box-shadow: 0 4px 20px rgba(44, 24, 16, 0.1);
        }

        .left-section {
          background: #002147;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: flex-start;
          padding: 60px 60px 40px 60px;
          color: #F4F1EB;
          text-align: center;
          min-height: 100vh;
        }

        .profile-section {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-top: 80px;
          margin-bottom: 40px;
        }

        .profile-image {
          width: 200px;
          height: 200px;
          background: #CD7F32;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 80px;
          font-weight: bold;
          color: white;
          margin-bottom: 30px;
          box-shadow: 0 8px 24px rgba(44, 24, 16, 0.3);
          border: 4px solid #CD7F32;
          overflow: hidden;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          position: relative;
        }

        .profile-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center top;
        }

        .profile-image:hover {
          transform: translateY(-5px);
          box-shadow: 0 12px 32px rgba(44, 24, 16, 0.4);
        }

        .name {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: 2.5rem;
          font-weight: bold;
          margin-bottom: 12px;
          text-shadow: 0 2px 8px rgba(0,0,0,0.2);
        }

        .title {
          font-size: 1.2rem;
          opacity: 0.95;
          font-weight: 300;
          letter-spacing: 0.5px;
          margin-bottom: 40px;
        }

        .left-buttons {
          display: flex;
          flex-direction: column;
          gap: 16px;
          width: 100%;
          max-width: 280px;
        }

        .left-btn {
          padding: 14px 28px;
          border-radius: 8px;
          text-decoration: none;
          font-family: 'Source Serif Pro', Georgia, serif;
          font-weight: 600;
          font-size: 1rem;
          transition: all 0.3s ease;
          border: none;
          cursor: pointer;
          text-align: center;
          box-shadow: 0 2px 8px rgba(44, 24, 16, 0.1);
        }

        .left-btn-primary {
          background: #CD7F32;
          color: #F4F1EB;
        }

        .left-btn-primary:hover {
          background: #B8722D;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(205, 127, 50, 0.3);
        }

        .left-btn-secondary {
          background: transparent;
          color: #F4F1EB;
          border: 2px solid #CD7F32;
        }

        .left-btn-secondary:hover {
          background: #CD7F32;
          color: #F4F1EB;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(205, 127, 50, 0.2);
        }

        .right-section {
          background: #FFFFFF;
          padding: 80px 60px;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .content-heading {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: 2.5rem;
          color: #002147;
          margin-bottom: 40px;
          font-weight: bold;
        }

        .content-paragraph {
          font-family: 'Source Serif Pro', Georgia, serif;
          font-size: 1.1rem;
          color: #2C1810;
          line-height: 1.7;
          margin-bottom: 24px;
        }

        @media (max-width: 768px) {
          body {
            padding: 10px;
          }

          .main-container {
            grid-template-columns: 1fr;
          }

          .left-section {
            padding: 60px 40px;
          }

          .right-section {
            padding: 60px 40px;
          }

          .profile-image {
            width: 180px;
            height: 180px;
          }

          .name {
            font-size: 2.2rem;
          }

          .content-heading {
            font-size: 2.2rem;
          }
        }
      `}</style>

      <div className="main-container">
        <div className="left-section">
          <div className="profile-section">
            <div className="profile-image">
              <Image
                src="/franck.jpg"
                alt="Franck Tshibala"
                width={200}
                height={200}
              />
            </div>
            <div className="name">Franck Tshibala</div>
            <div className="title">Fondateur de BookBridge</div>
          </div>

          <div className="left-buttons">
            <a href="https://bookbridge.app/" target="_blank" rel="noopener noreferrer" className="left-btn left-btn-primary">
              Explorer BookBridge
            </a>
            <a href="https://www.linkedin.com/in/francois-tshibala-556486233/" target="_blank" rel="noopener noreferrer" className="left-btn left-btn-secondary">
              Connecter sur LinkedIn
            </a>
            <a href="https://donorbox.org/bookbridge-make-books-accessible-to-everyone-regardless-of-their-their-situation" target="_blank" rel="noopener noreferrer" className="left-btn left-btn-primary">
              Faire un Don
            </a>
            <a href="/support-needs" className="left-btn left-btn-secondary">
              Façons d&apos;Aider
            </a>
          </div>
        </div>

        <div className="right-section">
          <h1 className="content-heading">Mon Parcours</h1>

          <p className="content-paragraph">
            J&apos;ai grandi en République Démocratique du Congo, où les bibliothèques publiques n&apos;existent tout simplement pas. En tant qu&apos;enfant, je n&apos;avais pas de livres à lire et je ne savais même pas comment aborder la lecture. Ce n&apos;est qu&apos;à mon arrivée en Amérique en 2019 que j&apos;ai découvert ma première bibliothèque publique - des livres gratuits, du WiFi gratuit, ouvert à tous. Ce moment a tout changé.
          </p>

          <p className="content-paragraph">
            De retour au Congo, j&apos;ai été témoin de quelque chose de puissant : les personnes qui savaient lire et avaient accès aux livres échappaient systématiquement à la pauvreté, tandis que d&apos;autres restaient piégées. C&apos;est alors que j&apos;ai su que je devais construire des bibliothèques publiques dans mon pays pour offrir aux gens la même opportunité.
          </p>

          <p className="content-paragraph">
            Mais les bibliothèques physiques sont coûteuses et touchent un nombre limité de personnes. Quand l&apos;IA est apparue, j&apos;ai réalisé que j&apos;avais trouvé la clé pour étendre ma mission à l&apos;échelle mondiale. En tant qu&apos;étudiant en développement logiciel, j&apos;ai passé les deux derniers mois à appliquer tout ce que j&apos;apprends pour construire BookBridge - une solution numérique qui peut atteindre n&apos;importe qui, n&apos;importe où.
          </p>

          <p className="content-paragraph">
            BookBridge est maintenant un MVP fonctionnel axé sur les étudiants en anglais langue seconde, avec des fonctionnalités alimentées par l&apos;IA qui simplifient les livres complexes à n&apos;importe quel niveau de lecture (A1 à C2). En seulement deux mois, nous avons créé ce qui pourrait devenir le &ldquo;Netflix des livres&rdquo; - mais contrairement à Netflix, tout le monde y a accès quel que soit son revenu, son emplacement ou son niveau d&apos;éducation.
          </p>

          <p className="content-paragraph">
            Ma vision pour les 2-3 prochaines années : établir des partenariats avec des écoles d&apos;anglais langue seconde dans le monde entier, élargir notre catalogue de livres avec des titres modernes, et atteindre des individus dans chaque pays qui souhaitent améliorer leurs compétences en lecture à des prix abordables.
          </p>

          <p className="content-paragraph">
            Je recherche des investisseurs qui partagent cette vision et qui peuvent fournir non seulement du financement, mais aussi du mentorat, des connexions et de l&apos;expertise pour nous aider à démocratiser la lecture pour les 1,5 milliard de personnes dans le monde qui en ont le plus besoin.
          </p>

          <p className="content-paragraph">
            Que vous soyez investisseur, éducateur, développeur, ou simplement quelqu&apos;un qui croit en la démocratisation de l&apos;éducation, j&apos;accueille votre soutien de toute nature. Chaque connexion, retour d&apos;information ou coup de main nous rapproche de rendre l&apos;éducation de qualité accessible à tous, partout.
          </p>

        </div>
      </div>
    </div>
  );
}
