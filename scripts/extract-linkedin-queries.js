// scripts/extract-linkedin-queries.js
const fs = require('fs');
const path = require('path');
const { atlantaBiotechEcosystem } = require('../src/atlanta_biotech_data');

const outputPath = path.join(__dirname, 'linkedin_search_export.csv');

// CSV header
const rows = [
  [
    'Name',
    'Organization',
    'Suggested Search URL',
    'Verified LinkedIn',
    'Verified',
    'Notes'
  ]
];

// Collect and format key personnel
atlantaBiotechEcosystem.nodes.forEach((node) => {
  const org = node.name;
  const personnel = node.keyPersonnel || [];

  personnel.forEach((person) => {
    if (typeof person === 'string') {
      const query = encodeURIComponent(`site:linkedin.com/in "${person}" "${org}"`);
      const url = `https://www.google.com/search?q=${query}`;
      rows.push([person, org, url, '', 'FALSE', '']);
    } else if (person && typeof person === 'object' && person.name) {
      const query = encodeURIComponent(`site:linkedin.com/in "${person.name}" "${org}"`);
      const url = `https://www.google.com/search?q=${query}`;
      rows.push([person.name, org, url, person.linkedin || '', person.linkedin ? 'TRUE' : 'FALSE', '']);
    }
  });
});

// Write to CSV
const csvContent = rows.map(row => row.map(val => `"${val}"`).join(',')).join('\n');
fs.writeFileSync(outputPath, csvContent);

console.log(`✅ Exported LinkedIn search spreadsheet to ${outputPath}`);
