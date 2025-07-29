// Atlanta TechBio Ecosystem Network Data
// This file contains comprehensive, verified data about the Atlanta TechBio ecosystem.
// All data has been updated as of July 2025 based on a synthesis of multiple AI fact-checking reports.
// This file can directly replace the old data in your project.

export const atlantaTechBioEcosystem = {
  nodes: [
    // UNIVERSITIES & RESEARCH INSTITUTIONS
    {
      id: "emory",
      name: "Emory University",
      type: "university",
      size: 25,
      description: "Leading private research university with over $1B in sponsored research funding. A major source of biomedical innovation and biotech spinouts like Altesa, NeurOp, and GeoVax.",
      website: "https://emory.edu",
      keyPersonnel: ["Wilbur Lam", "Morgan Greenleaf", "C. Michael Cassidy", "Todd Polley"],
      recentNews: "Launched BioFoundry Institute (BDCI); multiple spinouts including Brain Trust Bio."
    },
    {
      id: "gatech",
      name: "Georgia Tech",
      type: "university",
      size: 23,
      description: "Top public engineering and research university. Home to the ATDC incubator and CREATE-X startup programs. A hub for medtech innovation, spinning out companies like Micron, Clearside, and OXOS.",
      website: "https://gatech.edu",
      keyPersonnel: ["Mark Prausnitz", "Raghupathy Sivakumar"],
      recentNews: "CREATE-X announced a record cohort of 318 founders in 2025. Science Square Phase 1 completed in 2024."
    },
    {
      id: "morehouse",
      name: "Morehouse School of Medicine",
      type: "university",
      size: 15,
      description: "Historically Black medical school focused on health equity. Partner in the Georgia Clinical & Translational Science Alliance (CTSA).",
      website: "https://msm.edu",
      keyPersonnel: ["Valerie Montgomery Rice"],
      recentNews: "Celebrating 50th anniversary in 2025. Key partner in Georgia CTSA."
    },
    {
      id: "uga",
      name: "UGA",
      type: "university",
      size: 18,
      description: "Major public research university with strengths in veterinary medicine, pharmacy, and agricultural biotech. A key partner in statewide innovation initiatives through GRA.",
      website: "https://uga.edu",
      keyPersonnel: ["Jere W. Morehead"],
      recentNews: "Partner in statewide biotech initiatives via GRA."
    },
    {
      id: "gsu",
      name: "GSU",
      type: "university",
      size: 16,
      description: "Research university with growing programs in infectious disease and neuroscience. Key collaborator on public health initiatives.",
      website: "https://gsu.edu",
      keyPersonnel: ["M. Brian Blake"],
      recentNews: "Co-leading NIH Antiviral Countermeasures Development Center (AC/DC) with Emory."
    },
    {
      id: "augusta_university",
      name: "Augusta University",
      type: "university",
      size: 15,
      description: "Georgia's public academic medical center, home of the Medical College of Georgia. Operates a statewide campus network focused on health sciences.",
      website: "https://augusta.edu",
      keyPersonnel: ["Dr. Russell Keen"],
      recentNews: "President Brooks A. Keel retired in 2024; Dr. Russell Keen inaugurated in 2025."
    },
    {
      id: "cdc",
      name: "CDC",
      type: "government",
      size: 20,
      description: "U.S. Centers for Disease Control and Prevention. A major federal anchor for public health and infectious disease research, headquartered in Atlanta.",
      website: "https://cdc.gov",
      keyPersonnel: ["Dr. Mandy K. Cohen"],
      recentNews: "Expanding lab capacity and forming industry partnerships with Roche and Quest for global health initiatives."
    },
    {
      id: "choa",
      name: "CHOA",
      type: "health_system",
      size: 20,
      description: "One of the largest pediatric healthcare systems in the U.S., CHOA is a leading site for pediatric clinical trials, translational research, and academic partnerships with Emory and Georgia Tech. Hosts the Marcus Autism Center and Children's Center for Clinical and Translational Research.",
      website: "https://www.choa.org/",
      keyPersonnel: [],
      recentNews: "Ongoing pediatric research partnerships with Emory, Georgia Tech, and Marcus Autism Center; active in rare disease and neurodevelopmental clinical trials."
    },
    {
      id: "emory_healthcare",
      name: "Emory Healthcare",
      type: "health_system",
      size: 19,
      description: "Emory's clinical enterprise and the largest health system in Georgia. Operates the Emory Healthcare Innovation Hub (EHIH), which partners with startups and global firms to validate digital health and AI solutions in clinical settings.",
      website: "https://www.emoryhealthcare.org/",
      keyPersonnel: [],
      recentNews: "EHIH has partnered with Verily, Stryker, and others to pilot new healthcare technologies. Supports Emory's biotech and digital health spinouts via clinical research access and implementation studies."
    },
    {
      id: "wellstar",
      name: "Wellstar Health System",
      type: "health_system",
      size: 18,
      description: "One of the largest health systems in Georgia, operating hospitals, urgent care, and specialty centers. Parent organization of Catalyst by Wellstar, the system's innovation and venture arm.",
      website: "https://www.wellstar.org",
      keyPersonnel: [],
      atlantaPresence: true,
      recentNews: "Wellstar continues to expand its footprint through new clinical sites and innovation initiatives via Catalyst."
    },
    {
      id: "grady",
      name: "Grady Health System",
      type: "health_system",
      size: 17,
      description: "Atlanta's largest safety-net hospital and trauma center. Key clinical research site and community health partner for Emory, Morehouse, and Georgia CTSA programs.",
      website: "https://www.gradyhealth.org",
      keyPersonnel: [],
      atlantaPresence: true,
      recentNews: "Grady remains central to Emory and Morehouse clinical research and care access for underserved populations."
    },
    {
      id: "oak_street_health",
      name: "Oak Street Health",
      type: "health_system",
      size: 14,
      description: "Value-based primary care provider with multiple clinics across Atlanta serving Medicare and elderly populations. Often partners with digital health and aging-focused innovators.",
      website: "https://www.oakstreethealth.com",
      keyPersonnel: [],
      atlantaPresence: true,
      recentNews: "Oak Street continues to grow its clinic network in Georgia and expand partnerships with health tech innovators."
    },
    {
      id: "aveanna_healthcare",
      name: "Aveanna Healthcare",
      type: "health_system",
      size: 17,
      description: "Atlanta-headquartered national leader in pediatric and adult home health, hospice, and private‑duty nursing. Supports aging‑care pilots and partnerships with healthtech innovators.",
      website: "https://www.aveanna.com",
      keyPersonnel: [],
      atlantaPresence: true,
      recentNews: "Corporate HQ based in Atlanta; serves over 300 locations across 33 states; active in home‑based healthcare innovation and population health partnership pilots."
    },
    {
      id: "piedmont_healthcare",
      name: "Piedmont Healthcare",
      type: "health_system",
      size: 16,
      description: "Atlanta-based health system operating hospitals and clinics across Georgia. Known for major construction projects including Marcus Tower and partnerships with healthtech providers.",
      website: "https://www.piedmont.org",
      keyPersonnel: [],
      atlantaPresence: true,
      recentNews: "Completed Marcus Tower (16-story, $603M hospital project) with advanced RTLS and monitoring systems."
    },

    // MAJOR COMPANIES - CLINICAL STAGE

    {
      id: "geovax",
      name: "GeoVax Labs",
      type: "public_company",
      size: 15,
      description: "Clinical-stage vaccine and immunotherapy company. An Emory spinout developing novel vaccine technologies for infectious diseases and cancer.",
      website: "https://geovax.com",
      keyPersonnel: ["David Dodd"],
      recentNews: "Advancing Phase 2 clinical trials for its next-gen COVID-19 vaccine."
    },
    {
      id: "micron",
      name: "Micron Biomedical",
      type: "startup",
      size: 16,
      description: "Georgia Tech spinout developing a dissolvable microneedle patch for painless, needle-free delivery of drugs and vaccines.",
      website: "https://micronbiomedical.com",
      keyPersonnel: ["Steven Damon", "Mark Prausnitz"],
      recentNews: "Completed first-in-human trial for influenza patch."
    },
    {
      id: "neurop",
      name: "NeurOp",
      type: "startup",
      size: 14,
      description: "Clinical-stage CNS drug developer. A spinout from research at Emory and Duke University.",
      website: "https://neuropinc.com/",
      keyPersonnel: ["James McNamara", "Raymond Dingledine"],
      recentNews: "Phase 1 clinical trials completed with positive safety and tolerability results. Company announced plans for Phase 2 trials in subarachnoid hemorrhage (SAH) starting 2023. FDA granted Orphan Drug Designation for NP10679 in December 2021."
    },
    {
      id: "antios",
      name: "Antios Therapeutics",
      type: "startup",
      size: 15,
      description: "Atlanta-based biotech focused on developing a cure for Hepatitis B virus (HBV).",
      website: "https://antiostherapeutics.com",
      keyPersonnel: ["Abel De La Rosa"],
      recentNews: "Announced promising Phase 2 data for lead HBV drug, aiming for a functional cure."
    },

    // GROWTH COMPANIES
    {
      id: "sharecare",
      name: "Sharecare",
      type: "company",
      size: 20,
      description: "Digital health company providing a personalized health platform. A major Atlanta tech exit, demonstrating the region's strength in health IT.",
      website: "https://sharecare.com",
      keyPersonnel: ["Jeff Arnold", "Brent Layton"],
      recentNews: "Acquired by Altaris Capital Partners in Oct 2024. Jeff Arnold continues as Executive Chairman."
    },
    {
      id: "florence",
      name: "Florence Healthcare",
      type: "company",
      size: 17,
      description: "Leading eClinical software company providing an electronic Trial Master File (eTMF) platform. Series C funding totaled $107M ($80M + $27M).",
      website: "https://florencehc.com",
      keyPersonnel: ["Ryan Jones"],
      recentNews: "Network has grown to over 37,000 research sites in 44 countries."
    },
    {
      id: "clearside",
      name: "Clearside Biomedical",
      type: "public_company",
      size: 16,
      description: "Biopharmaceutical company developing treatments for sight-threatening diseases. A Georgia Tech spinout commercializing a proprietary microinjector technology.",
      website: "https://clearsidebio.com",
      keyPersonnel: ["Dr. George Lasezkay", "Mark Prausnitz"],
      recentNews: "Positive results from Phase 2b trial in wet AMD (CLS-AX). Focusing on suprachoroidal drug delivery for retinal diseases."
    },
    {
      id: "vero",
      name: "VERO Biotech",
      type: "company",
      size: 17,
      description: "Medtech company with an FDA-approved inhaled nitric oxide system (Genosyl®) for neonatal respiratory failure.",
      website: "https://vero-biotech.com",
      keyPersonnel: ["Brent V. Furse"],
      recentNews: "Relocating HQ and manufacturing to Atlanta. Developing next-gen inhaled nitric oxide delivery systems."
    },
    {
      id: "artivion",
      name: "Artivion",
      type: "public_company",
      size: 18,
      description: "Formerly CryoLife, a global leader in cardiac and vascular surgery solutions.",
      website: "https://artivion.com",
      keyPersonnel: ["Pat Mackin"],
      recentNews: "Launched On-X Plus 1.5™ mechanical heart valve in Europe."
    },

    // VENTURE CAPITAL & INVESTORS
    {
      id: "portal",
      name: "Portal Innovations",
      type: "vc",
      size: 20,
      description: "Life sciences venture development engine combining seed capital with 33,000 sq ft of managed lab space at Science Square.",
      website: "https://portalinnovations.com",
      keyPersonnel: [
        { name: "Eddie Lai", linkedin: "https://www.linkedin.com/in/edwarddlai/" },
        { name: "Ashley Cornelison", linkedin: "https://www.linkedin.com/in/ashley-cornelison/" }
      ],
      recentNews: "Made first Atlanta investment in Moonlight Therapeutics. Partnered with Novo Nordisk on 'Pathbreakers' program."
    },
    {
      id: "catalyst",
      name: "Catalyst by Wellstar",
      type: "vc",
      size: 18,
      description: "Corporate venture fund and innovation arm of Wellstar Health System, investing in early-stage digital health and medtech.",
      website: "https://catalyst.wellstar.org",
      keyPersonnel: ["Hank Capps", "Jaimie Clark", "Stefanie Diaz"],
      recentNews: "Has made over 21 startup investments and provides pilot opportunities within the Wellstar health system."
    },
    {
      id: "bip",
      name: "BIP Ventures",
      type: "vc",
      size: 16,
      description: "Atlanta-based VC firm (formerly Panoramic Ventures) that invests across technology sectors, including a significant practice in health IT.",
      website: "https://bipventures.vc",
      keyPersonnel: ["Austin Poole", "Tami McQueen"],
      recentNews: "Actively investing across Seed to Series B, with portfolio companies like OncoLens and The Rounds."
    },
    {
      id: "noro",
      name: "Noro-Moseley Partners",
      type: "vc",
      size: 15,
      description: "One of Atlanta's most established VC firms (founded 1983), focusing on healthcare IT and tech-enabled services.",
      website: "https://noromoseley.com",
      keyPersonnel: ["Ryan Collins"],
      recentNews: "Active in healthcare IT, recently backing KODE Health's $27M Series B in Jan 2025."
    },
    {
      id: "gra_fund",
      name: "GRA Venture Fund",
      type: "vc",
      size: 14,
      description: "State-affiliated seed fund that invests exclusively in companies emerging from Georgia's research universities.",
      website: "https://gra.org/venture-fund/",
      keyPersonnel: ["Connor Seabrook"],
      recentNews: "Co-invests alongside private VCs in Georgia research spinouts, requiring a 3:1 private match."
    },
    {
      id: "atlanta_ventures",
      name: "Atlanta Ventures",
      type: "vc",
      size: 13,
      description: "Venture studio that builds and invests in seed-stage SaaS and digital health companies.",
      website: "https://atlantaventures.com",
      keyPersonnel: ["David Cummings", "Kathryn O'Day"],
      recentNews: "Hosts the Atlanta Healthcare Meetup and has a growing health IT portfolio."
    },
    {
      id: "engage_ventures",
      name: "Engage Ventures",
      type: "vc",
      size: 14,
      description: "Accelerator fund backed by major corporations (Coca-Cola, UPS, Wellstar) to help startups secure enterprise partnerships.",
      website: "https://engage.vc",
      keyPersonnel: [],
      recentNews: "Mentors at Georgia Tech's CREATE-X Demo Day and sources startups from university programs."
    },
    {
      id: "tech_square_ventures",
      name: "Tech Square Ventures",
      type: "vc",
      size: 15,
      description: "Early-stage VC firm deeply integrated with the Georgia Tech ecosystem. Co-founder of Engage Ventures.",
      website: "https://techsquareventures.com",
      keyPersonnel: ["Blake Patton"],
      recentNews: "Early investor in several Atlanta tech companies."
    },

    // ACCELERATORS & INCUBATORS
    {
      id: "atdc",
      name: "ATDC",
      type: "incubator",
      size: 18,
      description: "Georgia Tech's state-chartered technology incubator (founded 1980). Features a dedicated HealthTech track in partnership with Wellstar.",
      website: "https://atdc.org",
      keyPersonnel: ["John Avery"],
      recentNews: "Serves 150+ startups and has helped companies secure over $125M in SBIR grants."
    },
    {
      id: "create_x",
      name: "CREATE-X",
      type: "incubator",
      size: 16,
      description: "Georgia Tech initiative providing funding and mentorship to student and faculty founders. Has launched over 650 startups since 2014.",
      website: "https://create-x.gatech.edu",
      keyPersonnel: ["Raghupathy Sivakumar"],
      recentNews: "Expanded AI Health vertical. Alumni include Stord and OXOS."
    },
    {
      id: "biolocity",
      name: "Biolocity",
      type: "incubator",
      size: 15,
      description: "Joint Emory-GT commercialization accelerator that provides seed funding, project management, and technical guidance to advance promising university medical technologies toward market readiness.",
      website: "https://biolocity.org",
      keyPersonnel: [
        "Angela Gill Nelms",
        "Rifat Pamukcu",
        "Brian Walsh",
        "Manuel Kingsley"
      ],
      recentNews: "Supports translational research through strategic grants and mentorship. Operates in collaboration with Emory and Georgia Tech to de-risk early-stage medtech projects."
    },
    {
      id: "lab2launch",
      name: "Lab2Launch",
      type: "facility",
      size: 14,
      description: "Wet lab and co-working space at Emory's HSRB II Innovation Floor, providing bench space and infrastructure to Emory-affiliated startups supported through Biolocity.",
      website: "https://med.emory.edu/research/research-innovation/entrepreneurship/lab2launch/",
      keyPersonnel: ["Morgan Greenleaf"],
      atlantaPresence: true,
      recentNews: "Opened in early 2023; residents benefit from Biolocity network and core facility access."
    },
    {
      id: "emory_ott",
      name: "Emory OTT",
      type: "serviceProvider",
      size: 17,
      description: "Emory's central technology transfer office, advising researchers on IP, licensing, commercialization, and supporting translational startups.",
      website: "https://ott.emory.edu",
      keyPersonnel: [],
      atlantaPresence: true,
      recentNews: "Enabled 231 invention disclosures, 35 licenses, and launched Entrepreneurship Clinic and Bench2Market programs in FY2024."
    },
    {
      id: "science_square",
      name: "Science Square",
      type: "facility",
      size: 19,
      description: "A 16-acre life sciences research park adjacent to Georgia Tech, developed by GATV. Anchor tenants include Portal Innovations.",
      website: "https://sciencesquareatl.com",
      keyPersonnel: [],
      recentNews: "368,000 sq ft Phase 1 lab tower completed in Q2 2024."
    },
    // GOVERNMENT & TRADE ORGANIZATIONS
    {
      id: "gra",
      name: "GRA",
      type: "government",
      size: 17,
      description: "Public-private partnership that helps recruit top scientists and fund university research commercialization in Georgia.",
      website: "https://gra.org",
      keyPersonnel: [
        "Timothy Denning",
        { name: "Justin Burns", linkedin: "https://www.linkedin.com/in/jburns301/" },
        { name: "Andrew Short", linkedin: "https://www.linkedin.com/in/andreweshort/" }
      ],
      recentNews: "Tim Denning became GRA's fifth president and CEO in November 2023, after serving as vice president for research and economic development at Georgia State University."
    },
    {
      id: "georgia_bio",
      name: "Georgia Life Sciences",
      type: "trade",
      size: 15,
      description: "The state's life sciences trade association (formerly Georgia Bio), with over 500 members. Hosts the annual Golden Helix Awards.",
      website: "https://www.galifesciences.org/",
      keyPersonnel: ["Maria Thacker-Goethe"],
      recentNews: "Organization rebranded from Georgia Bio to Georgia Life Sciences in January 2025 to reflect expanded membership and scope."
    },
    {
      id: "rowen",
      name: "Rowen Foundation",
      type: "development",
      size: 16,
      description: "Developing a 2,000-acre knowledge community in Gwinnett County focused on biotech, agriculture, and environmental tech.",
      website: "https://rowenlife.com",
      keyPersonnel: ["Mason Ailstock"],
      recentNews: "Broke ground on infrastructure in 2024 for a new 2,000-acre innovation district."
    },
    {
      id: "atlanta_tech_angels",
      name: "Atlanta Technology Angels",
      type: "vc",
      size: 12,
      description: "Prominent angel investor network that provides capital and mentorship to early-stage tech companies, including life sciences.",
      website: "https://atlantatechnologyangels.com",
      keyPersonnel: [],
      recentNews: "Active in biotech early-stage investments."
    },
    {
      id: "metro_atlanta_chamber",
      name: "Metro Atlanta Chamber",
      type: "trade",
      size: 13,
      description: "Economic development organization with a dedicated Bioscience/Health team to promote regional growth.",
      website: "https://metroatlantachamber.com",
      keyPersonnel: [],
      recentNews: "Life sciences economic development initiatives."
    },
    {
      id: "georgia_ecd",
      name: "GDEcD",
      type: "government",
      size: 14,
      description: "Georgia Department of Economic Development - the state's primary arm for business recruitment and economic development.",
      website: "https://georgia.org",
      keyPersonnel: [],
      recentNews: "Supports biotech through incentive packages and site location assistance."
    },
    {
        id: 'department_of_veterans_affairs',
        name: 'VA',
        type: 'government',
        size: 8,
        description: "Federal agency providing healthcare services to military veterans. A key partner for medtech pilot programs.",
        website: 'https://www.va.gov/',
        keyPersonnel: [],
        funding: 'N/A',
        recentNews: 'Partnered with OXOS Medical to pilot handheld X-ray devices in VA hospitals.',
    },

    // SERVICE PROVIDERS & SUPPORT
    {
      id: "mng_labs",
      name: "MNG Laboratories",
      type: "serviceProvider",
      size: 12,
      description: "Specialized neurogenetics CRO acquired by LabCorp in 2019. Provides testing services to Emory and other institutions.",
      website: "https://mnglabs.com",
      keyPersonnel: ["LabCorp Leadership"],
      recentNews: "Continues to operate as a specialized neurogenetic testing lab within LabCorp."
    },
    {
      id: "radyus",
      name: "Radyus Research",
      type: "serviceProvider",
      size: 13,
      description: "Boutique preclinical CRO providing grant writing and project management services to startups.",
      website: "https://radyusresearch.com",
      keyPersonnel: [
        "Marta New",
        "Kamyra Edokpolor",
        "Benjamin Siciliano",
        "Anthony Chilton",
        "Caitlin J. Couch",
        "Dave Edwards"
      ],
      recentNews: "Announced strategic partnerships in 2024‑25 with Eurofins CDMO Alphora (May 2025) and Dt&CRO (May 2024) to deliver integrated, end‑to‑end drug development services—from preclinical through GMP manufacturing—for biotech clients globally."
    },
    {
      id: "akesogen",
      name: "AKESOgen",
      type: "serviceProvider",
      size: 12,
      description: "Genomics and bioinformatics CRO acquired by Tempus in 2019. A key service provider to the CDC.",
      website: "https://tempus.com",
      keyPersonnel: ["Tempus Leadership"],
      recentNews: "Atlanta lab has expanded Tempus's sequencing capabilities since its acquisition."
    },
    {
      id: "king_spalding",
      name: "King & Spalding",
      type: "serviceProvider",
      size: 11,
      description: "Global law firm with a world-renowned FDA regulatory and life sciences practice. Represents major local biotechs like VERO.",
      website: "https://kslaw.com",
      keyPersonnel: ["Mark Brown"],
      recentNews: "Expanded life sciences IP litigation team in 2024."
    },
    {
      id: "kilpatrick_townsend",
      name: "Kilpatrick",
      type: "serviceProvider",
      size: 13,
      description: "Major law firm with a dominant intellectual property practice serving the Atlanta tech community.",
      website: "https://kilpatricktownsend.com",
      keyPersonnel: [],
      recentNews: "Long-time sponsor and IP counsel at ATDC, serving a majority of its startups."
    },
    {
      id: "biotechexec",
      name: "BiotechExec",
      type: "serviceProvider",
      size: 10,
      description: "Boutique consulting firm focused on biotech and medtech startups. Provides interim executive leadership, commercialization strategy, and capital planning support.",
      website: "https://biotechexec.com",
      keyPersonnel: [
        { name: "Robert Allen", linkedin: "https://www.linkedin.com/in/rallen/" },
        { name: "William Dull", linkedin: "https://www.linkedin.com/in/william-dull/" }
      ],
      recentNews: "Supports startups emerging from academic accelerators and translational research programs."
    },
    {
      id: "mckinsey_atlanta",
      name: "McKinsey & Company",
      type: "serviceProvider",
      size: 14,
      description: "Global consulting with life sciences practice in Atlanta",
      website: "https://mckinsey.com",
      keyPersonnel: [],
      recentNews: "Life sciences and healthcare consulting"
    },
    {
      id: "deloitte_atlanta",
      name: "Deloitte",
      type: "serviceProvider",
      size: 14,
      description: "AI compliance and healthcare consulting, Atlas AI™ platform",
      website: "https://deloitte.com",
      keyPersonnel: [],
      recentNews: "NVIDIA-powered compliance consulting"
    },
    {
      id: "iqvia_atlanta",
      name: "IQVIA",
      type: "serviceProvider",
      size: 15,
      description: "Global CRO with Atlanta office, clinical research and consulting",
      website: "https://iqvia.com",
      keyPersonnel: [],
      recentNews: "Partnerships with CDC on real-world data"
    },
    {
      id: "peachtree_bio",
      name: "Peachtree BioResearch Solutions",
      type: "serviceProvider",
      size: 11,
      description: "Full-service CRO based in Atlanta, clinical trial support",
      website: "https://peachtreebrs.com",
      keyPersonnel: [],
      recentNews: "Regional clinical trial services"
    },
    {
      id: "11ten",
      name: "11TEN Innovation Partners",
      type: "serviceProvider",
      size: 13,
      description: "Atlanta-based innovation consultancy focused on healthcare commercialization and clinical validation. Operates a 5G-enabled living lab and partners with systems like Emory Healthcare to prototype and pilot digital health and medtech solutions in real-world settings.",
      website: "https://11ten.com",
      keyPersonnel: ["James Lewis", "Caleb Szubski", "Steve Gertz"],
      recentNews: "Supports the Emory Healthcare Innovation Hub with UX research and pilot design for digital health deployments. Acquired by ClinicalMind in 2024."
    },
    {
      id: "jpmorgan_chase",
      name: "J.P. Morgan Chase & Co.",
      type: "serviceProvider",
      size: 18,
      description: "Global financial services firm with a strong presence in Atlanta (Buckhead), supporting life sciences banking, commercial banking, wealth management, and technology operations.",
      website: "https://www.jpmorganchase.com",
      keyPersonnel: ["Courtney J. Law"],
      recentNews: "Expanding Atlanta office by 40,000 sq ft; designated as one of JPMorgan's 23 global technology centers; active in life sciences startup banking and biotech client services."
    },
    {
      id: "vizzia",
      name: "Vizzia Technologies",
      type: "serviceProvider",
      size: 14,
      description: "Atlanta-based provider of real-time location systems (RTLS) and environmental monitoring software for hospitals. Selected by CHOA, Grady, and Piedmont to support Georgia's largest healthcare construction projects.",
      website: "https://www.vizziatech.com",
      keyPersonnel: ["Dave Wiedman"],
      atlantaPresence: true,
      recentNews: "Selected by CHOA for $1.5B Arthur M. Blank Hospital RTLS system; deployed solutions at Marcus Tower (Piedmont) and Correll Pavilion (Grady). Named Top 40 healthtech company by TAG."
    },
    {
      id: "jones_day",
      name: "Jones Day",
      type: "serviceProvider",
      size: 12,
      description: "Global law firm with an established Atlanta office; active in life sciences, medtech, M&A, cross-border and VC transaction support for startups and growth companies.",
      website: "https://www.jonesday.com",
      keyPersonnel: ["Bill Zawrotny", "Katie Vest"],
      atlantaPresence: true,
      recentNews: "Hosts legal educational series 'Brewed & Briefed' in Atlanta. Bill and Katie provide counsel to Georgia life sciences startups and investors."
    },
    {
      id: "bonnefire_atl",
      name: "Bonne Fire ATL",
      type: "community",
      size: 12,
      description: "Grassroots founder and funder gathering focused on early-stage healthtech, biotech, and digital health in Atlanta. Builds trust-based connections across investors, operators, and domain experts.",
      website: "https://www.linkedin.com/company/bonnefireatl/",
      keyPersonnel: [
        { name: "Nadine Peever", role: "Co-Founder" },
        { name: "Alexa Morse", role: "Advisor & Co-Founder" },
        { name: "Sarah Carrigan", role: "Public Health Engagement Chair" },
        { name: "Eddie Lai", role: "Advisor" },
        { name: "Patrick Kennedy", role: "Host Team Member" },
        { name: "Ben Huffman", role: "Host Team Member" }
      ],
      recentNews: "Hosted monthly pitch and networking events in 2024–2025 featuring emerging Atlanta healthtech startups."
    },
    {
      id: "agetech_connect",
      name: "AgeTech Connect",
      type: "community",
      size: 11,
      description: "Ecosystem convener focused on aging innovation, including gerotech, value-based care, and aging-in-place startups. Connects innovators with payers, providers, and public health programs.",
      website: "https://www.agetechconnect.com",
      keyPersonnel: [],
      recentNews: "Launched regional events connecting age-related innovators to pilot partners and investors."
    },
    {
      id: "ache_georgia",
      name: "ACHE of Georgia",
      type: "community",
      size: 12,
      description: "Professional society for healthcare executives across Georgia. Provides education, networking, and mentorship for clinical innovation leaders across hospitals, payers, and systems.",
      website: "https://ga.ache.org",
      keyPersonnel: [],
      recentNews: "Hosted Georgia Health Leaders Summit and connects hospital innovation teams with startups and vendors."
    },

    // EMERGING STARTUPS
    {
      id: "moonlight",
      name: "Moonlight Therapeutics",
      type: "startup",
      size: 10,
      description: "Developing a microneedle-based immunotherapy platform (TASIS) for food allergies. Portal Innovations' first Atlanta investment. Advancing lead program into Phase I trials.",
      website: "https://moonlighttx.com",
      keyPersonnel: ["Samir Patel"],
      recentNews: "Received multiple NIH grants and raised Series A co-led by Portal Innovations."
    },
    {
      id: "sanguina",
      name: "Sanguina",
      type: "startup",
      size: 11,
      description: "Digital health startup spun out of Emory/GT collaboration. Developed AnemoCheck Mobile, a non-invasive app for anemia screening.",
      website: "https://sanguina.com",
      keyPersonnel: ["Erika Tyburski"],
      recentNews: "Received FDA Breakthrough Device status for its smartphone-based anemia screening app."
    },
    {
      id: "oxos",
      name: "OXOS Medical",
      type: "startup",
      size: 12,
      description: "Georgia Tech CREATE-X alumnus making portable, handheld X-ray imaging systems.",
      website: "https://oxos.com",
      keyPersonnel: ["Greg Kolovich", "Evan Ruff"],
      recentNews: "Received FDA clearance for its handheld Micro C X-ray device and deployed devices in a VA pilot program."
    },
    {
      id: "altesa",
      name: "Altesa BioSciences",
      type: "startup",
      size: 12,
      description: "Antiviral company formed in partnership with Emory's DRIVE institute to develop treatments for respiratory viruses.",
      website: "https://altesabio.com",
      keyPersonnel: ["George Painter", "Dennis Liotta"],
      recentNews: "Licensed Vapendavir from Vaxart to develop for RSV and other respiratory viruses."
    },
    {
      id: "braintrust",
      name: "BrainTrust Bio",
      type: "startup",
      size: 10,
      description: "Emory spinout founded by neurosurgeon Dr. Nicholas Boulis, focusing on novel drug delivery methods for the central nervous system.",
      website: "https://braintrustbio.com",
      keyPersonnel: ["Chen Benkler"],
      recentNews: "Preclinical stage startup aiming to improve CNS drug delivery."
    },
    {
      id: "synaptrix",
      name: "Synaptrix",
      type: "startup",
      size: 10,
      description: "Atlanta-based startup developing a non-invasive, drug-free pain management system (NOVABLOC™) for post-operative knee pain. Clinical-stage therapy delivering novel electrical stimulation to extend pain relief while preserving sensory function.",
      website: "https://www.linkedin.com/company/novabloc-pain-free-knee/",
      keyPersonnel: ["Shyamy Sastry"],
      recentNews: "Backed by Portal Innovations. Completed feasibility studies showing >20 days of relief after one treatment."
    },
    {
      id: "topodx",
      name: "TopoDx",
      type: "startup",
      size: 10,
      description: "Diagnostic startup developing the Cosmos Platform for rapid, culture-free pathogen identification and antibiotic susceptibility testing using interferometry and AI. A spinout from Georgia Tech and Emory University.",
      website: "https://www.portalinnovations.com/portfolio/",
      keyPersonnel: ["Yogi Patel"],
      recentNews: "Backed by Portal Innovations. Developed a platform delivering microbial ID and resistance data in under 4 hours."
    },
    {
      id: "avanos",
      name: "Avanos Medical",
      type: "company",
      size: 14,
      description: "Medtech company headquartered in Alpharetta, GA. Focuses on chronic care and pain management solutions, including nerve block and respiratory health technologies.",
      website: "https://avanos.com",
      keyPersonnel: [],
      recentNews: "Serves as the origin for Synaptrix technology via spinout."
    },
    {
      id: "drive",
      name: "DRIVE",
      type: "incubator",
      size: 13,
      description: "Non-profit bioventure entity established by Emory to accelerate the development of antiviral therapeutics. Operates with an entrepreneurial biotech model to translate early-stage discoveries into global treatments.",
      website: "https://driveinnovations.org/",
      keyPersonnel: [],
      recentNews: "Enabled the development and licensing of molnupiravir (Lagevrio) to Merck. Supports Emory antiviral drug discovery efforts."
    },
    {
      id: "ebfi",
      name: "EBFI",
      type: "incubator",
      size: 12,
      description: "Venture support institute based at Emory. Identifies and supports high-potential life science innovations with investment, mentorship, and commercialization strategy to bridge academia and industry.",
      website: "https://www.ebfi.org/",
      keyPersonnel: [
        { name: "Michael Tanenbaum", linkedin: "https://www.linkedin.com/in/michael-tanenbaum-447a54b/" },
        { name: "Nassir Mokarram", linkedin: "https://www.linkedin.com/in/nassir-mokarram-5b966017/" }
      ],
      recentNews: "Supports Emory-affiliated startups across medtech, diagnostics, and therapeutics."
    },
    {
      id: "eddf",
      name: "EDDF",
      type: "vc",
      size: 12,
      description: "Early-stage investment fund under Emory Innovations, Inc. Established in 2023 using royalties from Merck's LEGEVRIO™ (molnupiravir). Funds Emory-discovered therapeutics to IND/clinical milestones.",
      website: "https://innovate.emory.edu/ecosystem/emory-drug-development-fund.html",
      keyPersonnel: ["Doug Gooding"],
      recentNews: "Backed Emory-based projects in IBD, seizure disorders, and respiratory disease."
    },
    {
      id: "allonix",
      name: "Allonix Therapeutics",
      type: "startup",
      size: 10,
      description: "Emory spinout developing small molecule agonists targeting inflammation and cholesterol pathways for the treatment of inflammatory bowel disease (IBD). Co-founded with Orange Grove Bio.",
      website: "https://gra.org/company/324/Allonix.html",
      keyPersonnel: ["Eric Ortlund", "John Calvert"],
      recentNews: "EDDF portfolio company focused on IBD therapeutics."
    },
    {
      id: "agrithera",
      name: "AgriThera",
      type: "startup",
      size: 10,
      description: "Emory spinout developing cannabinoid pro-drug therapeutics for seizure disorders, chronic pain, and anxiety.",
      website: "https://agrithera.com",
      keyPersonnel: ["Dennis Liotta", "Stephen Traynelis"],
      recentNews: "Part of EDDF portfolio targeting neurotherapeutics."
    },
    {
      id: "cambium_oncology",
      name: "Cambium Oncology",
      type: "startup",
      size: 5,
      description: "Immuno‑oncology startup headquartered in Atlanta, GA developing first‑in‑class VIP receptor antagonists (e.g. ANT308) to restore anti‑cancer T‑cell activity in tumors with elevated VIP/VPAC signaling.",
      website: "https://cambiumoncology.com",
      keyPersonnel: ["Ned Waller", "Gary Altman"],
      recentNews: "Received NIH Fast‑Track grant and a $5M strategic equity investment from OEP Innovations to advance ANT308 into IND stage."
    },
    {
      id: "switchboard_md",
      name: "Switchboard, MD",
      type: "startup",
      size: 12,
      description: "Atlanta-based digital health startup using physician-built AI to streamline care team workflows. Offers solutions for inbox management, disease escalation, and revenue cycle through real-time prioritization and routing of clinical and admin tasks.",
      website: "https://www.switchboardmd.com",
      keyPersonnel: [
        "Blake Anderson, MD",
        "Bradley Gallaher",
        "Ankit Tiwari",
        "Will Akers",
        "Kelly Luckasevic",
        "Ashley Badgett",
        "Yuanda Zhu, PhD"
      ],
      recentNews: "Continues to grow adoption of its AI-powered platform across provider networks. Built by clinicians with deep healthcare system expertise."
    },
    {
      id: "armor_medical",
      name: "Armor Medical Inc.",
      type: "startup",
      size: 10,
      description: "Atlanta-based medtech startup developing Maternal aRMOR, a wearable for early detection of postpartum hemorrhage.",
      website: "https://armormedical.us",
      keyPersonnel: [],
      atlantaPresence: true,
      recentNews: "Received strategic investment from Catalyst by Wellstar in June 2025; selected for MedTech Innovator 2025 showcase."
    },
    {
      id: "rimidi",
      name: "Rimidi",
      type: "startup",
      size: 12,
      description: "Atlanta-based digital health company offering software platforms for chronic disease management, patient engagement, and clinical decision support. Works with health systems to integrate into EHRs and personalize patient treatment.",
      website: "https://rimidi.com",
      keyPersonnel: ["Lucienne Ide"],
      atlantaPresence: true,
      recentNews: "Partnered with Emory Healthcare to launch patient-centered treatment apps; continues to expand remote monitoring capabilities."
    }
  ],

  links: [
    // --- Core Academic Collaborations ---
    { source: "emory", target: "gatech", type: "collaboration", description: "Joint Coulter Department of Biomedical Engineering" },
    { source: "emory", target: "gsu", type: "collaboration", description: "NIH Antivirals Center (AC/DC)" },
    { source: "emory", target: "morehouse", type: "collaboration", description: "Georgia CTSA Alliance" },
    { source: "gatech", target: "morehouse", type: "collaboration", description: "Georgia CTSA Alliance" },
    { source: "emory", target: "cdc", type: "collaboration", description: "Numerous research partnerships" },
    { source: "emory", target: "choa", type: "collaboration", description: "Academic partner in pediatric research and clinical training" },
    { source: "gatech", target: "choa", type: "research_collaboration", description: "Collaborates on pediatric medtech and translational research" },
    { source: "emory", target: "emory_healthcare", type: "affiliation", description: "Clinical enterprise of Emory University; partner for translational and digital health research" },
    { source: "emory_healthcare", target: "florence", type: "pilot", description: "Florence's eClinical tools validated in Emory Healthcare Innovation Hub pilot programs" },
    { source: "switchboard_md", target: "emory_healthcare", type: "pilot", description: "Partnered with Emory Healthcare to implement and validate clinical operations and AI workflow tools" },
    { source: "switchboard_md", target: "emory", type: "collaboration", description: "Founded by Emory-affiliated physicians and collaborates on applied AI and clinical operations research" },
    { source: "catalyst", target: "wellstar", type: "affiliation", description: "Catalyst is the innovation and venture arm of Wellstar Health System" },
    { source: "emory", target: "grady", type: "collaboration", description: "Emory partners with Grady for clinical care, research, and workforce development" },
    { source: "morehouse", target: "grady", type: "collaboration", description: "Morehouse School of Medicine is a core academic partner at Grady" },
    { source: "agetech_connect", target: "oak_street_health", type: "partnership", description: "AgeTech Connect engages Oak Street Health for aging-related healthcare pilot opportunities" },

    // --- University Spinouts ---
    { source: "emory", target: "geovax", type: "spinout", description: "Technology developed at Emory" },
    { source: "emory", target: "neurop", type: "spinout", description: "Founded by Emory faculty" },
    { source: "emory", target: "altesa", type: "spinout", description: "Formed via Emory's DRIVE institute" },
    { source: "emory", target: "braintrust", type: "spinout", description: "Founded by Emory faculty" },
    { source: "emory", target: "topodx", type: "spinout", description: "Co-founded by Emory and GT researchers" },
    { source: "emory", target: "cambium_oncology", type: "spinout", description: "Founded on IP licensed from Emory University; works closely with Winship Cancer Institute" },
    { source: "gatech", target: "micron", type: "spinout", description: "Technology developed at Georgia Tech" },
    { source: "gatech", target: "clearside", type: "spinout", description: "Based on GT/Emory microneedle tech" },
    { source: "gatech", target: "moonlight", type: "spinout", description: "GT Capstone project spinout" },
    { source: "gatech", target: "oxos", type: "spinout", description: "Formed via CREATE-X program" },
    { source: "gatech", target: "sanguina", type: "spinout", description: "Co-founded by GT alumna from student research" },
    { source: "gatech", target: "topodx", type: "spinout", description: "Developed out of Georgia Tech research" },
    { source: "avanos", target: "synaptrix", type: "spinout", description: "Spinout from Avanos Medical" },

    // --- VC Investments ---
    { source: "portal", target: "moonlight", type: "investment", description: "Co-led Series A for peanut allergy immunotherapy platform" },
    { source: "portal", target: "synaptrix", type: "investment", description: "Portfolio company focused on post-surgical pain management" },
    { source: "portal", target: "topodx", type: "investment", description: "Portfolio company advancing AI-driven AST diagnostics" },
    { source: "eddf", target: "allonix", type: "investment", description: "EDDF portfolio investment in IBD therapeutics" },
    { source: "eddf", target: "agrithera", type: "investment", description: "EDDF portfolio investment in cannabinoid neurotherapeutics" },
    { source: "gra_fund", target: "micron", type: "investment", description: "Investor in Series A" },
    { source: "noro", target: "sharecare", type: "investment", description: "Early investor" },
    { source: "catalyst", target: "armor_medical", type: "investment", description: "Catalyst by Wellstar invested in Armor Medical to support development of Maternal aRMOR wearable (Jun 2025)." },

    // --- Accelerator & Incubator Support ---
    { source: "atdc", target: "gatech", type: "affiliation", description: "Program of Georgia Tech" },
    { source: "create_x", target: "gatech", type: "affiliation", description: "Program of Georgia Tech" },
    { source: "atdc", target: "sanguina", type: "support", description: "Incubated at ATDC (alumni)" },
    { source: "create_x", target: "oxos", type: "support", description: "Incubated at CREATE-X (alumni)" },
    { source: "biolocity", target: "sanguina", type: "support", description: "Received early grant funding" },
    { source: "emory", target: "ebfi", type: "affiliation", description: "Hosted and operated by Emory University" },
    { source: "emory", target: "eddf", type: "affiliation", description: "Part of Emory Innovations, Inc." },

    // --- DRIVE Relationships ---
    { source: "emory", target: "drive", type: "affiliation", description: "Emory-formed drug development accelerator for antiviral therapeutics" },
    { source: "drive", target: "eddf", type: "origin", description: "Established EDDF using royalties from DRIVE-licensed drug molnupiravir (LAGEVRIO)" },
    { source: "drive", target: "altesa", type: "spinout", description: "Antiviral spinout formed via DRIVE to develop Vapendavir and other respiratory virus therapies" },
    { source: "drive", target: "agrithera", type: "founding_support", description: "Supported preclinical work on cannabinoid-based neurotherapeutics" },

    // --- Key Partnerships & Affiliations ---
    { source: "gatech", target: "science_square", type: "development", description: "Development partner (via GATV)" },
    { source: "science_square", target: "portal", type: "tenant", description: "Anchor tenant" },
    { source: "portal", target: "emory", type: "education_program", description: "Co-leads the Emory x Portal Innovation Certificate Program to train faculty and clinicians in biotech commercialization" },
    { source: "portal", target: "jones_day", type: "education_program", description: "Co-hosts the Brewed & Briefed legal education series for life sciences founders at Portal's Atlanta office" },
    { source: "portal", target: "jpmorgan_chase", type: "partnership", description: "J.P. Morgan Chase is a corporate partner of Portal Innovations, supporting early-stage life sciences and medtech ventures." },
    { source: "catalyst", target: "atdc", type: "partnership", description: "Formal partnership for HealthTech pipeline" },
    { source: "engage_ventures", target: "create_x", type: "partnership", description: "Mentorship and startup sourcing" },
    { source: "biolocity", target: "emory", type: "collaboration", description: "Joint program with Emory" },
    { source: "biolocity", target: "gatech", type: "collaboration", description: "Joint program with Georgia Tech" },
    { source: "biolocity", target: "lab2launch", type: "infrastructure_support", description: "Biolocity subsidizes and guides startups in Lab2Launch, includes programmatic support and consultation." },
    { source: "emory", target: "lab2launch", type: "infrastructure", description: "Lab2Launch located onsite at Emory's HSRB II Innovation Floor; supports Emory-affiliated innovators." },
    { source: "emory_ott", target: "emory", type: "affiliation", description: "Office of Technology Transfer is Emory's formal commercialization & IP licensing arm." },
    { source: "emory_ott", target: "biolocity", type: "collaboration", description: "OTT collaborates with Biolocity to connect researchers to commercialization funding and support programs." },
    { source: "gatech", target: "cambium_oncology", type: "research_collaboration", description: "Georgia Tech bioengineering and drug manufacturing support" },
    { source: "oxos", target: "department_of_veterans_affairs", type: "partnership", description: "Pilot program partnership" },
    { source: "micron", target: "cdc", type: "partnership", description: "Research and clinical trial collaboration" },
    { source: "iqvia_atlanta", target: "cdc", type: "partnership", description: "Real-world data partnership" },
    { source: "akesogen", target: "cdc", type: "service", description: "Genomic sequencing services contract" },

    // --- Service Provider Relationships ---
    { source: "king_spalding", target: "vero", type: "service", description: "FDA regulatory legal counsel" },
    { source: "kilpatrick_townsend", target: "atdc", type: "service", description: "Official IP legal services sponsor" },
    { source: "biotechexec", target: "biolocity", type: "service", description: "Mentorship and strategic consulting" },
    { source: "mng_labs", target: "emory", type: "service", description: "Neurogenetic testing services vendor" },
    { source: "radyus", target: "cambium_oncology", type: "service", description: "Longtime CRO and strategic consulting partner" },
    { source: "11ten", target: "emory_healthcare", type: "collaboration", description: "Strategic partner to the Emory Healthcare Innovation Hub, enabling clinical UX testing and healthcare product validation" },
    { source: "vizzia", target: "choa", type: "service", description: "Selected by CHOA to deploy RTLS and asset tracking for Arthur M. Blank Hospital (2025)." },
    { source: "vizzia", target: "piedmont_healthcare", type: "service", description: "Deployed RTLS platform at Marcus Tower (16-story, $603M hospital project)." },
    { source: "vizzia", target: "grady", type: "service", description: "Implemented RTLS and environmental monitoring system at Correll Pavilion (10-story surgical center)." },
    { source: "rimidi", target: "emory_healthcare", type: "pilot", description: "Partnered with Emory Healthcare to deploy digital treatment apps supporting personalized care." },

    // --- Broader Ecosystem Connections ---
    { source: "gra", target: "emory", type: "funding", description: "Supports Emory through endowed chairs, translational research, and startup formation funding." },
    { source: "gra", target: "gatech", type: "funding", description: "Funds Georgia Tech research translation and startup formation; GRA Scholars often hosted here." },
    { source: "gra", target: "uga", type: "funding", description: "Supports innovation and entrepreneurship across UGA's pharmacy, agbio, and veterinary programs." },
    { source: "gra", target: "morehouse", type: "funding", description: "Partners in Georgia CTSA and supports research infrastructure at Morehouse." },
    { source: "gra", target: "gsu", type: "funding", description: "Supports infectious disease and neuro research; GRA Scholars hosted at Georgia State." },
    { source: "gra", target: "augusta_university", type: "funding", description: "GRA-supported research and startup activity at Medical College of Georgia." },
    { source: "gra", target: "gra_fund", type: "affiliation", description: "GRA Venture Fund is the investment arm of the Georgia Research Alliance, supporting university-affiliated startups with seed-stage capital." },
    { source: "gra", target: "micron", type: "funding", description: "Provided translational research and matching capital support." },
    { source: "gra", target: "clearside", type: "funding", description: "Clearside's founding research supported through GRA-backed technology and translational grants." },
    { source: "gra", target: "altesa", type: "funding", description: "GRA supported Emory DRIVE institute underlying Altesa's antiviral research." },
    { source: "gra", target: "allonix", type: "funding", description: "Backed Emory IP and early preclinical studies through GRA-sponsored programs." },
    { source: "gra", target: "cambium_oncology", type: "funding", description: "Supported foundational cancer research programs at Emory that seeded Cambium." },
    { source: "eddf", target: "emory", type: "funding", description: "Direct laboratory investment in CFTR-targeted therapies via Sorscher Lab" },
    { source: "georgia_bio", target: "vero", type: "membership", description: "Trade association member" },
    { source: "georgia_bio", target: "geovax", type: "membership", description: "Trade association member" },
    { source: "rowen", target: "science_square", type: "development", description: "Future biotech infrastructure" },
    { source: "clearside", target: "micron", type: "technology", description: "Shared Prausnitz technology base" }
  ]
};

