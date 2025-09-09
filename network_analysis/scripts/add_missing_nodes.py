#!/usr/bin/env python3
"""
Add Missing Nodes

This script adds nodes that are referenced in links but missing from the nodes array.
"""

import json

def add_missing_nodes(input_file, output_file):
    """Add missing nodes that are referenced in links."""
    print("Adding missing nodes...")
    
    with open(input_file, 'r') as f:
        data = json.load(f)
    
    # Find all node IDs referenced in links
    all_link_nodes = set()
    for link in data['links']:
        all_link_nodes.add(link['source'])
        all_link_nodes.add(link['target'])
    
    # Find all node IDs in the nodes array
    existing_node_ids = {node['id'] for node in data['nodes']}
    
    # Find missing nodes
    missing_node_ids = all_link_nodes - existing_node_ids
    
    print(f"Found {len(missing_node_ids)} missing nodes: {missing_node_ids}")
    
    # Add missing nodes with basic information
    for node_id in missing_node_ids:
        # Determine node type and other properties based on the node ID
        node_type = determine_node_type(node_id)
        node_name = format_node_name(node_id)
        
        new_node = {
            'id': node_id,
            'name': node_name,
            'type': node_type,
            'size': 5,  # Default small size for missing nodes
            'description': f'{node_name} - Referenced in network connections but not defined in nodes array.',
            'website': ''  # No website info available
        }
        
        data['nodes'].append(new_node)
        print(f"Added node: {node_id} ({node_type})")
    
    # Save updated data
    with open(output_file, 'w') as f:
        json.dump(data, f, indent=2)
    
    print(f"\nNode addition complete!")
    print(f"Original nodes: {len(data['nodes']) - len(missing_node_ids)}")
    print(f"Updated nodes: {len(data['nodes'])}")
    print(f"Nodes added: {len(missing_node_ids)}")
    
    return data

def determine_node_type(node_id):
    """Determine the node type based on the node ID."""
    
    # Government agencies
    if 'department_of_veterans_affairs' in node_id:
        return 'government'
    
    # Technology companies (based on naming patterns)
    if any(tech_word in node_id for tech_word in ['technologies', 'tech', 'topodx']):
        return 'startup'
    
    # Default to startup for unknown types
    return 'startup'

def format_node_name(node_id):
    """Format the node ID into a readable name."""
    
    # Special cases
    if node_id == 'department_of_veterans_affairs':
        return 'Department of Veterans Affairs'
    elif node_id == 'biocircuit_technologies':
        return 'BioCircuit Technologies'
    elif node_id == 'topodx':
        return 'TopoDX'
    
    # Default formatting
    return node_id.replace('_', ' ').title()

def main():
    """Add missing nodes to the network data."""
    input_file = 'data/biotech_network_data.json'
    output_file = 'data/biotech_network_data.json'
    
    print("Adding Missing Nodes to Atlanta Biotech Network Data")
    print("=" * 55)
    
    try:
        updated_data = add_missing_nodes(input_file, output_file)
        
        # Replace the original with updated data
        import shutil
        shutil.copy(output_file, input_file)
        print(f"Updated data saved to: {input_file}")
        
    except Exception as e:
        print(f"Error adding missing nodes: {e}")
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    main()
