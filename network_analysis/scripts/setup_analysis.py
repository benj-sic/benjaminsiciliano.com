#!/usr/bin/env python3
"""
Setup Script for Atlanta Biotech Network Analysis

This script sets up the analysis environment and runs the complete analysis.
"""

import subprocess
import sys
from pathlib import Path

def check_python_version():
    """Check if Python version is compatible."""
    if sys.version_info < (3, 7):
        print("Error: Python 3.7 or higher is required")
        print(f"Current version: {sys.version}")
        return False
    print(f"✓ Python version: {sys.version.split()[0]}")
    return True

def install_dependencies():
    """Install required dependencies."""
    print("Installing dependencies...")
    try:
        result = subprocess.run([sys.executable, "-m", "pip", "install", "-r", "requirements.txt"], 
                              capture_output=True, text=True)
        if result.returncode == 0:
            print("✓ Dependencies installed successfully")
            return True
        else:
            print(f"✗ Failed to install dependencies: {result.stderr}")
            return False
    except Exception as e:
        print(f"✗ Error installing dependencies: {e}")
        return False

def main():
    """Setup and run the analysis."""
    print("Atlanta Biotech Network Analysis Setup")
    print("=" * 45)
    
    # Check Python version
    if not check_python_version():
        return
    
    # Install dependencies
    if not install_dependencies():
        print("Please install dependencies manually: pip install -r requirements.txt")
        return
    
    # Run the analysis
    print("\nRunning network analysis...")
    try:
        result = subprocess.run([sys.executable, "run_analysis.py"], 
                              capture_output=True, text=True)
        print(result.stdout)
        if result.stderr:
            print("Warnings/Errors:")
            print(result.stderr)
    except Exception as e:
        print(f"Error running analysis: {e}")

if __name__ == "__main__":
    main()
