import os
import json
import urllib.parse

os.makedirs(r'c:\portofolio\public\tech', exist_ok=True)

with open(r'C:\Users\Hype AMD\.gemini\antigravity\brain\73f32cd5-9018-452e-bf40-e08d27c74f6e\scratch\extracted_logos.json', 'r') as f:
    data = json.load(f)

mapping = {
    'ac': 'react.svg',
    'lc': 'javascript.svg',
    'uc': 'html5.svg',
    'hc': 'css3.svg',
    'pc': 'fontawesome.svg',
    'oc': 'python.svg',
    'sc': 'php.svg',
    'ic': 'supabase.svg',
    'mc': 'firebase.svg',
    'fc': 'git.svg',
    'dc': 'github.svg',
    'nc': 'vite.svg',
    'rc': 'vercel.svg'
}

for k, filename in mapping.items():
    val = data.get(k, '')
    if val.startswith('data:image/svg+xml,'):
        svg = urllib.parse.unquote(val[len('data:image/svg+xml,'):])
        target_path = os.path.join(r'c:\portofolio\public\tech', filename)
        with open(target_path, 'w', encoding='utf-8') as out:
            out.write(svg)
        print(f'Saved {filename} ({len(svg)} bytes)')

# Official Tailwind CSS SVG
tailwind_svg = '''<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.336 6.182 14.975 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.336 13.382 8.975 12 6.001 12z" fill="#38BDF8"/>
</svg>'''
with open(r'c:\portofolio\public\tech\tailwind.svg', 'w', encoding='utf-8') as f:
    f.write(tailwind_svg)
print('Saved tailwind.svg')

# Official Next.js SVG
nextjs_svg = '''<svg viewBox="0 0 180 180" fill="none" xmlns="http://www.w3.org/2000/svg">
<mask id="mask0" mask-type="alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="180" height="180">
<circle cx="90" cy="90" r="90" fill="black"/>
</mask>
<g mask="url(#mask0)">
<circle cx="90" cy="90" r="90" fill="#000000"/>
<path d="M149.508 157.52L69.142 54H54V125.97H66.1136V69.3836L139.999 164.845C143.333 162.614 146.509 160.165 149.508 157.52Z" fill="url(#paint0_linear)"/>
<rect x="115" y="54" width="12" height="72" fill="url(#paint1_linear)"/>
</g>
<defs>
<linearGradient id="paint0_linear" x1="109" y1="116.5" x2="144.5" y2="160.5" gradientUnits="userSpaceOnUse">
<stop stop-color="white"/>
<stop offset="1" stop-color="white" stop-opacity="0"/>
</linearGradient>
<linearGradient id="paint1_linear" x1="121" y1="54" x2="120.799" y2="106.875" gradientUnits="userSpaceOnUse">
<stop stop-color="white"/>
<stop offset="1" stop-color="white" stop-opacity="0"/>
</linearGradient>
</defs>
</svg>'''
with open(r'c:\portofolio\public\tech\nextjs.svg', 'w', encoding='utf-8') as f:
    f.write(nextjs_svg)
print('Saved nextjs.svg')

# Official Node.js SVG
nodejs_svg = '''<svg viewBox="0 0 256 289" xmlns="http://www.w3.org/2000/svg">
<path d="M128 0L249.2 69.9V209.6L128 279.5L6.8 209.6V69.9L128 0Z" fill="#333333"/>
<path d="M128 288.7L0 214.8V73.9L128 0L256 73.9V214.8L128 288.7ZM9.2 209.5L128 278.1L246.8 209.5V79.2L128 10.6L9.2 79.2V209.5Z" fill="#5FA04E"/>
<path d="M178.6 139.3c-2.3-1.4-5.3-2.3-8.8-2.6l-20.9-1.9c-5.8-.5-7.8-2.3-7.8-5.3 0-3.3 2.6-5.4 7.5-5.4 5.3 0 11.2 1.6 16.5 4.7l4.7-9.5c-6.1-3.6-13.6-5.4-21.3-5.4-12.8 0-20.9 6.7-20.9 17.5 0 9.1 5.9 14.5 17 15.6l21.2 1.9c5.8.5 7.8 2.5 7.8 5.6 0 3.7-3.3 5.8-8.9 5.8-6.6 0-13.8-2.4-20.5-6.8l-5.1 9.4c7.3 4.8 16.5 7.3 25.5 7.3 14 0 22.3-7 22.3-17.9 0-8.6-4.9-14.7-16.7-16.4zm-92.4-24.1l-14 8.1v62.4l13.9 8.1 13.9-8.1v-62.4l-13.8-8.1zm4.7 65.5l-4.7 2.7-4.7-2.7v-49.3l4.7-2.7 4.7 2.7v49.3z" fill="#5FA04E"/>
</svg>'''
with open(r'c:\portofolio\public\tech\nodejs.svg', 'w', encoding='utf-8') as f:
    f.write(nodejs_svg)
print('Saved nodejs.svg')

print('All tech stack SVGs successfully written!')

