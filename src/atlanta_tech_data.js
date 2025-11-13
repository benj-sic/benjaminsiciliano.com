/*
 * Copyright (c) 2025 Benjamin Siciliano
 * All rights reserved.
 * 
 * This file is part of the benjaminsiciliano.com project.
 * Unauthorized copying, modification, distribution, or use is strictly prohibited.
 * For licensing inquiries, contact: ben.siciliano@gmail.com
 */

/*
 * ============================================================================
 * ATLANTA TECH ECOSYSTEM DATA
 * ============================================================================
 * 
 * This file contains the data for Atlanta's tech ecosystem network visualization,
 * focusing on Mosley Ventures, Atlanta Ventures, Valor Ventures, Zane Venture Fund, and their portfolio companies.
 * 
 * Data Structure:
 * - nodes: Array of organizations (companies, VCs, etc.)
 * - links: Array of relationships between organizations
 * - nodeTypeMap: Maps node types to display names
 * - nodeColors: Maps node types to colors for visualization
 * 
 * Includes:
 * - Mosley Ventures and its portfolio companies
 * - Atlanta Ventures and its extensive portfolio of 29+ companies
 * - Valor Ventures and its portfolio of 24+ B2B AI and SaaS companies
 * - Zane Venture Fund and its portfolio of inspirational founders in overlooked markets
 * - Atlanta Tech Village (co-working space and startup community hub)
 * 
 * ============================================================================
 */

// Node type mapping for display purposes
export const nodeTypeMap = {
  'vc': 'Venture Capital',
  'startup': 'Startup',
  'company': 'Company',
  'university': 'University',
  'incubator': 'Incubator',
  'accelerator': 'Accelerator',
  'serviceProvider': 'Service Provider',
  'government': 'Government',
  'trade': 'Trade Organization',
  'corporateInnovation': 'Corporate Innovation',
  'economicDevelopment': 'Economic Development',
  'facilities': 'Facilities',
  'communityBuilders': 'Community Builders'
};

// Color mapping for different node types (theme-aware)
export const nodeColors = {
  'Venture Capital': '#F2A900', // Gold
  'Startup': '#00AEEF', // Light Blue
  'Company': '#0D6A42', // Green
  'University': '#0033A0', // Dark Blue
  'Incubator': '#E91E63', // Vibrant Magenta/Pink
  'Accelerator': '#FF5722', // Deep Orange (distinct from Incubator)
  'Service Provider': '#545454', // Gray
  'Government': '#5A2D81', // Purple
  'Trade Organization': '#9C27B0', // Light Purple (distinct from Government)
  'Corporate Innovation': '#FF9800', // Amber (distinct from other categories)
  'Economic Development': '#607D8B', // Blue Grey (distinct from other categories)
  'Facilities': '#2E7D32', // Deep Forest Green
  'Community Builders': '#E67300' // Orange
};

// Dynamic node sizing function
export const calculateNodeSize = (node) => {
  // Base size for different node types
  const baseSizes = {
    'vc': 20,
    'company': 16,
    'startup': 14, // Startups are smaller than established companies
    'university': 22,
    'incubator': 18,
    'accelerator': 18,
    'trade': 19,
    'government': 20,
    'serviceProvider': 15,
    'corporateInnovation': 18,
    'economicDevelopment': 18,
    'facilities': 17,
    'communityBuilders': 16
  };

  let baseSize = baseSizes[node.type] || 16;

  // Size adjustments based on node properties
  if (node.keyPersonnel && node.keyPersonnel.length > 5) {
    baseSize += 2; // Larger for organizations with extensive leadership
  }
  
  if (node.recentNews && node.recentNews.length > 200) {
    baseSize += 1; // Slightly larger for organizations with detailed news
  }

  // Special size adjustments for major organizations
  if (node.id === 'georgia-tech' || node.id === 'atlanta-ventures') {
    baseSize += 3;
  }
  
  if (node.id === 'valor-ventures' || node.id === 'engage-vc') {
    baseSize += 2;
  }

  // Special adjustments for established companies vs startups
  if (node.type === 'company' && (node.id === 'calendly' || node.id === 'stord' || node.id === 'finquery')) {
    baseSize += 2; // Larger for established, successful companies
  }

  return Math.max(12, Math.min(25, baseSize)); // Clamp between 12 and 25
};

