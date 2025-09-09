#!/usr/bin/env python3
"""
Data Converter: Convert JavaScript data to clean JSON format

This script extracts the network data from the JavaScript file and converts it
to a clean JSON format that's easier to work with for analysis.
"""

import re
import json
from pathlib import Path

def extract_js_data(js_file_path):
    """Extract data from JavaScript file using regex patterns."""
    with open(js_file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Extract nodes array
    nodes_pattern = r'nodes:\s*\[(.*?)\]'
    nodes_match = re.search(nodes_pattern, content, re.DOTALL)
    
    if not nodes_match:
        raise ValueError("Could not find nodes array in JavaScript file")
    
    nodes_str = nodes_match.group(1)
    
    # Extract individual node objects
    node_objects = []
    brace_count = 0
    current_node = ""
    in_string = False
    escape_next = False
    
    for char in nodes_str:
        if escape_next:
            current_node += char
            escape_next = False
            continue
            
        if char == '\\':
            escape_next = True
            current_node += char
            continue
            
        if char == '"' and not escape_next:
            in_string = not in_string
            current_node += char
            continue
            
        if not in_string:
            if char == '{':
                brace_count += 1
                current_node += char
            elif char == '}':
                brace_count -= 1
                current_node += char
                if brace_count == 0 and current_node.strip():
                    # Process the complete node object
                    node_obj = parse_node_object(current_node.strip())
                    if node_obj:
                        node_objects.append(node_obj)
                    current_node = ""
            else:
                current_node += char
        else:
            current_node += char
    
    # Extract links array
    links_pattern = r'links:\s*\[(.*?)\]'
    links_match = re.search(links_pattern, content, re.DOTALL)
    
    if not links_match:
        print("Warning: Could not find links array")
        link_objects = []
    else:
        links_str = links_match.group(1)
        link_objects = parse_links_array(links_str)
    
    # Extract node colors
    colors_pattern = r'nodeColors:\s*\{([^}]*)\}'
    colors_match = re.search(colors_pattern, content, re.DOTALL)
    
    node_colors = {}
    if colors_match:
        colors_str = colors_match.group(1)
        node_colors = parse_colors_object(colors_str)
    
    return {
        'nodes': node_objects,
        'links': link_objects,
        'nodeColors': node_colors
    }

def parse_node_object(node_str):
    """Parse a single node object from JavaScript string."""
    try:
        # Clean up the JavaScript object to make it JSON-like
        # Remove comments
        node_str = re.sub(r'//.*$', '', node_str, flags=re.MULTILINE)
        
        # Fix JavaScript-specific syntax
        node_str = re.sub(r'(\w+):', r'"\1":', node_str)  # Quote keys
        node_str = re.sub(r':\s*([^",{\[\s][^,}\]]*?)([,}])', r': "\1"\2', node_str)  # Quote string values
        
        # Handle arrays
        node_str = re.sub(r'\[([^\]]*)\]', lambda m: '[' + re.sub(r'(\w+):', r'"\1":', m.group(1)) + ']', node_str)
        
        # Parse as JSON
        return json.loads(node_str)
    except Exception as e:
        print(f"Warning: Could not parse node object: {e}")
        return None

def parse_links_array(links_str):
    """Parse the links array from JavaScript string."""
    link_objects = []
    
    # Split by link objects (look for { source: ... })
    link_pattern = r'\{[^}]*source:[^}]*\}'
    link_matches = re.findall(link_pattern, links_str)
    
    for link_str in link_matches:
        try:
            # Clean up the link object
            link_str = re.sub(r'(\w+):', r'"\1":', link_str)
            link_str = re.sub(r':\s*([^",{\[\s][^,}\]]*?)([,}])', r': "\1"\2', link_str)
            
            link_obj = json.loads(link_str)
            link_objects.append(link_obj)
        except Exception as e:
            print(f"Warning: Could not parse link object: {e}")
            continue
    
    return link_objects

def parse_colors_object(colors_str):
    """Parse the node colors object."""
    colors = {}
    
    # Extract color assignments
    color_pattern = r"'([^']+)':\s*'([^']+)'"
    color_matches = re.findall(color_pattern, colors_str)
    
    for key, value in color_matches:
        colors[key] = value
    
    return colors

def main():
    """Convert JavaScript data to JSON."""
    js_file = 'src/atlanta_biotech_data.js'
    json_file = 'biotech_network_data.json'
    
    print("Converting JavaScript data to JSON...")
    
    try:
        data = extract_js_data(js_file)
        
        with open(json_file, 'w', encoding='utf-8') as f:
            json.dump(data, f, indent=2, ensure_ascii=False)
        
        print(f"Conversion complete! Data saved to {json_file}")
        print(f"Nodes: {len(data['nodes'])}")
        print(f"Links: {len(data['links'])}")
        print(f"Node colors: {len(data['nodeColors'])}")
        
    except Exception as e:
        print(f"Error during conversion: {e}")
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    main()