// Node type mappings for filtering (Updated & Expanded for consistency)
export const nodeTypeMap = {
    company: 'Company',
    public_company: 'Company',
    startup: 'Startup',
    university: 'Academia & Research',
    research_institution: 'Academia & Research',
    health_system: 'Provider & Health System',
    vc: 'Investor',
    accelerator: 'Accelerator & Incubator',
    incubator: 'Accelerator & Incubator',
    facility: 'Accelerator & Incubator',
    government: 'Government & Trade Org',
    trade: 'Government & Trade Org',
    development: 'Government & Trade Org',
    serviceProvider: 'Service Provider',
    cro: 'Service Provider',
    law_firm: 'Service Provider',
    consulting: 'Service Provider',
    community: 'Community Builder',
};

// Color scheme for different node types (Updated for better visual distinction)
export const nodeColors = {
    'Academia & Research': '#0033A0', // Dark Blue
    'Company': '#0D6A42', // Green
    'Investor': '#F2A900', // Gold
    'Accelerator & Incubator': '#A43533', // Red
    'Government & Trade Org': '#5A2D81', // Purple
    'Service Provider': '#545454', // Gray
    'Startup': '#00AEEF', // Light Blue
    'Provider & Health System': '#7C9A7A', // Sage
    'Community Builder': '#669999', // muted teal-gray for connective nodes
};