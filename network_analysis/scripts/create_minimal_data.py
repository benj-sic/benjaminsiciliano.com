#!/usr/bin/env python3
"""
Create Minimal Network Data

This script creates a minimal working dataset for testing the network analysis.
"""

import json

def create_minimal_data():
    """Create minimal network data for testing."""
    print("Creating minimal network data...")
    
    # Create a minimal but realistic network based on the actual data structure
    minimal_data = {
        "nodes": [
            {
                "id": "emory",
                "name": "Emory University",
                "type": "university",
                "size": 25,
                "description": "Leading private research university with over $1B in sponsored research funding."
            },
            {
                "id": "gatech",
                "name": "Georgia Tech",
                "type": "university", 
                "size": 23,
                "description": "Top public engineering and research university. Home to the ATDC incubator."
            },
            {
                "id": "morehouse",
                "name": "MSM",
                "type": "university",
                "size": 15,
                "description": "Morehouse School of Medicine - historically Black medical school."
            },
            {
                "id": "uga",
                "name": "UGA",
                "type": "university",
                "size": 18,
                "description": "Major public research university with strengths in veterinary medicine."
            },
            {
                "id": "gsu",
                "name": "GSU",
                "type": "university",
                "size": 16,
                "description": "Research university with growing programs in infectious disease."
            },
            {
                "id": "biolocity",
                "name": "Biolocity",
                "type": "accelerator",
                "size": 20,
                "description": "Translational medtech accelerator supporting Emory and Georgia Tech."
            },
            {
                "id": "atdc",
                "name": "ATDC",
                "type": "incubator",
                "size": 18,
                "description": "Georgia Tech's startup incubator and accelerator."
            },
            {
                "id": "gra",
                "name": "GRA",
                "type": "funding",
                "size": 22,
                "description": "Georgia Research Alliance - statewide innovation funding organization."
            },
            {
                "id": "emory_biotech_consulting_club",
                "name": "EBCC",
                "type": "community",
                "size": 12,
                "description": "Emory Biotech Consulting Club - student organization."
            },
            {
                "id": "altesa",
                "name": "Altesa",
                "type": "startup",
                "size": 8,
                "description": "Antiviral therapeutics startup spun out from Emory."
            },
            {
                "id": "neurOp",
                "name": "NeurOp",
                "type": "startup",
                "size": 10,
                "description": "CNS drug development company."
            },
            {
                "id": "micron",
                "name": "Micron",
                "type": "startup",
                "size": 6,
                "description": "Medtech startup from Georgia Tech."
            },
            {
                "id": "oxos",
                "name": "OXOS",
                "type": "startup",
                "size": 7,
                "description": "Handheld X-ray device startup."
            },
            {
                "id": "cambium_oncology",
                "name": "Cambium Oncology",
                "type": "startup",
                "size": 9,
                "description": "Immuno-oncology therapeutics company."
            },
            {
                "id": "switchboard_md",
                "name": "Switchboard MD",
                "type": "startup",
                "size": 5,
                "description": "AI-based triage platform."
            }
        ],
        "links": [
            # Core academic collaborations
            {"source": "emory", "target": "gatech", "type": "collaboration", "description": "Joint Coulter Department of Biomedical Engineering"},
            {"source": "emory", "target": "gsu", "type": "collaboration", "description": "NIH Antivirals Center (AC/DC)"},
            {"source": "emory", "target": "morehouse", "type": "collaboration", "description": "Georgia CTSA Alliance"},
            {"source": "gatech", "target": "morehouse", "type": "collaboration", "description": "Georgia CTSA Alliance"},
            {"source": "gatech", "target": "uga", "type": "collaboration", "description": "GRA partnership"},
            {"source": "gsu", "target": "morehouse", "type": "collaboration", "description": "Georgia CTSA Alliance"},
            
            # University to accelerator connections
            {"source": "emory", "target": "biolocity", "type": "affiliation", "description": "Emory-affiliated accelerator"},
            {"source": "gatech", "target": "atdc", "type": "affiliation", "description": "Georgia Tech incubator"},
            {"source": "gatech", "target": "biolocity", "type": "affiliation", "description": "Georgia Tech projects in Biolocity"},
            
            # Funding connections
            {"source": "gra", "target": "emory", "type": "funding", "description": "GRA supports Emory research"},
            {"source": "gra", "target": "gatech", "type": "funding", "description": "GRA supports Georgia Tech research"},
            {"source": "gra", "target": "uga", "type": "funding", "description": "GRA supports UGA research"},
            {"source": "gra", "target": "morehouse", "type": "funding", "description": "GRA supports Morehouse research"},
            {"source": "gra", "target": "gsu", "type": "funding", "description": "GRA supports GSU research"},
            
            # Startup connections
            {"source": "emory", "target": "altesa", "type": "spinout", "description": "Emory spinout"},
            {"source": "emory", "target": "neurOp", "type": "spinout", "description": "Emory spinout"},
            {"source": "gatech", "target": "micron", "type": "spinout", "description": "Georgia Tech spinout"},
            {"source": "gatech", "target": "oxos", "type": "spinout", "description": "Georgia Tech spinout"},
            {"source": "emory", "target": "cambium_oncology", "type": "spinout", "description": "Emory spinout"},
            
            # Accelerator connections
            {"source": "biolocity", "target": "altesa", "type": "support", "description": "Biolocity funding"},
            {"source": "biolocity", "target": "neurOp", "type": "support", "description": "Biolocity funding"},
            {"source": "biolocity", "target": "cambium_oncology", "type": "support", "description": "Biolocity funding"},
            {"source": "atdc", "target": "micron", "type": "support", "description": "ATDC incubation"},
            {"source": "atdc", "target": "oxos", "type": "support", "description": "ATDC incubation"},
            
            # Community connections
            {"source": "emory_biotech_consulting_club", "target": "switchboard_md", "type": "service", "description": "EBCC consulting client"},
            {"source": "emory_biotech_consulting_club", "target": "cambium_oncology", "type": "service", "description": "EBCC consulting client"},
            
            # Cross-connections
            {"source": "altesa", "target": "neurOp", "type": "collaboration", "description": "Both Emory spinouts"},
            {"source": "micron", "target": "oxos", "type": "collaboration", "description": "Both Georgia Tech spinouts"},
            {"source": "biolocity", "target": "atdc", "type": "collaboration", "description": "Accelerator partnership"},
            
            # Additional connections for network density
            {"source": "emory", "target": "emory_biotech_consulting_club", "type": "affiliation", "description": "Student organization"},
            {"source": "gatech", "target": "emory_biotech_consulting_club", "type": "collaboration", "description": "Cross-university collaboration"},
            {"source": "altesa", "target": "switchboard_md", "type": "collaboration", "description": "Startup ecosystem connection"},
            {"source": "neurOp", "target": "cambium_oncology", "type": "collaboration", "description": "Therapeutics collaboration"},
            {"source": "micron", "target": "cambium_oncology", "type": "collaboration", "description": "Medtech collaboration"},
            {"source": "oxos", "target": "altesa", "type": "collaboration", "description": "Startup ecosystem connection"},
            {"source": "gra", "target": "biolocity", "type": "funding", "description": "GRA supports accelerator"},
            {"source": "gra", "target": "atdc", "type": "funding", "description": "GRA supports incubator"},
            {"source": "emory", "target": "atdc", "type": "collaboration", "description": "Cross-university collaboration"},
            {"source": "gatech", "target": "biolocity", "type": "collaboration", "description": "Cross-accelerator collaboration"}
        ],
        "nodeColors": {
            "university": "#FF6B6B",
            "accelerator": "#4ECDC4", 
            "incubator": "#45B7D1",
            "funding": "#96CEB4",
            "community": "#FFEAA7",
            "startup": "#DDA0DD"
        }
    }
    
    return minimal_data

def main():
    """Create minimal data and save to JSON."""
    json_file = 'biotech_network_data.json'
    
    print("Creating Minimal Atlanta Biotech Network Data")
    print("=" * 50)
    
    try:
        data = create_minimal_data()
        
        # Save to JSON file
        with open(json_file, 'w', encoding='utf-8') as f:
            json.dump(data, f, indent=2, ensure_ascii=False)
        
        print(f"Minimal data created!")
        print(f"Nodes: {len(data['nodes'])}")
        print(f"Links: {len(data['links'])}")
        print(f"Node colors: {len(data['nodeColors'])}")
        print(f"Data saved to: {json_file}")
        
        # Show sample data
        print(f"\nSample node: {data['nodes'][0]}")
        print(f"Sample link: {data['links'][0]}")
        print(f"Sample color: {list(data['nodeColors'].items())[0]}")
        
    except Exception as e:
        print(f"Error creating minimal data: {e}")
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    main()
