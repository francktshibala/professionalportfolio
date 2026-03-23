'use client';

import { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

type Language = 'fr' | 'en';

export default function CLIGContent() {
  const [lang, setLang] = useState<Language>('fr');

  const toggleLanguage = () => {
    setLang(lang === 'fr' ? 'en' : 'fr');
  };

  const content = {
    fr: {
      hero: {
        title: 'Collective Investment Legacy Group',
        subtitle: 'Analyse Stratégique',
        description: 'Une présentation de recherche bilingue pour notre groupe d\'investissement de 15 membres. Début mai 2026.',
        intro: 'Nous sommes 15 membres qui construisons une richesse à long terme grâce à l\'immobilier en Utah. Avant de nous engager dans une stratégie, nous avons mené une recherche structurée en utilisant trois outils d\'IA indépendants pour trouver la meilleure voie à suivre pour notre situation spécifique — réfugiés, contributions variables, minimum de 500 $ par personne par mois.'
      },
      research: {
        title: 'Comment la recherche a été faite',
        tools: [
          {
            name: 'Claude Code',
            role: 'Mathématiques et projections',
            task: 'Calculer les trois modèles en utilisant de vrais chiffres de notre groupe — 7 500 $/mois de pool, 15 membres à 500 $ chacun, horizon de 15 ans.'
          },
          {
            name: 'Copilot ET Gemini (Parallèle)',
            role: 'Vérification de la réalité du prêt assumable',
            task: 'Les deux outils ont recherché la même question de manière indépendante — à quel point la stratégie de prêt assumable est-elle réaliste pour notre LLC en Utah en 2026. Là où ils étaient d\'accord, nous traitons comme haute confiance. Là où ils n\'étaient pas d\'accord, nous avons marqué pour un examen plus approfondi.'
          },
          {
            name: 'Gemini (Stratégie)',
            role: 'Recommandation globale',
            task: 'Compte tenu du profil de notre groupe, que recommandent les experts au-delà de nos trois modèles ? Y a-t-il une meilleure stratégie que nous n\'avons pas envisagée ?'
          }
        ]
      },
      models: {
        title: 'Les Trois Modèles',
        model1: {
          name: 'Modèle 1 — Comptant uniquement à 500 $/personne/mois',
          explanation: 'Chaque membre contribue 500 $/mois. Pool total = 7 500 $/mois. Nous économisons jusqu\'à ce que nous ayons le prix d\'achat complet, puis nous achetons en espèces. Jamais de dette.',
          pros: [
            'Zéro dette, simple, sûr, pas besoin d\'approbation bancaire',
            'Fonctionne pour tous les statuts d\'immigration'
          ],
          cons: [
            'Très lent — seulement 4 maisons en 15 ans',
            'L\'inflation peut dépasser l\'épargne',
            'Revenus locatifs limités au début'
          ],
          keyNumber: '3,1 M$ de richesse totale à l\'année 15 — 208 K$ par membre'
        },
        model2: {
          name: 'Modèle 2 — Comptant uniquement à 750 $/personne/mois',
          explanation: 'Même stratégie en espèces mais chaque membre contribue 750 $/mois. Pool total = 11 250 $/mois. Épargne plus rapide, achats plus précoces.',
          pros: [
            'Plus rapide que le modèle 1, toujours zéro dette',
            'Même sécurité et simplicité'
          ],
          cons: [
            'Un engagement mensuel plus élevé peut ne pas être réaliste pour tous les membres',
            'Seulement 6 maisons en 15 ans',
            'Multiple de rendement identique au modèle 1'
          ],
          keyNumber: '4,7 M$ de richesse totale à l\'année 15 — 315 K$ par membre'
        },
        model3: {
          name: 'Modèle 3 — Stratégie de prêt assumable',
          explanation: 'Au lieu d\'économiser 500 K$ pour chaque maison, nous trouvons des vendeurs qui ont une hypothèque de 2020-2021 à 2,75 % d\'intérêt. Nous payons seulement l\'écart de capital (environ 120 K$) et prenons en charge leur prêt à taux bas. Paiement mensuel à 2,75 % sur 380 K$ = 1 551 $ contre 2 387 $ au taux actuel de 7 %. Nous économisons 836 $/mois par maison.',
          pros: [
            '20 maisons en 15 ans',
            '16,7 M$ de richesse totale',
            'Flux de trésorerie positif dès le premier mois',
            'Économies massives de taux'
          ],
          cons: [
            'Les LLC ne peuvent légalement assumer les prêts FHA/VA',
            'Exige qu\'un membre vive dans la propriété comme résidence principale',
            'Approbation bancaire nécessaire individuellement',
            'Taux de succès proche de zéro pour la structure LLC',
            'L\'écart de capital nécessite encore des liquidités importantes'
          ],
          keyNumber: '16,7 M$ de richesse totale à l\'année 15 — 1,1 M$ par membre — mais fait face à de graves obstacles juridiques pour l\'utilisation LLC'
        }
      },
      assumptionCheck: {
        title: 'La réalité du prêt assumable',
        intro: 'Copilot et Gemini ont tous deux recherché cela de manière indépendante. Voici où ils étaient d\'accord et où ils n\'étaient pas d\'accord.',
        agreements: [
          'Les LLC ne peuvent pas assumer les prêts FHA ou VA — le prêt doit rester au nom individuel',
          'FHA et VA exigent que l\'acheteur utilise la propriété comme résidence principale — la LLC d\'investissement ne se qualifie pas',
          'L\'écart de capital de 100 K$ à 200 K$ est un obstacle de trésorerie majeur pour un pool de 7 500 $/mois',
          'Les non-citoyens avec des EAD peuvent se qualifier individuellement mais le statut de carte verte en attente soulève des drapeaux rouges',
          'Le délai d\'approbation est de 45 à 90 jours et échoue fréquemment',
          'Probabilité de succès combinée pour notre situation exacte : moins de 5 %'
        ],
        disagreements: {
          title: 'Où ils différaient légèrement',
          copilot: 'Pratiquement inutilisable pour notre structure de groupe',
          gemini: 'Possible si un membre assume personnellement et vit dans la propriété',
          conclusion: 'Conclusion réconciliée : traiter comme une opportunité uniquement, jamais comme stratégie de base'
        },
        bottomLine: 'Le modèle de prêt assumable produit les meilleurs chiffres sur papier mais n\'est pas légalement accessible pour une LLC. Il peut être poursuivi par des membres individuels comme un bonus — jamais comme le plan principal du groupe.'
      },
      duplex: {
        title: 'La stratégie duplex et logement secondaire',
        intro: 'Une maison avec un sous-sol qui peut être loué séparément. C\'est exactement ce que notre groupe a déjà prévu.',
        acquisition: {
          title: 'Coût d\'acquisition dans le comté de Salt Lake 2026',
          items: [
            'Maison médiane avec sous-sol : ~560 000 $',
            'Niveau de départ à Salt Lake City : ~410 832 $',
            'Inventaire actuel : ~1 495 maisons avec sous-sols disponibles'
          ]
        },
        legal: {
          title: 'Exigences légales — Règles ADU en Utah',
          items: [
            'Le propriétaire ou un membre de la famille doit vivre sur place (exigence d\'occupation par le propriétaire)',
            'Les locations doivent être de 30 jours ou plus — pas d\'Airbnb',
            'Licence commerciale de propriétaire requise',
            'L\'affidavit d\'occupation du propriétaire doit être déposé auprès du greffier du comté',
            'Un espace de stationnement hors rue supplémentaire requis pour le locataire ADU'
          ]
        },
        income: {
          title: 'Revenu locatif combiné réaliste',
          items: [
            'Unité principale (3-4 chambres) : 2 600 $ - 3 100 $/mois',
            'Suite au sous-sol (1-2 chambres) : 1 300 $ - 1 900 $/mois',
            'Total projeté brut : 3 900 $ - 5 000 $/mois'
          ]
        },
        warning: 'La plupart des juridictions du comté de Salt Lake exigent l\'occupation par le propriétaire. Cela signifie que le groupe ne peut pas légalement louer les deux unités à des locataires tiers alors qu\'aucun membre n\'y vit. C\'est une contrainte critique pour une LLC d\'investissement. Le groupe devrait consulter un avocat immobilier de l\'Utah avant d\'acheter une propriété ADU.',
        snowball: {
          title: 'Impact boule de neige',
          items: [
            'L\'ADU fournit environ 1 500 $/mois de flux de trésorerie supplémentaire par rapport à une maison unifamiliale',
            'Ce revenu supplémentaire réinvesti dans le pool accélère considérablement l\'achat suivant',
            'Les propriétés avec ADU légaux autorisés commandent une prime — croissance des capitaux propres plus forte'
          ]
        }
      },
      comparison: {
        title: 'Les chiffres comparés',
        table: {
          headers: ['', 'Modèle 1 500$/personne', 'Modèle 2 750$/personne', 'Modèle 3 Assumable'],
          rows: [
            { label: 'Pool mensuel', values: ['7 500 $', '11 250 $', '7 500 $'] },
            { label: 'Total investi (15 ans)', values: ['1 350 000 $', '2 025 000 $', '1 350 000 $'] },
            { label: 'Maisons à l\'année 5', values: ['0', '1', '4'] },
            { label: 'Maisons à l\'année 10', values: ['2', '3', '12'] },
            { label: 'Maisons à l\'année 15', values: ['4', '6', '20'] },
            { label: 'Richesse totale année 15', values: ['3,1 M$', '4,7 M$', '16,7 M$'] },
            { label: 'Part par membre', values: ['208 K$', '315 K$', '1,1 M$'] },
            { label: 'Multiple de rendement', values: ['2,3x', '2,3x', '12,4x'] },
            { label: 'Dette à l\'année 15', values: ['0 $', '0 $', '5,77 M$'] }
          ]
        }
      },
      recommendation: {
        title: 'Notre recommandation',
        phases: [
          {
            title: 'Phase 1 — Construire les fondations (Mois 1-12)',
            description: 'Épargner en groupe en utilisant le modèle en espèces. Former la LLC correctement, ouvrir un compte bancaire d\'entreprise, construire l\'historique de crédit, identifier un gestionnaire immobilier. Objectif : atteindre 90 K$ dans le pool.'
          },
          {
            title: 'Phase 2 — Premier achat en utilisant la stratégie pont',
            description: 'Utiliser 90 K$ comme acompte de 20 % sur une propriété de 400 K$ à 450 K$ avec une suite au sous-sol. Les deux unités génèrent des revenus locatifs immédiatement. Cela permet au groupe d\'entrer dans l\'immobilier 3-4 ans plus tôt que d\'attendre 500 K$ en espèces.'
          },
          {
            title: 'Phase 3 — Effet boule de neige avec les propriétés ADU',
            description: 'Les revenus locatifs des deux unités plus les contributions continues accélèrent l\'achat suivant. Cibler les maisons avec des suites au sous-sol — plus de revenus par dollar dépensé.'
          },
          {
            title: 'Phase 4 — Prêts assumables comme opportunité uniquement',
            description: 'Si un membre avec un bon crédit et un EAD valide trouve un prêt assumable à moins de 3 % ET est prêt à vivre dans la propriété — poursuivez-le. Ne jamais compter dessus comme un plan.'
          }
        ],
        callout: 'La différence entre 500 $ et 1 000 $ par mois par membre est significative. Les membres qui peuvent contribuer davantage accélèrent le groupe sans changer la stratégie. Chaque dollar au-dessus de 500 $ est de la vitesse gratuite.'
      },
      nextSteps: {
        title: 'Prochaines étapes',
        steps: [
          'Chaque membre confirme son montant de contribution mensuel avant le 1er mai 2026',
          'LLC officiellement formée avec un avocat d\'affaires de l\'Utah — accord d\'exploitation signé',
          'Compte bancaire d\'entreprise ouvert — toutes les contributions automatisées dès le premier jour',
          'CPA embauché qui a de l\'expérience avec les LLC de statut d\'immigration mixte',
          'Gestionnaire immobilier identifié dans le comté de Salt Lake',
          'Premier objectif d\'achat identifié — maison avec suite au sous-sol légale dans la gamme de départ (410 K$ - 460 K$)',
          'Avocat immobilier de l\'Utah consulté sur les exigences d\'occupation du propriétaire ADU avant l\'achat'
        ]
      },
      footer: 'CLIG LLC — Recherche menée en mars 2026'
    },
    en: {
      hero: {
        title: 'Collective Investment Legacy Group',
        subtitle: 'Strategic Analysis',
        description: 'A bilingual research presentation for our 15-member investment group. Starting May 2026.',
        intro: 'We are 15 members building long-term wealth through real estate in Utah. Before committing to a strategy we ran structured research using three independent AI tools to find the best path forward for our specific situation — refugees, variable contributions, $500 minimum per person per month.'
      },
      research: {
        title: 'How the Research Was Done',
        tools: [
          {
            name: 'Claude Code',
            role: 'Math and projections',
            task: 'Calculate all three models using real numbers from our group — $7,500/month pool, 15 members at $500 each, 15-year horizon.'
          },
          {
            name: 'Copilot AND Gemini (Parallel)',
            role: 'Assumption loan reality check',
            task: 'Both tools researched the same question independently — how realistic is the assumable loan strategy for our LLC in Utah in 2026. Where they agreed we treat as high confidence. Where they disagreed we flagged for deeper review.'
          },
          {
            name: 'Gemini (Strategy)',
            role: 'Big picture recommendation',
            task: 'Given our group profile, what do experts recommend beyond our three models? Is there a better strategy we have not considered?'
          }
        ]
      },
      models: {
        title: 'The Three Models',
        model1: {
          name: 'Model 1 — Cash Only at $500/person/month',
          explanation: 'Every member contributes $500/month. Total pool = $7,500/month. We save until we have full purchase price then buy in cash. No debt ever.',
          pros: [
            'Zero debt, simple, safe, no bank approval needed',
            'Works for all immigration statuses'
          ],
          cons: [
            'Very slow — only 4 homes in 15 years',
            'Inflation may outpace savings',
            'Limited rental income early on'
          ],
          keyNumber: '$3.1M total wealth at Year 15 — $208K per member'
        },
        model2: {
          name: 'Model 2 — Cash Only at $750/person/month',
          explanation: 'Same cash strategy but each member contributes $750/month. Total pool = $11,250/month. Faster savings, earlier purchases.',
          pros: [
            'Faster than Model 1, still zero debt',
            'Same safety and simplicity'
          ],
          cons: [
            'Higher monthly commitment may not be realistic for all members',
            'Only 6 homes in 15 years',
            'Return multiple identical to Model 1'
          ],
          keyNumber: '$4.7M total wealth at Year 15 — $315K per member'
        },
        model3: {
          name: 'Model 3 — Assumable Loan Strategy',
          explanation: 'Instead of saving $500K for each home, we find sellers who have a mortgage from 2020–2021 at 2.75% interest. We pay only the equity gap (around $120K) and take over their low-rate loan. Monthly payment at 2.75% on $380K = $1,551 vs $2,387 at today\'s 7% rate. We save $836/month per home.',
          pros: [
            '20 homes in 15 years',
            '$16.7M total wealth',
            'Positive cash flow from month one',
            'Massive rate savings'
          ],
          cons: [
            'LLCs cannot legally assume FHA/VA loans',
            'Requires member to live in property as primary residence',
            'Bank approval needed individually',
            'Near-zero success rate for LLC structure',
            'Equity gap still requires significant cash'
          ],
          keyNumber: '$16.7M total wealth at Year 15 — $1.1M per member — but faces severe legal barriers for LLC use'
        }
      },
      assumptionCheck: {
        title: 'The Assumption Loan Reality Check',
        intro: 'Copilot and Gemini both researched this independently. Here\'s where they agreed and where they disagreed.',
        agreements: [
          'LLCs cannot assume FHA or VA loans — loan must stay in individual name',
          'FHA and VA require buyer to use property as primary residence — investment LLC does not qualify',
          'Equity gap of $100K–$200K is a major cash hurdle for a $7,500/month pool',
          'Non-citizens with EADs can qualify individually but pending green card raises red flags',
          'Approval timeline is 45–90 days and frequently fails',
          'Combined success probability for our exact situation: under 5%'
        ],
        disagreements: {
          title: 'Where they slightly disagreed',
          copilot: 'Practically unusable for our group structure',
          gemini: 'Possible if one member personally assumes and lives in the property',
          conclusion: 'Reconciled conclusion: treat as opportunity only, never as base strategy'
        },
        bottomLine: 'The assumption loan model produces the best numbers on paper but is not legally accessible for an LLC. It can be pursued by individual members as a bonus — never as the group\'s main plan.'
      },
      duplex: {
        title: 'The Duplex and ADU Strategy',
        intro: 'A house with a basement suite that can be rented separately. This is exactly what our group already planned.',
        acquisition: {
          title: 'Acquisition cost in Salt Lake County 2026',
          items: [
            'Median home with basement: ~$560,000',
            'Starter tier in Salt Lake City: ~$410,832',
            'Current inventory: ~1,495 homes with basements available'
          ]
        },
        legal: {
          title: 'Legal requirements — ADU rules in Utah',
          items: [
            'Owner or family member must live on-site (owner-occupancy requirement)',
            'Rentals must be 30+ days — no Airbnb',
            'Landlord Business License required',
            'Owner-occupancy affidavit must be filed with County Recorder',
            'One additional off-street parking space required for ADU tenant'
          ]
        },
        income: {
          title: 'Realistic combined rental income',
          items: [
            'Main unit (3–4 bed): $2,600–$3,100/month',
            'Basement suite (1–2 bed): $1,300–$1,900/month',
            'Total projected gross: $3,900–$5,000/month'
          ]
        },
        warning: 'Most Salt Lake County jurisdictions require owner-occupancy. This means the group cannot legally rent both units to third-party tenants while no member lives there. This is a critical constraint for an investment LLC. The group should consult a Utah real estate attorney before purchasing an ADU property.',
        snowball: {
          title: 'Snowball impact',
          items: [
            'ADU provides approximately $1,500/month in additional cash flow vs single-family',
            'That extra income reinvested into the pool accelerates the next purchase significantly',
            'Properties with legal permitted ADUs command a premium — stronger equity growth'
          ]
        }
      },
      comparison: {
        title: 'The Numbers Side by Side',
        table: {
          headers: ['', 'Model 1 $500/person', 'Model 2 $750/person', 'Model 3 Assumption'],
          rows: [
            { label: 'Monthly pool', values: ['$7,500', '$11,250', '$7,500'] },
            { label: 'Total invested (15 yrs)', values: ['$1,350,000', '$2,025,000', '$1,350,000'] },
            { label: 'Homes at Year 5', values: ['0', '1', '4'] },
            { label: 'Homes at Year 10', values: ['2', '3', '12'] },
            { label: 'Homes at Year 15', values: ['4', '6', '20'] },
            { label: 'Total wealth Year 15', values: ['$3.1M', '$4.7M', '$16.7M'] },
            { label: 'Per member share', values: ['$208K', '$315K', '$1.1M'] },
            { label: 'Return multiple', values: ['2.3x', '2.3x', '12.4x'] },
            { label: 'Debt at Year 15', values: ['$0', '$0', '$5.77M'] }
          ]
        }
      },
      recommendation: {
        title: 'Our Recommendation',
        phases: [
          {
            title: 'Phase 1 — Build the Foundation (Months 1–12)',
            description: 'Save as a group using the cash model. Form the LLC properly, open business bank account, build credit history, identify a property manager. Target: reach $90K in the pool.'
          },
          {
            title: 'Phase 2 — First Purchase Using Bridge Strategy',
            description: 'Use $90K as a 20% down payment on a $400K–$450K property with a basement suite. Both units generate rental income immediately. This gets the group into real estate 3–4 years earlier than waiting for $500K cash.'
          },
          {
            title: 'Phase 3 — Snowball with ADU Properties',
            description: 'Rental income from both units plus continued contributions accelerates the next purchase. Target homes with basement suites — more income per dollar spent.'
          },
          {
            title: 'Phase 4 — Assumption Loans as Opportunity Only',
            description: 'If a member with strong credit and valid EAD finds an assumable sub-3% loan AND is willing to live in the property — pursue it. Never depend on it as a plan.'
          }
        ],
        callout: 'The difference between $500 and $1,000 per month per member is significant. Members who can contribute more accelerate the group without changing the strategy. Every dollar above $500 is free speed.'
      },
      nextSteps: {
        title: 'Next Steps',
        steps: [
          'Each member confirms their monthly contribution amount before May 1 2026',
          'LLC officially formed with Utah business attorney — operating agreement signed',
          'Business bank account opened — all contributions automated from day one',
          'CPA hired who has experience with mixed immigration status LLCs',
          'Property manager identified in Salt Lake County',
          'First purchase target identified — house with legal basement suite in starter tier ($410K–$460K range)',
          'Utah real estate attorney consulted on ADU owner-occupancy requirements before purchase'
        ]
      },
      footer: 'CLIG LLC — Research conducted March 2026'
    }
  };

  const t = content[lang];

  // Chart data
  const wealthData = [
    { year: 1, model1: 174, model2: 174, model3: 174 },
    { year: 2, model1: 355, model2: 377, model3: 377 },
    { year: 3, model1: 574, model2: 743, model3: 743 },
    { year: 4, model1: 789, model2: 1180, model3: 1180 },
    { year: 5, model1: 1010, model2: 1730, model3: 1730 },
    { year: 6, model1: 1330, model2: 2490, model3: 2490 },
    { year: 7, model1: 1600, model2: 3430, model3: 3430 },
    { year: 8, model1: 1990, model2: 4580, model3: 4580 },
    { year: 9, model1: 2310, model2: 5940, model3: 5940 },
    { year: 10, model1: 2790, model2: 7030, model3: 7030 },
    { year: 11, model1: 3160, model2: 8180, model3: 8180 },
    { year: 12, model1: 3750, model2: 9380, model3: 9380 },
    { year: 13, model1: 4400, model2: 10650, model3: 10650 },
    { year: 14, model1: 4880, model2: 11970, model3: 11970 },
    { year: 15, model1: 5660, model2: 13370, model3: 13370 }
  ];

  const homesData = [
    { year: 1, model1: 0, model2: 1, model3: 1 },
    { year: 2, model1: 0, model2: 1, model3: 3 },
    { year: 3, model1: 1, model2: 3, model3: 4 },
    { year: 4, model1: 1, model2: 4, model3: 6 },
    { year: 5, model1: 1, model2: 6, model3: 8 },
    { year: 6, model1: 2, model2: 8, model3: 11 },
    { year: 7, model1: 2, model2: 11, model3: 14 },
    { year: 8, model1: 2, model2: 14, model3: 17 },
    { year: 9, model1: 3, model2: 17, model3: 20 },
    { year: 10, model1: 4, model2: 20, model3: 20 },
    { year: 11, model1: 4, model2: 20, model3: 20 },
    { year: 12, model1: 4, model2: 20, model3: 20 },
    { year: 13, model1: 5, model2: 20, model3: 20 },
    { year: 14, model1: 6, model2: 20, model3: 20 },
    { year: 15, model1: 7, model2: 20, model3: 20 }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Language Toggle */}
      <button
        onClick={toggleLanguage}
        className="fixed top-6 right-6 z-50 bg-navy-800 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-navy-700 transition-colors font-semibold"
        style={{ backgroundColor: '#1e3a5f' }}
      >
        {lang === 'fr' ? '🇬🇧 EN' : '🇫🇷 FR'}
      </button>

      {/* Section 1 - Hero */}
      <section className="pt-20 pb-16 px-4 bg-gradient-to-br from-navy-900 to-navy-800" style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e3a5f 100%)' }}>
        <div className="max-w-4xl mx-auto text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-3">{t.hero.title}</h1>
          <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-blue-200">{t.hero.subtitle}</h2>
          <p className="text-lg md:text-xl mb-8 text-blue-100">{t.hero.description}</p>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-left">
            <p className="text-base md:text-lg leading-relaxed">{t.hero.intro}</p>
          </div>
        </div>
      </section>

      {/* Section 2 - Research Methodology */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-navy-900" style={{ color: '#0f172a' }}>{t.research.title}</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {t.research.tools.map((tool, idx) => (
              <div key={idx} className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-shadow">
                <h3 className="text-xl font-bold mb-3 text-navy-800" style={{ color: '#1e3a5f' }}>{tool.name}</h3>
                <p className="text-sm font-semibold text-blue-600 mb-3">{tool.role}</p>
                <p className="text-gray-700 text-sm leading-relaxed">{tool.task}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 3 - Three Models */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-navy-900" style={{ color: '#0f172a' }}>{t.models.title}</h2>
          <div className="space-y-6">
            {[t.models.model1, t.models.model2, t.models.model3].map((model, idx) => (
              <div key={idx} className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl shadow-md p-6 hover:shadow-xl transition-shadow border-l-4" style={{ borderLeftColor: idx === 0 ? '#10b981' : idx === 1 ? '#3b82f6' : '#f59e0b' }}>
                <h3 className="text-xl md:text-2xl font-bold mb-4 text-navy-800" style={{ color: '#1e3a5f' }}>{model.name}</h3>
                <p className="text-gray-700 mb-4 leading-relaxed">{model.explanation}</p>

                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <h4 className="font-semibold text-green-700 mb-2">{lang === 'fr' ? 'Avantages :' : 'Pros:'}</h4>
                    <ul className="space-y-1">
                      {model.pros.map((pro, i) => (
                        <li key={i} className="text-sm text-gray-700 flex items-start">
                          <span className="text-green-500 mr-2">✓</span>
                          <span>{pro}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-red-700 mb-2">{lang === 'fr' ? 'Inconvénients :' : 'Cons:'}</h4>
                    <ul className="space-y-1">
                      {model.cons.map((con, i) => (
                        <li key={i} className="text-sm text-gray-700 flex items-start">
                          <span className="text-red-500 mr-2">✗</span>
                          <span>{con}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="bg-white rounded-lg p-4 border-2" style={{ borderColor: idx === 0 ? '#10b981' : idx === 1 ? '#3b82f6' : '#f59e0b' }}>
                  <p className="font-bold text-lg" style={{ color: idx === 0 ? '#10b981' : idx === 1 ? '#3b82f6' : '#f59e0b' }}>{model.keyNumber}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 4 - Assumption Loan Reality Check */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 text-navy-900" style={{ color: '#0f172a' }}>{t.assumptionCheck.title}</h2>
          <p className="text-center text-gray-700 mb-8">{t.assumptionCheck.intro}</p>

          <div className="bg-white rounded-xl shadow-md p-6 mb-6">
            <h3 className="text-xl font-bold mb-4 text-green-700">{lang === 'fr' ? 'Où les deux étaient d\'accord :' : 'Where both agreed:'}</h3>
            <ul className="space-y-3">
              {t.assumptionCheck.agreements.map((item, idx) => (
                <li key={idx} className="flex items-start text-gray-700">
                  <span className="text-green-500 mr-3 text-xl">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-yellow-50 rounded-xl shadow-md p-6 mb-6 border-2 border-yellow-300">
            <h3 className="text-xl font-bold mb-4 text-yellow-800">{t.assumptionCheck.disagreements.title}</h3>
            <div className="space-y-3 text-gray-700">
              <p><strong>Copilot:</strong> {t.assumptionCheck.disagreements.copilot}</p>
              <p><strong>Gemini:</strong> {t.assumptionCheck.disagreements.gemini}</p>
              <p className="font-semibold text-yellow-900">{t.assumptionCheck.disagreements.conclusion}</p>
            </div>
          </div>

          <div className="bg-red-50 rounded-xl shadow-md p-6 border-2 border-red-300">
            <p className="text-gray-800 font-semibold leading-relaxed">{t.assumptionCheck.bottomLine}</p>
          </div>
        </div>
      </section>

      {/* Section 5 - Duplex/ADU Strategy */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 text-navy-900" style={{ color: '#0f172a' }}>{t.duplex.title}</h2>
          <p className="text-center text-gray-700 mb-8 text-lg">{t.duplex.intro}</p>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="bg-blue-50 rounded-xl p-6 shadow-md">
              <h3 className="text-lg font-bold mb-3 text-navy-800" style={{ color: '#1e3a5f' }}>{t.duplex.acquisition.title}</h3>
              <ul className="space-y-2">
                {t.duplex.acquisition.items.map((item, idx) => (
                  <li key={idx} className="text-gray-700 text-sm flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-blue-50 rounded-xl p-6 shadow-md">
              <h3 className="text-lg font-bold mb-3 text-navy-800" style={{ color: '#1e3a5f' }}>{t.duplex.income.title}</h3>
              <ul className="space-y-2">
                {t.duplex.income.items.map((item, idx) => (
                  <li key={idx} className="text-gray-700 text-sm flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="bg-gray-50 rounded-xl p-6 shadow-md mb-6">
            <h3 className="text-lg font-bold mb-3 text-navy-800" style={{ color: '#1e3a5f' }}>{t.duplex.legal.title}</h3>
            <ul className="space-y-2">
              {t.duplex.legal.items.map((item, idx) => (
                <li key={idx} className="text-gray-700 text-sm flex items-start">
                  <span className="text-amber-500 mr-2">⚠</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-red-50 rounded-xl p-6 shadow-md border-2 border-red-300 mb-6">
            <h3 className="text-lg font-bold mb-3 text-red-800">{lang === 'fr' ? 'Note juridique importante' : 'Important legal note'}</h3>
            <p className="text-gray-800 leading-relaxed">{t.duplex.warning}</p>
          </div>

          <div className="bg-green-50 rounded-xl p-6 shadow-md">
            <h3 className="text-lg font-bold mb-3 text-green-800">{t.duplex.snowball.title}</h3>
            <ul className="space-y-2">
              {t.duplex.snowball.items.map((item, idx) => (
                <li key={idx} className="text-gray-700 text-sm flex items-start">
                  <span className="text-green-500 mr-2">→</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Section 6 - Numbers Comparison */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-navy-900" style={{ color: '#0f172a' }}>{t.comparison.title}</h2>

          {/* Comparison Table */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-12">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-navy-800" style={{ backgroundColor: '#1e3a5f' }}>
                  <tr>
                    {t.comparison.table.headers.map((header, idx) => (
                      <th key={idx} className="px-4 py-3 text-left text-white font-semibold text-sm md:text-base">{header}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {t.comparison.table.rows.map((row, idx) => (
                    <tr key={idx} className={idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                      <td className="px-4 py-3 font-semibold text-gray-800 text-sm md:text-base">{row.label}</td>
                      {row.values.map((value, vIdx) => (
                        <td key={vIdx} className="px-4 py-3 text-gray-700 text-sm md:text-base">{value}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Wealth Progression Chart */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <h3 className="text-xl font-bold mb-6 text-center text-navy-800" style={{ color: '#1e3a5f' }}>
              {lang === 'fr' ? 'Progression de la richesse totale (en milliers $)' : 'Total Wealth Progression (in thousands $)'}
            </h3>
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={wealthData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" label={{ value: lang === 'fr' ? 'Année' : 'Year', position: 'insideBottom', offset: -5 }} />
                <YAxis label={{ value: lang === 'fr' ? 'Richesse ($k)' : 'Wealth ($k)', angle: -90, position: 'insideLeft' }} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="model1" stroke="#10b981" strokeWidth={2} name={lang === 'fr' ? 'Modèle 1 ($500)' : 'Model 1 ($500)'} />
                <Line type="monotone" dataKey="model2" stroke="#3b82f6" strokeWidth={2} name={lang === 'fr' ? 'Modèle 2 ($750)' : 'Model 2 ($750)'} />
                <Line type="monotone" dataKey="model3" stroke="#f59e0b" strokeWidth={2} name={lang === 'fr' ? 'Modèle 3 (Assumable)' : 'Model 3 (Assumable)'} />
              </LineChart>
            </ResponsiveContainer>
            <p className="text-sm text-gray-600 mt-4 text-center italic">
              {lang === 'fr'
                ? 'Note : Modèle 3 inclut 5,77 M$ de dette à l\'année 15, contrairement aux modèles 1 et 2 (zéro dette)'
                : 'Note: Model 3 includes $5.77M debt at Year 15, unlike Models 1 and 2 (zero debt)'}
            </p>
          </div>

          {/* Homes Owned Chart */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold mb-6 text-center text-navy-800" style={{ color: '#1e3a5f' }}>
              {lang === 'fr' ? 'Nombre de maisons possédées par année' : 'Homes Owned Per Year'}
            </h3>
            <ResponsiveContainer width="100%" height={350}>
              <LineChart data={homesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" label={{ value: lang === 'fr' ? 'Année' : 'Year', position: 'insideBottom', offset: -5 }} />
                <YAxis label={{ value: lang === 'fr' ? 'Maisons' : 'Homes', angle: -90, position: 'insideLeft' }} />
                <Tooltip />
                <Legend />
                <Line type="stepAfter" dataKey="model1" stroke="#10b981" strokeWidth={2} name={lang === 'fr' ? 'Modèle 1' : 'Model 1'} />
                <Line type="stepAfter" dataKey="model2" stroke="#3b82f6" strokeWidth={2} name={lang === 'fr' ? 'Modèle 2' : 'Model 2'} />
                <Line type="stepAfter" dataKey="model3" stroke="#f59e0b" strokeWidth={2} name={lang === 'fr' ? 'Modèle 3' : 'Model 3'} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>

      {/* Section 7 - Recommendation */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-navy-900" style={{ color: '#0f172a' }}>{t.recommendation.title}</h2>

          <div className="space-y-6 mb-8">
            {t.recommendation.phases.map((phase, idx) => (
              <div key={idx} className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl shadow-md p-6 border-l-4 border-blue-600">
                <h3 className="text-lg md:text-xl font-bold mb-3 text-navy-800" style={{ color: '#1e3a5f' }}>{phase.title}</h3>
                <p className="text-gray-700 leading-relaxed">{phase.description}</p>
              </div>
            ))}
          </div>

          <div className="bg-green-50 rounded-xl shadow-md p-6 border-2 border-green-400">
            <p className="text-gray-800 font-semibold leading-relaxed text-center">{t.recommendation.callout}</p>
          </div>
        </div>
      </section>

      {/* Section 8 - Next Steps */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-navy-900" style={{ color: '#0f172a' }}>{t.nextSteps.title}</h2>

          <div className="bg-white rounded-xl shadow-lg p-8">
            <ol className="space-y-4">
              {t.nextSteps.steps.map((step, idx) => (
                <li key={idx} className="flex items-start">
                  <span className="flex-shrink-0 w-8 h-8 bg-navy-800 text-white rounded-full flex items-center justify-center font-bold mr-4" style={{ backgroundColor: '#1e3a5f' }}>
                    {idx + 1}
                  </span>
                  <span className="text-gray-700 pt-1">{step}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-navy-900 text-white text-center" style={{ backgroundColor: '#0f172a' }}>
        <p className="text-sm">{t.footer}</p>
      </footer>
    </div>
  );
}
