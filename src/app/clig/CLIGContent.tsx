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
        intro: 'Nous sommes 15 membres qui construisons une richesse à long terme grâce à l\'immobilier en Utah. Avant de nous engager dans une stratégie, nous avons mené une recherche structurée en utilisant trois outils d\'IA indépendants pour trouver la meilleure voie à suivre pour notre situation spécifique — réfugiés, contributions variables, minimum de 500 $ par personne par mois.',
        stats: {
          members: '15 Membres',
          monthly: '7 500 $/mois',
          horizon: 'Horizon 15 ans'
        }
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
        perMemberTitle: 'Ce que vous valez à l\'année 15',
        model1: {
          name: 'Modèle 1 — Comptant uniquement à 500 $/personne/mois',
          explanation: 'Chaque membre contribue 500 $/mois. Pool total = 7 500 $/mois. Nous économisons jusqu\'à ce que nous ayons le prix d\'achat complet, puis nous achetons en espèces. Jamais de dette.',
          pros: [
            'Zéro dette, simple, sûr, pas besoin d\'approbation bancaire',
            'Fonctionne pour tous les statuts d\'immigration'
          ],
          cons: [
            'Très lent — seulement 7 maisons en 15 ans',
            'L\'inflation peut dépasser l\'épargne',
            'Revenus locatifs limités au début'
          ],
          totalWealth: '3,1 M$',
          perMember: '208 K$',
          breakdown: {
            realEstate: '185 000 $',
            cash: '23 000 $',
            total: '208 000 $',
            multiple: '2,30'
          }
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
            'Seulement 20 maisons en 15 ans',
            'Multiple de rendement identique au modèle 1'
          ],
          totalWealth: '4,7 M$',
          perMember: '315 K$',
          breakdown: {
            realEstate: '274 000 $',
            cash: '41 000 $',
            total: '315 000 $',
            multiple: '2,30'
          }
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
          totalWealth: '16,7 M$',
          perMember: '1,1 M$',
          legalWarning: 'Obstacles juridiques graves pour utilisation LLC',
          breakdown: {
            realEstate: '1 040 000 $',
            cash: '60 000 $',
            total: '1 100 000 $',
            multiple: '12,40',
            debtNote: 'Inclut part proportionnelle de 5,77 M$ de dette du groupe'
          }
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
        warningTitle: '⚠️ ATTENTION JURIDIQUE CRITIQUE',
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
            { label: 'Maisons à l\'année 15', values: ['7', '20', '20'], highlight: [false, false, true] },
            { label: 'Richesse totale année 15', values: ['3,1 M$', '4,7 M$', '16,7 M$'], highlight: [false, false, true] },
            { label: 'Part par membre', values: ['208 K$', '315 K$', '1,1 M$'], highlight: [false, false, true] },
            { label: 'Multiple de rendement', values: ['2,3x', '2,3x', '12,4x'], highlight: [false, false, true] },
            { label: 'Dette à l\'année 15', values: ['0 $', '0 $', '5,77 M$'], highlight: [true, true, 'danger'] }
          ]
        }
      },
      recommendation: {
        title: 'Notre recommandation',
        phases: [
          {
            number: '01',
            title: 'Phase 1 — Construire les fondations',
            subtitle: 'Mois 1-12',
            description: 'Épargner en groupe en utilisant le modèle en espèces. Former la LLC correctement, ouvrir un compte bancaire d\'entreprise, construire l\'historique de crédit, identifier un gestionnaire immobilier. Objectif : atteindre 90 K$ dans le pool.',
            icon: '💰'
          },
          {
            number: '02',
            title: 'Phase 2 — Premier achat',
            subtitle: 'Stratégie pont',
            description: 'Utiliser 90 K$ comme acompte de 20 % sur une propriété de 400 K$ à 450 K$ avec une suite au sous-sol. Les deux unités génèrent des revenus locatifs immédiatement. Cela permet au groupe d\'entrer dans l\'immobilier 3-4 ans plus tôt que d\'attendre 500 K$ en espèces.',
            icon: '🏠'
          },
          {
            number: '03',
            title: 'Phase 3 — Effet boule de neige',
            subtitle: 'Propriétés ADU',
            description: 'Les revenus locatifs des deux unités plus les contributions continues accélèrent l\'achat suivant. Cibler les maisons avec des suites au sous-sol — plus de revenus par dollar dépensé.',
            icon: '📈'
          },
          {
            number: '04',
            title: 'Phase 4 — Opportunités',
            subtitle: 'Prêts assumables',
            description: 'Si un membre avec un bon crédit et un EAD valide trouve un prêt assumable à moins de 3 % ET est prêt à vivre dans la propriété — poursuivez-le. Ne jamais compter dessus comme un plan.',
            icon: '🎯'
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
        intro: 'We are 15 members building long-term wealth through real estate in Utah. Before committing to a strategy we ran structured research using three independent AI tools to find the best path forward for our specific situation — refugees, variable contributions, $500 minimum per person per month.',
        stats: {
          members: '15 Members',
          monthly: '$7,500/month',
          horizon: '15-Year Horizon'
        }
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
        perMemberTitle: 'What you are worth at Year 15',
        model1: {
          name: 'Model 1 — Cash Only at $500/person/month',
          explanation: 'Every member contributes $500/month. Total pool = $7,500/month. We save until we have full purchase price then buy in cash. No debt ever.',
          pros: [
            'Zero debt, simple, safe, no bank approval needed',
            'Works for all immigration statuses'
          ],
          cons: [
            'Very slow — only 7 homes in 15 years',
            'Inflation may outpace savings',
            'Limited rental income early on'
          ],
          totalWealth: '$3.1M',
          perMember: '$208K',
          breakdown: {
            realEstate: '$185,000',
            cash: '$23,000',
            total: '$208,000',
            multiple: '2.30'
          }
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
            'Only 20 homes in 15 years',
            'Return multiple identical to Model 1'
          ],
          totalWealth: '$4.7M',
          perMember: '$315K',
          breakdown: {
            realEstate: '$274,000',
            cash: '$41,000',
            total: '$315,000',
            multiple: '2.30'
          }
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
          totalWealth: '$16.7M',
          perMember: '$1.1M',
          legalWarning: 'Severe legal barriers for LLC use',
          breakdown: {
            realEstate: '$1,040,000',
            cash: '$60,000',
            total: '$1,100,000',
            multiple: '12.40',
            debtNote: 'Includes proportional share of $5.77M group debt'
          }
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
        warningTitle: '⚠️ CRITICAL LEGAL WARNING',
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
            { label: 'Homes at Year 15', values: ['7', '20', '20'], highlight: [false, false, true] },
            { label: 'Total wealth Year 15', values: ['$3.1M', '$4.7M', '$16.7M'], highlight: [false, false, true] },
            { label: 'Per member share', values: ['$208K', '$315K', '$1.1M'], highlight: [false, false, true] },
            { label: 'Return multiple', values: ['2.3x', '2.3x', '12.4x'], highlight: [false, false, true] },
            { label: 'Debt at Year 15', values: ['$0', '$0', '$5.77M'], highlight: [true, true, 'danger'] }
          ]
        }
      },
      recommendation: {
        title: 'Our Recommendation',
        phases: [
          {
            number: '01',
            title: 'Phase 1 — Build the Foundation',
            subtitle: 'Months 1–12',
            description: 'Save as a group using the cash model. Form the LLC properly, open business bank account, build credit history, identify a property manager. Target: reach $90K in the pool.',
            icon: '💰'
          },
          {
            number: '02',
            title: 'Phase 2 — First Purchase',
            subtitle: 'Bridge Strategy',
            description: 'Use $90K as a 20% down payment on a $400K–$450K property with a basement suite. Both units generate rental income immediately. This gets the group into real estate 3–4 years earlier than waiting for $500K cash.',
            icon: '🏠'
          },
          {
            number: '03',
            title: 'Phase 3 — Snowball Effect',
            subtitle: 'ADU Properties',
            description: 'Rental income from both units plus continued contributions accelerates the next purchase. Target homes with basement suites — more income per dollar spent.',
            icon: '📈'
          },
          {
            number: '04',
            title: 'Phase 4 — Opportunities',
            subtitle: 'Assumable Loans',
            description: 'If a member with strong credit and valid EAD finds an assumable sub-3% loan AND is willing to live in the property — pursue it. Never depend on it as a plan.',
            icon: '🎯'
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

  // Updated chart data with correct values from user
  const wealthData = [
    { year: 1, model1: 174, model2: 174, model3: 177 },
    { year: 2, model1: 355, model2: 377, model3: 425 },
    { year: 3, model1: 574, model2: 743, model3: 742 },
    { year: 4, model1: 789, model2: 1179, model3: 1178 },
    { year: 5, model1: 1013, model2: 1731, model3: 1731 },
    { year: 6, model1: 1329, model2: 2494, model3: 2494 },
    { year: 7, model1: 1595, model2: 3434, model3: 3434 },
    { year: 8, model1: 1990, model2: 4575, model3: 4575 },
    { year: 9, model1: 2305, model2: 5939, model3: 5939 },
    { year: 10, model1: 2790, model2: 7030, model3: 7030 },
    { year: 11, model1: 3160, model2: 8176, model3: 8176 },
    { year: 12, model1: 3747, model2: 9381, model3: 9381 },
    { year: 13, model1: 4398, model2: 10645, model3: 10645 },
    { year: 14, model1: 4884, model2: 11973, model3: 11973 },
    { year: 15, model1: 5660, model2: 13367, model3: 13367 }
  ];

  const homesData = [
    { year: 1, model1: 0, model2: 0, model3: 1 },
    { year: 2, model1: 0, model2: 0, model3: 3 },
    { year: 3, model1: 1, model2: 1, model3: 4 },
    { year: 4, model1: 1, model2: 3, model3: 6 },
    { year: 5, model1: 1, model2: 4, model3: 8 },
    { year: 6, model1: 2, model2: 6, model3: 11 },
    { year: 7, model1: 2, model2: 8, model3: 14 },
    { year: 8, model1: 3, model2: 11, model3: 17 },
    { year: 9, model1: 3, model2: 14, model3: 20 },
    { year: 10, model1: 4, model2: 17, model3: 20 },
    { year: 11, model1: 4, model2: 20, model3: 20 },
    { year: 12, model1: 5, model2: 20, model3: 20 },
    { year: 13, model1: 6, model2: 20, model3: 20 },
    { year: 14, model1: 6, model2: 20, model3: 20 },
    { year: 15, model1: 7, model2: 20, model3: 20 }
  ];

  // Model colors
  const modelColors = ['#3b82f6', '#9333ea', '#10b981']; // Blue, Purple, Green

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Language Toggle */}
      <button
        onClick={toggleLanguage}
        className="fixed top-4 right-4 md:top-6 md:right-6 z-50 bg-navy-800 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-navy-700 transition-colors font-semibold text-sm md:text-base"
        style={{ backgroundColor: '#1e3a5f' }}
      >
        {lang === 'fr' ? '🇬🇧 EN' : '🇫🇷 FR'}
      </button>

      {/* Section 1 - Hero */}
      <section className="pt-20 pb-12 md:pb-16 px-4 bg-gradient-to-br from-navy-900 to-navy-800" style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e3a5f 100%)' }}>
        <div className="max-w-4xl mx-auto text-center text-white">
          <h1 className="text-3xl md:text-5xl font-bold mb-3">{t.hero.title}</h1>
          <h2 className="text-xl md:text-3xl font-semibold mb-6 text-blue-200">{t.hero.subtitle}</h2>
          <p className="text-base md:text-xl mb-8 text-blue-100">{t.hero.description}</p>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 md:p-6 text-left mb-8">
            <p className="text-sm md:text-lg leading-relaxed">{t.hero.intro}</p>
          </div>

          {/* Hero Stats Bar */}
          <div className="grid grid-cols-3 gap-2 md:gap-6 bg-white/20 backdrop-blur-md rounded-xl p-4 md:p-6">
            <div className="text-center">
              <div className="text-2xl md:text-4xl font-bold mb-1 md:mb-2">{t.hero.stats.members.split(' ')[0]}</div>
              <div className="text-xs md:text-sm text-blue-200">{t.hero.stats.members.split(' ').slice(1).join(' ')}</div>
            </div>
            <div className="text-center border-x border-white/30">
              <div className="text-xl md:text-4xl font-bold mb-1 md:mb-2">{t.hero.stats.monthly.split('/')[0]}</div>
              <div className="text-xs md:text-sm text-blue-200">/{t.hero.stats.monthly.split('/')[1]}</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-4xl font-bold mb-1 md:mb-2">{t.hero.stats.horizon.split(' ')[0]}</div>
              <div className="text-xs md:text-sm text-blue-200">{t.hero.stats.horizon.split(' ').slice(1).join(' ')}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2 - Research Methodology */}
      <section className="py-12 md:py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-4xl font-bold text-center mb-8 md:mb-12 text-navy-900" style={{ color: '#0f172a' }}>{t.research.title}</h2>
          <div className="grid md:grid-cols-3 gap-4 md:gap-6">
            {t.research.tools.map((tool, idx) => (
              <div key={idx} className="bg-white rounded-xl shadow-md p-4 md:p-6 hover:shadow-xl transition-shadow">
                <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-3 text-navy-800" style={{ color: '#1e3a5f' }}>{tool.name}</h3>
                <p className="text-xs md:text-sm font-semibold text-blue-600 mb-2 md:mb-3">{tool.role}</p>
                <p className="text-gray-700 text-xs md:text-sm leading-relaxed">{tool.task}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 3 - Three Models */}
      <section className="py-12 md:py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-4xl font-bold text-center mb-8 md:mb-12 text-navy-900" style={{ color: '#0f172a' }}>{t.models.title}</h2>
          <div className="space-y-6 md:space-y-8">
            {[t.models.model1, t.models.model2, t.models.model3].map((model, idx) => (
              <div key={idx} className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl shadow-lg p-4 md:p-6 hover:shadow-2xl transition-shadow border-l-8" style={{ borderLeftColor: modelColors[idx] }}>
                <h3 className="text-lg md:text-2xl font-bold mb-3 md:mb-4 text-navy-800" style={{ color: '#1e3a5f' }}>{model.name}</h3>
                <p className="text-gray-700 mb-4 md:mb-6 leading-relaxed text-sm md:text-base">{model.explanation}</p>

                <div className="grid md:grid-cols-2 gap-4 mb-6">
                  <div>
                    <h4 className="font-semibold text-green-700 mb-2 text-sm md:text-base">{lang === 'fr' ? 'Avantages :' : 'Pros:'}</h4>
                    <ul className="space-y-1">
                      {model.pros.map((pro, i) => (
                        <li key={i} className="text-xs md:text-sm text-gray-700 flex items-start">
                          <span className="text-green-500 mr-2 flex-shrink-0">✓</span>
                          <span>{pro}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-red-700 mb-2 text-sm md:text-base">{lang === 'fr' ? 'Inconvénients :' : 'Cons:'}</h4>
                    <ul className="space-y-1">
                      {model.cons.map((con, i) => (
                        <li key={i} className="text-xs md:text-sm text-gray-700 flex items-start">
                          <span className="text-red-500 mr-2 flex-shrink-0">✗</span>
                          <span>{con}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Per Member Value Breakdown */}
                <div className="bg-white rounded-lg p-4 md:p-6 mb-4 md:mb-6 border border-gray-200">
                  <h4 className="font-bold mb-3 md:mb-4 text-sm md:text-base" style={{ color: modelColors[idx] }}>{t.models.perMemberTitle}</h4>
                  <div className="grid grid-cols-2 gap-2 md:gap-4 text-xs md:text-sm">
                    <div>
                      <div className="text-gray-600">{lang === 'fr' ? 'Votre part immobilier :' : 'Your share of real estate:'}</div>
                      <div className="font-bold text-gray-900">{model.breakdown.realEstate}</div>
                    </div>
                    <div>
                      <div className="text-gray-600">{lang === 'fr' ? 'Votre part cash :' : 'Your share of cash:'}</div>
                      <div className="font-bold text-gray-900">{model.breakdown.cash}</div>
                    </div>
                    <div>
                      <div className="text-gray-600">{lang === 'fr' ? 'Valeur personnelle totale :' : 'Total personal value:'}</div>
                      <div className="font-bold text-green-700 text-base md:text-lg">{model.breakdown.total}</div>
                    </div>
                    <div>
                      <div className="text-gray-600">{lang === 'fr' ? 'Chaque $ investi devint :' : 'Every $ you put in became:'}</div>
                      <div className="font-bold text-blue-700 text-base md:text-lg">{model.breakdown.multiple}</div>
                    </div>
                  </div>
                  {(model.breakdown as any).debtNote && (
                    <div className="mt-3 text-xs md:text-sm text-orange-700 italic">{(model.breakdown as any).debtNote}</div>
                  )}
                </div>

                {/* Key Numbers - Large and Bold */}
                <div className="rounded-lg p-4 md:p-6 text-center shadow-inner" style={{ backgroundColor: modelColors[idx] + '15', borderWidth: '3px', borderStyle: 'solid', borderColor: modelColors[idx] }}>
                  <div className="text-xs md:text-sm font-semibold mb-2" style={{ color: modelColors[idx] }}>
                    {lang === 'fr' ? 'RICHESSE TOTALE ANNÉE 15' : 'TOTAL WEALTH YEAR 15'}
                  </div>
                  <div className="text-3xl md:text-5xl font-black mb-2 md:mb-4" style={{ color: modelColors[idx] }}>
                    {model.totalWealth}
                  </div>
                  <div className="text-xl md:text-3xl font-bold" style={{ color: modelColors[idx] }}>
                    {model.perMember} {lang === 'fr' ? 'par membre' : 'per member'}
                  </div>
                  {(model as any).legalWarning && (
                    <div className="mt-3 md:mt-4 text-xs md:text-sm text-red-700 font-semibold">
                      ⚠️ {(model as any).legalWarning}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 4 - Assumption Loan Reality Check */}
      <section className="py-12 md:py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-4xl font-bold text-center mb-6 md:mb-8 text-navy-900" style={{ color: '#0f172a' }}>{t.assumptionCheck.title}</h2>
          <p className="text-center text-gray-700 mb-6 md:mb-8 text-sm md:text-base px-2">{t.assumptionCheck.intro}</p>

          <div className="bg-white rounded-xl shadow-md p-4 md:p-6 mb-4 md:mb-6">
            <h3 className="text-lg md:text-xl font-bold mb-3 md:mb-4 text-green-700">{lang === 'fr' ? 'Où les deux étaient d\'accord :' : 'Where both agreed:'}</h3>
            <ul className="space-y-2 md:space-y-3">
              {t.assumptionCheck.agreements.map((item, idx) => (
                <li key={idx} className="flex items-start text-gray-700 text-xs md:text-base">
                  <span className="text-green-500 mr-2 md:mr-3 text-lg md:text-xl flex-shrink-0">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-yellow-50 rounded-xl shadow-md p-4 md:p-6 mb-4 md:mb-6 border-2 border-yellow-300">
            <h3 className="text-lg md:text-xl font-bold mb-3 md:mb-4 text-yellow-800">{t.assumptionCheck.disagreements.title}</h3>
            <div className="space-y-2 md:space-y-3 text-gray-700 text-xs md:text-base">
              <p><strong>Copilot:</strong> {t.assumptionCheck.disagreements.copilot}</p>
              <p><strong>Gemini:</strong> {t.assumptionCheck.disagreements.gemini}</p>
              <p className="font-semibold text-yellow-900">{t.assumptionCheck.disagreements.conclusion}</p>
            </div>
          </div>

          <div className="bg-red-50 rounded-xl shadow-md p-4 md:p-6 border-2 border-red-300">
            <p className="text-gray-800 font-semibold leading-relaxed text-xs md:text-base">{t.assumptionCheck.bottomLine}</p>
          </div>
        </div>
      </section>

      {/* Section 5 - Duplex/ADU Strategy */}
      <section className="py-12 md:py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-4xl font-bold text-center mb-6 md:mb-8 text-navy-900" style={{ color: '#0f172a' }}>{t.duplex.title}</h2>
          <p className="text-center text-gray-700 mb-6 md:mb-8 text-sm md:text-lg px-2">{t.duplex.intro}</p>

          <div className="grid md:grid-cols-2 gap-4 md:gap-6 mb-6">
            <div className="bg-blue-50 rounded-xl p-4 md:p-6 shadow-md">
              <h3 className="text-base md:text-lg font-bold mb-2 md:mb-3 text-navy-800" style={{ color: '#1e3a5f' }}>{t.duplex.acquisition.title}</h3>
              <ul className="space-y-1 md:space-y-2">
                {t.duplex.acquisition.items.map((item, idx) => (
                  <li key={idx} className="text-gray-700 text-xs md:text-sm flex items-start">
                    <span className="text-blue-500 mr-2 flex-shrink-0">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-blue-50 rounded-xl p-4 md:p-6 shadow-md">
              <h3 className="text-base md:text-lg font-bold mb-2 md:mb-3 text-navy-800" style={{ color: '#1e3a5f' }}>{t.duplex.income.title}</h3>
              <ul className="space-y-1 md:space-y-2">
                {t.duplex.income.items.map((item, idx) => (
                  <li key={idx} className="text-gray-700 text-xs md:text-sm flex items-start">
                    <span className="text-blue-500 mr-2 flex-shrink-0">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="bg-gray-50 rounded-xl p-4 md:p-6 shadow-md mb-6">
            <h3 className="text-base md:text-lg font-bold mb-2 md:mb-3 text-navy-800" style={{ color: '#1e3a5f' }}>{t.duplex.legal.title}</h3>
            <ul className="space-y-1 md:space-y-2">
              {t.duplex.legal.items.map((item, idx) => (
                <li key={idx} className="text-gray-700 text-xs md:text-sm flex items-start">
                  <span className="text-amber-500 mr-2 flex-shrink-0 text-base">⚠</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* CRITICAL WARNING - Highly Visible */}
          <div className="bg-gradient-to-r from-red-100 to-orange-100 rounded-xl p-6 md:p-8 shadow-2xl border-4 border-red-500 mb-6 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-red-600 via-orange-600 to-red-600"></div>
            <div className="flex items-start gap-3 md:gap-4">
              <div className="text-4xl md:text-6xl flex-shrink-0">⚠️</div>
              <div>
                <h3 className="text-xl md:text-2xl font-black mb-3 md:mb-4 text-red-900">{t.duplex.warningTitle}</h3>
                <p className="text-gray-900 font-semibold leading-relaxed text-sm md:text-base">{t.duplex.warning}</p>
              </div>
            </div>
          </div>

          <div className="bg-green-50 rounded-xl p-4 md:p-6 shadow-md">
            <h3 className="text-base md:text-lg font-bold mb-2 md:mb-3 text-green-800">{t.duplex.snowball.title}</h3>
            <ul className="space-y-1 md:space-y-2">
              {t.duplex.snowball.items.map((item, idx) => (
                <li key={idx} className="text-gray-700 text-xs md:text-sm flex items-start">
                  <span className="text-green-500 mr-2 flex-shrink-0">→</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Section 6 - Numbers Comparison */}
      <section className="py-12 md:py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-4xl font-bold text-center mb-8 md:mb-12 text-navy-900" style={{ color: '#0f172a' }}>{t.comparison.title}</h2>

          {/* Comparison Table - Scrollable on Mobile */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8 md:mb-12">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[600px]">
                <thead>
                  <tr>
                    <th className="px-3 md:px-4 py-3 text-left text-white font-semibold text-xs md:text-base bg-gray-700"></th>
                    <th className="px-3 md:px-4 py-3 text-left text-white font-semibold text-xs md:text-base" style={{ backgroundColor: modelColors[0] }}>{t.comparison.table.headers[1]}</th>
                    <th className="px-3 md:px-4 py-3 text-left text-white font-semibold text-xs md:text-base" style={{ backgroundColor: modelColors[1] }}>{t.comparison.table.headers[2]}</th>
                    <th className="px-3 md:px-4 py-3 text-left text-white font-semibold text-xs md:text-base" style={{ backgroundColor: modelColors[2] }}>{t.comparison.table.headers[3]}</th>
                  </tr>
                </thead>
                <tbody>
                  {t.comparison.table.rows.map((row, idx) => (
                    <tr key={idx} className={idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                      <td className="px-3 md:px-4 py-2 md:py-3 font-semibold text-gray-800 text-xs md:text-base">{row.label}</td>
                      {row.values.map((value, vIdx) => {
                        const shouldHighlight = row.highlight && row.highlight[vIdx];
                        const isDanger = shouldHighlight === 'danger';
                        const isPositive = shouldHighlight === true;

                        return (
                          <td
                            key={vIdx}
                            className={`px-3 md:px-4 py-2 md:py-3 text-xs md:text-base font-semibold ${
                              isDanger ? 'bg-red-100 text-red-900' :
                              isPositive ? 'bg-green-100 text-green-900' :
                              'text-gray-700'
                            }`}
                          >
                            {value}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Wealth Progression Chart */}
          <div className="bg-white rounded-xl shadow-lg p-4 md:p-6 mb-6 md:mb-8">
            <h3 className="text-lg md:text-xl font-bold mb-4 md:mb-6 text-center text-navy-800" style={{ color: '#1e3a5f' }}>
              {lang === 'fr' ? 'Progression de la richesse totale (en milliers $)' : 'Total Wealth Progression (in thousands $)'}
            </h3>
            <ResponsiveContainer width="100%" height={300} className="md:h-[400px]">
              <LineChart data={wealthData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" label={{ value: lang === 'fr' ? 'Année' : 'Year', position: 'insideBottom', offset: -5 }} tick={{ fontSize: 12 }} />
                <YAxis label={{ value: lang === 'fr' ? 'Richesse ($k)' : 'Wealth ($k)', angle: -90, position: 'insideLeft' }} tick={{ fontSize: 12 }} />
                <Tooltip contentStyle={{ fontSize: '12px' }} />
                <Legend wrapperStyle={{ fontSize: '12px' }} />
                <Line type="monotone" dataKey="model1" stroke={modelColors[0]} strokeWidth={3} name={lang === 'fr' ? 'Modèle 1 ($500)' : 'Model 1 ($500)'} />
                <Line type="monotone" dataKey="model2" stroke={modelColors[1]} strokeWidth={3} name={lang === 'fr' ? 'Modèle 2 ($750)' : 'Model 2 ($750)'} />
                <Line type="monotone" dataKey="model3" stroke={modelColors[2]} strokeWidth={3} name={lang === 'fr' ? 'Modèle 3 (Assumable)' : 'Model 3 (Assumable)'} />
              </LineChart>
            </ResponsiveContainer>
            <p className="text-xs md:text-sm text-gray-600 mt-3 md:mt-4 text-center italic px-2">
              {lang === 'fr'
                ? 'Note : Modèle 3 inclut 5,77 M$ de dette à l\'année 15, contrairement aux modèles 1 et 2 (zéro dette)'
                : 'Note: Model 3 includes $5.77M debt at Year 15, unlike Models 1 and 2 (zero debt)'}
            </p>
          </div>

          {/* Homes Owned Chart */}
          <div className="bg-white rounded-xl shadow-lg p-4 md:p-6">
            <h3 className="text-lg md:text-xl font-bold mb-4 md:mb-6 text-center text-navy-800" style={{ color: '#1e3a5f' }}>
              {lang === 'fr' ? 'Nombre de maisons possédées par année' : 'Homes Owned Per Year'}
            </h3>
            <ResponsiveContainer width="100%" height={280} className="md:h-[350px]">
              <LineChart data={homesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" label={{ value: lang === 'fr' ? 'Année' : 'Year', position: 'insideBottom', offset: -5 }} tick={{ fontSize: 12 }} />
                <YAxis label={{ value: lang === 'fr' ? 'Maisons' : 'Homes', angle: -90, position: 'insideLeft' }} tick={{ fontSize: 12 }} />
                <Tooltip contentStyle={{ fontSize: '12px' }} />
                <Legend wrapperStyle={{ fontSize: '12px' }} />
                <Line type="stepAfter" dataKey="model1" stroke={modelColors[0]} strokeWidth={3} name={lang === 'fr' ? 'Modèle 1' : 'Model 1'} />
                <Line type="stepAfter" dataKey="model2" stroke={modelColors[1]} strokeWidth={3} name={lang === 'fr' ? 'Modèle 2' : 'Model 2'} />
                <Line type="stepAfter" dataKey="model3" stroke={modelColors[2]} strokeWidth={3} name={lang === 'fr' ? 'Modèle 3' : 'Model 3'} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>

      {/* Section 7 - Recommendation - Visual Roadmap */}
      <section className="py-12 md:py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-4xl font-bold text-center mb-8 md:mb-12 text-navy-900" style={{ color: '#0f172a' }}>{t.recommendation.title}</h2>

          {/* Visual Roadmap */}
          <div className="relative space-y-4 md:space-y-6 mb-6 md:mb-8">
            {/* Connecting Line */}
            <div className="hidden md:block absolute left-12 top-16 bottom-16 w-1 bg-gradient-to-b from-blue-300 via-indigo-400 to-purple-500"></div>

            {t.recommendation.phases.map((phase, idx) => (
              <div key={idx} className="relative">
                <div className={`rounded-xl shadow-lg p-4 md:p-6 ml-0 md:ml-24 transition-all hover:shadow-2xl hover:scale-[1.02]`}
                     style={{
                       background: `linear-gradient(135deg, ${
                         idx === 0 ? '#dbeafe' :
                         idx === 1 ? '#e0e7ff' :
                         idx === 2 ? '#f3e8ff' :
                         '#fae8ff'
                       } 0%, white 100%)`,
                       borderLeft: `6px solid ${
                         idx === 0 ? '#3b82f6' :
                         idx === 1 ? '#6366f1' :
                         idx === 2 ? '#8b5cf6' :
                         '#a855f7'
                       }`
                     }}>
                  {/* Phase Number Circle */}
                  <div className="absolute -left-3 md:-left-16 top-4 md:top-6 w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center text-white font-black text-lg md:text-2xl shadow-lg"
                       style={{
                         backgroundColor: idx === 0 ? '#3b82f6' : idx === 1 ? '#6366f1' : idx === 2 ? '#8b5cf6' : '#a855f7'
                       }}>
                    {phase.number}
                  </div>

                  {/* Icon */}
                  <div className="absolute -top-2 -right-2 md:-top-3 md:-right-3 text-3xl md:text-5xl">{phase.icon}</div>

                  <div className="pl-10 md:pl-0">
                    <h3 className="text-base md:text-xl font-bold mb-1 md:mb-2 text-navy-800" style={{ color: '#1e3a5f' }}>{phase.title}</h3>
                    <div className="text-xs md:text-sm text-gray-600 mb-2 md:mb-3 font-semibold">{phase.subtitle}</div>
                    <p className="text-gray-700 leading-relaxed text-xs md:text-base">{phase.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl shadow-md p-4 md:p-6 border-2 border-green-400">
            <p className="text-gray-800 font-semibold leading-relaxed text-center text-xs md:text-base">{t.recommendation.callout}</p>
          </div>
        </div>
      </section>

      {/* Section 8 - Next Steps */}
      <section className="py-12 md:py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-4xl font-bold text-center mb-8 md:mb-12 text-navy-900" style={{ color: '#0f172a' }}>{t.nextSteps.title}</h2>

          <div className="bg-white rounded-xl shadow-lg p-4 md:p-8">
            <ol className="space-y-3 md:space-y-4">
              {t.nextSteps.steps.map((step, idx) => (
                <li key={idx} className="flex items-start gap-3 md:gap-4">
                  <span className="flex-shrink-0 w-7 h-7 md:w-8 md:h-8 bg-navy-800 text-white rounded-full flex items-center justify-center font-bold text-sm md:text-base" style={{ backgroundColor: '#1e3a5f' }}>
                    {idx + 1}
                  </span>
                  <span className="text-gray-700 pt-0.5 md:pt-1 text-xs md:text-base">{step}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 md:py-8 bg-navy-900 text-white text-center" style={{ backgroundColor: '#0f172a' }}>
        <p className="text-xs md:text-sm">{t.footer}</p>
      </footer>
    </div>
  );
}
