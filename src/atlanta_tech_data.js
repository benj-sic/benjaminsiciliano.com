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
  'development': 'Development',
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
  'Accelerator': '#E91E63', // Vibrant Magenta/Pink
  'Service Provider': '#545454', // Gray
  'Government': '#5A2D81', // Purple
  'Trade Organization': '#5A2D81', // Purple
  'Development': '#5A2D81', // Purple
  'Facilities': '#2E7D32', // Deep Forest Green
  'Community Builders': '#E67300' // Orange
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
        { name: 'CEO', title: 'Chief Executive Officer' }
      ],
      recentNews: 'Trusted by customers globally to bring agility to the world\'s most complex supply chains. Provides actionable recommendations and improved visibility for supply chain performance.'
    },


















    // Atlanta Ventures Portfolio Companies
    {
      id: 'adpipe',
      name: 'AdPipe',
      type: 'company',
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
      type: 'company',
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
      type: 'company',
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
      type: 'company',
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
      type: 'company',
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
      type: 'company',
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
      type: 'company',
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
      type: 'company',
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
      type: 'company',
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
      type: 'company',
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
      type: 'company',
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
      type: 'company',
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
      type: 'company',
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
      id: 'riderr',
      name: 'Love To Ride',
      type: 'company',
      size: 14,
      description: 'Rideshare and transportation platform for local communities.',
      website: 'https://partners.lovetoride.net/',
      keyPersonnel: [
        { name: 'Thomas Stokell', title: 'CEO', linkedin: 'https://www.linkedin.com/in/thomasstokell/' }
      ],
      recentNews: 'Local rideshare and transportation platform.'
    },







    {
      id: 'smartcommerce',
      name: 'SmartCommerce',
      type: 'company',
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
      type: 'company',
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
      type: 'company',
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
        { name: 'CEO', title: 'Chief Executive Officer' }
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
        { name: 'CEO', title: 'Chief Executive Officer' }
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
        { name: 'CEO', title: 'Chief Executive Officer' }
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
        { name: 'CEO', title: 'Chief Executive Officer' }
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
        { name: 'CEO', title: 'Chief Executive Officer' }
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
        { name: 'CEO', title: 'Chief Executive Officer' }
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
        { name: 'CEO', title: 'Chief Executive Officer' }
      ],
      recentNews: 'Network automation and orchestration platform for enterprises.'
    },

    {
      id: 'ask-kim',
      name: 'Ask Kim',
      type: 'company',
      size: 15,
      description: 'AI-powered platform for business intelligence and insights.',
      website: 'https://ask.kim/',
      keyPersonnel: [
        { name: 'CEO', title: 'Chief Executive Officer' }
      ],
      recentNews: 'AI-powered business intelligence and insights platform.'
    },

    {
      id: 'ledgible',
      name: 'Ledgible',
      type: 'company',
      size: 16,
      description: 'Digital asset accounting and tax compliance platform.',
      website: 'https://ledgible.io/',
      keyPersonnel: [
        { name: 'CEO', title: 'Chief Executive Officer' }
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
        { name: 'CEO', title: 'Chief Executive Officer' }
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
        { name: 'CEO', title: 'Chief Executive Officer' }
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
        { name: 'CEO', title: 'Chief Executive Officer' }
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
        { name: 'CEO', title: 'Chief Executive Officer' }
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
        { name: 'CEO', title: 'Chief Executive Officer' }
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
        { name: 'CEO', title: 'Chief Executive Officer' }
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
        { name: 'CEO', title: 'Chief Executive Officer' }
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
        { name: 'CEO', title: 'Chief Executive Officer' }
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
        { name: 'CEO', title: 'Chief Executive Officer' }
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
        { name: 'CEO', title: 'Chief Executive Officer' }
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
        { name: 'CEO', title: 'Chief Executive Officer' }
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
      name: 'Technology Association of Georgia',
      type: 'trade',
      size: 20,
      description: 'Georgia\'s largest technology association with over 30,000 members. Connects technology leaders, peers and decision makers through 200+ events annually, 26 professional societies, and exclusive engagements across Georgia\'s dynamic technology ecosystem.',
      website: 'https://www.tagonline.org/',
      keyPersonnel: [
        { name: 'Larry K. Williams', title: 'President & Chief Executive Officer', linkedin: 'https://www.linkedin.com/in/larrykwilliams/' }
      ],
      recentNews: 'Hosts major events including Fintech South, Georgia Technology Summit, and TAG Technology Awards. Features 26 professional societies covering sectors from fintech and cybersecurity to AI and digital health.'
    },

    {
      id: 'georgia-tech',
      name: 'Georgia Institute of Technology',
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
      name: 'Russell Innovation Center for Entrepreneurs',
      type: 'incubator',
      size: 19,
      description: 'Atlanta\'s home for Black entrepreneurs and the largest center in the world dedicated to growing, scaling, and developing Black entrepreneurs. Serves as an economic mobility engine driving entrepreneurs and small business owners to innovate, grow, create jobs and build wealth.',
      website: 'https://russellcenter.org/',
      keyPersonnel: [
        { name: 'Jay Bailey', title: 'President & Chief Executive Officer', linkedin: 'https://www.linkedin.com/in/jaybailey/' }
      ],
      recentNews: 'Mission to multiply thriving Black businesses and produce new economic value. By 2034, aims to generate and accelerate 1,000 Black-owned businesses, contribute to 3,000 new jobs, and produce $2 billion in new economic value.'
    },


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
    {
      source: 'mosley-ventures',
      target: 'admiral',
      type: 'investment',
      description: 'Mosley Ventures investment in Admiral'
    },
    {
      source: 'mosley-ventures',
      target: 'droplit',
      type: 'investment',
      description: 'Mosley Ventures investment in Droplit.io'
    },
    {
      source: 'mosley-ventures',
      target: 'mixbook',
      type: 'investment',
      description: 'Mosley Ventures investment in Mixbook'
    },




    {
      source: 'mosley-ventures',
      target: 'strata-decision',
      type: 'investment',
      description: 'Mosley Ventures investment in Strata Decision Technology'
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
      target: 'riderr',
      type: 'investment',
      description: 'Valor Ventures investment in Riderr'
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
      target: 'ask-kim',
      type: 'investment',
      description: 'Engage VC investment in Ask Kim'
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
      type: 'collaboration',
      description: 'Atlanta Tech Village and Atlanta Ventures collaborate on startup ecosystem development'
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
