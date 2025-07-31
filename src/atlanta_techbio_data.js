// ✅ Updated with verified LinkedIn data from CSV on 2025-07-29
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
      keyPersonnel: [
      {
        "name": "Wilbur Lam",
        "linkedin": "https://www.linkedin.com/in/wilbur-a-lam-5b84a667/"
      },
      {
        "name": "Morgan Greenleaf",
        "linkedin": "https://www.linkedin.com/in/morgan-greenleaf/"
      },
      {
        "name": "C. Michael Cassidy",
        "linkedin": "https://www.linkedin.com/in/michael-cassidy-14867130/"
      },
      {
        "name": "Todd Polley",
        "linkedin": "https://www.linkedin.com/in/polley/"
      }
    ],
      recentNews: "Launched BioFoundry Institute (BDCI); multiple spinouts including Brain Trust Bio."
    },
    {
      id: "gatech",
      name: "Georgia Tech",
      type: "university",
      size: 23,
      description: "Top public engineering and research university. Home to the ATDC incubator and CREATE-X startup programs. A hub for medtech innovation, spinning out companies like Micron, Clearside, and OXOS.",
      website: "https://gatech.edu",
      keyPersonnel: [
      {
        "name": "Mark Prausnitz",
        "linkedin": "https://www.linkedin.com/in/mark-prausnitz-61a46423/"
      },
      {
        "name": "Raghupathy Sivakumar",
        "linkedin": "https://www.linkedin.com/in/sivarag/"
      }
    ],
      recentNews: "CREATE-X announced a record cohort of 318 founders in 2025. Science Square Phase 1 completed in 2024."
    },
    {
      id: "morehouse",
      name: "MSM",
      type: "university",
      size: 15,
      description: "Morehouse School of Medicine (MSM) - historically Black medical school focused on health equity. Partner in the Georgia Clinical & Translational Science Alliance (CTSA).",
      website: "https://msm.edu",
      keyPersonnel: [
      {
        "name": "Valerie Montgomery Rice",
        "linkedin": "https://www.linkedin.com/in/valerie-montgomery-rice-473015201/"
      }
    ],
      recentNews: "Celebrating 50th anniversary in 2025. Key partner in Georgia CTSA."
    },
    {
      id: "uga",
      name: "UGA",
      type: "university",
      size: 18,
      description: "Major public research university with strengths in veterinary medicine, pharmacy, and agricultural biotech. A key partner in statewide innovation initiatives through GRA.",
      website: "https://uga.edu",
      keyPersonnel: [
      {
        "name": "Jere W. Morehead",
        "linkedin": "https://www.linkedin.com/in/jeremorehead/"
      }
    ],
      recentNews: "Partner in statewide biotech initiatives via GRA."
    },
    {
      id: "gsu",
      name: "GSU",
      type: "university",
      size: 16,
      description: "Research university with growing programs in infectious disease and neuroscience. Key collaborator on public health initiatives.",
      website: "https://gsu.edu",
      keyPersonnel: [
      {
        "name": "M. Brian Blake",
        "linkedin": "https://www.linkedin.com/in/m-brian-blake/"
      }
    ],
      recentNews: "Co-leading NIH Antiviral Countermeasures Development Center (AC/DC) with Emory."
    },
    {
      id: "augusta_university",
      name: "Augusta University",
      type: "university",
      size: 15,
      description: "Georgia's public academic medical center, home of the Medical College of Georgia. Operates a statewide campus network focused on health sciences.",
      website: "https://augusta.edu",
      keyPersonnel: [
      {
        "name": "Dr. Russell Keen",
        "linkedin": "https://www.linkedin.com/in/russell-keen/"
      }
    ],
      recentNews: "President Brooks A. Keel retired in 2024; Dr. Russell Keen inaugurated in 2025."
    },
    {
      id: "cdc",
      name: "CDC",
      type: "government",
      size: 20,
      description: "U.S. Centers for Disease Control and Prevention. A major federal anchor for public health and infectious disease research, headquartered in Atlanta.",
      website: "https://cdc.gov",
      keyPersonnel: [
      {
        "name": "Dr. Mandy K. Cohen",
        "linkedin": "https://www.linkedin.com/in/mandy-cohen-03aa343/"
      }
    ],
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
      recentNews: "Wellstar continues to expand its footprint through new clinical sites and innovation initiatives via Catalyst."
    },
    {
      id: "grady",
      name: "Grady",
      type: "health_system",
      size: 17,
      description: "Atlanta's largest safety-net hospital and trauma center. Key clinical research site and community health partner for Emory, Morehouse, and Georgia CTSA programs.",
      website: "https://www.gradyhealth.org",
      keyPersonnel: [],
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
      keyPersonnel: [
      {
        "name": "David Dodd",
        "linkedin": "https://www.linkedin.com/in/david-a-dodd-3b28616/"
      }
    ],
      recentNews: "Advancing Phase 2 clinical trials for its next-gen COVID-19 vaccine."
    },
    {
      id: "micron",
      name: "Micron Biomedical",
      type: "startup",
      size: 16,
      description: "Georgia Tech spinout developing a dissolvable microneedle patch for painless, needle-free delivery of drugs and vaccines.",
      website: "https://micronbiomedical.com",
      keyPersonnel: [
      {
        "name": "Steven Damon",
        "linkedin": "https://www.linkedin.com/in/steven-damon-a1966a5/"
      }
    ],
      recentNews: "Completed first-in-human trial for influenza patch."
    },
    {
      id: "neurop",
      name: "NeurOp",
      type: "startup",
      size: 14,
      description: "Clinical-stage CNS drug developer. A spinout from research at Emory and Duke University.",
      website: "https://neuropinc.com/",
      keyPersonnel: [
      "James McNamara",
      {
        "name": "Raymond Dingledine",
        "linkedin": "https://www.linkedin.com/in/ray-dingledine-41669821/"
      }
    ],
      recentNews: "Phase 1 clinical trials completed with positive safety and tolerability results. Company announced plans for Phase 2 trials in subarachnoid hemorrhage (SAH) starting 2023. FDA granted Orphan Drug Designation for NP10679 in December 2021."
    },
    {
      id: "antios",
      name: "Antios Therapeutics",
      type: "startup",
      size: 15,
      description: "Atlanta-based biotech focused on developing a cure for Hepatitis B virus (HBV).",
      website: "https://antiostherapeutics.com",
      keyPersonnel: [
      "Abel De La Rosa"
    ],
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
      keyPersonnel: [
      {
        "name": "Brent Layton",
        "linkedin": "https://www.linkedin.com/in/brent-layton-514091157/"
      }
    ],
      recentNews: "Acquired by Altaris Capital Partners in Oct 2024. Jeff Arnold continues as Executive Chairman."
    },
    {
      id: "florence",
      name: "Florence Healthcare",
      type: "company",
      size: 17,
      description: "Leading eClinical software company providing an electronic Trial Master File (eTMF) platform. Series C funding totaled $107M ($80M + $27M).",
      website: "https://florencehc.com",
      keyPersonnel: [
      {
        "name": "Ryan Jones",
        "linkedin": "https://www.linkedin.com/in/adventurejones/"
      }
    ],
      recentNews: "Network has grown to over 37,000 research sites in 44 countries."
    },
    {
      id: "clearside",
      name: "Clearside Biomedical",
      type: "public_company",
      size: 16,
      description: "Biopharmaceutical company developing treatments for sight-threatening diseases. A Georgia Tech spinout commercializing a proprietary microinjector technology.",
      website: "https://clearsidebio.com",
      keyPersonnel: [
      {
        "name": "Dr. George Lasezkay",
        "linkedin": "https://www.linkedin.com/in/george-lasezkay-1848679/"
      }
    ],
      recentNews: "Positive results from Phase 2b trial in wet AMD (CLS-AX). Focusing on suprachoroidal drug delivery for retinal diseases."
    },
    {
      id: "vero",
      name: "VERO Biotech",
      type: "company",
      size: 17,
      description: "Medtech company with an FDA-approved inhaled nitric oxide system (Genosyl®) for neonatal respiratory failure.",
      website: "https://vero-biotech.com",
      keyPersonnel: [
      {
        "name": "Brent V. Furse",
        "linkedin": "https://www.linkedin.com/in/brentfurse/"
      }
    ],
      recentNews: "Relocating HQ and manufacturing to Atlanta. Developing next-gen inhaled nitric oxide delivery systems."
    },
    {
      id: "artivion",
      name: "Artivion",
      type: "public_company",
      size: 18,
      description: "Formerly CryoLife, a global leader in cardiac and vascular surgery solutions.",
      website: "https://artivion.com",
      keyPersonnel: [
      {
        "name": "Pat Mackin",
        "linkedin": "https://www.linkedin.com/in/pat-mackin-223aa7151/"
      }
    ],
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
      {
        "name": "Eddie Lai",
        "linkedin": "https://www.linkedin.com/in/edwarddlai/"
      },
      {
        "name": "Ashley Cornelison",
        "linkedin": "https://www.linkedin.com/in/ashley-cornelison/"
      }
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
      keyPersonnel: [
      {
        "name": "Hank Capps",
        "linkedin": "https://www.linkedin.com/in/nasirwise/"
      },
      {
        "name": "Jaimie Clark",
        "linkedin": "https://www.linkedin.com/in/jaimiesclark/"
      },
      {
        "name": "Stefanie Diaz",
        "linkedin": "https://www.linkedin.com/in/thestefaniediaz/"
      }
    ],
      recentNews: "Has made over 21 startup investments and provides pilot opportunities within the Wellstar health system."
    },
    {
      id: "bip",
      name: "BIP Ventures",
      type: "vc",
      size: 16,
      description: "Atlanta-based VC firm (formerly Panoramic Ventures) that invests across technology sectors, including a significant practice in health IT.",
      website: "https://bipventures.vc",
      keyPersonnel: [
      {
        "name": "Austin Poole",
        "linkedin": "https://www.linkedin.com/in/austinmpoole/"
      },
      {
        "name": "Tami McQueen",
        "linkedin": "https://www.linkedin.com/in/tamimcqueen/"
      }
    ],
      recentNews: "Actively investing across Seed to Series B, with portfolio companies like OncoLens and The Rounds."
    },
    {
      id: "noro",
      name: "Noro-Moseley Partners",
      type: "vc",
      size: 15,
      description: "One of Atlanta's most established VC firms (founded 1983), focusing on healthcare IT and tech-enabled services.",
      website: "https://noromoseley.com",
      keyPersonnel: [
      {
        "name": "Ryan Collins",
        "linkedin": "https://www.linkedin.com/in/ryan-collins-661a6547/"
      }
    ],
      recentNews: "Active in healthcare IT, recently backing KODE Health's $27M Series B in Jan 2025."
    },
    {
      id: "gra_fund",
      name: "GRA Venture Fund",
      type: "vc",
      size: 14,
      description: "State-affiliated seed fund that invests exclusively in companies emerging from Georgia's research universities.",
      website: "https://gra.org/venture-fund/",
      keyPersonnel: [
      {
        "name": "Connor Seabrook",
        "linkedin": "https://www.linkedin.com/in/connor-seabrook-4659553/"
      }
    ],
      recentNews: "Co-invests alongside private VCs in Georgia research spinouts, requiring a 3:1 private match."
    },
    {
      id: "atlanta_ventures",
      name: "Atlanta Ventures",
      type: "vc",
      size: 13,
      description: "Venture studio that builds and invests in seed-stage SaaS and digital health companies.",
      website: "https://atlantaventures.com",
      keyPersonnel: [
      {
        "name": "David Cummings",
        "linkedin": "https://www.linkedin.com/in/davidcummings/"
      },
      {
        "name": "Kathryn O'Day",
        "linkedin": "https://www.linkedin.com/in/kathrynoday/"
      }
    ],
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
      keyPersonnel: [
      {
        "name": "Blake Patton",
        "linkedin": "https://www.linkedin.com/in/blakepatton/"
      }
    ],
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
      keyPersonnel: [
      {
        "name": "John Avery",
        "linkedin": "https://www.linkedin.com/in/johnwavery/"
      }
    ],
      recentNews: "Serves 150+ startups and has helped companies secure over $125M in SBIR grants."
    },
    {
      id: "create_x",
      name: "CREATE-X",
      type: "incubator",
      size: 16,
      description: "Georgia Tech initiative providing funding and mentorship to student and faculty founders. Has launched over 650 startups since 2014.",
      website: "https://create-x.gatech.edu",
      keyPersonnel: [
      {
        "name": "Raghupathy Sivakumar",
        "linkedin": "https://www.linkedin.com/in/sivarag/"
      }
    ],
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
      {
        "name": "Angela Gill Nelms",
        "linkedin": "https://www.linkedin.com/in/angelagillnelms/"
      },
      {
        "name": "Rifat Pamukcu",
        "linkedin": "https://www.linkedin.com/in/rifat-pamukcu/"
      },
      {
        "name": "Brian Walsh",
        "linkedin": "https://www.linkedin.com/in/brian-walsh-1bb681/"
      },
      {
        "name": "Manuel Kingsley",
        "linkedin": "https://www.linkedin.com/in/manuelkingsley/"
      },
      {
        "name": "Jessie Buckelew",
        "linkedin": "https://www.linkedin.com/in/jessie-buckelew-24868b8a/"
      }
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
      keyPersonnel: [
      {
        "name": "Morgan Greenleaf",
        "linkedin": "https://www.linkedin.com/in/morgan-greenleaf/"
      }
          ],
      recentNews: "Opened in early 2023; residents benefit from Biolocity network and core facility access."
    },
    {
      id: "quadrant_i",
      name: "Quadrant-i",
      type: "facility",
      size: 15,
      description: "Georgia Tech's innovation acceleration hub transforming disruptive research into scalable startups. Quadrant-i empowers faculty and students through expert-led commercialization strategy, venture-building programs, and investor access—bridging research and market impact.",
      website: "https://quadrant-i.gatech.edu/",
      keyPersonnel: [
      {
        "name": "Harold Solomon",
        "linkedin": "https://www.linkedin.com/in/haroldmsolomon/"
      },
      {
        "name": "Cynthia Lee Sundell",
        "linkedin": "https://www.linkedin.com/in/cynthia-sundell-71b21017/"
      },
      {
        "name": "Jeff Garbers",
        "linkedin": "https://www.linkedin.com/in/jgarbers/"
      },
      {
        "name": "Jonathan Goldman",
        "linkedin": "https://www.linkedin.com/in/jonathanagoldman/"
      },
      {
        "name": "Richard Gruber",
        "linkedin": "https://www.linkedin.com/in/richard-gruber-b75327280/"
      },
      {
        "name": "Paul Joseph",
        "linkedin": "https://www.linkedin.com/in/paul-j-joseph-266015240/"
      }
          ],
      recentNews: "Launched as Georgia Tech's commercialization powerhouse in 2025. Partners with Technology Licensing to vet and launch startups across medtech, biotech, engineering, and diagnostics. Supports Biolocity teams and collaborates with GT VentureLab and EIR networks."
    },
    {
      id: "venturelab",
      name: "VentureLab",
      type: "facility",
      size: 15,
      description: "Georgia Tech's startup incubation and customer discovery program. Serves as an NSF I-Corps Node, helping faculty and student innovators across biotech, medtech, AI, and engineering translate research into marketable ventures.",
      website: "https://venturelab.gatech.edu/",
      keyPersonnel: [
      {
        "name": "Keith McGreggor",
        "role": "Director",
        "linkedin": "https://www.linkedin.com/in/keithmcgreggor/"
      },
      {
        "name": "Sara Henderson",
        "role": "Associate Director",
        "linkedin": "https://www.linkedin.com/in/sara-martin-henderson/"
      }
          ],
      recentNews: "Leads Georgia Tech's NSF I-Corps Node and early-stage founder support programs. Works closely with Quadrant-i, CREATE-X, and Biolocity to support translational research commercialization."
    },
    {
      id: "augusta_biobusiness_incubator",
      name: "Augusta Biobusiness Incubator",
      type: "incubator",
      size: 12,
      description: "Life sciences business incubator at Augusta University supporting biotech research translation and company formation in eastern Georgia.",
      website: "https://www.augusta.edu/research/oic/biobusiness-incubator.php",
      keyPersonnel: [],
      recentNews: "Part of Augusta University's innovation ecosystem. Supports life sciences ventures with lab space, mentorship, and access to Augusta University's core facilities."
    },
    {
      id: "collabtech_gsu",
      name: "CollabTech",
      type: "incubator",
      size: 12,
      description: "Downtown Atlanta biotech incubator hosted by Georgia State University. Offers lab space and core facilities for early-stage bioscience companies.",
      website: "https://research.gsu.edu/georgia-state-technology-enterprises/",
      keyPersonnel: [],
      recentNews: "Part of Georgia State's research commercialization initiatives. Located at 58 Edgewood Avenue."
    },
    {
      id: "t2c2_gatech",
      name: "T2C2",
      type: "community",
      size: 10,
      description: "Georgia Tech-based student consulting program supporting translational research and tech transfer initiatives.",
      website: "",
      keyPersonnel: [],
      recentNews: "Student-led program providing consulting services to support Georgia Tech's translational research and commercialization efforts."
    },
    {
      id: "eidd",
      name: "EIDD",
      type: "serviceProvider",
      size: 14,
      description: "Translational drug discovery center at Emory University focused on antiviral and small molecule therapeutics. Provides lead optimization, IND-enabling studies, and CMC support for internal and external biotech partners.",
      website: "https://eidd.emory.edu/index.html",
      keyPersonnel: [],
      recentNews: "EIDD has supported antiviral drug discovery efforts including molnupiravir (LAGEVRIO) and continues to provide infrastructure for Emory spinouts and licensed therapeutics."
    },


    {
      id: "ariel_savannah_angel_partners",
      name: "ASAP",
      type: "vc",
      size: 12,
      description: "Savannah-based angel investment group supporting early-stage startups across the Southeast. Invests in life sciences, biotech, and medtech ventures with Georgia ties.",
      website: "https://asap-invests.com",
      keyPersonnel: [],
      recentNews: "Portfolio includes TYBR Health, InnAVasc Medical, and other medical technology startups across Georgia."
    },
    {
      id: "biospark_labs",
      name: "BioSpark Labs",
      type: "lab_space",
      size: 12,
      description: "Purpose‑built shared wet‑lab, cleanroom, and office facility for early‑stage biotech and life sciences startups at Science Square, Atlanta.",
      website: "https://www.biosparklabs.com",
      keyPersonnel: [],
      recentNews: "BioSpark opened a new 17,000 SF facility in 2023 at Science Square to support biotech startups affiliated with Emory, Georgia Tech, and Georgia State."
    },
    {
      id: "ascend_atlanta",
      name: "Ascend Atlanta",
      type: "community",
      size: 11,
      description: "Entrepreneurship accelerator and network based at Morehouse Innovation Center, focused on scaling minority-owned startups in Georgia through capital access and mentorship.",
      website: "https://www.ascendatl.org",
      keyPersonnel: [],
      recentNews: "Sponsored by JPMorgan and operated by Morehouse MIEC. Supports high-growth Black and Latinx founders in the Atlanta innovation ecosystem."
    },
    {
      id: "cranium_incubator",
      name: "Cranium Incubator",
      type: "incubator",
      size: 11,
      description: "Atlanta-based incubator supporting underrepresented founders in early-stage fundraising, product validation, and startup strategy. Backed by investor Joe Beverly.",
      website: "https://cranium-incubator.com",
      keyPersonnel: [],
      recentNews: "Launched in 2020 to increase diversity in venture-backed startups. Hosts educational programming and investor prep cohorts."
    },
    {
      id: "propel_center",
      name: "Propel Center",
      type: "education",
      size: 13,
      description: "Global innovation and learning hub for HBCU students and faculty headquartered at Clark Atlanta University. Focuses on tech, health equity, and STEM entrepreneurship.",
      website: "https://propelcenter.org",
      keyPersonnel: [],
      recentNews: "Backed by Apple and Southern Company. Operates with a mission to diversify the innovation pipeline in health, biotech, and beyond."
    },
    {
      id: "tag_digital_health",
      name: "TAG Digital Health Society",
      type: "professional_association",
      size: 55,
      description: "Statewide society housed within the Technology Association of Georgia that advances healthcare innovation and digital health across Georgia with events, collaboration, and an ecosystem directory.",
      website: "https://www.tagonline.org/chapters-and-societies/health/",
      keyPersonnel: [],
      recentNews: "Maintains Georgia's Digital Health Ecosystem directory (~460 orgs), hosts events on medtech, health IT, and equity; sponsors include Northside Hospital, UCB Pharmaceuticals."
    },
    {
      id: "adjust_center_emory",
      name: "ADJUST Center",
      type: "serviceProvider",
      size: 12,
      description: "The Center for the Advancement of Diagnostics for a Just Society (ADJUST) at Emory University: translational diagnostics incubator focused on equitable diagnostic technology development and validation.",
      website: "https://adjust.emory.edu",
      keyPersonnel: [],
      recentNews: "Operates a CLIA-certified diagnostics laboratory, supports assay development for public health, and collaborates on pediatric and community health diagnostics translation."
    },

    {
      id: "hatchbridge",
      name: "HatchBridge Incubator",
      type: "incubator",
      size: 11,
      description: "Startup incubator located at Kennesaw State University focused on supporting faculty, student, and community ventures across life sciences, software, and deep tech sectors.",
      website: "https://research.kennesaw.edu/hatchbridge",
      keyPersonnel: [],
      recentNews: "Launched in 2023 and has supported over 50 ventures. Hosts Georgia Startup Launch grants and connects founders with mentors and funders."
    },

    {
      id: "kennesaw_state_university",
      name: "Kennesaw State",
      type: "university",
      size: 15,
      description: "Major public university in Georgia with growing research activity in biosciences, entrepreneurship, and engineering. Hosts the HatchBridge startup incubator.",
      website: "https://www.kennesaw.edu",
      keyPersonnel: [],
      recentNews: "HatchBridge incubator launched in 2023 to support faculty and student-led ventures, with ties to Georgia Startup Launch and GRA programs."
    },

    {
      id: "mercer_university",
      name: "Mercer University",
      type: "university",
      size: 16,
      description: "Georgia-based private university with strengths in health sciences, pharmacy, biomedical engineering, and community health. Operates multiple campuses and translational research programs.",
      website: "https://www.mercer.edu",
      keyPersonnel: [],
      recentNews: "Mercer supports entrepreneurship through the Mercer Innovation Center and health innovation through its School of Medicine and College of Pharmacy."
    },

    {
      id: "mercer_innovation_center",
      name: "Mercer Innovation Center",
      type: "community",
      size: 12,
      description: "Entrepreneurship and innovation hub at Mercer University supporting early-stage ventures in healthcare, bioscience, and tech across Georgia with mentorship, incubation, and investor access.",
      website: "https://mic.mercer.edu",
      keyPersonnel: [],
      recentNews: "Operates campus incubators in Macon, Atlanta, and Savannah with programming that includes translational medtech and community health ventures."
    },
    {
      id: "piezo_therapeutics",
      name: "Piezo Therapeutics",
      type: "startup",
      size: 12,
      description: "Georgia Tech spinout focused on enabling next-gen nucleic acid vaccines and therapeutics via energy-based delivery. Integrating innovations in drug delivery and genetic medicine, Piezo is advancing its delivery platform and investigational therapeutics in collaboration with global pharma and biotech companies to prevent and treat deadly or debilitating diseases.",
      website: "https://www.piezotx.com/",
      keyPersonnel: [
        {
          "name": "Gaurav Byagathvalli",
          "linkedin": "https://www.linkedin.com/in/gaurav-byagathvalli/"
        }
      ],
      recentNews: "Raised initial financing in 2023 led by Good Ventures. Located at 58 Edgewood Ave NE, Atlanta."
    },
    {
      id: "palate_therapeutics",
      name: "Palate Therapeutics",
      type: "startup",
      size: 10,
      description: "IndieBio NY06 company working to address the growing prevalence of metabolic diseases including insulin resistance, obesity, and diabetes. Developing an oral oligonucleotide therapy to temporarily alter how sweet foods taste and how they are metabolized to help change patient's food preferences.",
      website: "https://www.linkedin.com/company/palate-therapeutics/",
      keyPersonnel: [
        {
          "name": "Mighten Yip",
          "linkedin": "https://www.linkedin.com/in/mighten-yip/"
        }
      ],
      recentNews: "Part of IndieBio NY06 cohort. Focuses on metabolic disease therapeutics through oral oligonucleotide therapy."
    },
    {
      id: "university_bioconnect",
      name: "University Bioconnect",
      type: "community",
      size: 11,
      description: "Atlanta-based biotech community connecting university students and researchers with local industry professionals through meetups and networking events.",
      website: "https://www.meetup.com/university-bioconnect/",
      keyPersonnel: [],
      recentNews: "Hosts recurring meetups for early-career biotech professionals in the Atlanta region."
    },
    {
      id: "cordx",
      name: "CorDx",
      type: "company",
      size: 18,
      description: "Multi-national biotech organization headquartered in Atlanta focused on rapid testing and point-of-care medical device solutions for infectious disease detection, pregnancy, drugs of abuse, and biomarkers. Leverages AI and data science for diagnostic solutions.",
      website: "https://cordx.com/",
      keyPersonnel: [],
      recentNews: "Founded in 2006 with over 2,100 employees globally. Serves millions of users in over 100 countries. Recently showcased 3-in-1 COVID-19, Flu A & B test at ADLM 2025."
    },
    {
      id: "lucid_scientific",
      name: "Lucid Scientific",
      type: "company",
      size: 14,
      description: "Atlanta-based biotech company creating Resipher, the world's first real-time cell culture monitor to measure oxygen consumption in standard multi-well plates. Provides continuous insight for cell metabolism research and drug screening.",
      website: "https://lucidsci.com",
      keyPersonnel: [
        {
          "name": "Walker Inman",
          "linkedin": "https://www.linkedin.com/in/walker-inman-4954aa8/"
        }
      ],
      recentNews: "Founded in 2012. Raised $7M Series A in 2023 led by IAG Capital Partners. Resipher technology used in mitochondrial function research and cell metabolism studies."
    },
    {
      id: "timeless_biosciences",
      name: "Timeless Biosciences",
      type: "startup",
      size: 8,
      description: "Atlanta-based biotech startup enabling precision diagnostics and targeted treatment through systems biology models informed by real-world patient data. Focuses on complex chronic conditions through precision medicine approaches.",
      website: "https://www.timelessbiosciences.com/",
      keyPersonnel: [
        {
          "name": "Nita Jain",
          "linkedin": "https://www.linkedin.com/in/nitajain/"
        }
      ],
      recentNews: "Founded in 2024. Early-stage startup focused on precision microbiome therapies for complex chronic diseases."
    },
    {
      id: "strados_labs",
      name: "Strados Labs",
      type: "startup",
      size: 12,
      description: "Digital health company with FDA-cleared RESP® wearable for continuous respiratory monitoring. Operates in both Philadelphia and Atlanta, supporting clinical trials and decentralized care.",
      website: "https://www.stradoslabs.com",
      keyPersonnel: [],
      recentNews: "Atlanta office supports decentralized clinical trials and respiratory innovation using RESP® wearable."
    },
    {
      id: "heald",
      name: "Heald",
      type: "company",
      size: 12,
      description: "Integrated diabetes remission program that focuses on the mind, as much as on the body. Uses atomic habits to create incremental progress in the journey. Doctor-led care team designs personalized healing plans based on lifestyle and physical condition, with app syncing to wearables for real-time progress tracking.",
      website: "https://iheald.com/",
      keyPersonnel: [],
      recentNews: "Founded in 2023. Located in Alpharetta, Georgia with 11-50 employees. Specializes in diabetes, healthcare, healthtech, machine learning, and Gen AI. Now eligible for FSA/HSA coverage."
    },
    {
      id: "emtherapro",
      name: "Emtherapro",
      type: "company",
      size: 15,
      description: "Next generation precision medicine enablement solution for neurodegenerative diseases. Empowers biotech, lifesciences and pharmaceutical companies to develop novel diagnostics and therapies using robust precision medicine approach with proteomics, AI/ML, and systems biology capabilities.",
      website: "https://emtherapro.com/",
      keyPersonnel: [
        {
          "name": "Kiran Pandey",
          "linkedin": "https://www.linkedin.com/in/kiranpandey/"
        },
        {
          "name": "Allan Levey",
          "linkedin": "https://www.linkedin.com/in/allan-levey-m-d-ph-d-0b8b0ba/"
        },
        {
          "name": "Duc Duong",
          "linkedin": "https://www.linkedin.com/in/duc-duong-6a063b34/"
        },
        {
          "name": "Nicholas Seyfried",
          "linkedin": "https://www.linkedin.com/in/nicholas-seyfried-3a1947/"
        }
      ],
      recentNews: "Emory spinout transforming diagnosis and treatment of neurodegenerative diseases through pioneering science, data and insights. Offers comprehensive precision medicine enablement solution with proteomics, drug discovery, and clinical trials capabilities. Uses Jones Day for legal counsel."
    },
    {
      id: "arc_proteomics",
      name: "Arc Proteomics",
      type: "company",
      size: 12,
      description: "Cutting-edge proteomics company dedicated to advancing drug and biomarker discovery through mass spectrometry-based proteomics. Offers discovery and targeted proteomics solutions using Orbitrap Astral platform for comprehensive proteome analysis.",
      website: "https://arcproteomics.com/",
      keyPersonnel: [
        {
          "name": "Kiran Pandey",
          "linkedin": "https://www.linkedin.com/in/kiranpandey/"
        },
        {
          "name": "Duc Duong",
          "linkedin": "https://www.linkedin.com/in/duc-duong-6a063b34/"
        },
        {
          "name": "Nicholas Seyfried",
          "linkedin": "https://www.linkedin.com/in/nicholas-seyfried-3a1947/"
        }
      ],
      recentNews: "Emory spinout located in Decatur, GA specializing in proteome-wide assays for biomarker discovery. Offers comprehensive, customized proteomics solutions for academic institutions and biotechnology companies. Uses Jones Day for legal counsel."
    },
    {
      id: "orthopreserve",
      name: "OrthoPreserve",
      type: "startup",
      size: 8,
      description: "Medical technology startup developing an artificial meniscus replacement implant to restore knee joint function. Aims to relieve pain and impairment, allow for quick recovery, and reduce the risk of arthritis and knee replacements in patients with previous meniscus injuries.",
      website: "https://www.orthopreserve.com",
      keyPersonnel: [
        {
          "name": "Jonathan Schwartz",
          "linkedin": "https://www.linkedin.com/in/jonathanwschwartz/"
        },
        {
          "name": "Cyrus Kump",
          "linkedin": "https://www.linkedin.com/in/cyrus-kump-69308a91/"
        },
        {
          "name": "Brendan Baggot",
          "linkedin": "https://www.linkedin.com/in/brendan-baggot/"
        },
        {
          "name": "Max Guillot",
          "linkedin": ""
        }
      ],
      recentNews: "Founded in 2021. Selected as one of 6 finalists for the Startup Prize: Focus on Health 2025 competition. Meniscus implant currently undergoing pre-clinical testing. Located in Atlanta, Georgia with 2-10 employees."
    },
    {
      id: "oridivus",
      name: "Oridivus",
      type: "startup",
      size: 8,
      description: "Atlanta-based biotechnology company focused on oral wound healing by leveraging the innate immune system. Specializes in pharma and drug delivery solutions for oral health applications.",
      website: "",
      keyPersonnel: [
        {
          "name": "Nathan Chiappa",
          "linkedin": "https://www.linkedin.com/in/nathan-chiappa-phd-1912a4142/"
        },
        {
          "name": "Steven Goudy",
          "linkedin": "https://www.linkedin.com/in/steven-goudy-md-mba-b3ba819/"
        }
      ],
      recentNews: "Founded in 2019. Located in Atlanta, Georgia with 2-10 employees. Focuses on biotechnology research for oral wound healing through innate immune system modulation."
    },
    {
      id: "paint_therapeutics",
      name: "Paint Therapeutics",
      type: "startup",
      size: 8,
      description: "Atlanta-based emerging seed-funded biotechnology company utilizing proprietary drug targeting algorithm to improve localization and duration of action of therapeutic agents in the tissues where they are needed most. Paint's conjugation-based therapeutic development platforms enable rapid generation of clinical lead compounds with new compositions of matter starting from drugs already known to be active. Most advanced platform, PulmoPaint™, targets diseases of the lungs, with lead program for treatment of inflammatory lung diseases on track for IND in 2025. Advancing extensive pipeline of additional PulmoPaint™ products including immune potentiating approaches for lung-resident cancers, treatments for refractory and resistant bacterial lung infections including NTM, and preventive agents for viral respiratory infection prophylaxis.",
      website: "https://www.painttherapeutics.com/",
      keyPersonnel: [
        {
          "name": "Bill Reddick",
          "linkedin": "https://www.linkedin.com/in/bill-reddick-b042894/"
        },
        {
          "name": "Eric Springman",
          "linkedin": "https://www.linkedin.com/in/ericspringmanphd/"
        },
        {
          "name": "Mariah Stewart",
          "linkedin": "https://www.linkedin.com/in/mariah-stewart-unc/"
        }
      ],
      recentNews: "Founded in 2022. Seeking additional funding partners to continue both lead advancement and further platform development. Industry: Biotechnology Research. Company size: 2-10 employees."
    },
    {
      id: "nutrivert",
      name: "Nutrivert",
      type: "startup",
      size: 12,
      description: "Atlanta-based animal health company developing non-antibiotic alternatives for livestock production. Nutrivert LDPP is a synthetic non-antibiotic product that mimics a cell wall component released by all bacteria, reducing inflammation and promoting better growth and feed conversion. Designed to improve livestock health and feed efficiency without relying on antibiotics, targeting the $5.8 billion veterinary livestock antibiotics growth promotion market. Also developing early-stage products for protection against Flu.",
      website: "https://www.nutrivertglobal.com/",
      keyPersonnel: [
        {
          "name": "Horace Nalle",
          "linkedin": "https://www.linkedin.com/in/horace-nalle-8b7a6030/"
        },
        {
          "name": "Bernhard Kaltenboeck",
          "linkedin": "https://www.linkedin.com/in/bernhard-kaltenboeck-18b32661/"
        },
        {
          "name": "Peter Selover",
          "linkedin": "https://www.linkedin.com/in/peterselover/"
        }
      ],
      recentNews: "Winner of the Cade Prize for Creativity and Innovation. GRA portfolio company. Developing alternatives to the $5.8 billion veterinary livestock antibiotics market."
    },
    {
      id: "fibronox",
      name: "FibroNox",
      type: "startup",
      size: 8,
      description: "Atlanta-based biotechnology company focused on developing patented first-in-class therapeutics to treat and reverse life-threatening fibrotic diseases. FibroNox has pioneered the development of selective Nox4 inhibitors and Nrf2 activators that have shown robust protection from fibrosis development and promoted the reversal of age-associated established fibrosis. Initial focus is treating idiopathic pulmonary fibrosis (IPF) and fibrosis in Duchenne muscular dystrophy. FibroNox's therapeutics offer the opportunity to reverse age-associated established fibrosis, representing the holy grail for more effective strategies to treat fibrotic diseases.",
      website: "https://fibronox.com/",
      keyPersonnel: [
        {
          "name": "Joseph Patti",
          "linkedin": "https://www.linkedin.com/in/josephmpatti/"
        },
        {
          "name": "Louise Hecker",
          "linkedin": "https://www.linkedin.com/in/louise-hecker-69ba1915/"
        }
      ],
      recentNews: "Founded in 2023. Developing inhaled therapeutic delivery for pulmonary fibrosis with significant advantages over current FDA-approved treatments. Targeting 140,000 IPF patients in the U.S. with 40,000 deaths per year."
    },
    {
      id: "oncospherix",
      name: "OncoSpherix",
      type: "startup",
      size: 8,
      description: "Atlanta-based pre-clinical stage oncology drug development company advancing a proprietary platform of first-in-class small molecule therapeutics designed to improve quality of life and survival for people with many forms of cancer by targeting a common feature of solid tumors: the activation of hypoxia inducible factor-1 (HIF-1). Nearly all solid cancers grow faster than their blood supply, leading to regions of low oxygen in tumors and HIF activation, which induces expression of over 100 genes that help tumor cells survive and spread. OncoSpherix has several classes of small molecules that block activation of HIF-1 through novel mechanisms.",
      website: "https://oncospherix.com/",
      keyPersonnel: [
        {
          "name": "Margaret K. Offermann",
          "linkedin": "https://www.linkedin.com/in/margaret-k-offermann-236b505/"
        },
        {
          "name": "Erwin Van Meir",
          "linkedin": "https://www.linkedin.com/in/erwinvanmeirphd/"
        },
        {
          "name": "Steve Coats",
          "linkedin": "https://www.linkedin.com/in/steve-coats-99a5066/"
        },
        {
          "name": "Allan Valmonte",
          "linkedin": "https://www.linkedin.com/in/avalmonte/"
        }
      ],
      recentNews: "Founded in 2018. Lead clinical candidate has been shown in mouse models to reduce primary tumor growth, inhibit metastases, and prolong survival in many types of cancer including glioblastoma, pancreatic cancer, uveal melanoma, lung cancer, and breast cancer. Agents are well tolerated and can be combined with therapeutics that work in well oxygenated regions of cancers."
    },
    {
      id: "emory_ott",
      name: "Emory OTT",
      type: "serviceProvider",
      size: 17,
      description: "Emory's central technology transfer office, advising researchers on IP, licensing, commercialization, and supporting translational startups.",
      website: "https://ott.emory.edu",
      keyPersonnel: [],
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
      {
        "name": "Timothy Denning",
        "linkedin": "https://www.linkedin.com/in/tim-denning-phd-4b13728b/"
      },
      {
        "name": "Justin Burns",
        "linkedin": "https://www.linkedin.com/in/jburns301/"
      },
      {
        "name": "Andrew Short",
        "linkedin": "https://www.linkedin.com/in/andreweshort/"
      }
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
      keyPersonnel: [
      {
        "name": "Maria Thacker-Goethe",
        "linkedin": "https://www.linkedin.com/in/mariathacker/"
      }
    ],
      recentNews: "Organization rebranded from Georgia Bio to Georgia Life Sciences in January 2025 to reflect expanded membership and scope."
    },
    {
      id: "rowen",
      name: "Rowen Foundation",
      type: "development",
      size: 16,
      description: "Developing a 2,000-acre knowledge community in Gwinnett County focused on biotech, agriculture, and environmental tech.",
      website: "https://rowenlife.com",
      keyPersonnel: [
      {
        "name": "Mason Ailstock",
        "linkedin": "https://www.linkedin.com/in/masonailstock/"
      }
    ],
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
      id: "georgia_ctsa",
      name: "Georgia CTSA",
      type: "government",
      size: 14,
      description: "Georgia Clinical & Translational Science Alliance (Georgia CTSA) is an NIH-funded statewide collaboration accelerating clinical and translational research across Emory, Georgia Tech, Morehouse School of Medicine, and Georgia State University.",
      website: "https://georgiactsa.org",
      keyPersonnel: [],
      recentNews: "Supports clinical trials infrastructure, pilot grant funding, and translational training programs across Atlanta's research universities and hospitals."
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
        size: 14,
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
      keyPersonnel: [
      {
        "name": "William Trey Langley",
        "linkedin": "https://www.linkedin.com/in/william-trey-langley-17147921/"
      }
    ],
      recentNews: "Continues to operate as a specialized neurogenetic testing lab within LabCorp."
    },
    {
      id: "axion_biosystems",
      name: "Axion BioSystems",
      type: "serviceProvider",
      size: 15,
      description: "Atlanta‑headquartered live‑cell analysis platform company (MEA & imaging) spun out of Georgia Tech and widely used in neuroscience, cardiology, oncology, and virology research.",
      website: "https://axionbiosystems.com",
      keyPersonnel: [
      {
        "name": "Julien Bradley",
        "role": "CEO",
        "linkedin": "https://www.linkedin.com/in/julienbradley/"
      }
    ],
      recentNews: "Acquired by Summa Equity in 2021; raised ~$20M including support via GRA Venture Fund."
    },
    {
      id: "radyus",
      name: "Radyus Research",
      type: "serviceProvider",
      size: 13,
      description: "Boutique preclinical CRO providing grant writing and project management services to startups.",
      website: "https://radyusresearch.com",
      keyPersonnel: [
      {
        "name": "Marta New",
        "linkedin": "https://www.linkedin.com/in/melarnew/"
      },
      {
        "name": "Kamyra Edokpolor",
        "linkedin": "https://www.linkedin.com/in/kamyra-edokpolor/"
      },
      {
        "name": "Benjamin Siciliano",
        "linkedin": "https://www.linkedin.com/in/benjamin-siciliano/"
      },
      {
        "name": "Anthony Chilton",
        "linkedin": "https://www.linkedin.com/in/anthony-chilton-1994298/"
      },
      {
        "name": "Caitlin J. Couch",
        "linkedin": "https://www.linkedin.com/in/catecouch/"
      },
      {
        "name": "Dave Edwards",
        "linkedin": "https://www.linkedin.com/in/dave-edwards-a3a736b/"
      }
    ],
      recentNews: "Announced strategic partnerships in 2024‑25 with Eurofins CDMO Alphora (May 2025) and Dt&CRO (May 2024) to deliver integrated, end‑to‑end drug development services—from preclinical through GMP manufacturing—for biotech clients globally."
    },
    {
      id: "tempus",
      name: "Tempus",
      type: "serviceProvider",
      size: 17,
      description: "Chicago-based precision medicine company with Atlanta genomics lab (acquired from AKESOgen in 2019). Maintains significant local operations and clinical partnerships but not Atlanta-founded.",
      website: "https://www.tempus.com",
      keyPersonnel: [
      {
        "name": "Maria Mikkelson",
        "linkedin": "https://www.linkedin.com/in/maria-mikkelson-1b97b784/"
      },
      {
        "name": "Christoff Coetzee",
        "linkedin": "https://www.linkedin.com/in/christoff-coetzee-7673291/"
      }
    ],
      recentNews: "Acquired AKESOgen in 2019; maintains Atlanta operations as part of its national genomics infrastructure for precision medicine and clinical trials."
    },
    {
      id: "king_spalding",
      name: "King & Spalding",
      type: "serviceProvider",
      size: 11,
      description: "Global law firm with a world-renowned FDA regulatory and life sciences practice. Represents major local biotechs like VERO.",
      website: "https://kslaw.com",
      keyPersonnel: [
      {
        "name": "Mark Brown",
        "linkedin": "https://www.linkedin.com/in/mark-brown-3b38b93/"
      }
    ],
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
      {
        "name": "Russell Allen",
        "linkedin": "https://www.linkedin.com/in/rallen/"
      },
      {
        "name": "William Dull",
        "linkedin": "https://www.linkedin.com/in/william-dull/"
      }
    ],
      recentNews: "Supports startups emerging from academic accelerators and translational research programs."
    },


    {
      id: "iqvia_atlanta",
      name: "IQVIA",
      type: "serviceProvider",
      size: 15,
      description: "Global CRO with Atlanta office providing clinical trial services and CDC partnerships",
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
      keyPersonnel: [
        {
          "name": "Kristy Nichols",
          "linkedin": "https://www.linkedin.com/in/kristy-nichols-85068410/"
        }
      ],
      recentNews: "Regional clinical trial services"
    },
    {
      id: "woven_health_collective",
      name: "Woven Health Collective",
      type: "serviceProvider",
      size: 13,
      description: "Healthcare commercialization consultancy formerly known as 11TEN Innovation Partners. Offers co-design, real-world piloting, and strategic support via its Innovation Lab in Atlanta.",
      website: "https://11ten.com",
      keyPersonnel: [
      {
        "name": "James Lewis",
        "linkedin": "https://www.linkedin.com/in/jamesrlewis2/"
      },
      {
        "name": "Caleb Szubski",
        "linkedin": "https://www.linkedin.com/in/calebrs/"
      },
      {
        "name": "Steve Gertz",
        "linkedin": "https://www.linkedin.com/in/steve-gertz-bb0a3721/"
      }
    ],
      recentNews: "Rebranded to Woven Health Collective after 2024 acquisition by ClinicalMind. Continues to lead Emory Healthcare's innovation hub."
    },
    {
      id: "jpmorgan_chase",
      name: "JPMorgan Chase",
      type: "serviceProvider",
      size: 18,
      description: "Global financial services firm with a strong presence in Atlanta (Buckhead), supporting life sciences banking, commercial banking, wealth management, and technology operations.",
      website: "https://www.jpmorganchase.com",
      keyPersonnel: [
      {
        "name": "Courtney J. Law",
        "linkedin": "https://www.linkedin.com/in/courtneyjlaw/"
      }
    ],
      recentNews: "Expanding Atlanta office by 40,000 sq ft; designated as one of JPMorgan's 23 global technology centers; active in life sciences startup banking and biotech client services."
    },

    {
      id: "vizzia",
      name: "Vizzia Technologies",
      type: "serviceProvider",
      size: 14,
      description: "Atlanta-based provider of real-time location systems (RTLS) and environmental monitoring software for hospitals. Selected by CHOA, Grady, and Piedmont to support Georgia's largest healthcare construction projects.",
      website: "https://www.vizziatech.com",
      keyPersonnel: [
      {
        "name": "Dave Wiedman",
        "linkedin": "https://www.linkedin.com/in/dave-wiedman-b821881/"
      }
    ],
      recentNews: "Selected by CHOA for $1.5B Arthur M. Blank Hospital RTLS system; deployed solutions at Marcus Tower (Piedmont) and Correll Pavilion (Grady). Named Top 40 healthtech company by TAG."
    },
    {
      id: "jones_day",
      name: "Jones Day",
      type: "serviceProvider",
      size: 12,
      description: "Global law firm with an established Atlanta office; active in life sciences, medtech, M&A, cross-border and VC transaction support for startups and growth companies.",
      website: "https://www.jonesday.com",
      keyPersonnel: [
      {
        "name": "Bill Zawrotny",
        "linkedin": "https://www.linkedin.com/in/bill-zawrotny-19456b9/"
      },
      {
        "name": "Katie Vest",
        "linkedin": "https://www.linkedin.com/in/katievest/"
      }
          ],
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
      {
        "name": "Nadine Peever",
        "role": "Co-Founder",
        "linkedin": "https://www.linkedin.com/in/nadinepeever/"
      },
      {
        "name": "Alexa Morse",
        "role": "Advisor & Co-Founder",
        "linkedin": "https://www.linkedin.com/in/alexa-morse/"
      },
      {
        "name": "Sarah Carrigan",
        "role": "Public Health Engagement Chair",
        "linkedin": "https://www.linkedin.com/in/sarahdavid413/"
      },
      {
        "name": "Eddie Lai",
        "role": "Advisor",
        "linkedin": "https://www.linkedin.com/in/edwarddlai/"
      },
      {
        "name": "Patrick Kennedy",
        "role": "Host Team Member",
        "linkedin": "https://www.linkedin.com/in/patrick-kennedy-b7919a59/"
      },
      {
        "name": "Ben Huffman",
        "role": "Host Team Member",
        "linkedin": "https://www.linkedin.com/in/ben-1-huffman/"
      }
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
      name: "ACHE Georgia",
      type: "community",
      size: 12,
      description: "Professional society for healthcare executives across Georgia. Provides education, networking, and mentorship for clinical innovation leaders across hospitals, payers, and systems.",
      website: "https://ga.ache.org",
      keyPersonnel: [],
      recentNews: "Hosted Georgia Health Leaders Summit and connects hospital innovation teams with startups and vendors."
    },
    {
      id: "emory_biotech_consulting_club",
      name: "EBCC",
      type: "community",
      size: 11,
      description: "Student-led biotech consulting organization supporting Atlanta-area faculty inventors and startups with commercialization strategy. EBCC provides teams of graduate students from Emory, Georgia Tech, and Georgia State to perform market research, IP strategy, regulatory analysis, and customer discovery.",
      website: "https://scholarblogs.emory.edu/ebcc/",
      keyPersonnel: [
      {
        "name": "Bill Wuest",
        "linkedin": "https://www.linkedin.com/in/bill-wuest-7452063/"
      }
    ],
      recentNews: "Since launching in 2019 under the Innovate@Emory initiative, EBCC has completed 50+ startup projects with partners including Biolocity, Emory OTT, GRA, and Emory Advancement."
    },

    // EMERGING STARTUPS
    {
      id: "moonlight",
      name: "Moonlight Therapeutics",
      type: "startup",
      size: 10,
      description: "Developing a microneedle-based immunotherapy platform (TASIS) for food allergies. Portal Innovations' first Atlanta investment. Advancing lead program into Phase I trials.",
      website: "https://moonlighttx.com",
      keyPersonnel: [
      {
        "name": "Samir Patel",
        "linkedin": "https://www.linkedin.com/in/patelsamirkumar/"
      }
    ],
      recentNews: "Received multiple NIH grants and raised Series A co-led by Portal Innovations."
    },
    {
      id: "andson_biotech",
      name: "Andson Biotech",
      type: "startup",
      size: 13,
      description: "Georgia Tech spinout building the DynaChip™ X1 platform to automate and miniaturize mass spectrometry sample prep for biologics and advanced therapeutics. Enables faster, cheaper, and more scalable bioanalysis.",
      website: "http://www.andsonbiotech.com",
      keyPersonnel: [
      {
        "name": "Mason Chilmonczyk",
        "role": "CEO & Co‑Founder",
        "linkedin": "https://www.linkedin.com/in/mason-chil/"
      }
    ],
      recentNews: "Raised $3.6M in seed funding (April 2024) backed by Y Combinator, Merck Digital Studio, and GRA. Biolocity and Georgia Tech-supported technology."
    },
    {
      id: "sanguina",
      name: "Sanguina",
      type: "startup",
      size: 11,
      description: "Digital health startup spun out of Emory/GT collaboration. Developed AnemoCheck Mobile, a non-invasive app for anemia screening.",
      website: "https://sanguina.com",
      keyPersonnel: [
      {
        "name": "Erika Tyburski",
        "linkedin": "https://www.linkedin.com/in/erika-tyburski-292555b1/"
      }
    ],
      recentNews: "Received FDA Breakthrough Device status for its smartphone-based anemia screening app."
    },
    {
      id: "oxos",
      name: "OXOS Medical",
      type: "startup",
      size: 12,
      description: "Georgia Tech CREATE-X alumnus making portable, handheld X-ray imaging systems.",
      website: "https://oxos.com",
      keyPersonnel: [
      {
        "name": "Greg Kolovich",
        "linkedin": "https://www.linkedin.com/in/gregory-kolovich-777900117/"
      },
      {
        "name": "Evan Ruff",
        "linkedin": "https://www.linkedin.com/in/evan-ruff/"
      }
    ],
      recentNews: "Received FDA clearance for its handheld Micro C X-ray device and deployed devices in a VA pilot program."
    },
    {
      id: "altesa",
      name: "Altesa BioSciences",
      type: "startup",
      size: 12,
      description: "Antiviral company formed in partnership with Emory's DRIVE institute to develop treatments for respiratory viruses.",
      website: "https://altesabio.com",
      keyPersonnel: [
      {
        "name": "George Painter",
        "linkedin": "https://www.linkedin.com/in/george-painter-61ab25126/"
      },
      {
        "name": "Dennis Liotta",
        "linkedin": "https://www.linkedin.com/in/dennis-liotta-1b087729/"
      }
    ],
      recentNews: "Licensed Vapendavir from Vaxart to develop for RSV and other respiratory viruses."
    },
    {
      id: "braintrust",
      name: "BrainTrust Bio",
      type: "startup",
      size: 10,
      description: "Emory spinout founded by neurosurgeon Dr. Nicholas Boulis, focusing on novel drug delivery methods for the central nervous system.",
      website: "https://braintrustbio.com",
      keyPersonnel: [
      {
        "name": "Chen Benkler",
        "linkedin": "https://www.linkedin.com/in/chen-benkler/"
      },
      {
        "name": "Nicholas Boulis",
        "linkedin": "https://www.linkedin.com/in/nicholas-boulis-73124b39/"
      }
    ],
      recentNews: "Preclinical stage startup aiming to improve CNS drug delivery."
    },
    {
      id: "synaptrix",
      name: "Synaptrix",
      type: "startup",
      size: 10,
      description: "Atlanta-based startup developing a non-invasive, drug-free pain management system (NOVABLOC™) for post-operative knee pain. Clinical-stage therapy delivering novel electrical stimulation to extend pain relief while preserving sensory function.",
      website: "https://www.linkedin.com/company/novabloc-pain-free-knee/",
      keyPersonnel: [
      {
        "name": "Shyamy Sastry",
        "linkedin": "https://www.linkedin.com/in/shyamy-sastry-4508922/"
      }
    ],
      recentNews: "Backed by Portal Innovations. Completed feasibility studies showing >20 days of relief after one treatment."
    },
    {
      id: "topodx",
      name: "TopoDx",
      type: "startup",
      size: 10,
      description: "Diagnostic startup developing the Cosmos Platform for rapid, culture-free pathogen identification and antibiotic susceptibility testing using interferometry and AI. A spinout from Georgia Tech and Emory University.",
      website: "https://www.portalinnovations.com/portfolio/",
      keyPersonnel: [
      {
        "name": "Yogi Patel",
        "linkedin": "https://www.linkedin.com/in/yapatel/"
      }
    ],
      recentNews: "Backed by Portal Innovations. Developed a platform delivering microbial ID and resistance data in under 4 hours."
    },
    {
      id: "avanos",
      name: "Avanos",
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
      {
        "name": "Michael Tanenbaum",
        "linkedin": "https://www.linkedin.com/in/michael-tanenbaum-447a54b/"
      },
      {
        "name": "Nassir Mokarram",
        "linkedin": "https://www.linkedin.com/in/nassir-mokarram-5b966017/"
      }
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
      keyPersonnel: [
      {
        "name": "Doug Gooding",
        "linkedin": "https://www.linkedin.com/in/doug-gooding-75248967/"
      }
    ],
      recentNews: "Backed Emory-based projects in IBD, seizure disorders, and respiratory disease."
    },
    {
      id: "allonix",
      name: "Allonix",
      type: "startup",
      size: 10,
      description: "Emory spinout developing small molecule agonists targeting inflammation and cholesterol pathways for the treatment of inflammatory bowel disease (IBD). Co-founded with Orange Grove Bio.",
      website: "https://gra.org/company/324/Allonix.html",
      keyPersonnel: [
      {
        "name": "Eric Ortlund",
        "linkedin": "https://www.linkedin.com/in/eric-ortlund-31600611/"
      },
      "John Calvert"
    ],
      recentNews: "EDDF portfolio company focused on IBD therapeutics."
    },
    {
      id: "agrithera",
      name: "AgriThera",
      type: "startup",
      size: 10,
      description: "Emory spinout developing cannabinoid pro-drug therapeutics for seizure disorders, chronic pain, and anxiety.",
      website: "https://agrithera.com",
      keyPersonnel: [
      {
        "name": "Dennis Liotta",
        "linkedin": "https://www.linkedin.com/in/dennis-liotta-1b087729/"
      },
      {
        "name": "Stephen Traynelis",
        "linkedin": "https://www.linkedin.com/in/stephen-traynelis-22726ab/"
      }
    ],
      recentNews: "Part of EDDF portfolio targeting neurotherapeutics."
    },
    {
      id: "cambium_oncology",
      name: "Cambium",
      type: "startup",
      size: 13,
      description: "Immuno‑oncology startup headquartered in Atlanta, GA developing first‑in‑class VIP receptor antagonists (e.g. ANT308) to restore anti‑cancer T‑cell activity in tumors with elevated VIP/VPAC signaling.",
      website: "https://cambiumoncology.com",
      keyPersonnel: [
      {
        "name": "Ned Waller",
        "linkedin": "https://www.linkedin.com/in/edmundwaller/"
      },
      {
        "name": "Gary Altman",
        "linkedin": "https://www.linkedin.com/in/ggaltman/"
      }
    ],
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
      {
        "name": "Blake Anderson, MD",
        "linkedin": "https://www.linkedin.com/in/blake-anderson-md-176339a2/"
      },
      {
        "name": "Bradley Gallaher",
        "linkedin": "https://www.linkedin.com/in/bradleygallaher/"
      },
      {
        "name": "Ankit Tiwari",
        "linkedin": "https://www.linkedin.com/in/ankitrtiwari/"
      },
      {
        "name": "Will Akers",
        "linkedin": "https://www.linkedin.com/in/williamakers1177/"
      },
      {
        "name": "Kelly Luckasevic",
        "linkedin": "https://www.linkedin.com/in/kellyluckasevic/"
      },
      {
        "name": "Ashley Badgett",
        "linkedin": "https://www.linkedin.com/in/ashley-badgett/"
      },
      {
        "name": "Yuanda Zhu, PhD",
        "linkedin": "https://www.linkedin.com/in/yuanda-zhu/"
      }
    ],
      recentNews: "Continues to grow adoption of its AI-powered platform across provider networks. Built by clinicians with deep healthcare system expertise."
    },
    {
      id: "armor_medical",
      name: "Armor Medical",
      type: "startup",
      size: 10,
      description: "Atlanta-based medtech startup developing Maternal aRMOR, a wearable for early detection of postpartum hemorrhage.",
      website: "https://armormedical.us",
      keyPersonnel: [],
      recentNews: "Received strategic investment from Catalyst by Wellstar in June 2025; selected for MedTech Innovator 2025 showcase."
    },
    {
      id: "rimidi",
      name: "Rimidi",
      type: "startup",
      size: 12,
      description: "Atlanta-based digital health company offering software platforms for chronic disease management, patient engagement, and clinical decision support. Works with health systems to integrate into EHRs and personalize patient treatment.",
      website: "https://rimidi.com",
      keyPersonnel: [
      {
        "name": "Lucienne Ide",
        "linkedin": "https://www.linkedin.com/in/lucienneide/"
      }
    ],
      recentNews: "Partnered with Emory Healthcare to launch patient-centered treatment apps; continues to expand remote monitoring capabilities."
    },
    {
      id: "metaclipse",
      name: "Metaclipse Therapeutics",
      type: "startup",
      size: 10,
      description: "Atlanta-based immuno-oncology startup developing virus-like particle (VLP)-based personalized cancer vaccines using patient tumor neoantigen profiling and AI-powered peptide selection. Founded by Georgia Tech researchers with Emory-affiliated scientific advisors.",
      website: "https://metaclipse.com/",
      keyPersonnel: [
      {
        "name": "Hemanth Singuluri",
        "linkedin": "https://www.linkedin.com/in/hemanth-singuluri/"
      },
      {
        "name": "Sampath Ramachandiran",
        "linkedin": "https://www.linkedin.com/in/sampath-ramachandiran-714ab918/"
      }
    ],
      recentNews: "Emerging from stealth in 2024 with preclinical data on personalized VLP vaccine platform targeting solid tumors; affiliated with Georgia Tech and backed by seed-stage venture capital."
    },
    {
      id: "allai_health",
      name: "Allai Health",
      type: "startup",
      size: 10,
      description: "Atlanta-based AI-enabled precision medicine startup focused on genomics, early detection, and personalized health insights. Uses multimodal patient data to identify disease risk and improve outcomes.",
      website: "https://allaihealth.com/",
      keyPersonnel: [
      {
        "name": "Mark Bouzyk",
        "linkedin": "https://www.linkedin.com/in/mark-b-8a42648/"
      }
    ],
      recentNews: "Launched in 2023 by serial genomics entrepreneur Mark Bouzyk. Builds upon clinical genomics platforms developed through AKESOgen and other ventures."
    },
    {
      id: "nucleate_atlanta",
      name: "Nucleate",
      type: "community",
      size: 12,
      description: "Nonprofit organization accelerating the next generation of biotech founders from academia. Nucleate Atlanta chapter supports PhD and postdoc-led venture teams at Emory, Georgia Tech, and Morehouse through structured mentorship and company formation programs.",
      website: "https://nucleate.org/",
      keyPersonnel: [
      {
        "name": "Daniel Aziz",
        "linkedin": "https://www.linkedin.com/in/danielaziz298461138/"
      },
      {
        "name": "Sean Healy",
        "linkedin": "https://www.linkedin.com/in/sean-healy-53202b18b/"
      },
      {
        "name": "Hung-Jen Wu",
        "linkedin": "https://www.linkedin.com/in/hungjenwu/"
      }
    ],
      recentNews: "Launched Atlanta chapter in 2023. Supports cohorts of academic biotech teams with support from national partners like BMS, RA Capital, and Y Combinator Bio."
    },
    {
      id: "tamm_net",
      name: "TAMM Net",
      type: "serviceProvider",
      size: 12,
      description: "Atlanta-based strategic consulting firm specializing in regulatory strategy, market access, and commercialization planning for life sciences and digital health startups. Active partner in healthtech innovation and product launch strategy.",
      website: "https://www.tammnet.com/",
      keyPersonnel: [
      {
        "name": "Art Spalding",
        "linkedin": "https://www.linkedin.com/in/artspalding/"
      },
      {
        "name": "Betty Lou Anderson",
        "linkedin": "https://www.linkedin.com/in/bettylouanderson/"
      }
    ],
      recentNews: "Supports early-stage and growth healthtech firms in navigating regulatory and commercial milestones; frequently involved in regional biotech events and venture readiness programs."
    },
    {
      id: "exvade_bioscience",
      name: "Exvade Bioscience",
      type: "startup",
      size: 11,
      description: "Atlanta-based medtech startup developing the Tumor Monorail device for guiding glioblastoma cells into a retrievable reservoir, enabling serial biopsy and real‑time monitoring.",
      website: "https://www.exvadebio.com/",
      keyPersonnel: [
      {
        "name": "Nassir Mokarram, PhD",
        "linkedin": "https://www.linkedin.com/in/nassir-mokarram-5b966017/"
      },
      {
        "name": "Sean Meehan",
        "linkedin": "https://www.linkedin.com/in/sean-meehan-93799215/"
      },
      {
        "name": "Barun Brahma, MD",
        "linkedin": "https://www.linkedin.com/in/barun-brahma-b5b9247/"
      }
    ],
      recentNews: "Awarded NIH Fast‑Track Phase I/II SBIR in 2024. First‑in‑human trials initiated for GBM device in partnership with academic medical centers."
    },
    {
      id: "oncurna",
      name: "OnCuRNA",
      type: "startup",
      size: 11,
      description: "Georgia Tech/Biolocity-supported biotech startup developing nanostructured RNAi delivery platforms (SANGs) targeting solid tumors, including ovarian and other high‑need cancers.",
      website: "https://oncurna.com/",
      keyPersonnel: [
      {
        "name": "Nick Housley, PhD",
        "linkedin": "https://www.linkedin.com/in/nick-housley/"
      }
    ],
      recentNews: "Selected in 2025‑26 Biolocity cohort for ovarian cancer drug delivery platform – receiving mentorship and non‑dilutive funding."
    },
    {
      "id": "huxley_medical",
      "name": "Huxley Medical",
      "type": "startup",
      "size": 7,
      "description": "Atlanta‑based medical device company developing multi‑sensor diagnostic patch (SANSA) for cardio‑sleep and vital sign monitoring.",
      "website": "https://www.huxleymed.com/",
      "keyPersonnel": [
        {
          "name": "Chris Lee",
          "linkedin": "https://www.linkedin.com/in/chris-lee-20995922/"
        }
      ],
      "recentNews": "Raised $7.2M seed round in 2023 with support from GRA Venture Fund. CEO Chris Lee is a serial medtech entrepreneur (Vertera Spine) and Emory/GT alum."
    },
    {
      "id": "biocircuit_technologies",
      "name": "BioCircuit Technologies",
      "type": "startup",
      "size": 8,
      "description": "Atlanta‑based bioelectronics startup developing Nerve Tape®—a sutureless nerve repair patch backed by NIH SBIR and GRA Venture Fund support.",
      "website": "https://www.biocircuit.com/",
      "keyPersonnel": [],
      "recentNews": "NIH awarded $3M SBIR to expand Nerve Tape; GRA Venture Fund backed company through early-stage investment."
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
    { source: "georgia_ctsa", target: "emory", type: "collaboration", description: "Core CTSA partner leading clinical trials infrastructure and translational science programs." },
    { source: "georgia_ctsa", target: "gatech", type: "collaboration", description: "Georgia Tech co-leads Georgia CTSA efforts in device development, data science, and commercialization support." },
    { source: "georgia_ctsa", target: "morehouse", type: "collaboration", description: "Partner in CTSA community engagement, clinical trial access, and translational research training." },
    { source: "georgia_ctsa", target: "gsu", type: "collaboration", description: "Contributes public health and behavioral science expertise to statewide CTSA programs." },
    { source: "georgia_ctsa", target: "grady", type: "infrastructure", description: "Operates clinical research units within Grady for translational and population health research." },
    { source: "georgia_ctsa", target: "choa", type: "infrastructure", description: "Supports pediatric clinical research infrastructure at CHOA sites." },
    { source: "agetech_connect", target: "oak_street_health", type: "partnership", description: "AgeTech Connect engages Oak Street Health for aging-related healthcare pilot opportunities" },
    { source: "nucleate_atlanta", target: "gatech", type: "collaboration", description: "Nucleate Atlanta recruits founders and fellows from Georgia Tech graduate programs." },
    { source: "nucleate_atlanta", target: "emory", type: "collaboration", description: "Nucleate Atlanta partners with Emory students, postdocs, and faculty to launch biotech ventures." },
    { source: "nucleate_atlanta", target: "uga", type: "collaboration", description: "UGA students participate in Nucleate Atlanta's Activator and fellowship programs." },
    { source: "nucleate_atlanta", target: "gsu", type: "collaboration", description: "Georgia State students participate in Nucleate's regional cohort for Atlanta-based life sciences innovation." },
    { source: "gatech", target: "t2c2_gatech", type: "community_support", description: "Georgia Tech-based student consulting program supporting translational research and tech transfer." },
    { source: "gsu", target: "collabtech_gsu", type: "infrastructure", description: "CollabTech is Georgia State University's life sciences incubator providing lab space and core research facilities." },
    { source: "augusta_university", target: "augusta_biobusiness_incubator", type: "infrastructure", description: "Life sciences business incubator operated by Augusta University to support biotech startups and translational research." },
    { source: "emory", target: "eidd", type: "infrastructure", description: "EIDD is a drug discovery and translational research center established and operated by Emory University." },
    { source: "science_square", target: "biospark_labs", type: "infrastructure", description: "BioSpark Labs is the shared wet‑lab and core facility node within the Science Square life sciences district in Atlanta." },
    { source: "portal", target: "biospark_labs", type: "infrastructure", description: "Portal Innovations Atlanta operates and supports BioSpark Labs within its Science Square facility, integrating venture support and lab infrastructure." },
    { source: "gatech", target: "biospark_labs", type: "infrastructure", description: "Georgia Tech helped establish BioSpark Labs at Science Square and its core facilities serve startups located there." },
    { source: "ascend_atlanta", target: "morehouse", type: "affiliation", description: "Ascend Atlanta is hosted by the Morehouse Innovation & Entrepreneurship Center and supports minority startup acceleration." },
    { source: "propel_center", target: "cau", type: "infrastructure", description: "Propel Center is headquartered at Clark Atlanta University and serves as a national hub for HBCU innovation." },
    { source: "tag_digital_health", target: "georgia_bio", type: "affiliation", description: "TAG Digital Health Society collaborates statewide with Georgia Life Sciences (Georgia Bio) on digital health ecosystem events and directories supporting biotech‐adjacent innovation." },
    { source: "emory", target: "adjust_center_emory", type: "infrastructure", description: "Emory University operates the ADJUST Center, housing translational diagnostics labs and equity‑focused assay development capabilities." },
    { source: "hatchbridge", target: "kennesaw_state_university", type: "affiliation", description: "HatchBridge is Kennesaw State University's startup incubator, supporting students, faculty, and community founders." },

    { source: "mercer_innovation_center", target: "mercer_university", type: "affiliation", description: "Mercer Innovation Center is Mercer University's entrepreneurship hub, supporting innovation and startup formation across health, medtech, and community ventures." },
    { source: "gatech", target: "piezo_therapeutics", type: "spinout", description: "Georgia Tech spinout focused on energy-based nucleic acid delivery technology." },

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
    { source: "sanguina", target: "emory", type: "spinout", description: "Georgia Tech / Emory research spinout—AnemoCheck platform developed with Wilbur Lam (Emory/GT) and clinically validated using Emory patient data." },
    { source: "gatech", target: "topodx", type: "spinout", description: "Developed out of Georgia Tech research" },
    { source: "gatech", target: "metaclipse", type: "spinout", description: "Founded by Georgia Tech researchers; based on VLP platform technology developed at GT." },
    { source: "gatech", target: "andson_biotech", type: "spinout", description: "Georgia Tech spinout commercializing DynaChip™ microfluidic technology." },
    { source: "gatech", target: "axion_biosystems", type: "spinout", description: "Founded based on licensed technology from Georgia Tech NanoBioSensors Lab." },
    { source: "emory", target: "metaclipse", type: "collaboration", description: "Emory-affiliated advisors and founders contribute scientific expertise to VLP platform development." },
    { source: "avanos", target: "synaptrix", type: "spinout", description: "Spinout from Avanos Medical" },

    // --- VC Investments ---
    { source: "portal", target: "moonlight", type: "investment", description: "Co-led Series A for peanut allergy immunotherapy platform" },
    { source: "portal", target: "synaptrix", type: "investment", description: "Portfolio company focused on post-surgical pain management" },
    { source: "portal", target: "topodx", type: "investment", description: "Portfolio company advancing AI-driven AST diagnostics" },
    { source: "portal", target: "armor_medical", type: "membership", description: "Portal member company with access to lab space and resources" },
    { source: "eddf", target: "allonix", type: "investment", description: "EDDF portfolio investment in IBD therapeutics" },
    { source: "eddf", target: "agrithera", type: "investment", description: "EDDF portfolio investment in cannabinoid neurotherapeutics" },
    { source: "gra_fund", target: "micron", type: "investment", description: "Investor in Series A" },
    { source: "noro", target: "sharecare", type: "investment", description: "Early investor" },
    { source: "catalyst", target: "armor_medical", type: "investment", description: "Catalyst by Wellstar invested in Armor Medical to support development of Maternal aRMOR wearable (Jun 2025)." },
    {
      "source": "gra_fund",
      "target": "huxley_medical",
      "type": "investment",
      "description": "Portfolio investment in Huxley's SANSA patch platform for cardio-sleep diagnostics."
    },
    {
      "source": "gra_fund",
      "target": "biocircuit_technologies",
      "type": "investment",
      "description": "Early-stage investment in BioCircuit's Nerve Tape® nerve repair technology."
    },

    // --- Accelerator & Incubator Support ---
    { source: "atdc", target: "gatech", type: "affiliation", description: "Program of Georgia Tech" },
    { source: "create_x", target: "gatech", type: "affiliation", description: "Program of Georgia Tech" },
    { source: "atdc", target: "sanguina", type: "support", description: "Incubated at ATDC (alumni)" },
    { source: "create_x", target: "oxos", type: "support", description: "Incubated at CREATE-X (alumni)" },
    { source: "biolocity", target: "sanguina", type: "support", description: "Received early grant funding" },
    { source: "biolocity", target: "andson_biotech", type: "support", description: "Received translational funding and startup support from Biolocity." },

    { source: "emory", target: "ebfi", type: "affiliation", description: "Hosted and operated by Emory University" },
    { source: "emory", target: "eddf", type: "affiliation", description: "Part of Emory Innovations, Inc." },

    // --- DRIVE Relationships ---
    { source: "emory", target: "drive", type: "affiliation", description: "Emory-formed drug development accelerator for antiviral therapeutics" },

    { source: "drive", target: "eddf", type: "origin", description: "Established EDDF using royalties from DRIVE-licensed drug molnupiravir (LAGEVRIO)" },
    { source: "drive", target: "altesa", type: "spinout", description: "Antiviral spinout formed via DRIVE to develop Vapendavir and other respiratory virus therapies" },
    { source: "drive", target: "agrithera", type: "research_funding", description: "Supported preclinical work on cannabinoid-based neurotherapeutics" },

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
    
    // --- Quadrant-i Relationships ---
    { source: "gatech", target: "quadrant_i", type: "affiliation", description: "Quadrant-i is a Georgia Tech commercialization and venture creation unit accelerating research translation into startups." },
    { source: "quadrant_i", target: "biolocity", type: "collaboration", description: "Quadrant-i Principals advise Biolocity projects and help connect funded teams to investors and partners." },
    { source: "quadrant_i", target: "emory", type: "collaboration", description: "Collaborates on Emory-affiliated Biolocity projects such as Infinite Loupe and OnCuRNA." },
    { source: "quadrant_i", target: "exvade_bioscience", type: "support", description: "Supported commercialization of continuous glioblastoma biopsy device developed at Georgia Tech." },
    { source: "quadrant_i", target: "oncurna", type: "support", description: "Assisted Georgia Tech researchers in forming OnCuRNA, focused on solid tumor RNAi therapeutics." },
    
    // --- VentureLab Relationships ---
    { source: "gatech", target: "venturelab", type: "affiliation", description: "VentureLab is Georgia Tech's startup launch and commercialization support hub." },
    { source: "venturelab", target: "quadrant_i", type: "collaboration", description: "VentureLab works upstream of Quadrant-i to identify and nurture promising tech transfer opportunities." },
    { source: "venturelab", target: "biolocity", type: "collaboration", description: "Refers high-potential GT teams to Biolocity for translational medtech support and funding." },
    { source: "gatech", target: "cambium_oncology", type: "research_collaboration", description: "Georgia Tech bioengineering and drug manufacturing support" },
    { source: "oxos", target: "department_of_veterans_affairs", type: "partnership", description: "Pilot program partnership" },
    { source: "micron", target: "cdc", type: "partnership", description: "Research and clinical trial collaboration" },
    { source: "iqvia_atlanta", target: "cdc", type: "partnership", description: "Real-world data partnership" },


    // --- Service Provider Relationships ---
    { source: "king_spalding", target: "vero", type: "service", description: "FDA regulatory legal counsel" },
    { source: "kilpatrick_townsend", target: "atdc", type: "service", description: "Official IP legal services sponsor" },
    { source: "biotechexec", target: "biolocity", type: "service", description: "Mentorship and strategic consulting" },
    { source: "mng_labs", target: "emory", type: "service", description: "Neurogenetic testing services vendor" },
    { source: "radyus", target: "cambium_oncology", type: "service", description: "Longtime CRO and strategic consulting partner" },
    { source: "woven_health_collective", target: "emory_healthcare", type: "collaboration", description: "Strategic partner to the Emory Healthcare Innovation Hub, enabling clinical UX testing and healthcare product validation" },
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
    { source: "gra", target: "andson_biotech", type: "funding", description: "Received early translational support from Georgia Research Alliance." },
    { source: "gra", target: "axion_biosystems", type: "funding", description: "Received financial backing via Georgia Research Alliance / GRA Venture Fund." },

    { source: "emory_biotech_consulting_club", target: "emory", type: "affiliation", description: "EBCC is a student-led commercialization and consulting program founded at Emory University under the Innovate@Emory initiative." },
    { source: "emory_biotech_consulting_club", target: "emory_ott", type: "collaboration", description: "Partners with Emory OTT to support technology assessments and connect student teams to Emory-affiliated startups." },
    { source: "emory_biotech_consulting_club", target: "biolocity", type: "collaboration", description: "Collaborates with Biolocity to provide commercialization strategy support for early-stage medtech projects." },
    { source: "emory_biotech_consulting_club", target: "gra", type: "collaboration", description: "Engages with Georgia Research Alliance through university commercialization programs and startup diligence efforts." },
    { source: "eddf", target: "emory", type: "funding", description: "Direct laboratory investment in CFTR-targeted therapies via Sorscher Lab" },

    { source: "rowen", target: "science_square", type: "development", description: "Future biotech infrastructure" }
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