#!/usr/bin/env python3
"""
Clean Duplicate Connections

This script removes duplicate connections and keeps the most appropriate
relationship type for each connection.
"""

import json
from collections import defaultdict

def clean_duplicates(input_file, output_file):
    """Clean duplicate connections and keep the best relationship type."""
    print("Cleaning duplicate connections...")
    
    with open(input_file, 'r') as f:
        data = json.load(f)
    
    # Group links by source-target pair (undirected)
    link_groups = defaultdict(list)
    
    for link in data['links']:
        source = link['source']
        target = link['target']
        
        # Create a consistent key for undirected edges
        edge_key = tuple(sorted([source, target]))
        link_groups[edge_key].append(link)
    
    # Process each group to keep the best relationship type
    cleaned_links = []
    duplicates_removed = 0
    
    for edge_key, links in link_groups.items():
        if len(links) == 1:
            # No duplicates, keep as is
            cleaned_links.append(links[0])
        else:
            # Multiple links between same nodes - choose the best one
            best_link = choose_best_relationship(links)
            cleaned_links.append(best_link)
            duplicates_removed += len(links) - 1
            print(f"Removed {len(links) - 1} duplicate(s) for {edge_key[0]} <-> {edge_key[1]}")
            print(f"  Kept: {best_link['type']} - {best_link.get('description', 'N/A')[:60]}...")
    
    # Update the data
    data['links'] = cleaned_links
    
    # Save cleaned data
    with open(output_file, 'w') as f:
        json.dump(data, f, indent=2)
    
    print(f"\nCleaning complete!")
    print(f"Original links: {len(data['links']) + duplicates_removed}")
    print(f"Cleaned links: {len(data['links'])}")
    print(f"Duplicates removed: {duplicates_removed}")
    
    return data

def choose_best_relationship(links):
    """Choose the best relationship type from multiple links."""
    
    # Define priority order for relationship types
    type_priority = {
        'member': 1,           # Highest priority - active membership
        'affiliation': 2,      # Strong institutional connection
        'investment': 3,       # Financial relationship
        'partnership': 4,      # Business partnership
        'collaboration': 5,    # Research/operational collaboration
        'tenant': 6,           # Physical location relationship
        'incubated_at': 7,     # Past incubation relationship
        'funding': 8,          # Grant/funding relationship
        'pilot': 9,            # Pilot program
        'service': 10,         # Service provider relationship
        'spinout': 11,         # Company spinout
        'origin': 12,          # Origin relationship
        'funded_by': 13,       # Funded by relationship
        'support': 14,         # Support relationship
        'research': 15,        # Research relationship
        'research_collaboration': 16,  # Research collaboration
        'graduate': 17,        # Past relationship
        'client': 18,          # Client relationship
        'tenant': 19,          # Tenant relationship
    }
    
    # Special cases based on your guidance
    special_cases = {
        ('armor_medical', 'portal'): 'member',  # You said member is more accurate
        ('eddf', 'emory'): 'affiliation',       # Affiliation is more fundamental
        ('ethos_medical', 'portal'): 'member',  # Member is more accurate
        ('earlitec', 'gra_fund'): 'investment', # Investment is the core relationship
        ('department_of_veterans_affairs', 'oxos'): 'partnership',  # Partnership is more accurate
    }
    
    # Check for special cases first
    for link in links:
        source = link['source']
        target = link['target']
        edge_key = tuple(sorted([source, target]))
        
        if edge_key in special_cases:
            preferred_type = special_cases[edge_key]
            for link in links:
                if link['type'] == preferred_type:
                    return link
    
    # If no special case, choose by priority
    best_link = None
    best_priority = float('inf')
    
    for link in links:
        link_type = link.get('type', '')
        priority = type_priority.get(link_type, 999)  # Unknown types get low priority
        
        if priority < best_priority:
            best_priority = priority
            best_link = link
    
    return best_link

def main():
    """Clean the network data."""
    input_file = '../data/biotech_network_data.json'
    output_file = '../data/biotech_network_data_cleaned.json'
    
    print("Cleaning Atlanta Biotech Network Data")
    print("=" * 40)
    
    try:
        cleaned_data = clean_duplicates(input_file, output_file)
        
        # Also create a backup of the original
        import shutil
        shutil.copy(input_file, input_file.replace('.json', '_backup.json'))
        print(f"Original data backed up to: {input_file.replace('.json', '_backup.json')}")
        
        # Replace the original with cleaned data
        shutil.copy(output_file, input_file)
        print(f"Cleaned data saved to: {input_file}")
        
    except Exception as e:
        print(f"Error cleaning data: {e}")
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    main()
