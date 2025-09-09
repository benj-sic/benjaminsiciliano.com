#!/usr/bin/env python3
"""
Atlanta Biotech Network Analysis - Main Entry Point

This is the main script to run the complete Atlanta biotech network analysis.
It extracts data from your JavaScript file and generates all visualizations and metrics.

Usage: python analyze_biotech_network.py
"""

import sys
import subprocess
from pathlib import Path

def main():
    """Run the complete biotech network analysis."""
    print("Atlanta Biotech Network Analysis")
    print("=" * 40)
    
    # Change to the network_analysis directory
    analysis_dir = Path(__file__).parent / "network_analysis"
    
    if not analysis_dir.exists():
        print("Error: network_analysis directory not found")
        print("Please run this script from the project root directory")
        return
    
    # Change to the analysis directory
    import os
    os.chdir(analysis_dir)
    
    # Run the main analysis script
    try:
        result = subprocess.run([sys.executable, "scripts/analyze_network.py"], 
                              capture_output=True, text=True)
        print(result.stdout)
        if result.stderr:
            print("Warnings/Errors:")
            print(result.stderr)
    except Exception as e:
        print(f"Error running analysis: {e}")

if __name__ == "__main__":
    main()
