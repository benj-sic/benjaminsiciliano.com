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
  
  console.log(lastCommitDate);
} catch (error) {
  console.error('Error getting last commit date:', error.message);
  // Fallback to current date
  const fallbackDate = new Date().toLocaleDateString('en-US', { 
    month: 'long', 
    year: 'numeric' 
  });
  console.log(fallbackDate);
} 