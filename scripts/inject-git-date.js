#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

try {
  // Get the last commit date in a readable format
  const lastCommitDate = execSync('git log -1 --format="%cd" --date=format:"%B %Y"', { 
    encoding: 'utf8',
    cwd: path.resolve(__dirname, '..') // Go to project root
  }).trim();
  
  // Create a simple JSON file with the date
  const dateData = {
    lastCommitDate: lastCommitDate
  };
  
  // Write to public directory so it can be fetched by the React app
  const outputPath = path.resolve(__dirname, '../public/last-commit-date.json');
  fs.writeFileSync(outputPath, JSON.stringify(dateData, null, 2));
  
  console.log(`Last commit date (${lastCommitDate}) written to public/last-commit-date.json`);
} catch (error) {
  console.error('Error getting last commit date:', error.message);
  // Fallback to current date
  const fallbackDate = new Date().toLocaleDateString('en-US', { 
    month: 'long', 
    year: 'numeric' 
  });
  
  const dateData = {
    lastCommitDate: fallbackDate
  };
  
  const outputPath = path.resolve(__dirname, '../public/last-commit-date.json');
  fs.writeFileSync(outputPath, JSON.stringify(dateData, null, 2));
  
  console.log(`Fallback date (${fallbackDate}) written to public/last-commit-date.json`);
} 