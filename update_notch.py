#!/usr/bin/env python3
"""
Update Notch Script
===================

This script safely updates the default SVG dimensions of the glass notch across the Hero components.

Usage:
  python3 update_notch.py -H [height_offset] -w [width_offset] [flags]

Arguments:
  -H, --height   : Adjust the depth (height) of the notch (e.g. -H 20 or -H -10)
  -w             : Adjust the width of the notch (e.g. -w 20 or -w -10)

Flags:
  --rules-only   : Apply changes ONLY to the Rules and Register pages
  --register-only: Apply changes ONLY to the Register page

Examples:
  Increase height by 10px everywhere:
    python3 update_notch.py -H 10

  Decrease width by 5px on the Register page only:
    python3 update_notch.py -w -5 --register-only
"""
import sys
import re
import argparse

FILES = [
    "app/_components/Home/Hero/index.jsx",
    "app/_components/Rules/Title/index.jsx",
    "app/_components/Register/hero/index.jsx"
]

def update_file(filepath, dh, dw):
    try:
        with open(filepath, 'r') as f:
            content = f.read()
    except FileNotFoundError:
        print(f"Error: {filepath} not found.")
        return

    pattern = re.compile(
        r'(M 35 )(\d+)(\s*Q 35 )(\d+)( 65 )(\d+)(\s*H )(\d+)(\s*Q )(\d+)( )(\d+)( )(\d+)( )(\d+)(\s*V )(\d+)(\s*Q )(\d+)( )(\d+)( )(\d+)( )(\d+)'
    )
    
    def replacer(match):
        H = int(match.group(2))
        W = int(match.group(10))
        yTop = int(match.group(22))
        
        new_H = H + dh
        new_W = W + dw
        
        if new_H < yTop + 90:
            print(f"  Warning: Height cannot be less than {yTop + 90} in {filepath}. Clamping.")
            new_H = yTop + 90
            
        if new_W < 70:
            print(f"  Warning: Width cannot be less than 70 in {filepath}. Clamping.")
            new_W = 70
            
        return (
            f"{match.group(1)}{new_H}"
            f"{match.group(3)}{new_H - 30}{match.group(5)}{new_H - 30}"
            f"{match.group(7)}{new_W - 30}"
            f"{match.group(9)}{new_W}{match.group(11)}{new_H - 30}{match.group(13)}{new_W}{match.group(15)}{yTop + 30}"
            f"{match.group(17)}{yTop + 30}"
            f"{match.group(19)}{new_W}{match.group(21)}{yTop}{match.group(23)}{new_W + 30}{match.group(25)}{yTop}"
        )

    new_content, count = pattern.subn(replacer, content)
    
    if count > 0:
        with open(filepath, 'w') as f:
            f.write(new_content)
        print(f"Updated {filepath}")
    else:
        print(f"Could not find defaultPath to update in {filepath}")

def main():
    parser = argparse.ArgumentParser(description="Update default SVG dimensions in Hero components.")
    parser.add_argument('-w', type=int, default=0, help="Width offset (e.g. +20, -10)")
    parser.add_argument('-H', type=int, default=0, help="Height offset (e.g. +20, -10)", dest="h")
    parser.add_argument('--rules-only', action='store_true', help="Only update Rules and Register pages")
    parser.add_argument('--register-only', action='store_true', help="Only update Register page")
    
    args = parser.parse_args()
    
    if args.w == 0 and args.h == 0:
        print("No changes specified. Use -w and/or -H. Example: python3 update_notch.py -H 20 -w -10")
        return
        
    print(f"Applying offsets: Height {args.h:+}px, Width {args.w:+}px")
    
    files_to_update = FILES
    if args.register_only:
        files_to_update = [f for f in FILES if "Register" in f]
        print("Targeting ONLY Register page.")
    elif args.rules_only:
        files_to_update = [f for f in FILES if "Rules" in f or "Register" in f]
        print("Targeting ONLY Rules and Register pages.")
    
    for filepath in files_to_update:
        update_file(filepath, args.h, args.w)

if __name__ == "__main__":
    main()
