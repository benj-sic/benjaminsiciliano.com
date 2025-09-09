#!/usr/bin/env python3
"""
Simple Node Extractor for Atlanta Biotech Network

This script uses a simple regex-based approach to extract just the essential
node information from the JavaScript file.
"""

import re
import json
from pathlib import Path

def extract_simple_nodes(js_file_path):
    """Extract nodes using simple regex patterns."""
    print("Extracting nodes with simple approach...")
    
    with open(js_file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Find all node objects using regex
    # Look for the pattern: { id: "something", name: "something", type: "something", ... }
    node_pattern = r'\{\s*id:\s*"([^"]+)",\s*name:\s*"([^"]+)",\s*type:\s*"([^"]+)"[^}]*size:\s*(\d+)[^}]*description:\s*"([^"]*(?:\\.[^"]*)*)"[^}]*website:\s*"([^"]+)"[^}]*\}'
    
    node_matches = re.findall(node_pattern, content, re.DOTALL)
    
    nodes = []
    for match in node_matches:
        node_obj = {
            'id': match[0],
            'name': match[1],
            'type': match[2],
            'size': int(match[3]),
            'description': match[4].replace('\\"', '"').replace('\\n', ' ').replace('\\', ''),
            'website': match[5]
        }
        nodes.append(node_obj)
    
    print(f"Extracted {len(nodes)} nodes")
    return nodes

def extract_simple_links(js_file_path):
    """Extract links using simple regex patterns."""
    print("Extracting links with simple approach...")
    
    with open(js_file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Find all link objects using regex
    # Look for the pattern: { source: "something", target: "something", type: "something", ... }
    link_pattern = r'\{\s*source:\s*"([^"]+)",\s*target:\s*"([^"]+)"[^}]*type:\s*"([^"]+)"[^}]*description:\s*"([^"]*(?:\\.[^"]*)*)"[^}]*\}'
    
    link_matches = re.findall(link_pattern, content, re.DOTALL)
    
    links = []
    for match in link_matches:
        link_obj = {
            'source': match[0],
            'target': match[1],
            'type': match[2],
            'description': match[3].replace('\\"', '"').replace('\\n', ' ').replace('\\', '')
        }
        links.append(link_obj)
    
    print(f"Extracted {len(links)} links")
    return links

def extract_simple_colors(js_file_path):
    """Extract node colors using simple regex patterns."""
    print("Extracting node colors with simple approach...")
    
    with open(js_file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Find the nodeColors object
    colors_pattern = r'nodeColors:\s*\{([^}]+)\}'
    colors_match = re.search(colors_pattern, content, re.DOTALL)
    
    if not colors_match:
        print("Warning: No nodeColors found")
        return {}
    
    colors_content = colors_match.group(1)
    
    # Extract color assignments
    color_pattern = r'"([^"]+)":\s*"([^"]+)"'
    color_matches = re.findall(color_pattern, colors_content)
    
    node_colors = {}
    for key, value in color_matches:
        node_colors[key] = value
    
    print(f"Extracted {len(node_colors)} node colors")
    return node_colors

def main():
    """Extract simple network data and save to JSON."""
    js_file = '../src/atlanta_biotech_data.js'
    json_file = '../data/biotech_network_data.json'
    
    print("Simple Atlanta Biotech Network Data Extractor")
    print("=" * 50)
    
    try:
        nodes = extract_simple_nodes(js_file)
        links = extract_simple_links(js_file)
        node_colors = extract_simple_colors(js_file)
        
        data = {
            'nodes': nodes,
            'links': links,
            'nodeColors': node_colors
        }
        
        # Save to JSON file
        with open(json_file, 'w', encoding='utf-8') as f:
            json.dump(data, f, indent=2, ensure_ascii=False)
        
        print(f"\nData extraction complete!")
        print(f"Nodes: {len(data['nodes'])}")
        print(f"Links: {len(data['links'])}")
        print(f"Node colors: {len(data['nodeColors'])}")
        print(f"Data saved to: {json_file}")
        
        # Show sample data
        if data['nodes']:
            print(f"\nSample node: {data['nodes'][0]}")
        if data['links']:
            print(f"Sample link: {data['links'][0]}")
        if data['nodeColors']:
            print(f"Sample color: {list(data['nodeColors'].items())[0]}")
        
    except Exception as e:
        print(f"Error during extraction: {e}")
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    main()