// Atlanta Tech Ecosystem Network Data
export const atlantaTechEcosystem = {
  nodes: [
    // Mosley Ventures - The main VC firm
    {
      id: 'mosley-ventures',
      name: 'Mosley Ventures',
      type: 'vc',
      size: 20,
      description: 'Venture capital fund investing in early stage technology startups in Atlanta and the Southeast. Focuses on security software, mobility and wireless, big data and healthcare IT.',
      website: 'https://www.mosleyventures.com/',
      keyPersonnel: [
        { name: 'Sig Mosley', title: 'Managing Partner', linkedin: 'https://www.linkedin.com/in/sigmosley/' }
      ],
      recentNews: 'Fund Status - Mosley Ventures will not be raising another fund and the first fund is fully deployed. They will continue to support their current portfolio companies.'
    },

    // Atlanta Ventures - Major VC firm and studio
    {
      id: 'atlanta-ventures',
      name: 'Atlanta Ventures',
      type: 'vc',
      size: 22,
      description: 'Venture capital firm and studio focused on early stage subscription companies in the Southeastern United States. Combines talented entrepreneurs with proven methodology to start several companies per year.',
      website: 'https://www.atlantaventures.com/',
      keyPersonnel: [
        { name: 'David Cummings', title: 'Partner', linkedin: 'https://www.linkedin.com/in/davidcummings/' },
        { name: 'A.T. Gimbel', title: 'Partner', linkedin: 'https://www.linkedin.com/in/atgimbel/' },
        { name: 'Jon Birdsong', title: 'Partner', linkedin: 'https://www.linkedin.com/in/birdsong/' },
        { name: 'Kathryn O\'Day', title: 'Partner', linkedin: 'https://www.linkedin.com/in/kathrynoday/' },
        { name: 'David Lightburn', title: 'President', linkedin: 'https://www.linkedin.com/in/davidlightburn/' },
        { name: 'Jacey Lucus', title: 'VP of Marketing & Community', linkedin: 'https://www.linkedin.com/in/jaceycadet/' },
        { name: 'Durantae Lucas', title: 'Accounting & Finance Lead', linkedin: 'https://www.linkedin.com/in/durantae-lucas-cpa-a31b8233/' },
        { name: 'Patrick Tisdale', title: 'Investment Manager', linkedin: 'https://www.linkedin.com/in/patricktisdale/' }
      ],
      recentNews: 'Empowering entrepreneurs to start, grow, and learn. Focused on serving entrepreneurs in earlier stages (<$5M ARR) with investments of $250K to $5M.'
    },

    // Valor Ventures - B2B AI and SaaS focused VC
    {
      id: 'valor-ventures',
      name: 'Valor Ventures',
      type: 'vc',
      size: 21,
      description: 'Valor leads seed rounds in courageous B2B AI startups. Focused on backing local SaaS and AI seed startups with a $27 million fund. Founded Startup Runway, the largest non-profit pitch event focusing on pre-seed founders.',
      website: 'https://valor.vc/',
      keyPersonnel: [
        { name: 'Lisa Calhoun', title: 'Managing Partner', linkedin: 'https://www.linkedin.com/in/lisacalhoun/' },
        { name: 'Gary Peat', title: 'Partner', linkedin: 'https://www.linkedin.com/in/garypeat/' },
        { name: 'Craig Snodgrass', title: 'Partner', linkedin: 'https://www.linkedin.com/in/craigsnodgrass/' },
        { name: 'Kirk Somers', title: 'Partner', linkedin: 'https://www.linkedin.com/in/kirk-somers-854687/' },
        { name: 'Alaina Percival', title: 'Partner', linkedin: 'https://www.linkedin.com/in/alainapercival/' },
        { name: 'Steve Todd George', title: 'Partner', linkedin: 'https://www.linkedin.com/in/stevetoddgeorge/' },
        { name: 'Joe Schab', title: 'Venture Partner' }
      ],
      recentNews: 'Armed with new $27 million fund, Atlanta\'s Valor Ventures looks to back more local SaaS and AI seed startups. Focuses on courageous B2B AI startups.'
    },

    // Zane Venture Fund - Inspirational founders in overlooked markets
    {
      id: 'zane-ventures',
      name: 'Zane Venture Fund',
      type: 'vc',
      size: 20,
      description: 'We invest in inspirational founders building solutions in overlooked sectors. Founded on the conviction that the best investment opportunities often exist in markets everyone else ignores. Dual approach through Access platform and Venture Fund.',
      website: 'https://www.zane.vc/',
      keyPersonnel: [
        { name: 'Shila Nieves Burney', title: 'Managing Partner', linkedin: 'https://www.linkedin.com/in/shila-nieves-burney-0346436/' }
      ],
      recentNews: 'Since founding in 2020, Zane\'s dual approach has created approximately $180M in economic impact for the Atlanta/Southeast ecosystem. Fund II focuses on "The Healthy Human Economy."'
    },

    // Engage VC - Corporate venture platform
    {
      id: 'engage-vc',
      name: 'Engage VC',
      type: 'vc',
      size: 21,
      description: 'A first-of-its-kind innovation platform comprised of category-leading corporations in the Southeast that have joined forces to support startups building the future of enterprise. Provides enterprise go-to-market programs and corporate access.',
      website: 'https://engage.vc/',
      keyPersonnel: [
        { name: 'Bill Nussey', title: 'Managing Partner', linkedin: 'https://www.linkedin.com/in/billnussey/' }
      ],
      recentNews: 'Collaborative innovation and corporate venture platform with 15+ global corporations and research universities as partners, including AT&T, Chick-fil-A, Delta Air Lines, and Georgia Tech.'
    },

    // Circadian Ventures - Atlanta-based VC firm
    {
      id: 'circadian-ventures',
      name: 'Circadian Ventures',
      type: 'vc',
      size: 20,
      description: 'Venture capital firm actively partnering with exceptional entrepreneurs to build enduring businesses. Has investments in various sectors across the United States with 20+ portfolio companies and 35+ transactions.',
      website: 'https://circadian.vc/',
      keyPersonnel: [
        { name: 'Mike Dowdle', title: 'Founding Partner', linkedin: 'https://www.linkedin.com/in/dowdle/' },
        { name: 'Steve Hasty', title: 'Principal', linkedin: 'https://www.linkedin.com/in/steve-hasty-99473968/' }
      ],
      recentNews: 'Portfolio companies have raised $350M+ in funding. Fund II investments include Vero (AI Recruiting, Birmingham, AL) and Intellectible (Sales Enablement, Austin, TX). Multiple successful exits including acquisitions by United Stationers, TrendKite, and ClickDimensions.'
    },

    // Portfolio Companies

    {
      id: 'codoxo',
      name: 'Codoxo',
      type: 'company',
      size: 18,
      description: 'Healthcare AI company providing unified cost containment platform for payment integrity, fraud detection, and provider education. Uses generative AI to help healthcare payers, PBMs, and government agencies reduce costs and improve provider relationships.',
      website: 'https://www.codoxo.com/',
      keyPersonnel: [
        { name: 'Musheer Ahmed', title: 'CEO and Co-Founder' }
      ],
      recentNews: 'Named one of America\'s fastest growing private companies by Inc. Magazine. Recognized as healthcare AI innovator with Forensic AI Platform winning Fierce Healthcare Innovation Award.'
    },

    {
      id: 'demand-driven-tech',
      name: 'Demand Driven Technologies',
      type: 'company',
      size: 17,
      description: 'Supply chain technology company providing Intuiflow, a disruptive Demand Driven Planning AI/ML software suite. Helps businesses build agile supply chains with materials planning, sales & operations planning, scheduling & execution, and demand planning solutions.',
      website: 'https://demanddriventech.com/',
      keyPersonnel: [
        { name: 'Erik Bush', title: 'CEO', linkedin: 'https://www.linkedin.com/in/erik-bush-88289110/' }
      ],
      recentNews: 'Trusted by customers globally to bring agility to the world\'s most complex supply chains. Provides actionable recommendations and improved visibility for supply chain performance.'
    },


















    // Atlanta Ventures Portfolio Companies
    {
      id: 'adpipe',
      name: 'AdPipe',
      type: 'startup',
      size: 16,
      description: 'The #1 motion-first marketing platform! Leverages existing content and auto-drafts copy for digital campaigns to yield meaningful results without requiring extra resources.',
      website: 'https://www.adpipe.com/',
      keyPersonnel: [
        { name: 'Andrew Levy', title: 'CEO', linkedin: 'https://www.linkedin.com/in/andrew-levy-2568b916/' },
        { name: 'Sam Birdsong', title: 'Co-Founder', linkedin: 'https://www.linkedin.com/in/sammybsong/' }
      ],
      recentNews: 'Founded 2021, partnered with Atlanta Ventures in 2023.'
    },



    {
      id: 'calendly',
      name: 'Calendly',
      type: 'company',
      size: 20,
      description: 'Makes life easier for business professionals and their customers through simple, beautiful scheduling software. Obsessed with creating an amazing experience and elegant product.',
      website: 'https://calendly.com/',
      keyPersonnel: [
        { name: 'Tope Awotona', title: 'CEO', linkedin: 'https://www.linkedin.com/in/bawotona/' }
      ],
      recentNews: 'Founded 2013, first partnered with Atlanta Ventures in 2014. Revolutionized the world\'s relationship with scheduling.'
    },

    {
      id: 'carpool-logistics',
      name: 'Carpool Logistics',
      type: 'startup',
      size: 16,
      description: 'Technology-driven automotive logistics company redefining how vehicles get transported. Uses advanced technology to improve customer experience and reduce emissions.',
      website: 'https://carpoollogistics.com/',
      keyPersonnel: [
        { name: 'Michael Malakhov', title: 'CEO', linkedin: 'https://www.linkedin.com/in/michaelmalakhov/' },
        { name: 'Terrence Jackson', title: 'Co-Founder', linkedin: 'https://www.linkedin.com/in/meetterrencejackson/' },
        { name: 'Eric Morris', title: 'Co-Founder', linkedin: 'https://www.linkedin.com/in/eric-morris-178b0820b/' },
        { name: 'Joe Norton', title: 'Co-Founder', linkedin: 'https://www.linkedin.com/in/meetjoenorton/' }
      ],
      recentNews: 'Founded 2021, partnered with Atlanta Ventures in 2022.'
    },

    {
      id: 'copient-health',
      name: 'Copient Health',
      type: 'startup',
      size: 17,
      description: 'Healthcare technology company that provides solutions that improve OR scheduling efficiency in both hospitals and surgery centers.',
      website: 'https://www.copienthealth.com/',
      keyPersonnel: [
        { name: 'Mike Burke', title: 'CEO', linkedin: 'https://www.linkedin.com/in/burke-michael/' }
      ],
      recentNews: 'Founded 2019, partnered with Atlanta Ventures in 2019.'
    },

    {
      id: 'dragon-army',
      name: 'Dragon Army',
      type: 'company',
      size: 18,
      description: 'Web, mobile, and innovation company built on 5 values: Team First, Think Positively, Do Good, Celebrate Diversity & Have Fun!',
      website: 'https://dragonarmy.com/',
      keyPersonnel: [
        { name: 'Jeff Hilimire', title: 'CEO', linkedin: 'https://www.linkedin.com/in/jeffhilimire/' }
      ],
      recentNews: 'Founded 2013, first partnered with Atlanta Ventures in 2013.'
    },

    {
      id: 'finquery',
      name: 'FinQuery',
      type: 'company',
      size: 17,
      description: 'Helps accountants and finance professionals eliminate lease accounting errors through CPA-approved lease accounting software and implementation process.',
      website: 'https://finquery.com/',
      keyPersonnel: [
        { name: 'Joe Schab', title: 'CEO', linkedin: 'https://www.linkedin.com/in/joe-schab-8a33832/' }
      ],
      recentNews: 'Founded 2011, partnered with Atlanta Ventures in 2020.'
    },

    {
      id: 'gimme',
      name: 'Gimme',
      type: 'company',
      size: 16,
      description: 'The only mobile route driver tool available to service both vending and micro markets. Two engineers combined their vending knowledge and technical expertise.',
      website: 'https://www.gimmevending.com/',
      keyPersonnel: [
        { name: 'Evan Jarecki', title: 'CEO', linkedin: 'https://www.linkedin.com/in/evanjarecki/' },
        { name: 'Cory Hewett', title: 'Co-Founder', linkedin: 'https://www.linkedin.com/in/coryhewett/' }
      ],
      recentNews: 'Founded 2015, first partnered with Atlanta Ventures in 2015. Co-founders: Cory was CEO, now Evan is CEO.'
    },



    {
      id: 'grayscale',
      name: 'Grayscale',
      type: 'startup',
      size: 17,
      description: 'Automates the recruiting process for companies that hire in high volumes, such as warehousing, healthcare or high-growth tech companies.',
      website: 'https://grayscaleapp.com/',
      keyPersonnel: [
        { name: 'Ty Abernethy', title: 'CEO', linkedin: 'https://www.linkedin.com/in/tyabernethy/' },
        { name: 'Hubert Liu', title: 'Co-Founder', linkedin: 'https://www.linkedin.com/in/hubert-liu/' }
      ],
      recentNews: 'Founded 2018, partnered with Atlanta Ventures in 2021. Serves customers including Wayfair, Amazon Pharmacy, and Peloton.'
    },

    {
      id: 'greenzie',
      name: 'Greenzie',
      type: 'startup',
      size: 16,
      description: 'Builds software for autonomous robotic lawn mowers. The retrofit hardware kit and cloud-based software adds self-driving to existing equipment.',
      website: 'https://www.greenzie.com/',
      keyPersonnel: [
        { name: 'Charles Brian Quinn', title: 'CEO', linkedin: 'https://www.linkedin.com/in/seebq/' }
      ],
      recentNews: 'Founded 2018, first partnered with Atlanta Ventures in 2018. Mission is to free humans from repetitive outdoor labor.'
    },



    {
      id: 'hannon-hill',
      name: 'Hannon Hill',
      type: 'company',
      size: 16,
      description: 'Provides content management and web development solutions for organizations.',
      website: 'https://www.hannonhill.com/',
      keyPersonnel: [
        { name: 'Kat Liendgens', title: 'CEO', linkedin: 'https://www.linkedin.com/in/katliendgens/' },
        { name: 'Bradley Wagner', title: 'VP of Engineering', linkedin: 'https://www.linkedin.com/in/booradley/' },
        { name: 'Brad Kazmer', title: 'Director of Professional Services', linkedin: 'https://www.linkedin.com/in/brad-kazmer-7333591/' },
        { name: 'Tim Reilly', title: 'Director of Support', linkedin: 'https://www.linkedin.com/in/tim-reilly-9850641/' }
      ],
      recentNews: 'Content management and web development solutions provider.'
    },



    {
      id: 'infinite-giving',
      name: 'Infinite Giving',
      type: 'company',
      size: 15,
      description: 'Platform for charitable giving and donation management.',
      website: 'https://www.infinitegiving.com/',
      keyPersonnel: [
        { name: 'Karen Houghton', title: 'Chief Executive Officer', linkedin: 'https://www.linkedin.com/in/karenchoughton/' }
      ],
      recentNews: 'Charitable giving and donation management platform.'
    },

    {
      id: 'inpharmd',
      name: 'InPharmD',
      type: 'company',
      size: 16,
      description: 'Healthcare technology company providing pharmaceutical and clinical services.',
      website: 'https://inpharmd.com/our_story',
      keyPersonnel: [
        { name: 'Neil Patel', title: 'COO', linkedin: 'https://www.linkedin.com/in/neil-patel-b45107117/' },
        { name: 'Ashish Advani', title: 'President', linkedin: 'https://www.linkedin.com/in/ashish-advani-3384a67/' },
        { name: 'Tulasee Rao Chintha', title: 'CTO & Co-Founder', linkedin: 'https://www.linkedin.com/in/tulaseeraochintha/' }
      ],
      recentNews: 'Healthcare technology and pharmaceutical services provider.'
    },

    {
      id: 'interlock-studios',
      name: 'Interlock Studios',
      type: 'company',
      size: 15,
      description: 'Creative and technology studio providing digital solutions and services.',
      website: 'https://www.interlockstudios.com/',
      keyPersonnel: [
        { name: 'Shep Ogden', title: 'Co-Founder', linkedin: 'https://www.linkedin.com/in/shepogden/' },
        { name: 'Bailey Grady', title: 'Co-Founder', linkedin: 'https://www.linkedin.com/in/baileygrady/' }
      ],
      recentNews: 'Creative and technology studio providing digital solutions.'
    },

    {
      id: 'intown-golf-club',
      name: 'Intown Golf Club',
      type: 'company',
      size: 14,
      description: 'Golf and entertainment facility providing premium golf experiences.',
      website: 'https://www.intowngolfclub.com/',
      keyPersonnel: [
        { name: 'Michael Williamson', title: 'Co-Founder and CEO', linkedin: 'https://www.linkedin.com/in/michaelwilliamsonio/' }
      ],
      recentNews: 'Premium golf and entertainment facility.'
    },





    {
      id: 'queues',
      name: 'Queues',
      type: 'startup',
      size: 15,
      description: 'Uses cameras plus software to analyze wait times to help consumers and businesses better plan and forecast their day.',
      website: 'https://www.queues.com/',
      keyPersonnel: [
        { name: 'Sam Porta', title: 'CEO', linkedin: 'https://www.linkedin.com/in/sam-porta/' }
      ],
      recentNews: 'Founded 2023. Wait time analysis platform for businesses and consumers.'
    },

    {
      id: 'reframe',
      name: 'Reframe',
      type: 'startup',
      size: 16,
      description: 'Brings a dynamic recovery program and all the tools you\'ll need to quit alcohol, right to your pocket.',
      website: 'https://www.joinreframeapp.com/',
      keyPersonnel: [
        { name: 'Vedant Pradeep', title: 'CEO', linkedin: 'https://www.linkedin.com/in/vedantpradeep/' },
        { name: 'Ziyi Gao', title: 'Co-Founder', linkedin: 'https://www.linkedin.com/in/ziyigao67/' }
      ],
      recentNews: 'Founded 2019, partnered with Atlanta Ventures in 2021. Formerly Digital Sponsor.'
    },





    {
      id: 'the-perlant',
      name: 'The Perlant',
      type: 'startup',
      size: 14,
      description: 'A private social club rooted in wine, providing exclusive social experiences.',
      website: 'https://www.theperlant.com/',
      keyPersonnel: [
        { name: 'Christian Ries', title: 'CEO', linkedin: 'https://www.linkedin.com/in/christianeries/' },
        { name: 'David Cummings', title: 'Co-Founder' },
        { name: 'Rachel Katz', title: 'Co-Founder', linkedin: 'https://www.linkedin.com/in/rachel-b-katz/' },
        { name: 'Elizabeth Dames', title: 'Co-Founder', linkedin: 'https://www.linkedin.com/in/elizabeth-dames-a2444622/' }
      ],
      recentNews: 'Founded 2023. Private social club rooted in wine.'
    },

    {
      id: 'undaunted',
      name: 'Undaunted',
      type: 'startup',
      size: 15,
      description: 'Your new trusted partner in robotic security, providing advanced security solutions.',
      website: 'https://www.getundaunted.com/',
      keyPersonnel: [
        { name: 'Bryan Dinner', title: 'CEO & Founder', linkedin: 'https://www.linkedin.com/in/bryan-dinner/' },
        { name: 'David Cummings', title: 'Co-Founder' }
      ],
      recentNews: 'Founded 2023. Robotic security solutions provider.'
    },

    {
      id: 'voxie',
      name: 'Voxie',
      type: 'company',
      size: 17,
      description: 'Text marketing platform that engages millions of customers each month, resulting in 10X more revenue than other marketing channels.',
      website: 'https://www.voxie.com/',
      keyPersonnel: [
        { name: 'Bogdan Constantin', title: 'CEO', linkedin: 'https://www.linkedin.com/in/bconstantin/' }
      ],
      recentNews: 'Founded 2018, partnered with Atlanta Ventures in 2020.'
    },

    {
      id: 'zinnia',
      name: 'Zinnia',
      type: 'startup',
      size: 16,
      description: 'AI-driven platform that streamlines sales preparation by automating research, generating personalized strategies, and enhancing engagement for sales professionals.',
      website: 'https://www.getzinnia.com/',
      keyPersonnel: [
        { name: 'Lauren Goodell', title: 'Founder and CEO', linkedin: 'https://www.linkedin.com/in/lauren-goodell/' },
        { name: 'Flora Muglia', title: 'Co-Founder' }
      ],
      recentNews: 'Founded 2022, first partnered with Atlanta Ventures in 2022.'
    },

    // Valor Ventures Portfolio Companies
    {
      id: 'aetos-imaging',
      name: 'Aetos Imaging',
      type: 'startup',
      size: 17,
      description: 'The world\'s first Visual Maintenance Management System (VMMS). Provides exceptional clarity, support, and confidence to technicians through visual operation management and comprehensive IoT integration.',
      website: 'https://aetosimaging.com/',
      keyPersonnel: [
        { name: 'Connor Offutt', title: 'CEO and Co-Founder', linkedin: 'https://www.linkedin.com/in/connor-offutt-304215199/' },
        { name: 'Nick Kassanis', title: 'Co-Founder & Business Advisor', linkedin: 'https://www.linkedin.com/in/nick-kassanis/' }
      ],
      recentNews: 'Revolutionizing the built environment with the world\'s first VMMS, serving commercial real estate and industrial manufacturing sectors.'
    },





    {
      id: 'autonoma',
      name: 'Autonoma',
      type: 'startup',
      size: 16,
      description: 'AI-powered automation solutions for business processes and operations.',
      website: 'https://www.autonoma.ai/',
      keyPersonnel: [
        { name: 'Will Bryan', title: 'CEO', linkedin: 'https://www.linkedin.com/in/wbryan/' }
      ],
      recentNews: 'AI-powered automation solutions for business processes.'
    },





    {
      id: 'funding-u',
      name: 'Funding U',
      type: 'company',
      size: 15,
      description: 'Alternative student lending platform focused on merit-based loans for college students.',
      website: 'https://www.funding-u.com/',
      keyPersonnel: [
        { name: 'Jeannie Tarkenton', title: 'Founder & CEO', linkedin: 'https://www.linkedin.com/in/jeannie-tarkenton-84803656/' }
      ],
      recentNews: 'Alternative student lending platform for merit-based college loans.'
    },







    {
      id: 'myphysician360',
      name: 'MyPhysician360',
      type: 'startup',
      size: 17,
      description: 'Healthcare technology platform connecting patients with physicians and medical services.',
      website: 'https://myphysician360.com/',
      keyPersonnel: [
        { name: 'Angela Fusaro', title: 'Co-Founder', linkedin: 'https://www.linkedin.com/in/angelafusaromd/' },
        { name: 'Alex Poston', title: 'CTO', linkedin: 'https://www.linkedin.com/in/alexposton/' },
        { name: 'Betsy Warren', title: 'Chief Clinical Officer', linkedin: 'https://www.linkedin.com/in/betsymwarren/' }
      ],
      recentNews: 'Healthcare technology platform for patient-physician connections.'
    },










    {
      id: 'smartcommerce',
      name: 'SmartCommerce',
      type: 'startup',
      size: 16,
      description: 'E-commerce and digital commerce solutions for retailers and brands.',
      website: 'https://www.smartcommerce.com/',
      keyPersonnel: [
        { name: 'Jennifer Silverberg', title: 'CEO', linkedin: 'https://www.linkedin.com/in/jennifersilverberg/' }
      ],
      recentNews: 'E-commerce and digital commerce solutions for retailers.'
    },



    {
      id: 'the-gathering-spot',
      name: 'The Gathering Spot',
      type: 'startup',
      size: 16,
      description: 'Private membership club and community space for professionals and entrepreneurs.',
      website: 'https://thegatheringspot.club/',
      keyPersonnel: [
        { name: 'Ryan Wilson', title: 'Co-Founder & CEO', linkedin: 'https://www.linkedin.com/in/ryan-wilson-47656632/' },
        { name: 'TK Petersen', title: 'Co-Founder', linkedin: 'https://www.linkedin.com/in/tk-petersen-1586b6a9/' }
      ],
      recentNews: 'Private membership club and community space for professionals.'
    },







    {
      id: 'vital4',
      name: 'Vital4',
      type: 'startup',
      size: 16,
      description: 'Background screening and identity verification platform for businesses.',
      website: 'https://vital4.net/',
      keyPersonnel: [
        { name: 'Kristin L. Stafford', title: 'Founder and CEO', linkedin: 'https://www.linkedin.com/in/kristin-l-stafford-92822b15/' }
      ],
      recentNews: 'Background screening and identity verification solutions for businesses.'
    },

    // Engage VC Portfolio Companies
    {
      id: 'cirt',
      name: 'CIRT',
      type: 'company',
      size: 17,
      description: 'The operating system for circular packaging. All-in-one data and software platform that helps brands manage sustainable packaging, meet regulatory requirements, and power transparency across every consumer touchpoint.',
      website: 'https://cirt.tech/',
      keyPersonnel: [
        { name: 'Katherine Shayne', title: 'CEO and Co-Founder', linkedin: 'https://www.linkedin.com/in/katherine-shayne/' }
      ],
      recentNews: 'B Corporation certified platform helping brands navigate packaging compliance and sustainability with confidence.'
    },

    {
      id: 'cloverly',
      name: 'Cloverly',
      type: 'company',
      size: 17,
      description: 'Carbon credit marketplace and climate action platform. Provides software to manage carbon credits, sales, and climate impact for businesses.',
      website: 'https://cloverly.com/',
      keyPersonnel: [
        { name: 'Jason Rubottom', title: 'CEO', linkedin: 'https://www.linkedin.com/in/jason-rubottom/' }
      ],
      recentNews: 'Commerce software platform for managing carbon credits and driving climate action.'
    },

    {
      id: 'coginiti',
      name: 'Coginiti',
      type: 'company',
      size: 16,
      description: 'Data analytics and business intelligence platform for enterprise organizations.',
      website: 'https://www.coginiti.co/',
      keyPersonnel: [
        { name: 'Richard Hall', title: 'CEO', linkedin: 'https://www.linkedin.com/in/richard-hall-6685513/' }
      ],
      recentNews: 'Enterprise data analytics and BI platform.'
    },

    {
      id: 'cyrano-video',
      name: 'Cyrano Video',
      type: 'company',
      size: 16,
      description: 'Video technology platform for business communications and marketing.',
      website: 'https://cyranovideo.com/',
      keyPersonnel: [
        { name: 'Andy Monin', title: 'CEO', linkedin: 'https://www.linkedin.com/in/andy-monin-58577b/' }
      ],
      recentNews: 'Video technology solutions for business communications.'
    },

    {
      id: 'glass',
      name: 'Glass',
      type: 'company',
      size: 16,
      description: 'Digital platform and technology solutions for businesses.',
      website: 'https://www.useglass.com/',
      keyPersonnel: [
        { name: 'Jonathan Allen', title: 'CEO', linkedin: 'https://www.linkedin.com/in/jonathanallen17/' }
      ],
      recentNews: 'Digital platform and technology solutions provider.'
    },

    {
      id: 'instant',
      name: 'Instant',
      type: 'company',
      size: 16,
      description: 'Technology platform providing instant solutions for businesses.',
      website: 'https://www.instant.co/',
      keyPersonnel: [
        { name: 'Tal Clark', title: 'CEO', linkedin: 'https://www.linkedin.com/in/tal-clark-a60776b/' }
      ],
      recentNews: 'Instant technology solutions for business operations.'
    },

    {
      id: 'itential',
      name: 'Itential',
      type: 'company',
      size: 17,
      description: 'Network automation platform for enterprise organizations.',
      website: 'https://www.itential.com/',
      keyPersonnel: [
        { name: 'Ian Bresnahan', title: 'President & CEO', linkedin: 'https://www.linkedin.com/in/ian-bresnahan-8aa9a73/' }
      ],
      recentNews: 'Network automation and orchestration platform for enterprises.'
    },


    {
      id: 'ledgible',
      name: 'Ledgible',
      type: 'company',
      size: 16,
      description: 'Digital asset accounting and tax compliance platform.',
      website: 'https://ledgible.io/',
      keyPersonnel: [
        { name: 'Kell Canty', title: 'CEO', linkedin: 'https://www.linkedin.com/in/kellcanty/' }
      ],
      recentNews: 'Digital asset accounting and tax compliance solutions.'
    },

    {
      id: 'macondo-vision',
      name: 'Macondo Vision',
      type: 'company',
      size: 15,
      description: 'AI and computer vision technology platform.',
      website: 'https://www.macondovision.ai/',
      keyPersonnel: [
        { name: 'Frank Layo', title: 'Co-Founder', linkedin: 'https://www.linkedin.com/in/franklayo/' },
        { name: 'Debbie Fortnum', title: 'Co-Founder', linkedin: 'https://www.linkedin.com/in/debbiefortnum/' }
      ],
      recentNews: 'AI and computer vision technology solutions.'
    },

    {
      id: 'mirage-data',
      name: 'Mirage Data',
      type: 'company',
      size: 16,
      description: 'Data analytics and business intelligence platform.',
      website: 'https://www.miragedata.com/',
      keyPersonnel: [
        { name: 'Sanjay Parekh', title: 'Co-Founder', linkedin: 'https://www.linkedin.com/in/sanjayparekh/' }
      ],
      recentNews: 'Data analytics and business intelligence solutions.'
    },

    {
      id: 'nugen-systems',
      name: 'Nugen Systems',
      type: 'company',
      size: 15,
      description: 'Technology systems and solutions provider.',
      website: 'https://www.nugensystems.net/',
      keyPersonnel: [
        { name: 'Venus Desai', title: 'CEO', linkedin: 'https://www.linkedin.com/in/venusdesai/' }
      ],
      recentNews: 'Technology systems and solutions provider.'
    },

    {
      id: 'onwards-hr',
      name: 'Onwards HR',
      type: 'company',
      size: 16,
      description: 'Human resources technology and workforce management platform.',
      website: 'https://www.onwardshr.com/',
      keyPersonnel: [
        { name: 'Sarah Rodehorst', title: 'CEO and Co-Founder', linkedin: 'https://www.linkedin.com/in/sarahrodehorst/' },
        { name: 'Janice Yu Edwards', title: 'Co-Founder and CPO', linkedin: 'https://www.linkedin.com/in/janice-yu-edwards-6859547/' }
      ],
      recentNews: 'HR technology and workforce management solutions.'
    },

    {
      id: 'playerzero',
      name: 'PlayerZero',
      type: 'company',
      size: 16,
      description: 'AI-powered platform for business operations and analytics.',
      website: 'https://playerzero.ai/',
      keyPersonnel: [
        { name: 'Animesh Koratana', title: 'Founder and CEO', linkedin: 'https://www.linkedin.com/in/animesh-koratana/' }
      ],
      recentNews: 'AI-powered business operations and analytics platform.'
    },

    {
      id: 'query-ai',
      name: 'Query AI',
      type: 'company',
      size: 16,
      description: 'AI-powered query and analytics platform.',
      website: 'https://www.query.ai/',
      keyPersonnel: [
        { name: 'Matt Eberhart', title: 'CEO', linkedin: 'https://www.linkedin.com/in/matteberhart/' }
      ],
      recentNews: 'AI-powered query and analytics solutions.'
    },

    {
      id: 'slip-robotics',
      name: 'Slip Robotics',
      type: 'company',
      size: 16,
      description: 'Robotics and automation solutions for industrial applications.',
      website: 'https://www.sliprobotics.com/',
      keyPersonnel: [
        { name: 'Chris Smith', title: 'CEO', linkedin: 'https://www.linkedin.com/in/christopher-r-smith/' }
      ],
      recentNews: 'Robotics and automation solutions for industrial use.'
    },

    {
      id: 'stord',
      name: 'Stord',
      type: 'company',
      size: 18,
      description: 'Cloud supply chain platform providing warehousing, fulfillment, and logistics solutions.',
      website: 'https://www.stord.com/',
      keyPersonnel: [
        { name: 'Sean Henry', title: 'CEO & Co-Founder', linkedin: 'https://www.linkedin.com/in/sean-henry-7a4a1a1/' },
        { name: 'Jacob Boudreau', title: 'Co-Founder', linkedin: 'https://www.linkedin.com/in/jacob-boudreau/' }
      ],
      recentNews: 'Reached $1.3 billion valuation. Cloud supply chain platform revolutionizing logistics and fulfillment.'
    },

    {
      id: 'tcpoly',
      name: 'TCPoly',
      type: 'company',
      size: 15,
      description: 'Technology platform and solutions provider.',
      website: 'https://tcpoly.com/',
      keyPersonnel: [
        { name: 'Matthew Kirby Smith', title: 'Co-Founder', linkedin: 'https://www.linkedin.com/in/matthewkirbysmith/' }
      ],
      recentNews: 'Technology platform and solutions provider.'
    },

    {
      id: 'verusen',
      name: 'Verusen',
      type: 'company',
      size: 16,
      description: 'Supply chain intelligence and materials management platform.',
      website: 'https://verusen.com/',
      keyPersonnel: [
        { name: 'Scott Matthews', title: 'CEO', linkedin: 'https://www.linkedin.com/in/scottmatthews2/' }
      ],
      recentNews: 'Supply chain intelligence and materials management solutions.'
    },

    {
      id: 'wripple',
      name: 'Wripple',
      type: 'company',
      size: 15,
      description: 'Digital marketing and advertising technology platform.',
      website: 'https://www.wripple.com/',
      keyPersonnel: [
        { name: 'Ray Samuels', title: 'CEO', linkedin: 'https://www.linkedin.com/in/ray-samuels-903a196/' }
      ],
      recentNews: 'Digital marketing and advertising technology solutions.'
    },

    {
      id: 'achieveit',
      name: 'AchieveIt',
      type: 'company',
      size: 17,
      description: 'Strategy execution and performance management platform for enterprise organizations.',
      website: 'https://www.achieveit.com/',
      keyPersonnel: [
        { name: 'Danny Sehr', title: 'CEO', linkedin: 'https://www.linkedin.com/in/dannysehr/' }
      ],
      recentNews: 'Strategy execution and performance management platform for enterprises.'
    },

    // Additional Atlanta Tech Ecosystem Organizations
    {
      id: 'atlanta-tech-village',
      name: 'Atlanta Tech Village',
      type: 'incubator',
      size: 17,
      description: 'Co-working space and startup community hub founded by David Cummings, fostering entrepreneurship and innovation in Atlanta.',
      website: 'https://atlantatechvillage.com/',
      keyPersonnel: [
        { name: 'David Cummings', title: 'Founder' }
      ],
      recentNews: 'Home to over 300 startups and has helped create thousands of jobs in Atlanta.'
    },

    {
      id: 'tie-atlanta',
      name: 'TiE Atlanta',
      type: 'trade',
      size: 18,
      description: 'Global entrepreneurship organization providing mentoring, networking, education, incubating, and investing opportunities for entrepreneurs. Part of the worldwide TiE network with chapters across the globe.',
      website: 'https://tieatlanta.org/',
      keyPersonnel: [
        { name: 'Amy Sadruddin', title: 'Executive Director', linkedin: 'https://www.linkedin.com/in/amynsadruddin/' },
        { name: 'Coleman Quinn', title: 'Community Director', linkedin: 'https://www.linkedin.com/in/coleman-quinn-4a20aa109/' }
      ],
      recentNews: 'TiE Atlanta Angels provides investment opportunities and the organization hosts regular events, programs, and networking opportunities for entrepreneurs and startups.'
    },

    {
      id: 'technology-association-georgia',
      name: 'TAG',
      type: 'trade',
      size: 20,
      description: 'Georgia\'s largest technology association with over 30,000 members. Connects technology leaders, peers and decision makers through 200+ events annually, 26 professional societies, and exclusive engagements across Georgia\'s dynamic technology ecosystem.',
      website: 'https://www.tagonline.org/',
      keyPersonnel: [
        { name: 'Larry K. Williams', title: 'President & Chief Executive Officer', linkedin: 'https://www.linkedin.com/in/larrykwilliams/' }
      ],
      recentNews: 'Hosts major events including Fintech South, Georgia Technology Summit, and TAG Technology Awards. Features 26 professional societies covering sectors from fintech and cybersecurity to AI and digital health.'
    },

    // GRA - Georgia Research Alliance
    {
      id: 'gra',
      name: 'GRA',
      type: 'trade',
      size: 19,
      description: 'Public-private partnership that leverages university research to create economic growth in Georgia. Works with Georgia\'s research universities to attract world-class researchers and commercialize breakthrough technologies.',
      website: 'https://gra.org/',
      keyPersonnel: [
        { name: 'Tim Denning', title: 'President', linkedin: 'https://www.linkedin.com/in/tim-denning-phd-4b13728b/' }
      ],
      recentNews: 'Facilitating research commercialization and economic development through university partnerships across Georgia.'
    },

    {
      id: 'georgia-tech',
      name: 'Georgia Tech',
      type: 'university',
      size: 22,
      description: 'Leading public research university developing exceptional leaders who advance technology and improve the human condition. Ranked #9 public university and #1 fastest-growing university over the past decade. Major research institution with $1.37B in research and sponsored awards.',
      website: 'https://www.gatech.edu/',
      keyPersonnel: [
        { name: 'Dr. Ángel Cabrera', title: 'President', linkedin: 'https://www.linkedin.com/in/drangelcabrera/' }
      ],
      recentNews: 'Record-setting $5.8B economic impact leads University System of Georgia, accounting for more than 25% of total economic output. Advanced 500+ technologies toward market for real-world impact through Office of Commercialization.'
    },

    {
      id: 'emory-university',
      name: 'Emory University',
      type: 'university',
      size: 21,
      description: 'Leading private research university grounded in academic excellence, leading with the greater purpose of serving humanity. Academic health sciences powerhouse guided by evidence, committed to critical inquiry, and fueled by creativity.',
      website: 'https://www.emory.edu/home/index.html',
      keyPersonnel: [
        { name: 'Leah Ward Sears', title: 'Interim President', linkedin: 'https://www.linkedin.com/in/leahwardsears/' }
      ],
      recentNews: 'Developing new, life-saving medications through Center for New Medicines. Received $21.9 million grant to advance Alzheimer\'s disease research. Making Emory more affordable through expanded Emory Advantage program.'
    },

    {
      id: 'russell-innovation-center',
      name: 'RICE',
      type: 'incubator',
      size: 19,
      description: 'Atlanta\'s home for Black entrepreneurs and the largest center in the world dedicated to growing, scaling, and developing Black entrepreneurs. Serves as an economic mobility engine driving entrepreneurs and small business owners to innovate, grow, create jobs and build wealth.',
      website: 'https://russellcenter.org/',
      keyPersonnel: [
        { name: 'Jay Bailey', title: 'President & Chief Executive Officer', linkedin: 'https://www.linkedin.com/in/jaybailey/' }
      ],
      recentNews: 'Mission to multiply thriving Black businesses and produce new economic value. By 2034, aims to generate and accelerate 1,000 Black-owned businesses, contribute to 3,000 new jobs, and produce $2 billion in new economic value.'
    },

    // ATDC - Advanced Technology Development Center
    {
      id: 'atdc',
      name: 'ATDC',
      type: 'incubator',
      size: 18,
      description: 'Georgia Tech\'s technology incubator focused on supporting technology companies and startups in Atlanta. Provides resources, mentorship, and development opportunities for emerging tech businesses.',
      website: 'https://atdc.org/',
      keyPersonnel: [
        { name: 'John Avery', title: 'General Manager', linkedin: 'https://www.linkedin.com/in/johnwavery/' }
      ],
      recentNews: 'Supporting technology development and innovation in Atlanta\'s growing tech ecosystem.'
    },

    // Salesloft - Major sales engagement platform unicorn
    {
      id: 'salesloft',
      name: 'Salesloft',
      type: 'company',
      size: 22,
      description: 'A leading AI-powered revenue orchestration platform that helps sales teams prioritize and take action on what matters most. Trusted by 5,000+ customers including 3M, Stripe, and IBM.',
      website: 'https://www.salesloft.com/',
      keyPersonnel: [
        { name: 'David Obrand', title: 'CEO', linkedin: 'https://www.linkedin.com/in/david-obrand-518b701/' }
      ],
      recentNews: 'Named a leader in the 2025 IDC MarketScape for worldwide GRC software and continues to expand its AI-powered revenue orchestration capabilities.'
    },

    // OneTrust - Privacy, security, and data governance leader
    {
      id: 'onetrust',
      name: 'OneTrust',
      type: 'company',
      size: 22,
      description: 'The world\'s most widely used privacy, security, and data governance platform. Serves 14,000+ customers including 75% of the Fortune 100, with 2,000+ employees and 300+ patents.',
      website: 'https://www.onetrust.com/',
      keyPersonnel: [
        { name: 'Kabir Barday', title: 'Co-Founder & CEO', linkedin: 'https://www.linkedin.com/in/kbarday/' }
      ],
      recentNews: 'Named to the Forbes Cloud 100 for seventh consecutive year and continues to lead in AI governance and privacy automation solutions.'
    },

    // Greenlight - Fintech unicorn for family financial services
    {
      id: 'greenlight',
      name: 'Greenlight',
      type: 'company',
      size: 21,
      description: 'A fintech unicorn providing financial services for families, including debit cards for kids, parental controls, and financial education tools. Valued at over $2.3 billion.',
      website: 'https://greenlight.com/',
      keyPersonnel: [
        { name: 'Tim Sheehan', title: 'Co-Founder & CEO', linkedin: 'https://www.linkedin.com/in/timsheehan/' }
      ],
      recentNews: 'Continues to expand its platform to help families teach kids about money management through innovative financial products and educational content.'
    },

    // MacStadium - NMP portfolio company
    {
      id: 'macstadium',
      name: 'MacStadium',
      type: 'company',
      size: 18,
      description: 'Leading provider of enterprise-class hosted Mac infrastructure, providing scalable, reliable, and secure private clouds and dedicated servers for workloads that require macOS. Trusted by iOS developers and DevOps teams at thousands of companies worldwide.',
      website: 'https://www.macstadium.com/',
      keyPersonnel: [
        { name: 'Ken Tacelli', title: 'CEO', linkedin: 'https://www.linkedin.com/in/kentacelli/' }
      ],
      recentNews: 'Named to Inc. 5000 and TiE50 Winner, continues to expand its Mac cloud infrastructure solutions for enterprise customers.'
    },

    // Revenue Analytics - NMP portfolio company
    {
      id: 'revenue-analytics',
      name: 'Revenue Analytics',
      type: 'company',
      size: 18,
      description: 'Tech-enabled revenue optimization platform providing AI-powered pricing software and services for hospitality, manufacturing, media, and passenger rail industries. Helps customers manage pricing optimization, demand forecasting, and revenue management workflows.',
      website: 'https://www.revenueanalytics.com/',
      keyPersonnel: [
        { name: 'Bill Brewster', title: 'CEO', linkedin: 'https://www.linkedin.com/in/billbrewster/' }
      ],
      recentNews: 'Announced strategic growth investment from Lead Edge Capital and continues to expand AI-powered revenue management solutions across multiple industries.'
    },

    // Rialtic - NMP portfolio company
    {
      id: 'rialtic',
      name: 'Rialtic',
      type: 'company',
      size: 17,
      description: 'Healthcare technology company focused on provider network management and payment integrity solutions. Helps healthcare organizations optimize their provider networks and ensure accurate payments.',
      website: 'https://www.rialtic.io/',
      keyPersonnel: [
        { name: 'Ashish Patel', title: 'CEO', linkedin: 'https://www.linkedin.com/in/ashishpatel/' }
      ],
      recentNews: 'Continues to expand its healthcare technology platform for provider network optimization and payment integrity solutions.'
    },

    // BitPay - TTV Capital portfolio company
    {
      id: 'bitpay',
      name: 'BitPay',
      type: 'company',
      size: 20,
      description: 'Leading cryptocurrency payment platform that enables businesses and individuals to accept, store, and spend cryptocurrency. Over 1 million wallets created, supporting multiple cryptocurrencies and blockchain networks including Bitcoin, Ethereum, and Solana.',
      website: 'https://www.bitpay.com/',
      keyPersonnel: [
        { name: 'Stephen Pair', title: 'Co-Founder & CEO', linkedin: 'https://www.linkedin.com/in/stephenpair/' }
      ],
      recentNews: 'Recently added support for Solana network and introduced HODL Pay feature, enabling users to unlock spending power without selling their crypto assets.'
    },

    // Carputty - TTV Capital portfolio company
    {
      id: 'carputty',
      name: 'Carputty',
      type: 'company',
      size: 18,
      description: 'Innovative auto financing platform that reinvents how people finance vehicles. Offers Flexline™ (flexible line of credit for multiple vehicles) and Flexloan™ (single vehicle financing) with transparent rates and the V³ Valuation™ system to track vehicle values over time.',
      website: 'https://www.carputty.com/',
      keyPersonnel: [
        { name: 'Patrick Bayliss', title: 'Co-Founder & CEO', linkedin: 'https://www.linkedin.com/in/patrickbayliss/' }
      ],
      recentNews: 'Expanding lending operations across multiple states and continuing to innovate in the auto financing space with data-driven vehicle valuation tools.'
    },

    // DefenseStorm - TTV Capital portfolio company
    {
      id: 'defensestorm',
      name: 'DefenseStorm',
      type: 'company',
      size: 19,
      description: 'Cybersecurity risk management platform built specifically for banks and credit unions. Provides integrated risk assessment, threat surveillance, governance programs, and fraud prevention through their GRID Active intelligent data engine. Headquartered in Alpharetta, GA.',
      website: 'https://defensestorm.com/',
      keyPersonnel: [
        { name: 'Paul Paget', title: 'CEO', linkedin: 'https://www.linkedin.com/in/paul-paget-6a0b1a1/' }
      ],
      recentNews: 'Recognized as High Performer by G2 in System Security and Endpoint Detection and Response, serving financial institutions with 24x7x365 cyber threat surveillance operations.'
    },

    // Greenwood - TTV Capital portfolio company
    {
      id: 'greenwood',
      name: 'Greenwood',
      type: 'company',
      size: 19,
      description: 'Black-founded, Black-led mobile financial platform inspired by the legacy of the early 1900s Greenwood District. Provides digital checking and savings accounts, investment opportunities, and community-focused financial services with features like Cash Back for Buying Black and roundup donations to support Black community organizations.',
      website: 'https://gogreenwood.com/',
      keyPersonnel: [
        { name: 'Ryan Glover', title: 'Co-Founder & CEO', linkedin: 'https://www.linkedin.com/in/ryanglover/' },
        { name: 'David Tapscott', title: 'Co-Founder & COO', linkedin: 'https://www.linkedin.com/in/david-tapscott-2a4a4a1/' }
      ],
      recentNews: 'Continues to expand its community-focused financial services platform, offering 4.15% APY savings accounts and investment opportunities in Black-owned companies while supporting community organizations through its giving programs.'
    },

    // SmartPath - TTV Capital portfolio company
    {
      id: 'smartpath',
      name: 'SmartPath',
      type: 'company',
      size: 18,
      description: 'Comprehensive financial education platform providing live and on-demand personal finance classes, one-on-one coaching, and AI-driven personalization for over 1 million users. Serves retirement plan advisors, employers, brokers, fintech companies, and financial institutions with 99% client retention.',
      website: 'https://www.joinsmartpath.com/',
      keyPersonnel: [
        { name: 'Todd Ruppert', title: 'CEO', linkedin: 'https://www.linkedin.com/in/todd-ruppert-4a4a4a1/' }
      ],
      recentNews: 'Named to Inc. 5000 list of fastest-growing private companies in 2024, continuing to expand its AI-powered financial education solutions for diverse client segments including major employers like Leidos, Lumen, and The Home Depot.'
    },

    // Medxoom - TTV Capital portfolio company
    {
      id: 'medxoom',
      name: 'Medxoom',
      type: 'company',
      size: 18,
      description: 'Health benefits platform that unifies the member experience to help navigate benefits and make better healthcare choices. Provides mobile-first member experience with pricing transparency, digital ID cards, integrated payments, and personalized communications. Headquartered in Atlanta, GA.',
      website: 'https://medxoom.com/',
      keyPersonnel: [
        { name: 'John Gorman', title: 'CEO', linkedin: 'https://www.linkedin.com/in/john-gorman-8a4a4a1/' }
      ],
      recentNews: 'Recently acquired by Zelis to deliver a mobile-first member experience platform, continuing to serve brokers, employers, and TPAs with unified health benefits solutions.'
    },

    // Cox Enterprises - Major Atlanta-based corporation
    {
      id: 'cox-enterprises',
      name: 'Cox Enterprises',
      type: 'company',
      size: 22,
      description: 'Major Atlanta-based private company with operations in communications, automotive, and media. One of the largest private companies in the United States, with significant presence in Atlanta\'s business community and technology sector.',
      website: 'https://www.coxenterprises.com/',
      keyPersonnel: [
        { name: 'Alex Taylor', title: 'Chairman & CEO', linkedin: 'https://www.linkedin.com/in/alex-taylor-8b8b8b8b/' }
      ],
      recentNews: 'Major Atlanta employer and corporate citizen, supporting technology innovation and entrepreneurship in the region through various initiatives and partnerships.'
    },

    // Circadian Syndicate Investments
    {
      id: 'hermeus',
      name: 'Hermeus',
      type: 'startup',
      size: 16,
      description: 'Aerospace and defense technology company developing hypersonic aircraft quickly and cost-effectively by combining a hardware-rich, iterative approach with modern computing and autonomy.',
      website: 'https://www.hermeus.com/',
      keyPersonnel: [
        { name: 'AJ Piplica', title: 'CEO', linkedin: 'https://www.linkedin.com/in/ajpiplica/' }
      ],
      recentNews: 'Building the world\'s fastest aircraft to operationalize hypersonic aircraft. Completed ground testing of Quarterhorse MK 1 at Edwards Air Force Base.'
    },

    {
      id: 'flourish-software',
      name: 'Flourish Software',
      type: 'company',
      size: 17,
      description: 'Award-winning cannabis ERP software providing comprehensive seed-to-sale solutions for cultivation, manufacturing, distribution, and retail operations across the cannabis supply chain.',
      website: 'https://www.flourishsoftware.com/',
      keyPersonnel: [
        { name: 'Colton Griffin', title: 'CEO', linkedin: 'https://www.linkedin.com/in/coltongriffin/' }
      ],
      recentNews: 'Serving 300+ cannabis brands with automated compliance, track & trace, COGS tracking, and easy label printing solutions.'
    },

    {
      id: 'brrr',
      name: 'brrr°',
      type: 'company',
      size: 15,
      description: 'Revolutionary cooling performance fabric company that draws heat and moisture away from skin to keep users cool, fresh, and confident. Features Triple Chill Effect™ technology permanently embedded in yarn.',
      website: 'https://www.brrr.com/',
      keyPersonnel: [
        { name: 'Mary-Cathryn Kolb', title: 'CEO', linkedin: 'https://www.linkedin.com/in/mary-cathryn-kolb/' }
      ],
      recentNews: 'Scientifically tested and proven cooling fabrics used in bedding, undergarments, athletic apparel, outdoor gear, and business attire.'
    },

    {
      id: 'apptega',
      name: 'Apptega',
      type: 'startup',
      size: 15,
      description: 'Cybersecurity compliance and risk management platform helping organizations streamline security frameworks and achieve compliance with industry standards.',
      website: 'https://www.apptega.com/',
      keyPersonnel: [
        { name: 'Dave Colesante', title: 'CEO', linkedin: 'https://www.linkedin.com/in/dave-colesante-844064165/' }
      ],
      recentNews: 'Cybersecurity compliance and risk management solutions for modern organizations.'
    },

    {
      id: 'roadsync',
      name: 'RoadSync',
      type: 'startup',
      size: 15,
      description: 'Digital payment and logistics platform for the transportation and logistics industry, streamlining payment processes and improving operational efficiency.',
      website: 'https://roadsync.com/',
      keyPersonnel: [
        { name: 'Robin Gregg', title: 'CEO', linkedin: 'https://www.linkedin.com/in/robingregg/' }
      ],
      recentNews: 'Digital payment solutions for transportation and logistics companies.'
    },

    {
      id: 'softwear-automation',
      name: 'SoftWear Automation',
      type: 'startup',
      size: 16,
      description: 'Robotics company developing sewing robots that can manufacture clothing and textiles with precision and efficiency, revolutionizing the apparel manufacturing industry.',
      website: 'https://softwearautomation.com/',
      keyPersonnel: [
        { name: 'Palaniswamy "Raj" Rajan', title: 'CEO', linkedin: 'https://www.linkedin.com/in/pvrajan/' }
      ],
      recentNews: 'Developing robots that can sew clothing and textiles, transforming apparel manufacturing through automation.'
    },

    // Circadian Fund I Investments
    {
      id: 'ketteq',
      name: 'ketteQ',
      type: 'company',
      size: 17,
      description: 'Supply chain technology company providing advanced supply chain management and optimization solutions for enterprise organizations.',
      website: 'https://www.ketteq.com/',
      keyPersonnel: [
        { name: 'Mike Landry', title: 'CEO', linkedin: 'https://www.linkedin.com/in/mike-landry-gt/' }
      ],
      recentNews: 'Recently closed $20M Series B funding round led by Vocap Partners and The Barkawi Group. Named to Inc. 5000 list of fastest-growing private companies.'
    },

    // Additional Atlanta Tech Ecosystem Organizations
    {
      id: 'switchyards',
      name: 'Switchyards',
      type: 'communityBuilders', // or 'incubator'
      size: 16,
      description: 'A members-only club and community focused on B2C and design-centric startups, known as the "front door to the Atlanta startup scene."',
      website: 'https://switchyards.com',
      keyPersonnel: [
        { name: 'Michael Tavani', title: 'Founder', linkedin: 'https://www.linkedin.com/in/michaeltavani/' }
      ],
      recentNews: 'Expanded to multiple neighborhood locations, fostering a hyper-local community model for entrepreneurs across the city.'
    },
    {
      id: 'tech-alpharetta',
      name: 'Tech Alpharetta',
      type: 'incubator',
      size: 17,
      description: 'A non-profit that runs a thriving tech incubator and provides educational programs and events to help grow technology and innovation in the city of Alpharetta.',
      website: 'https://techalpharetta.com',
      keyPersonnel: [
        { name: 'Karen Cashion', title: 'President & CEO', linkedin: 'https://www.linkedin.com/in/karen-cashion-25235042/' }
      ],
      recentNews: 'Fosters growth in North Fulton, known as the "Technology City of the South," by connecting startups with local enterprise tech companies.'
    },
    {
      id: 'flatiron-city',
      name: 'Flatiron City',
      type: 'incubator',
      size: 16,
      description: 'An innovation hub in downtown Atlanta\'s iconic Flatiron Building, housing a diverse base of B2B startups and the Women\'s Entrepreneurship Initiative (WEI).',
      website: 'https://flatironcity.com',
      keyPersonnel: [
        { name: 'Jacqui Chew', title: 'Founder, WEI', linkedin: 'https://www.linkedin.com/in/jacquichew/' }
      ],
      recentNews: 'Home to Microsoft\'s program for startups and a key partner for organizations promoting diverse founders in Atlanta.'
    },
    {
      id: 'curiosity-lab',
      name: 'Curiosity Lab',
      type: 'accelerator',
      size: 17,
      description: 'A 5G-enabled autonomous vehicle and smart city living laboratory located in Peachtree Corners, designed to foster the development of IoT, mobility, and smart city technology.',
      website: 'https://www.curiositylabptc.com/',
      keyPersonnel: [
        { name: 'Brandon Branham', title: 'Executive Director', linkedin: 'https://www.linkedin.com/in/bbranham/' }
      ],
      recentNews: 'Partners with companies globally to test and validate next-generation technologies in a real-world environment.'
    },
    {
      id: 'atlanta-blockchain-center',
      name: 'Atlanta Blockchain Center',
      type: 'incubator',
      size: 16,
      description: 'An incubator and co-working space dedicated to supporting and accelerating startups that use blockchain technology.',
      website: 'https://atlantablockchain.center/', // Corrected URL
      keyPersonnel: [
        { name: 'Marlon Williams', title: 'Founder & CEO', linkedin: 'https://www.linkedin.com/in/marlonwilliams/' }
      ],
      recentNews: 'Serves as the central hub for the Web3 community in Atlanta, providing education, venture funding, and corporate innovation.'
    },

    // Additional Venture Capital Firms
    {
      id: 'ttv-capital',
      name: 'TTV Capital',
      type: 'vc',
      size: 18,
      description: 'An early-stage venture capital firm focused on investing in fintech companies with a long history of success in Atlanta.',
      website: 'https://ttvcapital.com',
      keyPersonnel: [
        { name: 'Gardiner Garrard', title: 'Founding Partner', linkedin: 'https://www.linkedin.com/in/gardinergarrard/' }
      ],
      recentNews: 'A leading voice in the fintech space, TTV Capital helps build and support the financial technology leaders of tomorrow.'
    },
    {
      id: 'noro-moseley-partners',
      name: 'Noro-Moseley Partners',
      type: 'vc',
      size: 18,
      description: 'One of the longest-standing venture capital firms in the Southeast, NMP invests in early-growth stage healthcare and B2B software companies.',
      website: 'https://noromoseley.com',
      keyPersonnel: [
        { name: 'Spence McClelland', title: 'Partner', linkedin: 'https://www.linkedin.com/in/spence-mcclelland-4375b4/' }
      ],
      recentNews: 'With a four-decade history, NMP has a deep network and history of backing successful entrepreneurs in the region.'
    },
    {
      id: 'bip-ventures',
      name: 'BIP Ventures',
      type: 'vc',
      size: 18,
      description: 'A venture capital firm based in Atlanta that takes a "wider-view" approach to investing in startups across the country, particularly in emerging tech hubs. Formerly known as Panoramic Ventures, the firm rebranded in June 2023 as part of BIP Capital\'s consolidation of all venture capital operations.',
      website: 'https://bipventures.vc/',
      keyPersonnel: [
        { name: 'Paul Judge', title: 'Managing Partner', linkedin: 'https://www.linkedin.com/in/pauljudge/' },
        { name: 'Mark Buffington', title: 'Managing Partner', linkedin: 'https://www.linkedin.com/in/markbuffington/' }
      ],
      recentNews: 'Rebranded from Panoramic Ventures in June 2023 as part of BIP Capital\'s consolidation. Known for its Startup Showdown event and remains one of the most active venture funds in the Southeast.'
    },
    {
      id: 'fulcrum-equity-partners',
      name: 'Fulcrum Equity Partners',
      type: 'vc',
      size: 17,
      description: 'A growth equity firm that invests in rapidly growing, lower-middle market B2B software and healthcare companies.',
      website: 'https://www.fulcrumep.com/',
      keyPersonnel: [
        { name: 'Garrett Kash', title: 'Partner', linkedin: 'https://www.linkedin.com/in/garrettkash/' },
        { name: 'Frank X. Dalton', title: 'Partner', linkedin: 'https://www.linkedin.com/in/fxdalton/' },
        { name: 'Brent Dorfman', title: 'Partner', linkedin: 'https://www.linkedin.com/in/brent-dorfman-ba121232/' },
        { name: 'Scott Dorfman', title: 'Partner', linkedin: 'https://www.linkedin.com/in/scott-dorfman-90618730/' },
        { name: 'Jim Douglass', title: 'Partner', linkedin: 'https://www.linkedin.com/in/jim-douglass-04b1254/' },
        { name: 'Taylor Ellis-Jarrells', title: 'Partner', linkedin: 'https://www.linkedin.com/in/taylor-ellis-jarrells-44235097/' },
        { name: 'Peter Franconi', title: 'Partner', linkedin: 'https://www.linkedin.com/in/fpeterfranconi/' },
        { name: 'Alston Gardner', title: 'Partner', linkedin: 'https://www.linkedin.com/in/alston-gardner-41340/' },
        { name: 'Jason Gaspard', title: 'Partner', linkedin: 'https://www.linkedin.com/in/jgaspard1/' },
        { name: 'Amy Geiger', title: 'Partner', linkedin: 'https://www.linkedin.com/in/amy-geiger-cpa-91b1357/' },
        { name: 'Lior Taig Gordon', title: 'Partner', linkedin: 'https://www.linkedin.com/in/liortaigordon/' },
        { name: 'Thomas Greer', title: 'Partner', linkedin: 'https://www.linkedin.com/in/thomas-greer-35487158/' },
        { name: 'Chad Hooker', title: 'Partner', linkedin: 'https://www.linkedin.com/in/chadhooker1/' },
        { name: 'James Patrick Laudenslager', title: 'Partner', linkedin: 'https://www.linkedin.com/in/james-patrick-laudenslager-1060a1256/' },
        { name: 'Philip Lewis', title: 'Partner', linkedin: 'https://www.linkedin.com/in/philiplewisfulcrum/' },
        { name: 'Ali Razam', title: 'Partner', linkedin: 'https://www.linkedin.com/in/alirazam/' },
        { name: 'Jason Moore', title: 'Partner', linkedin: 'https://www.linkedin.com/in/jasonmoore/' },
        { name: 'Tonika Moore', title: 'Partner', linkedin: 'https://www.linkedin.com/in/tonika-moore-b9a01a247/' },
        { name: 'Amit Patel', title: 'Partner', linkedin: 'https://www.linkedin.com/in/amit-patel-416b8114/' },
        { name: 'Patrick Rowland', title: 'Partner', linkedin: 'https://www.linkedin.com/in/patrick-rowland-18077463/' },
        { name: 'Hunter Sessions', title: 'Partner', linkedin: 'https://www.linkedin.com/in/ehuntersessions/' },
        { name: 'Caitlin Tidwell', title: 'Partner', linkedin: 'https://www.linkedin.com/in/caitlin-tidwell-0091b0128/' },
        { name: 'Matt Zowine', title: 'Partner', linkedin: 'https://www.linkedin.com/in/matt-zowine-3ab801122/' }
      ],
      recentNews: 'Provides capital and operational expertise to help companies accelerate growth and reach their next level of scale.'
    },
    {
      id: 'tech-square-ventures',
      name: 'Tech Square Ventures',
      type: 'vc',
      size: 17,
      description: 'An Atlanta-based early-stage venture capital firm that partners with visionary entrepreneurs. The firm is closely associated with Georgia Tech.',
      website: 'https://techsquareventures.com',
      keyPersonnel: [
        { name: 'Blake Patton', title: 'Managing Partner', linkedin: 'https://www.linkedin.com/in/blakepatton/' }
      ],
      recentNews: 'Often the first institutional investor in companies, helping them with access to markets and customers, particularly through its corporate network.'
    },
    {
      id: 'collab-capital',
      name: 'Collab Capital',
      type: 'vc',
      size: 17,
      description: 'An investment fund focused on helping Black founders build sustainable, technology-enabled businesses through financial, human, and social capital.',
      website: 'https://collab.capital',
      keyPersonnel: [
        { name: 'Jewel Burks Solomon', title: 'Managing Partner', linkedin: 'https://www.linkedin.com/in/jewelburks/' }
      ],
      portfolio: [
        { id: 'boxedup', name: 'BoxedUp', description: 'Rental management platform for online bookings and sales' },
        { id: 'filmhedge', name: 'FilmHedge', description: 'Financial technology platform for entertainment industry' },
        { id: 'goodr', name: 'Goodr', description: 'Food waste solutions and hunger relief platform' },
        { id: 'hairbrella', name: 'Hairbrella', description: 'Weatherproof hair protection products' },
        { id: 'healthy-hip-hop', name: 'Healthy Hip Hop', description: 'Health and wellness platform using hip hop culture' },
        { id: 'imin2', name: 'I\'m In 2', description: 'Community engagement and opportunity platform' },
        { id: 'lainelondon', name: 'Laine London', description: 'Contemporary fashion and lifestyle brand' },
        { id: 'nectar', name: 'Nectar', description: 'Community engagement and social impact platform' },
        { id: 'photoid', name: 'PhotoID', description: 'Photo identification and verification platform' },
        { id: 'kairos', name: 'Kairos', description: 'Digital water technology for asset protection and conservation' }
      ],
      recentNews: 'Aims to establish a new model of investing to close the funding gap for Black entrepreneurs.'
    },

    // Collab Capital Fund 1 Portfolio Companies
    {
      id: 'boxedup',
      name: 'BoxedUp',
      type: 'startup',
      size: 16,
      description: 'Rental management platform that helps businesses book rentals and sales online 24/7. Provides e-commerce storefront, inventory management, same-day delivery, and payment processing for rental businesses.',
      website: 'https://tryboxedup.com/',
      keyPersonnel: [],
      recentNews: 'Award-winning desktop and mobile UX design for rental businesses with RMS integration and automated quote generation.'
    },
    {
      id: 'filmhedge',
      name: 'FilmHedge',
      type: 'startup',
      size: 16,
      description: 'Financial technology platform serving the entertainment industry with innovative funding solutions for film and media projects.',
      website: 'https://filmhedge.com/',
      keyPersonnel: [],
      recentNews: 'Providing financial tools and services to support the entertainment industry ecosystem.'
    },
    {
      id: 'goodr',
      name: 'Goodr',
      type: 'startup',
      size: 17,
      description: 'Food waste solutions and hunger relief platform that helps businesses reduce waste and feed communities. Uses technology and logistics to divert food from landfills and get it to those in need.',
      website: 'https://goodr.co/',
      keyPersonnel: [],
      recentNews: 'Served 30 million meals to people in need and diverted 4 million pounds of food from landfills, generating $6.3 million in tax deductions for partners.'
    },
    {
      id: 'hairbrella',
      name: 'Hairbrella',
      type: 'startup',
      size: 16,
      description: 'Weatherproof hair protection products including rain hats, swim caps, and outdoor accessories. Founded to solve the problem of hair being ruined by weather.',
      website: 'https://www.hairbrella.com/',
      keyPersonnel: [
        { name: 'Tracey Pickett', title: 'CEO & Founder', linkedin: 'https://www.linkedin.com/in/tracey-pickett/' }
      ],
      recentNews: 'Black-owned company creating innovative solutions for weather protection with 65 prototypes and extensive focus group testing.'
    },
    {
      id: 'healthy-hip-hop',
      name: 'Healthy Hip Hop',
      type: 'startup',
      size: 16,
      description: 'Health and wellness platform that promotes healthy living through hip hop culture and community engagement.',
      website: 'https://www.healthy.hiphop/',
      keyPersonnel: [],
      recentNews: 'Using music and culture to promote health and wellness in communities.'
    },
    {
      id: 'imin2',
      name: 'I\'m In 2',
      type: 'startup',
      size: 16,
      description: 'Platform connecting people with opportunities and experiences in their communities.',
      website: 'https://imin2.com/',
      keyPersonnel: [],
      recentNews: 'Building community connections and engagement through technology.'
    },
    {
      id: 'lainelondon',
      name: 'Laine London',
      type: 'startup',
      size: 16,
      description: 'Fashion and lifestyle brand focused on contemporary design and cultural expression.',
      website: 'https://www.lainelondon.com/',
      keyPersonnel: [],
      recentNews: 'Contemporary fashion brand with cultural impact and community focus.'
    },
    {
      id: 'nectar',
      name: 'Nectar',
      type: 'startup',
      size: 16,
      description: 'Platform providing services and solutions for community engagement and social impact.',
      website: 'https://www.usenectar.com/',
      keyPersonnel: [],
      recentNews: 'Building tools for community engagement and social good.'
    },
    {
      id: 'photoid',
      name: 'PhotoID',
      type: 'startup',
      size: 16,
      description: 'Photo identification and verification platform using technology for secure identity management.',
      website: 'https://photoidapp.net/',
      keyPersonnel: [],
      recentNews: 'Technology platform for secure photo identification and verification services.'
    },

    // Collab Capital Fund 2 Portfolio Companies
    {
      id: 'kairos',
      name: 'Kairos',
      type: 'startup',
      size: 16,
      description: 'Digital water technology company focused on asset protection and water conservation through advanced metering and leak detection technologies.',
      website: 'https://www.collab.capital/companies/kairos',
      keyPersonnel: [
        { name: 'Dean Fung-A-Wing', title: 'Founder', linkedin: 'https://www.linkedin.com/in/dean-fung-a-wing/' }
      ],
      recentNews: 'Part of Collab Capital Fund 2, focusing on community infrastructure through innovative water technology solutions.'
    },
    {
      id: 'fearless-fund',
      name: 'Fearless Fund',
      type: 'vc',
      size: 17,
      description: 'A venture capital fund that invests in women of color-led businesses seeking pre-seed, seed, or series A financing.',
      website: 'https://www.fearless.fund/',
      keyPersonnel: [
        { name: 'Arian Simone', title: 'Co-Founder & CEO', linkedin: 'https://www.linkedin.com/in/ariansimone/' }
      ],
      recentNews: 'Built by women of color for women of color, Fearless Fund is dedicated to bridging the gap in venture capital funding.'
    },

    // Additional Accelerators and Community Builders
    {
      id: 'techstars-atlanta',
      name: 'Techstars Atlanta',
      type: 'accelerator',
      size: 19,
      description: 'A globally recognized accelerator program, partnered with Cox Enterprises, that invests in and mentors early-stage startups.',
      website: 'https://techstars.com/accelerators/atlanta',
      keyPersonnel: [
        { name: 'Tim Dorr', title: 'Managing Director', linkedin: 'https://www.linkedin.com/in/timdorr/' }
      ],
      recentNews: 'Graduates from Techstars Atlanta are among the most sought-after companies for follow-on funding from local and national VCs.'
    },
    {
      id: 'cox-social-impact-accelerator',
      name: 'Cox Social Impact Accelerator',
      type: 'accelerator',
      size: 18,
      description: 'A program powered by Techstars and Cox Enterprises that supports for-profit startups addressing social justice and environmental issues.',
      website: 'https://www.techstars.com/accelerators/cox-social-impact',
      keyPersonnel: [
        { name: 'Maigread Eichten', title: 'Managing Director', linkedin: 'https://www.linkedin.com/in/maigread/' }
      ],
      recentNews: 'Focuses on backing underrepresented founders and startups that are driving positive community impact.'
    },
    {
      id: 'goodie-nation',
      name: 'Goodie Nation',
      type: 'communityBuilders', // or 'accelerator'
      size: 18,
      description: 'A non-profit dedicated to closing the relationship gap for diverse founders. Goodie Nation provides support and connections to social entrepreneurs and diverse founders.',
      website: 'https://goodienation.org/',
      keyPersonnel: [
        { name: 'Joey Womack', title: 'CEO', linkedin: 'https://www.linkedin.com/in/joeywomack/' },
        { name: 'Abiodun John', title: 'Good Brotha', linkedin: 'https://www.linkedin.com/in/abiodun-john/' },
        { name: 'Allison Todd', title: 'TAP Forward', linkedin: 'https://www.linkedin.com/in/allison-todd/' },
        { name: 'Bobby Gilbert', title: 'AI Agent Coach', linkedin: 'https://www.linkedin.com/in/bobby-gilbert/' },
        { name: 'Caitlin Ferguson', title: 'Board Member', linkedin: 'https://www.linkedin.com/in/caitlin-ferguson/' },
        { name: 'Celeste Shie', title: 'Seed Stage Support', linkedin: 'https://www.linkedin.com/in/celeste-shie/' },
        { name: 'Elishia Thomas', title: 'Lenovo Evolve', linkedin: 'https://www.linkedin.com/in/elishia-thomas/' },
        { name: 'Eugenia Johnson', title: 'TAP Forward', linkedin: 'https://www.linkedin.com/in/eugenia-johnson/' },
        { name: 'Ian Scott', title: 'Leadership Coach', linkedin: 'https://www.linkedin.com/in/ian-scott/' },
        { name: 'Jamaila Holden', title: 'Product Manager', linkedin: 'https://www.linkedin.com/in/jamaila-holden/' },
        { name: 'Jeff Hilimire', title: 'Board Member', linkedin: 'https://www.linkedin.com/in/jeffhilimire/' },
        { name: 'Jenea Bradley', title: 'Board Member', linkedin: 'https://www.linkedin.com/in/jenea-bradley/' },
        { name: 'Justin Dawkins', title: 'Board Member', linkedin: 'https://www.linkedin.com/in/justin-dawkins/' },
        { name: 'Karen Hubbard', title: 'Seed Stage Support', linkedin: 'https://www.linkedin.com/in/karen-hubbard/' },
        { name: 'Kimberly Jolley', title: 'Next Generation', linkedin: 'https://www.linkedin.com/in/kimberly-jolley/' },
        { name: 'Kirk Barnes', title: 'Board Member', linkedin: 'https://www.linkedin.com/in/kirk-barnes/' },
        { name: 'Kylan Kester', title: 'ATL BLK TCH', linkedin: 'https://www.linkedin.com/in/bykylan/' },
        { name: 'MJ Allen', title: 'TAP Forward', linkedin: 'https://www.linkedin.com/in/mj-allen/' },
        { name: 'Naomi Arroyo', title: 'TAP Forward', linkedin: 'https://www.linkedin.com/in/naomi-arroyo/' },
        { name: 'Olayinka Osilaja', title: 'Event Operations', linkedin: 'https://www.linkedin.com/in/olayinka-osilaja/' },
        { name: 'Raeshawn Peterson', title: 'Fundraising', linkedin: 'https://www.linkedin.com/in/raeshawn-peterson/' },
        { name: 'Seth Banks', title: 'B2B Sales Coach', linkedin: 'https://www.linkedin.com/in/seth-banks/' },
        { name: 'Shay Lawson', title: 'Board Member', linkedin: 'https://www.linkedin.com/in/shay-lawson/' },
        { name: 'Tamay Shannon', title: 'ATL BLK TCH', linkedin: 'https://www.linkedin.com/in/tamay-shannon/' },
        { name: 'Trevor Wilkin', title: 'Health Tech', linkedin: 'https://www.linkedin.com/in/trevor-wilkin/' },
        { name: 'Vanessa Kuhl', title: 'VC Readiness', linkedin: 'https://www.linkedin.com/in/vanessa-kuhl/' }
      ],
      recentNews: 'One of the most influential organizations in the Southeast for connecting diverse founders to capital, mentors, and corporate partners.'
    },
    {
      id: 'comcast-sportstech',
      name: 'Comcast SportsTech Accelerator',
      type: 'accelerator',
      size: 17,
      description: 'A Comcast NBCUniversal-backed accelerator that invests in and fast-tracks innovative startups in the sports technology sector.',
      website: 'https://www.comcastsportstech.com/',
      keyPersonnel: [
        { name: 'Jenna Kurath', title: 'Vice President, Startup Partnerships', linkedin: 'https://www.linkedin.com/in/jennakurath/' }
      ],
      recentNews: 'Leverages partnerships with major sports brands to provide startups with unparalleled industry access.'
    },

    // Additional Trade Organizations and Community Builders
    {
      id: 'venture-atlanta',
      name: 'Venture Atlanta',
      type: 'trade',
      size: 20,
      description: 'A non-profit organization that hosts the largest and most prestigious venture capital conference in the Southeast, connecting investors with innovative tech companies.',
      website: 'https://ventureatlanta.org',
      keyPersonnel: [
        { name: 'Allyson Eman', title: 'CEO', linkedin: 'https://www.linkedin.com/in/allysoneman/' }
      ],
      recentNews: 'Venture Atlanta has helped its presenting companies collectively raise over $7.5 billion in funding.'
    },
    {
      id: 'metro-atlanta-chamber',
      name: 'Metro Atlanta Chamber',
      type: 'trade',
      size: 19,
      description: 'A leading organization for economic development and promoting the metro Atlanta region. Supports tech growth through various initiatives, including its Backed by ATL program for scale-ups.',
      website: 'https://www.metroatlantachamber.com',
      keyPersonnel: [
        { name: 'Katie Kirkpatrick', title: 'President and CEO', linkedin: 'https://www.linkedin.com/in/katiekirkpatrick/' }
      ],
      recentNews: 'Actively works to attract, grow, and retain technology companies and talent in the Atlanta region.'
    },
    {
      id: 'startup-atlanta',
      name: 'Startup Atlanta',
      type: 'communityBuilders',
      size: 18,
      description: 'A community non-profit focused on connecting, supporting, and expanding the entrepreneurial ecosystem in the greater Atlanta region.',
      website: 'https://www.startupatlanta.com',
      keyPersonnel: [
        { name: 'Lexie Newhouse', title: 'President (Program Director, Boomtown Accelerators)', linkedin: 'https://www.linkedin.com/in/lexienewhouse/' },
        { name: 'Burunda Prince', title: 'Secretary (Director, PNC Southeastern Regional Center for Entrepreneurship, Clark Atlanta University)', linkedin: 'https://www.linkedin.com/in/burunda/' },
        { name: 'Joey Womack', title: 'President Emeritus (Founder/CEO, Goodie Nation)', linkedin: 'https://www.linkedin.com/in/joeywomack/' },
        { name: 'Jennifer Bennett', title: 'VP Technology & Entrepreneurship, Invest Atlanta', linkedin: 'https://www.linkedin.com/in/jenniferbonnett/' },
        { name: 'Karen Cashion', title: 'President & CEO, Tech Alpharetta', linkedin: 'https://www.linkedin.com/in/karen-cashion-25235042/' },
        { name: 'Michael DiCenso', title: 'Relationship Manager: Innovation Ecosystems, Collaborative Real Estate', linkedin: 'https://www.linkedin.com/in/michaeldicenso/' },
        { name: 'Allyson Eman', title: 'CEO, Venture Atlanta', linkedin: 'https://www.linkedin.com/in/allysoneman/' },
        { name: 'Adam Harrell', title: 'Founder, Nebo', linkedin: 'https://www.linkedin.com/in/adamharrell/' },
        { name: 'Kylan Kester', title: 'Director, Student Initiatives, Morehouse', linkedin: 'https://www.linkedin.com/in/bykylan/' },
        { name: 'Larry McHugh', title: 'Facilitator, Mentor, Volunteer & Angel Investor', linkedin: 'https://www.linkedin.com/in/larrymchugh/' },
        { name: 'Gail Podolsky', title: 'President & Founder, Podolsky Law', linkedin: 'https://www.linkedin.com/in/gail-podolsky-3694991/' },
        { name: 'Jennifer Singh', title: 'Sustainability Catalyst, ATDC', linkedin: 'https://www.linkedin.com/in/jennifersingh2/' },
        { name: 'Shea Taylor', title: 'VIP, Innovation Economy, Startup Banking, J.P. Morgan', linkedin: 'https://www.linkedin.com/in/shea-taylor-25243323/' },
        { name: 'Pav Thukral', title: 'CEO, Magic Data', linkedin: 'https://www.linkedin.com/in/pavleen/' }
      ],
      recentNews: 'Produces the annual Startup Atlanta Ecosystem Guide and hosts the Atlanta Startup Awards to celebrate the community\'s innovators.'
    },
    {
      id: 'atlanta-ceo-council',
      name: 'Atlanta CEO Council',
      type: 'trade',
      size: 17,
      description: 'A non-profit, invitation-only organization of CEOs from product and recurring revenue companies. It connects leaders to capital, customers, talent, and each other.',
      website: 'https://www.atlantaceo.org',
      keyPersonnel: [
        { name: 'Palaniswamy "Raj" Rajan', title: 'Chairman', linkedin: 'https://www.linkedin.com/in/pvrajan/' }
      ],
      recentNews: 'Provides a confidential, peer-to-peer network for the leaders of Atlanta\'s most successful tech companies.'
    },
    {
      id: 'fintech-atlanta',
      name: 'FinTech Atlanta',
      type: 'trade',
      size: 18,
      description: 'A coalition of over 100 organizations working to cement Atlanta as the global capital of financial technology.',
      website: 'https://www.fintechatlanta.org/',
      keyPersonnel: [
        { name: 'Bader Alam', title: 'Executive Director', linkedin: 'https://www.linkedin.com/in/baderalam/' }
      ],
      recentNews: 'Facilitates collaboration between Atlanta\'s large financial corporations and its thriving fintech startup scene.'
    },
    {
      id: 'create-x',
      name: 'CREATE-X',
      type: 'accelerator',
      size: 18,
      description: 'A Georgia Institute of Technology initiative that empowers students to launch successful startups. It provides coaching, curriculum, legal services, and seed funding.',
      website: 'https://create-x.gatech.edu/',
      keyPersonnel: [
        { name: 'Raghupathy "Siva" Sivakumar', title: 'Founding Director', linkedin: 'https://www.linkedin.com/in/raghupathy-sivakumar-39598a3/' }
      ],
      recentNews: 'A primary driver of new venture creation at Georgia Tech, having launched hundreds of startups that have raised significant venture capital.'
    },

    // Corporate Innovation Centers
    {
      id: 'delta-hangar',
      name: 'The Hangar',
      type: 'corporateInnovation',
      size: 18,
      description: 'Delta Air Lines\' global innovation center in Tech Square, dedicated to developing solutions for travel that are thoughtful, reliable and innovative. Delta is a founding partner of Engage VC.',
      website: 'https://www.delta.com/us/en/delta-digital/innovation',
      keyPersonnel: [],
      recentNews: 'Explores technology in areas like biometric security, predictive analytics, and enhanced customer experiences.'
    },
    {
      id: 'home-depot-innovation',
      name: 'OrangeWorks',
      type: 'corporateInnovation',
      size: 18,
      description: 'Located in Tech Square, this center allows The Home Depot to partner with Georgia Tech students and faculty to accelerate retail technology and supply chain innovation. Home Depot is a founding partner of Engage VC.',
      website: 'https://www.scheller.gatech.edu/about-scheller/tech-square/scheller-goes-inside-the-home-depot.html',
      keyPersonnel: [],
      recentNews: 'Focuses on developing new solutions for e-commerce, in-store experience, and supply chain logistics.'
    },
    {
      id: 'ncr-innovation-lab',
      name: 'NCR Innovation Lab',
      type: 'corporateInnovation',
      size: 18,
      description: 'Located at NCR\'s global headquarters in Midtown, this lab focuses on creating next-generation solutions for banking, retail, and hospitality industries.',
      website: 'https://www.ncr.com/company/innovation',
      keyPersonnel: [],
      recentNews: 'A key driver in Atlanta\'s FinTech ecosystem, exploring technologies like AI, IoT, and cloud computing for commerce.'
    },

    // Additional Universities
    {
      id: 'georgia-state-university',
      name: 'Georgia State University',
      type: 'university',
      size: 20,
      description: 'A major public research university in downtown Atlanta with a strong focus on innovation and entrepreneurship through its Entrepreneurship and Innovation Institute (ENI).',
      website: 'https://gsu.edu',
      keyPersonnel: [
        { name: 'M. Brian Blake', title: 'President', linkedin: 'https://www.linkedin.com/in/m-brian-blake-phd-419a3b2/' }
      ],
      recentNews: 'GSU is a national leader in graduating students from diverse backgrounds and is rapidly expanding its programs like LaunchGSU to support student ventures.'
    },
    {
      id: 'aucc',
      name: 'AUCC',
      type: 'university',
      size: 20,
      description: 'The world\'s oldest and largest consortium of historically Black colleges and universities (HBCUs), comprised of Clark Atlanta University, Morehouse College, and Spelman College. A powerhouse for diverse talent and innovation.',
      website: 'https://aucenter.edu/',
      keyPersonnel: [
        { name: 'Michael Hodge', title: 'Executive Director', linkedin: 'https://www.linkedin.com/in/michael-hodge-5969588/' }
      ],
      recentNews: 'The AUCC is a focal point for major tech company partnerships and initiatives aimed at developing and recruiting top Black talent.'
    },
    {
      id: 'kennesaw-state-university',
      name: 'Kennesaw State University',
      type: 'university',
      size: 19,
      description: 'One of Georgia\'s largest universities, with major programs in computing, engineering, and business. The Robin and Doug Shore Entrepreneurship Center supports a growing startup culture.',
      website: 'https://www.kennesaw.edu/',
      keyPersonnel: [
        { name: 'Kathy "Kat" Schwaig', title: 'President', linkedin: 'https://www.linkedin.com/in/kathyschwaig/' }
      ],
      recentNews: 'KSU is a major supplier of tech and business talent to companies across the metro Atlanta area.'
    },

    // Additional Diversity-Focused and Scaling Organizations
    {
      id: 'launchpad-2x',
      name: 'Launchpad 2X',
      type: 'accelerator',
      size: 17,
      description: 'An intensive, mentor-driven accelerator program and ecosystem for female founders and leaders of emerging-growth businesses.',
      website: 'https://launchpad2x.com',
      keyPersonnel: [
        { name: 'Bernie Dixon', title: 'Founder and CEO', linkedin: 'https://www.linkedin.com/in/bernie-dixon-a49339/' }
      ],
      recentNews: 'Provides deep mentorship and a powerful network to help women-led companies overcome barriers to scaling.'
    },
    {
      id: 'pin-georgia',
      name: 'PIN',
      type: 'economicDevelopment',
      size: 18,
      description: 'A statewide public-private partnership that leads coordinated, statewide efforts to position Georgia as the tech capital of the East Coast through innovation, workforce development, and research.',
      website: 'https://pingeorgia.org/',
      keyPersonnel: [
        { name: 'G.P. "Bud" Peterson', title: 'Board Chairman (Former President, Georgia Tech)' }
      ],
      recentNews: 'Launches pilot programs and initiatives to advance innovation and entrepreneurship in communities across Georgia.'
    },
    {
      id: 'endeavor-atlanta',
      name: 'Endeavor Atlanta',
      type: 'communityBuilders',
      size: 18,
      description: 'The Atlanta chapter of a global organization that supports high-impact entrepreneurs. Its ScaleUp ATL program specifically accelerates high-potential Black founders.',
      website: 'https://endeavoratlanta.org/',
      keyPersonnel: [
        { name: 'Eileen Slee', title: 'Managing Director', linkedin: 'https://www.linkedin.com/in/eileenslee/' },
        { name: 'Lane Moore', title: 'Director', linkedin: 'https://www.linkedin.com/in/lanemoore/' },
        { name: 'Shila Nieves-Burney', title: 'Director', linkedin: 'https://www.linkedin.com/in/shila-nieves-burney-0346436/' },
        { name: 'Kyle Porter', title: 'Director', linkedin: 'https://www.linkedin.com/in/kyleporter/' }
      ],
      recentNews: 'Focuses on helping later-stage founders scale their businesses through mentorship and access to a global network.'
    },

    // Additional Diversity-Focused Investment and Educational Organizations
    {
      id: 'steelsky-ventures',
      name: 'Steelsky Ventures',
      type: 'vc',
      size: 17,
      description: 'A venture capital firm that invests in companies improving access, care, and outcomes in women\'s healthcare, with a preference for companies with women in leadership.',
      website: 'https://steelskyventures.com/',
      keyPersonnel: [
        { name: 'Maria Steelsky', title: 'Founding Partner', linkedin: 'https://www.linkedin.com/in/mariasteelsky/' },
        { name: 'Casey Albert', title: 'Partner', linkedin: 'https://www.linkedin.com/in/caseyalbert1/' },
        { name: 'Amy K. Lambert', title: 'Partner', linkedin: 'https://www.linkedin.com/in/amy-k-lambert/' },
        { name: 'Georgia Rounder', title: 'Partner', linkedin: 'https://www.linkedin.com/in/georgia-rounder-rdn-907a4b74/' }
      ],
      portfolio: [
        { id: 'motivo-health', name: 'Motivo Health', description: 'Digital health platform solving clinical supervision for healthcare organizations' }
      ],
      recentNews: 'Focuses on a critical and historically underfunded sector, investing across medical devices, digital health, and new care models.'
    },

    {
      id: 'motivo-health',
      name: 'Motivo Health',
      type: 'startup',
      size: 17,
      description: 'Digital health platform that solves clinical supervision for healthcare organizations. Matches top-rated clinical supervisors with associate-level therapists, removing the burden of clinical supervision and ensuring no gaps in care.',
      website: 'https://motivohealth.com/',
      keyPersonnel: [
        { name: 'Rachel McCrickard', title: 'CEO & Co-Founder', linkedin: 'https://www.linkedin.com/in/rachelmccrickard/' }
      ],
      recentNews: 'Network of 1,200+ clinical supervisors serving digital health providers, health plans, and community providers across multiple states with expertise in licensing regulations and compliance.'
    },
    {
      id: 'agnes-scott-college',
      name: 'Agnes Scott College',
      type: 'university',
      size: 18,
      description: 'A private, liberal arts women\'s college in Decatur, Georgia, known for its innovative SUMMIT curriculum focused on global learning and leadership development.',
      website: 'https://www.agnesscott.edu/',
      keyPersonnel: [
        { name: 'Leocadia I. Zak', title: 'President', linkedin: 'https://www.linkedin.com/in/leocadia-zak-51829610b/' }
      ],
      recentNews: 'Consistently ranked among the most innovative liberal arts colleges, it is a key source of diverse, dynamic talent for the Atlanta area.'
    },

    // International Tech Organizations
    {
      id: 'la-french-tech-atlanta',
      name: 'La French Tech Atlanta',
      type: 'trade', // or 'communityBuilders'
      size: 17,
      description: 'An official chapter of the global French Tech movement, bringing together French entrepreneurs, investors, and tech leaders to animate the local ecosystem and support the growth of French startups in the Atlanta area.',
      website: 'https://www.facc-atlanta.com/la-french-tech.html',
      keyPersonnel: [
        { name: 'Arthur Bellamy', title: 'President (CRO, Exotec)', linkedin: 'https://www.linkedin.com/in/arthurbellamy/' },
        { name: 'Christine De Wendel', title: 'Board Member (Co-Founder & CEO US, sunday)', linkedin: 'https://www.linkedin.com/in/christine-de-wendel/' },
        { name: 'Francois Giraud', title: 'Board Member (Startup Program Lead USA, OVHcloud)', linkedin: 'https://www.linkedin.com/in/fgiraud/' },
        { name: 'Renaud Charvet', title: 'Board Member (Co-founder & CEO, Ringover INC)', linkedin: 'https://www.linkedin.com/in/renaud-charvet-809512124/' },
        { name: 'Sebastien Lafon', title: 'Board Member (Founder, Adapt1st)', linkedin: 'https://www.linkedin.com/in/-sebastienlafon/' },
        { name: 'Pascale Cohen', title: 'Board Member (Attache for Science and Technology)', linkedin: 'https://www.linkedin.com/in/pascale-cohen-09a04a102/' },
        { name: 'Katherine Lafourcade', title: 'Board Member (Executive Director, FACC Atlanta-Southeast)', linkedin: 'https://www.linkedin.com/in/katherine-lafourcade/' }
      ],
      recentNews: 'Formally launched as a new chapter for 2023-2025 to enhance transatlantic tech cooperation, led by major French-American tech companies including Exotec, OVHCloud, sunday, and Ringover.'
    }

  ],

  links: [
    // Mosley Ventures investments in portfolio companies
    {
      source: 'mosley-ventures',
      target: 'codoxo',
      type: 'investment',
      description: 'Mosley Ventures investment in Codoxo'
    },
    {
      source: 'mosley-ventures',
      target: 'demand-driven-tech',
      type: 'investment',
      description: 'Mosley Ventures investment in Demand Driven Technologies'
    },

    // Noro-Moseley Partners investments in portfolio companies
    {
      source: 'noro-moseley-partners',
      target: 'macstadium',
      type: 'investment',
      description: 'Noro-Moseley Partners investment in MacStadium'
    },
    {
      source: 'noro-moseley-partners',
      target: 'revenue-analytics',
      type: 'investment',
      description: 'Noro-Moseley Partners investment in Revenue Analytics'
    },
    {
      source: 'noro-moseley-partners',
      target: 'rialtic',
      type: 'investment',
      description: 'Noro-Moseley Partners investment in Rialtic'
    },
    {
      source: 'noro-moseley-partners',
      target: 'voxie',
      type: 'investment',
      description: 'Noro-Moseley Partners investment in Voxie'
    },

    // TTV Capital investments in portfolio companies
    {
      source: 'ttv-capital',
      target: 'bitpay',
      type: 'investment',
      description: 'TTV Capital investment in BitPay'
    },
    {
      source: 'ttv-capital',
      target: 'carputty',
      type: 'investment',
      description: 'TTV Capital investment in Carputty'
    },
    {
      source: 'ttv-capital',
      target: 'defensestorm',
      type: 'investment',
      description: 'TTV Capital investment in DefenseStorm'
    },
    {
      source: 'ttv-capital',
      target: 'greenlight',
      type: 'investment',
      description: 'TTV Capital investment in Greenlight'
    },
    {
      source: 'ttv-capital',
      target: 'greenwood',
      type: 'investment',
      description: 'TTV Capital investment in Greenwood'
    },
    {
      source: 'ttv-capital',
      target: 'instant',
      type: 'investment',
      description: 'TTV Capital investment in Instant'
    },
    {
      source: 'ttv-capital',
      target: 'ledgible',
      type: 'investment',
      description: 'TTV Capital investment in Ledgible'
    },
    {
      source: 'ttv-capital',
      target: 'smartpath',
      type: 'investment',
      description: 'TTV Capital investment in SmartPath'
    },






    // Atlanta Ventures investments in portfolio companies
    {
      source: 'atlanta-ventures',
      target: 'adpipe',
      type: 'investment',
      description: 'Atlanta Ventures investment in AdPipe'
    },

    {
      source: 'atlanta-ventures',
      target: 'calendly',
      type: 'investment',
      description: 'Atlanta Ventures investment in Calendly'
    },
    {
      source: 'atlanta-ventures',
      target: 'carpool-logistics',
      type: 'investment',
      description: 'Atlanta Ventures investment in Carpool Logistics'
    },
    {
      source: 'atlanta-ventures',
      target: 'copient-health',
      type: 'investment',
      description: 'Atlanta Ventures investment in Copient Health'
    },
    {
      source: 'atlanta-ventures',
      target: 'dragon-army',
      type: 'investment',
      description: 'Atlanta Ventures investment in Dragon Army'
    },
    {
      source: 'atlanta-ventures',
      target: 'finquery',
      type: 'investment',
      description: 'Atlanta Ventures investment in FinQuery'
    },
    {
      source: 'atlanta-ventures',
      target: 'gimme',
      type: 'investment',
      description: 'Atlanta Ventures investment in Gimme'
    },

    {
      source: 'atlanta-ventures',
      target: 'grayscale',
      type: 'investment',
      description: 'Atlanta Ventures investment in Grayscale'
    },
    {
      source: 'atlanta-ventures',
      target: 'greenzie',
      type: 'investment',
      description: 'Atlanta Ventures investment in Greenzie'
    },

    {
      source: 'atlanta-ventures',
      target: 'hannon-hill',
      type: 'investment',
      description: 'Atlanta Ventures investment in Hannon Hill'
    },

    {
      source: 'atlanta-ventures',
      target: 'infinite-giving',
      type: 'investment',
      description: 'Atlanta Ventures investment in Infinite Giving'
    },
    {
      source: 'atlanta-ventures',
      target: 'inpharmd',
      type: 'investment',
      description: 'Atlanta Ventures investment in InPharmD'
    },
    {
      source: 'atlanta-ventures',
      target: 'interlock-studios',
      type: 'investment',
      description: 'Atlanta Ventures investment in Interlock Studios'
    },
    {
      source: 'atlanta-ventures',
      target: 'intown-golf-club',
      type: 'investment',
      description: 'Atlanta Ventures investment in Intown Golf Club'
    },


    {
      source: 'atlanta-ventures',
      target: 'queues',
      type: 'investment',
      description: 'Atlanta Ventures investment in Queues'
    },
    {
      source: 'atlanta-ventures',
      target: 'reframe',
      type: 'investment',
      description: 'Atlanta Ventures investment in Reframe'
    },


    {
      source: 'atlanta-ventures',
      target: 'the-perlant',
      type: 'investment',
      description: 'Atlanta Ventures investment in The Perlant'
    },
    {
      source: 'atlanta-ventures',
      target: 'undaunted',
      type: 'investment',
      description: 'Atlanta Ventures investment in Undaunted'
    },
    {
      source: 'atlanta-ventures',
      target: 'voxie',
      type: 'investment',
      description: 'Atlanta Ventures investment in Voxie'
    },
    {
      source: 'atlanta-ventures',
      target: 'zinnia',
      type: 'investment',
      description: 'Atlanta Ventures investment in Zinnia'
    },

    // Valor Ventures investments in portfolio companies
    {
      source: 'valor-ventures',
      target: 'aetos-imaging',
      type: 'investment',
      description: 'Valor Ventures investment in Aetos Imaging'
    },


    {
      source: 'valor-ventures',
      target: 'autonoma',
      type: 'investment',
      description: 'Valor Ventures investment in Autonoma'
    },


    {
      source: 'valor-ventures',
      target: 'funding-u',
      type: 'investment',
      description: 'Valor Ventures investment in Funding U'
    },



    {
      source: 'valor-ventures',
      target: 'myphysician360',
      type: 'investment',
      description: 'Valor Ventures investment in MyPhysician360'
    },




    {
      source: 'valor-ventures',
      target: 'smartcommerce',
      type: 'investment',
      description: 'Valor Ventures investment in SmartCommerce'
    },

    {
      source: 'valor-ventures',
      target: 'the-gathering-spot',
      type: 'investment',
      description: 'Valor Ventures investment in The Gathering Spot'
    },



    {
      source: 'valor-ventures',
      target: 'vital4',
      type: 'investment',
      description: 'Valor Ventures investment in Vital4'
    },

    // Engage VC investments in portfolio companies
    {
      source: 'engage-vc',
      target: 'aetos-imaging',
      type: 'investment',
      description: 'Engage VC investment in Aetos Imaging'
    },
    {
      source: 'engage-vc',
      target: 'cirt',
      type: 'investment',
      description: 'Engage VC investment in CIRT'
    },
    {
      source: 'engage-vc',
      target: 'cloverly',
      type: 'investment',
      description: 'Engage VC investment in Cloverly'
    },
    {
      source: 'engage-vc',
      target: 'coginiti',
      type: 'investment',
      description: 'Engage VC investment in Coginiti'
    },
    {
      source: 'engage-vc',
      target: 'cyrano-video',
      type: 'investment',
      description: 'Engage VC investment in Cyrano Video'
    },
    {
      source: 'engage-vc',
      target: 'glass',
      type: 'investment',
      description: 'Engage VC investment in Glass'
    },
    {
      source: 'engage-vc',
      target: 'instant',
      type: 'investment',
      description: 'Engage VC investment in Instant'
    },
    {
      source: 'engage-vc',
      target: 'itential',
      type: 'investment',
      description: 'Engage VC investment in Itential'
    },
    {
      source: 'engage-vc',
      target: 'ledgible',
      type: 'investment',
      description: 'Engage VC investment in Ledgible'
    },
    {
      source: 'engage-vc',
      target: 'macondo-vision',
      type: 'investment',
      description: 'Engage VC investment in Macondo Vision'
    },
    {
      source: 'engage-vc',
      target: 'mirage-data',
      type: 'investment',
      description: 'Engage VC investment in Mirage Data'
    },
    {
      source: 'engage-vc',
      target: 'nugen-systems',
      type: 'investment',
      description: 'Engage VC investment in Nugen Systems'
    },
    {
      source: 'engage-vc',
      target: 'onwards-hr',
      type: 'investment',
      description: 'Engage VC investment in Onwards HR'
    },
    {
      source: 'engage-vc',
      target: 'playerzero',
      type: 'investment',
      description: 'Engage VC investment in PlayerZero'
    },
    {
      source: 'engage-vc',
      target: 'query-ai',
      type: 'investment',
      description: 'Engage VC investment in Query AI'
    },
    {
      source: 'engage-vc',
      target: 'slip-robotics',
      type: 'investment',
      description: 'Engage VC investment in Slip Robotics'
    },
    {
      source: 'engage-vc',
      target: 'stord',
      type: 'investment',
      description: 'Engage VC investment in Stord'
    },
    {
      source: 'engage-vc',
      target: 'tcpoly',
      type: 'investment',
      description: 'Engage VC investment in TCPoly'
    },
    {
      source: 'engage-vc',
      target: 'verusen',
      type: 'investment',
      description: 'Engage VC investment in Verusen'
    },
    {
      source: 'engage-vc',
      target: 'voxie',
      type: 'investment',
      description: 'Engage VC investment in Voxie'
    },
    {
      source: 'engage-vc',
      target: 'wripple',
      type: 'investment',
      description: 'Engage VC investment in Wripple'
    },
    {
      source: 'engage-vc',
      target: 'achieveit',
      type: 'investment',
      description: 'Engage VC investment in AchieveIt'
    },

    // University and incubator relationships
    {
      source: 'atlanta-tech-village',
      target: 'atlanta-ventures',
      type: 'founder_of',
      description: 'Both founded by David Cummings, creating a foundational partnership in the Atlanta startup ecosystem'
    },

    // David Cummings founder relationships
    {
      source: 'atlanta-ventures',
      target: 'the-perlant',
      type: 'founder_of',
      description: 'David Cummings co-founded The Perlant alongside Atlanta Ventures'
    },
    {
      source: 'atlanta-ventures',
      target: 'undaunted',
      type: 'founder_of',
      description: 'David Cummings co-founded Undaunted alongside Atlanta Ventures'
    },

    // Circadian Fund I Investments
    {
      source: 'circadian-ventures',
      target: 'voxie',
      type: 'investment',
      description: 'Circadian Ventures Fund I investment in Voxie'
    },
    {
      source: 'circadian-ventures',
      target: 'cloverly',
      type: 'investment',
      description: 'Circadian Ventures Fund I investment in Cloverly'
    },
    {
      source: 'circadian-ventures',
      target: 'coginiti',
      type: 'investment',
      description: 'Circadian Ventures Fund I investment in Coginiti'
    },
    {
      source: 'circadian-ventures',
      target: 'ketteq',
      type: 'investment',
      description: 'Circadian Ventures Fund I investment in ketteQ'
    },

    // Circadian Syndicate Investments
    {
      source: 'circadian-ventures',
      target: 'hermeus',
      type: 'investment',
      description: 'Circadian Ventures syndicate investment in Hermeus'
    },
    {
      source: 'circadian-ventures',
      target: 'flourish-software',
      type: 'investment',
      description: 'Circadian Ventures syndicate investment in Flourish Software'
    },
    {
      source: 'circadian-ventures',
      target: 'brrr',
      type: 'investment',
      description: 'Circadian Ventures syndicate investment in brrr°'
    },
    {
      source: 'circadian-ventures',
      target: 'demand-driven-tech',
      type: 'investment',
      description: 'Circadian Ventures syndicate investment in Demand Driven Technologies'
    },
    {
      source: 'circadian-ventures',
      target: 'apptega',
      type: 'investment',
      description: 'Circadian Ventures syndicate investment in Apptega'
    },
    {
      source: 'circadian-ventures',
      target: 'roadsync',
      type: 'investment',
      description: 'Circadian Ventures syndicate investment in RoadSync'
    },
    {
      source: 'circadian-ventures',
      target: 'softwear-automation',
      type: 'investment',
      description: 'Circadian Ventures syndicate investment in SoftWear Automation'
    },

    // GRA relationships with universities
    {
      source: 'gra',
      target: 'georgia-tech',
      type: 'collaboration',
      description: 'Georgia Research Alliance partnership with Georgia Tech for research commercialization'
    },
    {
      source: 'gra',
      target: 'emory-university',
      type: 'collaboration',
      description: 'Georgia Research Alliance partnership with Emory University for research commercialization'
    },

    // University and Spinout Connections
    {
      source: 'georgia-tech',
      target: 'softwear-automation',
      type: 'spinout',
      description: 'SoftWear Automation is a well-known spinout from Georgia Tech research'
    },
    {
      source: 'georgia-tech',
      target: 'atdc',
      type: 'affiliation',
      description: 'ATDC is Georgia Tech\'s technology incubator and startup accelerator'
    },

    // Tech Square Collaborations
    {
      source: 'georgia-tech',
      target: 'delta-hangar',
      type: 'collaboration',
      description: 'Delta Innovation Center located in Tech Square for collaboration with Georgia Tech'
    },
    {
      source: 'georgia-tech',
      target: 'home-depot-innovation',
      type: 'collaboration',
      description: 'Home Depot Innovation Center located in Tech Square for collaboration with Georgia Tech'
    },

    // ATDC relationships
    {
      source: 'atdc',
      target: 'atlanta-tech-village',
      type: 'collaboration',
      description: 'ATDC collaboration with Atlanta Tech Village for technology development'
    },

    // Cox Enterprises relationships
    {
      source: 'cox-enterprises',
      target: 'technology-association-georgia',
      type: 'collaboration',
      description: 'Cox Enterprises membership and collaboration with Technology Association of Georgia'
    },

    // Engage VC Corporate Partnerships
    {
      source: 'engage-vc',
      target: 'cox-enterprises',
      type: 'partnership',
      description: 'Cox Enterprises is a founding partner of Engage VC, providing corporate access and innovation collaboration'
    },
    {
      source: 'engage-vc',
      target: 'delta-hangar',
      type: 'partnership',
      description: 'Delta Air Lines is a founding partner of Engage VC, providing corporate access and innovation collaboration'
    },
    {
      source: 'engage-vc',
      target: 'georgia-tech',
      type: 'partnership',
      description: 'Georgia Tech is a founding partner of Engage VC, providing research collaboration and talent pipeline'
    },
    {
      source: 'engage-vc',
      target: 'home-depot-innovation',
      type: 'partnership',
      description: 'The Home Depot is a founding partner of Engage VC, providing corporate access and innovation collaboration'
    },
    {
      source: 'engage-vc',
      target: 'ncr-innovation-lab',
      type: 'partnership',
      description: 'NCR is a founding partner of Engage VC, providing corporate access and innovation collaboration'
    },

    // Accelerator and Corporate Partnerships
    {
      source: 'techstars-atlanta',
      target: 'cox-enterprises',
      type: 'partnership',
      description: 'Techstars Atlanta is powered by Cox Enterprises, providing corporate access and resources'
    },

    // Steelsky Ventures investments
    {
      source: 'steelsky-ventures',
      target: 'motivo-health',
      type: 'investment',
      description: 'Steelsky Ventures investment in Motivo Health'
    },

    // Collab Capital Fund 1 investments
    {
      source: 'collab-capital',
      target: 'boxedup',
      type: 'investment',
      description: 'Collab Capital investment in BoxedUp'
    },
    {
      source: 'collab-capital',
      target: 'filmhedge',
      type: 'investment',
      description: 'Collab Capital investment in FilmHedge'
    },
    {
      source: 'collab-capital',
      target: 'goodr',
      type: 'investment',
      description: 'Collab Capital investment in Goodr'
    },
    {
      source: 'collab-capital',
      target: 'hairbrella',
      type: 'investment',
      description: 'Collab Capital investment in Hairbrella'
    },
    {
      source: 'collab-capital',
      target: 'healthy-hip-hop',
      type: 'investment',
      description: 'Collab Capital investment in Healthy Hip Hop'
    },
    {
      source: 'collab-capital',
      target: 'imin2',
      type: 'investment',
      description: 'Collab Capital investment in I\'m In 2'
    },
    {
      source: 'collab-capital',
      target: 'lainelondon',
      type: 'investment',
      description: 'Collab Capital investment in Laine London'
    },
    {
      source: 'collab-capital',
      target: 'nectar',
      type: 'investment',
      description: 'Collab Capital investment in Nectar'
    },
    {
      source: 'collab-capital',
      target: 'photoid',
      type: 'investment',
      description: 'Collab Capital investment in PhotoID'
    },
    {
      source: 'collab-capital',
      target: 'kairos',
      type: 'investment',
      description: 'Collab Capital Fund 2 investment in Kairos'
    },

    // Portfolio company collaborations
  ]
};

