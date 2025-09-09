#!/usr/bin/env python3
"""
Clean Duplicate Organizations in Atlanta Biotech Network Data

This script identifies and removes duplicate organizations from the network data.
It keeps the most complete entry when duplicates are found.
"""

import json
from pathlib import Path

def clean_duplicate_organizations():
    """Clean duplicate organizations from the network data."""
    print("Cleaning Duplicate Organizations")
    print("=" * 40)
    
    # Load the data
    data_file = Path("data/biotech_network_data.json")
    with open(data_file, 'r') as f:
        data = json.load(f)
    
    print(f"Original nodes: {len(data['nodes'])}")
    
    # Find duplicates by ID
    seen_ids = {}
    duplicate_ids = []
    
    for i, node in enumerate(data['nodes']):
        node_id = node['id']
        if node_id in seen_ids:
            duplicate_ids.append((seen_ids[node_id], i, node_id))
        else:
            seen_ids[node_id] = i
    
    if duplicate_ids:
        print(f"Found {len(duplicate_ids)} duplicate organizations:")
        
        # Remove duplicates, keeping the most complete entry
        indices_to_remove = []
        
        for first_idx, dup_idx, node_id in duplicate_ids:
            first_node = data['nodes'][first_idx]
            dup_node = data['nodes'][dup_idx]
            
            print(f"  - {node_id}: {first_node['name']}")
            print(f"    Entry 1 (index {first_idx}): size={first_node.get('size', 'N/A')}, desc_length={len(first_node.get('description', ''))}")
            print(f"    Entry 2 (index {dup_idx}): size={dup_node.get('size', 'N/A')}, desc_length={len(dup_node.get('description', ''))}")
            
            # Keep the entry with longer description or larger size
            if len(dup_node.get('description', '')) > len(first_node.get('description', '')):
                print(f"    -> Keeping entry 2 (longer description)")
                indices_to_remove.append(first_idx)
            elif len(dup_node.get('description', '')) == len(first_node.get('description', '')):
                if dup_node.get('size', 0) > first_node.get('size', 0):
                    print(f"    -> Keeping entry 2 (larger size)")
                    indices_to_remove.append(first_idx)
                else:
                    print(f"    -> Keeping entry 1 (larger size)")
                    indices_to_remove.append(dup_idx)
            else:
                print(f"    -> Keeping entry 1 (longer description)")
                indices_to_remove.append(dup_idx)
            print()
        
        # Remove duplicates (in reverse order to maintain indices)
        for idx in sorted(indices_to_remove, reverse=True):
            removed_node = data['nodes'].pop(idx)
            print(f"Removed duplicate: {removed_node['id']} - {removed_node['name']}")
        
        print(f"Cleaned nodes: {len(data['nodes'])}")
        print(f"Duplicates removed: {len(indices_to_remove)}")
        
        # Save cleaned data
        with open(data_file, 'w') as f:
            json.dump(data, f, indent=2)
        
        print(f"Cleaned data saved to: {data_file}")
        
    else:
        print("No duplicate organizations found!")
    
    # Also check for duplicate names (case-insensitive)
    print("\nChecking for duplicate names (case-insensitive)...")
    name_counts = {}
    for node in data['nodes']:
        name_lower = node['name'].lower()
        if name_lower not in name_counts:
            name_counts[name_lower] = []
        name_counts[name_lower].append(node)
    
    duplicate_names = {name: nodes for name, nodes in name_counts.items() if len(nodes) > 1}
    
    if duplicate_names:
        print(f"Found {len(duplicate_names)} duplicate names:")
        for name, nodes in duplicate_names.items():
            print(f"  - '{name}' appears {len(nodes)} times:")
            for node in nodes:
                print(f"    ID: {node['id']}, Name: {node['name']}")
    else:
        print("No duplicate names found!")

if __name__ == "__main__":
    clean_duplicate_organizations()
