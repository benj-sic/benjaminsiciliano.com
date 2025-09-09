#!/usr/bin/env python3
"""
Complete Atlanta Biotech Network Analysis Runner

This script runs the complete analysis pipeline:
1. Extracts data from your JavaScript file
2. Runs the network analysis
3. Generates all visualizations and outputs

Usage: python run_analysis.py
"""

import subprocess
import sys
from pathlib import Path

def run_command(command, description):
    """Run a command and handle errors."""
    print(f"\n{description}...")
    try:
        result = subprocess.run(command, shell=True, capture_output=True, text=True)
        if result.returncode == 0:
            print(f"✓ {description} completed successfully")
            if result.stdout:
                print(result.stdout)
        else:
            print(f"✗ {description} failed")
            print(f"Error: {result.stderr}")
            return False
    except Exception as e:
        print(f"✗ {description} failed with exception: {e}")
        return False
    return True

def main():
    """Run the complete analysis pipeline."""
    print("Atlanta Biotech Network Analysis Pipeline")
    print("=" * 50)
    
    # Check if we have the JavaScript data file
    js_file = Path('src/atlanta_biotech_data.js')
    if not js_file.exists():
        print("Error: JavaScript data file not found at src/atlanta_biotech_data.js")
        print("Please make sure you're running this from the project root directory.")
        return
    
    # Step 1: Try to extract real data
    print("\nStep 1: Extracting real network data...")
    success = run_command("python extract_real_data.py", "Real data extraction")
    
    if not success:
        print("\nReal data extraction failed. Using minimal test data...")
        run_command("python create_minimal_data.py", "Minimal data creation")
    
    # Step 2: Run the network analysis
    print("\nStep 2: Running network analysis...")
    success = run_command("python analyze_network.py", "Network analysis")
    
    if not success:
        print("Network analysis failed. Please check the error messages above.")
        return
    
    # Step 3: Show results
    print("\nStep 3: Analysis Results")
    print("=" * 30)
    
    # Check what files were generated
    output_files = [
        'biotech_network_metrics.csv',
        'top_10_hubs.svg',
        'top_10_bridges.svg', 
        'degree_vs_betweenness.svg',
        'community_network.svg',
        'network_dashboard.svg'
    ]
    
    print("\nGenerated files:")
    for file in output_files:
        if Path(file).exists():
            size = Path(file).stat().st_size
            print(f"  ✓ {file} ({size:,} bytes)")
        else:
            print(f"  ✗ {file} (not found)")
    
    print(f"\nAnalysis complete! You can now:")
    print(f"  • Open the SVG files in Illustrator or any vector graphics editor")
    print(f"  • Import the CSV file into Excel or any spreadsheet application")
    print(f"  • Use the data for further analysis or presentations")
    
    print(f"\nTo run the analysis again with updated data:")
    print(f"  python run_analysis.py")

if __name__ == "__main__":
    main()