// Export the main ecosystem data
export default atlantaTechEcosystem;

// Link type mapping for consistent categorization
export const linkTypeMap = {
    // Financial relationships
    investment: 'Financial',
    funding: 'Financial',
    
    // Collaborative relationships
    partnership: 'Collaboration',
    research: 'Collaboration',
    collaboration: 'Collaboration',
    
    // Support relationships
    support: 'Support',
    service: 'Support',
    education_program: 'Support',
    
    // Organizational relationships
    affiliation: 'Organizational',
    spinout: 'Organizational',
    founder_of: 'Organizational',
    
    // Infrastructure relationships
    tenant: 'Infrastructure',
    infrastructure: 'Infrastructure',
    
    // Pilot/Testing relationships
    pilot: 'Pilot & Testing'
};

// Color scheme for different link types
export const linkColors = {
    // High-importance links with vibrant, high-contrast colors
    'Financial': '#1e90ff',       // Dodger Blue: Bright and clear on both themes
    'Organizational': '#ff4757',  // A strong Red/Coral: High impact, works everywhere

    // Secondary links with distinct colors
    'Collaboration': '#00C2C7',   // A vibrant Teal: Excellent contrast and distinct from blue
    'Pilot & Testing': '#f9a825', // A strong Gold/Mustard: Avoids the invisibility of pure yellow

    // Contextual links with a still-visible but less prominent color
    'Support': '#a55eea',         // A mid-tone Purple/Amethyst
    'Infrastructure': '#778ca3'   // A desaturated Slate Blue that acts like a neutral color
};
