// Atlanta TechBio Ecosystem Network Data
// This file contains comprehensive data about the Atlanta TechBio ecosystem
// extracted from research documents and should replace the sample data in NetworkVisualization.js

export const atlantaTechBioEcosystem = {
  nodes: [
    // UNIVERSITIES & RESEARCH INSTITUTIONS
    {
      id: "emory",
      name: "Emory University",
      type: "university",
      size: 25,
      description: "Leading private research university with $485M NIH funding, major biotech spinout source",
      website: "https://emory.edu",
      keyPersonnel: ["Dennis Liotta", "Nicholas Boulis", "Mike Cassidy"],
      funding: "$485M NIH (2023)",
      recentNews: "Launched BioFoundry Institute, multiple recent spinouts including Brain Trust Bio"
    },
    {
      id: "gatech",
      name: "Georgia Tech",
      type: "university", 
      size: 23,
      description: "Public research university, bioengineering powerhouse, CREATE-X accelerator, Science Square",
      website: "https://gatech.edu",
      keyPersonnel: ["Mark Prausnitz", "Raghupathy Sivakumar"],
      funding: "N/A (academic)",
      recentNews: "Completed $100M+ Science Square Phase 1, CREATE-X had 318 founders in 2024"
    },
    {
      id: "morehouse",
      name: "Morehouse School of Medicine",
      type: "university",
      size: 15,
      description: "Historically Black medical school, health equity research focus",
      website: "https://msm.edu",
      keyPersonnel: ["Valerie Montgomery Rice"],
      funding: "N/A (academic)",
      recentNews: "Celebrating 50 years of advancing health equity (2025)"
    },
    {
      id: "uga",
      name: "University of Georgia",
      type: "university",
      size: 18,
      description: "Public flagship with veterinary medicine, pharmacy strengths",
      website: "https://uga.edu",
      keyPersonnel: ["Jere W. Morehead"],
      funding: "N/A (academic)",
      recentNews: "Partner in statewide biotech initiatives via GRA"
    },
    {
      id: "gsu",
      name: "Georgia State University",
      type: "university",
      size: 16,
      description: "Growing biomedical research in infectious disease and neuroscience",
      website: "https://gsu.edu",
      keyPersonnel: ["M. Brian Blake"],
      funding: "N/A (academic)",
      recentNews: "Part of NIH-funded antivirals center with Emory"
    },
    {
      id: "augusta_university",
      name: "Augusta University",
      type: "university",
      size: 15,
      description: "Medical College of Georgia, clinical trial networks, statewide campuses",
      website: "https://augusta.edu",
      keyPersonnel: ["Brooks A. Keel"],
      funding: "N/A (academic)",
      recentNews: "Clinical trial networks, partners with CDC on public health"
    },
    {
      id: "cdc",
      name: "CDC",
      type: "government",
      size: 20,
      description: "Nation's premier public health institute, 200+ labs, Advanced Molecular Detection Initiative",
      website: "https://cdc.gov",
      keyPersonnel: ["Dr. Mandy K. Cohen"],
      funding: "N/A (government)",
      recentNews: "Headquarters expanding, industry partnerships for diagnostic validation"
    },

    // MAJOR COMPANIES - CLINICAL STAGE
    {
      id: "inhibikase",
      name: "Inhibikase Therapeutics",
      type: "company",
      size: 18,
      description: "Clinical-stage biotech, Parkinson's and cancer focus, potential $275M financing",
      website: "https://inhibikase.com",
      keyPersonnel: ["Mark Iwicki", "Amit Munshi"],
      funding: "Public (NASDAQ: IKT), potential $275M",
      recentNews: "Underwent leadership transformation, Soleus Capital lead investor"
    },
    {
      id: "geovax",
      name: "GeoVax Labs",
      type: "company",
      size: 15,
      description: "Clinical-stage vaccine developer (HIV, Ebola, Zika, COVID-19)",
      website: "https://geovax.com",
      keyPersonnel: ["David Dodd"],
      funding: "Public (NASDAQ: GOVX)",
      recentNews: "Phase 2 COVID-19 vaccine trials, federal grants for pan-coronavirus vaccines"
    },
    {
      id: "micron",
      name: "Micron Biomedical",
      type: "company",
      size: 16,
      description: "Microneedle patch technology for painless vaccine delivery",
      website: "https://micronbiomedical.com",
      keyPersonnel: ["Steven Damon", "Mark Prausnitz"],
      funding: "Series A ($14M), $43M total from Gates Foundation",
      recentNews: "First-in-human influenza vaccination trial completed"
    },
    {
      id: "neurop",
      name: "NeurOp Inc.",
      type: "company",
      size: 14,
      description: "NMDA receptor modulators for CNS disorders, Emory spinout",
      website: "http://neuropinc.com",
      keyPersonnel: ["James McNamara", "Raymond Dingledine"],
      funding: "Clinical stage (Phase 1)",
      recentNews: "NP10679 in Phase 1 trials for stroke-related brain injury"
    },
    {
      id: "antios",
      name: "Antios Therapeutics",
      type: "company",
      size: 15,
      description: "Novel therapies for hepatitis B virus infection",
      website: "https://antiostherapeutics.com",
      keyPersonnel: ["Abel De La Rosa"],
      funding: "Phase 2/Series B (~$100M raised)",
      recentNews: "Promising Phase 2 data, aiming for HBV functional cure"
    },

    // GROWTH COMPANIES
    {
      id: "sharecare",
      name: "Sharecare",
      type: "company",
      size: 20,
      description: "Digital health platform, acquired by Altaris for $518M",
      website: "https://sharecare.com",
      keyPersonnel: ["Jeff Arnold"],
      funding: "Acquired ($518M by Altaris, 2024)",
      recentNews: "Major ecosystem exit success, AI health assistant launched"
    },
    {
      id: "florence",
      name: "Florence Healthcare",
      type: "company",
      size: 17,
      description: "Clinical trial operations software, 10,000+ study sites globally",
      website: "https://florencehc.com",
      keyPersonnel: ["Ryan Jones"],
      funding: "Series C ($27M+ raised)",
      recentNews: "Leader in electronic Trial Master File solutions"
    },
    {
      id: "clearside",
      name: "Clearside Biomedical",
      type: "company",
      size: 16,
      description: "Eye disease therapies using suprachoroidal injection platform",
      website: "https://clearsidebio.com",
      keyPersonnel: ["George Yeh", "Mark Prausnitz"],
      funding: "Public (NASDAQ: CLSD)",
      recentNews: "Positive Phase 1/2 ocular cancer therapy results"
    },
    {
      id: "vero",
      name: "VERO Biotech",
      type: "company",
      size: 17,
      description: "Inhaled nitric oxide delivery systems, FDA-approved Genosyl®",
      website: "https://verobiotech.com",
      keyPersonnel: ["Brent Vossell"],
      funding: "Commercial (Approved Product)",
      recentNews: "New Science Square facility, next-gen NO delivery development"
    },
    {
      id: "artivion",
      name: "Artivion",
      type: "company",
      size: 18,
      description: "Cardiac/vascular surgery products, heart valves and tissue grafts",
      website: "https://artivion.com",
      keyPersonnel: ["Pat Mackin"],
      funding: "Public (NYSE: AORT)",
      recentNews: "Next-gen mechanical heart valve launched in Europe"
    },

    // VENTURE CAPITAL & INVESTORS
    {
      id: "portal",
      name: "Portal Innovations",
      type: "vc",
      size: 20,
      description: "Life sciences venture development, $100M fund, 33K sq ft at Science Square",
      website: "https://portalinnovations.com",
      keyPersonnel: ["John Flavin", "Suna Lumeh"],
      funding: "VC ($25M of $100M fund invested)",
      recentNews: "First Atlanta investment in Moonlight Therapeutics, Novo Nordisk partnership"
    },
    {
      id: "catalyst",
      name: "Catalyst by Wellstar",
      type: "vc",
      size: 18,
      description: "$100M healthcare innovation fund, 50+ investments over 5 years",
      website: "https://catalyst.wellstar.org",
      keyPersonnel: ["Hank Capps", "Jaimie Clark", "Stefanie Diaz"],
      funding: "Venture Fund ($100M)",
      recentNews: "21 current investments, Wellstar pilot opportunities"
    },
    {
      id: "bip",
      name: "BIP Ventures",
      type: "vc",
      size: 16,
      description: "Multi-stage VC with healthcare practice, 246 co-investors",
      website: "https://bipventures.vc",
      keyPersonnel: ["Austin Poole", "Tami McQueen"],
      funding: "VC (Seed to Series B)",
      recentNews: "Portfolio includes The Rounds, OncoLens"
    },
    {
      id: "noro",
      name: "Noro-Moseley Partners",
      type: "vc",
      size: 15,
      description: "Atlanta's oldest VC firm, Series A/B healthcare IT focus",
      website: "https://noromoseley.com",
      keyPersonnel: ["Ryan Collins"],
      funding: "VC (Series A/B, $10-20M typical)",
      recentNews: "Backed Sharecare, QGenda, Florence Healthcare growth"
    },
    {
      id: "gra_fund",
      name: "GRA Venture Fund",
      type: "vc",
      size: 14,
      description: "$7.5M evergreen fund for university spinouts, 3:1 leverage",
      website: "https://graventurefund.org",
      keyPersonnel: ["H. Lee Herron"],
      funding: "VC (Seed/Series A)",
      recentNews: "Backed Micron Biomedical Series A, university spinout focus"
    },
    {
      id: "atlanta_ventures",
      name: "Atlanta Ventures",
      type: "vc",
      size: 13,
      description: "Venture studio and seed fund, B2B SaaS and digital health",
      website: "https://atlantaventures.com",
      keyPersonnel: ["Kathryn O'Day"],
      funding: "VC (Seed)",
      recentNews: "Healthcare SaaS portfolio, Atlanta Healthcare Meetup host"
    },
    {
      id: "engage_ventures",
      name: "Engage Ventures",
      type: "vc",
      size: 14,
      description: "Corporate-backed VC (Coca-Cola, UPS), healthtech/AI focus",
      website: "",
      keyPersonnel: [],
      funding: "VC (Early-stage)",
      recentNews: "Mentorship at CREATE-X Demo Day, corporate partnerships"
    },
    {
      id: "tech_square_ventures",
      name: "Tech Square Ventures",
      type: "vc",
      size: 15,
      description: "Early-stage VC investing in tech and biotech",
      website: "https://techsquareventures.com",
      keyPersonnel: ["Blake Patton"],
      funding: "VC (Early-stage)",
      recentNews: "Invested in Clearside Biomedical, tech square ecosystem"
    },

    // ACCELERATORS & INCUBATORS
    {
      id: "atdc",
      name: "ATDC",
      type: "incubator",
      size: 18,
      description: "Georgia Tech's 44-year-old incubator, 150+ companies, HealthTech track, Wellstar partnership",
      website: "https://atdc.org",
      keyPersonnel: ["John Avery"],
      funding: "N/A (program)",
      recentNews: "Alumni include Pindrop, Greenlight, Cardlytics; $125M+ SBIR secured"
    },
    {
      id: "create_x",
      name: "CREATE-X",
      type: "incubator",
      size: 16,
      description: "Georgia Tech entrepreneurship, 650+ startups created, Startup Launch ($5K + $30K services)",
      website: "https://create-x.gatech.edu",
      keyPersonnel: ["Raghupathy Sivakumar"],
      funding: "Pre-seed funding ($5K cash + $30K services)",
      recentNews: "Expanded AI Health track, includes Stord, Oxos alumni"
    },
    {
      id: "biolocity",
      name: "Biolocity",
      type: "incubator",
      size: 15,
      description: "Emory-Georgia Tech medtech accelerator, $1.5M+ yearly funding, prototyping support",
      website: "https://biolocity.gatech.edu",
      keyPersonnel: ["Tiffany Wilson"],
      funding: "Grant funding (~$1.5M annual)",
      recentNews: "Co-managed by Emory/GT, strong university IP ties"
    },
    {
      id: "science_square",
      name: "Science Square",
      type: "facility",
      size: 19,
      description: "368K sq ft biotech research park at Georgia Tech, Phase 1 completed 2024",
      website: "https://sciencesquareatlanta.com",
      keyPersonnel: ["Georgia Advanced Technology Ventures"],
      funding: "N/A (facility)",
      recentNews: "Phase 1 completed, Portal Innovations and VERO as anchor tenants"
    },
    {
      id: "gcmi",
      name: "GCMI",
      type: "incubator",
      size: 14,
      description: "Medtech incubator, design/prototyping center, T3 Labs animal testing",
      website: "https://gcmiatl.com",
      keyPersonnel: ["Tiffany Wilson"],
      funding: "N/A (non-profit)",
      recentNews: "FDA partnerships, COVID-19 device acceleration"
    },

    // GOVERNMENT & TRADE ORGANIZATIONS
    {
      id: "gra",
      name: "Georgia Research Alliance",
      type: "government",
      size: 17,
      description: "Public-private partnership, $2.3B equity investment since 1990",
      website: "https://gra.org",
      keyPersonnel: ["Susan Shows"],
      funding: "Seed grants & venture fund",
      recentNews: "Three-phase funding structure, university commercialization support"
    },
    {
      id: "georgia_bio",
      name: "Georgia Life Sciences",
      type: "trade",
      size: 15,
      description: "State trade association, 500+ member companies, Golden Helix Awards",
      website: "https://gabio.org",
      keyPersonnel: ["Maria Thacker-Goethe"],
      funding: "N/A (non-profit)",
      recentNews: "Advocacy for lab space, Atlanta biotech 'inflection point'"
    },
    {
      id: "rowen",
      name: "Rowen Foundation",
      type: "development",
      size: 16,
      description: "2,000-acre innovation district, 22M sq ft over 30 years, 80K+ jobs",
      website: "https://rowenlife.com",
      keyPersonnel: ["Mason Ailstock"],
      funding: "N/A (non-profit)",
      recentNews: "Site infrastructure groundbreaking 2024, biotech/ag/environmental focus"
    },
    {
      id: "atlanta_tech_angels",
      name: "Atlanta Technology Angels",
      type: "vc",
      size: 12,
      description: "Early-stage tech and biotech angel network with clear regulatory paths focus",
      website: "https://angelatlanta.com",
      keyPersonnel: [],
      funding: "Angel Group",
      recentNews: "Active in biotech early-stage investments"
    },
    {
      id: "metro_atlanta_chamber",
      name: "Metro Atlanta Chamber",
      type: "trade",
      size: 13,
      description: "Economic development organization promoting life sciences growth",
      website: "https://www.metroatlantachamber.com",
      keyPersonnel: [],
      funding: "N/A (non-profit)",
      recentNews: "Life sciences economic development initiatives"
    },
    {
      id: "georgia_ecd",
      name: "Georgia Department of Economic Development",
      type: "government",
      size: 14,
      description: "State economic development, biotech incentives and support",
      website: "https://www.georgia.org",
      keyPersonnel: [],
      funding: "N/A (government)",
      recentNews: "Biotech incentive programs and corporate attraction"
    },

    // SERVICE PROVIDERS & SUPPORT
    {
      id: "mng_labs",
      name: "MNG Laboratories",
      type: "serviceProvider",
      size: 12,
      description: "Clinical reference lab specializing in neurological genetic testing",
      website: "https://mnglabs.com",
      keyPersonnel: ["Trevor Wingard"],
      funding: "Established (Private)",
      recentNews: "Whole genome sequencing panels for rare neurodegenerative diseases"
    },
    {
      id: "radyus",
      name: "Radyus Research",
      type: "serviceProvider",
      size: 13,
      description: "Boutique preclinical CRO, grant writing, project management",
      website: "https://radyus.com",
      keyPersonnel: ["Phil Ashurst"],
      funding: "Private (Consulting)",
      recentNews: "Growing client base, helped biotechs win SBIR grants in 2023"
    },
    {
      id: "akesogen",
      name: "AKESOgen",
      type: "serviceProvider",
      size: 12,
      description: "Genomics and bioinformatics CRO, acquired by Tempus Labs",
      website: "https://akesogen.com",
      keyPersonnel: ["Mark Bouzyk"],
      funding: "Private (Acquired)",
      recentNews: "Integrated into Tempus, expanding sequencing capacity"
    },
    {
      id: "king_spalding",
      name: "King & Spalding",
      type: "serviceProvider",
      size: 11,
      description: "Global law firm with renowned FDA regulatory and life sciences practice",
      website: "https://kslaw.com",
      keyPersonnel: ["Mark Brown"],
      funding: "N/A (Legal)",
      recentNews: "Tier-1 FDA law ranking, expanded IP litigation team 2024"
    },
    {
      id: "kilpatrick_townsend",
      name: "Kilpatrick Townsend & Stockton",
      type: "serviceProvider",
      size: 13,
      description: "Leading IP and life sciences law firm, serves 60% of ATDC startups",
      website: "https://ktslaw.com",
      keyPersonnel: [],
      funding: "N/A (Legal)",
      recentNews: "Major IP and biotech law practice in Atlanta"
    },
    {
      id: "wilson_sonsini",
      name: "Wilson Sonsini",
      type: "serviceProvider",
      size: 12,
      description: "Leading life sciences law firm with Atlanta presence",
      website: "https://www.wsgr.com",
      keyPersonnel: [],
      funding: "N/A (Legal)",
      recentNews: "Represents life sciences companies in Atlanta ecosystem"
    },
    {
      id: "latham_watkins",
      name: "Latham & Watkins",
      type: "serviceProvider",
      size: 12,
      description: "Global firm with life sciences practice",
      website: "https://www.lw.com",
      keyPersonnel: [],
      funding: "N/A (Legal)",
      recentNews: "Life sciences legal services in Atlanta"
    },
    {
      id: "cooley",
      name: "Cooley",
      type: "serviceProvider",
      size: 12,
      description: "Known for biotech startup representation",
      website: "https://www.cooley.com",
      keyPersonnel: [],
      funding: "N/A (Legal)",
      recentNews: "Major biotech legal practice"
    },
    {
      id: "biotechexec",
      name: "BiotechExec",
      type: "serviceProvider",
      size: 10,
      description: "Biotech and medtech consulting firm",
      website: "https://biotechexec.com",
      keyPersonnel: ["Richard Otto"],
      funding: "N/A (Consulting)",
      recentNews: "Strategic consulting for biotech startups"
    },
    {
      id: "mckinsey_atlanta",
      name: "McKinsey & Company",
      type: "serviceProvider",
      size: 14,
      description: "Global consulting with life sciences practice in Atlanta",
      website: "https://www.mckinsey.com",
      keyPersonnel: [],
      funding: "N/A (Consulting)",
      recentNews: "Life sciences and healthcare consulting"
    },
    {
      id: "deloitte_atlanta",
      name: "Deloitte",
      type: "serviceProvider",
      size: 14,
      description: "AI compliance and healthcare consulting, Atlas AI™ platform",
      website: "https://www.deloitte.com",
      keyPersonnel: [],
      funding: "N/A (Consulting)",
      recentNews: "NVIDIA-powered compliance consulting"
    },
    {
      id: "iqvia_atlanta",
      name: "IQVIA",
      type: "serviceProvider",
      size: 15,
      description: "Global CRO with Atlanta office, clinical research and consulting",
      website: "https://www.iqvia.com",
      keyPersonnel: [],
      funding: "N/A (CRO)",
      recentNews: "Partnerships with CDC on real-world data"
    },
    {
      id: "peachtree_bio",
      name: "Peachtree BioResearch Solutions",
      type: "serviceProvider",
      size: 11,
      description: "Full-service CRO based in Atlanta, clinical trial support",
      website: "https://www.peachtreebrs.com",
      keyPersonnel: [],
      funding: "N/A (CRO)",
      recentNews: "Regional clinical trial services"
    },
    {
      id: "acrc",
      name: "Atlanta Clinical Research Centers",
      type: "serviceProvider",
      size: 11,
      description: "Regional CRO specializing in cardiology and metabolics",
      website: "http://atlantaclinicalresearch.com",
      keyPersonnel: [],
      funding: "N/A (CRO)",
      recentNews: "Specialized clinical research services"
    },

    // EMERGING STARTUPS
    {
      id: "moonlight",
      name: "Moonlight Therapeutics",
      type: "company",
      size: 10,
      description: "Skin patch immunotherapy for food allergies, Georgia Tech spinout",
      website: "https://moonlighttx.com",
      keyPersonnel: ["Samir Patel"],
      funding: "Preclinical",
      recentNews: "FDA Fast Track designation for peanut allergy patch"
    },
    {
      id: "sanguina",
      name: "Sanguina",
      type: "company",
      size: 11,
      description: "Smartphone app for anemia screening, FDA Breakthrough Device",
      website: "https://sanguina.com",
      keyPersonnel: ["Erika Tyburski"],
      funding: "Series A (~$4.2M)",
      recentNews: "AnemoCheck Mobile FDA Breakthrough Device designation"
    },
    {
      id: "oxos",
      name: "OXOS Medical",
      type: "company",
      size: 12,
      description: "Portable X-ray imaging systems, CREATE-X/Georgia Tech spinout",
      website: "https://oxos.com",
      keyPersonnel: ["Greg Kolovich", "Evan Ruff"],
      funding: "Series A ($23M)",
      recentNews: "FDA-cleared Micro C handheld X-ray, VA partnership"
    },
    {
      id: "altesa",
      name: "Altesa BioSciences",
      type: "company",
      size: 12,
      description: "Antiviral drugs for respiratory viruses, $35M Series A, Emory DRIVE spinout",
      website: "https://altesabio.com",
      keyPersonnel: ["George Painter", "Dennis Liotta"],
      funding: "Series A ($35M)",
      recentNews: "Partnership with Vaxart for oral RSV antiviral"
    },
    {
      id: "braintrust",
      name: "BrainTrust Bio",
      type: "company",
      size: 10,
      description: "CNS drug delivery improvements, Emory spinout",
      website: "https://braintrustbio.com",
      keyPersonnel: [],
      funding: "Early-stage",
      recentNews: "Improving drug delivery for CNS diseases"
    },
    {
      id: "arbor_bio",
      name: "Arbor Biotechnologies",
      type: "company",
      size: 11,
      description: "Gene editing technologies, AI-driven drug discovery",
      website: "",
      keyPersonnel: [],
      funding: "Early-stage",
      recentNews: "CREATE-X/ATDC incubatee focusing on gene editing"
    },
    {
      id: "siphox",
      name: "SiPhox",
      type: "company",
      size: 10,
      description: "Wearable diagnostics platform",
      website: "",
      keyPersonnel: [],
      funding: "Early-stage",
      recentNews: "Developing AI-powered wearable diagnostic devices"
    },
    {
      id: "macrogenics",
      name: "MacroGenics",
      type: "company",
      size: 16,
      description: "Cancer therapeutics, growth-stage biotech",
      website: "",
      keyPersonnel: [],
      funding: "Growth-stage",
      recentNews: "ATDC alumni focused on cancer immunotherapy"
    },
    {
      id: "greenlight",
      name: "Greenlight",
      type: "company",
      size: 14,
      description: "Fintech-health intersection, regulatory technology",
      website: "",
      keyPersonnel: [],
      funding: "Growth-stage",
      recentNews: "ATDC alumni in fintech-healthcare space"
    },
    {
      id: "cove_tool",
      name: "Cove.Tool",
      type: "company",
      size: 12,
      description: "Healthcare SaaS, AI analytics for healthcare operations",
      website: "",
      keyPersonnel: [],
      funding: "Growth-stage",
      recentNews: "Healthcare AI analytics platform"
    }
  ],

  links: [
    // UNIVERSITY COLLABORATIONS
    { source: "emory", target: "gatech", strength: 0.9, type: "collaboration", description: "20+ year Coulter Department joint program" },
    { source: "emory", target: "gsu", strength: 0.6, type: "collaboration", description: "NIH antivirals center partnership" },
    { source: "emory", target: "cdc", strength: 0.7, type: "collaboration", description: "Public health research partnerships" },
    { source: "gatech", target: "morehouse", strength: 0.5, type: "collaboration", description: "Georgia CTSA alliance" },
    { source: "emory", target: "morehouse", strength: 0.5, type: "collaboration", description: "Georgia CTSA alliance" },
    { source: "uga", target: "gra", strength: 0.8, type: "funding", description: "GRA university partner" },

    // UNIVERSITY SPINOUTS
    { source: "emory", target: "neurop", strength: 0.8, type: "spinout", description: "Emory faculty founded" },
    { source: "emory", target: "inhibikase", strength: 0.7, type: "spinout", description: "Originated from Emory research" },
    { source: "emory", target: "geovax", strength: 0.7, type: "spinout", description: "Founded on Emory vaccine technology" },
    { source: "emory", target: "altesa", strength: 0.8, type: "spinout", description: "DRIVE/DRiVE spinout" },
    { source: "emory", target: "braintrust", strength: 0.8, type: "spinout", description: "Emory spinout" },
    { source: "gatech", target: "micron", strength: 0.9, type: "spinout", description: "Georgia Tech technology" },
    { source: "gatech", target: "clearside", strength: 0.8, type: "spinout", description: "Based on GT/Emory microneedle tech" },
    { source: "gatech", target: "moonlight", strength: 0.7, type: "spinout", description: "GT Capstone project spinout" },
    { source: "gatech", target: "sanguina", strength: 0.7, type: "spinout", description: "GT/Emory student founded" },
    { source: "gatech", target: "oxos", strength: 0.8, type: "spinout", description: "CREATE-X/Georgia Tech spinout" },

    // VENTURE CAPITAL INVESTMENTS
    { source: "portal", target: "moonlight", strength: 0.8, type: "investment", description: "First Atlanta investment" },
    { source: "gra_fund", target: "micron", strength: 0.8, type: "investment", description: "Series A participation" },
    { source: "bip", target: "florence", strength: 0.7, type: "investment", description: "Growth funding" },
    { source: "noro", target: "sharecare", strength: 0.8, type: "investment", description: "Major portfolio company" },
    { source: "catalyst", target: "atdc", strength: 0.7, type: "partnership", description: "15-company pipeline collaboration" },
    { source: "tech_square_ventures", target: "clearside", strength: 0.8, type: "investment", description: "Early investment in GT spinout" },
    { source: "gra_fund", target: "biolocity", strength: 0.6, type: "funding", description: "Co-invests with Biolocity projects" },
    { source: "engage_ventures", target: "create_x", strength: 0.6, type: "partnership", description: "Mentorship at CREATE-X Demo Day" },
    { source: "atlanta_tech_angels", target: "gra_fund", strength: 0.5, type: "collaboration", description: "Frequent co-investors" },

    // FACILITY RELATIONSHIPS
    { source: "science_square", target: "portal", strength: 0.9, type: "tenant", description: "33K sq ft anchor tenant" },
    { source: "science_square", target: "vero", strength: 0.8, type: "tenant", description: "Manufacturing facility" },
    { source: "gatech", target: "science_square", strength: 0.9, type: "development", description: "Adjacent to campus" },
    { source: "atdc", target: "gatech", strength: 0.9, type: "affiliation", description: "GT's incubator" },
    { source: "create_x", target: "gatech", strength: 0.9, type: "affiliation", description: "GT entrepreneurship program" },
    { source: "biolocity", target: "emory", strength: 0.8, type: "collaboration", description: "Emory-GT collaboration" },
    { source: "biolocity", target: "gatech", strength: 0.8, type: "collaboration", description: "Emory-GT collaboration" },

    // ACCELERATOR RELATIONSHIPS
    { source: "atdc", target: "sanguina", strength: 0.7, type: "support", description: "ATDC portfolio company" },
    { source: "gcmi", target: "clearside", strength: 0.6, type: "support", description: "Early device development support" },
    { source: "biolocity", target: "sanguina", strength: 0.7, type: "support", description: "Coulter program support" },
    { source: "create_x", target: "oxos", strength: 0.8, type: "support", description: "CREATE-X incubatee" },
    { source: "create_x", target: "arbor_bio", strength: 0.7, type: "support", description: "CREATE-X/ATDC incubatee" },
    { source: "atdc", target: "macrogenics", strength: 0.6, type: "support", description: "ATDC alumni" },
    { source: "atdc", target: "greenlight", strength: 0.6, type: "support", description: "ATDC alumni" },

    // PARTNERSHIP RELATIONSHIPS
    { source: "portal", target: "catalyst", strength: 0.6, type: "partnership", description: "Novo Nordisk Pathbreakers Program" },
    { source: "micron", target: "cdc", strength: 0.7, type: "partnership", description: "Global health vaccine applications" },
    { source: "oxos", target: "cdc", strength: 0.5, type: "partnership", description: "VA deployment partnership" },

    // SERVICE PROVIDER RELATIONSHIPS
    { source: "radyus", target: "emory", strength: 0.5, type: "service", description: "Academic founder support" },
    { source: "king_spalding", target: "vero", strength: 0.4, type: "service", description: "FDA regulatory counsel" },
    { source: "mng_labs", target: "emory", strength: 0.4, type: "service", description: "Genetic testing services" },
    { source: "akesogen", target: "cdc", strength: 0.5, type: "service", description: "Genomics services" },
    { source: "kilpatrick_townsend", target: "atdc", strength: 0.6, type: "service", description: "Serves 60% of ATDC startups" },
    { source: "biotechexec", target: "biolocity", strength: 0.4, type: "service", description: "Consulting for biotech startups" },
    { source: "iqvia_atlanta", target: "cdc", strength: 0.6, type: "partnership", description: "Real-world data partnerships" },
    { source: "peachtree_bio", target: "emory", strength: 0.4, type: "service", description: "Clinical trial support" },
    { source: "acrc", target: "augusta_university", strength: 0.4, type: "service", description: "Regional clinical research" },
    { source: "deloitte_atlanta", target: "gatech", strength: 0.4, type: "service", description: "AI compliance consulting" },

    // CROSS-COMPANY COLLABORATIONS
    { source: "sharecare", target: "florence", strength: 0.3, type: "industry", description: "Digital health ecosystem" },
    { source: "clearside", target: "micron", strength: 0.4, type: "technology", description: "Shared Prausnitz technology base" },
    { source: "neurop", target: "inhibikase", strength: 0.3, type: "industry", description: "CNS therapeutics focus" },

    // GOVERNMENT/TRADE CONNECTIONS
    { source: "gra", target: "emory", strength: 0.8, type: "funding", description: "Major university partner" },
    { source: "gra", target: "gatech", strength: 0.8, type: "funding", description: "Major university partner" },
    { source: "georgia_bio", target: "vero", strength: 0.4, type: "membership", description: "Trade association member" },
    { source: "georgia_bio", target: "geovax", strength: 0.4, type: "membership", description: "Trade association member" },
    { source: "rowen", target: "science_square", strength: 0.5, type: "development", description: "Future biotech infrastructure" }
  ]
};

// Node type mappings for filtering
export const nodeTypeMap = {
  company: 'companies',
  university: 'universities',
  incubator: 'incubators', 
  vc: 'vcs',
  serviceProvider: 'serviceProviders',
  government: 'government',
  trade: 'trade',
  development: 'development',
  facility: 'facilities'
};

// Color scheme for different node types
export const nodeColors = {
  university: "#667eea",      // Blue
  company: "#764ba2",         // Purple  
  incubator: "#f093fb",       // Pink
  vc: "#4facfe",             // Light blue
  serviceProvider: "#43e97b", // Green
  government: "#feca57",      // Yellow
  trade: "#ff9ff3",          // Light pink
  development: "#54a0ff",     // Bright blue
  facility: "#5f27cd"        // Dark purple
};