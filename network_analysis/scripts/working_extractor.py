#!/usr/bin/env python3
"""
Working Network Data Extractor

This script creates a working version that handles the actual JavaScript structure.
"""

import re
import json
from pathlib import Path

def extract_working_data(js_file_path):
    """Extract network data using working approach."""
    print("Working network data extraction...")
    
    with open(js_file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Find the main data structure
    start_marker = 'export const atlantaBiotechEcosystem = {'
    start_idx = content.find(start_marker)
    
    if start_idx == -1:
        raise ValueError("Could not find atlantaBiotechEcosystem data structure")
    
    # Extract the entire object by finding matching braces
    brace_count = 0
    end_idx = start_idx
    in_string = False
    escape_next = False
    
    for i, char in enumerate(content[start_idx:], start_idx):
        if escape_next:
            escape_next = False
            continue
            
        if char == '\\':
            escape_next = True
            continue
            
        if char == '"' and not escape_next:
            in_string = not in_string
            continue
            
        if not in_string:
            if char == '{':
                brace_count += 1
            elif char == '}':
                brace_count -= 1
                if brace_count == 0:
                    end_idx = i + 1
                    break
    
    # Extract the object content
    object_content = content[start_idx + len(start_marker):end_idx-1]
    
    # Extract nodes
    nodes = extract_nodes_working(object_content)
    
    # Extract links
    links = extract_links_working(object_content)
    
    # Extract node colors
    node_colors = extract_node_colors_working(object_content)
    
    return {
        'nodes': nodes,
        'links': links,
        'nodeColors': node_colors
    }

def extract_nodes_working(content):
    """Extract nodes using working approach."""
    print("Extracting nodes...")
    
    # Find the nodes array start - try both with and without spaces
    nodes_start = content.find('nodes: [')
    if nodes_start == -1:
        nodes_start = content.find('nodes:[')
    
    if nodes_start == -1:
        print("Warning: No nodes array found")
        return []
    
    # Find the matching closing bracket
    bracket_count = 0
    nodes_end = nodes_start
    in_string = False
    escape_next = False
    
    for i, char in enumerate(content[nodes_start:], nodes_start):
        if escape_next:
            escape_next = False
            continue
            
        if char == '\\':
            escape_next = True
            continue
            
        if char == '"' and not escape_next:
            in_string = not in_string
            continue
            
        if not in_string:
            if char == '[':
                bracket_count += 1
            elif char == ']':
                bracket_count -= 1
                if bracket_count == 0:
                    nodes_end = i + 1
                    break
    
    # Extract the nodes array content
    if content[nodes_start:nodes_start+8] == 'nodes: [':
        nodes_content = content[nodes_start + 8:nodes_end - 1]  # Skip 'nodes: [' and ']'
    else:
        nodes_content = content[nodes_start + 7:nodes_end - 1]  # Skip 'nodes:[' and ']'
    
    # Split nodes by looking for { id: patterns
    node_objects = []
    current_pos = 0
    
    while current_pos < len(nodes_content):
        # Find next node start
        node_start = nodes_content.find('{ id:', current_pos)
        if node_start == -1:
            break
        
        # Find the matching closing brace for this node
        brace_count = 0
        node_end = node_start
        in_string = False
        escape_next = False
        
        for i, char in enumerate(nodes_content[node_start:], node_start):
            if escape_next:
                escape_next = False
                continue
                
            if char == '\\':
                escape_next = True
                continue
                
            if char == '"' and not escape_next:
                in_string = not in_string
                continue
                
            if not in_string:
                if char == '{':
                    brace_count += 1
                elif char == '}':
                    brace_count -= 1
                    if brace_count == 0:
                        node_end = i + 1
                        break
        
        # Extract the node object
        node_str = nodes_content[node_start:node_end]
        node_obj = parse_node_working(node_str)
        if node_obj:
            node_objects.append(node_obj)
        
        current_pos = node_end
    
    print(f"Extracted {len(node_objects)} nodes")
    return node_objects

def extract_links_working(content):
    """Extract links using working approach."""
    print("Extracting links...")
    
    # Find the links array start - try both with and without spaces
    links_start = content.find('links: [')
    if links_start == -1:
        links_start = content.find('links:[')
    
    if links_start == -1:
        print("Warning: No links array found")
        return []
    
    # Find the matching closing bracket
    bracket_count = 0
    links_end = links_start
    in_string = False
    escape_next = False
    
    for i, char in enumerate(content[links_start:], links_start):
        if escape_next:
            escape_next = False
            continue
            
        if char == '\\':
            escape_next = True
            continue
            
        if char == '"' and not escape_next:
            in_string = not in_string
            continue
            
        if not in_string:
            if char == '[':
                bracket_count += 1
            elif char == ']':
                bracket_count -= 1
                if bracket_count == 0:
                    links_end = i + 1
                    break
    
    # Extract the links array content
    if content[links_start:links_start+8] == 'links: [':
        links_content = content[links_start + 8:links_end - 1]  # Skip 'links: [' and ']'
    else:
        links_content = content[links_start + 7:links_end - 1]  # Skip 'links:[' and ']'
    
    # Split links by looking for { source: patterns
    link_objects = []
    current_pos = 0
    
    while current_pos < len(links_content):
        # Find next link start
        link_start = links_content.find('{ source:', current_pos)
        if link_start == -1:
            break
        
        # Find the matching closing brace for this link
        brace_count = 0
        link_end = link_start
        in_string = False
        escape_next = False
        
        for i, char in enumerate(links_content[link_start:], link_start):
            if escape_next:
                escape_next = False
                continue
                
            if char == '\\':
                escape_next = True
                continue
                
            if char == '"' and not escape_next:
                in_string = not in_string
                continue
                
            if not in_string:
                if char == '{':
                    brace_count += 1
                elif char == '}':
                    brace_count -= 1
                    if brace_count == 0:
                        link_end = i + 1
                        break
        
        # Extract the link object
        link_str = links_content[link_start:link_end]
        link_obj = parse_link_working(link_str)
        if link_obj:
            link_objects.append(link_obj)
        
        current_pos = link_end
    
    print(f"Extracted {len(link_objects)} links")
    return link_objects

def parse_node_working(node_str):
    """Parse a node object using working approach."""
    try:
        node_obj = {}
        
        # Extract id (required)
        id_match = re.search(r'id:\s*"([^"]+)"', node_str)
        if not id_match:
            return None
        node_obj['id'] = id_match.group(1)
        
        # Extract name
        name_match = re.search(r'name:\s*"([^"]+)"', node_str)
        if name_match:
            node_obj['name'] = name_match.group(1)
        
        # Extract type
        type_match = re.search(r'type:\s*"([^"]+)"', node_str)
        if type_match:
            node_obj['type'] = type_match.group(1)
        
        # Extract description (handle multi-line)
        desc_match = re.search(r'description:\s*"([^"]*(?:\\.[^"]*)*)"', node_str, re.DOTALL)
        if desc_match:
            node_obj['description'] = desc_match.group(1)
        
        # Extract website
        website_match = re.search(r'website:\s*"([^"]+)"', node_str)
        if website_match:
            node_obj['website'] = website_match.group(1)
        
        # Extract size (if numeric)
        size_match = re.search(r'size:\s*(\d+)', node_str)
        if size_match:
            node_obj['size'] = int(size_match.group(1))
        
        return node_obj
        
    except Exception as e:
        print(f"Warning: Could not parse node object: {e}")
        return None

def parse_link_working(link_str):
    """Parse a link object using working approach."""
    try:
        link_obj = {}
        
        # Extract source (required)
        source_match = re.search(r'source:\s*"([^"]+)"', link_str)
        if not source_match:
            return None
        link_obj['source'] = source_match.group(1)
        
        # Extract target (required)
        target_match = re.search(r'target:\s*"([^"]+)"', link_str)
        if not target_match:
            return None
        link_obj['target'] = target_match.group(1)
        
        # Extract type
        type_match = re.search(r'type:\s*"([^"]+)"', link_str)
        if type_match:
            link_obj['type'] = type_match.group(1)
        
        # Extract description
        desc_match = re.search(r'description:\s*"([^"]*(?:\\.[^"]*)*)"', link_str, re.DOTALL)
        if desc_match:
            link_obj['description'] = desc_match.group(1)
        
        return link_obj
        
    except Exception as e:
        print(f"Warning: Could not parse link object: {e}")
        return None

def extract_node_colors_working(content):
    """Extract node colors using working approach."""
    print("Extracting node colors...")
    
    # Find the nodeColors object - try both with and without spaces
    colors_start = content.find('nodeColors: {')
    if colors_start == -1:
        colors_start = content.find('nodeColors:{')
    
    if colors_start == -1:
        print("Warning: No nodeColors found")
        return {}
    
    # Find the matching closing brace
    brace_count = 0
    colors_end = colors_start
    in_string = False
    escape_next = False
    
    for i, char in enumerate(content[colors_start:], colors_start):
        if escape_next:
            escape_next = False
            continue
            
        if char == '\\':
            escape_next = True
            continue
            
        if char == '"' and not escape_next:
            in_string = not in_string
            continue
            
        if not in_string:
            if char == '{':
                brace_count += 1
            elif char == '}':
                brace_count -= 1
                if brace_count == 0:
                    colors_end = i + 1
                    break
    
    # Extract the colors content
    if content[colors_start:colors_start+13] == 'nodeColors: {':
        colors_content = content[colors_start + 13:colors_end - 1]  # Skip 'nodeColors: {' and '}'
    else:
        colors_content = content[colors_start + 12:colors_end - 1]  # Skip 'nodeColors:{' and '}'
    
    # Extract color assignments
    color_pattern = r'"([^"]+)":\s*"([^"]+)"'
    color_matches = re.findall(color_pattern, colors_content)
    
    node_colors = {}
    for key, value in color_matches:
        node_colors[key] = value
    
    print(f"Extracted {len(node_colors)} node colors")
    return node_colors

def main():
    """Extract network data and save to JSON."""
    js_file = 'src/atlanta_biotech_data.js'
    json_file = 'biotech_network_data.json'
    
    print("Working Atlanta Biotech Network Data Extractor")
    print("=" * 50)
    
    try:
        data = extract_working_data(js_file)
        
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
