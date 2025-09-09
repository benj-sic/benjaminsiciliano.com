#!/usr/bin/env python3
"""
Comprehensive Network Data Extractor

This script uses a more sophisticated approach to extract all nodes and links
from the complex JavaScript data structure.
"""

import re
import json
from pathlib import Path

def extract_comprehensive_data(js_file_path):
    """Extract all network data using comprehensive parsing."""
    print("Comprehensive network data extraction...")
    
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
    
    # Parse nodes using a more comprehensive approach
    nodes = extract_all_nodes(object_content)
    
    # Parse links
    links = extract_all_links(object_content)
    
    # Parse node colors
    node_colors = extract_node_colors_comprehensive(object_content)
    
    return {
        'nodes': nodes,
        'links': links,
        'nodeColors': node_colors
    }

def extract_all_nodes(content):
    """Extract all nodes using comprehensive parsing."""
    print("Extracting all nodes...")
    
    # Find the nodes array
    nodes_pattern = r'nodes:\s*\[(.*?)\]'
    nodes_match = re.search(nodes_pattern, content, re.DOTALL)
    
    if not nodes_match:
        print("Warning: No nodes array found")
        return []
    
    nodes_str = nodes_match.group(1)
    
    # Find all node objects by looking for the pattern: { id: "...", ... }
    # This is more flexible and handles multi-line objects
    node_objects = []
    
    # Split by looking for { id: "..." patterns
    node_blocks = re.split(r'(?=\{\s*id:\s*["\'])', nodes_str)
    
    for block in node_blocks:
        if not block.strip() or not block.strip().startswith('{'):
            continue
            
        # Find the complete node object by matching braces
        brace_count = 0
        node_str = ""
        in_string = False
        escape_next = False
        
        for char in block:
            if escape_next:
                escape_next = False
                node_str += char
                continue
                
            if char == '\\':
                escape_next = True
                node_str += char
                continue
                
            if char == '"' and not escape_next:
                in_string = not in_string
                node_str += char
                continue
                
            if not in_string:
                if char == '{':
                    brace_count += 1
                    node_str += char
                elif char == '}':
                    brace_count -= 1
                    node_str += char
                    if brace_count == 0:
                        break
                else:
                    node_str += char
            else:
                node_str += char
        
        if node_str.strip().startswith('{'):
            node_obj = parse_comprehensive_node(node_str)
            if node_obj:
                node_objects.append(node_obj)
    
    print(f"Extracted {len(node_objects)} nodes")
    return node_objects

def extract_all_links(content):
    """Extract all links using comprehensive parsing."""
    print("Extracting all links...")
    
    # Find the links array
    links_pattern = r'links:\s*\[(.*?)\]'
    links_match = re.search(links_pattern, content, re.DOTALL)
    
    if not links_match:
        print("Warning: No links array found")
        return []
    
    links_str = links_match.group(1)
    
    # Find all link objects by looking for { source: "...", target: "..." }
    link_objects = []
    
    # Split by looking for { source: "..." patterns
    link_blocks = re.split(r'(?=\{\s*source:\s*["\'])', links_str)
    
    for block in link_blocks:
        if not block.strip() or not block.strip().startswith('{'):
            continue
            
        # Find the complete link object by matching braces
        brace_count = 0
        link_str = ""
        in_string = False
        escape_next = False
        
        for char in block:
            if escape_next:
                escape_next = False
                link_str += char
                continue
                
            if char == '\\':
                escape_next = True
                link_str += char
                continue
                
            if char == '"' and not escape_next:
                in_string = not in_string
                link_str += char
                continue
                
            if not in_string:
                if char == '{':
                    brace_count += 1
                    link_str += char
                elif char == '}':
                    brace_count -= 1
                    link_str += char
                    if brace_count == 0:
                        break
                else:
                    link_str += char
            else:
                link_str += char
        
        if link_str.strip().startswith('{'):
            link_obj = parse_comprehensive_link(link_str)
            if link_obj:
                link_objects.append(link_obj)
    
    print(f"Extracted {len(link_objects)} links")
    return link_objects

def parse_comprehensive_node(node_str):
    """Parse a node object with comprehensive property extraction."""
    try:
        node_obj = {}
        
        # Extract id (required)
        id_match = re.search(r'id:\s*["\']([^"\']+)["\']', node_str)
        if not id_match:
            return None
        node_obj['id'] = id_match.group(1)
        
        # Extract name
        name_match = re.search(r'name:\s*["\']([^"\']+)["\']', node_str)
        if name_match:
            node_obj['name'] = name_match.group(1)
        
        # Extract type
        type_match = re.search(r'type:\s*["\']([^"\']+)["\']', node_str)
        if type_match:
            node_obj['type'] = type_match.group(1)
        
        # Extract description (handle multi-line)
        desc_match = re.search(r'description:\s*["\']([^"\']*(?:\\.[^"\']*)*)["\']', node_str, re.DOTALL)
        if desc_match:
            node_obj['description'] = desc_match.group(1)
        
        # Extract website
        website_match = re.search(r'website:\s*["\']([^"\']+)["\']', node_str)
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

def parse_comprehensive_link(link_str):
    """Parse a link object with comprehensive property extraction."""
    try:
        link_obj = {}
        
        # Extract source (required)
        source_match = re.search(r'source:\s*["\']([^"\']+)["\']', link_str)
        if not source_match:
            return None
        link_obj['source'] = source_match.group(1)
        
        # Extract target (required)
        target_match = re.search(r'target:\s*["\']([^"\']+)["\']', link_str)
        if not target_match:
            return None
        link_obj['target'] = target_match.group(1)
        
        # Extract type
        type_match = re.search(r'type:\s*["\']([^"\']+)["\']', link_str)
        if type_match:
            link_obj['type'] = type_match.group(1)
        
        # Extract description
        desc_match = re.search(r'description:\s*["\']([^"\']*(?:\\.[^"\']*)*)["\']', link_str, re.DOTALL)
        if desc_match:
            link_obj['description'] = desc_match.group(1)
        
        return link_obj
        
    except Exception as e:
        print(f"Warning: Could not parse link object: {e}")
        return None

def extract_node_colors_comprehensive(content):
    """Extract node colors with comprehensive parsing."""
    print("Extracting node colors...")
    
    # Find the nodeColors object
    colors_pattern = r'nodeColors:\s*\{([^}]*)\}'
    colors_match = re.search(colors_pattern, content, re.DOTALL)
    
    if not colors_match:
        print("Warning: No nodeColors found")
        return {}
    
    colors_str = colors_match.group(1)
    
    # Extract color assignments - handle both single and double quotes
    color_pattern = r'["\']([^"\']+)["\']:\s*["\']([^"\']+)["\']'
    color_matches = re.findall(color_pattern, colors_str)
    
    node_colors = {}
    for key, value in color_matches:
        node_colors[key] = value
    
    print(f"Extracted {len(node_colors)} node colors")
    return node_colors

def main():
    """Extract comprehensive network data and save to JSON."""
    js_file = 'src/atlanta_biotech_data.js'
    json_file = 'biotech_network_data.json'
    
    print("Comprehensive Atlanta Biotech Network Data Extractor")
    print("=" * 55)
    
    try:
        data = extract_comprehensive_data(js_file)
        
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
